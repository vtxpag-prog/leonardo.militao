import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, FileText, AlertCircle, Phone, Lock } from 'lucide-react';
import { Lead } from '../types/crm';
import { OFFICE_INFO } from '../data/officeData';

interface ContactFormProps {
  preselectedArea?: string;
  onLeadAdded: (lead: Lead) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedArea, onLeadAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    whatsapp: '',
    practiceArea: preselectedArea || 'Direito Administrativo & Servidores',
    processNumber: '',
    message: ''
  });

  useEffect(() => {
    if (preselectedArea) {
      setFormData(prev => ({ ...prev, practiceArea: preselectedArea }));
    }
  }, [preselectedArea]);

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // CPF formatter helper
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setFormData(prev => ({ ...prev, cpf: v }));
  };

  // WhatsApp formatter helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 9) v = `${v.slice(0, 10)}-${v.slice(10)}`;
    setFormData(prev => ({ ...prev, whatsapp: v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Mandatory validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.cpf.trim() || !formData.whatsapp.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, CPF e Telefone/WhatsApp).');
      return;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      cpf: formData.cpf.trim(),
      whatsapp: formData.whatsapp.trim(),
      practiceArea: formData.practiceArea,
      processNumber: formData.processNumber.trim() || undefined,
      message: formData.message.trim() || 'Contato enviado via formulário do site oficial.',
      stage: 'novo_lead',
      createdAt: new Date().toISOString()
    };

    onLeadAdded(newLead);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      cpf: '',
      whatsapp: '',
      practiceArea: 'Direito Administrativo & Servidores',
      processNumber: '',
      message: ''
    });
  };

  return (
    <section id="formulario" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C4E24] bg-[#EBE1D3] px-3.5 py-1.5 rounded-full border border-[#D9CBB7] shadow-xs">
            Formulário Seguro de Contato
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A231F]">
            Conte o seu caso para o Dr. Leonardo e a Dra. Juliana
          </h2>
          <p className="text-[#5C4D44] text-sm sm:text-base leading-relaxed">
            Seus dados são confidenciais e protegidos pelo sigilo profissional da advocacia e pela LGPD. Nossa equipe entrará em contato em até 24 horas úteis com atenção e acolhimento.
          </p>
        </div>

        {/* Success Card */}
        {submitted ? (
          <div className="bg-[#F0F7F3] border-2 border-[#A3D1B9] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm animate-fade-in">
            <div className="w-16 h-16 bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 rounded-full flex items-center justify-center mx-auto text-[#2D6A4F]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2A231F]">Mensagem Recebida com Sucesso!</h3>
            <p className="text-sm text-[#55473F] max-w-lg mx-auto leading-relaxed">
              Seu relato foi salvo com total segurança e registrado na coluna <strong>&ldquo;Novo Lead&rdquo;</strong> do CRM.
              Nossa equipe já está analisando as informações preliminares.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#705F55] hover:text-[#2A231F] underline py-2 px-4 transition-colors"
              >
                Enviar outro caso ou atualizar informações
              </button>
              <a
                href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent('Olá! Acabei de enviar meus dados pelo formulário do site e gostaria de agilizar o atendimento.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#2D6A4F] hover:bg-[#245640] text-white font-semibold text-xs py-3 px-5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Agilizar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* Form Card with Harmonic Hover */
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-12 shadow-sm hover:shadow-xl hover:border-[#C4A480] transition-all duration-300 ease-out space-y-7"
          >
            {errorMsg && (
              <div className="bg-[#FAF2F2] border border-[#E2B6B6] rounded-2xl p-4 text-xs text-[#8C3A3A] flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#A84A4A]" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Nome Completo - Obrigatório */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                  <span>Nome completo</span>
                  <span className="text-[#8C4E24] font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>

              {/* E-mail - Obrigatório */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                  <span>E-mail</span>
                  <span className="text-[#8C4E24] font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>

              {/* CPF - Obrigatório */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                  <span>CPF</span>
                  <span className="text-[#8C4E24] font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>

              {/* Telefone / WhatsApp - Obrigatório */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                  <span>Telefone / WhatsApp</span>
                  <span className="text-[#8C4E24] font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(31) 90000-0000"
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>

              {/* Área de Interesse */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D332D]">
                  Área do Direito Público
                </label>
                <select
                  value={formData.practiceArea}
                  onChange={e => setFormData({ ...formData, practiceArea: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                >
                  {OFFICE_INFO.practiceAreas.map(area => (
                    <option key={area.id} value={area.title}>
                      {area.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Número do Processo - Opcional */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#3D332D] flex items-center justify-between">
                  <span>Número do processo judicial</span>
                  <span className="text-[11px] text-[#7A6C63] font-normal">Opcional (se já em andamento)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 5002134-88.2024.8.13.0024"
                  value={formData.processNumber}
                  onChange={e => setFormData({ ...formData, processNumber: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>

              {/* Relato Breve */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#3D332D]">
                  Resumo do que aconteceu com você perante o Poder Público
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva resumidamente a negativa sofrida, ato administrativo ou direito lesado..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
              </div>
            </div>

            {/* Mandatory Button with Harmonic Motion */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EFE7DC]">
              <div className="flex items-center space-x-2 text-xs text-[#705F55]">
                <Lock className="w-3.5 h-3.5 text-[#8C4E24] shrink-0" />
                <span>Dados enviados com sigilo e criptografia diretamente ao CRM da banca.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold text-sm px-8 py-3.5 rounded-2xl shadow-md shadow-[#B86F3B]/20 hover:shadow-xl hover:shadow-[#B86F3B]/30 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Enviar para Avaliação dos Sócios</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
