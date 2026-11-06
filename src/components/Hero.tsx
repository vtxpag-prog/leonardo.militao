import React from 'react';
import { Shield, Award, MessageCircle, ArrowRight, Scale, CheckCircle2 } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F2EB] to-[#F1ECE1]">
      {/* Gentle warm background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E8DDD0]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Badges with earthy/terracotta tones */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center space-x-2 bg-[#EFE7DC] border border-[#DDD0BF] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#8C4E24] shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#A65E2E]" />
            <span>Atuação Exclusiva em Direito Público</span>
          </div>
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#E0D7C9] px-3.5 py-1.5 rounded-full text-xs text-[#5C4D44] shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#B87A38]" />
            <span>27+ Anos de Trajetória &bull; CNPJ 05.243.864/0001-58</span>
          </div>
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#E0D7C9] px-3.5 py-1.5 rounded-full text-xs text-[#5C4D44] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2E7D52]"></span>
            <span>Belo Horizonte &bull; Atendimento em Todo o Brasil</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-5 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A231F] tracking-tight leading-[1.18]">
            Defendemos o seu direito perante o Poder Público com a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B86F3B] via-[#9E5926] to-[#7D4118] italic font-serif">
              mesma garra
            </span>{' '}
            que defenderíamos o nosso.
          </h1>

          <p className="text-base sm:text-lg text-[#5A4D45] max-w-2xl mx-auto leading-relaxed">
            Quando o Estado nega o seu tratamento de saúde, prejudica a sua carreira como servidor público ou impõe arbitrariedades municipais, trazemos a tranquilidade e a segurança de quem conhece a máquina pública por dentro.
          </p>
        </div>

        {/* Dual CTAs with warm tones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <a
            href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent('Olá, Dr. Leonardo e Dra. Juliana! Gostaria de uma avaliação para o meu caso perante o Poder Público.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#2D6A4F] hover:bg-[#245640] text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#2D6A4F]/20 hover:shadow-xl hover:shadow-[#2D6A4F]/30 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar Diretamente pelo WhatsApp</span>
          </a>

          <a
            href="#formulario"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#FAF7F2] text-[#3D332D] border border-[#DDD3C4] hover:border-[#C4B49F] font-semibold text-base px-7 py-4 rounded-2xl shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Enviar dados do processo</span>
            <ArrowRight className="w-4 h-4 text-[#A86432]" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#736359]">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D52]" />
            <span>Atendimento Humanizado Sem Juridiquês</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D52]" />
            <span>Acompanhamento Pessoal dos Sócios</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D52]" />
            <span>Sigilo Profissional Garantido</span>
          </span>
        </div>
      </div>
    </section>
  );
};
