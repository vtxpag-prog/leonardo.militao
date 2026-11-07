import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Lead } from '../../types/crm';
import { PieChart as PieChartIcon, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface CRMPieWidgetProps {
  leads: Lead[];
}

export const CRMPieWidget: React.FC<CRMPieWidgetProps> = ({ leads }) => {
  // Count by macro-stages
  const novosCount = leads.filter(l => l.stage === 'novo_lead').length;
  const atendimentoCount = leads.filter(l => 
    l.stage === 'em_atendimento' || l.stage === 'agendado' || l.stage === 'processo_andamento'
  ).length;
  const finalizadosCount = leads.filter(l => 
    l.stage === 'concluido' || l.stage === 'arquivado'
  ).length;

  const total = leads.length;

  const data = [
    { name: 'Novos', value: novosCount, color: '#2563EB', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    { name: 'Em Atendimento', value: atendimentoCount, color: '#D97706', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    { name: 'Finalizados', value: finalizadosCount, color: '#2D6A4F', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  ];

  // Fallback if no leads
  const chartData = total > 0 ? data : [{ name: 'Sem dados', value: 1, color: '#E5DDD0', bg: 'bg-stone-50', text: 'text-stone-500', border: 'border-stone-200' }];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = total > 0 ? Math.round((Number(item.value) / total) * 100) : 0;
      return (
        <div className="bg-[#2A231F] text-white p-2.5 rounded-xl text-xs shadow-xl border border-[#42332B] space-y-0.5">
          <p className="font-bold flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.payload.color }} />
            <span>{item.name}</span>
          </p>
          <p className="text-[11px] text-[#D9CEBF]">
            {item.value} {item.value === 1 ? 'lead' : 'leads'} ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#E2D9CC] rounded-3xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title and Badge */}
        <div className="flex items-center space-x-3 w-full md:w-auto shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-[#F5ECE1] border border-[#ECD9C6] flex items-center justify-center text-[#8C4E24] shrink-0">
            <PieChartIcon className="w-4 h-4 text-[#8C4E24]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-sm text-[#2A231F]">
                Distribuição de Leads por Etapa
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#DDD3C4] text-[#736359] font-bold">
                Total: {total}
              </span>
            </div>
            <p className="text-[11px] text-[#736359]">
              Visão macro em tempo real das fases do funil
            </p>
          </div>
        </div>

        {/* Small Pie Chart */}
        <div className="w-32 h-28 sm:w-36 sm:h-28 shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={48}
                paddingAngle={total > 1 ? 4 : 0}
                stroke="none"
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center total number in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-bold text-[#2A231F] font-mono leading-none">
              {total}
            </span>
            <span className="text-[8px] text-[#8C7A70] uppercase tracking-wider font-semibold">
              leads
            </span>
          </div>
        </div>

        {/* 3 Metric Summary Cards (Novos, Em Atendimento, Finalizados) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1 w-full">
          {/* Card: Novos */}
          <div className="bg-[#FAF8F5] border border-blue-200/80 rounded-2xl p-2.5 sm:p-3 text-center space-y-0.5 hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-center space-x-1 text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Novos</span>
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#2A231F]">
              {novosCount}
            </div>
            <span className="text-[10px] text-blue-800 font-mono font-medium block">
              {total > 0 ? Math.round((novosCount / total) * 100) : 0}% do total
            </span>
          </div>

          {/* Card: Em Atendimento */}
          <div className="bg-[#FAF8F5] border border-amber-200/80 rounded-2xl p-2.5 sm:p-3 text-center space-y-0.5 hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-center space-x-1 text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Atendimento</span>
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#2A231F]">
              {atendimentoCount}
            </div>
            <span className="text-[10px] text-amber-900 font-mono font-medium block">
              {total > 0 ? Math.round((atendimentoCount / total) * 100) : 0}% do total
            </span>
          </div>

          {/* Card: Finalizados */}
          <div className="bg-[#FAF8F5] border border-emerald-200/80 rounded-2xl p-2.5 sm:p-3 text-center space-y-0.5 hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-center space-x-1 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Finalizados</span>
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#2A231F]">
              {finalizadosCount}
            </div>
            <span className="text-[10px] text-emerald-900 font-mono font-medium block">
              {total > 0 ? Math.round((finalizadosCount / total) * 100) : 0}% do total
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
