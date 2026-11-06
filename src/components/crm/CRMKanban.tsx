import React, { useState } from 'react';
import { Lead, LeadStage, UserAccount, FollowUpReminder } from '../../types/crm';
import { 
  Phone, MessageSquare, FileText, Calendar, ArrowRight, Trash2, 
  Plus, Search, Filter, CheckCircle2, ChevronRight, User, ExternalLink,
  Clock, Maximize2, ShieldCheck, Bell
} from 'lucide-react';
import { OFFICE_INFO } from '../../data/officeData';
import { CRMLeadDetailModal } from './CRMLeadDetailModal';

interface CRMKanbanProps {
  leads: Lead[];
  currentUser: UserAccount;
  reminders?: FollowUpReminder[];
  onAddReminder?: (reminder: FollowUpReminder) => void;
  onToggleReminderStatus?: (reminderId: string) => void;
  onDeleteReminder?: (reminderId: string) => void;
  onUpdateLead: (updatedLead: Lead) => void;
  onUpdateLeadStage: (leadId: string, newStage: LeadStage) => void;
  onDeleteLead: (leadId: string) => void;
  onAddLead: (lead: Lead) => void;
  externalSelectedLeadId?: string | null;
  onClearExternalSelectedLeadId?: () => void;
}

export const CRMKanban: React.FC<CRMKanbanProps> = ({
  leads,
  currentUser,
  reminders = [],
  onAddReminder,
  onToggleReminderStatus,
  onDeleteReminder,
  onUpdateLead,
  onUpdateLeadStage,
  onDeleteLead,
  onAddLead,
  externalSelectedLeadId,
  onClearExternalSelectedLeadId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('Todas');
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [internalSelectedLeadId, setInternalSelectedLeadId] = useState<string | null>(null);

  const activeSelectedLeadId = externalSelectedLeadId || internalSelectedLeadId;
  const selectedLead = leads.find(l => l.id === activeSelectedLeadId) || null;

  const handleCloseDetail = () => {
    setInternalSelectedLeadId(null);
    if (onClearExternalSelectedLeadId) {
      onClearExternalSelectedLeadId();
    }
  };

  // New lead form in modal
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    cpf: '',
    whatsapp: '',
    practiceArea: 'Direito Administrativo & Servidores',
    processNumber: '',
    message: ''
  });

  const columns: { stage: LeadStage; title: string; color: string; badgeBg: string; border: string }[] = [
    {
      stage: 'novo_lead',
      title: '🔵 Novo Lead',
      color: 'text-sky-700',
      badgeBg: 'bg-sky-50',
      border: 'border-sky-200'
    },
    {
      stage: 'em_atendimento',
      title: '🟡 Em Atendimento',
      color: 'text-amber-800',
      badgeBg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      stage: 'agendado',
      title: '🟢 Agendado',
      color: 'text-emerald-800',
      badgeBg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      stage: 'processo_andamento',
      title: '🟣 Em Andamento',
      color: 'text-purple-800',
      badgeBg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      stage: 'concluido',
      title: '🟠 Concluído',
      color: 'text-orange-800',
      badgeBg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    {
      stage: 'arquivado',
      title: '⚫ Arquivado',
      color: 'text-stone-700',
      badgeBg: 'bg-stone-100',
      border: 'border-stone-300'
    }
  ];

  // Filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      (lead.processNumber && lead.processNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesArea = filterArea === 'Todas' || lead.practiceArea === filterArea;
    return matchesSearch && matchesArea;
  });

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedLeadId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: LeadStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (leadId) {
      onUpdateLeadStage(leadId, targetStage);
    }
    setDraggedLeadId(null);
  };

  const handleCreateNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.whatsapp) return;

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      email: newLeadForm.email || 'contato@cliente.com',
      cpf: newLeadForm.cpf || '000.000.000-00',
      whatsapp: newLeadForm.whatsapp,
      practiceArea: newLeadForm.practiceArea,
      processNumber: newLeadForm.processNumber || undefined,
      message: newLeadForm.message || 'Cadastrado manualmente no CRM',
      stage: 'novo_lead',
      createdAt: new Date().toISOString()
    };

    onAddLead(lead);
    setShowNewLeadModal(false);
    setNewLeadForm({
      name: '',
      email: '',
      cpf: '',
      whatsapp: '',
      practiceArea: 'Direito Administrativo & Servidores',
      processNumber: '',
      message: ''
    });
  };

  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/\D/g, '');
    if (!clean.startsWith('55') && clean.length <= 11) {
      clean = '55' + clean;
    }
    return clean;
  };

  return (
    <div className="space-y-6">
      {/* Search, Filter, and Add Bar */}
      <div className="bg-white border border-[#E2D9CC] p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-1 items-center space-x-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, WhatsApp ou nº processo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl pl-9 pr-3 py-2 text-xs text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24]"
            />
          </div>

          {/* Area Filter */}
          <div className="flex items-center space-x-1.5 text-xs text-[#6B5A51]">
            <Filter className="w-3.5 h-3.5 text-[#8C4E24] shrink-0" />
            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-2.5 py-2 text-xs text-[#2A231F] focus:outline-none focus:border-[#8C4E24]"
            >
              <option value="Todas">Todas as Áreas</option>
              {OFFICE_INFO.practiceAreas.map(a => (
                <option key={a.id} value={a.title}>{a.title}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="inline-flex items-center space-x-2 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all w-full md:w-auto justify-center active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Lead</span>
        </button>
      </div>

      {/* Kanban Board Horizontal Scroll with Harmonic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {columns.map(col => {
          const colLeads = filteredLeads.filter(l => l.stage === col.stage);

          return (
            <div
              key={col.stage}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, col.stage)}
              className="bg-[#F8F5EE] border border-[#E5DDD0] rounded-3xl p-3.5 flex flex-col min-h-[540px] shadow-xs transition"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD0]">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold ${col.color}`}>{col.title}</span>
                </div>
                <span className="text-[11px] font-mono font-bold bg-white border border-[#DDD3C4] px-2 py-0.5 rounded-full text-[#5C4D44]">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-0.5">
                {colLeads.map(lead => {
                  const timelineCount = (lead.timeline || []).length;
                  const leadPendingReminders = reminders.filter(r => r.leadId === lead.id && r.status === 'pending');

                  return (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={e => handleDragStart(e, lead.id)}
                      onClick={() => setInternalSelectedLeadId(lead.id)}
                      className="bg-white border border-[#E2D9CC] hover:border-[#8C4E24] rounded-2xl p-3.5 space-y-2.5 shadow-xs hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer group relative"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-bold text-[#2A231F] text-xs leading-snug group-hover:text-[#8C4E24] transition-colors">
                            {lead.name}
                          </h4>
                          <span className="text-[10px] text-[#8C5E3A] font-medium block pt-0.5">
                            {lead.practiceArea}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInternalSelectedLeadId(lead.id);
                            }}
                            title="Abrir ficha e linha do tempo"
                            className="text-[#8C4E24] hover:text-[#6E3B18] bg-[#F5ECE1] p-1 rounded-md transition"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteLead(lead.id);
                            }}
                            title="Excluir ou arquivar lead"
                            className="opacity-0 group-hover:opacity-100 text-[#A8988B] hover:text-[#8C3A3A] transition p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Process number if available */}
                      {lead.processNumber && (
                        <div className="bg-[#FAF7F2] px-2 py-1 rounded text-[10px] font-mono text-[#5C4D44] border border-[#E5DDD0] flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-[#3B6E8C] shrink-0" />
                          <span className="truncate">{lead.processNumber}</span>
                        </div>
                      )}

                      {/* Message Snippet */}
                      {lead.message && (
                        <p className="text-[11px] text-[#6B5A51] line-clamp-2 leading-relaxed">
                          {lead.message}
                        </p>
                      )}

                      {/* Pending Reminders Badge if any */}
                      {leadPendingReminders.length > 0 && (
                        <div className="flex items-center space-x-1.5 text-[10px] bg-[#FFF4F4] text-[#8C3A3A] border border-[#F2C2C2] px-2 py-1 rounded-lg font-bold">
                          <Bell className="w-3 h-3 text-[#8C3A3A] shrink-0 animate-pulse" />
                          <span>{leadPendingReminders.length} {leadPendingReminders.length === 1 ? 'pendência / lembrete' : 'pendências / lembretes'}</span>
                        </div>
                      )}

                      {/* Timeline observations indicator */}
                      <div className="flex items-center justify-between text-[10px] bg-[#FAF8F5] px-2 py-1 rounded-lg border border-[#EDE5D8]">
                        <span className="flex items-center space-x-1 font-medium text-[#8C4E24]">
                          <Clock className="w-3 h-3 text-[#8C4E24]" />
                          <span>{timelineCount} {timelineCount === 1 ? 'anotação com data' : 'anotações com data'}</span>
                        </span>
                        <span className="text-[10px] text-[#A8988B] font-semibold group-hover:text-[#8C4E24] flex items-center space-x-0.5">
                          <span>Ver histórico</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>

                      {/* WhatsApp Action & Quick Stage Shift */}
                      <div 
                        className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between gap-2"
                        onClick={e => e.stopPropagation()}
                      >
                        <a
                          href={`https://wa.me/${getCleanPhone(lead.whatsapp)}?text=${encodeURIComponent(`Olá, ${lead.name}! Aqui é da Leonardo Militão Advogados Associados referente ao seu caso de ${lead.practiceArea}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] bg-[#E1EFE7] border border-[#BBDCCB] px-2 py-1 rounded-lg transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{lead.whatsapp}</span>
                        </a>

                        {/* Dropdown to move quickly without dragging */}
                        <select
                          value={lead.stage}
                          onClick={e => e.stopPropagation()}
                          onChange={e => {
                            e.stopPropagation();
                            onUpdateLeadStage(lead.id, e.target.value as LeadStage);
                          }}
                          className="bg-[#FAF7F2] border border-[#DDD3C4] text-[10px] text-[#5C4D44] rounded px-1.5 py-1 focus:outline-none"
                        >
                          <option value="novo_lead">Mover: Novo</option>
                          <option value="em_atendimento">Mover: Atendimento</option>
                          <option value="agendado">Mover: Agendado</option>
                          <option value="processo_andamento">Mover: Andamento</option>
                          <option value="concluido">Mover: Concluído</option>
                          <option value="arquivado">Mover: Arquivado</option>
                        </select>
                      </div>
                    </div>
                  );
                })}

                {colLeads.length === 0 && (
                  <div className="border border-dashed border-[#DDD3C4] rounded-2xl p-6 text-center text-[#9E9086] text-[11px]">
                    Nenhum cartão nesta etapa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Ficha Detalhada do Lead com Linha do Tempo e Lembretes */}
      {selectedLead && (
        <CRMLeadDetailModal
          lead={selectedLead}
          currentUser={currentUser}
          reminders={reminders}
          onAddReminder={onAddReminder}
          onToggleReminderStatus={onToggleReminderStatus}
          onDeleteReminder={onDeleteReminder}
          onClose={handleCloseDetail}
          onUpdateLead={onUpdateLead}
          onUpdateLeadStage={onUpdateLeadStage}
        />
      )}

      {/* Modal: Cadastrar Novo Lead Manualmente */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
              <h3 className="font-serif font-bold text-[#2A231F] text-base">Cadastrar Novo Lead no CRM</h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-xs text-[#736359] hover:text-[#2A231F] bg-[#FAF7F2] hover:bg-[#F3ECE2] px-2.5 py-1 rounded-lg"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleCreateNewLead} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do cliente"
                  value={newLeadForm.name}
                  onChange={e => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-[#2A231F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#3D332D] font-semibold">WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="(31) 90000-0000"
                    value={newLeadForm.whatsapp}
                    onChange={e => setNewLeadForm({ ...newLeadForm, whatsapp: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-[#2A231F]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#3D332D] font-semibold">Área</label>
                  <select
                    value={newLeadForm.practiceArea}
                    onChange={e => setNewLeadForm({ ...newLeadForm, practiceArea: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-2 py-2 text-[#2A231F]"
                  >
                    {OFFICE_INFO.practiceAreas.map(a => (
                      <option key={a.id} value={a.title}>{a.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold">Nº do Processo Judicial (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: 5002134-88.2024.8.13.0024"
                  value={newLeadForm.processNumber}
                  onChange={e => setNewLeadForm({ ...newLeadForm, processNumber: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-[#2A231F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold">Observações / Relato do Caso</label>
                <textarea
                  rows={2}
                  placeholder="Anotações do primeiro contato..."
                  value={newLeadForm.message}
                  onChange={e => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-[#2A231F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                Salvar e Inserir no Kanban
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
