import React, { useState } from 'react';
import { Mail, ChevronRight, X, ExternalLink } from 'lucide-react';

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface OrbisNftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4';
const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4';
const CTA_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4';

const NFT_CARDS = [
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '100% ARTESANAL',
    title: 'COOKIE PLANET // NUESTRA MISIÓN',
  },
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: 'HORNEADO DIARIO',
    title: 'COOKIE PLANET // NUESTRA VISIÓN',
  },
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: 'CHOCOLATE REAL',
    title: 'COOKIE PLANET // NUESTROS VALORES',
  },
];

export const OrbisNftModal: React.FC<OrbisNftModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#010828] text-[#EFF4FF] selection:bg-[#6FFF00]/30 selection:text-[#EFF4FF] animate-in fade-in duration-300">
      {/* Floating Close / Back button */}
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-3">
        <button
          onClick={onClose}
          className="liquid-glass flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#EFF4FF] hover:bg-white/10 transition-all cursor-pointer shadow-2xl hover:scale-105 border border-white/20"
        >
          <X className="w-4 h-4 text-[#6FFF00]" />
          <span>Volver / Cerrar</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: HERO (Full viewport) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-screen overflow-hidden rounded-b-[32px] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Full-bleed looping muted autoplaying video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src={HERO_VIDEO}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Video shade gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010828]/60 via-transparent to-[#010828]/80 z-0 pointer-events-none" />

        {/* Header container */}
        <header className="relative z-10 w-full max-w-[1831px] mx-auto flex items-center justify-between">
          {/* Left: About logo */}
          <div className="font-grotesk text-[16px] uppercase tracking-wider text-[#EFF4FF] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6FFF00] animate-pulse" />
            <span>Sobre Nosotros</span>
          </div>

          {/* Center: Navigation bar with liquid-glass */}
          <nav className="hidden lg:block liquid-glass rounded-[28px] px-[52px] py-[24px]">
            <ul className="flex items-center gap-8 list-none p-0 m-0">
              {['Inicio', 'Misión', 'Visión', 'Valores', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="font-grotesk text-[13px] uppercase tracking-wider text-[#EFF4FF] transition-colors duration-200 hover:text-[#6FFF00]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Social Icons: 3 square buttons (56x56px) stacked vertically */}
          <div className="hidden lg:flex flex-col gap-3">
            <a
              href="mailto:contact@orbisnft.io"
              aria-label="Mail"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1831px] mx-auto my-auto py-16">
          <div className="relative max-w-[780px] lg:ml-32">
            <h1 className="font-grotesk text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] uppercase leading-[1.05] sm:leading-[1] text-[#EFF4FF] tracking-tight m-0">
              Un universo
              <br />
              de sabor artesanal
            </h1>

            {/* Overlaid cursive accent text "Nft collection" */}
            <span
              className="font-condiment text-[24px] sm:text-[36px] md:text-[44px] lg:text-[48px] text-[#6FFF00] absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 -rotate-1 opacity-90 pointer-events-none select-none"
              style={{ mixBlendMode: 'exclusion' }}
            >
              Cookie Planet
            </span>
          </div>

          {/* Mobile Social Icons: centered horizontally below the heading */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-12">
            <a
              href="mailto:contact@orbisnft.io"
              aria-label="Mail"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              className="liquid-glass w-[56px] h-[56px] rounded-[1rem] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer indicator of hero */}
        <div className="relative z-10 w-full max-w-[1831px] mx-auto flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#EFF4FF]/60 pt-4 border-t border-white/10">
          <span>01 // THE CRAFT BAKEHOUSE</span>
          <span>EXPLORA NUESTRA HISTORIA ↓</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: ABOUT / INTRO (Full viewport) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:py-24 lg:px-16">
        {/* Full-bleed looping muted autoplaying video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src={ABOUT_VIDEO}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Shade overlay */}
        <div className="absolute inset-0 bg-[#010828]/50 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1831px] mx-auto flex-1 flex flex-col justify-between">
          {/* Top Row: Flex row on desktop, column on mobile */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8">
            {/* Left: Heading in Anton uppercase with overlaid Condiment cursive */}
            <div className="relative inline-block">
              <h2 className="font-grotesk text-[32px] sm:text-[45px] md:text-[60px] uppercase text-[#EFF4FF] leading-none m-0">
                ¡Hola!
                <br />
                Somos nosotros
              </h2>

              <span
                className="font-condiment text-[36px] sm:text-[50px] md:text-[68px] text-[#6FFF00] absolute -right-6 sm:-right-12 -bottom-4 -rotate-3 select-none pointer-events-none"
                style={{ mixBlendMode: 'exclusion' }}
              >
                Cookie Planet
              </span>
            </div>

            {/* Right: Short paragraph in monospace uppercase cream */}
            <p className="font-mono text-[14px] md:text-[16px] uppercase text-[#EFF4FF] max-w-[280px] leading-relaxed tracking-wider">
              Repostería artesanal contemporánea. Galletas recién horneadas a mano con chispas de chocolate real, mantequilla de calidad y centros suaves.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: NFT COLLECTION GRID */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#010828] py-20 px-6 sm:px-12 lg:px-16">
        <div className="w-full max-w-[1831px] mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
            {/* Left Heading */}
            <div>
              <h2 className="font-grotesk text-[32px] sm:text-[46px] md:text-[60px] uppercase text-[#EFF4FF] leading-none m-0">
                Conoce nuestra
              </h2>
              <div className="flex items-center gap-3 ml-12 sm:ml-24 md:ml-32 mt-2">
                <span className="font-condiment text-[38px] sm:text-[54px] md:text-[68px] text-[#6FFF00] leading-none">
                  Misión y
                </span>
                <span className="font-grotesk text-[32px] sm:text-[46px] md:text-[60px] uppercase text-[#EFF4FF] leading-none">
                  Visión
                </span>
              </div>
            </div>

            {/* Right: "SEE ALL CREATORS" button with neon bar */}
            <button className="flex flex-col items-start cursor-pointer group">
              <div className="flex items-baseline gap-2 text-[#EFF4FF]">
                <span className="font-grotesk text-[32px] sm:text-[45px] md:text-[60px] uppercase leading-none">
                  CRAFT
                </span>
                <div className="flex flex-col font-grotesk text-[18px] sm:text-[24px] md:text-[32px] uppercase leading-none">
                  <span>BAKERY</span>
                  <span>STUDIO</span>
                </div>
              </div>
              <div className="w-full h-[6px] sm:h-[8px] md:h-[10px] bg-[#6FFF00] mt-2 group-hover:scale-x-105 origin-left transition-transform duration-200" />
            </button>
          </div>

          {/* NFT Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NFT_CARDS.map((card, i) => (
              <div
                key={i}
                className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-all duration-300 flex flex-col group"
              >
                {/* Square video container */}
                <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden bg-black/40">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={card.video}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase px-3 py-1 rounded-full bg-black/60 text-[#EFF4FF] backdrop-blur-sm border border-white/10">
                    {card.title}
                  </div>
                </div>

                {/* Bottom Overlay Bar */}
                <div className="liquid-glass rounded-[20px] px-5 py-4 mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#EFF4FF]/70 m-0">
                      PILAR CLAVE:
                    </p>
                    <p className="font-grotesk text-[20px] text-[#EFF4FF] uppercase tracking-wider m-0">
                      {card.score}
                    </p>
                  </div>

                  {/* Circular purple gradient button with chevron */}
                  <button
                    aria-label="Conocer más"
                    className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: CTA / FINAL SECTION */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#010828] overflow-hidden">
        {/* Full-width video displaying at native aspect ratio */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src={CTA_VIDEO}
          className="w-full h-auto block min-h-[600px] object-cover md:object-contain"
        />

        {/* Text Content (positioned absolute over the video) */}
        <div className="absolute inset-0 flex flex-col justify-center items-end lg:pr-[20%] lg:pl-[15%] p-6 sm:p-12 pointer-events-none">
          <div className="relative pointer-events-auto">
            {/* Small "Cookie Planet" text in Condiment cursive, neon green */}
            <span
              className="font-condiment text-[24px] sm:text-[40px] md:text-[54px] lg:text-[68px] text-[#6FFF00] absolute -left-12 sm:-left-20 -top-8 sm:-top-14 select-none"
              style={{ mixBlendMode: 'exclusion' }}
            >
              Cookie Planet
            </span>

            {/* Heading in Anton uppercase */}
            <div className="font-grotesk text-[20px] sm:text-[34px] md:text-[48px] lg:text-[60px] uppercase text-[#EFF4FF] leading-[1.05] tracking-tight">
              <p className="mb-4 sm:mb-8 lg:mb-12 m-0 text-[#6FFF00]">ÚNETE AL SABOR.</p>
              <p className="m-0">HORNEADO DIARIO A MANO.</p>
              <p className="m-0">CHISPAS DE CHOCOLATE REAL.</p>
              <p className="m-0">EXPERIENCIA VOLCÁNICA.</p>
            </div>
          </div>
        </div>

        {/* Social Icons (Bottom-left, absolute positioned) */}
        <div className="absolute left-[8%] bottom-[12%] sm:bottom-[16%] md:bottom-[20%] z-20">
          <div className="liquid-glass rounded-[0.75rem] sm:rounded-[1.25rem] flex flex-col overflow-hidden">
            <button
              type="button"
              aria-label="Mail"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[52px] sm:h-[64px] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors border-b border-white/10"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              aria-label="Twitter"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[52px] sm:h-[64px] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors border-b border-white/10"
            >
              <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              aria-label="Github"
              className="w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[52px] sm:h-[64px] flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="w-full bg-[#010828] py-8 px-6 sm:px-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#EFF4FF]/60">
        <div>© 2026 COOKIE PLANET — ARTISANAL COOKIES & SPECIALTY BAKERY</div>
        <button
          onClick={onClose}
          className="text-[#6FFF00] hover:underline cursor-pointer"
        >
          [ CERRAR / VOLVER AL INICIO ]
        </button>
      </footer>
    </div>
  );
};
