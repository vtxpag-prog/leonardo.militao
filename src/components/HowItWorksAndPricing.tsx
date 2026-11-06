import React from 'react';
import { CheckCircle2, ShieldCheck, CreditCard, HelpCircle, FileCheck, Search, Flame, DollarSign } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

export const HowItWorksAndPricing: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Primeiro Contato & Relato",
      desc: "Você entra em contato pelo formulário ou WhatsApp e resume o que aconteceu. Não cobramos nada por essa triagem inicial."
    },
    {
      num: "02",
      title: "Escuta Qualificada & Análise",
      desc: "Dr. Leonardo e Dra. Juliana examinam minuciosamente a legislação, atos administrativos e a jurisprudência recente dos Tribunais Superiores."
    },
    {
      num: "03",
      title: "Diagnóstico Honesto & Riscos",
      desc: "Apresentamos com total franqueza a viabilidade da causa, os caminhos cabíveis, os riscos reais e a proposta detalhada de honorários."
    },
    {
      num: "04",
      title: "Contrato Claro & Ação Combativa",
      desc: "Firmado o compromisso, iniciamos a luta com elaboração artesanal de peças, pedidos de liminar ou recursos estratégicos cabíveis."
    },
    {
      num: "05",
      title: "Prestação de Contas Permanente",
      desc: "Você recebe atualizações constantes diretamente no WhatsApp, compreendendo cada despacho e decisão sem jargões jurídicos."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E24] bg-[#EBE1D3] px-3.5 py-1.5 rounded-full border border-[#D9CBB7] shadow-xs">
            Passo a Passo & Honorários
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Como Funciona Nosso Atendimento & Política de Valores
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Transparência absoluta desde o primeiro instante. A segurança que você busca começa na previsibilidade e na clareza dos acordos.
          </p>
        </div>

        {/* 5-Step Process with Harmonic Motion on Hover */}
        <div className="grid md:grid-cols-5 gap-5">
          {steps.map((st, i) => (
            <div
              key={i}
              className="bg-white border border-[#E2D9CC] rounded-3xl p-6 space-y-4 relative shadow-xs hover:shadow-xl hover:shadow-[#42332B]/10 hover:border-[#C4A480] transform hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <span className="text-2xl font-serif font-black text-[#A86432] group-hover:scale-110 inline-block transition-transform duration-300">
                  {st.num}
                </span>
                <h3 className="font-serif font-bold text-[#2A231F] text-base leading-snug group-hover:text-[#8C4E24] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-[#5C4E46] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-[#2D6A4F] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Etapa transparente</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Investment Transparency Card with Harmonic Soft Glow */}
        <div className="bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-11 shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFE7DC] pb-6">
            <div>
              <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider bg-[#E8F4EC] px-3 py-1 rounded-full border border-[#C5E4D1]">
                Sem Letras Miúdas
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A231F] mt-2">
                Como Cobramos e o Que Está Incluso
              </h3>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-[#736359]">Modelos de contratação</p>
              <p className="text-base font-serif font-bold text-[#8C4E24]">Fixo por Fase &bull; Êxito &bull; Misto</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm">
            {/* O que está incluso */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E0D2] space-y-3 hover:border-[#D1C3B2] transition-colors">
              <div className="flex items-center space-x-2 text-[#2D6A4F] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>O Que Está Incluso</span>
              </div>
              <ul className="text-[#55473F] space-y-2 list-disc list-inside leading-relaxed">
                <li>Estudo aprofundado da legislação e jurisprudência dos Tribunais Superiores;</li>
                <li>Redação individualizada de todas as peças e recursos cabíveis;</li>
                <li>Sustentações orais e despachos com juízes e relatores quando necessário;</li>
                <li>Acompanhamento contínuo dos prazos e avisos diretos no WhatsApp.</li>
              </ul>
            </div>

            {/* O que não está incluso */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E0D2] space-y-3 hover:border-[#D1C3B2] transition-colors">
              <div className="flex items-center space-x-2 text-[#8C4E24] font-bold">
                <HelpCircle className="w-4 h-4" />
                <span>Custas Judiciais & Perícias</span>
              </div>
              <p className="text-[#55473F] leading-relaxed">
                Custas oficiais do Poder Judiciário, certidões cartorárias e honorários periciais não integram os honorários advocatícios e são sempre calculados e informados com antecedência.
              </p>
              <p className="text-[11px] text-[#7A6A61] pt-1">
                Quando cabível, pleiteamos o benefício da <strong>Justiça Gratuita</strong> para cidadãos e servidores hipossuficientes.
              </p>
            </div>

            {/* Condições de pagamento */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E0D2] space-y-3 hover:border-[#D1C3B2] transition-colors">
              <div className="flex items-center space-x-2 text-[#8C5E3A] font-bold">
                <CreditCard className="w-4 h-4" />
                <span>Formas de Pagamento Acessíveis</span>
              </div>
              <p className="text-[#55473F] leading-relaxed">
                Acreditamos que a justiça não pode ser um privilégio. Oferecemos condições personalizadas:
              </p>
              <div className="space-y-1.5 text-xs text-[#55473F]">
                <p className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]"></span>
                  <span>Pagamentos via <strong>PIX</strong> com condições especiais;</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]"></span>
                  <span>Parcelamento via cartão de crédito ou boleto bancário;</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]"></span>
                  <span>Honorários de êxito em causas indenizatórias ou de retroativos.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
