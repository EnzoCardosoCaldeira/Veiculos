import React from 'react';
import { Shield, Phone, Mail, MapPin, Globe, ChevronRight } from 'lucide-react';
import { VehicleCategory } from '../types/vehicle';

interface FooterProps {
  onSelectCategory: (cat: VehicleCategory | 'home' | 'catalogo' | 'mercado') => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenQuote,
}) => {
  return (
    <footer className="bg-[#050507] border-t border-[#181822] text-neutral-400 text-xs">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#E50914] to-[#990008] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-lg shadow-[#E50914]/25">
                VX
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1 leading-none font-heading">
                  VORTEX<span className="text-[#E50914]">DYNAMICS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-neutral-400 font-mono-num mt-0.5">
                  VEÍCULOS & MÁQUINAS
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Plataforma global para pesquisa, aquisição e importação homologada de veículos esportivos, motocicletas de pista, caminhões pesados, embarcações marítimas de luxo e plataformas blindadas militares.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101017] border border-[#222230] text-[11px] font-mono-num text-neutral-300">
                <Shield className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Auditoria & Custódia Internacional</span>
              </span>
            </div>
          </div>

          {/* Quick Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-mono-num font-bold text-white tracking-wider block mb-2">
              Divisões de Máquinas
            </span>
            <ul className="space-y-2">
              {[
                { id: 'carros', label: 'Carros Esportivos & Hipercarros' },
                { id: 'motos', label: 'Motocicletas & Superbikes' },
                { id: 'caminhoes', label: 'Caminhões Pesados & Rodotrens' },
                { id: 'barcos', label: 'Barcos de Luxo & Superiates' },
                { id: 'tanques', label: 'Tanques & Blindados Militares' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id as VehicleCategory)}
                    className="hover:text-[#E50914] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#E50914]/60" />
                    <span>{cat.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Services Column */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs uppercase font-mono-num font-bold text-white tracking-wider block mb-2">
              Navegação
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('home')} className="hover:text-white transition-colors">
                  Início (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('catalogo')} className="hover:text-white transition-colors">
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('mercado')} className="hover:text-white transition-colors">
                  Mercado & Indicadores
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-[#E50914] text-[#E50914] transition-colors font-medium">
                  Solicitar Cotação
                </button>
              </li>
            </ul>
          </div>

          {/* Global Operations & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-mono-num font-bold text-white tracking-wider block mb-2">
              Centros de Operação
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                <span>Av. Brigadeiro Faria Lima, 3477 · São Paulo, Brasil</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                <span>Brickell Avenue, 1200 · Miami, Flórida, EUA</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                <span className="font-mono-num text-white">+55 (11) 4003-8990 / +1 (305) 998-1020</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                <span className="font-mono-num text-white">concierge@vortexdynamics.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Rights Strip */}
      <div className="border-t border-[#14141E] bg-[#030305] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} VORTEX DYNAMICS INTERNACIONAL S.A. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Termos de Homologação</span>
            <span className="text-neutral-700">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Diretrizes de Exportação de Defesa</span>
            <span className="text-neutral-700">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Política de Privacidade & Sigilo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
