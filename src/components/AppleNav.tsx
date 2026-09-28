import React, { useState, useEffect, useRef } from 'react';

interface SubmenuData {
  explore: { label: string; href?: string }[];
  shopOrGuides?: { label: string; href?: string }[];
  more?: { label: string; href?: string }[];
}

const MENU_DATA: Record<string, SubmenuData> = {
  Mac: {
    explore: [
      { label: 'Explorar todos los Mac' },
      { label: 'MacBook Air' },
      { label: 'MacBook Pro' },
      { label: 'iMac' },
      { label: 'Mac mini' },
      { label: 'Mac Studio' },
      { label: 'Mac Pro' },
      { label: 'Monitores' },
    ],
    shopOrGuides: [
      { label: 'Comprar una Mac' },
      { label: 'Accesorios para Mac' },
      { label: 'Financiamiento' },
    ],
    more: [
      { label: 'Soporte técnico para la Mac' },
      { label: 'macOS Sequoia' },
      { label: 'Apple Intelligence' },
      { label: 'Continuidad' },
    ],
  },
  iPad: {
    explore: [
      { label: 'Explorar todos los iPad' },
      { label: 'iPad Pro' },
      { label: 'iPad Air' },
      { label: 'iPad' },
      { label: 'iPad mini' },
      { label: 'Apple Pencil' },
      { label: 'Teclados' },
    ],
    shopOrGuides: [
      { label: 'Comprar un iPad' },
      { label: 'Accesorios para iPad' },
      { label: 'Apple Trade In' },
    ],
    more: [
      { label: 'Soporte técnico para el iPad' },
      { label: 'iPadOS 18' },
      { label: 'Apple Intelligence' },
    ],
  },
  iPhone: {
    explore: [
      { label: 'Explorar todos los iPhone' },
      { label: 'iPhone 16 Pro' },
      { label: 'iPhone 16' },
      { label: 'iPhone 15' },
      { label: 'iPhone 14' },
      { label: 'iPhone SE' },
    ],
    shopOrGuides: [
      { label: 'Comprar un iPhone' },
      { label: 'Accesorios para iPhone' },
      { label: 'Apple Trade In' },
    ],
    more: [
      { label: 'Soporte técnico para el iPhone' },
      { label: 'iOS 18' },
      { label: 'Apple Intelligence' },
      { label: 'Privacidad en el iPhone' },
    ],
  },
  Watch: {
    explore: [
      { label: 'Explorar todos los Apple Watch' },
      { label: 'Apple Watch Series 10' },
      { label: 'Apple Watch Ultra 2' },
      { label: 'Apple Watch SE' },
      { label: 'Apple Watch Nike' },
      { label: 'Apple Watch Hermès' },
    ],
    shopOrGuides: [
      { label: 'Comprar Apple Watch' },
      { label: 'Correas para Apple Watch' },
      { label: 'Accesorios' },
    ],
    more: [
      { label: 'Soporte técnico para el Apple Watch' },
      { label: 'watchOS 11' },
      { label: 'Salud y fitness' },
    ],
  },
  AirPods: {
    explore: [
      { label: 'Explorar todos los AirPods' },
      { label: 'AirPods 4' },
      { label: 'AirPods Pro 2' },
      { label: 'AirPods Max' },
    ],
    shopOrGuides: [
      { label: 'Comprar AirPods' },
      { label: 'Accesorios para AirPods' },
    ],
    more: [
      { label: 'Soporte para AirPods' },
      { label: 'Apple Music' },
      { label: 'Audio espacial' },
    ],
  },
  Productos: {
    explore: [
      { label: '✨ Merch (Archive Collection)', href: '#merch' },
      { label: '🍪 cookie chocolate chip', href: '#/galleta/chocolate-chip' },
      { label: '❤️ Cookie Red Velvet', href: '#/galleta/red-velvet' },
      { label: '🍦 Cookies & Cream', href: '#/galleta/cookies-and-cream' },
      { label: '🌾 Oatmeal Raisin', href: '#/galleta/oatmeal-raisin' },
      { label: 'Explorar todos los Productos' },
      { label: 'Galletas de Sabores' },
      { label: 'Colección Toonhub' },
      { label: 'Ediciones Especiales' },
    ],
    shopOrGuides: [
      { label: 'Comprar cookie chocolate chip', href: '#/galleta/chocolate-chip' },
      { label: 'Comprar Cookie Red Velvet', href: '#/galleta/red-velvet' },
      { label: 'Comprar Cookies & Cream', href: '#/galleta/cookies-and-cream' },
      { label: 'Comprar Oatmeal Raisin', href: '#/galleta/oatmeal-raisin' },
      { label: 'Comprar Galletas' },
      { label: 'Cajas de Regalo' },
      { label: 'Guía de Sabores e Ingredientes' },
    ],
    more: [
      { label: 'Personalización de Pedidos' },
      { label: 'Envíos y Puntos de Entrega' },
      { label: 'Atención al Cliente' },
    ],
  },
  Soporte: {
    explore: [
      { label: '🪐 About (Ventana Interna)' },
      { label: 'Comunidades de soporte de Apple' },
      { label: 'Consultar cobertura de garantía' },
      { label: 'Reparaciones y servicio técnico' },
      { label: 'Restablecer contraseña de Apple ID' },
      { label: 'Facturación y suscripciones' },
    ],
    shopOrGuides: [
      { label: 'Buscar una tienda o centro de servicio' },
      { label: 'AppleCare+' },
    ],
    more: [
      { label: 'App Soporte de Apple' },
      { label: 'Ponte en contacto con nosotros' },
    ],
  },
};

