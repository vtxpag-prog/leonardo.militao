import React, { useState } from 'react';
import { FollowUpReminder, Lead, ReminderPriority, UserAccount } from '../../types/crm';
import { 
  Bell, Calendar, Clock, CheckCircle2, AlertCircle, Plus, 
  Trash2, User, Filter, ArrowRight, ShieldCheck, CheckSquare, 
  Square, AlertTriangle, ExternalLink, X
} from 'lucide-react';

interface CRMReminderManagerProps {
  reminders: FollowUpReminder[];
  leads: Lead[];
  currentUser: UserAccount;
  onAddReminder: (reminder: FollowUpReminder) => void;
  onToggleReminderStatus: (reminderId: string) => void;
  onDeleteReminder: (reminderId: string) => void;
  onOpenLeadDetail?: (leadId: string) => void;
  isCompact?: boolean;
}

export const CRMReminderManager: React.FC<CRMReminderManagerProps> = ({
  reminders,
  leads,
  currentUser,
  onAddReminder,
  onToggleReminderStatus,
  onDeleteReminder,
  onOpenLeadDetail,
  isCompact = false
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'today' | 'completed'>('pending');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ReminderPriority>('alta');
  
  // Default to today + 2 hours
  const getDefaultDateTime = () => {
    const d = new Date();
    d.setHours(d.getHours() + 2);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [dueDateTime, setDueDateTime] = useState<string>(getDefaultDateTime());
  const [assignedTo, setAssignedTo] = useState<string>(currentUser.name);

  // Helpers for dates
  const isOverdue = (dueIso: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueIso).getTime() < new Date().getTime();
  };

  const isToday = (dueIso: string) => {
    const due = new Date(dueIso);
    const today = new Date();
    return (
      due.getDate() === today.getDate() &&
      due.getMonth() === today.getMonth() &&
      due.getFullYear() === today.getFullYear()
    );
  };

  const formatDueDisplay = (dueIso: string) => {
    try {
      const due = new Date(dueIso);
      const today = new Date();
      const isDueToday = isToday(dueIso);
      
      const timeStr = due.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      if (isDueToday) {
        return `Hoje às ${timeStr}`;
      }

      // Check tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      if (
        due.getDate() === tomorrow.getDate() &&
        due.getMonth() === tomorrow.getMonth() &&
        due.getFullYear() === tomorrow.getFullYear()
      ) {
        return `Amanhã às ${timeStr}`;
      }

      return due.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dueIso;
    }
  };

  // Stats
  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const overdueCount = reminders.filter(r => isOverdue(r.dueDateTime, r.status)).length;
  const todayCount = reminders.filter(r => r.status === 'pending' && isToday(r.dueDateTime)).length;
  const completedCount = reminders.filter(r => r.status === 'completed').length;

  // Filtered list
  const filteredReminders = reminders.filter(r => {
    if (filterStatus === 'pending') return r.status === 'pending';
    if (filterStatus === 'today') return r.status === 'pending' && (isToday(r.dueDateTime) || isOverdue(r.dueDateTime, r.status));
    if (filterStatus === 'completed') return r.status === 'completed';
    return true;
  });

  // Sort: Overdue first, then by due date ascending
  const sortedReminders = [...filteredReminders].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'pending' ? -1 : 1;
    }
    return new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime();
  });

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedLeadId) return;

    const targetLead = leads.find(l => l.id === selectedLeadId);
    const newRem: FollowUpReminder = {
      id: `rem-${Date.now()}`,
      leadId: selectedLeadId,
      leadName: targetLead ? targetLead.name : 'Cliente',
      title: title.trim(),
      description: description.trim() || undefined,
      dueDateTime: new Date(dueDateTime).toISOString(),
      assignedTo: assignedTo.trim() || currentUser.name,
      createdBy: currentUser.name,
      createdAt: new Date().toISOString(),
      status: 'pending',
      priority
    };

    onAddReminder(newRem);
    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white border border-[#E2D9CC] rounded-3xl p-5 sm:p-7 space-y-5 shadow-xs">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F0EBE1] pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#F5ECE1] border border-[#ECD9C6] flex items-center justify-center text-[#8C4E24]">
              <Bell className="w-4 h-4 text-[#8C4E24]" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#2A231F] flex items-center space-x-2">
              <span>Central de Pendências & Lembretes de Acompanhamento</span>
            </h3>
          </div>
          <p className="text-xs text-[#736359]">
            Acompanhe prazos, ligações de retorno e tarefas jurídicas pendentes vinculadas a cada cliente.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-1.5 bg-[#8C4E24] hover:bg-[#733E1C] text-white font-semibold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agendar Lembrete</span>
          </button>
        </div>
      </div>

      {/* Metrics Badges & Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Pills */}
        <div className="flex items-center space-x-1.5 bg-[#FAF7F2] p-1 rounded-2xl border border-[#DDD3C4] text-[11px] font-semibold">
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'pending'
                ? 'bg-[#8C4E24] text-white shadow-xs'
                : 'text-[#6B5A51] hover:text-[#2A231F]'
            }`}
          >
            Pendentes ({pendingCount})
          </button>

          <button
            onClick={() => setFilterStatus('today')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
              filterStatus === 'today'
                ? 'bg-[#8C4E24] text-white shadow-xs'
                : 'text-[#6B5A51] hover:text-[#2A231F]'
            }`}
          >
            <span>Hoje / Atrasadas</span>
            {(todayCount > 0 || overdueCount > 0) && (
              <span className="bg-[#FAF2F2] text-[#8C3A3A] px-1.5 py-0.2 rounded-full font-bold text-[10px]">
                {todayCount + overdueCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'completed'
                ? 'bg-[#8C4E24] text-white shadow-xs'
                : 'text-[#6B5A51] hover:text-[#2A231F]'
            }`}
          >
            Concluídas ({completedCount})
          </button>

          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'all'
                ? 'bg-[#8C4E24] text-white shadow-xs'
                : 'text-[#6B5A51] hover:text-[#2A231F]'
            }`}
          >
            Todas ({reminders.length})
          </button>
        </div>

        {/* Overdue alert badge if any */}
        {overdueCount > 0 && (
          <div className="flex items-center space-x-1.5 bg-[#FAF2F2] border border-[#E2B6B6] text-[#8C3A3A] px-3 py-1 rounded-xl text-xs font-semibold animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{overdueCount} {overdueCount === 1 ? 'lembrete em atraso!' : 'lembretes em atraso!'}</span>
          </div>
        )}
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {sortedReminders.length === 0 ? (
          <div className="p-8 text-center text-[#9E9086] text-xs border border-dashed border-[#DDD3C4] rounded-2xl space-y-1">
            <CheckCircle2 className="w-8 h-8 text-[#2D6A4F] mx-auto opacity-70" />
            <p className="font-semibold text-[#5C4D44]">Nenhuma pendência encontrada neste filtro.</p>
            <p className="text-[11px]">Todos os acompanhamentos de clientes estão em dia ou concluídos.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0EBE1] border border-[#E5DDD0] rounded-2xl overflow-hidden bg-white">
            {sortedReminders.map(rem => {
              const overdue = isOverdue(rem.dueDateTime, rem.status);
              const dueIsToday = isToday(rem.dueDateTime);
              const isCompleted = rem.status === 'completed';

              return (
                <div
                  key={rem.id}
                  className={`p-3.5 sm:p-4 transition-colors flex items-start justify-between gap-3 ${
                    isCompleted
                      ? 'bg-[#FAF8F5]/60 opacity-60'
                      : overdue
                      ? 'bg-[#FFF9F9] hover:bg-[#FFF2F2]'
                      : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  {/* Left: Checkbox & Info */}
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    {/* Toggle status checkbox */}
                    <button
                      onClick={() => onToggleReminderStatus(rem.id)}
                      className="mt-0.5 text-[#8C4E24] hover:scale-110 transition-transform shrink-0"
                      title={isCompleted ? "Marcar como pendente" : "Marcar como concluído"}
                    >
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5 text-[#2D6A4F]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#C4A480] hover:text-[#8C4E24]" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        {/* Title */}
                        <h4 className={`text-xs font-bold leading-snug ${
                          isCompleted ? 'line-through text-[#736359]' : 'text-[#2A231F]'
                        }`}>
                          {rem.title}
                        </h4>

                        {/* Priority Badge */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          rem.priority === 'alta'
                            ? 'bg-[#FAF2F2] text-[#8C3A3A] border-[#E2B6B6]'
                            : rem.priority === 'media'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}>
                          {rem.priority === 'alta' ? 'Alta' : rem.priority === 'media' ? 'Média' : 'Baixa'}
                        </span>

                        {/* Due Date Indicator */}
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1 ${
                          isCompleted
                            ? 'bg-stone-100 text-stone-600'
                            : overdue
                            ? 'bg-[#8C3A3A] text-white'
                            : dueIsToday
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-[#F3ECE2] text-[#8C4E24] border border-[#DDD1C0]'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{overdue ? `ATRASADO: ${formatDueDisplay(rem.dueDateTime)}` : formatDueDisplay(rem.dueDateTime)}</span>
                        </span>
                      </div>

                      {/* Description if present */}
                      {rem.description && (
                        <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                          isCompleted ? 'text-[#8C7E74]' : 'text-[#5C4D44]'
                        }`}>
                          {rem.description}
                        </p>
                      )}

                      {/* Client / Lead name badge & link to open lead */}
                      <div className="flex items-center space-x-3 text-[10px] text-[#736359] pt-0.5">
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-[#8C4E24]" />
                          <span>Lead:</span>
                          <button
                            type="button"
                            onClick={() => onOpenLeadDetail && onOpenLeadDetail(rem.leadId)}
                            className="font-bold text-[#8C4E24] hover:underline flex items-center space-x-0.5"
                          >
                            <span>{rem.leadName}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        </span>

                        <span>&bull;</span>
                        <span>Responsável: <strong className="text-[#3D332D]">{rem.assignedTo}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-1 shrink-0 pt-0.5">
                    <button
                      onClick={() => onDeleteReminder(rem.id)}
                      title="Excluir este lembrete"
                      className="text-[#B8ACA2] hover:text-[#8C3A3A] transition p-1 rounded-md hover:bg-stone-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: Agendar Novo Lembrete de Acompanhamento */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-[#8C4E24]" />
                <h3 className="font-serif font-bold text-base text-[#2A231F]">
                  Agendar Lembrete de Acompanhamento
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-[#FAF7F2] hover:bg-[#F0EBE1] text-[#736359] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="space-y-4 text-xs">
              {/* Select Lead */}
              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold block">
                  Vincular ao Lead / Cliente *
                </label>
                <select
                  required
                  value={selectedLeadId}
                  onChange={e => setSelectedLeadId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                >
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>
                      {lead.name} — {lead.practiceArea}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold block">
                  Título do Lembrete / Tarefa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ligar para o cliente para cobrar procuração assinada"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                />
              </div>

              {/* Date & Time and Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#3D332D] font-semibold block">
                    Data & Hora do Lembrete *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={dueDateTime}
                    onChange={e => setDueDateTime(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#3D332D] font-semibold block">
                    Nível de Prioridade
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as ReminderPriority)}
                    className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                  >
                    <option value="alta">🔴 Alta Prioridade (Urgente)</option>
                    <option value="media">🟡 Média Prioridade</option>
                    <option value="baixa">🔵 Baixa Prioridade (Rotina)</option>
                  </select>
                </div>
              </div>

              {/* Assigned lawyer */}
              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold block">
                  Advogado Responsável
                </label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={e => setAssignedTo(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[#3D332D] font-semibold block">
                  Instruções / Detalhes Adicionais (opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Verificar também o andamento no portal PJe antes de ligar..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2A231F]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#F0EBE1]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DDD3C4] text-[#736359] hover:bg-[#FAF7F2] text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#8C4E24] hover:bg-[#733E1C] text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Salvar Lembrete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
