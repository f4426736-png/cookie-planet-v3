import React, { useRef, useEffect, useState } from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Base IDs on Cloudinary with dynamic transformation (f_auto = WebM/MP4 best format, q_auto = smart compression, w_700 = optimal resolution, vc_auto = best codec)
const getOptimizedVideoUrl = (videoId: string, version: string) =>
  `https://res.cloudinary.com/yxbhso8s/video/upload/f_auto,q_auto,vc_auto,w_700/${version}/${videoId}`;

const MARQUEE_VIDEOS = [
  {
    url: getOptimizedVideoUrl('7COOKIE_COTTON_CANDY_60FPS.mp4', 'v1790406178'),
    title: 'Cotton Candy Cookie',
  },
  {
    url: getOptimizedVideoUrl('1PINK_VELVET_CAKE_60FPS.mp4', 'v1790406184'),
    title: 'Pink Velvet Cake',
  },
  {
    url: getOptimizedVideoUrl('8COOKIE_CHOCOLATE_OREO_60FPS.mp4', 'v1790406194'),
    title: 'Chocolate Oreo Cookie',
  },
  {
    url: getOptimizedVideoUrl('3GALLETA_VAQUERA_OPCION_RECORTADA_LA_CAJA.mp4', 'v1790406161'),
    title: 'Galleta Vaquera',
  },
];

// Duplicate list to achieve a seamless infinite loop
const STRIP_VIDEOS = [...MARQUEE_VIDEOS, ...MARQUEE_VIDEOS];

export const ViktorStudioHero: React.FC = () => {
  const { ref, isInView } = useInViewAnimation(0.1);

  return (
    <section id="services" className="w-full bg-white pt-16 md:pt-24 pb-8 px-6 flex flex-col items-center text-center">
      <div ref={ref} className="max-w-[440px] mx-auto flex flex-col items-center">
        {/* Logo Text */}
        <h1
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } font-mondwest text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] tracking-tight mb-4 select-none`}
          style={{ animationDelay: '0.1s' }}
        >
          Viktor Oddy
        </h1>

        {/* Tagline */}
        <p
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } font-mono text-xs md:text-sm text-[#051A24] mb-2 tracking-wide`}
          style={{ animationDelay: '0.2s' }}
        >
          The creative studio of Viktor Oddy
        </p>

        {/* Main Heading */}
        <h2
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight mt-1`}
          style={{ animationDelay: '0.3s' }}
        >
          <span className="block whitespace-nowrap">
            Build the <span className="font-mondwest font-normal italic">next wave</span>,
          </span>
          <span className="block whitespace-nowrap">
            the <span className="font-mondwest font-normal italic">bold way</span>.
          </span>
        </h2>

        {/* Description Paragraphs */}
        <div
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } flex flex-col gap-6 text-sm md:text-base text-[#051A24] leading-relaxed mt-5 md:mt-6 text-left sm:text-center`}
          style={{ animationDelay: '0.4s' }}
        >
          <p>
            I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.
          </p>
          <p>
            The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.
          </p>
          <p className="font-medium">
            Projects start at $5,000 per month.
          </p>
        </div>

        {/* Two Buttons */}
        <div
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 w-full sm:w-auto justify-center`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button
            variant="primary"
            href="https://halaskastudio.com/./book"
            className="px-7 py-3 text-sm"
          >
            Start a chat
          </Button>
          <Button
            variant="secondary"
            href="#work"
            className="px-7 py-3 text-sm"
          >
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export const InfiniteMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white overflow-hidden pt-28 md:pt-36 pb-20 md:pb-24 select-none">
      <div className="w-full overflow-hidden">
        <div className="animate-marquee hover:[animation-play-state:paused]">
          {STRIP_VIDEOS.map((item, i) => (
            <div
              key={`${item.url}-${i}`}
              className="shrink-0 h-[280px] md:h-[500px] mx-3 rounded-2xl overflow-hidden shadow-lg bg-neutral-900 relative group"
            >
              {isInView ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-auto max-w-none object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-[280px] md:w-[500px] bg-neutral-900 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                <span className="text-white text-sm font-medium drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
