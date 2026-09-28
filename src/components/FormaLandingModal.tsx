import React, { useState } from 'react';
import { Circle, X } from 'lucide-react';

interface FormaLandingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4';

const SERVICES = [
  'Caja Surtida (4 uds)',
  'Caja Clásica (6 uds)',
  'Caja Grande (12 uds)',
  'Chocolate Chip',
  'Red Velvet',
  'Cookies & Cream',
  'Catering & Eventos',
  'Pack para Regalo',
  'Pedido Especial',
];

interface SocialBtnProps {
  icon: React.ReactNode;
  className: string;
  href?: string;
  label: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ icon, className, href = '#', label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
  >
    {icon}
  </a>
);

// Custom Icons matching 13px size
const TwitterIcon = () => (
  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const FormaLandingModal: React.FC<FormaLandingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // 1-second simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white p-3 sm:p-4 md:p-6 text-gray-900 font-sans selection:bg-black selection:text-white animate-in fade-in duration-300">
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        aria-label="Cerrar ventana interna"
        className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50 bg-black/80 hover:bg-black text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg backdrop-blur cursor-pointer transition-colors"
      >
        <X className="w-3.5 h-3.5" />
        <span>Volver</span>
      </button>

      {/* Main Large Rounded Card */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)] bg-neutral-900 shadow-2xl">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_URL}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Video Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
          {/* Top Navbar */}
          <nav className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto self-start flex items-center gap-3 sm:gap-6">
            {/* Logo 32x32 stylized "M" */}
            <a
              href="#home"
              className="flex items-center text-black shrink-0 hover:opacity-80 transition-opacity"
              aria-label="Cookie Planet Contacto"
            >
              <svg
                viewBox="0 0 256 256"
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
              </svg>
            </a>

            {/* Nav links (hidden on mobile, shown sm:flex) */}
            <div className="hidden sm:flex items-center gap-5">
              {['Nuestras Galletas', 'Cajas & Packs', 'Sabores', 'Preguntas'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact-form"
              className="bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors ml-auto whitespace-nowrap"
            >
              Hacer Pedido
            </a>
          </nav>

          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Bottom Row (Headline + Form) */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Headline (Left) */}
            <p className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0 m-0">
              Horneamos tus antojos
              <br />
              y los convertimos en{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
                className="text-white font-normal"
              >
                momentos dulces
              </span>
            </p>

            {/* Contact Form Card (Right) */}
            <div id="contact-form" className="w-full lg:w-[min(480px,45%)] shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-semibold text-black tracking-tight m-0">
                  ¡Pide tus galletas! 🍪
                </h3>

                {/* Email + Socials Row */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                  <div className="min-w-0 flex flex-col">
                    <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">
                      Atención & Pedidos
                    </span>
                    <a
                      href="mailto:pedidos@cookieplanet.com"
                      className="text-amber-700 font-semibold hover:underline truncate text-sm"
                    >
                      pedidos@cookieplanet.com
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <SocialBtn
                      icon={<TwitterIcon />}
                      className="bg-gray-100 text-gray-800"
                      label="Twitter"
                    />
                    <SocialBtn
                      icon={<Circle className="w-[13px] h-[13px]" />}
                      className="bg-pink-100 text-pink-500"
                      label="Circle"
                    />
                    <SocialBtn
                      icon={<InstagramIcon />}
                      className="bg-orange-100 text-orange-400"
                      label="Instagram"
                    />
                    <SocialBtn
                      icon={<LinkedinIcon />}
                      className="bg-blue-100 text-blue-600"
                      label="LinkedIn"
                    />
                  </div>
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 font-medium text-sm">O ESCRÍBENOS AQUÍ</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Form or Success State */}
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-bold">
                      ✓
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 m-0">
                      ¡Pedido recibido con éxito!
                    </h4>
                    <p className="text-sm text-gray-500 m-0">
                      Nos pondremos en contacto contigo en breve para coordinar la entrega.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                        setSelected([]);
                      }}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Enviar otro mensaje o pedido
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-black">
                      Cuéntanos los detalles de tu pedido:
                    </label>

                    {/* Name + Email inputs */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                      />
                      <input
                        type="text"
                        required
                        placeholder="WhatsApp o Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                      />
                    </div>

                    {/* Textarea */}
                    <textarea
                      required
                      rows={4}
                      placeholder="Sabores deseados, cantidad de unidades, fecha de entrega o alguna indicación..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                    />

                    {/* Service Tags */}
                    <div>
                      <span className="block text-xs font-medium text-gray-700 mb-2">
                        Selecciona tus opciones de interés:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SERVICES.map((service) => {
                          const active = selected.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                                active
                                  ? 'bg-gray-100 text-black border-black'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer shadow-md"
                    >
                      {sending ? 'Enviando...' : 'Confirmar y Enviar Pedido'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
