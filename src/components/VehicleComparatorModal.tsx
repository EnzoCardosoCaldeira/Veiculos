import React from 'react';
import { X, Scale, Trash2, Zap, Gauge, ArrowRight } from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleComparatorModalProps {
  vehicles: Vehicle[];
  onClose: () => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenQuoteWithVehicle: (vehicle: Vehicle) => void;
  currency: 'BRL' | 'USD';
}

export const VehicleComparatorModal: React.FC<VehicleComparatorModalProps> = ({
  vehicles,
  onClose,
  onRemoveVehicle,
  onSelectVehicle,
  onOpenQuoteWithVehicle,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl rounded-2xl bg-[#0D0D12] border border-[#242433] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2A] bg-[#101017]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#E50914]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              COMPARADOR TÉCNICO MULTI-MÁQUINAS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded bg-[#15151F] hover:bg-[#20202E] border border-[#2A2A38] text-neutral-400 hover:text-white transition-colors"
            aria-label="Fechar comparador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparator Body */}
        <div className="overflow-y-auto p-6">
          {vehicles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-[#1A1A24] text-[#E50914] mx-auto flex items-center justify-center mb-3">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Nenhum veículo selecionado para comparação
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                Clique no ícone de balança nos cards do catálogo para adicionar até 3 veículos e comparar fichas técnicas lado a lado.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Voltar ao Catálogo
              </button>
            </div>
          ) : (
            <div>
              {/* Columns Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(vehicles.length, 3)} gap-6`}>
                {vehicles.map((v) => (
                  <div key={v.id} className="rounded-xl bg-[#121218] border border-[#21212C] p-4 flex flex-col justify-between">
                    <div>
                      {/* Top Header inside card */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono-num uppercase font-semibold text-[#E50914]">
                          {v.brand} · {v.categoryLabel}
                        </span>
                        <button
                          onClick={() => onRemoveVehicle(v.id)}
                          className="p-1 text-neutral-400 hover:text-red-400 transition-colors"
                          title="Remover da comparação"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="h-40 rounded-lg overflow-hidden bg-black mb-3">
                        <img
                          src={v.image}
                          alt={v.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-base font-bold text-white mb-1">{v.name}</h3>
                      <div className="text-lg font-extrabold text-[#E50914] font-mono-num mb-4">
                        {formatPrice(v.priceBRL, v.priceUSD)}
                      </div>

                      {/* Spec Rows */}
                      <div className="space-y-2 text-xs border-t border-[#1E1E28] pt-3">
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Potência</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.power}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Desempenho</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.acceleration}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Velocidade Máx</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.topSpeed}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Transmissão</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.transmission}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Motor</span>
                          <span className="text-white font-mono-num font-semibold truncate max-w-[150px]">{v.specs.engine}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Peso</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.weight}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1A1A22]">
                          <span className="text-neutral-400">Autonomia</span>
                          <span className="text-white font-mono-num font-semibold">{v.specs.autonomy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-[#1E1E28] space-y-2 mt-4">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectVehicle(v);
                        }}
                        className="w-full py-2 rounded bg-[#181822] hover:bg-[#202030] text-xs font-semibold text-white transition-colors"
                      >
                        Ver Detalhes Completos
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuoteWithVehicle(v);
                        }}
                        className="w-full py-2 rounded bg-[#E50914] hover:bg-[#c90812] text-xs font-bold text-white uppercase tracking-wider transition-colors"
                      >
                        Cotar este Modelo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
