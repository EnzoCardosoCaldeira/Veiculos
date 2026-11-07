import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, Shield, Anchor, Truck, Flame, Car } from 'lucide-react';
import { CATEGORY_METADATA } from '../data/vehicles';
import { VehicleCategory } from '../types/vehicle';

interface CategoryShowcaseProps {
  onSelectCategory: (category: VehicleCategory) => void;
  activeCategory?: VehicleCategory | 'todas';
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'carros': return <Car className="w-5 h-5 text-[#E50914]" />;
      case 'motos': return <Flame className="w-5 h-5 text-[#E50914]" />;
      case 'caminhoes': return <Truck className="w-5 h-5 text-[#E50914]" />;
      case 'barcos': return <Anchor className="w-5 h-5 text-[#E50914]" />;
      case 'tanques': return <Shield className="w-5 h-5 text-[#E50914]" />;
      default: return null;
    }
  };

  return (
    <section id="categorias" className="py-20 bg-[#0A0A0D] border-b border-[#1A1A24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-num font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <span>EXPLORAÇÃO SETORIAL</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-400">5 DIVISÕES DE ENGENHARIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              CATEGORIAS & MÁQUINAS
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Selecione uma divisão especializada para acessar especificações confidenciais, relatórios de blindagem, propulsão marítima e fichas técnicas completas.
          </p>
        </div>

        {/* Categories Bento / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_METADATA.map((cat, index) => {
            const isLarge = index === 0 || index === 4; // Carros and Tanques get marquee visual balance
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as VehicleCategory)}
                className={`group relative rounded-xl overflow-hidden bg-[#111116] border border-[#22222D] hover:border-[#E50914]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-[#E50914]/15 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : 'col-span-1'
                }`}
              >
                {/* Background Card Image with subtle hover zoom */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallbacks: Record<string, string> = {
                        carros: '/images/car-supercar.jpg',
                        motos: '/images/moto-superbike.jpg',
                        caminhoes: '/images/truck-heavy.jpg',
                        barcos: '/images/boat-yacht.jpg',
                        tanques: '/images/tank-tactical.jpg',
                      };
                      e.currentTarget.src = fallbacks[cat.id] || '/images/hero-hypercar.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent" />
                  
                  {/* Top Bar on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#08080A]/85 backdrop-blur-md border border-white/10 text-[11px] font-mono-num text-neutral-200">
                      {getCategoryIcon(cat.id)}
                      <span className="font-semibold">{cat.tag}</span>
                    </span>
                    <span className="text-[11px] font-mono-num font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E50914] transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                      <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                      {cat.headline}
                    </p>

                    {/* Highlights Specs Chips */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {cat.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-3 border-t border-[#1F1F2A] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                    <span>Acessar Divisão {cat.shortTitle}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
