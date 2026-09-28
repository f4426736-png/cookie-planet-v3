import React from 'react';

interface EngineTechFooterProps {
  onCookieClick?: (slug: string) => void;
  onOrderClick?: () => void;
}

export const EngineTechFooter: React.FC<EngineTechFooterProps> = ({ onCookieClick, onOrderClick }) => {
  return (
    <footer className="site-footer">
      {/* ANIMATED DOTS STRIP */}
      <div className="footer-dots" aria-hidden="true">
        <div className="footer-dots__line" />
      </div>

      {/* FOOTER INNER */}
      <div className="site-footer__inner">
        {/* TOP GRID */}
        <div className="site-footer__top">
          {/* H2 first cell */}
          <h2 className="site-footer__h2">
            Horneamos momentos dulces para tu día a día.
          </h2>

          {/* Nav 1: Sabores */}
          <nav className="site-footer__nav" aria-label="Sabores de Cookie Planet">
            <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2 block">Sabores</span>
            <button
              type="button"
              onClick={() => onCookieClick?.('chocolate-chip')}
              className="text-left text-inherit hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Chocolate Chip
            </button>
            <button
              type="button"
              onClick={() => onCookieClick?.('red-velvet')}
              className="text-left text-inherit hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Red Velvet
            </button>
            <button
              type="button"
              onClick={() => onCookieClick?.('cookies-and-cream')}
              className="text-left text-inherit hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Cookies &amp; Cream
            </button>
            <button
              type="button"
              onClick={() => onCookieClick?.('oatmeal-raisin')}
              className="text-left text-inherit hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Oatmeal Raisin
            </button>
            <button
              type="button"
              onClick={onOrderClick}
              className="text-left text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Cajas Surtidas →
            </button>
          </nav>

          {/* Nav 2: Emprendimiento links */}
          <nav className="site-footer__nav" aria-label="Emprendimiento Escolar">
            <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2 block">Proyecto</span>
            <a href="#services">Emprendimiento Escolar</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#services">Ingredientes Artesanales</a>
            <button
              type="button"
              onClick={onOrderClick}
              className="text-left text-inherit hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Hacer un Pedido
            </button>
          </nav>

          {/* Nav 3: Redes & Pedidos */}
          <nav className="site-footer__nav" aria-label="Redes y Contacto">
            <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2 block">Contacto</span>
            <a
              href="https://wa.me/?text=Hola%20Cookie%20Planet,%20quisiera%20pedir%20galletas!"
              target="_blank"
              rel="noreferrer"
              className="text-[#6FFF00] hover:underline"
            >
              WhatsApp Pedidos
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </a>
          </nav>
        </div>

        {/* BRAND ROW */}
        <div className="site-footer__brand-row">
          <a
            href="/"
            className="site-footer__brand"
            aria-label="Cookie Planet inicio"
          >
            {/* Brand mark with cookie emoji or styling */}
            <span className="site-footer__mark" aria-hidden="true" />
            {/* Oversized Brand wordmark */}
            <span className="site-footer__wordmark">Cookie Planet</span>
          </a>
        </div>

        {/* LEGAL LINE */}
        <div className="site-footer__legal">
          <p>© 2026 Cookie Planet • Proyecto de Emprendimiento Escolar. Todos los derechos reservados.</p>
          <a href="#privacy">Términos de Compra</a>
          <a href="#terms">Política de Entregas</a>
        </div>
      </div>
    </footer>
  );
};
