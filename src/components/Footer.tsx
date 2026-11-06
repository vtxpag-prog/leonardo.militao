import React from 'react';
import { Scale, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

interface FooterProps {
  onOpenCRM?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#231C18] border-t border-[#362C26] text-[#B8ACA2] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8C4E24]/20 border border-[#8C4E24]/40 flex items-center justify-center text-[#D49B6A] font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-sm text-white">Leonardo Militão</span>
            </div>
            <p className="text-[#A3968B] text-xs leading-relaxed">
              Sociedade de advogados inscrita na OAB/MG. Defesa intransigente da dignidade e dos direitos do cidadão contra os abusos do Poder Público.
            </p>
            <div className="text-[11px] text-[#8C7E74] space-y-1">
              <p>CNPJ: <span className="text-[#D9CEBF] font-mono">{OFFICE_INFO.cnpj}</span></p>
              <p>Atividade regular desde 30/07/2002</p>
            </div>
          </div>

          {/* Col 2: Áreas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Áreas de Atuação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#areas" className="hover:text-[#D49B6A] transition-colors">Direito Constitucional</a></li>
              <li><a href="#areas" className="hover:text-[#D49B6A] transition-colors">Direito Administrativo & Servidores</a></li>
              <li><a href="#areas" className="hover:text-[#D49B6A] transition-colors">Direito Municipal & Contratos</a></li>
              <li><a href="#areas" className="hover:text-[#D49B6A] transition-colors">Direito da Saúde Pública</a></li>
              <li><a href="#areas" className="hover:text-[#D49B6A] transition-colors">Tribunais Superiores (STJ e STF)</a></li>
            </ul>
          </div>

          {/* Col 3: Endereço & Mapa */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Endereço & Sede</h4>
            <p className="text-[#D9CEBF] leading-relaxed">
              {OFFICE_INFO.address.street}, {OFFICE_INFO.address.number}<br />
              {OFFICE_INFO.address.neighborhood} — {OFFICE_INFO.address.city}/{OFFICE_INFO.address.state}<br />
              CEP: {OFFICE_INFO.address.cep}
            </p>
            <a
              href={OFFICE_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#D49B6A] hover:text-[#E8BD96] font-semibold"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver no Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 4: Atendimento & Horário */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Atendimento</h4>
            <p className="text-[#D9CEBF] flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#7BE495]" />
              <span>(31) 99925-7444</span>
            </p>
            <p className="text-[#D9CEBF] flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#98C1D9]" />
              <span>{OFFICE_INFO.email}</span>
            </p>
            <p className="text-[#A3968B] flex items-center space-x-2 text-[11px] pt-1">
              <Clock className="w-3.5 h-3.5 text-[#D49B6A]" />
              <span>Segunda a Sexta: 09h às 18h</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#362C26] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7E74]">
          <p>
            &copy; {new Date().getFullYear()} Leonardo Militão Advogados Associados. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <span>Dr. Leonardo Militão &bull; OAB/MG</span>
            <span>Dra. Juliana Lemos Costa &bull; OAB/MG nº 118.956</span>
            <span>Provimento 205/2021 CFOAB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
