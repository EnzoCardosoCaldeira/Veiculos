import React from 'react';
import { ArrowLeft, Check, Shield, Flame, Anchor, Truck, Car } from 'lucide-react';
import { CATEGORY_METADATA } from '../data/vehicles';
import { VehicleCategory } from '../types/vehicle';

interface CategoryHeroBannerProps {
  category: VehicleCategory;
  onBackToHome: () => void;
  currency: 'BRL' | 'USD';
}

export const CategoryHeroBanner: React.FC<CategoryHeroBannerProps> = ({
  category,
  onBackToHome,
}) => {
  const meta = CATEGORY_METADATA.find((c) => c.id === category) || CATEGORY_METADATA[0];

  const getCategoryIcon = () => {
    switch (category) {
      case 'carros': return <Car className="w-5 h-5 text-[#E50914]" />;
      case 'motos': return <Flame className="w-5 h-5 text-[#E50914]" />;
      case 'caminhoes': return <Truck className="w-5 h-5 text-[#E50914]" />;
      case 'barcos': return <Anchor className="w-5 h-5 text-[#E50914]" />;
      case 'tanques': return <Shield className="w-5 h-5 text-[#E50914]" />;
    }
  };

  return (
    <div className="relative pt-24 pb-14 overflow-hidden border-b border-[#1E1E28] bg-[#0A0A0E]">
      {/* Background Image Scrim */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={meta.image}
          alt={meta.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0E] via-[#0A0A0E]/80 to-[#0A0A0E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-black/70" />
        <div className="absolute inset-0 precision-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#E50914]" />
            <span>Início</span>
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] font-mono-num">
            Divisão {meta.shortTitle}
          </span>
        </div>

        {/* Header Block */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16161E] border border-[#262633] text-xs font-mono-num text-neutral-300 mb-4">
            {getCategoryIcon()}
            <span className="font-semibold text-white">{meta.tag}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-[#E50914]">{meta.count}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            {meta.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 mb-6 leading-relaxed">
            {meta.headline} {meta.description}
          </p>

          {/* Highlights pills */}
          <div className="flex flex-wrap items-center gap-2">
            {meta.highlights.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#121218]/90 border border-[#22222E] text-xs font-medium text-neutral-300"
              >
                <Check className="w-3.5 h-3.5 text-[#E50914]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
