import React from 'react';
import { Scale, Phone, ShieldCheck, Lock } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

interface NavbarProps {
  onOpenCRM: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCRM }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#inicio" className="flex items-center space-x-3 group shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B86F3B] to-[#8C4E24] p-0.5 shadow-md shadow-[#8C4E24]/15 shrink-0">
            <div className="w-full h-full bg-[#FAF8F5] rounded-[14px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#8C4E24] group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg text-[#2A231F] tracking-tight leading-tight">
              Leonardo Militão
            </span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EFE7DC] text-[#8C4E24] border border-[#DDD0BF] font-sans font-semibold">
                Advogados Associados
              </span>
              <span className="text-[10px] text-[#736359] font-sans hidden xl:inline">
                &bull; Direito Público
              </span>
            </div>
          </div>
        </a>

        {/* Navigation Links with ample spacing */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-semibold uppercase tracking-wider text-[#52443C] ml-6">
          <a href="#quem-somos" className="hover:text-[#8C4E24] transition-colors whitespace-nowrap">Quem Somos</a>
          <a href="#areas" className="hover:text-[#8C4E24] transition-colors whitespace-nowrap">Áreas de Atuação</a>
          <a href="#simulador" className="hover:text-[#8C4E24] transition-colors whitespace-nowrap">Atendimento Bot</a>
          <a href="#como-funciona" className="hover:text-[#8C4E24] transition-colors whitespace-nowrap">Como Funciona & Valores</a>
          <a href="#localizacao" className="hover:text-[#8C4E24] transition-colors whitespace-nowrap">Onde Estamos</a>
        </nav>

        {/* Right CTA with Harmonic Motion */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCRM}
            className="flex items-center space-x-1.5 text-xs text-[#5C4E46] hover:text-[#8C4E24] py-2 px-3 rounded-xl border border-[#DDD3C4] hover:border-[#8C4E24] hover:bg-white transition-all duration-300 shadow-2xs hover:shadow-sm transform hover:-translate-y-0.5 active:scale-95"
            title="Acesso exclusivo ao CRM e Gestão Jurídica"
          >
            <Lock className="w-3.5 h-3.5 text-[#8C4E24]" />
            <span className="font-semibold text-[11px] sm:text-xs uppercase tracking-wide">Área do Advogado</span>
          </button>

          <a
            href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar sobre o meu caso perante o Poder Público.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-[#2D6A4F] hover:bg-[#245640] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
