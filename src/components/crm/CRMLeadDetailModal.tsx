import React, { useState } from 'react';
import { Lead, LeadStage, LeadTimelineCategory, LeadTimelineEntry, UserAccount, FollowUpReminder, ReminderPriority } from '../../types/crm';
import { 
  X, Calendar, Clock, Phone, Mail, FileText, User, 
  MessageSquare, Plus, Trash2, CheckCircle2, AlertCircle, 
  Send, ExternalLink, ShieldCheck, Scale, Edit3, Tag, Bell,
  CheckSquare, Square, AlertTriangle
} from 'lucide-react';

interface CRMLeadDetailModalProps {
  lead: Lead;
  currentUser: UserAccount;
  reminders?: FollowUpReminder[];
  onAddReminder?: (reminder: FollowUpReminder) => void;
  onToggleReminderStatus?: (reminderId: string) => void;
  onDeleteReminder?: (reminderId: string) => void;
  onClose: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
  onUpdateLeadStage: (leadId: string, newStage: LeadStage) => void;
}

const STAGE_LABELS: Record<LeadStage, { label: string; color: string; bg: string }> = {
  novo_lead: { label: 'Novo Lead', color: 'text-sky-800', bg: 'bg-sky-50 border-sky-200' },
  em_atendimento: { label: 'Em Atendimento', color: 'text-amber-800', bg: 'bg-amber-50 border-amber-200' },
  agendado: { label: 'Agendado', color: 'text-emerald-800', bg: 'bg-emerald-50 border-emerald-200' },
  processo_andamento: { label: 'Em Andamento', color: 'text-purple-800', bg: 'bg-purple-50 border-purple-200' },
  concluido: { label: 'Concluído', color: 'text-orange-800', bg: 'bg-orange-50 border-orange-200' },
  arquivado: { label: 'Arquivado', color: 'text-stone-700', bg: 'bg-stone-100 border-stone-300' }
};

