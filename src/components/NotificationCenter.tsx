import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  TrendingDown, 
  Trash2, 
  CheckCheck, 
  ArrowUpRight, 
  Sparkles, 
  Eye,
  Mail,
  Smartphone
} from 'lucide-react';
import { AppNotification, PriceAlert } from '../types/notification';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  priceAlerts: PriceAlert[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onRemovePriceAlert: (alertId: string) => void;
  onSelectVehicleById: (vehicleId: string) => void;
  onTriggerRandomPriceDrop: () => void;
  currency: 'BRL' | 'USD';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  priceAlerts,
  onMarkAllAsRead,
  onClearNotifications,
  onRemovePriceAlert,
  onSelectVehicleById,
  onTriggerRandomPriceDrop,
  currency,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'notifications' | 'alerts'>('notifications');
  const unreadCount = notifications.filter((n) => !n.read).length;

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#0C0C12] border-l border-[#222232] h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E2C] bg-[#101018]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-[#1A1A26] text-[#E50914]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono-num">
                  ALERTAS & RADAR DE PREÇOS
                </h3>
                <span className="text-[10px] text-neutral-400">
                  {unreadCount > 0 ? `${unreadCount} alerta(s) novo(s)` : 'Todos os alertas lidos'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#181824] hover:bg-[#222232] text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Tabs */}
          <div className="flex border-b border-[#1E1E2C] bg-[#0E0E16]">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'notifications'
                  ? 'text-white bg-[#141420]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Notificações ({notifications.length})
              {unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#E50914] text-white text-[9px] font-mono-num">
                  {unreadCount}
                </span>
              )}
              {activeTab === 'notifications' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'alerts'
                  ? 'text-white bg-[#141420]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monitorados ({priceAlerts.length})
              {activeTab === 'alerts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914]" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Center Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'notifications' ? (
            notifications.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-[#161622] text-[#E50914] mx-auto flex items-center justify-center mb-3">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Nenhuma queda de preço registrada ainda
                </h4>
                <p className="text-neutral-400 text-xs mb-5">
                  Ative o radar em qualquer máquina do catálogo ou teste uma simulação instantânea abaixo.
                </p>
                <button
                  onClick={onTriggerRandomPriceDrop}
                  className="px-4 py-2 rounded-lg bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simular Queda de Preço de Teste</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono-num uppercase">Histórico Recente</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onMarkAllAsRead}
                      className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Marcar lidos</span>
                    </button>
                    <span className="text-neutral-700">·</span>
                    <button
                      onClick={onClearNotifications}
                      className="text-[11px] text-neutral-400 hover:text-red-400"
                    >
                      Limpar
                    </button>
                  </div>
                </div>

                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-colors flex gap-3 relative overflow-hidden ${
                      item.read
                        ? 'bg-[#101016] border-[#1C1C28]'
                        : 'bg-[#151522] border-[#E50914]/50'
                    }`}
                  >
                    {!item.read && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E50914]" />
                    )}

                    <img
                      src={item.vehicleImage}
                      alt={item.vehicleName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hero-hypercar.jpg';
                      }}
                      className="w-14 h-14 rounded-lg object-cover bg-black shrink-0 border border-[#262638]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-mono-num font-bold text-[#E50914] flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        <span>Desconto de {item.discountPercentage}%</span>
                      </div>

                      <h5 className="text-xs font-bold text-white truncate mt-0.5 mb-1">
                        {item.vehicleName}
                      </h5>

                      <div className="flex items-center gap-2 text-xs mb-2">
                        <span className="line-through text-neutral-500 font-mono-num text-[11px]">
                          {formatPrice(item.oldPrice)}
                        </span>
                        <span className="text-emerald-400 font-mono-num font-bold">
                          {formatPrice(item.newPrice)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#20202E]">
                        <span className="text-[10px] text-neutral-500 font-mono-num">
                          {item.timestamp}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectVehicleById(item.vehicleId);
                          }}
                          className="text-[11px] font-bold text-[#E50914] hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <span>Ver Máquina</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Subscriptions Tab */
            priceAlerts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-[#161622] text-[#E50914] mx-auto flex items-center justify-center mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Nenhum veículo em monitoramento
                </h4>
                <p className="text-neutral-400 text-xs">
                  Navegue pelo catálogo e clique em "Radar de Preço" para ser alertado quando o valor baixar.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[11px] text-neutral-400 font-mono-num uppercase block mb-1">
                  {priceAlerts.length} Radar(es) Ativo(s)
                </span>

                {priceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-[#111118] border border-[#222230] flex gap-3"
                  >
                    <img
                      src={alert.vehicleImage}
                      alt={alert.vehicleName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hero-hypercar.jpg';
                      }}
                      className="w-14 h-14 rounded-lg object-cover bg-black shrink-0 border border-[#262638]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white truncate">
                          {alert.vehicleName}
                        </h5>
                        <button
                          onClick={() => onRemovePriceAlert(alert.id)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          title="Remover alerta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono-num text-neutral-400 mt-0.5">
                        Alvo:{' '}
                        <span className="text-emerald-400 font-bold">
                          {formatPrice(alert.targetPrice)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#1C1C28] text-[10px] text-neutral-400">
                        {alert.notifyToast && (
                          <span className="flex items-center gap-1 text-neutral-300">
                            <Smartphone className="w-3 h-3 text-[#E50914]" /> Toast
                          </span>
                        )}
                        {alert.notifyEmail && (
                          <span className="flex items-center gap-1 text-neutral-300 truncate max-w-[150px]">
                            <Mail className="w-3 h-3 text-[#E50914]" /> {alert.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer Simulation Action */}
        <div className="p-4 border-t border-[#1E1E2C] bg-[#101018] space-y-2">
          <button
            onClick={onTriggerRandomPriceDrop}
            className="w-full py-2.5 rounded-lg bg-[#181824] hover:bg-[#222234] border border-[#2B2B3E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Testar Queda de Preço (Simular Alerta)</span>
          </button>
          <span className="text-[10px] text-neutral-500 text-center block">
            Dispara um alerta toast imediato com cálculo de desvalorização e notificação.
          </span>
        </div>
      </div>
    </div>
  );
};
