import { motion } from 'motion/react';

interface PrmptHeaderProps {
  onBackToHome?: () => void;
}

export default function PrmptHeader({ onBackToHome }: PrmptHeaderProps) {
  const easeTransition = [0.25, 0.1, 0.25, 1] as const;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeTransition, delay: 0 }}
        onClick={onBackToHome}
        className="fixed z-20 top-4 left-4 md:top-8 md:left-8 cursor-pointer select-none"
        style={{ mixBlendMode: 'exclusion' }}
        title="Volver al inicio"
      >
        <div className="flex items-baseline gap-1">
          <span className="font-inter-tight tracking-[-0.05em] font-extrabold uppercase text-white text-[24px] sm:text-[34px] lg:text-[44px] leading-none">
            Cookie Planet
          </span>
          <span className="font-inter-tight text-[11px] sm:text-[14px] lg:text-[18px] font-bold text-white tracking-tight">
            ®
          </span>
        </div>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeTransition, delay: 0.15 }}
        className="fixed z-30 pointer-events-auto top-4 right-4 lg:top-8 lg:right-8 flex items-center gap-3 sm:gap-6"
        style={{ mixBlendMode: 'exclusion' }}
      >
        <a
          href="#/merch-kairn"
          className="px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold border border-[#44DAFD]/70 bg-[#44DAFD]/20 hover:bg-[#44DAFD] text-white hover:text-black transition-all cursor-pointer shadow-lg tracking-wide uppercase flex items-center gap-1.5"
          title="Ver ventana interna KAIRN Alpine 26 Hero"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#44DAFD] animate-pulse" />
          <span>KAIRN Alpine 26</span>
        </a>

        <a
          href="#/merch-maren"
          className="px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold border border-white/60 bg-white/10 hover:bg-white text-white hover:text-black transition-all cursor-pointer shadow-lg tracking-wide uppercase flex items-center gap-1.5"
          title="Ver ventana interna MAREN Fashion Hero"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4B8A2] animate-pulse" />
          <span>MAREN Fashion</span>
        </a>

        <span className="hidden sm:inline font-inter-tight font-medium text-[15px] uppercase tracking-[-0.02em] text-white">
          ARCHIVE
        </span>

        <div className="flex items-center gap-[15px] lg:gap-[30px]">
          <svg
            viewBox="0 0 40 40"
            className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="square"
            aria-label="Menu"
          >
            <path d="M0 14H40" />
            <path d="M0 26H40" />
          </svg>
          <span className="font-inter-tight font-medium text-[13px] lg:text-[15px] text-white tracking-[-0.02em]">
            [ CART ]
          </span>
        </div>
      </motion.nav>
    </>
  );
}
