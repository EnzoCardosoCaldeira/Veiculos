import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Scale, 
  Zap, 
  Gauge, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Send,
  Compass,
  Award,
  Bell
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isInComparison: boolean;
  onToggleComparison: (vehicle: Vehicle) => void;
  onOpenQuoteWithVehicle: (vehicle: Vehicle) => void;
  onOpenPriceAlert: (vehicle: Vehicle) => void;
  hasActiveAlert?: boolean;
  currency: 'BRL' | 'USD';
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInComparison,
  onToggleComparison,
  onOpenQuoteWithVehicle,
  onOpenPriceAlert,
  hasActiveAlert = false,
  currency,
}) => {
  if (!vehicle) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryImages = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl rounded-2xl bg-[#0D0D12] border border-[#242433] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2A] bg-[#101017]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span className="text-xs font-mono-num uppercase tracking-wider text-neutral-400">
              FICHA TÉCNICA OFICIAL · {vehicle.brand} {vehicle.model}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Price Drop Alert */}
            <button
              onClick={() => onOpenPriceAlert(vehicle)}
              className={`p-2 rounded text-xs border transition-colors flex items-center gap-1.5 ${
                hasActiveAlert 
                  ? 'bg-[#E50914] border-[#E50914] text-white shadow-sm shadow-[#E50914]/25' 
                  : 'bg-[#15151F] border-[#2A2A38] text-neutral-300 hover:text-white'
              }`}
              title="Criar alerta de queda de preço"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">
                {hasActiveAlert ? 'Radar Ativo' : 'Alerta de Preço'}
              </span>
            </button>

            {/* Compare Toggle */}
            <button
              onClick={() => onToggleComparison(vehicle)}
              className={`p-2 rounded text-xs border transition-colors flex items-center gap-1.5 ${
                isInComparison 
                  ? 'bg-[#E50914] border-[#E50914] text-white' 
                  : 'bg-[#15151F] border-[#2A2A38] text-neutral-300 hover:text-white'
              }`}
              title="Comparar com outro veículo"
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">
                {isInComparison ? 'No Comparador' : 'Comparar'}
              </span>
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 rounded text-xs border transition-colors flex items-center gap-1.5 ${
                isFavorite 
                  ? 'bg-[#E50914]/20 border-[#E50914] text-[#E50914]' 
                  : 'bg-[#15151F] border-[#2A2A38] text-neutral-300 hover:text-[#E50914]'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E50914]' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded bg-[#15151F] hover:bg-[#20202E] border border-[#2A2A38] text-neutral-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Visual & Title Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Gallery Display */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-black border border-[#222230]">
                <img
                  src={galleryImages[activeImageIndex] || vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallbacks: Record<string, string> = {
                      carros: '/images/car-supercar.jpg',
                      motos: '/images/moto-superbike.jpg',
                      caminhoes: '/images/truck-heavy.jpg',
                      barcos: '/images/boat-yacht.jpg',
                      tanques: '/images/tank-tactical.jpg',
                    };
                    e.currentTarget.src = fallbacks[vehicle.category] || '/images/hero-hypercar.jpg';
                  }}
                  className="w-full h-full object-cover object-center filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {vehicle.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#E50914] text-white text-[11px] font-bold uppercase tracking-wider font-mono-num shadow-md">
                    {vehicle.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails (if multiple) */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2.5">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === i ? 'border-[#E50914]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs uppercase font-mono-num text-[#E50914] font-bold tracking-wider mb-1">
                  {vehicle.brand} · Ano {vehicle.year} · {vehicle.categoryLabel}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  {vehicle.name}
                </h2>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {vehicle.description}
                </p>

                {/* Reference Price Box */}
                <div className="p-4 rounded-xl bg-[#14141C] border border-[#252536] mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono-num block mb-1">
                    Valor de Aquisição / Cotação de Mercado
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono-num tracking-tight">
                    {formatPrice(vehicle.priceBRL, vehicle.priceUSD)}
                  </div>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    *Preço sob consulta cambial para pronta entrega ou importação direta homologada.
                  </span>
                </div>
              </div>

              {/* Primary Action Button inside modal */}
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteWithVehicle(vehicle);
                }}
                className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c90812] active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#E50914]/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Cotação Formal deste Veículo</span>
              </button>
            </div>
          </div>

          {/* Technical Specifications Grid (Ficha Técnica Completa) */}
          <div className="pt-6 border-t border-[#1F1F2B]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E50914]" />
              <span>Ficha Técnica & Desempenho Homologado</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Potência Máxima</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.power}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Aceleração / Torque</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.acceleration}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Velocidade Máxima</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.topSpeed}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Transmissão</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.transmission}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Motorização</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.engine}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Peso Operacional</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.weight}</span>
              </div>

              {vehicle.specs.armor && (
                <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Blindagem Composta</span>
                  <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.armor}</span>
                </div>
              )}

              {vehicle.specs.caliber && (
                <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Calibre de Combate</span>
                  <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.caliber}</span>
                </div>
              )}

              {vehicle.specs.length && (
                <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Comprimento / Boca</span>
                  <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.length}</span>
                </div>
              )}

              {vehicle.specs.payloadCapacity && (
                <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Capacidade Carga PBTC</span>
                  <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.payloadCapacity}</span>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-[#121218] border border-[#21212C]">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-num block">Autonomia Estimada</span>
                <span className="text-sm font-bold text-white font-mono-num mt-1 block">{vehicle.specs.autonomy}</span>
              </div>
            </div>
          </div>

          {/* Performance Radar Metrics */}
          <div className="pt-6 border-t border-[#1F1F2B]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#E50914]" />
              <span>Avaliação Dinâmica de Performance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Potência & Torque', value: vehicle.performanceScore.power },
                { label: 'Maneabilidade & Chassi', value: vehicle.performanceScore.handling },
                { label: 'Tecnologia & Telemetria', value: vehicle.performanceScore.technology },
                { label: 'Raridade & Exclusividade', value: vehicle.performanceScore.exclusivity },
              ].map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#121218] border border-[#21212C]">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-neutral-300 font-medium">{metric.label}</span>
                    <span className="text-[#E50914] font-bold font-mono-num">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-[#1A1A24] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#990008] to-[#E50914] h-full rounded-full transition-all duration-700" 
                      style={{ width: `${metric.value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="pt-6 border-t border-[#1F1F2B]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E50914]" />
              <span>Equipamentos de Série & Sistemas Especiais</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {vehicle.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#121218] border border-[#1E1E28] text-xs text-neutral-200">
                  <CheckCircle className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Intelligence Block */}
          <div className="pt-6 border-t border-[#1F1F2B]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E50914]" />
              <span>Inteligência de Mercado & Desembaraço</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#121218] border border-[#21212C]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-400 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Valorização Histórica</span>
                </div>
                <div className="text-sm font-bold text-white">{vehicle.metrics.appreciationIndex}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#121218] border border-[#21212C]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-400 mb-1">
                  <Award className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Homologação & Certificação</span>
                </div>
                <div className="text-sm font-bold text-white">{vehicle.metrics.certification}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#121218] border border-[#21212C]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Prazo e Logística</span>
                </div>
                <div className="text-sm font-bold text-white">{vehicle.metrics.deliveryTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
