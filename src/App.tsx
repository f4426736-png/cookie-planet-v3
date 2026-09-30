import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import { ToonhubHero } from './components/ToonhubHero';
import { InfiniteMarquee } from './components/ViktorHero';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { CtaFaqFooterSection } from './components/CtaFaqFooterSection';
import { EngineTechFooter } from './components/EngineTechFooter';
import { AppleNav } from './components/AppleNav';
import { OrbisNftModal } from './components/OrbisNftModal';
import { FormaLandingModal } from './components/FormaLandingModal';
import { RedesSocialesModal } from './components/RedesSocialesModal';
import { CookiePage } from './components/CookiePage';
import { COOKIE_DETAILS } from './components/CookieDetailModal';
import PrmptExperience from './components/PrmptExperience';

// Cloudinary streaming optimizado para web background:
// w_1280 (720p es ideal para fondos fluidos sin saturar buffer ni memoria)
// q_auto:eco (compresión ligera que no pixela pero baja el bitrate a <1.2 Mbps)
// f_mp4 con vc_h264 para máxima fluidez y soporte nativo sin pausas por transcoding
const DEFAULT_VIDEO = 'https://res.cloudinary.com/yxbhso8s/video/upload/w_1280,q_auto:eco,vc_h264,f_mp4/v1790444492/GALLETA_DE_VARIOS_SABORES_compressed_1.mp4';
const FALLBACK_VIDEO_MP4 = 'https://res.cloudinary.com/yxbhso8s/video/upload/w_1280,q_auto:eco/v1790444492/GALLETA_DE_VARIOS_SABORES_compressed_1.mp4';
const DB_NAME = 'securify_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

