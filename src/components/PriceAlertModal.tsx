import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Mail, 
  TrendingDown, 
  CheckCircle, 
  Sparkles,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { PriceAlert } from '../types/notification';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSubscribe: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'status'>) => void;
  onSimulatePriceDrop: (vehicle: Vehicle, dropPercent: number) => void;
  currency: 'BRL' | 'USD';
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onSubscribe,
  onSimulatePriceDrop,
  currency,
}) => {
  if (!isOpen || !vehicle) return null;

  const currentPrice = vehicle.priceBRL;
  const [selectedDiscount, setSelectedDiscount] = useState<number>(5); // 5% default
  const [customPrice, setCustomPrice] = useState<number>(Math.round(currentPrice * 0.95));
  const [email, setEmail] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyToast, setNotifyToast] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleDiscountSelect = (pct: number) => {
    setSelectedDiscount(pct);
    setCustomPrice(Math.round(currentPrice * (1 - pct / 100)));
  };

  const handleCustomPriceChange = (val: number) => {
    setCustomPrice(val);
    const calculatedDiscount = Math.round(((currentPrice - val) / currentPrice) * 100);
    setSelectedDiscount(calculatedDiscount > 0 ? calculatedDiscount : 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail && (!email.trim() || !email.includes('@'))) {
      setEmailError('Informe um e-mail válido para receber os alertas.');
      return;
    }
    if (!notifyEmail && !notifyToast) {
      setEmailError('Selecione pelo menos um canal de notificação (Email ou Toast).');
      return;
    }

    setEmailError('');
    onSubscribe({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.image,
      currentPrice: currentPrice,
      targetPrice: customPrice,
      email: email.trim(),
      notifyEmail,
      notifyToast,
    });

    setIsSuccess(true);
  };

  const handleTestNow = () => {
    onSimulatePriceDrop(vehicle, selectedDiscount > 0 ? selectedDiscount : 5);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#0E0E14] border border-[#272738] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2C] bg-[#12121A]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#E50914]" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono-num">
              RADAR DE PREÇO · {vehicle.brand}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#181824] hover:bg-[#222232] text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-1.5">
                  Alerta Ativado com Sucesso!
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  Você será notificado assim que o valor de <strong className="text-white">{vehicle.name}</strong> atingir ou ficar abaixo de <span className="text-emerald-400 font-mono-num font-bold">{formatPrice(customPrice)}</span>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#13131C] border border-[#222230] text-left text-xs space-y-1.5 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Canal Toast:</span>
                  <span className="text-white font-medium">{notifyToast ? 'Ativo no Navegador' : 'Desativado'}</span>
                </div>
                {notifyEmail && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">E-mail:</span>
                    <span className="text-white font-mono-num truncate max-w-[170px]">{email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-400">Desconto Alvo:</span>
                  <span className="text-emerald-400 font-mono-num font-bold">-{selectedDiscount}%</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Vehicle Compact Header */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#121218] border border-[#1E1E28]">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{vehicle.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono-num">
                    Preço Atual: <span className="text-white font-bold">{formatPrice(currentPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Target Discount Buttons */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Notificar quando o preço reduzir em:
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[5, 10, 15].map((pct) => (
                    <button
                      type="button"
                      key={pct}
                      onClick={() => handleDiscountSelect(pct)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold font-mono-num transition-all border ${
                        selectedDiscount === pct
                          ? 'bg-[#E50914] border-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                          : 'bg-[#15151F] border-[#252535] text-neutral-300 hover:text-white hover:border-[#38384d]'
                      }`}
                    >
                      -{pct}% ({formatPrice(Math.round(currentPrice * (1 - pct / 100)))})
                    </button>
                  ))}
                </div>

                {/* Target Price slider / input */}
                <div className="p-3.5 rounded-lg bg-[#0A0A0E] border border-[#20202D]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Preço Alvo Desejado:</span>
                    <span className="text-emerald-400 font-mono-num font-bold">
                      {formatPrice(customPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(currentPrice * 0.70)}
                    max={currentPrice}
                    step={Math.round(currentPrice * 0.01)}
                    value={customPrice}
                    onChange={(e) => handleCustomPriceChange(Number(e.target.value))}
                    className="w-full accent-[#E50914] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono-num text-neutral-500 mt-1">
                    <span>-30%</span>
                    <span>Preço Atual</span>
                  </div>
                </div>
              </div>

              {/* Notification Channels */}
              <div className="space-y-3">
                <span className="block text-xs font-medium text-neutral-300">
                  Canais de Notificação:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Toast option */}
                  <label className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    notifyToast ? 'bg-[#151522] border-[#E50914]/60 text-white' : 'bg-[#101016] border-[#20202B] text-neutral-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={notifyToast}
                      onChange={(e) => setNotifyToast(e.target.checked)}
                      className="mt-0.5 accent-[#E50914]"
                    />
                    <div>
                      <span className="text-xs font-semibold block">Alerta Toast em Tela</span>
                      <span className="text-[10px] text-neutral-400">Aviso imediato no navegador</span>
                    </div>
                  </label>

                  {/* Email option */}
                  <label className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    notifyEmail ? 'bg-[#151522] border-[#E50914]/60 text-white' : 'bg-[#101016] border-[#20202B] text-neutral-400'
                  }`}>
                    <input
                      type="checkbox"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="mt-0.5 accent-[#E50914]"
                    />
                    <div>
                      <span className="text-xs font-semibold block">Alerta por E-mail</span>
                      <span className="text-[10px] text-neutral-400">Receba a cotação no correio</span>
                    </div>
                  </label>
                </div>

                {/* Email input (if email channel active) */}
                {notifyEmail && (
                  <div className="pt-1">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu melhor e-mail para receber alertas..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}
                {emailError && <span className="text-[11px] text-red-400 block">{emailError}</span>}
              </div>

              {/* Action buttons: Submit & Quick Simulation */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#E50914]/25 flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Ativar Alerta de Redução de Preço</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestNow}
                  className="w-full py-2.5 rounded-lg bg-[#151520] hover:bg-[#1D1D2C] border border-[#2A2A3C] text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  title="Simula uma queda de preço de mercado agora e dispara o alerta toast"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Simular Queda de Preço Agora (Teste Imediato)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
