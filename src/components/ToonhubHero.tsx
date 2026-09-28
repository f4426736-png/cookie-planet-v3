import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CookieItemMeta {
  src: string;
  bg: string;
  panel: string;
  name: string;
  desc: string;
  slug: string;
}

const IMAGES: CookieItemMeta[] = [
  {
    src: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/1.1.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    name: 'CHOCOLATE CHIP',
    desc: 'El clásico indiscutible. Horneadas con generosas chispas de chocolate y centro suave que se derrite al primer bocado.',
    slug: 'chocolate-chip',
  },
  {
    src: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/2.1.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    name: 'RED VELVET',
    desc: 'Elegancia aterciopelada con notas sutiles de cacao puro y un toque cremoso suave inspirado en la repostería fina.',
    slug: 'red-velvet',
  },
  {
    src: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/3.1.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    name: 'OATMEAL RAISIN',
    desc: 'Textura rústica y reconfortante elaborada con avena tostada, pasas seleccionadas y un toque aromático de canela.',
    slug: 'oatmeal-raisin',
  },
  {
    src: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/4.1.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    name: 'COOKIES & CREAM',
    desc: 'Intensidad de galleta oscura con crujientes trozos triturados a mano combinados con suave crema dulce.',
    slug: 'cookies-and-cream',
  },
];

interface ToonhubHeroProps {
  onCookieClick?: (slugOrIndex: string | number) => void;
}

export const ToonhubHero: React.FC<ToonhubHeroProps> = ({ onCookieClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate handler
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);

      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
      );

      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  // Derive roles
  const getRole = (idx: number) => {
    if (idx === activeIndex) return 'center';
    if (idx === (activeIndex + 3) % 4) return 'left';
    if (idx === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant ghost text "COOKIES" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: '#ffffff',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          COOKIES
        </div>

        {/* 3. Top-left brand label "COOKIE PLANET • SABORES" */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white tracking-[0.18em]"
          style={{ zIndex: 60, opacity: 0.9 }}
        >
          COOKIE PLANET • SABORES
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);

            let roleStyles: React.CSSProperties = {};

            if (role === 'center') {
              roleStyles = {
                transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.12})`,
                filter: 'none',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isMobile ? '72%' : '88%',
                bottom: isMobile ? '16%' : '3%',
              };
            } else if (role === 'left') {
              roleStyles = {
                transform: 'translateX(-50%) scale(0.9)',
                filter: 'blur(1.5px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '18%' : '26%',
                height: isMobile ? '22%' : '38%',
                bottom: isMobile ? '30%' : '14%',
              };
            } else if (role === 'right') {
              roleStyles = {
                transform: 'translateX(-50%) scale(0.9)',
                filter: 'blur(1.5px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '82%' : '74%',
                height: isMobile ? '22%' : '38%',
                bottom: isMobile ? '30%' : '14%',
              };
            } else {
              // back
              roleStyles = {
                transform: 'translateX(-50%) scale(0.85)',
                filter: 'blur(3px)',
                opacity: 0.9,
                zIndex: 5,
                left: '50%',
                height: isMobile ? '18%' : '28%',
                bottom: isMobile ? '30%' : '14%',
              };
            }

            const isCenter = role === 'center';

            return (
              <div
                key={item.src}
                onClick={() => {
                  if (onCookieClick) {
                    onCookieClick(item.slug);
                  }
                }}
                title={`Ver ventana interna de ${item.name}`}
                aria-label={`Ver ventana interna de ${item.name}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCookieClick?.(item.slug);
                  }
                }}
                className={`absolute flex items-end justify-center cursor-pointer group ${
                  isCenter ? 'hover:scale-[1.03] transition-transform duration-300' : 'hover:opacity-100 hover:brightness-110'
                }`}
                style={{
                  width: role === 'center' ? (isMobile ? '86%' : '65%') : (isMobile ? '32%' : '22%'),
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), width 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyles,
                }}
              >
                <img
                  src={item.src}
                  alt={`Galleta ${item.name}`}
                  draggable={false}
                  className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{
                    objectPosition: 'bottom center',
                  }}
                />

                {/* Floating "Explorar sabor" pill indicator for center cookie */}
                {isCenter && (
                  <div className="absolute top-1/4 sm:top-1/3 left-1/2 -translate-x-1/2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all pointer-events-none shadow-2xl border border-white/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Explorar sabor →</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: '340px' }}
        >
          <p
            className="font-bold uppercase tracking-[0.02em] mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{ opacity: 0.95 }}
          >
            {IMAGES[activeIndex].name}
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white/90 leading-[1.6] mb-4 sm:mb-5 drop-shadow-sm min-h-[48px]"
            style={{ opacity: 0.9 }}
          >
            {IMAGES[activeIndex].desc}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous cookie"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white cursor-pointer select-none transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #ffffff',
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate('next')}
              aria-label="Next cookie"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white cursor-pointer select-none transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #ffffff',
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "VER GALLETA" */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <button
            type="button"
            onClick={() => onCookieClick?.(IMAGES[activeIndex].slug)}
            className="flex items-center gap-2 text-white transition-opacity duration-200 uppercase no-underline hover:opacity-100 cursor-pointer group"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span>VER GALLETA</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-2" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </section>
  );
};
