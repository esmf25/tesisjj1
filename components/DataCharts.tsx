
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailyData, FinalData } from '../types';

interface DataChartsProps {
  dailyData: DailyData[];
  finalData: FinalData | null;
  isRunning: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 border border-slate-600 rounded-lg shadow-lg">
        <p className="label font-bold text-cyan-400">{`Día ${label}`}</p>
        <p className="intro text-slate-200">{`CRA : ${payload[0].value}%`}</p>
        <p className="intro text-slate-200">{`IRA : ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const DataCharts: React.FC<DataChartsProps> = ({ dailyData, finalData, isRunning }) => {
  const chartData = finalData ? [
    { name: 'Peso Fresco (PF)', value: finalData.PF },
    { name: 'Peso Seco (PS)', value: finalData.PS },
    { name: 'Peso Túrgido (PTT)', value: finalData.PTT },
  ] : [];

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-slate-200 text-center">Evolución del Estado Hídrico (25 días)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={dailyData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{color: '#e2e8f0'}}/>
            <Line type="monotone" dataKey="CRA" stroke="#22d3ee" strokeWidth={2} dot={false} name="Contenido Relativo de Agua (%)" />
            <Line type="monotone" dataKey="IRA" stroke="#a3e635" strokeWidth={2} dot={false} name="Índice de Retención de Agua" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {!isRunning && finalData && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-slate-200 text-center">Resultados de Biomasa Final (gramos)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
              <YAxis stroke="#94a3b8" />
              <Tooltip cursor={{fill: 'rgba(34, 211, 238, 0.1)'}} contentStyle={{backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem'}}/>
              <Bar dataKey="value" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DataCharts;
