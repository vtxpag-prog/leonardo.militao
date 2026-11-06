import React, { useState } from 'react';
import { UserAccount } from '../../types/crm';
import { Shield, UserPlus, Key, CheckCircle2, Lock, AlertTriangle, EyeOff, Eye, Crown } from 'lucide-react';

interface CRMUserManagementProps {
  currentUser: UserAccount;
  users: UserAccount[];
  onCreateUser: (newUser: UserAccount) => void;
}

export const CRMUserManagement: React.FC<CRMUserManagementProps> = ({
  currentUser,
  users,
  onCreateUser
}) => {
  const [newUsername, setNewUsername] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('mudar1234');
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Strict Rule 1: master_admin NEVER appears in any list under any circumstance!
  // Strict Rule 2: adv01 and other users are visible ONLY until 1st login (isFirstLogin === true). Once password changed, they vanish from the list!
  const visibleUsers = users.filter(u => {
    if (u.username.toLowerCase() === 'master_admin') return false;
    return u.isFirstLogin === true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    const user: UserAccount = {
      username: newUsername.trim().toLowerCase(),
      name: newUserName.trim() || newUsername.trim(),
      password: newUserPassword || 'mudar1234',
      role: 'operator',
      isFirstLogin: true,
      createdAt: new Date().toISOString()
    };

    onCreateUser(user);
    setSuccessMsg(`Usuário temporário "${user.username}" criado! Aparecerá na lista apenas até seu primeiro acesso.`);
    setNewUsername('');
    setNewUserName('');
    setNewUserPassword('mudar1234');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  const isMaster = currentUser.role === 'master_admin';

  return (
    <div className="space-y-6">
      {/* Security Policies Box */}
      <div className="bg-[#FAF7F2] border border-[#DDD0BF] rounded-2xl p-5 space-y-2.5">
        <div className="flex items-center space-x-2 text-[#8C4E24] font-bold text-sm">
          <Shield className="w-4 h-4 text-[#8C4E24]" />
          <span>Políticas de Segurança e Matriz de Permissões</span>
        </div>
        <ul className="text-xs text-[#5C4D44] space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong className="text-[#8C4E24]">master_admin</strong>: Conta de <strong>controle total e irrestrito (100%)</strong>. <strong>Nunca aparece em nenhuma lista de usuários</strong> e somente o titular tem acesso. Não pode ser excluída nem tirada do ar.
          </li>
          <li>
            <strong className="text-[#8C4E24]">Administradores & Operadores</strong>: Têm permissão para modificar artigos, notícias, endereços, horários e telefones na aba de conteúdo, além de gerenciar leads no Kanban. <strong>Não têm permissão para alterar a estrutura fundamental do código nem tirar o site do ar</strong>.
          </li>
          <li>
            <strong className="text-[#8C4E24]">Ocultação Automática</strong>: Usuários aparecem nesta listagem apenas enquanto pendentes do 1º acesso. Ao realizarem login com validação de CPF/OAB e troca de senha, são ocultados automaticamente por sigilo profissional.
          </li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Form to Create New User */}
        <div className="lg:col-span-5 bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2 text-[#2A231F] font-bold text-base border-b border-[#EFE7DC] pb-3">
            <UserPlus className="w-5 h-5 text-[#8C4E24]" />
            <span>Cadastrar Novo Operador / Usuário</span>
          </div>

          {successMsg && (
            <div className="bg-[#EBF7F0] border border-[#A6DDBB] rounded-2xl p-3 text-xs text-[#2D6A4F] flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[#3D332D] font-semibold">Login / Usuário *</label>
              <input
                type="text"
                required
                placeholder="Ex: adv02, juliana_lemos, assistente"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-[#2A231F] focus:outline-none focus:border-[#8C4E24] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#3D332D] font-semibold">Nome Completo</label>
              <input
                type="text"
                placeholder="Ex: Dra. Juliana Lemos Costa"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-3.5 py-2.5 text-[#2A231F] focus:outline-none focus:border-[#8C4E24] transition-all"
              />
            </div>

            {/* Temporary password input with REVEAL TOGGLE BUTTON */}
            <div className="space-y-1">
              <label className="text-[#3D332D] font-semibold">Senha Inicial Temporária</label>
              <div className="relative">
                <input
                  type={showTempPassword ? 'text' : 'password'}
                  value={newUserPassword}
                  onChange={e => setNewUserPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl pl-3.5 pr-10 py-2.5 text-[#8C4E24] font-mono focus:outline-none focus:border-[#8C4E24] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowTempPassword(!showTempPassword)}
                  aria-label={showTempPassword ? 'Ocultar senha' : 'Ver senha digitada'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6C63] hover:text-[#2A231F] p-1 rounded-lg hover:bg-[#EFE7DC] transition-colors"
                >
                  {showTempPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-[#7A6C63] pt-0.5">
                O usuário será obrigado a validar CPF/OAB e alterar esta senha no 1º acesso.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-[#B86F3B]/20 active:scale-95"
            >
              Criar Acesso Pendente
            </button>
          </form>
        </div>

        {/* List of Pending Users */}
        <div className="lg:col-span-7 bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
            <div className="flex items-center space-x-2 text-[#2A231F] font-bold text-base">
              <EyeOff className="w-5 h-5 text-[#8C7A70]" />
              <span>Usuários Visíveis (Apenas Pendentes de 1º Acesso)</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#8C4E24] bg-[#EFE7DC] px-2.5 py-0.5 rounded-full border border-[#DDD0BF]">
              {visibleUsers.length} pendente(s)
            </span>
          </div>

          <p className="text-xs text-[#6B5A51] leading-relaxed">
            Conforme regra de sigilo profissional, usuários que já concluíram o primeiro acesso e definiram senha pessoal são ocultados desta listagem pública. O <strong>master_admin</strong> nunca aparece nesta ou em qualquer listagem.
          </p>

          <div className="space-y-2.5">
            {visibleUsers.map(u => (
              <div
                key={u.username}
                className="bg-[#FAF7F2] border border-[#DDD0BF] rounded-2xl p-4 flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#2A231F]">{u.name}</span>
                    <span className="text-[10px] text-[#8C4E24] bg-[#EFE7DC] px-2 py-0.5 rounded-full font-mono font-semibold">
                      @{u.username}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A6C63] flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#B87A38]" />
                    <span>Aguardando 1º login com validação de CPF/OAB (temporário)</span>
                  </p>
                </div>

                <div className="text-right font-mono text-[11px] text-[#7A6C63]">
                  Senha inicial: <code className="text-[#8C4E24] font-bold">{u.password}</code>
                </div>
              </div>
            ))}

            {visibleUsers.length === 0 && (
              <div className="border border-dashed border-[#DDD3C4] rounded-2xl p-8 text-center text-[#736359] text-xs space-y-1.5 bg-[#FAF7F2]">
                <CheckCircle2 className="w-6 h-6 text-[#2D6A4F] mx-auto" />
                <p className="font-semibold text-[#2A231F]">Todos os usuários ativos estão com credenciais seguras e ocultadas!</p>
                <p className="text-[11px] text-[#7A6C63]">
                  Nenhum usuário com pendência de primeiro acesso no momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
