import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  PlaneTakeoff, 
  Satellite, 
  Compass, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface DifferentialsSectionProps {
  onOpenQuote: () => void;
}

export const DifferentialsSection: React.FC<DifferentialsSectionProps> = ({
  onOpenQuote,
}) => {
  const differentials = [
    {
      icon: <Cpu className="w-6 h-6 text-[#E50914]" />,
      title: 'Engenharia Extrema & Telemetria',
      description: 'Veículos equipados com monocoque em fibra de carbono aeroespacial, telemetria em tempo real e motores calibrados nos mais rígidos padrões de pista e estrada.',
      proof: 'Mais de 1.600 cv homologados com análise de telemetria computadorizada.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#E50914]" />,
      title: 'Certificação & Blindagem Homologada',
      description: 'Auditoria balística e naval em conformidade com as normas STANAG da OTAN, federações internacionais de automobilismo e registros marítimos Lloyd\'s e RINA.',
      proof: 'Certificação individual com laudo de 180 pontos de verificação técnica.',
    },
    {
      icon: <PlaneTakeoff className="w-6 h-6 text-[#E50914]" />,
      title: 'Logística Internacional Dedicada',
      description: 'Estrutura logística própria com frete aéreo em contêineres pressurizados, desembaraço aduaneiro expresso e entrega segura em hangares privativos ou marinas.',
      proof: 'Entregas operadas em 38 países com seguro de carga porta a porta.',
    },
    {
      icon: <Satellite className="w-6 h-6 text-[#E50914]" />,
      title: 'Rastreamento Criptografado 24/7',
      description: 'Monitoramento global de frota e máquinas com redundância de satélite, alertas perimétricos e suporte técnico de emergência ininterrupto.',
      proof: 'Cobertura operacional em rotas marítimas, rodoviárias e off-road.',
    },
    {
      icon: <Compass className="w-6 h-6 text-[#E50914]" />,
      title: 'Inteligência Patrimonial & Moeda Forte',
      description: 'Orientação técnica para aquisição de máquinas e hipercarros como reserva de valor internacional com histórico de valorização consolidado.',
      proof: 'Índice médio de valorização de +14,2% a.a. nos últimos 5 anos.',
    },
  ];

  return (
    <section className="py-20 bg-[#08080A] border-b border-[#1A1A24] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-num font-semibold uppercase tracking-wider text-[#E50914] mb-2">
            <span>DIFERENCIAIS EXCLUSIVOS</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span className="text-neutral-400">PADRÃO VORTEX DYNAMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            POR QUE SOMOS A REFERÊNCIA EM MÁQUINAS EXTREMAS
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Unimos o rigor da engenharia mecânica de alta performance com a precisão dos trâmites internacionais de exportação, blindagem e custódia patrimonial.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#0E0E14] border border-[#20202C] hover:border-[#E50914]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#161622] border border-[#282838] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#E50914] transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C1C26] flex items-center gap-2 text-xs font-medium text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                <span>{item.proof}</span>
              </div>
            </div>
          ))}

          {/* Call to Action Box in the grid */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#161622] to-[#0E0E14] border border-[#E50914]/40 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono-num text-[#E50914] font-bold tracking-wider block mb-2">
                Atendimento Executivo
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Demanda sob Medida para Colecionadores & Frotas
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                Possui um pedido específico de embarcação customizada, lote de caminhões ou veículo blindado especial?
              </p>
            </div>

            <button
              onClick={onOpenQuote}
              className="w-full py-3 rounded-lg bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/20"
            >
              <span>Falar com Concierge Técnico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
