import React, { useState, useRef, useEffect } from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

interface MarenFashionHeroProps {
  isOpen?: boolean;
  onClose: () => void;
  onSwitchToArchive?: () => void;
}

const HERO_PHOTO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/8c8bd1ea-b9f8-4755-b2db-ca972fa9a381.jpg';
const POLAROID_PHOTO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4612f265-40f3-4fc9-af4c-b03c289c2b75.jpg';
const MOTION_VIDEO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0b9dbcc0-b9fc-4c2c-9418-458e4e829c59.mp4';

export const MarenFashionHero: React.FC<MarenFashionHeroProps> = ({
  isOpen = true,
  onClose,
  onSwitchToArchive,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bagCount, setBagCount] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Seamless crossfade loop handling:
  // Video duration is ~4.0s. When reaching 3.0s, we smoothly crossfade the volume / loop boundary
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {});
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="maren-root fixed inset-0 z-[9999] overflow-hidden select-none bg-[#3B2F5C] text-white"
      style={{
        fontFamily: "'Inter Tight', 'Inter', sans-serif",
      }}
    >
      {/* Scope CSS Animations and Grid layout via inline styles */}
      <style>{`
        .maren-root {
          --u: min(100vw / 1155, 100vh / 767);
          --col-1: calc(200.6 * var(--u));
          --col-2: calc(843.6 * var(--u));
          --row-1: calc(64 * var(--u));
          --row-2: calc(405.2 * var(--u));
          --grid-line: rgba(255, 255, 255, 0.24);
          --glass-tint: rgba(112, 84, 150, 0.34);
          --peach-star: #F4B8A2;
        }

        /* Responsive adaptation for mobile portrait */
        @media (max-width: 820px), (max-aspect-ratio: 1/1) {
          .maren-root {
            --u: min(100vw / 390, 100vh / 780);
            --col-1: 18px;
            --col-2: calc(100vw - 18px);
            --row-1: 64px;
            --row-2: 52%;
          }
        }

        @keyframes marenFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marenDropIn {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marenPolaroidDrop {
          0% {
            opacity: 0;
            transform: translateY(-40px) rotate(0deg) scale(0.92);
          }
          65% {
            transform: translateY(4px) rotate(-14.5deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(-13deg) scale(1);
          }
        }

        .maren-anim-header {
          animation: marenDropIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .maren-anim-h1-1 {
          animation: marenFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both;
        }
        .maren-anim-h1-2 {
          animation: marenFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both;
        }
        .maren-anim-h1-3 {
          animation: marenFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .maren-anim-copy {
          animation: marenFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
        }

        .maren-anim-polaroid {
          animation: marenPolaroidDrop 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.2) 0.65s both;
        }

        .maren-anim-watermark {
          animation: marenFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>

      {/* 1. MEDIA LAYER (FULL-BLEED BACKGROUND PHOTO + MOTION LOOP) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#3B2F5C]">
        {/* Fallback & primary high-res static photo */}
        <img
          src={HERO_PHOTO}
          alt="MAREN Winter Collection - Model in lilac sweater at sunset"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Video loop overlay (fades in when ready, muted, disabled on prefers-reduced-motion) */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={MOTION_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-800 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Subtle glass atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* 2. THIN WHITE GRID LINES (LAYOUT: 200.6/1155, 843.6/1155, 405.2/767 & Top Rule) */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {/* Top rule under navigation */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.24)]"
          style={{ top: 'calc(68 * var(--u))' }}
        />
        {/* Horizontal grid line */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.24)]"
          style={{ top: 'calc(405.2 * var(--u))' }}
        />
        {/* Left vertical grid line (200.6/1155) */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.24)]"
          style={{ left: 'calc(200.6 * var(--u))' }}
        />
        {/* Right vertical grid line (843.6/1155) */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.24)]"
          style={{ left: 'calc(843.6 * var(--u))' }}
        />
      </div>

      {/* 3. GIANT ITALIC WATERMARK ("COOKIE PLANET" across the bottom at low opacity, partly behind model foreground) */}
      <div
        className="maren-anim-watermark absolute bottom-0 left-0 w-full flex justify-center items-end pointer-events-none overflow-hidden z-10"
        style={{ height: 'calc(250 * var(--u))' }}
      >
        <span
          className="font-playfair italic font-normal text-white opacity-[0.07] tracking-tight leading-none uppercase whitespace-nowrap select-none"
          style={{
            fontSize: 'calc(170 * var(--u))',
            transform: 'translateY(12%)',
          }}
        >
          COOKIE PLANET
        </span>
      </div>

      {/* 4. MAIN CONTENT CONTAINER (1155x767 aspect reference frame) */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-0">
        
        {/* --- NAVIGATION BAR --- */}
        <header
          className="maren-anim-header w-full flex items-center justify-between md:px-[calc(34*var(--u))] z-30"
          style={{ height: 'calc(68 * var(--u))' }}
        >
          {/* Brand Logo "COOKIE PLANET" in Playfair italic + Merch label */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span
                className="font-playfair italic text-white text-[22px] sm:text-[28px] md:text-[calc(30*var(--u))] font-normal tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
              >
                COOKIE PLANET
              </span>
              <span
                className="text-[10px] md:text-[calc(11*var(--u))] uppercase tracking-[0.25em] text-[#F4B8A2] font-semibold"
              >
                MERCH
              </span>
            </div>

            {/* Pill to toggle or return to Archive / Merch */}
            {onSwitchToArchive && (
              <button
                type="button"
                onClick={onSwitchToArchive}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 backdrop-blur-md cursor-pointer transition-all ml-4"
              >
                <span>← Merch Archive 3D</span>
              </button>
            )}
          </div>

          {/* Right Nav: APPAREL · ARCHIVE · LOOKBOOK + Round Glass Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-0">
            {/* Editorial Nav Items separated by vertical rules */}
            <nav className="hidden md:flex items-center text-[calc(11*var(--u))] font-medium tracking-[0.16em] uppercase text-white/90">
              <a
                href="#apparel"
                onClick={(e) => e.preventDefault()}
                className="px-[calc(20*var(--u))] hover:text-white transition-colors cursor-pointer"
              >
                APPAREL
              </a>
              <span className="w-[1px] h-[calc(18*var(--u))] bg-[rgba(255,255,255,0.24)]" />
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSwitchToArchive) onSwitchToArchive();
                }}
                className="px-[calc(20*var(--u))] hover:text-white transition-colors cursor-pointer"
              >
                ARCHIVE
              </a>
              <span className="w-[1px] h-[calc(18*var(--u))] bg-[rgba(255,255,255,0.24)]" />
              <a
                href="#lookbook"
                onClick={(e) => e.preventDefault()}
                className="px-[calc(20*var(--u))] hover:text-white transition-colors cursor-pointer"
              >
                LOOKBOOK
              </a>
            </nav>

            {/* Round Glass Icon Buttons (Heart + Bag) */}
            <div className="flex items-center gap-2 md:gap-[calc(10*var(--u))] md:ml-[calc(28*var(--u))]">
              {/* Heart Button */}
              <button
                type="button"
                aria-label="Guardar en favoritos"
                onClick={() => setLiked(!liked)}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-[calc(40*var(--u))] md:h-[calc(40*var(--u))] rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/25 hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'rgba(112, 84, 150, 0.34)' }}
              >
                <Heart
                  className={`w-4 h-4 md:w-[calc(17*var(--u))] md:h-[calc(17*var(--u))] transition-colors ${
                    liked ? 'fill-[#F4B8A2] text-[#F4B8A2]' : 'text-white'
                  }`}
                />
              </button>

              {/* Bag Button */}
              <button
                type="button"
                aria-label="Ver bolsa de compras"
                onClick={() => setBagCount((c) => c + 1)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-[calc(40*var(--u))] md:h-[calc(40*var(--u))] rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/25 hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'rgba(112, 84, 150, 0.34)' }}
              >
                <ShoppingBag className="w-4 h-4 md:w-[calc(17*var(--u))] md:h-[calc(17*var(--u))] text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] rounded-full bg-[#F4B8A2] text-black font-bold flex items-center justify-center">
                  {bagCount}
                </span>
              </button>

              {/* Close Button to return to Cookie Planet */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana MAREN"
                className="ml-1 sm:ml-2 w-9 h-9 sm:w-10 sm:h-10 md:w-[calc(40*var(--u))] md:h-[calc(40*var(--u))] rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/20 hover:scale-105"
              >
                <X className="w-4 h-4 md:w-[calc(18*var(--u))] md:h-[calc(18*var(--u))]" />
              </button>
            </div>
          </div>
        </header>

        {/* --- MAIN HERO BODY (GRID INTERIOR) --- */}
        <div className="relative flex-1 w-full flex flex-col justify-between md:block overflow-hidden">
          
          {/* HEADLINE: Left/Center Column (Between 200.6 and 843.6 px) */}
          <div
            className="md:absolute z-20 flex flex-col justify-start pt-4 sm:pt-8 md:pt-0"
            style={{
              top: 'calc(105 * var(--u))',
              left: 'calc(235 * var(--u))',
              maxWidth: 'calc(580 * var(--u))',
            }}
          >
            <h1 className="leading-[1.02] tracking-[-0.035em]">
              <span
                className="maren-anim-h1-1 block font-light text-white text-[32px] sm:text-[46px] md:text-[calc(58*var(--u))]"
                style={{ fontWeight: 300 }}
              >
                Signature
              </span>
              <span
                className="maren-anim-h1-2 block font-light text-white text-[32px] sm:text-[46px] md:text-[calc(58*var(--u))]"
                style={{ fontWeight: 300 }}
              >
                Knitwear for
              </span>
              <span
                className="maren-anim-h1-3 block font-playfair italic font-normal text-white text-[50px] sm:text-[72px] md:text-[calc(90*var(--u))] -mt-1 sm:-mt-2 md:-mt-[calc(8*var(--u))]"
              >
                Cookie Lovers
              </span>
            </h1>
          </div>

          {/* RIGHT COLUMN (Past 843.6px line) */}
          <div
            className="maren-anim-copy md:absolute z-20 flex flex-col items-start pt-4 md:pt-0"
            style={{
              top: 'calc(110 * var(--u))',
              left: 'calc(875 * var(--u))',
              width: 'calc(245 * var(--u))',
            }}
          >
            {/* Peach Star with "EDICIÓN LIMITADA 2027" */}
            <div className="flex items-center gap-2 mb-3 md:mb-[calc(20*var(--u))]">
              {/* Peach 4-point Star icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 md:w-[calc(16*var(--u))] md:h-[calc(16*var(--u))] fill-[#F4B8A2] text-[#F4B8A2]"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <span
                className="text-[11px] md:text-[calc(12*var(--u))] font-medium tracking-[0.2em] uppercase"
                style={{ color: '#F4B8A2' }}
              >
                LIMITED DROP 2027
              </span>
            </div>

            {/* Editorial Description Text */}
            <p
              className="hidden md:block font-normal text-white/85 leading-[1.5] text-left mb-[calc(28*var(--u))]"
              style={{
                fontSize: 'calc(13 * var(--u))',
              }}
            >
              Prendas de autor inspiradas en la calidez de nuestras recetas. Tejidos de
              punto grueso en tonos lila pastel creados para disfrutar cada momento dulce.
            </p>

            {/* CTAs: "View Collection" Pill + Round Arrow Button */}
            <div className="flex items-center gap-[calc(10*var(--u))]">
              <button
                type="button"
                className="rounded-full bg-white text-black font-semibold tracking-[-0.01em] shadow-xl hover:bg-white/90 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                style={{
                  padding: 'calc(12*var(--u)) calc(24*var(--u))',
                  fontSize: 'calc(13*var(--u))',
                }}
              >
                Ver Colección
              </button>

              <button
                type="button"
                aria-label="Explorar producto"
                className="rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                style={{
                  width: 'calc(44*var(--u))',
                  height: 'calc(44*var(--u))',
                  backgroundColor: 'rgba(112, 84, 150, 0.34)',
                }}
              >
                <ArrowRight className="w-4 h-4 md:w-[calc(16*var(--u))] md:h-[calc(16*var(--u))]" />
              </button>
            </div>
          </div>

          {/* BOTTOM-LEFT: "COOKIE / PLANET / MERCH" (Inside left column, below horizontal rule) */}
          <div
            className="hidden md:flex flex-col z-20 absolute"
            style={{
              bottom: 'calc(38 * var(--u))',
              left: 'calc(34 * var(--u))',
            }}
          >
            <span
              className="font-light tracking-[0.22em] text-white/70 uppercase leading-[1.6]"
              style={{ fontSize: 'calc(11 * var(--u))' }}
            >
              COOKIE
              <br />
              PLANET
              <br />
              APPAREL
            </span>
          </div>

          {/* TILTED POLAROID (Overlaps the left column line at 200.6px, tilted -13°) */}
          <div
            className="maren-anim-polaroid z-30 self-end md:self-auto md:absolute cursor-pointer transition-transform duration-300 hover:rotate-[-10deg] hover:scale-105"
            style={{
              bottom: 'calc(38 * var(--u))',
              left: 'calc(140 * var(--u))',
            }}
          >
            {/* Authentic White Polaroid Card Frame */}
            <div
              className="bg-white text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.45)] rounded-[2px]"
              style={{
                padding: 'calc(9*var(--u)) calc(9*var(--u)) calc(18*var(--u)) calc(9*var(--u))',
                width: 'calc(178 * var(--u))',
              }}
            >
              {/* Polaroid Image Container */}
              <div
                className="w-full overflow-hidden bg-neutral-200"
                style={{ height: 'calc(210 * var(--u))' }}
              >
                <img
                  src={POLAROID_PHOTO}
                  alt="Stylist T-shirt polaroid snapshot on stone steps"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten style caption */}
              <p
                className="text-center font-normal tracking-wide text-neutral-700 select-none mt-[calc(8*var(--u))]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'calc(13 * var(--u))',
                }}
              >
                Cookie Planet T-shirt
              </p>
            </div>
          </div>
        </div>

        {/* Mobile bottom info bar */}
        <div className="md:hidden flex items-center justify-between pt-2 pb-1 text-xs text-white/70 border-t border-white/10 z-20">
          <span className="tracking-widest uppercase">COOKIE PLANET MERCH 2027</span>
          <span>APPAREL COLLECTION</span>
        </div>
      </div>
    </div>
  );
};

export default MarenFashionHero;
