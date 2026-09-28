import { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT_URL, VIDEO_RIGHT_URL } from '../data/prmptData';

const TOTAL_FRAMES = 45; // 45 frames por lado para respuesta 120 FPS sin latencia

export default function HeroVideoScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Buffers de frames precargados en memoria RAM
  const leftFramesRef = useRef<ImageBitmap[]>([]);
  const rightFramesRef = useRef<ImageBitmap[]>([]);

  const [isReady, setIsReady] = useState(false);
  const activeSideRef = useRef<'left' | 'right'>('right');

  useEffect(() => {
    let isCancelled = false;

    // Extractor de fotogramas a ImageBitmap mediante canvas offscreen de alta velocidad
    const extractFramesFromVideo = async (url: string): Promise<ImageBitmap[]> => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        const frames: ImageBitmap[] = [];

        video.onloadedmetadata = async () => {
          const duration = video.duration || 2.5;
          const w = 960; // Resolución optimizada para renderizado retina instantáneo
          const h = Math.round((video.videoHeight / video.videoWidth) * w) || 540;

          const offscreenCanvas = document.createElement('canvas');
          offscreenCanvas.width = w;
          offscreenCanvas.height = h;
          const ctx = offscreenCanvas.getContext('2d', { alpha: false });

          const step = duration / (TOTAL_FRAMES - 1);

          for (let i = 0; i < TOTAL_FRAMES; i++) {
            if (isCancelled) break;
            const targetTime = i * step;

            await new Promise<void>((res) => {
              const onSeeked = async () => {
                video.removeEventListener('seeked', onSeeked);
                if (ctx) {
                  ctx.drawImage(video, 0, 0, w, h);
                  try {
                    const bitmap = await createImageBitmap(offscreenCanvas);
                    frames.push(bitmap);
                  } catch {
                    // Fallback
                  }
                }
                res();
              };
              video.addEventListener('seeked', onSeeked);
              video.currentTime = targetTime;
            });
          }

          resolve(frames);
        };

        video.onerror = () => {
          resolve([]);
        };
      });
    };

    const loadAll = async () => {
      // Extraemos ambos en paralelo
      const [left, right] = await Promise.all([
        extractFramesFromVideo(VIDEO_LEFT_URL),
        extractFramesFromVideo(VIDEO_RIGHT_URL),
      ]);

      if (isCancelled) return;

      leftFramesRef.current = left;
      rightFramesRef.current = right;
      setIsReady(true);
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Ajustar resolución retina
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ocultar si baja más del 100vh
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      if (containerRef.current) {
        containerRef.current.style.visibility = scrollY >= vh ? 'hidden' : 'visible';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let targetLeftProgress = 0;
    let targetRightProgress = 0;
    let currentLeftProgress = 0;
    let currentRightProgress = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const centerX = width / 2;
      const mouseX = e.clientX;
      const deadZone = Math.max(30, width * 0.035);

      if (Math.abs(mouseX - centerX) <= deadZone) {
        targetLeftProgress = 0;
        targetRightProgress = 0;
        return;
      }

      if (mouseX < centerX - deadZone) {
        activeSideRef.current = 'left';
        const available = centerX - deadZone;
        targetLeftProgress = Math.max(0, Math.min(1, (centerX - deadZone - mouseX) / available));
      } else {
        activeSideRef.current = 'right';
        const available = width - (centerX + deadZone);
        targetRightProgress = Math.max(0, Math.min(1, (mouseX - (centerX + deadZone)) / available));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop estilo Apple Canvas 60-120 FPS
    const render = () => {
      const lerp = 0.18;
      currentLeftProgress += (targetLeftProgress - currentLeftProgress) * lerp;
      currentRightProgress += (targetRightProgress - currentRightProgress) * lerp;

      const active = activeSideRef.current;
      const frames = active === 'left' ? leftFramesRef.current : rightFramesRef.current;
      const progress = active === 'left' ? currentLeftProgress : currentRightProgress;

      if (frames.length > 0) {
        const frameIndex = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(progress * (frames.length - 1)))
        );

        const img = frames[frameIndex];
        if (img) {
          const w = window.innerWidth;
          const h = window.innerHeight;

          // Object-cover matemático sobre canvas
          const imgRatio = img.width / img.height;
          const screenRatio = w / h;
          let drawW = w;
          let drawH = h;
          let drawX = 0;
          let drawY = 0;

          if (screenRatio > imgRatio) {
            drawH = w / imgRatio;
            drawY = (h - drawH) / 2;
          } else {
            drawW = h * imgRatio;
            drawX = (w - drawW) / 2;
          }

          ctx.drawImage(img, drawX, drawY, drawW, drawH);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      id="main-canvas"
      className="pointer-events-none overflow-hidden transition-opacity duration-500 ease-out fixed z-0 inset-0 w-full h-full bg-[#E5E5E5]"
      style={{
        opacity: isReady ? 1 : 0.95,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block transform-gpu will-change-transform"
      />
    </div>
  );
}
