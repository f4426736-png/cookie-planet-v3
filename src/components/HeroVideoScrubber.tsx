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
    // Solo dispositivos puramente táctiles sin puntero fino
    const isTouchOnly =
      window.matchMedia('(pointer: coarse) and (hover: none)').matches;

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

    // En dispositivos móviles táctiles puros: reproduce en bucle alternado
    if (isTouchOnly) {
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

    // MODO ESCRITORIO CON SCRUBBING INSTANTÁNEO A 60 FPS
    leftVideo.muted = true;
    leftVideo.playsInline = true;
    leftVideo.loop = true;
    leftVideo.style.display = 'block';
    leftVideo.style.opacity = '0';

    rightVideo.muted = true;
    rightVideo.playsInline = true;
    rightVideo.loop = true;
    rightVideo.style.display = 'block';
    rightVideo.style.opacity = '1';

    let playPromise: Promise<void> | null = null;

    const safePlay = (vid: HTMLVideoElement) => {
      if (vid.paused) {
        vid.playbackRate = 0.85;
        playPromise = vid.play();
        if (playPromise) {
          playPromise.catch(() => {});
        }
      }
    };

    const safePause = (vid: HTMLVideoElement) => {
      if (playPromise) {
        playPromise
          .then(() => {
            vid.pause();
          })
          .catch(() => {
            vid.pause();
          });
      } else {
        vid.pause();
      }
    };

    // Iniciar con suave giro continuo
    safePlay(rightVideo);

    let targetLeft = 0;
    let targetRight = 0;
    let currentLeft = 0;
    let currentRight = 0;
    let isUserScrubbing = false;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const applySeek = (vid: HTMLVideoElement, time: number) => {
      if (isNaN(time) || !isFinite(time)) return;
      const dur = vid.duration || 10;
      const clamped = Math.max(0, Math.min(dur - 0.04, time));
      if (Math.abs(vid.currentTime - clamped) < 0.02) return;

      if (!vid.seeking) {
        try {
          vid.currentTime = clamped;
        } catch {}
      }
    };

    const onSeeked = () => {
      if (isUserScrubbing) {
        const active = activeSideRef.current;
        const vid = active === 'left' ? leftVideo : rightVideo;
        const target = active === 'left' ? currentLeft : currentRight;
        applySeek(vid, target);
      }
    };

    leftVideo.addEventListener('seeked', onSeeked);
    rightVideo.addEventListener('seeked', onSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const centerX = width / 2;
      const mouseX = e.clientX;

      if (!isUserScrubbing) {
        isUserScrubbing = true;
        safePause(leftVideo);
        safePause(rightVideo);
      }

      if (idleTimeout) clearTimeout(idleTimeout);

      if (mouseX < centerX) {
        // Lado izquierdo: Producto 3D
        if (activeSideRef.current !== 'left') {
          activeSideRef.current = 'left';
          leftVideo.style.opacity = '1';
          rightVideo.style.opacity = '0';
        }

        const progress = 1 - Math.max(0, Math.min(1, mouseX / centerX));
        const dur = leftVideo.duration || 10.0;
        targetLeft = progress * dur;
      } else {
        // Lado derecho: Modelo
        if (activeSideRef.current !== 'right') {
          activeSideRef.current = 'right';
          rightVideo.style.opacity = '1';
          leftVideo.style.opacity = '0';
        }

        const progress = Math.max(0, Math.min(1, (mouseX - centerX) / (width - centerX)));
        const dur = rightVideo.duration || 10.0;
        targetRight = progress * dur;
      }

      // Si el cursor queda quieto por más de 1.5s, retoma el bucle continuo sin congelarse
      idleTimeout = setTimeout(() => {
        isUserScrubbing = false;
        const active = activeSideRef.current === 'left' ? leftVideo : rightVideo;
        safePlay(active);
      }, 1500);
    };

    const updateLoop = () => {
      if (isUserScrubbing) {
        currentLeft += (targetLeft - currentLeft) * 0.35;
        currentRight += (targetRight - currentRight) * 0.35;

        const active = activeSideRef.current;
        if (active === 'left' && leftVideo) {
          applySeek(leftVideo, currentLeft);
        } else if (active === 'right' && rightVideo) {
          applySeek(rightVideo, currentRight);
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimeout) clearTimeout(idleTimeout);
      leftVideo.removeEventListener('seeked', onSeeked);
      rightVideo.removeEventListener('seeked', onSeeked);
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
