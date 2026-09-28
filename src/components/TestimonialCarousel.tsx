import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const baseTestimonials: Testimonial[] = [
  {
    quote: '¡La galleta de Chocolate Chip recién horneada es de otro nivel! El chocolate se derrite por completo y la masa es súper suave. Sin duda la mejor que he probado en el colegio.',
    name: 'Sofía Mendoza',
    role: 'Estudiante',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote: 'Pedí una caja de Red Velvet para regalar y la presentación fue impecable. Tienen un sabor aterciopelado perfecto y no son nada empalagosas. 10/10.',
    name: 'Mateo Fernández',
    role: 'Comprador',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote: 'La combinación con trozos crujientes de galleta negra y crema suave es espectacular. Mis favoritas definitivas de Cookie Planet.',
    name: 'Camila Vargas',
    role: 'Cliente frecuente',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote: 'Me sorprendió la de Avena y Pasas: suave, con el toque justo de canela y pasas de excelente calidad. Se nota el cariño y la dedicación artesanal en cada entrega.',
    name: 'Prof. Andrés Morales',
    role: 'Docente',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote: 'Hice mi pedido para el recreo y llegó calientita y a tiempo. Excelente atención y la calidad de los ingredientes se siente en el primer mordisco.',
    name: 'Valentina Castro',
    role: 'Estudiante',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=compress&cs=tinysrgb&w=150',
  },
];

// Tripled array for smooth continuous carousel experience
const allTestimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

export const TestimonialCarousel: React.FC = () => {
  const { ref, isInView } = useInViewAnimation(0.1);
  const [currentIndex, setCurrentIndex] = useState(baseTestimonials.length);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= allTestimonials.length - 1) {
          return baseTestimonials.length;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allTestimonials.length - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < allTestimonials.length - 1 ? prev + 1 : baseTestimonials.length));
  };

  return (
    <section id="testimonials" className="w-full py-20 bg-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header Row */}
        <div
          className={`${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          } md:max-w-4xl md:ml-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight font-normal">
            Lo que dicen <span className="font-mondwest italic font-normal">nuestros clientes</span>
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0D212C] ml-1">Calificación 5/5 ⭐</span>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-[#051A24] hover:text-white transition-colors cursor-pointer select-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-[#051A24] hover:text-white transition-colors cursor-pointer select-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel viewport */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? (window.innerWidth - 48 + 24) : (427.5 + 24))}px)`,
            }}
          >
            {allTestimonials.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="shrink-0 w-[calc(100vw-48px)] md:w-[427.5px] mr-6 bg-white rounded-[32px] md:rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-6 md:pl-10 md:pr-14 py-8 flex flex-col justify-between border border-neutral-100"
              >
                <div>
                  {/* SVG quote icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 text-[#051A24]/30 mb-5"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base text-[#0D212C] leading-relaxed mb-6 font-normal">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-[#051A24]">{t.name}</h4>
                    <p className="text-xs text-[#273C46] flex items-center gap-1">
                      <span>→</span> {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
