import React, { useState } from 'react';
import { X, ArrowLeft, Heart, ShoppingBag, Sparkles, ShieldCheck, Flame, Star, Check } from 'lucide-react';

export interface CookieDetail {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  price: string;
  rating: number;
  reviewsCount: number;
  calories: string;
  weight: string;
  bg: string;
  accent: string;
  heroImage: string;
  description: string;
  tasteNotes: string[];
  ingredients: string[];
  allergens: string[];
  bakerQuote: string;
}

export const COOKIE_DETAILS: Record<number, CookieDetail> = {
  0: {
    id: 'chocolate-chip',
    name: 'Cookie Chocolate Chip',
    tagline: 'Horneadas artesanalmente con chispas de cacao puro y textura inigualable',
    category: 'Clásicos Reinvención',
    badge: 'Popular',
    price: '$4.50',
    rating: 4.9,
    reviewsCount: 142,
    calories: '420 kcal',
    weight: '160g',
    bg: '#F4845F',
    accent: '#FFE2D7',
    heroImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/1.1.png',
    description:
      'Una explosión de nostalgia y sabor. Masa de mantequilla avellanada artesanal infusionada con vainilla bourbon pura y generosas chispas y lingotes de chocolate belga al 70% que se funden al primer bocado.',
    tasteNotes: ['Cacao belga 70%', 'Vainilla Bourbon', 'Toque de caramelo suave'],
    ingredients: [
      'Harina de trigo premium enriquecida',
      'Mantequilla de campo 100% pura',
      'Azúcar de caña y mascabado artesanal',
      'Extracto puro de vainilla de Madagascar',
      'Chocolate belga 70% cacao',
      'Escamas de sal marina'
    ],
    allergens: ['Contiene Trigo (Gluten)', 'Leche / Lácteos', 'Huevos de granja'],
    bakerQuote: '“Diseñada para hacer sonreír en el primer segundo. Bordes crocantes y centro húmedo volcánico.”'
  },
  1: {
    id: 'red-velvet',
    name: 'Cookie Red Velvet',
    tagline: 'Elegancia aterciopelada carmesí y suave corazón de cream cheese',
    category: 'Firma de la Casa',
    badge: 'Favorito del Chef',
    price: '$4.75',
    rating: 5.0,
    reviewsCount: 218,
    calories: '440 kcal',
    weight: '175g',
    bg: '#6BBF7A',
    accent: '#DCF5DF',
    heroImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/2.1.png',
    description:
      'Inspirada en el clásico pastel Red Velvet. Textura tierna tipo bizcocho denso, notas sutiles de cacao holandés, chispas de chocolate blanco mantecoso y un centro fundente con queso crema dulce batido.',
    tasteNotes: ['Cacao sutil', 'Queso crema aterciopelado', 'Vainilla dulce'],
    ingredients: [
      'Harina leudante seleccionada',
      'Cacao orgánico suave',
      'Queso crema artesanal Philadelphia',
      'Mantequilla clarificada',
      'Azúcar morena no refinada',
      'Pizca de sal marina de grano fino'
    ],
    allergens: ['Gluten', 'Lácteos frescos', 'Huevo'],
    bakerQuote: '“El equilibrio perfecto entre un pastel gourmet esponjoso y una galleta artesanal contundente.”'
  },
  2: {
    id: 'oatmeal-raisin',
    name: 'Oatmeal Raisin Cookie',
    tagline: 'Textura rústica, avena integral tostada y pasas jugosas',
    category: 'Clásicos Reinvención',
    badge: 'Artesanal',
    price: '$4.60',
    rating: 4.89,
    reviewsCount: 164,
    calories: '390 kcal',
    weight: '165g',
    bg: '#E882B4',
    accent: '#FDE3EE',
    heroImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/3.1.png',
    description:
      'Avena integral seleccionada, pasas hidratadas lentamente y canela aromática de Ceilán. Un equilibrio reconfortante entre textura tierno-crocante y dulzura equilibrada.',
    tasteNotes: ['Avena tostada', 'Canela de Ceilán', 'Pasas maceradas'],
    ingredients: [
      'Avena integral de grano entero',
      'Harina artesanal de trigo',
      'Pasas seleccionadas hidratadas',
      'Mantequilla clarificada',
      'Canela pura de Ceilán',
      'Azúcar mascabado rubio'
    ],
    allergens: ['Trigo (Gluten)', 'Lácteos'],
    bakerQuote: '“El aroma a canela y avena tostada recién horneada transporta de inmediato a casa.”'
  },
  3: {
    id: 'cookies-and-cream',
    name: 'Cookies & Cream Cookie',
    tagline: 'Intensidad de cacao oscuro con trozos crujientes de galleta y crema',
    category: 'Especialidad',
    badge: 'Más Vendida',
    price: '$4.95',
    rating: 4.96,
    reviewsCount: 305,
    calories: '465 kcal',
    weight: '180g',
    bg: '#6EB5FF',
    accent: '#DDEEFF',
    heroImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790402555/4.1.png',
    description:
      'Doble dosis de galleta negra artesanal con trozos rústicos crujientes combinados con un núcleo suave de crema dulce. Una textura crocante por fuera y centro húmedo irresistible.',
    tasteNotes: ['Cacao Black Dutch', 'Crujiente de galleta oscura', 'Crema suave dulce'],
    ingredients: [
      'Cacao Black Dutch ultra oscuro',
      'Trozos de galleta crujiente artesanal',
      'Mantequilla de pastoreo',
      'Crema dulce batida',
      'Azúcar moreno fino',
      'Extracto de vainilla'
    ],
    allergens: ['Gluten', 'Lácteos frescos'],
    bakerQuote: '“Para quienes buscan el contraste supremo entre el crujiente negro y la suavidad láctea.”'
  }
};

