import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { Lead } from '../../types/crm';
import { Users, TrendingUp, CheckCircle2, Clock, Calendar, ShieldAlert } from 'lucide-react';

interface CRMDashboardProps {
  leads: Lead[];
}

export const CRMDashboard: React.FC<CRMDashboardProps> = ({ leads }) => {
  // Aggregate by Kanban Stage
  const stageCounts: Record<string, number> = {
    novo_lead: 0,
    em_atendimento: 0,
    agendado: 0,
    processo_andamento: 0,
    concluido: 0,
    arquivado: 0,
  };

  leads.forEach(l => {
    if (stageCounts[l.stage] !== undefined) {
      stageCounts[l.stage]++;
    }
  });

  const stageData = [
    { name: 'Novo Lead', count: stageCounts.novo_lead, color: '#38bdf8' },
    { name: 'Em Atendimento', count: stageCounts.em_atendimento, color: '#f59e0b' },
    { name: 'Agendado', count: stageCounts.agendado, color: '#10b981' },
    { name: 'Em Andamento', count: stageCounts.processo_andamento, color: '#8b5cf6' },
    { name: 'Concluído', count: stageCounts.concluido, color: '#ea580c' },
    { name: 'Arquivado', count: stageCounts.arquivado, color: '#78716c' },
  ];

  // Aggregate by Practice Area
  const areaCounts: Record<string, number> = {};
  leads.forEach(l => {
    const area = l.practiceArea || 'Outros';
    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });

  const areaData = Object.entries(areaCounts).map(([name, count]) => {
    let shortName = name;
    if (name.includes('Constitucional')) shortName = 'Constitucional';
    else if (name.includes('Administrativo')) shortName = 'Servidores / Adm';
    else if (name.includes('Municipal')) shortName = 'Municipal';
    else if (name.includes('Saúde')) shortName = 'Saúde Pública';
    else if (name.includes('Superiores')) shortName = 'STJ / STF';

    return {
      fullName: name,
      name: shortName,
      leads: count,
    };
  });

  const COLORS = ['#B86F3B', '#2D6A4F', '#0284C7', '#7C3AED', '#D97706', '#78716C'];

  const totalLeads = leads.length;
  const activeLeads = stageCounts.novo_lead + stageCounts.em_atendimento + stageCounts.agendado;
  const inCourtLeads = stageCounts.processo_andamento;
  const completedLeads = stageCounts.concluido;
  const conversionRate = totalLeads > 0 ? ((completedLeads + inCourtLeads) / totalLeads * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* 4 Quick Stat Metric Cards in warm beige */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads Received */}
        <div className="bg-white border border-[#E2D9CC] p-5 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#736359] font-medium">Total de Leads Recebidos</span>
            <div className="p-2 rounded-xl bg-[#F3ECE2] text-[#8C4E24] border border-[#DDD0BF]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif font-bold text-[#2A231F]">{totalLeads}</span>
            <span className="text-xs text-[#2D6A4F] font-semibold">+100% integrados</span>
          </div>
          <p className="text-[11px] text-[#8C7A70]">Contador em tempo real</p>
        </div>

        {/* Em Atendimento / Agendados */}
        <div className="bg-white border border-[#E2D9CC] p-5 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#736359] font-medium">Em Negociação / Agendados</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif font-bold text-[#2A231F]">{activeLeads}</span>
            <span className="text-xs text-sky-700 font-semibold">{stageCounts.novo_lead} novos</span>
          </div>
          <p className="text-[11px] text-[#8C7A70]">Oportunidades ativas no pipeline</p>
        </div>

        {/* Processos Ativos */}
        <div className="bg-white border border-[#E2D9CC] p-5 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#736359] font-medium">Processos em Andamento</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif font-bold text-[#2A231F]">{inCourtLeads}</span>
            <span className="text-xs text-purple-700 font-semibold">Instâncias Judiciais</span>
          </div>
          <p className="text-[11px] text-[#8C7A70]">Acompanhados pela banca</p>
        </div>

        {/* Concluídos & Conversão */}
        <div className="bg-white border border-[#E2D9CC] p-5 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#736359] font-medium">Taxa de Conversão em Ação</span>
            <div className="p-2 rounded-xl bg-[#E1EFE7] text-[#2D6A4F] border border-[#BBDCCB]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif font-bold text-[#2A231F]">{conversionRate}%</span>
            <span className="text-xs text-[#2D6A4F] font-semibold">{completedLeads} vitórias</span>
          </div>
          <p className="text-[11px] text-[#8C7A70]">Contratos firmados / finalizados</p>
        </div>
      </div>

      {/* 2 Recharts Analytics Panels in warm beige */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart 1: Volume de Leads por Etapa do Kanban */}
        <div className="bg-white border border-[#E2D9CC] p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
            <div>
              <h3 className="font-serif font-bold text-[#2A231F] text-base">Volume de Leads por Etapa do Kanban</h3>
              <p className="text-xs text-[#736359]">Distribuição dinâmica dos contatos no funil</p>
            </div>
            <span className="text-xs font-mono text-[#8C4E24] bg-[#EFE7DC] px-2.5 py-1 rounded-full">
              Tempo Real
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#78716c" 
                  fontSize={10} 
                  tickLine={false} 
                  angle={-15} 
                  textAnchor="end" 
                />
                <YAxis stroke="#78716c" fontSize={10} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E2D9CC', borderRadius: '1rem', fontSize: '12px', color: '#2A231F' }}
                  labelStyle={{ color: '#2A231F', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" name="Leads" radius={[6, 6, 0, 0]}>
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Taxa de Conversão por Área de Atuação */}
        <div className="bg-white border border-[#E2D9CC] p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
            <div>
              <h3 className="font-serif font-bold text-[#2A231F] text-base">Distribuição por Área de Atuação</h3>
              <p className="text-xs text-[#736359]">Procura e concentração de causas do Direito Público</p>
            </div>
            <span className="text-xs font-mono text-[#2D6A4F] bg-[#E1EFE7] px-2.5 py-1 rounded-full">
              Direito Público
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={areaData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={4}
                  dataKey="leads"
                  nameKey="name"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E2D9CC', borderRadius: '1rem', fontSize: '12px', color: '#2A231F' }}
                  formatter={(value: any, name: any, item: any) => [`${value} leads`, item.payload.fullName]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
