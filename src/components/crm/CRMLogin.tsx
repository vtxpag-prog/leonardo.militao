import React, { useState } from 'react';
import { Lock, Shield, User, Key, CheckCircle2, AlertCircle, ArrowLeft, Scale, Eye, EyeOff } from 'lucide-react';
import { UserAccount } from '../../types/crm';

interface CRMLoginProps {
  onLoginSuccess: (user: UserAccount) => void;
  onBackToSite: () => void;
  users: UserAccount[];
  onUpdateUser: (updatedUser: UserAccount) => void;
}

export const CRMLogin: React.FC<CRMLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
  users,
  onUpdateUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // First-login additional verification state
  const [isFirstLoginStep, setIsFirstLoginStep] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserAccount | null>(null);
  const [cpfOrOab, setCpfOrOab] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim().toLowerCase();

    // Check master_admin with password admin3256 (Never listed anywhere, only accessible via direct login)
    if (cleanUsername === 'master_admin') {
      if (password === 'admin3256') {
        const masterUser: UserAccount = {
          username: 'master_admin',
          name: 'Master Admin (Direção & TI)',
          role: 'master_admin',
          isFirstLogin: false,
          createdAt: '2026-01-01T00:00:00Z'
        };
        onLoginSuccess(masterUser);
        return;
      } else {
        setError('Senha incorreta para o usuário master_admin.');
        return;
      }
    }

    // Find in configured users
    const foundUser = users.find(u => u.username.toLowerCase() === cleanUsername);

    if (!foundUser) {
      setError('Usuário não encontrado. Verifique as credenciais ou contate a administração.');
      return;
    }

    if (foundUser.password !== password) {
      setError('Senha incorreta. Para o primeiro acesso de "adv01", utilize a senha inicial "mudar1234".');
      return;
    }

    // If first login: prompt mandatory validation (CPF/OAB + password change)
    if (foundUser.isFirstLogin) {
      setPendingUser(foundUser);
      setIsFirstLoginStep(true);
      return;
    }

    // Subsequent normal logins: direct entry without CPF/OAB
    onLoginSuccess(foundUser);
  };

  const handleFirstLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cpfOrOab.trim()) {
      setError('A validação de CPF ou OAB é obrigatória no primeiro acesso.');
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('A nova senha e a confirmação não coincidem.');
      return;
    }

    if (newPassword === 'mudar1234') {
      setError('Por favor, defina uma senha pessoal diferente da temporária inicial.');
      return;
    }

    if (pendingUser) {
      const updatedUser: UserAccount = {
        ...pendingUser,
        password: newPassword,
        isFirstLogin: false,
        cpfOrOab: cpfOrOab.trim()
      };

      onUpdateUser(updatedUser);
      onLoginSuccess(updatedUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F2EB] flex flex-col items-center justify-center p-4 relative font-sans text-[#2A231F]">
      {/* Background warm ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-[#E8DDD0]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-1.5 text-xs text-[#6B5A51] hover:text-[#2A231F] transition bg-white border border-[#DDD3C4] px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#8C4E24]" />
          <span>Voltar ao Site Público</span>
        </button>

        <span className="text-[11px] text-[#8C4E24] bg-[#EFE7DC] border border-[#DDD0BF] px-3 py-1 rounded-full font-mono font-medium">
          Acesso Restrito &bull; CRM
        </span>
      </div>

      <div className="w-full max-w-md bg-white border border-[#E2D9CC] rounded-3xl p-7 sm:p-9 shadow-xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-13 h-13 bg-[#F3ECE2] border border-[#D9CBB7] rounded-2xl flex items-center justify-center mx-auto text-[#8C4E24] shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2A231F] tracking-tight">Área do Advogado</h2>
          <p className="text-xs text-[#6B5A51]">
            Leonardo Militão Advogados Associados &bull; Gestão de Leads & Atendimento
          </p>
        </div>

        {error && (
          <div className="bg-[#FAF2F2] border border-[#E2B6B6] rounded-2xl p-3.5 text-xs text-[#8C3A3A] flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-[#A84A4A] shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Standard Login Form */}
        {!isFirstLoginStep ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#8C4E24]" />
                <span>Usuário de Acesso</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Ex: adv01 ou master_admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
              />
            </div>

            {/* Password input with REVEAL TOGGLE BUTTON */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-[#8C4E24]" />
                <span>Senha</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl pl-4 pr-11 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] focus:ring-1 focus:ring-[#8C4E24]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha digitada'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6C63] hover:text-[#2A231F] p-1.5 rounded-lg hover:bg-[#EFE7DC] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#B86F3B]/20 active:scale-95"
            >
              Entrar no Sistema
            </button>

            {/* Helper notes */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E0D2] text-[11px] text-[#6B5A51] space-y-1.5">
              <p className="text-[#8C4E24] font-semibold flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#8C4E24]" />
                <span>Níveis de Acesso Configurados:</span>
              </p>
              <p>• <strong>master_admin</strong>: Acesso 100% irrestrito ao sistema (oculto de listas).</p>
              <p>• <strong>adv01</strong>: Administrador operacional (senha inicial: <code className="bg-[#EFE7DC] px-1 py-0.5 rounded text-[#8C4E24] font-mono">mudar1234</code>).</p>
            </div>
          </form>
        ) : (
          /* STEP 2: First-Login Security Protocol (CPF/OAB Validation + New Password) */
          <form onSubmit={handleFirstLoginSubmit} className="space-y-4 animate-fade-in">
            <div className="bg-[#F6F1E9] border border-[#DDD0BF] rounded-2xl p-3.5 text-xs text-[#5C4D44] space-y-1">
              <p className="font-semibold text-[#8C4E24] flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-[#8C4E24]" />
                <span>Primeiro Acesso: &ldquo;{pendingUser?.username}&rdquo;</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Por exigência do protocolo de segurança da OAB, confirme seu documento profissional e crie sua senha definitiva.
                Após salvar, este usuário desaparecerá da listagem pública de pendências.
              </p>
            </div>

            {/* CPF or OAB Validation */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                <span>Validação Obrigatória: CPF ou Número OAB</span>
                <span className="text-[#8C4E24] font-bold">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: OAB/MG 118.956 ou 000.000.000-00"
                value={cpfOrOab}
                onChange={e => setCpfOrOab(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] transition-all"
              />
            </div>

            {/* New Password with REVEAL TOGGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                <span>Nova Senha Definitiva (mínimo 6 dígitos)</span>
                <span className="text-[#8C4E24] font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  placeholder="Nova senha pessoal"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl pl-4 pr-11 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? 'Ocultar senha' : 'Ver nova senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6C63] hover:text-[#2A231F] p-1.5 rounded-lg hover:bg-[#EFE7DC] transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password with REVEAL TOGGLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#3D332D] flex items-center space-x-1">
                <span>Confirmar Nova Senha</span>
                <span className="text-[#8C4E24] font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DDD3C4] focus:bg-white rounded-xl pl-4 pr-11 py-3 text-sm text-[#2A231F] placeholder-[#9E9086] focus:outline-none focus:border-[#8C4E24] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Ver confirmação de senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6C63] hover:text-[#2A231F] p-1.5 rounded-lg hover:bg-[#EFE7DC] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D6A4F] hover:bg-[#245640] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Validar Documento & Ativar Conta</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsFirstLoginStep(false);
                setPendingUser(null);
                setError('');
              }}
              className="w-full text-center text-xs text-[#7A6C63] hover:text-[#2A231F] py-1 transition-colors"
            >
              Cancelar e voltar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
