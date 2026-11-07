import React from 'react';
import { Heart, Scale, Zap, Gauge, ArrowUpRight, Bell } from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  isFavorite: boolean;
  onToggleFavorite: (vehicleId: string) => void;
  isInComparison: boolean;
  onToggleComparison: (vehicle: Vehicle) => void;
  onOpenPriceAlert: (vehicle: Vehicle) => void;
  hasActiveAlert?: boolean;
  currency: 'BRL' | 'USD';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isInComparison,
  onToggleComparison,
  onOpenPriceAlert,
  hasActiveAlert = false,
  currency,
}) => {
  const formatPrice = (brl: number, usd: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(usd);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(brl);
  };

  return (
    <div className="group relative rounded-xl bg-[#101015] border border-[#20202B] hover:border-[#E50914]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#E50914]/10">
      {/* Top Image Container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#0B0B0E]">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-[0.88]"
        />
        {/* Soft dark gradient at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-black/40" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {vehicle.badge && (
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm font-mono-num">
                {vehicle.badge}
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-[#0A0A0D]/90 backdrop-blur-sm border border-white/10 text-neutral-300 text-[10px] font-mono-num">
              {vehicle.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Price Drop Alert Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPriceAlert(vehicle);
              }}
              title={hasActiveAlert ? 'Radar de Preço Ativo' : 'Criar Alerta de Queda de Preço'}
              className={`p-1.5 rounded backdrop-blur-md border transition-colors ${
                hasActiveAlert 
                  ? 'bg-[#E50914] border-[#E50914] text-white shadow-sm shadow-[#E50914]/30' 
                  : 'bg-[#0A0A0D]/80 border-white/10 text-neutral-300 hover:text-[#E50914] hover:bg-neutral-800'
              }`}
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleComparison(vehicle);
              }}
              title={isInComparison ? 'Remover do Comparador' : 'Adicionar ao Comparador'}
              className={`p-1.5 rounded backdrop-blur-md border transition-colors ${
                isInComparison 
                  ? 'bg-[#E50914] border-[#E50914] text-white' 
                  : 'bg-[#0A0A0D]/80 border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(vehicle.id);
              }}
              title={isFavorite ? 'Remover dos Favoritos' : 'Salvar nos Favoritos'}
              className={`p-1.5 rounded backdrop-blur-md border transition-colors ${
                isFavorite 
                  ? 'bg-[#E50914]/20 border-[#E50914] text-[#E50914]' 
                  : 'bg-[#0A0A0D]/80 border-white/10 text-neutral-300 hover:text-[#E50914] hover:bg-neutral-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E50914]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Label Overlay */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-mono-num font-medium text-neutral-300 uppercase tracking-wider flex items-center gap-1">
          <span className="text-[#E50914] font-bold">{vehicle.brand}</span>
          <span className="text-neutral-500">·</span>
          <span>{vehicle.categoryLabel}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Vehicle Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors mb-1 line-clamp-1">
            {vehicle.name}
          </h3>

          <p className="text-neutral-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            {vehicle.tagline}
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-[#0A0A0E] border border-[#1A1A24] mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Potência</span>
                <span className="text-xs font-semibold text-white font-mono-num truncate block">
                  {vehicle.specs.power}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Desempenho</span>
                <span className="text-xs font-semibold text-white font-mono-num truncate block">
                  {vehicle.specs.acceleration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#1C1C26] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">
              Valor de Referência
            </span>
            <span className="text-base font-extrabold text-white font-mono-num tracking-tight">
              {formatPrice(vehicle.priceBRL, vehicle.priceUSD)}
            </span>
          </div>

          <button
            onClick={() => onSelect(vehicle)}
            className="px-3.5 py-2 rounded bg-[#181820] hover:bg-[#E50914] border border-[#2B2B38] hover:border-[#E50914] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 group/btn shrink-0"
          >
            <span>Ver Ficha</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
