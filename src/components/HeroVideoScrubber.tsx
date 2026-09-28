import { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT_URL, VIDEO_RIGHT_URL } from '../data/prmptData';

export default function HeroVideoScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const [leftReady, setLeftReady] = useState(false);
  const [rightReady, setRightReady] = useState(false);

  const activeSideRef = useRef<'left' | 'right'>('right');

  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      window.innerWidth < 1024;

    const leftVideo = leftVideoRef.current;
    const rightVideo = rightVideoRef.current;
    if (!leftVideo || !rightVideo) return;

    // Control de visibilidad con el scroll (más de 100vh se oculta para ahorrar GPU)
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      if (containerRef.current) {
        containerRef.current.style.visibility = scrollY >= vh ? 'hidden' : 'visible';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // En dispositivos móviles touch: reproduce en bucle alternado
    if (isTouch) {
      leftVideo.style.display = 'block';
      leftVideo.style.opacity = '1';
      rightVideo.style.display = 'none';

      leftVideo.muted = true;
      leftVideo.playsInline = true;
      rightVideo.muted = true;
      rightVideo.playsInline = true;

      leftVideo.play().catch(() => {});

      const onLeftEnded = () => {
        leftVideo.style.display = 'none';
        rightVideo.style.display = 'block';
        rightVideo.style.opacity = '1';
        rightVideo.currentTime = 0;
        rightVideo.play().catch(() => {});
      };

      const onRightEnded = () => {
        rightVideo.style.display = 'none';
        leftVideo.style.display = 'block';
        leftVideo.style.opacity = '1';
        leftVideo.currentTime = 0;
        leftVideo.play().catch(() => {});
      };

      leftVideo.addEventListener('ended', onLeftEnded);
      rightVideo.addEventListener('ended', onRightEnded);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        leftVideo.removeEventListener('ended', onLeftEnded);
        rightVideo.removeEventListener('ended', onRightEnded);
      };
    }

    // DESKTOP: Modo Scrubber interactivo inmediato
    leftVideo.muted = true;
    leftVideo.playsInline = true;
    leftVideo.pause();
    leftVideo.style.display = 'block';
    leftVideo.style.opacity = '0';

    rightVideo.muted = true;
    rightVideo.playsInline = true;
    rightVideo.pause();
    rightVideo.style.display = 'block';
    rightVideo.style.opacity = '1';

    let targetLeft = 0;
    let targetRight = 0;
    let currentLeft = 0;
    let currentRight = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const centerX = width / 2;
      const mouseX = e.clientX;
      const deadZone = Math.max(30, width * 0.04);

      if (Math.abs(mouseX - centerX) <= deadZone) {
        targetLeft = 0;
        targetRight = 0;
        return;
      }

      if (mouseX < centerX - deadZone) {
        // Lado izquierdo -> Muestra Producto
        if (activeSideRef.current !== 'left') {
          activeSideRef.current = 'left';
          leftVideo.style.opacity = '1';
          rightVideo.style.opacity = '0';
        }

        const available = centerX - deadZone;
        const progress = Math.max(0, Math.min(1, (centerX - deadZone - mouseX) / available));
        if (leftVideo.duration) {
          targetLeft = progress * leftVideo.duration;
        }
      } else {
        // Lado derecho -> Muestra Modelo
        if (activeSideRef.current !== 'right') {
          activeSideRef.current = 'right';
          rightVideo.style.opacity = '1';
          leftVideo.style.opacity = '0';
        }

        const available = width - (centerX + deadZone);
        const progress = Math.max(0, Math.min(1, (mouseX - (centerX + deadZone)) / available));
        if (rightVideo.duration) {
          targetRight = progress * rightVideo.duration;
        }
      }
    };

    const applyTime = (video: HTMLVideoElement, time: number) => {
      if (video.seeking) return;
      if (Math.abs(video.currentTime - time) < 0.015) return;

      const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
      if (typeof v.fastSeek === 'function') {
        try {
          v.fastSeek(time);
          return;
        } catch {
          // fallback
        }
      }
      video.currentTime = time;
    };

    const updateLoop = () => {
      currentLeft += (targetLeft - currentLeft) * 0.22;
      currentRight += (targetRight - currentRight) * 0.22;

      const active = activeSideRef.current;
      if (active === 'left' && leftVideo) {
        applyTime(leftVideo, currentLeft);
      } else if (active === 'right' && rightVideo) {
        applyTime(rightVideo, currentRight);
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isAnyLoaded = leftReady || rightReady;

  return (
    <div
      ref={containerRef}
      id="main-canvas"
      className="pointer-events-none overflow-hidden transition-opacity duration-300 ease-out fixed z-0 inset-0 w-full h-full bg-[#E5E5E5]"
      style={{
        opacity: isAnyLoaded ? 1 : 0.8,
      }}
    >
      {/* Poster instantáneo de primer cuadro para evitar cualquier fondo negro */}
      <img
        src="https://res.cloudinary.com/yxbhso8s/video/upload/so_0/v1789493593/Woman_turning_her_head_20260915042154.jpg"
        alt="Hero Model Preview"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
          rightReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <video
        ref={leftVideoRef}
        src={VIDEO_LEFT_URL}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={() => setLeftReady(true)}
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform transition-opacity duration-300 ease-in-out"
        style={{ opacity: 0, transform: 'translateZ(0)' }}
      />
      <video
        ref={rightVideoRef}
        src={VIDEO_RIGHT_URL}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={() => setRightReady(true)}
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform transition-opacity duration-300 ease-in-out"
        style={{ opacity: 1, transform: 'translateZ(0)' }}
      />
    </div>
  );
}