interface CookieDetailModalProps {
  cookieIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnother?: (index: number) => void;
}

export const CookieDetailModal: React.FC<CookieDetailModalProps> = ({
  cookieIndex,
  isOpen,
  onClose,
  onSelectAnother
}) => {
  const [ordered, setOrdered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  if (!isOpen || cookieIndex === null) return null;

  const data = COOKIE_DETAILS[cookieIndex] || COOKIE_DETAILS[0];

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      {/* Container / Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row my-auto max-h-[92vh]"
        style={{
          boxShadow: '0 25px 70px -15px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        {/* Left Side: Product Stage with Dynamic Background */}
        <div
          className="relative w-full md:w-[48%] p-6 sm:p-10 flex flex-col justify-between items-center overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: data.bg }}
        >
          {/* Subtle noise grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`,
              backgroundSize: '160px 160px',
            }}
          />

          {/* Top Bar inside image stage */}
          <div className="w-full flex items-center justify-between z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur-md shadow-sm">
              {data.badge}
            </span>
            <button
              onClick={() => setLiked(!liked)}
              aria-label="Favorito"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                liked ? 'bg-red-500 text-white scale-110' : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Central 3D Cookie Display */}
          <div className="relative my-4 sm:my-6 flex items-center justify-center w-full z-10 group">
            {/* Glow circle behind */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-white/25 blur-2xl pointer-events-none animate-pulse" />
            <img
              src={data.heroImage}
              alt={data.name}
              className="relative max-h-[260px] sm:max-h-[340px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 select-none"
            />
          </div>

          {/* Quick specs pill bar */}
          <div className="w-full z-10 bg-white/20 backdrop-blur-md rounded-2xl p-3 flex items-center justify-around text-white text-center border border-white/20">
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-80">Porción</p>
              <p className="text-xs sm:text-sm font-bold">{data.weight}</p>
            </div>
            <div className="h-6 w-[1px] bg-white/30" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-80">Energía</p>
              <p className="text-xs sm:text-sm font-bold">{data.calories}</p>
            </div>
            <div className="h-6 w-[1px] bg-white/30" />
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-80">Calificación</p>
              <p className="text-xs sm:text-sm font-bold flex items-center gap-1 justify-center">
                <Star size={12} fill="currentColor" className="text-yellow-300" />
                {data.rating}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Form */}
        <div className="w-full md:w-[52%] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4845F]">
                {data.category}
              </span>
              <span className="text-xs text-neutral-400">
                ({data.reviewsCount} reseñas verificadas)
              </span>
            </div>

            {/* Title & Tagline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-tight mb-2">
              {data.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium mb-4">
              {data.tagline}
            </p>

            {/* Price Badge */}
            <div className="flex items-baseline gap-3 mb-6 pb-5 border-b border-neutral-100">
              <span className="text-3xl sm:text-4xl font-black text-neutral-900">
                {data.price}
              </span>
              <span className="text-xs text-neutral-400">
                / unidad recién horneada
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Experiencia del Sabor
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Taste Notes Pills */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Notas Principales
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.tasteNotes.map((note) => (
                  <span
                    key={note}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800"
                  >
                    <Sparkles size={12} className="text-[#F4845F]" />
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Baker Quote */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-6 text-xs text-amber-900 italic">
              {data.bakerQuote}
            </div>

            {/* Allergens warning */}
            <div className="mb-6 flex items-start gap-2 text-xs text-neutral-500">
              <ShieldCheck size={16} className="text-neutral-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-700">Alérgenos:</strong>{' '}
                {data.allergens.join(', ')}
              </span>
            </div>
          </div>

          {/* Bottom Action Section: Quantity + Order CTA */}
          <div className="pt-4 border-t border-neutral-100">
            {/* Quantity selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Cantidad
              </span>
              <div className="flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
                {[1, 2, 4, 6, 12].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setSelectedQty(qty)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedQty === qty
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleOrder}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-transform active:scale-98 cursor-pointer shadow-lg"
              >
                {ordered ? (
                  <>
                    <Check size={18} className="text-emerald-400" />
                    <span>¡Agregado a tu Pedido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Pedir {selectedQty}x por {data.price}</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20${selectedQty}%20galleta(s)%20de%20${encodeURIComponent(data.name)}`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
              >
                WhatsApp
              </a>
            </div>

            {/* Other cookies thumbnails */}
            {onSelectAnother && (
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Explorar otros sabores:
                </span>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((idx) => {
                    const cookie = COOKIE_DETAILS[idx];
                    const isSelected = idx === cookieIndex;
                    return (
                      <button
                        key={cookie.id}
                        onClick={() => onSelectAnother(idx)}
                        title={cookie.name}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center p-1 transition-transform ${
                          isSelected
                            ? 'ring-2 ring-neutral-900 scale-105'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: cookie.bg }}
                      >
                        <img
                          src={cookie.heroImage}
                          alt={cookie.name}
                          className="w-full h-full object-contain drop-shadow"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
