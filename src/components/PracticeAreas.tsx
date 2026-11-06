import React from 'react';
import { Scale, ShieldAlert, Landmark, HeartPulse, Award, ArrowUpRight, MessageCircle } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

interface PracticeAreasProps {
  onSelectAreaForContact: (areaTitle: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ onSelectAreaForContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#A86432]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#2D6A4F]" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#8C5E3A]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#B85D43]" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-[#6B5282]" />;
    }
  };

  return (
    <section id="areas" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E24] bg-[#EBE1D3] px-3.5 py-1.5 rounded-full border border-[#D9CBB7] shadow-xs">
            Áreas de Atuação Exclusivas
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Especialização profunda no Direito Público. Não fazemos de tudo: fazemos o que dominamos.
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Se a sua causa envolve o Estado, o Município ou a União, atuamos com rigor técnico e combatividade em todas as instâncias.
          </p>
        </div>

        {/* Practice Grid with Harmonic Movement */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {OFFICE_INFO.practiceAreas.map((area, idx) => (
            <div
              key={area.id}
              className={`bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-xl hover:shadow-[#42332B]/10 hover:border-[#C4A480] transform hover:-translate-y-2 transition-all duration-300 ease-out group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border-[#D4C3B2]' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#F6F1E9] border border-[#E0D5C5] flex items-center justify-center group-hover:scale-108 group-hover:bg-[#EFE7DC] transition-all duration-300 shadow-xs">
                    {getIcon(area.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#A8988B] group-hover:text-[#8C4E24] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#2A231F] group-hover:text-[#8C4E24] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs font-medium text-[#8C5E3A]">
                    {area.shortDesc}
                  </p>
                  <p className="text-xs text-[#5C4E46] leading-relaxed pt-1">
                    {area.fullDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7DC] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectAreaForContact(area.title)}
                  className="text-xs font-semibold text-[#8C4E24] hover:text-[#6E3B18] flex items-center space-x-1 group/btn"
                >
                  <span>Enviar processo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de consultar sobre a área: ${area.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#52443C] hover:text-[#2D6A4F] flex items-center space-x-1.5 bg-[#F6F1E9] hover:bg-[#EBF3EF] px-3 py-1.5 rounded-xl border border-[#E0D5C5] hover:border-[#B2D8C5] transition-all"
                >
                  <MessageCircle className="w-3 h-3 text-[#2D6A4F]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
