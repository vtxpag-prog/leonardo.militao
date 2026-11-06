import React, { useState } from 'react';
import { UserAccount } from '../../types/crm';
import { FileEdit, Shield, CheckCircle2, Lock, AlertCircle, Building2, Phone, MapPin, Newspaper } from 'lucide-react';
import { OFFICE_INFO } from '../../data/officeData';

interface CRMContentEditorProps {
  currentUser: UserAccount;
}

export const CRMContentEditor: React.FC<CRMContentEditorProps> = ({ currentUser }) => {
  const isMaster = currentUser.role === 'master_admin';

  // Manage editable content in localStorage
  const [phone, setPhone] = useState(() => localStorage.getItem('militao_phone') || OFFICE_INFO.phone);
  const [address, setAddress] = useState(() => localStorage.getItem('militao_address') || OFFICE_INFO.address.full);
  const [workingHours, setWorkingHours] = useState(() => localStorage.getItem('militao_hours') || OFFICE_INFO.workingHours);
  const [announcement, setAnnouncement] = useState(() => localStorage.getItem('militao_announcement') || 'Atendimento presencial em Belo Horizonte e teleatendimento nacional para causas em Tribunais Superiores.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('militao_phone', phone);
    localStorage.setItem('militao_address', address);
    localStorage.setItem('militao_hours', workingHours);
    localStorage.setItem('militao_announcement', announcement);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Permission banner */}
      <div className={`p-5 rounded-2xl border flex items-start space-x-3 text-xs leading-relaxed ${
        isMaster 
          ? 'bg-[#E1EFE7] border-[#BBDCCB] text-[#2D6A4F]' 
          : 'bg-[#FAF7F2] border-[#DDD0BF] text-[#5C4D44]'
      }`}>
        <Shield className="w-5 h-5 shrink-0 mt-0.5 text-[#8C4E24]" />
        <div>
          <p className="font-bold text-sm text-[#2A231F] pb-0.5">
            {isMaster ? 'Master Admin: Controle Total (100%)' : `Operador Logado: ${currentUser.name}`}
          </p>
          <p>
            {isMaster 
              ? 'Você possui permissões irrestritas sobre 100% dos recursos, configurações estruturais, usuários e banco de dados do escritório.'
              : 'Você possui permissão para editar artigos, notas informativas, telefones de plantão e dados de contato. Por protocolo de integridade, a estrutura do código e os serviços essenciais permanecem protegidos contra alterações ou remoção.'
            }
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-[#EBF7F0] border border-[#A6DDBB] rounded-2xl p-4 text-xs text-[#2D6A4F] flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
          <span>Informações de contato e aviso salvas com sucesso no sistema!</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-9 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-4">
          <div className="flex items-center space-x-2 text-[#2A231F] font-serif font-bold text-lg">
            <FileEdit className="w-5 h-5 text-[#8C4E24]" />
            <span>Editar Artigos, Notas e Informações do Escritório</span>
          </div>
          <span className="text-xs text-[#8C4E24] bg-[#EFE7DC] px-2.5 py-1 rounded-full font-medium">
            Permitido a Todos os Usuários
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-5 text-xs">
          {/* Telefone / WhatsApp */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#3D332D] flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Telefone / WhatsApp Principal</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
            />
          </div>

          {/* Horário de Atendimento */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#3D332D] flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Horário de Atendimento</span>
            </label>
            <input
              type="text"
              value={workingHours}
              onChange={e => setWorkingHours(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
            />
          </div>

          {/* Endereço */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-semibold text-[#3D332D] flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Endereço Completo da Sede</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
            />
          </div>

          {/* Artigo / Nota Informativa de Destaque */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-semibold text-[#3D332D] flex items-center space-x-1.5">
              <Newspaper className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Nota Informativa & Artigo em Destaque no Atendimento</span>
            </label>
            <textarea
              rows={4}
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
            />
          </div>
        </div>

        {/* Protection disclaimer for non-master */}
        {!isMaster && (
          <div className="bg-[#FAF7F2] border border-[#E0D5C5] rounded-xl p-3.5 text-xs text-[#705F55] flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#8C4E24] shrink-0" />
            <span>
              Controle de Integridade: Estrutura central e disponibilidade permanente do site são mantidas sob custódia do Master Admin.
            </span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="py-3 px-6 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
          >
            Salvar Modificações de Conteúdo
          </button>
        </div>
      </form>
    </div>
  );
};
