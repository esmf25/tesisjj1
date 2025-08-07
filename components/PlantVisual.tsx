
import React from 'react';
import { PlantHealth } from '../types';

interface PlantVisualProps {
  health: PlantHealth;
  day: number;
  totalDays: number;
  isRunning: boolean;
}

const PlantIcon: React.FC<{ health: PlantHealth }> = ({ health }) => {
  const baseClasses = "w-32 h-32 md:w-48 md:h-48 transition-all duration-500";
  
  switch (health) {
    case PlantHealth.HEALTHY:
      return <span className={`${baseClasses} text-green-400`} role="img" aria-label="Planta sana">🌱</span>;
    case PlantHealth.STRESSED:
      return <span className={`${baseClasses} text-yellow-400 opacity-80`} role="img" aria-label="Planta estresada">🍂</span>;
    case PlantHealth.DEAD:
      return <span className={`${baseClasses} text-amber-800 opacity-60`} role="img" aria-label="Planta muerta">🥀</span>;
    default:
      return <span className={`${baseClasses} text-gray-500`} role="img" aria-label="Planta">?</span>;
  }
};


const PlantVisual: React.FC<PlantVisualProps> = ({ health, day, totalDays, isRunning }) => {
  const progress = isRunning ? (day / totalDays) * 100 : 0;

  const getHealthText = () => {
    switch (health) {
      case PlantHealth.HEALTHY: return "Saludable";
      case PlantHealth.STRESSED: return "Estresada";
      case PlantHealth.DEAD: return "Muerta";
      default: return "Esperando simulación";
    }
  };
  
  const getHealthColor = () => {
    switch (health) {
      case PlantHealth.HEALTHY: return "bg-green-500";
      case PlantHealth.STRESSED: return "bg-yellow-500";
      case PlantHealth.DEAD: return "bg-red-700";
      default: return "bg-slate-600";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 h-full">
      <div className="flex-grow flex items-center justify-center">
         <div className="text-8xl md:text-9xl transform transition-transform duration-500 hover:scale-105">
           <PlantIcon health={health} />
         </div>
      </div>
      <div className="w-full mt-4 text-center">
        <p className={`text-xl font-bold transition-colors duration-500 ${
            health === PlantHealth.HEALTHY ? 'text-green-400' : 
            health === PlantHealth.STRESSED ? 'text-yellow-400' :
            health === PlantHealth.DEAD ? 'text-red-500' : 'text-slate-400'
          }`}>{getHealthText()}</p>
        
        <div className="w-full bg-slate-700 rounded-full h-2.5 mt-4">
          <div className={`h-2.5 rounded-full transition-all duration-300 ${getHealthColor()}`} style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-slate-400 mt-2">Día de Simulación: {day} / {totalDays}</p>
      </div>
    </div>
  );
};

export default PlantVisual;