const NAV_ITEMS = [
  'Productos',
  'Merch',
  'Contáctanos',
  'About',
];

interface AppleNavProps {
  onOpenVideoSettings?: () => void;
  onOpenGetStarted?: () => void;
  onOpenOrbisNft?: () => void;
  onOpenForma?: () => void;
  onOpenCookie?: (cookieSlug?: string) => void;
  onLogoClick?: () => void;
}

export const AppleNav: React.FC<AppleNavProps> = ({
  onOpenVideoSettings,
  onOpenGetStarted,
  onOpenOrbisNft,
  onOpenForma,
  onOpenCookie,
  onLogoClick,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setSearchOpen(false);
        setBagOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isFlyoutActive = Boolean(activeMenu || searchOpen || bagOpen);

  return (
    <>
      {/* Background backdrop blur overlay when any dropdown is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-300 pointer-events-auto ${
          isFlyoutActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setActiveMenu(null);
          setSearchOpen(false);
          setBagOpen(false);
        }}
      />

      <header
        ref={navRef}
        onMouseLeave={() => setActiveMenu(null)}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: isFlyoutActive
            ? 'rgba(22, 22, 23, 0.98)'
            : 'rgba(22, 22, 23, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        }}
      >
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6 h-[44px] flex items-center justify-between text-neutral-300 text-[12px] font-normal tracking-[-0.01em]">
          {/* 1. Apple Logo */}
          <button
            type="button"
            onClick={(e) => {
              if (onLogoClick) {
                e.preventDefault();
                onLogoClick();
              } else {
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Volver al inicio"
            className="text-neutral-300 hover:text-white transition-opacity duration-200 opacity-90 hover:opacity-100 shrink-0 py-1.5 flex items-center cursor-pointer bg-transparent border-0"
          >
            <img
              src="https://res.cloudinary.com/yxbhso8s/image/upload/v1790557694/LOGO_CONEJITO_DE_NJZ.png"
              alt="Logo Conejito NJZ - Cookie Planet"
              className="h-5 w-auto object-contain filter drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-200"
            />
          </button>

          {/* 2. Desktop Navigation Items */}
          <nav className="hidden md:flex items-center justify-between flex-1 mx-6 lg:mx-8">
            {NAV_ITEMS.map((item) => {
              if (item === 'Merch') {
                return (
                  <a
                    key={item}
                    href="#/merch"
                    onClick={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    onMouseEnter={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    className="py-3 px-2 text-[12px] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-amber-300 hover:text-white font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Merch</span>
                  </a>
                );
              }
              if (item === 'Contáctanos') {
                return (
                  <a
                    key={item}
                    href="#/contactanos"
                    onClick={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    onMouseEnter={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    className="py-3 px-2 text-[12px] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span>Contáctanos</span>
                  </a>
                );
              }
              if (item === 'About') {
                return (
                  <a
                    key={item}
                    href="#/about"
                    onClick={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    onMouseEnter={() => {
                      setActiveMenu(null);
                      setSearchOpen(false);
                      setBagOpen(false);
                    }}
                    className="py-3 px-2 text-[12px] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-[#6FFF00] hover:text-[#8aff8a] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6FFF00] animate-pulse" />
                    <span>About</span>
                  </a>
                );
              }
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setActiveMenu(activeMenu === item ? null : item);
                  }}
                  onMouseEnter={() => {
                    setActiveMenu(item);
                    setSearchOpen(false);
                    setBagOpen(false);
                  }}
                  className={`py-3 px-2 text-[12px] transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeMenu === item
                      ? 'text-white'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{item}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right Icons (Search + Bag / Actions + Mobile Hamburger) */}
          <div className="flex items-center gap-4 text-neutral-300">
            {/* Search Icon */}
            <button
              type="button"
              aria-label="Buscar en apple.com"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setActiveMenu(null);
                setBagOpen(false);
              }}
              className="hover:text-white transition-opacity duration-200 opacity-80 hover:opacity-100 cursor-pointer p-1"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 17 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <circle cx="7" cy="7" r="5.5" />
                <line x1="11" y1="11" x2="15.5" y2="15.5" />
              </svg>
            </button>

            {/* Bag Icon */}
            <button
              type="button"
              aria-label="Bolsa de compras"
              onClick={() => {
                setBagOpen((prev) => !prev);
                setActiveMenu(null);
                setSearchOpen(false);
              }}
              className="hover:text-white transition-opacity duration-200 opacity-80 hover:opacity-100 cursor-pointer p-1"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 17 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <path d="M4.5 5.5V4a4 4 0 0 1 8 0v1.5M3 5.5h11l1 9.5H2L3 5.5z" />
              </svg>
            </button>

            {/* Quick action buttons for demo video controls */}
            <a
              href="#/merch"
              title="Abrir experiencia interactiva Merch [/#/merch]"
              className="inline-flex items-center gap-1.5 text-[11px] text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 transition-all font-sans tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Merch</span>
            </a>

            <a
              href="#/contactanos"
              title="Abrir ventana interna Contáctanos [/#/contactanos]"
              className="inline-flex items-center gap-1.5 text-[11px] text-white hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/20 transition-all font-sans tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Contáctanos</span>
            </a>

            <a
              href="#/about"
              title="Abrir ventana interna About [/#/about]"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#6FFF00] hover:text-white bg-[#6FFF00]/10 hover:bg-[#6FFF00]/20 px-3 py-1 rounded-full border border-[#6FFF00]/30 transition-all font-mono tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FFF00] animate-pulse" />
              <span>About</span>
            </a>

            {onOpenVideoSettings && (
              <button
                type="button"
                onClick={onOpenVideoSettings}
                title="Cambiar video de fondo"
                className="hidden lg:inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Video</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label="Abrir menú de navegación"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1 text-neutral-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 4. Desktop Mega Menu Dropdown */}
        {activeMenu && MENU_DATA[activeMenu] && (
          <div
            className="w-full bg-[#161617] border-b border-[#333336] pt-10 pb-16 px-6 sm:px-12 text-white animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Explorar */}
              <div>
                <p className="text-[12px] text-neutral-400 mb-3 tracking-tight font-medium">
                  Explorar {activeMenu}
                </p>
                <ul className="space-y-2.5">
                  {MENU_DATA[activeMenu].explore.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenu(null);
                          if (link.href === '#merch' || link.label.includes('Merch')) {
                            window.location.hash = '#merch';
                          } else if (link.label.includes('About') || link.label.includes('Orbis.Nft')) {
                            onOpenOrbisNft?.();
                          } else if (link.label.includes('Forma Landing')) {
                            onOpenForma?.();
                          } else if (link.label.includes('cookie chocolate chip')) {
                            onOpenCookie?.('chocolate-chip');
                          } else if (link.label.includes('Red Velvet') || link.label.includes('red-velvet')) {
                            onOpenCookie?.('red-velvet');
                          } else if (link.label.includes('Cookies & Cream') || link.label.includes('cookies-and-cream')) {
                            onOpenCookie?.('cookies-and-cream');
                          } else if (link.label.includes('Oatmeal Raisin') || link.label.includes('oatmeal-raisin')) {
                            onOpenCookie?.('oatmeal-raisin');
                          }
                        }}
                        className={`text-left text-[20px] font-semibold tracking-tight leading-snug block transition-colors cursor-pointer ${
                          link.label.includes('cookie chocolate chip')
                            ? 'text-amber-400 hover:text-amber-300 font-bold'
                            : link.label.includes('Red Velvet')
                            ? 'text-rose-400 hover:text-rose-300 font-bold'
                            : link.label.includes('Cookies & Cream')
                            ? 'text-sky-300 hover:text-sky-200 font-bold'
                            : link.label.includes('Oatmeal Raisin')
                            ? 'text-amber-200 hover:text-amber-100 font-bold'
                            : 'text-neutral-100 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Comprar o Guías */}
              {MENU_DATA[activeMenu].shopOrGuides && (
                <div>
                  <p className="text-[12px] text-neutral-400 mb-3 tracking-tight font-medium">
                    Comprar
                  </p>
                  <ul className="space-y-2">
                    {MENU_DATA[activeMenu].shopOrGuides?.map((link) => (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            if (link.label.includes('cookie chocolate chip')) {
                              onOpenCookie?.('chocolate-chip');
                            } else if (link.label.includes('Red Velvet') || link.label.includes('red-velvet')) {
                              onOpenCookie?.('red-velvet');
                            } else if (link.label.includes('Cookies & Cream') || link.label.includes('cookies-and-cream')) {
                              onOpenCookie?.('cookies-and-cream');
                            } else if (link.label.includes('Oatmeal Raisin') || link.label.includes('oatmeal-raisin')) {
                              onOpenCookie?.('oatmeal-raisin');
                            }
                          }}
                          className={`text-left text-[14px] font-medium block transition-colors cursor-pointer ${
                            link.label.includes('cookie chocolate chip')
                              ? 'text-amber-400 hover:text-amber-300'
                              : link.label.includes('Red Velvet')
                              ? 'text-rose-400 hover:text-rose-300'
                              : link.label.includes('Cookies & Cream')
                              ? 'text-sky-300 hover:text-sky-200'
                              : link.label.includes('Oatmeal Raisin')
                              ? 'text-amber-200 hover:text-amber-100'
                              : 'text-neutral-200 hover:text-white'
                          }`}
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Column 3: Más de ... */}
              {MENU_DATA[activeMenu].more && (
                <div>
                  <p className="text-[12px] text-neutral-400 mb-3 tracking-tight font-medium">
                    Más información
                  </p>
                  <ul className="space-y-2">
                    {MENU_DATA[activeMenu].more?.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href || '#'}
                          className="text-[14px] text-neutral-200 hover:text-white font-medium block transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Apple Search Flyout Bar */}
        {searchOpen && (
          <div className="w-full bg-[#161617] border-b border-[#333336] py-10 px-6 animate-in fade-in duration-200">
            <div className="max-w-[680px] mx-auto">
              <div className="flex items-center gap-3 border-b border-neutral-600 pb-3">
                <svg
                  className="w-5 h-5 text-neutral-400"
                  viewBox="0 0 17 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="7" cy="7" r="5.5" />
                  <line x1="11" y1="11" x2="15.5" y2="15.5" />
                </svg>
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar en apple.com o soporte..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl text-white outline-none placeholder:text-neutral-500 font-light"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-neutral-400 hover:text-white px-2 py-1"
                >
                  Cancelar
                </button>
              </div>

              {/* Quick links under search */}
              <div className="mt-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">
                  Enlaces rápidos
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-neutral-300">
                  {['Comprar iPhone 16', 'Accesorios para Mac', 'AirPods Pro', 'Apple Vision Pro', 'Soporte técnico'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Shopping Bag Flyout */}
        {bagOpen && (
          <div className="w-full bg-[#161617] border-b border-[#333336] py-12 px-6 animate-in fade-in duration-200 text-center">
            <div className="max-w-[400px] mx-auto">
              <h3 className="text-xl font-medium text-white mb-2">
                Tu Bolsa está vacía.
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Inicia sesión para ver si tienes productos guardados o haz tus compras.
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onOpenGetStarted}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </button>
                <a
                  href="#catalog"
                  onClick={() => setBagOpen(false)}
                  className="block text-sm text-blue-400 hover:underline"
                >
                  Continuar explorando
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 7. Mobile Fullscreen Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[44px] bottom-0 bg-[#161617] px-8 py-8 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item) => (
                <div key={item} className="border-b border-neutral-800 pb-3">
                  <span className="text-2xl font-semibold text-neutral-200 hover:text-white transition-colors block">
                    {item}
                  </span>
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="#/galleta/chocolate-chip"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCookie?.('chocolate-chip');
                  }}
                  className="w-full py-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>🍪 Cookie Chocolate Chip</span>
                </a>
                <a
                  href="#/galleta/red-velvet"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCookie?.('red-velvet');
                  }}
                  className="w-full py-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/40 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span>❤️ Cookie Red Velvet</span>
                </a>
                <a
                  href="#/galleta/cookies-and-cream"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCookie?.('cookies-and-cream');
                  }}
                  className="w-full py-3 rounded-xl bg-sky-500/20 text-sky-200 border border-sky-400/40 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                  <span>🍦 Cookies & Cream</span>
                </a>
                <a
                  href="#/galleta/oatmeal-raisin"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCookie?.('oatmeal-raisin');
                  }}
                  className="w-full py-3 rounded-xl bg-amber-600/20 text-amber-200 border border-amber-500/40 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                  <span>🌾 Oatmeal Raisin</span>
                </a>
                <a
                  href="#/merch"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Explorar Merch [/#/merch]</span>
                </a>
                <a
                  href="#/contactanos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-white/15 text-white border border-white/20 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>Explorar Contáctanos [/#/contactanos]</span>
                </a>
                <a
                  href="#/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#6FFF00]/15 text-[#6FFF00] border border-[#6FFF00]/30 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#6FFF00] animate-pulse" />
                  <span>Explorar About [/#/about]</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVideoSettings?.();
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 text-white text-sm font-medium"
                >
                  Cambiar video de fondo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGetStarted?.();
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-medium"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
