import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, Globe2 } from 'lucide-react';
import { OFFICE_INFO } from '../data/officeData';

export const LocationMap: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-[#F5EFE6] border-y border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#EBE1D3] border border-[#D9CBB7] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#8C4E24] shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sede Física & Atendimento Nacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Onde Estamos
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Localizado no tradicional e nobre Bairro Serra em Belo Horizonte, com estrutura acolhedora para atendimento presencial e tecnologia de ponta para teleatendimento em todo o Brasil.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Modality Card with Harmonic Hover */}
          <div className="lg:col-span-5 bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-xl hover:shadow-[#42332B]/10 hover:border-[#C4A480] transform hover:-translate-y-1.5 transition-all duration-300 ease-out">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#8C4E24]">Endereço Oficial</span>
                <h3 className="text-xl font-serif font-bold text-[#2A231F]">Leonardo Militão Advogados Associados</h3>
                <p className="text-sm text-[#5C4E46] flex items-start space-x-2 pt-1 leading-relaxed">
                  <MapPin className="w-5 h-5 text-[#8C4E24] shrink-0 mt-0.5" />
                  <span>
                    Rua dos Dominicanos, 165 — Sala 401<br />
                    Bairro Serra — Belo Horizonte / MG<br />
                    CEP: 30210-480
                  </span>
                </p>
              </div>

              {/* Attendance modalities */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E0D2] space-y-1">
                  <span className="text-[#2D6A4F] text-xs font-bold uppercase flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span>
                    <span>Presencial</span>
                  </span>
                  <p className="text-xs text-[#6B5A51]">Sala 401, Serra/BH com tranquilidade, privacidade e fácil acesso.</p>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E0D2] space-y-1">
                  <span className="text-[#8C5E3A] text-xs font-bold uppercase flex items-center space-x-1.5">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Online Brasil</span>
                  </span>
                  <p className="text-xs text-[#6B5A51]">Audiências e reuniões por vídeo em qualquer estado da federação.</p>
                </div>
              </div>

              {/* Contacts and Hours */}
              <div className="space-y-3 pt-2 text-xs text-[#5C4E46] border-t border-[#EFE7DC]">
                <p className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <span>(31) 99925-7444 (WhatsApp Oficial)</span>
                </p>
                <p className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-[#8C4E24] shrink-0" />
                  <span>{OFFICE_INFO.email}</span>
                </p>
                <p className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#A86432] shrink-0" />
                  <span>{OFFICE_INFO.workingHours}</span>
                </p>
              </div>
            </div>

            {/* Direct Route Button */}
            <a
              href={OFFICE_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold text-sm py-4 px-5 rounded-2xl shadow-md shadow-[#B86F3B]/20 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Clique no mapa para traçar a rota até nós</span>
            </a>
          </div>

          {/* Interactive Google Map Box with Harmonious Border */}
          <div className="lg:col-span-7 bg-white border border-[#E2D9CC] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C4A480] transition-all duration-300 relative min-h-[420px] flex flex-col group">
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl border border-[#DDD3C4] text-xs text-[#2A231F] font-semibold flex items-center space-x-2 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Rua dos Dominicanos, 165 - Serra, BH/MG</span>
            </div>

            <iframe
              title="Localização Leonardo Militão Advogados"
              src="https://maps.google.com/maps?q=Rua+dos+Dominicanos,+165,+Serra,+Belo+Horizonte+-+MG,+30210-480&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0 transition-opacity"
              loading="lazy"
              allowFullScreen
            />

            {/* Click-to-Route Overlay Bar */}
            <a
              href={OFFICE_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FAF7F2] border-t border-[#E8E0D2] p-4 text-center text-xs text-[#55473F] hover:text-[#2A231F] flex items-center justify-center space-x-2 group/route transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#8C4E24] group-hover/route:scale-110 transition-transform" />
              <span className="font-semibold text-[#8C4E24]">Clique no mapa para traçar a rota até nós</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
