import React from 'react';
import { Award, GraduationCap, CheckCircle2, XCircle, HeartHandshake, Shield, Sparkles } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

export const AboutUs: React.FC = () => {
  return (
    <section id="quem-somos" className="py-24 bg-[#F5F0E6] border-y border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E24] bg-[#EBE1D3] px-3.5 py-1.5 rounded-full border border-[#D9CBB7] shadow-xs">
            Quem Somos &bull; Nossa Essência
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Uma sociedade construída sobre ética inegociável, profundidade jurídica e respeito ao cliente.
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Não somos uma fábrica de processos. Somos uma banca artesanal de Direito Público onde cada caso é tratado como uma missão de justiça individualizada, com acolhimento e clareza.
          </p>
        </div>

        {/* Lawyer Cards with Harmonious Movement on Hover */}
        <div className="grid lg:grid-cols-2 gap-8">
          {OFFICE_INFO.lawyers.map((lawyer, index) => {
            const isPhotoOnRight = lawyer.name.toLowerCase().includes('juliana') || index === 1;

            return (
              <div
                key={index}
                className="bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:shadow-[#42332B]/10 hover:border-[#C4A480] transform hover:-translate-y-2 transition-all duration-300 ease-out group"
              >
                <div className="space-y-6">
                  <div className={`flex flex-col ${isPhotoOnRight ? 'sm:flex-row-reverse justify-between' : 'sm:flex-row'} items-center sm:items-start gap-6`}>
                    <div className="relative shrink-0 overflow-hidden rounded-2xl shadow-md border-2 border-[#D9CBB7]">
                      <img
                        src={lawyer.photo}
                        alt={lawyer.name}
                        className="w-32 h-36 object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#DDD1C0] text-xs font-semibold text-[#8C4E24]">
                        {lawyer.title}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#2A231F] group-hover:text-[#8C4E24] transition-colors duration-200">
                        {lawyer.name}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#2D6A4F]">{lawyer.oab}</p>
                      <p className="text-xs text-[#8C5E3A] font-medium">{lawyer.primaryArea}</p>
                    </div>
                  </div>

                <p className="text-[#55473F] text-sm leading-relaxed">
                  {lawyer.bio}
                </p>

                {/* Academic credentials */}
                <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E8E0D2] space-y-2.5">
                  <div className="flex items-center space-x-2 text-[#8C4E24] text-xs font-semibold uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    <span>Formação Acadêmica & Diferenciais</span>
                  </div>
                  <ul className="text-xs text-[#52443C] space-y-1.5 list-disc list-inside">
                    {lawyer.education.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quote */}
              <div className="border-t border-[#EAE2D5] pt-4 flex items-center space-x-3 text-xs text-[#705F55] italic">
                <HeartHandshake className="w-4 h-4 text-[#A86432] shrink-0" />
                <span>&ldquo;{lawyer.quote}&rdquo;</span>
              </div>
            </div>
            );
          })}
        </div>

        {/* Mandatory Comparison Table: Escritório Grande x Nosso Escritório with Harmonious Motion */}
        <div className="bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E24]">Transparência Total</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A231F]">
              Por que escolher um escritório dedicado em vez de uma grande banca?
            </h3>
            <p className="text-xs sm:text-sm text-[#66574E]">
              Veja a diferença prática entre ter seu processo tratado como número e ser defendido diretamente pelos sócios.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD1] text-xs uppercase tracking-wider text-[#736359]">
                  <th className="py-4 px-4 font-semibold">Critério de Atendimento</th>
                  <th className="py-4 px-4 font-semibold text-[#8C3A3A] bg-[#FAF2F2] rounded-t-xl">
                    Grandes Bancas de Massa
                  </th>
                  <th className="py-4 px-4 font-semibold text-[#2D6A4F] bg-[#F1F7F4] rounded-t-xl">
                    Leonardo Militão Advogados
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC] text-xs sm:text-sm">
                {OFFICE_INFO.comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2] transition-colors duration-200 group">
                    <td className="py-4 px-4 font-semibold text-[#2A231F] whitespace-nowrap">
                      {row.item}
                    </td>
                    <td className="py-4 px-4 text-[#6E5757] bg-[#FAF2F2]/60">
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-[#A84A4A] shrink-0 mt-0.5" />
                        <span>{row.bigFirm}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#2E483B] font-medium bg-[#F1F7F4]/60">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                        <span>{row.militao}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
