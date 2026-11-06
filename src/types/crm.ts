export type LeadStage = 
  | 'novo_lead' 
  | 'em_atendimento' 
  | 'agendado' 
  | 'processo_andamento' 
  | 'concluido' 
  | 'arquivado';

export type LeadTimelineCategory = 
  | 'whatsapp' 
  | 'ligacao' 
  | 'reuniao' 
  | 'documentos' 
  | 'processual' 
  | 'observacao';

export interface LeadTimelineEntry {
  id: string;
  date: string; // ISO string
  author: string;
  category: LeadTimelineCategory;
  text: string;
}

export type ReminderPriority = 'alta' | 'media' | 'baixa';

export interface FollowUpReminder {
  id: string;
  leadId: string;
  leadName: string;
  title: string;
  description?: string;
  dueDateTime: string; // ISO string with date & time
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'completed';
  completedAt?: string;
  priority: ReminderPriority;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  cpf: string;
  whatsapp: string;
  practiceArea: string;
  processNumber?: string;
  message?: string;
  stage: LeadStage;
  createdAt: string;
  notes?: string;
  timeline?: LeadTimelineEntry[];
  reminders?: FollowUpReminder[];
}

export interface UserAccount {
  username: string;
  password?: string;
  name: string;
  role: 'master_admin' | 'admin' | 'operator';
  isFirstLogin: boolean;
  cpfOrOab?: string;
  createdAt: string;
}
