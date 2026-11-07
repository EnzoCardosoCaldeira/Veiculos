import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Gauge, 
  Flame, 
  Globe2, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { VehicleCategory } from '../types/vehicle';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onSelectCategory: (cat: VehicleCategory) => void;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onSelectCategory,
  onOpenQuote,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden border-b border-[#1A1A24]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_apex_hypercar_1794059188468.jpg"
          alt="Apex Hypercar em showroom escuro com detalhes em fibra de carbono"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12]"
        />
        {/* Gradient Scrims: Dark Vignette, Top Navbar Fade, Bottom Content Blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-black/60" />
        <div className="absolute inset-0 precision-grid opacity-30 pointer-events-none" />
        
        {/* Subtle red ambient light glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#E50914]/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Quiet Kicker */}
          <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E50914]" />
            <span className="text-[#E50914] font-mono-num font-bold">PLATAFORMA GLOBAL</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>ALTA PERFORMANCE & MÁQUINAS PESADAS</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 font-heading">
            O MERCADO DEFINITIVO DE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              VEÍCULOS EXTREMOS
            </span>{' '}
            E <span className="text-[#E50914]">MÁQUINAS.</span>
          </h1>

          {/* Value Proposition Description */}
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Acesso exclusivo, cotações em tempo real e assessoria documental internacional para 
            <strong className="text-white font-medium"> carros esportivos, motocicletas de pista, caminhões pesados, iates oceânicos e blindados militares</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3.5 rounded bg-[#E50914] hover:bg-[#c90812] active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#E50914]/30 flex items-center gap-2 group"
            >
              <span>Explorar Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded bg-[#121217]/90 hover:bg-[#1C1C24] active:scale-[0.98] border border-[#2D2D3A] text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Simular Cotação ou Importação</span>
            </button>
          </div>

          {/* Category Quick Jump Bar */}
          <div className="pt-4 border-t border-white/10">
            <span className="text-[11px] font-mono-num uppercase tracking-wider text-neutral-400 block mb-2.5">
              Navegar diretamente por categoria:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'carros', label: 'Carros Esportivos' },
                { id: 'motos', label: 'Superbikes' },
                { id: 'caminhoes', label: 'Caminhões Pesados' },
                { id: 'barcos', label: 'Iates & Lanchas' },
                { id: 'tanques', label: 'Tanques Militares' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as VehicleCategory)}
                  className="px-3 py-1.5 rounded bg-[#101015]/80 hover:bg-[#1E1E28] border border-[#252533] hover:border-[#E50914]/50 text-xs font-medium text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistical Strip / Proof Indicators (Full-width row) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#0F0F14]/90 backdrop-blur-md border border-[#20202B]">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded bg-[#1A1A24] border border-[#2A2A38] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono-num">
                1.600 cv
              </div>
              <div className="text-xs text-neutral-400">Potência de Pico Homologada</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded bg-[#1A1A24] border border-[#2A2A38] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono-num">
                100% Seguro
              </div>
              <div className="text-xs text-neutral-400">Inspeção & Desembaraço Legal</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded bg-[#1A1A24] border border-[#2A2A38] flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono-num">
                38 Países
              </div>
              <div className="text-xs text-neutral-400">Rede de Logística Global</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded bg-[#1A1A24] border border-[#2A2A38] flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono-num">
                +14,2% a.a.
              </div>
              <div className="text-xs text-neutral-400">Valorização Média de Ativos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
