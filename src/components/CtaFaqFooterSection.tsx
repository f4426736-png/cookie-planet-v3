import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: '¿Cómo y cuándo puedo hacer mi pedido?',
    a: 'Puedes hacer tus pedidos con anticipación antes de los recreos escolares o para tus eventos. Te entregamos tus galletas recién horneadas y en su empaque individual.',
  },
  {
    q: '¿Qué ingredientes utilizan en sus galletas?',
    a: 'Usamos mantequilla de primera calidad, harina seleccionada, cacao puro, chispas de chocolate semiamargo y avena integral. No utilizamos preservantes artificiales.',
  },
  {
    q: '¿Vienen calientitas o a temperatura ambiente?',
    a: 'Las horneamos diariamente antes de cada entrega para que mantengan su textura característica: crocantes por fuera y suaves o derretidas en el centro.',
  },
  {
    q: '¿Tienen promociones o paquetes de varias unidades?',
    a: '¡Sí! Contamos con cajas de 4 y 6 galletas surtidas con descuento especial para que puedas probar todos nuestros sabores de Cookie Planet.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos efectivo en el colegio, transferencias bancarias y billeteras digitales (Yape / Plin / transferencia directa).',
  },
];

interface CtaFaqFooterSectionProps {
  onOrderClick?: () => void;
}

export const CtaFaqFooterSection: React.FC<CtaFaqFooterSectionProps> = ({ onOrderClick }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [btnHovered, setBtnHovered] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className="bg-white text-neutral-900 w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Main Section */}
      <main className="py-20 max-[900px]:py-[60px]">
        <div className="max-w-[1100px] w-full mx-auto px-5">
          <div className="grid grid-cols-[1.6fr_1fr] gap-[30px] items-stretch max-[900px]:grid-cols-1 max-[900px]:gap-[60px]">
            {/* Left column — Animated Gradient CTA card */}
            <div
              className="c5-animated-gradient rounded-[24px] py-20 px-10 text-white flex flex-col justify-center items-center text-center"
              style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
            >
              <h2
                className="font-normal leading-[1.1] mb-[15px]"
                style={{ fontSize: '3.2rem', letterSpacing: '-0.03em' }}
              >
                ¿Listo para probar
                <br />
                Cookie Planet?
              </h2>
              <p className="text-[0.95rem] mb-[30px] font-normal opacity-90 max-w-md">
                Galletas artesanales recién horneadas. Haz tu pedido para el recreo o eventos especiales.
              </p>
              <button
                type="button"
                onClick={onOrderClick}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="bg-neutral-900 text-white font-semibold cursor-pointer border-none text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  padding: '14px 32px',
                  borderRadius: '12px',
                  boxShadow: btnHovered
                    ? '0 14px 30px rgba(0,0,0,0.4)'
                    : '0 10px 20px rgba(0,0,0,0.3)',
                }}
              >
                Ordenar Ahora
              </button>
            </div>

            {/* Right column — FAQ accordion */}
            <div className="flex flex-col justify-center gap-3">
              <div className="mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
                  Preguntas Frecuentes
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">
                  Todo sobre Cookie Planet
                </h3>
              </div>

              {FAQ_DATA.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={item.q}
                    onClick={() => toggleAccordion(idx)}
                    className="bg-white border rounded-[10px] py-[18px] px-5 cursor-pointer transition-all duration-200 hover:border-[#eaeaea]"
                    style={{
                      borderColor: isActive ? '#eaeaea' : '#f0f0f0',
                      boxShadow: isActive
                        ? '0 4px 12px rgba(0,0,0,0.04)'
                        : '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div className="flex justify-between items-center font-normal text-[0.9rem] text-neutral-900 select-none">
                      <span className="pr-3 leading-snug font-medium">{item.q}</span>
                      <span className="shrink-0 text-neutral-700">
                        {isActive ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </span>
                    </div>
                    {isActive && (
                      <p className="mt-3 text-[0.9rem] text-[#666] leading-[1.6]">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
