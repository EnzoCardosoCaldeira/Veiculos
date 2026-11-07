import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Calculator, 
  Globe2, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { INDUSTRY_BRANDS, MARKET_STATS } from '../data/vehicles';
import { VehicleCategory } from '../types/vehicle';

interface MarketInsightsProps {
  onSelectCategory: (cat: VehicleCategory) => void;
  onOpenQuote: () => void;
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({
  onSelectCategory,
  onOpenQuote,
}) => {
  const [selectedCalcCategory, setSelectedCalcCategory] = useState<VehicleCategory>('carros');
  const [investmentValue, setInvestmentValue] = useState<number>(3000000);

  // Calculate dynamic projected metrics
  const getProjections = () => {
    switch (selectedCalcCategory) {
      case 'carros':
        return {
          annualReturn: investmentValue * 0.148,
          maintenanceRate: '1,5% ao ano',
          retentionRate: '98,2% em 3 anos',
          liquidity: 'Alta (Mercado Global de Colecionadores)',
        };
      case 'motos':
        return {
          annualReturn: investmentValue * 0.096,
          maintenanceRate: '2,2% ao ano',
          retentionRate: '92,4% em 3 anos',
          liquidity: 'Média-Alta (Pistas e Leilões Esportivos)',
        };
      case 'caminhoes':
        return {
          annualReturn: investmentValue * 0.082,
          maintenanceRate: '3,8% ao ano (Operacional)',
          retentionRate: '88,0% em 3 anos',
          liquidity: 'Imediata (Logística & Frotas Rodoviárias)',
        };
      case 'barcos':
        return {
          annualReturn: investmentValue * 0.112,
          maintenanceRate: '4,5% ao ano (Marina & Tripulação)',
          retentionRate: '91,5% em 3 anos (Moeda Forte USD)',
          liquidity: 'Média (Charter e Venda Internacional)',
        };
      case 'tanques':
        return {
          annualReturn: investmentValue * 0.185,
          maintenanceRate: 'Contrato de Ciclo de Vida Governamental',
          retentionRate: '104% (Reserva Estratégica)',
          liquidity: 'Controlada (Autorização de Exportação FMS)',
        };
    }
  };

  const projections = getProjections();

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="mercado" className="py-20 bg-[#0A0A0E] border-b border-[#1A1A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-num font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <span>PANORAMA DO SETOR</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-400">INTELIGÊNCIA AUTOMOTIVA & DEFESA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              MERCADO GLOBAL & FABRICANTES
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Mapeamento contínuo de oscilações de preço, liquidez em moeda forte e parcerias diretas com montadoras e estaleiros consagrados.
          </p>
        </div>

        {/* Global Market Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-[#111116] border border-[#21212B]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono-num text-neutral-400">Transações 2025/2026</span>
              <BarChart3 className="w-4 h-4 text-[#E50914]" />
            </div>
            <div className="text-2xl font-black text-white font-mono-num mb-1">
              {MARKET_STATS.globalTransactionsValue}
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18% vs período anterior</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#111116] border border-[#21212B]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono-num text-neutral-400">Valorização Média</span>
              <TrendingUp className="w-4 h-4 text-[#E50914]" />
            </div>
            <div className="text-2xl font-black text-white font-mono-num mb-1">
              {MARKET_STATS.averageAppreciation}
            </div>
            <div className="text-xs text-neutral-400">
              Índice em veículos homologados
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#111116] border border-[#21212B]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono-num text-neutral-400">Presença Global</span>
              <Globe2 className="w-4 h-4 text-[#E50914]" />
            </div>
            <div className="text-2xl font-black text-white font-mono-num mb-1">
              {MARKET_STATS.countriesServed}
            </div>
            <div className="text-xs text-neutral-400">
              Desembaraço alfandegário direto
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#111116] border border-[#21212B]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono-num text-neutral-400">Auditoria Técnica</span>
              <ShieldCheck className="w-4 h-4 text-[#E50914]" />
            </div>
            <div className="text-2xl font-black text-white font-mono-num mb-1">
              {MARKET_STATS.inspectionPoints}
            </div>
            <div className="text-xs text-neutral-400">
              Certificação mecânica e documental
            </div>
          </div>
        </div>

        {/* Brands Ecosystem Showcase */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E50914]" />
              <span>Fabricantes Homologados no Portfólio</span>
            </h3>
            <span className="text-xs font-mono-num text-neutral-400 uppercase">
              10 Líderes Mundiais Integrados
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {INDUSTRY_BRANDS.map((brand, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-[#111116] border border-[#20202B] hover:border-[#E50914]/50 transition-colors group cursor-default"
              >
                <div className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors mb-1">
                  {brand.name}
                </div>
                <div className="text-[11px] text-neutral-400 mb-2 truncate">
                  {brand.segment}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono-num text-neutral-500 pt-2 border-t border-[#1C1C24]">
                  <span>{brand.origin}</span>
                  <span>Fund. {brand.founded}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Asset Valuation Calculator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111117] border border-[#242433] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono-num font-semibold text-[#E50914] uppercase">
                <Calculator className="w-4 h-4" />
                <span>SIMULADOR DE VALORIZAÇÃO & ATIVOS</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                Projeção de Retorno & Preservação de Capital
              </h3>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Calcule a estimativa de valorização patrimonial e taxas de retenção histórica com base no segmento selecionado.
              </p>

              {/* Segment Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'carros', label: 'Carros Esportivos' },
                  { id: 'motos', label: 'Superbikes' },
                  { id: 'caminhoes', label: 'Caminhões' },
                  { id: 'barcos', label: 'Iates Náuticos' },
                  { id: 'tanques', label: 'Blindados Militares' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCalcCategory(item.id as VehicleCategory)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCalcCategory === item.id
                        ? 'bg-[#E50914] text-white shadow-sm shadow-[#E50914]/30'
                        : 'bg-[#181822] text-neutral-300 hover:text-white border border-[#282836]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Slider for Investment Value */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Valor Estimado de Aquisição:</span>
                  <span className="text-white font-mono-num font-bold">{formatBRL(investmentValue)}</span>
                </div>
                <input
                  type="range"
                  min={300000}
                  max={25000000}
                  step={200000}
                  value={investmentValue}
                  onChange={(e) => setInvestmentValue(Number(e.target.value))}
                  className="w-full accent-[#E50914] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-num text-neutral-500">
                  <span>R$ 300.000</span>
                  <span>R$ 25.000.000</span>
                </div>
              </div>
            </div>

            {/* Right Projection Metrics Card */}
            <div className="lg:col-span-6 bg-[#0B0B0F] p-6 rounded-xl border border-[#21212E] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C26]">
                <span className="text-xs uppercase font-mono-num text-neutral-400">Projeção de Ganho de Capital (12 Meses)</span>
                <span className="text-emerald-400 font-mono-num font-bold text-lg">
                  +{formatBRL(projections.annualReturn)}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C26]">
                <span className="text-xs uppercase font-mono-num text-neutral-400">Retenção de Valor (3 Anos)</span>
                <span className="text-white font-mono-num font-semibold text-sm">
                  {projections.retentionRate}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C26]">
                <span className="text-xs uppercase font-mono-num text-neutral-400">Custo Anual de Manutenção Estimado</span>
                <span className="text-neutral-300 font-mono-num text-xs">
                  {projections.maintenanceRate}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2">
                <span className="text-xs uppercase font-mono-num text-neutral-400">Índice de Liquidez</span>
                <span className="text-neutral-200 text-xs font-medium">
                  {projections.liquidity}
                </span>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-lg bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>Solicitar Análise de Viabilidade Patrimonial</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
