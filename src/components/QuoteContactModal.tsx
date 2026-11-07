import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  FileText
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { VEHICLE_DATABASE } from '../data/vehicles';

interface QuoteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle?: Vehicle | null;
}

export const QuoteContactModal: React.FC<QuoteContactModalProps> = ({
  isOpen,
  onClose,
  selectedVehicle,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleId, setVehicleId] = useState(selectedVehicle ? selectedVehicle.id : 'outro');
  const [interestType, setInterestType] = useState('compra-direta');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Informe seu nome completo';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Informe um e-mail válido';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Informe um telefone com DDD válido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const randomProtocol = `VX-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocol(randomProtocol);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0E0E14] border border-[#262638] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2C] bg-[#12121A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono-num">
              SOLICITAÇÃO DE COTAÇÃO & ATENDIMENTO
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#181824] hover:bg-[#222232] text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  Solicitação Enviada com Sucesso
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Nosso concierge técnico entrará em contato em até <strong className="text-white">2 horas úteis</strong> com a proposta documental e prazos alfandegários.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14141E] border border-[#242436] max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Protocolo Confidencial:</span>
                  <span className="text-[#E50914] font-mono-num font-bold">{protocol}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Titular:</span>
                  <span className="text-white font-medium">{name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Canal de Retorno:</span>
                  <span className="text-white font-mono-num">{phone}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Concluir & Voltar ao Catálogo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-neutral-300 text-xs leading-relaxed">
                Preencha os dados abaixo para receber especificações de importação, condições de custódia e valores atualizados com seguro internacional.
              </p>

              {/* Name field */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo Silveira"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
                {errors.name && <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    E-mail Corporativo ou Pessoal *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos@empresa.com.br"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Telefone / WhatsApp com DDD *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99876-5432"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Vehicle Selection & Modality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Veículo / Máquina de Interesse
                  </label>
                  <select
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-neutral-200 text-xs focus:outline-none transition-colors"
                  >
                    <option value="outro">Demanda Personalizada / Outro</option>
                    {VEHICLE_DATABASE.map((v) => (
                      <option key={v.id} value={v.id}>
                        [{v.categoryLabel}] {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Modalidade de Operação
                  </label>
                  <select
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-neutral-200 text-xs focus:outline-none transition-colors"
                  >
                    <option value="compra-direta">Compra Direta (Pronta Entrega)</option>
                    <option value="importacao">Importação Exclusiva sob Encomenda</option>
                    <option value="financiamento">Estruturação Financeira Internacional</option>
                    <option value="blindagem">Blindagem & Upgrades de Defesa</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Observações ou Requisitos Adicionais (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Especifique porto ou hangar de entrega, prazo desejado ou requisitos alfandegários..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0E] border border-[#232332] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Security Trust Note */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#12121A] border border-[#1E1E2A] text-[11px] text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>Tratamento de dados com sigilo bancário e conformidade LGPD / GDPR.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#E50914]/25 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmitir Solicitação de Cotação</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
