
import React from 'react';
import { Bacteria, Xeroprotectant, Condition, Scenario, InfoContent } from '../types';
import { BACTERIA_OPTIONS, XEROPROTECTANT_OPTIONS, CONDITION_OPTIONS, INFO_CONTENT } from '../constants';
import { DropletsIcon, FlaskConicalIcon, InfoIcon, LeafIcon, SunIcon } from './Icons';

interface ControlPanelProps {
  scenario: Scenario;
  setScenario: React.Dispatch<React.SetStateAction<Scenario>>;
  onSimulate: () => void;
  onReset: () => void;
  isRunning: boolean;
  isFinished: boolean;
  onInfoClick: (content: InfoContent) => void;
}

const SelectGroup: React.FC<{
  label: string;
  value: string;
  options: Record<string, string>;
  icon: React.ReactNode;
  infoKey?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInfoClick: (content: InfoContent) => void;
}> = ({ label, value, options, icon, infoKey, onChange, onInfoClick }) => (
  <div className="space-y-2">
    <label className="flex items-center text-md font-semibold text-slate-300">
      {icon}
      <span className="ml-2">{label}</span>
      {infoKey && (
        <button onClick={() => onInfoClick(INFO_CONTENT[infoKey])} className="ml-2 text-slate-400 hover:text-cyan-400">
          <InfoIcon className="w-4 h-4" />
        </button>
      )}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
    >
      {Object.entries(options).map(([key, name]) => (
        <option key={key} value={key}>{name}</option>
      ))}
    </select>
  </div>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ scenario, setScenario, onSimulate, onReset, isRunning, isFinished, onInfoClick }) => {
  const handleScenarioChange = (field: keyof Scenario) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScenario(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-center text-white">Panel de Simulación</h2>
      <div className="flex-grow space-y-6">
        <SelectGroup 
          label="Inoculación Bacteriana" 
          value={scenario.bacteria} 
          options={BACTERIA_OPTIONS}
          icon={<LeafIcon className="w-5 h-5 text-cyan-400"/>}
          infoKey="pgpr"
          onChange={handleScenarioChange('bacteria')}
          onInfoClick={onInfoClick}
        />
        <SelectGroup
          label="Xeroprotector"
          value={scenario.xeroprotectant}
          options={XEROPROTECTANT_OPTIONS}
          icon={<FlaskConicalIcon className="w-5 h-5 text-cyan-400"/>}
          infoKey="xeroprotectant"
          onChange={handleScenarioChange('xeroprotectant')}
          onInfoClick={onInfoClick}
        />
        <SelectGroup
          label="Condición Ambiental"
          value={scenario.condition}
          options={CONDITION_OPTIONS}
          icon={scenario.condition === Condition.OPTIMAL ? <DropletsIcon className="w-5 h-5 text-cyan-400"/> : <SunIcon className="w-5 h-5 text-cyan-400"/> }
          infoKey="drought"
          onChange={handleScenarioChange('condition')}
          onInfoClick={onInfoClick}
        />
      </div>
      <div className="mt-auto">
        {!isFinished ? (
          <button
            onClick={onSimulate}
            disabled={isRunning}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isRunning ? 'Simulando...' : 'Iniciar Simulación'}
          </button>
        ) : (
          <button
            onClick={onReset}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