const CATEGORY_CONFIG: Record<LeadTimelineCategory, { label: string; color: string; bg: string; border: string }> = {
  whatsapp: { label: 'WhatsApp / Mensagem', color: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ligacao: { label: 'Ligação Telefônica', color: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-200' },
  reuniao: { label: 'Reunião / Atendimento', color: 'text-purple-800', bg: 'bg-purple-50', border: 'border-purple-200' },
  documentos: { label: 'Análise de Documentos', color: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200' },
  processual: { label: 'Andamento Processual', color: 'text-indigo-800', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  observacao: { label: 'Observação Geral', color: 'text-stone-800', bg: 'bg-stone-100', border: 'border-stone-200' }
};

export const CRMLeadDetailModal: React.FC<CRMLeadDetailModalProps> = ({
  lead,
  currentUser,
  reminders = [],
  onAddReminder,
  onToggleReminderStatus,
  onDeleteReminder,
  onClose,
  onUpdateLead,
  onUpdateLeadStage
}) => {
  // Tabs for right column
  const [rightColumnTab, setRightColumnTab] = useState<'timeline' | 'reminders'>('timeline');

  // New observation state
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState<LeadTimelineCategory>('whatsapp');

  // New reminder state
  const [remTitle, setRemTitle] = useState('');
  const [remPriority, setRemPriority] = useState<ReminderPriority>('alta');
  const [remDescription, setRemDescription] = useState('');
  
  // Custom date/time picker (defaults to current date-time in local ISO string)
  const getNowFormatted = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  const [noteDateTime, setNoteDateTime] = useState<string>(getNowFormatted());
  const [remDueDateTime, setRemDueDateTime] = useState<string>(() => {
    const d = new Date();
    d.setHours(d.getHours() + 2);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  });
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Editable process number
  const [isEditingProcess, setIsEditingProcess] = useState(false);
  const [tempProcessNumber, setTempProcessNumber] = useState(lead.processNumber || '');

  const timelineEntries = lead.timeline || [];

  // Sort newest first
  const sortedTimeline = [...timelineEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/\D/g, '');
    if (!clean.startsWith('55') && clean.length <= 11) {
      clean = '55' + clean;
    }
    return clean;
  };

  const formatTimelineDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newEntry: LeadTimelineEntry = {
      id: `obs-${Date.now()}`,
      date: noteDateTime ? new Date(noteDateTime).toISOString() : new Date().toISOString(),
      author: currentUser.name || 'Advogado Responsável',
      category: noteCategory,
      text: noteText.trim()
    };

    const updatedTimeline = [newEntry, ...(lead.timeline || [])];
    const updatedLead: Lead = {
      ...lead,
      timeline: updatedTimeline
    };

    onUpdateLead(updatedLead);
    setNoteText('');
    setNoteDateTime(getNowFormatted());
    setFeedbackMsg('Observação adicionada com sucesso à linha do tempo!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleDeleteObservation = (entryId: string) => {
    if (!window.confirm('Deseja realmente remover esta anotação da linha do tempo?')) {
      return;
    }
    const updatedTimeline = (lead.timeline || []).filter(item => item.id !== entryId);
    onUpdateLead({
      ...lead,
      timeline: updatedTimeline
    });
  };

  const handleSaveProcessNumber = () => {
    onUpdateLead({
      ...lead,
      processNumber: tempProcessNumber.trim() || undefined
    });
    setIsEditingProcess(false);
    setFeedbackMsg('Número do processo atualizado com sucesso!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const leadReminders = (reminders || []).filter(r => r.leadId === lead.id);
  const pendingRemindersCount = leadReminders.filter(r => r.status === 'pending').length;

  const handleScheduleLeadReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle.trim() || !onAddReminder) return;

    const newReminder: FollowUpReminder = {
      id: `rem-${Date.now()}`,
      leadId: lead.id,
      leadName: lead.name,
      title: remTitle.trim(),
      description: remDescription.trim() || undefined,
      dueDateTime: new Date(remDueDateTime).toISOString(),
      assignedTo: currentUser.name,
      createdBy: currentUser.name,
      createdAt: new Date().toISOString(),
      status: 'pending',
      priority: remPriority
    };

    onAddReminder(newReminder);

    // Auto-document in the timeline with date & time
    const timelineEntry: LeadTimelineEntry = {
      id: `obs-rem-${Date.now()}`,
      date: new Date().toISOString(),
      author: currentUser.name,
      category: 'observacao',
      text: `🔔 Lembrete agendado: "${remTitle.trim()}" para ${formatTimelineDate(newReminder.dueDateTime)} (${remPriority.toUpperCase()} prioridade).`
    };

    onUpdateLead({
      ...lead,
      timeline: [timelineEntry, ...(lead.timeline || [])]
    });

    setRemTitle('');
    setRemDescription('');
    setFeedbackMsg('Lembrete de acompanhamento agendado e registrado na linha do tempo!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#DDD3C4] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-scale-in">
        
        {/* MODAL HEADER */}
        <div className="bg-white border-b border-[#E5DDD0] px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F4ECE3] border border-[#DDD1C0] flex items-center justify-center text-[#8C4E24] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h2 className="font-serif font-bold text-lg text-[#2A231F]">
                  {lead.name}
                </h2>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${STAGE_LABELS[lead.stage]?.bg || 'bg-stone-50 border-stone-200'} ${STAGE_LABELS[lead.stage]?.color || 'text-stone-700'}`}>
                  {STAGE_LABELS[lead.stage]?.label || lead.stage}
                </span>
              </div>
              <p className="text-xs text-[#736359] flex items-center space-x-2 mt-0.5">
                <span>Área: <strong className="text-[#8C4E24]">{lead.practiceArea}</strong></span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-[#A8988B]" />
                  <span>Cadastrado em {formatTimelineDate(lead.createdAt)}</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Stage Selector */}
            <div className="hidden sm:flex items-center space-x-1.5 text-xs">
              <span className="text-[#736359] font-medium">Mudar etapa:</span>
              <select
                value={lead.stage}
                onChange={e => onUpdateLeadStage(lead.id, e.target.value as LeadStage)}
                className="bg-[#FAF7F2] border border-[#DDD3C4] text-xs font-semibold text-[#2A231F] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#8C4E24]"
              >
                <option value="novo_lead">🔵 Novo Lead</option>
                <option value="em_atendimento">🟡 Em Atendimento</option>
                <option value="agendado">🟢 Agendado</option>
                <option value="processo_andamento">🟣 Em Andamento</option>
                <option value="concluido">🟠 Concluído</option>
                <option value="arquivado">⚫ Arquivado</option>
              </select>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE7DC] border border-[#DDD3C4] text-[#5C4D44] hover:text-[#2A231F] flex items-center justify-center transition-all"
              title="Fechar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMsg && (
          <div className="bg-[#E1EFE7] border-b border-[#BBDCCB] px-6 py-2 text-xs text-[#2D6A4F] flex items-center space-x-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* MODAL BODY (2 COLUMNS) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: CLIENT DETAILS & ACTIONS (4 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Contact Card */}
            <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#5C4D44] border-b border-[#F0EBE1] pb-2">
                Dados de Contato & Identificação
              </h3>

              {/* Direct WhatsApp CTA */}
              <div>
                <a
                  href={`https://wa.me/${getCleanPhone(lead.whatsapp)}?text=${encodeURIComponent(`Olá, ${lead.name}! Aqui é da Leonardo Militão Advogados Associados referente ao seu caso de ${lead.practiceArea}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#2D6A4F] hover:bg-[#245640] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Conversar pelo WhatsApp ({lead.whatsapp})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              <div className="space-y-2.5 text-xs text-[#3D332D]">
                <div className="flex items-center justify-between py-1 border-b border-[#F5EFE6]">
                  <span className="text-[#736359] flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#8C4E24]" />
                    <span>Nome:</span>
                  </span>
                  <span className="font-semibold text-right">{lead.name}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F5EFE6]">
                  <span className="text-[#736359] flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8C4E24]" />
                    <span>E-mail:</span>
                  </span>
                  <a href={`mailto:${lead.email}`} className="font-semibold text-[#8C4E24] hover:underline text-right truncate max-w-[200px]">
                    {lead.email}
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F5EFE6]">
                  <span className="text-[#736359] flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8C4E24]" />
                    <span>CPF:</span>
                  </span>
                  <span className="font-mono font-medium">{lead.cpf || 'Não informado'}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#F5EFE6]">
                  <span className="text-[#736359] flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#8C4E24]" />
                    <span>Área:</span>
                  </span>
                  <span className="font-medium text-right text-[#8C4E24]">{lead.practiceArea}</span>
                </div>
              </div>

              {/* Judicial Process Number (Editable) */}
              <div className="pt-2 border-t border-[#F0EBE1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5C4D44] flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#3B6E8C]" />
                    <span>Nº do Processo Judicial:</span>
                  </span>
                  {!isEditingProcess && (
                    <button
                      onClick={() => setIsEditingProcess(true)}
                      className="text-[11px] text-[#8C4E24] hover:underline flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>
                  )}
                </div>

                {isEditingProcess ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Ex: 5002134-88.2024.8.13.0024"
                      value={tempProcessNumber}
                      onChange={e => setTempProcessNumber(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 text-xs font-mono text-[#2A231F]"
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSaveProcessNumber}
                        className="bg-[#2D6A4F] hover:bg-[#245640] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setTempProcessNumber(lead.processNumber || '');
                          setIsEditingProcess(false);
                        }}
                        className="bg-[#FAF7F2] text-[#736359] text-[11px] px-3 py-1.5 rounded-lg border border-[#DDD3C4]"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-mono text-xs text-[#2A231F] bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl px-3 py-2">
                    {lead.processNumber || <span className="text-[#A8988B] italic">Sem número de processo vinculado</span>}
                  </p>
                )}
              </div>

              {/* Initial message / Relato */}
              {lead.message && (
                <div className="pt-2 border-t border-[#F0EBE1] space-y-1.5">
                  <span className="text-xs font-bold text-[#5C4D44]">
                    Relato Inicial da Causa:
                  </span>
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDD0] text-xs text-[#4A3D36] leading-relaxed">
                    {lead.message}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Stage Selector */}
            <div className="sm:hidden bg-white border border-[#E2D9CC] rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-[#5C4D44] block">Mudar Etapa do Lead:</span>
              <select
                value={lead.stage}
                onChange={e => onUpdateLeadStage(lead.id, e.target.value as LeadStage)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] text-xs font-semibold text-[#2A231F] rounded-xl px-3 py-2"
              >
                <option value="novo_lead">🔵 Novo Lead</option>
                <option value="em_atendimento">🟡 Em Atendimento</option>
                <option value="agendado">🟢 Agendado</option>
                <option value="processo_andamento">🟣 Em Andamento</option>
                <option value="concluido">🟠 Concluído</option>
                <option value="arquivado">⚫ Arquivado</option>
              </select>
            </div>
          </div>

          {/* RIGHT COLUMN: TIMELINE OR REMINDERS (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col">
            
            {/* Right Column Tab Switcher */}
            <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-[#DDD3C4] text-xs font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => setRightColumnTab('timeline')}
                className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl transition-all ${
                  rightColumnTab === 'timeline'
                    ? 'bg-[#8C4E24] text-white shadow-xs'
                    : 'text-[#6B5A51] hover:text-[#2A231F] hover:bg-[#FAF7F2]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Linha do Tempo ({sortedTimeline.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setRightColumnTab('reminders')}
                className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl transition-all ${
                  rightColumnTab === 'reminders'
                    ? 'bg-[#8C4E24] text-white shadow-xs'
                    : 'text-[#6B5A51] hover:text-[#2A231F] hover:bg-[#FAF7F2]'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Lembretes de Acompanhamento</span>
                {pendingRemindersCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    rightColumnTab === 'reminders'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FAF2F2] text-[#8C3A3A] border border-[#E2B6B6]'
                  }`}>
                    {pendingRemindersCount}
                  </span>
                )}
              </button>
            </div>

            {/* TAB 1: TIMELINE */}
            {rightColumnTab === 'timeline' && (
              <>
                {/* New Observation Input Box */}
                <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#8C4E24] flex items-center space-x-1.5">
                      <Plus className="w-4 h-4 text-[#8C4E24]" />
                      <span>Nova Observação com Data</span>
                    </h3>
                    <span className="text-[10px] text-[#A8988B]">
                      Por: <strong className="text-[#3D332D]">{currentUser.name}</strong>
                    </span>
                  </div>

                  <form onSubmit={handleAddObservation} className="space-y-3 text-xs">
                    {/* Category & Date Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                          Tipo de Atendimento:
                        </label>
                        <select
                          value={noteCategory}
                          onChange={e => setNoteCategory(e.target.value as LeadTimelineCategory)}
                          className="w-full bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 text-xs text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
                        >
                          <option value="whatsapp">🟢 WhatsApp / Mensagem</option>
                          <option value="ligacao">🔵 Ligação Telefônica</option>
                          <option value="reuniao">🟣 Reunião / Atendimento</option>
                          <option value="documentos">🟠 Análise de Documentos</option>
                          <option value="processual">⚖️ Andamento Processual</option>
                          <option value="observacao">📝 Observação Geral</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                          Data & Hora da Ocorrência:
                        </label>
                        <input
                          type="datetime-local"
                          value={noteDateTime}
                          onChange={e => setNoteDateTime(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 text-xs text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
                        />
                      </div>
                    </div>

                    {/* Observation Textarea */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                        Descreva os passos do atendimento ou observações da causa:
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Ex: Em contato telefônico às 14h, o cliente enviou o comprovante de posse e o edital do concurso. Definida a estratégia de mandado de segurança com pedido liminar..."
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl p-3 text-xs text-[#2A231F] placeholder-[#A8988B] focus:outline-none focus:border-[#8C4E24]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center space-x-2 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Salvar Observação na Linha do Tempo</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* TIMELINE LIST */}
                <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 sm:p-5 flex-1 shadow-xs flex flex-col space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#8C4E24]" />
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#2A231F]">
                        Linha do Tempo de Atendimento
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-[#FAF7F2] border border-[#DDD3C4] px-2.5 py-0.5 rounded-full text-[#5C4D44]">
                      {sortedTimeline.length} {sortedTimeline.length === 1 ? 'registro' : 'registros'}
                    </span>
                  </div>

                  {sortedTimeline.length === 0 ? (
                    <div className="p-8 text-center text-[#9E9086] text-xs space-y-2 border border-dashed border-[#DDD3C4] rounded-2xl">
                      <Clock className="w-8 h-8 text-[#C4B5A5] mx-auto" />
                      <p className="font-medium text-[#736359]">Nenhuma observação registrada ainda.</p>
                      <p className="text-[11px]">Utilize o campo acima para registrar o primeiro contato, ligação ou evolução do processo com data documentada.</p>
                    </div>
                  ) : (
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5DDD0]">
                      {sortedTimeline.map((item) => {
                        const cat = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.observacao;

                        return (
                          <div key={item.id} className="relative group">
                            {/* Timeline Bullet Point */}
                            <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-[#8C4E24] ring-4 ring-white border border-[#8C4E24]" />

                            {/* Card Content */}
                            <div className="bg-[#FAF8F5] border border-[#E5DDD0] hover:border-[#C4A480] rounded-2xl p-3.5 space-y-2 transition-all">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                  {/* Category Badge */}
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${cat.bg} ${cat.color} ${cat.border}`}>
                                    {cat.label}
                                  </span>

                                  {/* Date Time Badge */}
                                  <span className="text-[11px] font-mono text-[#736359] flex items-center space-x-1">
                                    <Clock className="w-3 h-3 text-[#A8988B]" />
                                    <span>{formatTimelineDate(item.date)}</span>
                                  </span>
                                </div>

                                {/* Delete Note Button */}
                                <button
                                  onClick={() => handleDeleteObservation(item.id)}
                                  title="Remover esta anotação"
                                  className="text-[#B8ACA2] hover:text-[#8C3A3A] transition p-1 opacity-70 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Note text */}
                              <p className="text-xs text-[#2A231F] leading-relaxed whitespace-pre-line font-sans">
                                {item.text}
                              </p>

                              {/* Author signature */}
                              <div className="pt-1.5 border-t border-[#EFE7DC] flex items-center justify-between text-[10px] text-[#8C7E74]">
                                <span>Registrado por: <strong className="text-[#5C4D44]">{item.author}</strong></span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB 2: REMINDERS FOR THIS LEAD */}
            {rightColumnTab === 'reminders' && (
              <>
                {/* Schedule Reminder Form */}
                <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#8C4E24] flex items-center space-x-1.5">
                      <Bell className="w-4 h-4 text-[#8C4E24]" />
                      <span>Agendar Lembrete para {lead.name}</span>
                    </h3>
                    <span className="text-[10px] text-[#736359]">
                      Responsável: <strong>{currentUser.name}</strong>
                    </span>
                  </div>

                  <form onSubmit={handleScheduleLeadReminder} className="space-y-3 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                        Título do Lembrete / Tarefa *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Ligar para conferir se recebeu o requerimento administrativo..."
                        value={remTitle}
                        onChange={e => setRemTitle(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                          Data & Hora do Lembrete *
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={remDueDateTime}
                          onChange={e => setRemDueDateTime(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                          Prioridade
                        </label>
                        <select
                          value={remPriority}
                          onChange={e => setRemPriority(e.target.value as ReminderPriority)}
                          className="w-full bg-[#FAF7F2] border border-[#DDD3C4] rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                        >
                          <option value="alta">🔴 Alta Prioridade (Urgente)</option>
                          <option value="media">🟡 Média Prioridade</option>
                          <option value="baixa">🔵 Baixa Prioridade (Rotina)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#5C4D44] block mb-1">
                        Instruções ou Detalhes Adicionais (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Conferir despacho no PJe antes da ligação..."
                        value={remDescription}
                        onChange={e => setRemDescription(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center space-x-2 bg-[#8C4E24] hover:bg-[#733E1C] text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-sm transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agendar e Documentar na Linha do Tempo</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Reminders List for this Lead */}
                <div className="bg-white border border-[#E2D9CC] rounded-2xl p-4 sm:p-5 flex-1 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#2A231F] flex items-center space-x-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#8C4E24]" />
                      <span>Lembretes deste Cliente</span>
                    </h3>
                    <span className="text-[11px] font-mono font-bold bg-[#FAF7F2] border border-[#DDD3C4] px-2 py-0.5 rounded-full text-[#5C4D44]">
                      {leadReminders.length} {leadReminders.length === 1 ? 'lembrete' : 'lembretes'}
                    </span>
                  </div>

                  {leadReminders.length === 0 ? (
                    <div className="p-8 text-center text-[#9E9086] text-xs border border-dashed border-[#DDD3C4] rounded-2xl space-y-1">
                      <Bell className="w-7 h-7 text-[#C4B5A5] mx-auto opacity-70" />
                      <p className="font-medium text-[#736359]">Nenhum lembrete agendado para este cliente.</p>
                      <p className="text-[11px]">Agende prazos, retornos por telefone ou reuniões no formulário acima.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#F0EBE1] border border-[#E5DDD0] rounded-xl overflow-hidden bg-white">
                      {leadReminders.map(rem => {
                        const isCompleted = rem.status === 'completed';
                        const isOverdue = !isCompleted && new Date(rem.dueDateTime).getTime() < new Date().getTime();

                        return (
                          <div
                            key={rem.id}
                            className={`p-3 transition-colors flex items-start justify-between gap-2.5 ${
                              isCompleted
                                ? 'bg-[#FAF8F5]/60 opacity-60'
                                : isOverdue
                                ? 'bg-[#FFF9F9]'
                                : 'hover:bg-[#FAF8F5]'
                            }`}
                          >
                            <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                              <button
                                type="button"
                                onClick={() => onToggleReminderStatus && onToggleReminderStatus(rem.id)}
                                className="mt-0.5 text-[#8C4E24] hover:scale-110 transition-transform shrink-0"
                              >
                                {isCompleted ? (
                                  <CheckSquare className="w-4 h-4 text-[#2D6A4F]" />
                                ) : (
                                  <Square className="w-4 h-4 text-[#C4A480] hover:text-[#8C4E24]" />
                                )}
                              </button>

                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                  <span className={`text-xs font-bold leading-snug ${
                                    isCompleted ? 'line-through text-[#736359]' : 'text-[#2A231F]'
                                  }`}>
                                    {rem.title}
                                  </span>

                                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                    rem.priority === 'alta'
                                      ? 'bg-[#FAF2F2] text-[#8C3A3A] border-[#E2B6B6]'
                                      : rem.priority === 'media'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : 'bg-sky-50 text-sky-800 border-sky-200'
                                  }`}>
                                    {rem.priority === 'alta' ? 'Alta' : rem.priority === 'media' ? 'Média' : 'Baixa'}
                                  </span>

                                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded flex items-center space-x-1 ${
                                    isOverdue ? 'bg-[#8C3A3A] text-white font-bold' : 'bg-[#FAF7F2] text-[#8C4E24] border border-[#DDD3C4]'
                                  }`}>
                                    <Clock className="w-2.5 h-2.5" />
                                    <span>{formatTimelineDate(rem.dueDateTime)}</span>
                                  </span>
                                </div>

                                {rem.description && (
                                  <p className="text-[11px] text-[#5C4D44] leading-relaxed">
                                    {rem.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onDeleteReminder && onDeleteReminder(rem.id)}
                              title="Excluir lembrete"
                              className="text-[#B8ACA2] hover:text-[#8C3A3A] p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-[#FAF7F2] border-t border-[#E5DDD0] px-6 py-3 flex items-center justify-between text-xs text-[#736359] shrink-0">
          <span>Leonardo Militão Advogados Associados &bull; Gestão Jurídica & Timeline</span>
          <button
            onClick={onClose}
            className="bg-white hover:bg-[#F3ECE2] text-[#2A231F] border border-[#DDD3C4] px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};