// IndexedDB helper to save video files permanently in the browser
function openVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveVideoFileToDB(file: Blob): Promise<void> {
  const db = await openVideoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, 'custom_bg');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadVideoFileFromDB(): Promise<Blob | null> {
  try {
    const db = await openVideoDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('custom_bg');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function clearVideoFileFromDB(): Promise<void> {
  try {
    const db = await openVideoDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete('custom_bg');
  } catch {
    // Ignore error
  }
}

export default function App() {
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO);
  const [isCustomSaved, setIsCustomSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoSettingsOpen, setVideoSettingsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash;
    }
    return '';
  });
  const [activeCookiePage, setActiveCookiePage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#/galleta/')) {
        return hash.replace('#/galleta/', '');
      }
    }
    return null;
  });
  const [orbisNftOpen, setOrbisNftOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      return hash === '#/about' || hash === '#about';
    }
    return false;
  });
  const [formaOpen, setFormaOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      return hash === '#/contactanos' || hash === '#contactanos';
    }
    return false;
  });
  const [redesSocialesOpen, setRedesSocialesOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      return (
        hash === '#/redes-sociales' ||
        hash === '#redes-sociales' ||
        hash === '#/redes' ||
        hash === '#redes'
      );
    }
    return false;
  });
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleHeroPlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsHeroPaused(false)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsHeroPaused(true);
      }
    }
  };

  // Sync hash routing for #merch, #/about, #/contactanos, and cookie pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);

      if (hash.startsWith('#/galleta/')) {
        setActiveCookiePage(hash.replace('#/galleta/', ''));
      } else {
        setActiveCookiePage(null);
      }

      if (hash === '#/about' || hash === '#about') {
        setOrbisNftOpen(true);
      } else {
        setOrbisNftOpen(false);
      }

      if (hash === '#/contactanos' || hash === '#contactanos') {
        setFormaOpen(true);
      } else {
        setFormaOpen(false);
      }

      if (
        hash === '#/redes-sociales' ||
        hash === '#redes-sociales' ||
        hash === '#/redes' ||
        hash === '#redes'
      ) {
        setRedesSocialesOpen(true);
      } else {
        setRedesSocialesOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAbout = () => {
    window.location.hash = '#/about';
  };

  const closeAbout = () => {
    if (window.location.hash === '#/about' || window.location.hash === '#about') {
      window.location.hash = '';
    } else {
      setOrbisNftOpen(false);
    }
  };

  const openContact = () => {
    window.location.hash = '#/contactanos';
  };

  const closeContact = () => {
    if (window.location.hash === '#/contactanos' || window.location.hash === '#contactanos') {
      window.location.hash = '';
    } else {
      setFormaOpen(false);
    }
  };

  const openRedesSociales = () => {
    window.location.hash = '#/redes-sociales';
  };

  const closeRedesSociales = () => {
    if (
      window.location.hash === '#/redes-sociales' ||
      window.location.hash === '#redes-sociales' ||
      window.location.hash === '#/redes' ||
      window.location.hash === '#redes'
    ) {
      window.location.hash = '';
    } else {
      setRedesSocialesOpen(false);
    }
  };

  const navigateToCookiePage = (cookieIdOrIndex: string | number) => {
    let targetSlug: string;
    if (typeof cookieIdOrIndex === 'number') {
      const indexMap: Record<number, string> = {
        0: 'chocolate-chip',
        1: 'red-velvet',
        2: 'oatmeal-raisin',
        3: 'cookies-and-cream',
      };
      targetSlug = indexMap[cookieIdOrIndex] || COOKIE_DETAILS[cookieIdOrIndex]?.id || 'chocolate-chip';
    } else {
      targetSlug = cookieIdOrIndex;
    }

    // Normalizar variaciones al slug canónico correspondiente
    if (targetSlug === 'pink-velvet' || targetSlug === 'redvelvet' || targetSlug === 'red-velvet') {
      targetSlug = 'red-velvet';
    } else if (targetSlug === 'cotton-candy' || targetSlug === 'chocochip' || targetSlug === 'chocolate-chip') {
      targetSlug = 'chocolate-chip';
    } else if (targetSlug === 'chocolate-oreo' || targetSlug === 'cookies-cream' || targetSlug === 'cookies-and-cream' || targetSlug === 'galleta-vaquera') {
      targetSlug = 'cookies-and-cream';
    } else if (targetSlug === 'oatmeal' || targetSlug === 'oatmeal-raisin') {
      targetSlug = 'oatmeal-raisin';
    }

    window.location.hash = `#/galleta/${targetSlug}`;
    setCurrentHash(`#/galleta/${targetSlug}`);
    setActiveCookiePage(targetSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBackToHome = () => {
    window.location.hash = '';
    setCurrentHash('');
    setActiveCookiePage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load saved video from IndexedDB or localStorage on start if desired, default is the new compressed video
  useEffect(() => {
    async function initVideo() {
      // By default use the new high-performance compressed Cloudinary video with GPU stream
      const savedVersion = localStorage.getItem('securify_video_version');
      if (savedVersion !== 'v4_720p_smooth') {
        await clearVideoFileFromDB();
        localStorage.removeItem('securify_bg_video');
        localStorage.setItem('securify_video_version', 'v4_720p_smooth');
        setVideoSrc(DEFAULT_VIDEO);
        return;
      }

      const savedBlob = await loadVideoFileFromDB();
      if (savedBlob) {
        const url = URL.createObjectURL(savedBlob);
        setVideoSrc(url);
        setIsCustomSaved(true);
        return;
      }
      const savedUrl = localStorage.getItem('securify_bg_video');
      if (savedUrl) {
        setVideoSrc(savedUrl);
        setIsCustomSaved(true);
      }
    }
    initVideo();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    video.load();
    playVideo();

    // Loop fallback: if browser halts at the end of the video, restart immediately
    const handleEnded = () => {
      video.currentTime = 0;
      playVideo();
    };

    // If browser auto-pauses when scrolling away or throttling background tabs
    const handlePause = () => {
      // Re-trigger play unless explicitly meant to pause
      playVideo();
    };

    // Ensure playback resumes when tab or window comes back to focus
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playVideo();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver: resume video as soon as the hero section enters view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [videoSrc]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await saveVideoFileToDB(file);
        const blobUrl = URL.createObjectURL(file);
        setVideoSrc(blobUrl);
        setIsCustomSaved(true);
        setVideoSettingsOpen(false);
        setInputError(null);
      } catch (err) {
        console.error('Failed to save in IndexedDB:', err);
        const blobUrl = URL.createObjectURL(file);
        setVideoSrc(blobUrl);
        setVideoSettingsOpen(false);
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);
    const rawInput = customVideoUrl.trim();
    if (!rawInput) return;

    let finalUrl = rawInput;

    // Pattern 1: standard drive share link https://drive.google.com/file/d/FILE_ID/view...
    const driveMatch1 = rawInput.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
    // Pattern 2: drive open link https://drive.google.com/open?id=FILE_ID
    const driveMatch2 = rawInput.match(/drive\.google\.com\/(?:open|uc)\?id=([a-zA-Z0-9_-]+)/i);
    // Pattern 3: user only pasted the alphanumeric File ID (typically 25-45 chars)
    const isBareId = /^[a-zA-Z0-9_-]{25,50}$/.test(rawInput);

    if (driveMatch1 && driveMatch1[1]) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch1[1]}`;
    } else if (driveMatch2 && driveMatch2[1]) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch2[1]}`;
    } else if (isBareId) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${rawInput}`;
    }

    setVideoSrc(finalUrl);
    setIsCustomSaved(true);
    try {
      localStorage.setItem('securify_bg_video', finalUrl);
    } catch {
      // Storage quota guard
    }
    setVideoSettingsOpen(false);
    setCustomVideoUrl('');
  };

  const handleResetVideo = async () => {
    await clearVideoFileFromDB();
    localStorage.removeItem('securify_bg_video');
    setVideoSrc(DEFAULT_VIDEO);
    setIsCustomSaved(false);
    setVideoSettingsOpen(false);
  };

  const navItems = ['services', 'testimonials'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setEmail('');
      }, 1800);
    }
  };

  // If user navigated to Merch interactive experience
  if (currentHash === '#/merch' || currentHash === '#merch') {
    return (
      <PrmptExperience
        onBackToHome={() => {
          window.location.hash = '';
          setCurrentHash('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // If user navigated to a dedicated cookie page, render it as a full-page view
  if (activeCookiePage) {
    return (
      <CookiePage
        cookieId={activeCookiePage}
        onBack={navigateBackToHome}
        onNavigateToCookie={navigateToCookiePage}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Hero section */}
      <section className="relative h-screen w-full overflow-hidden bg-black select-none">
        {/* Background video optimized for smooth streaming */}
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
          style={{ transform: 'translateZ(0)' }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlay={() => setIsHeroPaused(false)}
          onPause={() => setIsHeroPaused(true)}
          onEnded={(e) => {
            const el = e.currentTarget;
            el.currentTime = 0;
            el.play().catch(() => {});
          }}
          onWaiting={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          src={videoSrc}
        />

      {/* Official Apple Latin America Navbar */}
      <AppleNav
        onOpenVideoSettings={() => setVideoSettingsOpen(true)}
        onOpenGetStarted={() => setModalOpen(true)}
        onOpenOrbisNft={openAbout}
        onOpenForma={openContact}
        onOpenRedesSociales={openRedesSociales}
        onOpenCookie={(slug) => navigateToCookiePage(slug || 'chocolate-chip')}
      />

      {/* Foreground content wrapper: relative h-full w-full (rendered after Navbar, above the video) */}
      <div className="relative h-full w-full pointer-events-none">
        
        {/* Apple Style Hero Typography Block - Bottom Left (identical to Apple iPhone Pro image) */}
        <div className="absolute left-6 sm:left-12 md:left-16 lg:left-24 bottom-24 sm:bottom-28 md:bottom-32 z-20 max-w-3xl text-left pointer-events-auto">
          {/* Main Monumental Headline: Solo Cookie Planet */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-bold tracking-[-0.035em] text-white leading-[1.0] drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            Cookie Planet
          </h1>
        </div>

        {/* Floating Internal Windows badge cards (Merch, Redes Sociales, Forma & Orbis) + Apple Play/Pause button on top-right */}
        <div className="absolute right-6 sm:right-10 md:right-14 top-20 sm:top-24 pointer-events-auto flex items-center gap-3 z-20">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#/merch"
              className="liquid-glass group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all cursor-pointer shadow-2xl hover:scale-105"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold">
                <span className="font-sans text-[11px] font-black uppercase">MR</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-xs text-white tracking-wider">
                    Merch
                  </span>
                  <span className="text-[9px] font-mono text-amber-300 uppercase">
                    [#/merch]
                  </span>
                </div>
              </div>
            </a>

            <a
              href="#/redes-sociales"
              className="liquid-glass group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer shadow-2xl hover:scale-105"
            >
              <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold">
                <span className="font-sans text-[11px] font-black uppercase">RS</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-xs text-white tracking-wider">
                    Redes Sociales
                  </span>
                  <span className="text-[9px] font-mono text-purple-300 uppercase">
                    [#/redes-sociales]
                  </span>
                </div>
              </div>
            </a>

            <a
              href="#/contactanos"
              className="liquid-glass group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all cursor-pointer shadow-2xl hover:scale-105"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-white font-bold">
                <svg viewBox="0 0 256 256" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-xs text-white tracking-wider">
                    Contáctanos
                  </span>
                  <span className="text-[9px] font-mono text-blue-400 uppercase">
                    [#/contactanos]
                  </span>
                </div>
              </div>
            </a>

            <a
              href="#/about"
              className="liquid-glass group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/20 hover:border-[#6FFF00]/50 transition-all cursor-pointer shadow-2xl hover:scale-105"
            >
              <div className="w-7 h-7 rounded-full bg-[#6FFF00]/20 border border-[#6FFF00]/40 flex items-center justify-center text-[#6FFF00]">
                <span className="font-grotesk text-xs uppercase">AB</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-grotesk text-xs text-white uppercase tracking-wider">
                    About
                  </span>
                  <span className="text-[9px] font-mono text-[#6FFF00] uppercase">
                    [#/about]
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Botón de Pausa / Play idéntico al de las ventanas internas de galletas */}
          <button
            type="button"
            onClick={toggleHeroPlayPause}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 shrink-0"
            aria-label={isHeroPaused ? 'Reproducir video' : 'Pausar video'}
            title={isHeroPaused ? 'Reproducir video' : 'Pausar video'}
          >
            {isHeroPaused ? <Play size={18} className="translate-x-0.5" /> : <Pause size={18} />}
          </button>
        </div>

        {/* Bottom subtle gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />

        {/* Subtle scroll down indicator */}
        <a
          href="#sabores"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono group-hover:text-white">scroll</span>
          <svg className="w-4 h-4 animate-bounce text-white/60 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      </section>

      {/* Toonhub / Studio Showcase Sections (Section 2 onwards) */}
      <div id="sabores" className="bg-white text-[#051A24] selection:bg-[#051A24] selection:text-white">
        {/* Infinite Marquee */}
        <InfiniteMarquee />

        {/* Toonhub Character-Figurine Carousel Hero Section */}
        <ToonhubHero onCookieClick={(idx) => navigateToCookiePage(idx)} />

        {/* Testimonial Carousel */}
        <TestimonialCarousel />

        {/* 4. CTA + FAQ Section */}
        <CtaFaqFooterSection onOrderClick={() => setModalOpen(true)} />

        {/* 5. EngineTech Aerospace Site Footer */}
        <EngineTechFooter
          onCookieClick={(slug) => navigateToCookiePage(slug)}
          onOrderClick={() => setModalOpen(true)}
        />
      </div>

      {/* Nav Link preview notification / drawer if active */}
      {activeTab && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-neutral-900/90 backdrop-blur rounded-2xl px-6 py-4 border border-white/10 max-w-sm w-full text-center">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-sm font-medium text-white">{activeTab}</span>
            <button
              onClick={() => setActiveTab(null)}
              className="text-xs text-white/60 hover:text-white"
            >
              close
            </button>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            {activeTab === 'services' && 'Full-cycle product design, identity systems, and 3D figurine experiences.'}
            {activeTab === 'testimonials' && 'What builders and venture founders say about our craft, speed, and design systems.'}
          </p>
        </div>
      )}

      {/* Get Started Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-8 text-left shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 256 256"
                  className="h-4 w-4"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
                </svg>
                <span className="text-white text-sm font-medium">securify</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <p className="text-white text-base font-medium">request received</p>
                <p className="text-white/70 text-xs">we will reach out with early access credentials shortly.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-medium text-white mb-2 tracking-tight">
                  get early access
                </h2>
                <p className="text-xs text-white/70 mb-6 leading-relaxed">
                  experience autonomous zero-trust protection for enterprise datasets.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-xs text-white/70 mb-2">
                      work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="founder@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black text-sm font-normal rounded-full py-3 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    request access
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Settings / Switcher Modal */}
      {videoSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-7 text-left shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">background video</span>
                {isCustomSaved && (
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                    permanent active
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setVideoSettingsOpen(false)}
                className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: Upload local video file */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white">1. choose video file from your computer</p>
                  <span className="text-[10px] text-white/50">permanent in browser</span>
                </div>
                <p className="text-[11px] text-white/60">
                  select your cookies video file (.mp4). it will stay saved permanently every time you refresh.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white text-black text-xs font-normal rounded-full py-2.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  browse video file (.mp4)...
                </button>
              </div>

              {/* Option 2: Enter URL or Google Drive ID */}
              <form onSubmit={handleUrlSubmit} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <p className="text-xs font-medium text-white">2. or enter drive ID / video link</p>
                <p className="text-[11px] text-white/60">
                  you can paste the link or just the drive file ID (e.g. 1a2B3c4D5e...).
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="paste drive ID or video URL"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    className="flex-1 bg-black/80 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white/20 hover:bg-white text-white hover:text-black px-4 py-2 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    apply
                  </button>
                </div>
              </form>

              {/* Quick actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleResetVideo}
                  className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  restore original video
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSettingsOpen(false)}
                  className="text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orbis.Nft Internal Window / Landing Page Modal */}
      <OrbisNftModal
        isOpen={orbisNftOpen}
        onClose={closeAbout}
      />

      {/* Forma Landing Page with Contact Form Internal Window Modal */}
      <FormaLandingModal
        isOpen={formaOpen}
        onClose={closeContact}
      />

      {/* Redes Sociales Internal Window Modal */}
      <RedesSocialesModal
        isOpen={redesSocialesOpen}
        onClose={closeRedesSociales}
      />
    </div>
  );
}
