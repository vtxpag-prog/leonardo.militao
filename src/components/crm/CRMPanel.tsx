import React, { useState } from 'react';
import { UserAccount, Lead, LeadStage } from '../../types/crm';
import { CRMDashboard } from './CRMDashboard';
import { CRMKanban } from './CRMKanban';
import { CRMUserManagement } from './CRMUserManagement';
import { CRMContentEditor } from './CRMContentEditor';
import { CRMDocumentation } from './CRMDocumentation';
import { 
  Scale, LogOut, ArrowLeft, BarChart3, Columns, Users, Shield, 
  CheckCircle2, Bell, RefreshCw, Crown, FileEdit, BookOpen
} from 'lucide-react';

interface CRMPanelProps {
  currentUser: UserAccount;
  leads: Lead[];
  users: UserAccount[];
  onUpdateLead: (updatedLead: Lead) => void;
  onUpdateLeadStage: (leadId: string, newStage: LeadStage) => void;
  onDeleteLead: (leadId: string) => void;
  onAddLead: (lead: Lead) => void;
  onCreateUser: (newUser: UserAccount) => void;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const CRMPanel: React.FC<CRMPanelProps> = ({
  currentUser,
  leads,
  users,
  onUpdateLead,
  onUpdateLeadStage,
  onDeleteLead,
  onAddLead,
  onCreateUser,
  onLogout,
  onBackToSite
}) => {
  const [activeTab, setActiveTab] = useState<'kanban' | 'dashboard' | 'content' | 'users' | 'docs'>('kanban');

  const isMaster = currentUser.role === 'master_admin';

  return (
    <div className="min-h-screen bg-[#F6F2EB] text-[#2A231F] flex flex-col font-sans">
      {/* Top CRM App Bar */}
      <header className="bg-white border-b border-[#E2D9CC] sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3ECE2] border border-[#DDD1C0] flex items-center justify-center text-[#8C4E24] font-bold shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-[#2A231F] text-base">Painel CRM &bull; Leonardo Militão</h1>
                {isMaster ? (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#EFE7DC] text-[#8C4E24] border border-[#DDD0BF] flex items-center space-x-1 font-bold">
                    <Crown className="w-3 h-3 text-[#B86F3B]" />
                    <span>Master Admin (100%)</span>
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#E1EFE7] text-[#2D6A4F] border border-[#BBDCCB] font-semibold">
                    Operador Autorizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#736359]">
                Logado como: <strong className="text-[#2A231F]">{currentUser.name}</strong> (@{currentUser.username})
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="flex items-center space-x-1 bg-[#FAF7F2] p-1 rounded-2xl border border-[#DDD3C4] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'kanban'
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#2A231F]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Kanban de Leads</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'kanban' ? 'bg-white/20 text-white' : 'bg-[#EAE2D5] text-[#736359]'}`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#2A231F]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'content'
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#2A231F]'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Artigos & Conteúdo</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'users'
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#2A231F]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Usuários & Acessos</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'docs'
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#2A231F]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Documentação (PDF)</span>
            </button>
          </div>

          {/* Right Navigation & Logout */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToSite}
              className="flex items-center space-x-1.5 text-xs text-[#5C4E46] hover:text-[#2A231F] bg-[#FAF7F2] hover:bg-white px-3.5 py-2 rounded-xl border border-[#DDD3C4] transition-all shadow-2xs"
              title="Voltar à página pública e encerrar sessão"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span className="hidden sm:inline">Ver Site Público</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center space-x-1.5 text-xs text-[#8C3A3A] hover:text-white bg-[#FAF2F2] hover:bg-[#8C3A3A] border border-[#E2B6B6] px-3.5 py-2 rounded-xl transition-all"
              title="Encerrar sessão com segurança"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CRM Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {activeTab === 'kanban' && (
          <CRMKanban
            leads={leads}
            currentUser={currentUser}
            onUpdateLead={onUpdateLead}
            onUpdateLeadStage={onUpdateLeadStage}
            onDeleteLead={onDeleteLead}
            onAddLead={onAddLead}
          />
        )}

        {activeTab === 'dashboard' && (
          <CRMDashboard leads={leads} />
        )}

        {activeTab === 'content' && (
          <CRMContentEditor currentUser={currentUser} />
        )}

        {activeTab === 'users' && (
          <CRMUserManagement
            currentUser={currentUser}
            users={users}
            onCreateUser={onCreateUser}
          />
        )}

        {activeTab === 'docs' && (
          <CRMDocumentation currentUser={currentUser} />
        )}
      </main>

      {/* CRM Footer */}
      <footer className="border-t border-[#E2D9CC] py-3.5 px-6 text-center text-xs text-[#736359] flex items-center justify-between bg-white">
        <span>Leonardo Militão Advogados Associados &bull; Sistema CRM v2.2</span>
        <span className="text-[11px] font-mono">Sessão Autenticada Segura</span>
      </footer>
    </div>
  );
};
