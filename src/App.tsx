import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { PracticeAreas } from './components/PracticeAreas';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { HowItWorksAndPricing } from './components/HowItWorksAndPricing';
import { LocationMap } from './components/LocationMap';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CRMLogin } from './components/crm/CRMLogin';
import { CRMPanel } from './components/crm/CRMPanel';
import { Lead, LeadStage, UserAccount, FollowUpReminder } from './types/crm';
import { INITIAL_LEADS, INITIAL_REMINDERS } from './data/officeData';

const INITIAL_USERS: UserAccount[] = [
  {
    username: 'adv01',
    name: 'Dr. Leonardo Militão (Administrador)',
    password: 'mudar1234',
    role: 'admin',
    isFirstLogin: true,
    createdAt: '2026-11-06T09:00:00Z'
  }
];

export default function App() {
  const [selectedArea, setSelectedArea] = useState<string>('Direito Administrativo & Servidores');
  const [currentView, setCurrentView] = useState<'site' | 'crm_login' | 'crm_panel'>('site');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Persistent leads in localStorage
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('militao_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_LEADS;
  });

  // Persistent users in localStorage
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('militao_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_USERS;
  });

  // Persistent reminders in localStorage
  const [reminders, setReminders] = useState<FollowUpReminder[]>(() => {
    const saved = localStorage.getItem('militao_reminders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_REMINDERS;
  });

  useEffect(() => {
    localStorage.setItem('militao_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('militao_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('militao_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (newReminder: FollowUpReminder) => {
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleToggleReminderStatus = (reminderId: string) => {
    setReminders(prev =>
      prev.map(r => {
        if (r.id === reminderId) {
          const nextStatus = r.status === 'pending' ? 'completed' : 'pending';
          return {
            ...r,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined
          };
        }
        return r;
      })
    );
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  // Lead actions
  const handleLeadAdded = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
    );
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  // User management actions
  const handleUpdateUser = (updatedUser: UserAccount) => {
    setUsers(prev =>
      prev.map(u => (u.username.toLowerCase() === updatedUser.username.toLowerCase() ? updatedUser : u))
    );
  };

  const handleCreateUser = (newUser: UserAccount) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleSelectAreaForContact = (areaTitle: string) => {
    setSelectedArea(areaTitle);
    const formElem = document.getElementById('formulario');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auth actions (Strict Security Rule: leaving to the public page immediately terminates session & requires re-login)
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('site');
  };

  const handleBackToSite = () => {
    // Immediate logout whenever navigating back to the public website
    setCurrentUser(null);
    setCurrentView('site');
  };

  const handleOpenCRM = () => {
    // Strictly require credentials whenever returning to the restricted area
    setCurrentUser(null);
    setCurrentView('crm_login');
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentView('crm_panel');
  };

  // If in CRM Login View
  if (currentView === 'crm_login') {
    return (
      <CRMLogin
        users={users}
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={handleBackToSite}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  // If in CRM Panel View
  if (currentView === 'crm_panel' && currentUser) {
    return (
      <CRMPanel
        currentUser={currentUser}
        leads={leads}
        users={users}
        reminders={reminders}
        onAddReminder={handleAddReminder}
        onToggleReminderStatus={handleToggleReminderStatus}
        onDeleteReminder={handleDeleteReminder}
        onUpdateLead={handleUpdateLead}
        onUpdateLeadStage={handleUpdateLeadStage}
        onDeleteLead={handleDeleteLead}
        onAddLead={handleLeadAdded}
        onCreateUser={handleCreateUser}
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Standard Public Site View with Warm Earthy / Beige Theme
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2A231F] flex flex-col font-sans selection:bg-[#B86F3B] selection:text-white">
      {/* Main Navbar */}
      <Navbar onOpenCRM={handleOpenCRM} />

      {/* Landing Page Content: All Blocks */}
      <main className="flex-1">
        {/* BLOCO 1 — HERO */}
        <Hero />

        {/* BLOCO 2 — QUEM SOMOS (Com as fotos e perfis dos advogados) */}
        <AboutUs />

        {/* BLOCO 3 — ÁREAS DE ATUAÇÃO */}
        <PracticeAreas onSelectAreaForContact={handleSelectAreaForContact} />

        {/* BLOCO 4 — SIMULADOR DE BOT DO WHATSAPP */}
        <WhatsAppSimulator />

        {/* BLOCO 5 — COMO FUNCIONA E VALORES */}
        <HowItWorksAndPricing />

        {/* BLOCO 6 — LOCALIZAÇÃO COM MAPA */}
        <LocationMap />

        {/* BLOCO 7 — FORMULÁRIO DE CONTATO (Saves to CRM) */}
        <ContactForm 
          preselectedArea={selectedArea}
          onLeadAdded={handleLeadAdded}
        />
      </main>

      {/* RODAPÉ */}
      <Footer />
    </div>
  );
}
