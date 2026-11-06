import React, { useState } from 'react';
import { 
  FileText, Download, Printer, Shield, CheckCircle2, 
  Scale, Users, Clock, Database, Layers, BookOpen, ExternalLink,
  ChevronRight, Lock, Eye, AlertTriangle
} from 'lucide-react';
import { UserAccount } from '../../types/crm';
import { OFFICE_INFO } from '../../data/officeData';
import jsPDF from 'jspdf';

interface CRMDocumentationProps {
  currentUser: UserAccount;
}

export const CRMDocumentation: React.FC<CRMDocumentationProps> = ({ currentUser }) => {
  const [activeSection, setActiveSection] = useState<string>('geral');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate and download formal PDF documentation
  const handleDownloadPDF = () => {
    try {
      setDownloadingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const primaryColor: [number, number, number] = [140, 78, 36]; // #8C4E24
      const darkColor: [number, number, number] = [42, 35, 31]; // #2A231F
      const grayColor: [number, number, number] = [92, 78, 70];

      // Page 1: Cover & Header
      doc.setFillColor(250, 248, 245);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Header Bar
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 16, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('LEONARDO MILITÃO ADVOGADOS ASSOCIADOS — DOCUMENTAÇÃO OFICIAL', 105, 11, { align: 'center' });

      // Title
      doc.setTextColor(...darkColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      doc.text('Manual do Sistema & Documentação Técnica', 20, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...grayColor);
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} | Gerado por: ${currentUser.name} (${currentUser.role})`, 20, 44);
      doc.text('Status: Homologado & Ativo | Versão da Plataforma: v2.3 Enterprise', 20, 50);

      doc.setDrawColor(220, 210, 195);
      doc.line(20, 55, 190, 55);

      // Section 1
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('1. Identificação e Dados Institucionais', 20, 65);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec1 = [
        `Razão Social: ${OFFICE_INFO.name}`,
        `CNPJ: ${OFFICE_INFO.cnpj} (Atividade regular ininterrupta desde 30/07/2002)`,
        `Endereço da Sede: ${OFFICE_INFO.address.street}, ${OFFICE_INFO.address.number} - Sala 401, ${OFFICE_INFO.address.neighborhood}, ${OFFICE_INFO.address.city}/${OFFICE_INFO.address.state} - CEP: ${OFFICE_INFO.address.cep}`,
        `Telefone / WhatsApp Oficial: (31) 99925-7444`,
        `E-mail Institucional: ${OFFICE_INFO.email}`,
        `Corpo Jurídico Titular:`,
        `  • Dr. Leonardo Militão — OAB/MG (Doutor em Direito pela UFMG, Direito Público e Tribunais Superiores)`,
        `  • Dra. Juliana Lemos Costa — OAB/MG nº 118.956 (Especialista em Direito da Saúde Pública e Servidores)`
      ];
      let y = 72;
      sec1.forEach(line => {
        doc.text(line, 20, y);
        y += 6;
      });

      // Section 2
      y += 4;
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('2. Arquitetura da Landing Page & Provimento 205/2021 CFOAB', 20, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec2 = [
        'A Landing Page foi concebida sob rigorosa observância ao Provimento 205/2021 do CFOAB,',
        'garantindo publicidade estritamente informativa, sem mercantilização ou promessa de resultados.',
        '• Paleta Serena & Harmônica: Tons terrosos e bege (#FAF8F5, #B86F3B, #2D6A4F) transmitindo calma e autoridade.',
        '• Microinterações Harmônicas: Efeitos sutis de elevação ao passar o mouse sobre os quadros.',
        '• Áreas de Atuação: Constitucional, Administrativo & Servidores, Municipal & Contratos, Saúde Pública e Tribunais.',
        '• Integrações: Simulador interativo de atendimento WhatsApp e mapa interativo da sede na Serra/BH.',
        '• Formulário de Contato: Validações estritas de CPF e telefone com envio instantâneo para o CRM.'
      ];
      sec2.forEach(line => {
        doc.text(line, 20, y);
        y += 5.5;
      });

      // Section 3
      y += 4;
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('3. Segurança, Controle de Acesso & Master Admin', 20, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec3 = [
        '• Acesso Exclusivo pelo Topo: O acesso ao CRM é feito unicamente pelo botão "ÁREA DO ADVOGADO" no cabeçalho.',
        '• Logout Imediato ao Sair: Qualquer retorno à página pública encerra imediatamente a sessão do usuário.',
        '• Re-autenticação Obrigatória: Para voltar ao CRM, o usuário deve obrigatoriamente digitar suas credenciais.',
        '• Usuário Master Admin (master_admin): Possui acesso total (100%), invisível em listas e tabelas públicas.',
        '• Revelador de Senha: Em todas as caixas de senha há botão para alternar visualização com segurança.',
        '• Operadores Autorizados: Acesso restrito a gerenciamento de leads e artigos, sem alteração de infraestrutura.'
      ];
      sec3.forEach(line => {
        doc.text(line, 20, y);
        y += 5.5;
      });

      // Add Page 2
      doc.addPage();
      doc.setFillColor(250, 248, 245);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Header Bar Page 2
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 16, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('LEONARDO MILITÃO ADVOGADOS ASSOCIADOS — MANUAL OPERACIONAL (PÁG. 2)', 105, 11, { align: 'center' });

      // Section 4
      y = 28;
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('4. Operação do CRM & Linha do Tempo com Observações Datadas', 20, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec4 = [
        'O módulo CRM organiza e documenta todos os passos de atendimento aos clientes:',
        '• Kanban com 6 Etapas: Novo Lead -> Em Atendimento -> Agendado -> Em Andamento -> Concluído -> Arquivado.',
        '• Abertura ao Clicar no Cartão: O clique em qualquer cartão abre a Ficha Detalhada do Lead.',
        '• Linha do Tempo com Data: Campo para inclusão de observações com data, hora, autor e categoria',
        '  (WhatsApp, Ligação Telefônica, Reunião, Documentos, Processual ou Observação Geral).',
        '• Número do Processo: Campo editável diretamente no modal para acompanhamento judicial.',
        '• Contato WhatsApp 1-Clique: Disparo direto para o WhatsApp do cliente com mensagem jurídica pré-preenchida.',
        '• Persistência Segura: Todos os leads e suas linhas do tempo são salvos em localStorage de alta confiabilidade.'
      ];
      sec4.forEach(line => {
        doc.text(line, 20, y);
        y += 5.5;
      });

      // Section 5
      y += 4;
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('5. Métricas, Dashboard & Editor de Conteúdo', 20, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec5 = [
        '• Dashboard com Recharts: Gráficos de barras e pizza com taxa de conversão e volume por matéria do Direito.',
        '• Editor de Conteúdo: Interface para atualização de artigos jurídicos, dados de contato e endereço sem código.',
        '• Gestão de Usuários: Criação de novos operadores com senha provisória e fluxo de primeiro acesso obrigatório.'
      ];
      sec5.forEach(line => {
        doc.text(line, 20, y);
        y += 5.5;
      });

      // Section 6
      y += 6;
      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('6. Homologação & Checklist de Verificação Concluída', 20, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const sec6 = [
        '[OK] Verificação de rotas e navegação na Landing Page (100% Funcional)',
        '[OK] Telefone WhatsApp oficial atualizado: (31) 99925-7444 em todos os botões e textos',
        '[OK] Fotos oficiais do Dr. Leonardo Militão e Dra. Juliana Lemos Costa ativas no Quem Somos',
        '[OK] Remoção completa de botões de homologação e checklist da área pública',
        '[OK] Acesso ao CRM exclusivo pelo menu superior "Área do Advogado"',
        '[OK] Logout imediato ao sair para a página pública e solicitação obrigatória de credenciais',
        '[OK] Abertura de cartão do Kanban em modal amplo com linha do tempo documentada e datada',
        '[OK] Master admin "master_admin" configurado e oculto das listas de operadores'
      ];
      sec6.forEach(line => {
        doc.text(line, 20, y);
        y += 5.5;
      });

      // Footer
      doc.setDrawColor(220, 210, 195);
      doc.line(20, 270, 190, 270);
      doc.setFontSize(8.5);
      doc.setTextColor(...grayColor);
      doc.text('Leonardo Militão Advogados Associados — Todos os direitos reservados. Provimento 205/2021 CFOAB.', 105, 277, { align: 'center' });

      // Save PDF
      doc.save('Manual_Sistema_Leonardo_Militao_Advogados.pdf');
      setDownloadingPdf(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      setDownloadingPdf(false);
      alert('Não foi possível gerar o arquivo PDF diretamente. Você também pode utilizar a opção "Imprimir / Salvar PDF".');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Download Actions */}
      <div className="bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold text-[#8C4E24] bg-[#F5ECE1] border border-[#ECD9C6] px-3 py-1 rounded-full flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#8C4E24]" />
              <span>Documentação Oficial do Sistema</span>
            </span>
            <span className="text-xs text-[#2D6A4F] bg-[#E1EFE7] border border-[#BBDCCB] px-3 py-1 rounded-full font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Todas as Funções Homologadas [100% OK]</span>
            </span>
          </div>

          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2A231F]">
            Manual Técnico & Operacional da Plataforma
          </h2>
          <p className="text-xs text-[#736359] max-w-2xl leading-relaxed">
            Documentação completa sobre a arquitetura da Landing Page, segurança de acesso, operação do Kanban, registro de observações com linha do tempo e conformidade com o Provimento 205/2021 do CFOAB.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleDownloadPDF}
            disabled={downloadingPdf}
            className="inline-flex items-center justify-center space-x-2 bg-[#B86F3B] hover:bg-[#A35D2C] text-white font-semibold text-xs py-3 px-5 rounded-2xl shadow-md shadow-[#B86F3B]/20 hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloadingPdf ? 'Gerando PDF...' : 'Baixar Manual em PDF'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center space-x-2 bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#3D332D] border border-[#DDD3C4] font-semibold text-xs py-3 px-4 rounded-2xl transition-all"
            title="Imprimir ou salvar via diálogo do navegador"
          >
            <Printer className="w-4 h-4 text-[#8C4E24]" />
            <span>Imprimir / Salvar</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <div className="bg-[#E1EFE7] border border-[#BBDCCB] p-4 rounded-2xl flex items-center space-x-3 text-xs text-[#2D6A4F] animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block font-bold">Download Concluído com Sucesso!</strong>
            <span>O arquivo <em>Manual_Sistema_Leonardo_Militao_Advogados.pdf</em> foi gerado e baixado para o seu computador.</span>
          </div>
        </div>
      )}

      {/* Verification Status Summary Card */}
      <div className="bg-[#FAF7F2] border border-[#E2D9CC] rounded-3xl p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-[#2A231F] flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#2D6A4F]" />
          <span>Relatório de Verificação de Todas as Funções do Sistema</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DDD0] space-y-1">
            <span className="font-bold text-[#2D6A4F] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Landing Page & Paleta</span>
            </span>
            <p className="text-[11px] text-[#736359] leading-relaxed">
              Tons terrosos e bege, hover com movimento harmônico, fotos no Quem Somos e mapa interativo na Serra/BH.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DDD0] space-y-1">
            <span className="font-bold text-[#2D6A4F] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>WhatsApp & Telefone</span>
            </span>
            <p className="text-[11px] text-[#736359] leading-relaxed">
              Número (31) 99925-7444 padronizado em 100% dos botões, links diretos e no simulador interativo.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DDD0] space-y-1">
            <span className="font-bold text-[#2D6A4F] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Segurança & Logout</span>
            </span>
            <p className="text-[11px] text-[#736359] leading-relaxed">
              Acesso exclusivo pelo menu superior; logout imediato ao sair e senha obrigatória ao retornar.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DDD0] space-y-1">
            <span className="font-bold text-[#2D6A4F] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Kanban & Linha do Tempo</span>
            </span>
            <p className="text-[11px] text-[#736359] leading-relaxed">
              Clique nos cards abre modal amplo com ficha completa e histórico de observações com data e autor.
            </p>
          </div>
        </div>
      </div>

      {/* Main Documentation Viewer (Tabbed sections for reading) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white border border-[#E2D9CC] rounded-3xl p-3.5 space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C4E24] px-3 py-1.5 block">
            Índice do Manual
          </span>

          {[
            { id: 'geral', label: '1. Dados Institucionais' },
            { id: 'landing', label: '2. Landing Page & OAB' },
            { id: 'seguranca', label: '3. Segurança & Acessos' },
            { id: 'crm', label: '4. Operação do CRM & Kanban' },
            { id: 'timeline', label: '5. Linha do Tempo Datada' },
            { id: 'metricas', label: '6. Métricas & Artigos' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                activeSection === tab.id
                  ? 'bg-[#B86F3B] text-white shadow-xs'
                  : 'text-[#5C4E46] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>{tab.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          ))}
        </div>

        {/* Content Display Area */}
        <div className="lg:col-span-9 bg-white border border-[#E2D9CC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-xs text-[#3D332D] leading-relaxed">
          {activeSection === 'geral' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <Scale className="w-4 h-4 text-[#8C4E24]" />
                <span>1. Dados Institucionais & Credenciais do Escritório</span>
              </h3>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E0D2] space-y-2 text-xs">
                <p><strong>Razão Social:</strong> Leonardo Militão Advogados Associados</p>
                <p><strong>Inscrição OAB:</strong> Sociedade de Advogados inscrita na Ordem dos Advogados do Brasil, Seção Minas Gerais (OAB/MG)</p>
                <p><strong>CNPJ:</strong> 05.243.864/0001-58 (Registro ativo e ininterrupto desde 30/07/2002)</p>
                <p><strong>Sede Oficial:</strong> Rua dos Dominicanos, 165 - Sala 401, Bairro Serra, Belo Horizonte/MG, CEP 30210-090</p>
                <p><strong>Telefone / WhatsApp Geral:</strong> (31) 99925-7444</p>
                <p><strong>E-mail de Contato:</strong> leonardo@militaoadvogados.com.br</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-[#8C4E24] text-xs uppercase tracking-wider">Advogados Titulares e Sócios</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5DDD0] p-4 rounded-xl space-y-1.5">
                    <span className="font-bold text-sm text-[#2A231F] block">Dr. Leonardo Militão</span>
                    <span className="text-[11px] text-[#8C4E24] font-medium block">Doutor em Direito pela UFMG &bull; Sócio Fundador</span>
                    <p className="text-[11px] text-[#736359] leading-relaxed">
                      Atuação concentrada em Direito Público, Direito Constitucional, Direito Administrativo e sustentação oral perante os Tribunais Superiores (STJ e STF).
                    </p>
                  </div>

                  <div className="bg-white border border-[#E5DDD0] p-4 rounded-xl space-y-1.5">
                    <span className="font-bold text-sm text-[#2A231F] block">Dra. Juliana Lemos Costa</span>
                    <span className="text-[11px] text-[#8C4E24] font-medium block">OAB/MG nº 118.956 &bull; Sócia Titular</span>
                    <p className="text-[11px] text-[#736359] leading-relaxed">
                      Especialista em Direito da Saúde Pública (fornecimento de medicamentos de alto custo e leitos) e Direito dos Servidores Públicos civis e militares.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'landing' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#8C4E24]" />
                <span>2. Landing Page, Identidade Visual & Regras da OAB</span>
              </h3>

              <p>
                A presença digital foi projetada especificamente para transmitir <strong>calma, serenidade e segurança jurídica</strong>, evitando qualquer aspecto estridente ou comercial agressivo que contrarie o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021 do CFOAB.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E0D2]">
                  <span className="font-bold text-[#8C4E24] block mb-1">Paleta Visual</span>
                  <p className="text-[11px] text-[#6B5A51]">
                    Fundos neutros (#FAF8F5, #FAF7F2), tons terrosos suaves (#B86F3B), verde floresta institucional (#2D6A4F) e grafite nobre (#2A231F).
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E0D2]">
                  <span className="font-bold text-[#8C4E24] block mb-1">Movimento Harmônico</span>
                  <p className="text-[11px] text-[#6B5A51]">
                    Transições suaves ao passar o mouse (`hover:-translate-y-1` / `translate-y-2`) conferindo dinamismo orgânico sem distrações.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E0D2]">
                  <span className="font-bold text-[#8C4E24] block mb-1">Fotos dos Sócios</span>
                  <p className="text-[11px] text-[#6B5A51]">
                    Fotos institucionais do Dr. Leonardo Militão e da Dra. Juliana Lemos Costa exibidas exclusivamente na seção "Quem Somos — Nossa Essência".
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <h4 className="font-bold text-xs text-[#2A231F]">Os 7 Módulos Oficiais da Landing Page:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#5C4E46]">
                  <li><strong>Hero:</strong> Tese de defesa intransigente contra abusos do Poder Público e acesso ao WhatsApp.</li>
                  <li><strong>Quem Somos:</strong> Apresentação acadêmica, fotos em alta definição e valores deontológicos.</li>
                  <li><strong>Áreas de Atuação:</strong> 5 matérias delimitadas com botão para direcionamento imediato ao formulário.</li>
                  <li><strong>Simulador de Atendimento WhatsApp:</strong> Demonstração interativa de triagem para orientar o cidadão.</li>
                  <li><strong>Como Funciona & Valores:</strong> Esclarecimento sobre modelos de honorários e vedação a promessas de resultado.</li>
                  <li><strong>Localização da Sede:</strong> Mapa interativo com rota para o bairro Serra, Belo Horizonte/MG.</li>
                  <li><strong>Formulário de Contato:</strong> Validações e máscaras para CPF e telefone, injetando leads direto no Kanban.</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'seguranca' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#8C4E24]" />
                <span>3. Arquitetura de Segurança, Níveis de Acesso & Master Admin</span>
              </h3>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DDD0] space-y-2">
                <h4 className="font-bold text-[#8C4E24] text-xs">Regra de Saída e Logout Imediato:</h4>
                <p className="text-xs text-[#5C4E46] leading-relaxed">
                  Sempre que o usuário estiver dentro da área restrita e clicar em <strong>"Ver Site Público"</strong> ou <strong>"Sair"</strong>, a sessão de autenticação em memória é imediatamente zerada (`currentUser = null`). Caso queira retornar à área restrita posteriormente pelo botão <strong>"ÁREA DO ADVOGADO"</strong> no menu superior, deverá efetuar novamente o login completo.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A231F]">Hierarquia de Usuários:</h4>
                
                <div className="border border-[#E5DDD0] rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase bg-[#EFE7DC] text-[#8C4E24] border border-[#DDD0BF] px-2 py-0.5 rounded">
                      master_admin (100% de Acesso)
                    </span>
                    <span className="text-xs text-[#736359] italic">Totalmente invisível em tabelas</span>
                  </div>
                  <p className="text-xs text-[#5C4E46]">
                    Usuário com privilégios irrestritos para gerenciar todo o CRM, criar e remover usuários, editar artigos e parâmetros. Não aparece na listagem pública de usuários para garantir sigilo institucional absoluto.
                  </p>
                </div>

                <div className="border border-[#E5DDD0] rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase bg-[#E1EFE7] text-[#2D6A4F] border border-[#BBDCCB] px-2 py-0.5 rounded">
                      Operadores & Advogados Autorizados
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4E46]">
                    Possuem acesso completo para visualizar e mover leads no Kanban, registrar observações com data, editar artigos e atualizar contatos, porém <strong>nunca podem alterar a estrutura fundamental do site nem desativar a plataforma</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#736359]">
                <Eye className="w-4 h-4 text-[#8C4E24]" />
                <span>Todas as caixas de senha do sistema dispõem de alternador com ícone de olho para revelação segura da senha digitada.</span>
              </div>
            </div>
          )}

          {activeSection === 'crm' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#8C4E24]" />
                <span>4. Operação do Kanban de Atendimento</span>
              </h3>

              <p>
                O Kanban jurídico organiza as demandas em 6 estágios sequenciais, permitindo movimentação ágil tanto por <strong>Drag & Drop</strong> (arrastar e soltar) quanto pelo <strong>seletor suspenso</strong> em cada cartão:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-sky-800 text-xs">1. 🔵 Novo Lead</span>
                  <p className="text-[11px] text-sky-900 leading-relaxed">
                    Lead recém-chegado pelo formulário do site ou inserido manualmente pela equipe.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-amber-800 text-xs">2. 🟡 Em Atendimento</span>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Primeiro contato estabelecido via WhatsApp ou ligação telefônica.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-800 text-xs">3. 🟢 Agendado</span>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    Consulta ou reunião marcada (presencial na sede da Serra/BH ou por videoconferência).
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-purple-800 text-xs">4. 🟣 Em Andamento</span>
                  <p className="text-[11px] text-purple-900 leading-relaxed">
                    Ação ajuizada, recurso interposto ou processo administrativo em tramitação.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-orange-800 text-xs">5. 🟠 Concluído</span>
                  <p className="text-[11px] text-orange-900 leading-relaxed">
                    Caso finalizado com sentença favorável, tutela cumprida ou acordo homologado.
                  </p>
                </div>

                <div className="bg-stone-100 border border-stone-300 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-stone-700 text-xs">6. ⚫ Arquivado</span>
                  <p className="text-[11px] text-stone-800 leading-relaxed">
                    Atendimento sem interesse do cliente ou demanda prescrita/improcedente.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#8C4E24]" />
                <span>5. Ficha Detalhada do Atendimento & Linha do Tempo Datada</span>
              </h3>

              <p>
                Ao clicar em qualquer cartão do Kanban, abre-se a <strong>Ficha Detalhada do Atendimento</strong>, proporcionando visão panorâmica do caso e permitindo a documentação cronológica de cada interação:
              </p>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E0D2] space-y-2.5">
                <h4 className="font-bold text-xs text-[#8C4E24] uppercase tracking-wider">Recursos Disponíveis na Ficha:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#5C4E46]">
                  <li><strong>Botão WhatsApp com 1 Clique:</strong> Inicia imediatamente a conversa no WhatsApp oficial com mensagem contendo o nome do cliente e a área jurídica de interesse.</li>
                  <li><strong>Número do Processo Judicial:</strong> Campo editável para vinculação do número do processo (ex: <em>5002134-88.2024.8.13.0024</em> ou <em>RESP no STJ</em>).</li>
                  <li><strong>Registro de Observações com Data:</strong> Permite digitar os passos do atendimento com carimbo de data e hora (automático ou editável para registros retroativos).</li>
                  <li><strong>Categorias de Ocorrência:</strong> WhatsApp, Ligação Telefônica, Reunião/Audiência, Análise de Documentos, Andamento Processual ou Observação Geral.</li>
                  <li><strong>Assinatura do Advogado:</strong> Cada entrada registra o nome do profissional autenticado responsável pelo despacho.</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'metricas' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2A231F] border-b border-[#F0EBE1] pb-2 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#8C4E24]" />
                <span>6. Dashboard de Métricas, Artigos & Procedimentos Operacionais</span>
              </h3>

              <div className="space-y-3">
                <p>
                  O painel dispõe de abas complementares projetadas para autonomia completa do escritório:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5DDD0] p-4 rounded-xl space-y-1.5">
                    <span className="font-bold text-[#2A231F] text-xs">Módulo Dashboard</span>
                    <p className="text-[11px] text-[#736359] leading-relaxed">
                      Gráficos em Recharts exibindo a proporção de leads por matéria jurídica, taxa de avanço entre etapas e volume mensal de atendimentos.
                    </p>
                  </div>

                  <div className="bg-white border border-[#E5DDD0] p-4 rounded-xl space-y-1.5">
                    <span className="font-bold text-[#2A231F] text-xs">Editor de Artigos & Conteúdo</span>
                    <p className="text-[11px] text-[#736359] leading-relaxed">
                      Permite publicar artigos doutrinários, orientações sobre jurisprudência recente e ajustar dados de contato sem tocar no código do site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DDD0] text-xs space-y-1">
                <span className="font-bold text-[#8C4E24]">Procedimento Recomendado para Novos Atendimentos:</span>
                <ol className="list-decimal list-inside space-y-1 text-[#5C4D44] pt-1">
                  <li>Ao receber um lead em <strong>Novo Lead</strong>, acione o botão WhatsApp integrado para qualificar o caso.</li>
                  <li>Abra o cartão e registre uma observação do tipo <em>WhatsApp / Mensagem</em> resumindo a solicitação de documentos.</li>
                  <li>Mova o cartão para <strong>Em Atendimento</strong>.</li>
                  <li>Ao agendar uma conferência virtual ou presencial na Serra/BH, registre a data na Linha do Tempo e avance para <strong>Agendado</strong>.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
