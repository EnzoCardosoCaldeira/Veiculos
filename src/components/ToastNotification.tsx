import React from 'react';
import { TrendingDown, X, ArrowUpRight, BellRing } from 'lucide-react';
import { AppNotification } from '../types/notification';

interface ToastNotificationProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
  onSelectVehicleById: (vehicleId: string) => void;
  currency: 'BRL' | 'USD';
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  notifications,
  onDismiss,
  onSelectVehicleById,
  currency,
}) => {
  if (notifications.length === 0) return null;

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      const usdVal = Math.round(val / 5);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(usdVal);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto rounded-xl bg-[#0F0F16] border border-[#E50914]/80 shadow-2xl shadow-black/90 p-4 transition-all animate-in slide-in-from-right duration-300 relative overflow-hidden"
        >
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E50914] to-red-600" />

          <div className="flex items-start gap-3">
            {/* Vehicle Thumbnail */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-[#232330]">
              <img
                src={notif.vehicleImage}
                alt={notif.vehicleName}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/images/hero-hypercar.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-[#E50914] p-0.5 rounded-tl text-white">
                <TrendingDown className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono-num font-bold uppercase tracking-wider text-[#E50914] flex items-center gap-1">
                  <BellRing className="w-3 h-3 text-[#E50914]" />
                  <span>Queda de Preço Detectada</span>
                </span>
                <button
                  onClick={() => onDismiss(notif.id)}
                  className="text-neutral-500 hover:text-white p-0.5"
                  aria-label="Fechar notificação"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-xs font-bold text-white truncate mb-1">
                {notif.vehicleName}
              </h4>

              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="line-through text-neutral-500 font-mono-num text-[11px]">
                  {formatPrice(notif.oldPrice)}
                </span>
                <span className="text-emerald-400 font-mono-num font-bold">
                  {formatPrice(notif.newPrice)}
                </span>
                <span className="text-[10px] font-mono-num text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-800/40">
                  -{notif.discountPercentage}%
                </span>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-neutral-400 font-mono-num">
                  {notif.timestamp}
                </span>
                <button
                  onClick={() => {
                    onSelectVehicleById(notif.vehicleId);
                    onDismiss(notif.id);
                  }}
                  className="text-xs font-bold text-white bg-[#1A1A24] hover:bg-[#E50914] px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <span>Ver Oferta</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
