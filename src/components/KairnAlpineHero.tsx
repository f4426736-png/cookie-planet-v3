import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowUpRight, User, ShoppingBag, ArrowRight } from 'lucide-react';

interface KairnAlpineHeroProps {
  isOpen?: boolean;
  onClose: () => void;
  onSwitchToArchive?: () => void;
}

const PLATE_PHOTO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg';
const MOTION_VIDEO =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4';
const SKIER_THUMBNAIL =
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=180&q=80';

export const KairnAlpineHero: React.FC<KairnAlpineHeroProps> = ({
  isOpen = true,
  onClose,
  onSwitchToArchive,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

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
      className="kairn-root fixed inset-0 z-[9999] overflow-x-hidden overflow-y-auto select-none bg-[#091523] text-white"
      style={{
        fontFamily: "'Anybody', 'Inter Tight', sans-serif",
      }}
    >
      <style>{`
        .kairn-root {
          --k: min(100vw / 1546, 100vh / 1017);
          --ice-cyan: #44DAFD;
          --cream-card: #F3F1E9;
          --navy-shade: rgba(22, 52, 84, 0.34);
        }

        .font-anybody {
          font-family: 'Anybody', sans-serif;
          font-stretch: 130%;
        }

        .font-anybody-wide {
          font-family: 'Anybody', sans-serif;
          font-stretch: 145%;
        }

        /* Headline stroke outline effect for VISION */
        .text-outline-cyan {
          -webkit-text-stroke: 1.5px #44DAFD;
          color: transparent;
        }

        @keyframes kairnFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes kairnScaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes kairnLineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .kairn-anim-header {
          animation: kairnFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .kairn-anim-hero-text {
          animation: kairnFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }
        .kairn-anim-cluster {
          animation: kairnScaleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
        }
        .kairn-anim-bottom {
          animation: kairnFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
        }
        .kairn-anim-rule {
          animation: kairnLineDraw 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
          transform-origin: left;
        }
      `}</style>

      {/* 1. SCENE BACKGROUND (FULL-BLEED 16:10 PLATE + 5s VIDEO LOOP) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A1827]">
        {/* High-res static plate */}
        <img
          src={PLATE_PHOTO}
          alt="KAIRN Alpine 26 - Model in white puffer suit and ice-blue mirrored goggles"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: '50% 30%',
          }}
        />

        {/* Video loop overlay with identical cover rules */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={MOTION_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: '50% 30%',
            }}
          />
        )}

        {/* Soft, cool navy side-shade for pristine readability:
            rgba(22,52,84,.34) -> 0 by 55% from the left, and .2 at far right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(22,52,84,0.45) 0%, rgba(22,52,84,0.34) 28%, rgba(22,52,84,0) 55%, rgba(22,52,84,0.08) 80%, rgba(22,52,84,0.22) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* 2. MAIN MEASURED 1546x1017 CANVAS */}
      <div className="relative z-20 min-h-screen w-full flex flex-col justify-between p-4 sm:p-7 md:p-[calc(34*var(--k))]">

        {/* --- TOP ROW / NAV --- */}
        <header
          className="kairn-anim-header w-full flex items-center justify-between z-30"
          style={{ minHeight: 'calc(44 * var(--k))' }}
        >
          {/* Top Left: Cookie Planet Winter Apparel wordmark */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className="font-anybody-wide font-extrabold tracking-[0.06em] text-[20px] sm:text-[24px] md:text-[calc(26*var(--k))] cursor-pointer leading-none flex items-center gap-1.5"
            >
              <span className="text-[#44DAFD]">COOKIE</span>
              <span className="text-white">PLANET</span>
              <span className="text-[10px] md:text-[calc(11*var(--k))] font-bold text-black bg-[#44DAFD] px-2 py-0.5 rounded-full ml-1 font-sans">
                WINTER
              </span>
            </span>

            {/* Quick button to toggle back to Merch Archive */}
            {onSwitchToArchive && (
              <button
                type="button"
                onClick={onSwitchToArchive}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 backdrop-blur-md cursor-pointer transition-all ml-3"
              >
                <span>← Merch Archive</span>
              </button>
            )}
          </div>

          {/* Top Centre: "COLECCIÓN / NUESTRO MUNDO" */}
          <nav className="hidden md:flex items-center gap-8 font-anybody font-bold text-[calc(13*var(--k))] tracking-[0.14em] uppercase text-white/90">
            <a
              href="#collection"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#44DAFD] transition-colors cursor-pointer"
            >
              COLECCIÓN INVERNAL
            </a>
            <span className="text-white/30 text-xs">/</span>
            <a
              href="#our-world"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#44DAFD] transition-colors cursor-pointer"
            >
              UNIVERSO COOKIE
            </a>
          </nav>

          {/* Top Right: Account, BAG, round white counter "0" & Exit */}
          <div className="flex items-center gap-3 md:gap-[calc(16*var(--k))]">
            <button
              type="button"
              aria-label="Cuenta"
              className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 md:w-[calc(18*var(--k))] md:h-[calc(18*var(--k))]" />
            </button>

            <div className="flex items-center gap-2 cursor-pointer font-anybody font-bold text-xs md:text-[calc(13*var(--k))] tracking-[0.12em] uppercase text-white hover:text-[#44DAFD] transition-colors">
              <ShoppingBag className="w-4 h-4 md:w-[calc(16*var(--k))] md:h-[calc(16*var(--k))]" />
              <span>BAG</span>
              <span className="w-5 h-5 rounded-full bg-white text-black font-sans font-bold text-[10px] flex items-center justify-center">
                0
              </span>
            </div>

            {/* Exit to Cookie Planet */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana KAIRN"
              className="ml-2 w-8 h-8 md:w-[calc(34*var(--k))] md:h-[calc(34*var(--k))] rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/20 hover:scale-105"
            >
              <X className="w-4 h-4 md:w-[calc(16*var(--k))] md:h-[calc(16*var(--k))]" />
            </button>
          </div>
        </header>

        {/* --- MIDDLE CANVAS (HERO HEADLINE LEFT & 2x2 TILE CLUSTER RIGHT) --- */}
        <div className="relative flex-1 w-full flex flex-col xl:flex-row items-center justify-between gap-8 py-6 md:py-[calc(24*var(--k))]">
          
          {/* MIDDLE LEFT: Dots, Eyebrow & FORM. / FUNCTION. / VISION */}
          <div className="kairn-anim-hero-text flex flex-col items-start max-w-xl xl:max-w-[calc(760*var(--k))] z-20">
            {/* Three Slider Dots (first cyan) */}
            <div className="flex items-center gap-2 mb-4 md:mb-[calc(18*var(--k))]">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  aria-label={`Diapositiva ${dot + 1}`}
                  onClick={() => setActiveDot(dot)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeDot === dot
                      ? 'w-7 md:w-[calc(28*var(--k))] h-2 md:h-[calc(8*var(--k))] bg-[#44DAFD] shadow-[0_0_12px_rgba(68,218,253,0.8)]'
                      : 'w-2 h-2 md:w-[calc(8*var(--k))] md:h-[calc(8*var(--k))] bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Eyebrow: HORNEADO PARA LOS DÍAS BLANCOS */}
            <p
              className="font-anybody font-extrabold uppercase tracking-[0.24em] text-[#44DAFD] text-xs sm:text-sm md:text-[calc(14*var(--k))] mb-2 md:mb-[calc(10*var(--k))]"
            >
              CRAFTED FOR THE COLDEST DAYS · WINTER APPAREL
            </p>

            {/* Huge wide headline: FORM. / CRAFT. / VISION */}
            <h1
              className="font-anybody-wide font-extralight uppercase leading-[0.92] tracking-[-0.04em] text-white"
              style={{
                fontSize: 'clamp(48px, 8.5vw, calc(108 * var(--k)))',
              }}
            >
              <span className="block font-light">FORM.</span>
              <span className="block font-light">CRAFT.</span>
              <span className="block font-bold text-outline-cyan tracking-tight mt-1">
                VISION
              </span>
            </h1>
          </div>

          {/* MIDDLE RIGHT: 2x2 TILE CLUSTER */}
          <div
            className="kairn-anim-cluster grid grid-cols-2 gap-3 md:gap-[calc(16*var(--k))] w-full sm:w-[380px] md:w-[440px] xl:w-[calc(480*var(--k))] z-20"
          >
            {/* Tile 1: Lens Card (Cyan) */}
            <div
              className="rounded-2xl md:rounded-[calc(20*var(--k))] p-5 md:p-[calc(22*var(--k))] flex flex-col justify-between text-black transition-transform hover:scale-[1.02] cursor-pointer shadow-2xl"
              style={{
                backgroundColor: '#44DAFD',
                minHeight: 'calc(170 * var(--k))',
              }}
            >
              <span className="font-anybody font-bold text-[10px] md:text-[calc(11*var(--k))] tracking-[0.2em] uppercase text-black/70">
                01 / EDICIÓN ESPECIAL
              </span>

              <div className="my-2">
                <span className="font-anybody-wide font-extrabold text-2xl md:text-[calc(30*var(--k))] leading-[0.95] tracking-tight block text-black">
                  BLUE
                  <br />
                  FROST
                </span>
              </div>

              <span className="font-sans text-[11px] md:text-[calc(12*var(--k))] text-black/85 font-medium">
                Gafas Glaciar & Puffer Gear
              </span>
            </div>

            {/* Tile 2: Beside it "ALPINE 26" */}
            <div
              className="rounded-2xl md:rounded-[calc(20*var(--k))] p-5 md:p-[calc(22*var(--k))] flex flex-col justify-between backdrop-blur-xl border border-white/20 transition-transform hover:scale-[1.02] cursor-pointer shadow-2xl"
              style={{
                backgroundColor: 'rgba(22, 52, 84, 0.45)',
                minHeight: 'calc(170 * var(--k))',
              }}
            >
              <span className="font-anybody font-bold text-[10px] md:text-[calc(11*var(--k))] tracking-[0.2em] uppercase text-[#44DAFD]">
                COOKIE PLANET
              </span>

              <div className="my-2">
                <span className="font-anybody-wide font-extrabold text-3xl md:text-[calc(38*var(--k))] leading-[0.9] tracking-tight text-white block">
                  ALPINE
                  <br />
                  <span className="text-[#44DAFD]">26</span>
                </span>
              </div>

              <span className="font-sans text-[11px] md:text-[calc(12*var(--k))] text-white/70">
                Colección Nevada Limitada
              </span>
            </div>

            {/* Tile 3: Glass Circle with Arrow & Progress Arc */}
            <div
              className="rounded-2xl md:rounded-[calc(20*var(--k))] p-4 md:p-[calc(18*var(--k))] flex items-center justify-between backdrop-blur-xl border border-white/25 transition-transform hover:scale-[1.02] cursor-pointer shadow-2xl"
              style={{
                backgroundColor: 'rgba(68, 218, 253, 0.14)',
                minHeight: 'calc(130 * var(--k))',
              }}
            >
              <div className="relative w-14 h-14 md:w-[calc(64*var(--k))] md:h-[calc(64*var(--k))] rounded-full border border-white/20 flex items-center justify-center bg-black/30">
                {/* Cyan Arc Progress */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    className="stroke-[#44DAFD] fill-none"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset="65"
                    strokeLinecap="round"
                  />
                </svg>
                <ArrowUpRight className="w-5 h-5 text-[#44DAFD]" />
              </div>

              <div className="text-right">
                <span className="font-anybody-wide font-bold text-lg md:text-[calc(22*var(--k))] text-white block">
                  01 <span className="text-[#44DAFD] text-sm">/ 04</span>
                </span>
                <span className="font-sans text-[10px] md:text-[calc(11*var(--k))] uppercase tracking-wider text-white/60">
                  Piezas Clave
                </span>
              </div>
            </div>

            {/* Tile 4: Product Card (Cream) */}
            <div
              className="rounded-2xl md:rounded-[calc(20*var(--k))] p-4 md:p-[calc(18*var(--k))] flex flex-col justify-between text-black transition-transform hover:scale-[1.02] cursor-pointer shadow-2xl"
              style={{
                backgroundColor: '#F3F1E9',
                minHeight: 'calc(130 * var(--k))',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-anybody font-extrabold text-[11px] md:text-[calc(12*var(--k))] tracking-wider uppercase text-black/80">
                  DROPS 2026-27
                </span>
                <span className="w-2 h-2 rounded-full bg-[#44DAFD]" />
              </div>

              <p className="font-anybody font-bold text-xs md:text-[calc(13*var(--k))] text-black tracking-tight uppercase leading-tight my-1">
                Gafas Espejadas + Beanie
              </p>

              <span className="font-sans font-semibold text-[10px] md:text-[calc(11*var(--k))] text-black/70 flex items-center gap-1 group">
                <span>VER PRODUCTO MERCH</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: STORY CARD, BUTTON ON HORIZONTAL RULE & SOCIALS --- */}
        <div className="kairn-anim-bottom relative z-20 w-full pt-4 md:pt-[calc(20*var(--k))]">
          
          {/* Thin horizontal rule across the page */}
          <div className="kairn-anim-rule absolute top-0 left-0 right-0 h-[1px] bg-white/20" />

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
            
            {/* Bottom Left: Frosted navy glass story card with skier thumbnail */}
            <div
              className="flex items-center gap-3.5 p-2.5 md:p-[calc(12*var(--k))] rounded-2xl backdrop-blur-2xl border border-white/20 max-w-sm shadow-xl"
              style={{
                backgroundColor: 'rgba(22, 52, 84, 0.42)',
              }}
            >
              <img
                src={SKIER_THUMBNAIL}
                alt="Cookie Planet Alpine winter edition"
                className="w-12 h-12 md:w-[calc(50*var(--k))] md:h-[calc(50*var(--k))] rounded-xl object-cover shrink-0 border border-white/30"
              />
              <div className="flex flex-col text-left">
                <span className="font-anybody font-bold text-[10px] md:text-[calc(11*var(--k))] uppercase tracking-widest text-[#44DAFD]">
                  COLECCIÓN GLACIAR COOKIE
                </span>
                <p className="font-sans text-[11px] md:text-[calc(12*var(--k))] text-white/85 leading-snug">
                  Prendas técnicas y accesorios de invierno creados para la comunidad Cookie Planet.{' '}
                  <span className="underline text-white font-medium cursor-pointer hover:text-[#44DAFD]">
                    Conocer más
                  </span>
                </p>
              </div>
            </div>

            {/* Bottom Centre: Cyan "EXPLORAR COLECCIÓN" Button */}
            <div className="relative">
              <button
                type="button"
                className="font-anybody font-black uppercase tracking-[0.16em] text-black rounded-full shadow-[0_10px_35px_rgba(68,218,253,0.45)] hover:bg-[#6FE3FF] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2"
                style={{
                  backgroundColor: '#44DAFD',
                  padding: 'calc(14*var(--k)) calc(36*var(--k))',
                  fontSize: 'calc(13*var(--k))',
                }}
              >
                <span>EXPLORAR COLECCIÓN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Right: "FOLLOW US" and 3 outline social icons (first cyan ring) */}
            <div className="flex items-center gap-3">
              <span className="font-anybody font-bold text-xs md:text-[calc(12*var(--k))] tracking-[0.2em] uppercase text-white/70">
                FOLLOW US
              </span>
              <div className="flex items-center gap-2">
                {/* X / Twitter (ringed in cyan) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X Twitter"
                  className="w-8 h-8 md:w-[calc(32*var(--k))] md:h-[calc(32*var(--k))] rounded-full border-2 border-[#44DAFD] text-[#44DAFD] flex items-center justify-center hover:bg-[#44DAFD] hover:text-black transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 md:w-[calc(32*var(--k))] md:h-[calc(32*var(--k))] rounded-full border border-white/40 text-white flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 md:w-[calc(32*var(--k))] md:h-[calc(32*var(--k))] rounded-full border border-white/40 text-white flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KairnAlpineHero;
