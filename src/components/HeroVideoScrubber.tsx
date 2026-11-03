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
    // Only pure touch screens with no hover capability should use the mobile loop
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

    // En dispositivos móviles exclusivamente táctiles (sin ratón): reproduce en bucle alternado
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

    // MODO ESCRITORIO / CURSOR INTERACTIVO DE ALTA FLUIDEZ
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

    // Iniciar con reproducción suave
    rightVideo.play().catch(() => {});

    let targetLeft = 0;
    let targetRight = 0;
    let currentLeft = 0;
    let currentRight = 0;
    let isUserScrubbing = false;
    let idleTimeout: NodeJS.Timeout | null = null;
    let pendingLeftSeek: number | null = null;
    let pendingRightSeek: number | null = null;
    let rafId: number;

    const performSeek = (video: HTMLVideoElement, time: number, side: 'left' | 'right') => {
      if (isNaN(time) || !isFinite(time) || time < 0) return;
      const duration = video.duration || 5;
      const clampedTime = Math.max(0, Math.min(duration - 0.05, time));

      if (Math.abs(video.currentTime - clampedTime) < 0.02) return;

      if (video.seeking) {
        if (side === 'left') pendingLeftSeek = clampedTime;
        else pendingRightSeek = clampedTime;
        return;
      }

      const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
      if (typeof v.fastSeek === 'function') {
        try {
          v.fastSeek(clampedTime);
          return;
        } catch {
          // fallback to currentTime
        }
      }
      try {
        video.currentTime = clampedTime;
      } catch {
        // ignore seek error
      }
    };

    const handleLeftSeeked = () => {
      if (pendingLeftSeek !== null && leftVideo) {
        const t = pendingLeftSeek;
        pendingLeftSeek = null;
        performSeek(leftVideo, t, 'left');
      }
    };

    const handleRightSeeked = () => {
      if (pendingRightSeek !== null && rightVideo) {
        const t = pendingRightSeek;
        pendingRightSeek = null;
        performSeek(rightVideo, t, 'right');
      }
    };

    leftVideo.addEventListener('seeked', handleLeftSeeked);
    rightVideo.addEventListener('seeked', handleRightSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      isUserScrubbing = true;
      if (idleTimeout) clearTimeout(idleTimeout);

      // Pausar vídeos para control táctil preciso por cursor
      if (!leftVideo.paused) leftVideo.pause();
      if (!rightVideo.paused) rightVideo.pause();

      const width = window.innerWidth;
      const centerX = width / 2;
      const mouseX = e.clientX;

      if (mouseX < centerX) {
        // Lado izquierdo -> Muestra Producto 3D
        if (activeSideRef.current !== 'left') {
          activeSideRef.current = 'left';
          leftVideo.style.opacity = '1';
          rightVideo.style.opacity = '0';
        }

        const progress = 1 - Math.max(0, Math.min(1, mouseX / centerX));
        const dur = leftVideo.duration || 4.0;
        targetLeft = progress * dur;
      } else {
        // Lado derecho -> Muestra Modelo
        if (activeSideRef.current !== 'right') {
          activeSideRef.current = 'right';
          rightVideo.style.opacity = '1';
          leftVideo.style.opacity = '0';
        }

        const progress = Math.max(0, Math.min(1, (mouseX - centerX) / (width - centerX)));
        const dur = rightVideo.duration || 4.0;
        targetRight = progress * dur;
      }

      // Si el usuario deja quieto el cursor por 1.8 segundos, retomar animación suave en bucle
      idleTimeout = setTimeout(() => {
        isUserScrubbing = false;
        const currentActive = activeSideRef.current === 'left' ? leftVideo : rightVideo;
        if (currentActive && currentActive.paused) {
          currentActive.playbackRate = 0.85;
          currentActive.play().catch(() => {});
        }
      }, 1800);
    };

    const updateLoop = () => {
      if (isUserScrubbing) {
        currentLeft += (targetLeft - currentLeft) * 0.32;
        currentRight += (targetRight - currentRight) * 0.32;

        const active = activeSideRef.current;
        if (active === 'left' && leftVideo) {
          performSeek(leftVideo, currentLeft, 'left');
        } else if (active === 'right' && rightVideo) {
          performSeek(rightVideo, currentRight, 'right');
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
      leftVideo.removeEventListener('seeked', handleLeftSeeked);
      rightVideo.removeEventListener('seeked', handleRightSeeked);
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
