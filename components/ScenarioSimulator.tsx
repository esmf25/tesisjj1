
import React, { useState, useEffect, useCallback } from 'react';
import { Bacteria, Condition, DailyData, FinalData, InfoContent, PlantHealth, Scenario, SimulationResult, Xeroprotectant } from '../types';
import { getSimulationData } from '../constants';
import ControlPanel from './ControlPanel';
import PlantVisual from './PlantVisual';
import DataCharts from './DataCharts';
import InfoModal from './InfoModal';

const TOTAL_DAYS = 25;
const SIMULATION_DURATION_MS = 5000;

const ScenarioSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>({
    bacteria: Bacteria.NO_INOCULATION,
    xeroprotectant: Xeroprotectant.NONE,
    condition: Condition.OPTIMAL,
  });

  const [simulationData, setSimulationData] = useState<SimulationResult | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [displayedDailyData, setDisplayedDailyData] = useState<DailyData[]>([]);
  const [finalChartData, setFinalChartData] = useState<FinalData | null>(null);
  const [plantHealth, setPlantHealth] = useState<PlantHealth>(PlantHealth.HEALTHY);
  
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [modalContent, setModalContent] = useState<InfoContent | null>(null);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    setCurrentDay(0);
    setSimulationData(null);
    setDisplayedDailyData([]);
    setFinalChartData(null);
    const initialData = getSimulationData({
      bacteria: scenario.bacteria,
      xeroprotectant: scenario.xeroprotectant,
      condition: scenario.condition,
    });
    if (initialData) {
      setPlantHealth(initialData.dailyData[0].CRA > 70 ? PlantHealth.HEALTHY : PlantHealth.STRESSED);
    }
  }, [scenario]);

  useEffect(() => {
    resetSimulation();
  }, [scenario, resetSimulation]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && simulationData) {
      interval = setInterval(() => {
        setCurrentDay(prevDay => {
          const nextDay = prevDay + 1;
          if (nextDay > TOTAL_DAYS) {
            clearInterval(interval);
            setIsRunning(false);
            setIsFinished(true);
            setFinalChartData(simulationData.finalData);
            setPlantHealth(simulationData.finalHealth);
            return TOTAL_DAYS;
          }

          const currentSlice = simulationData.dailyData.slice(0, nextDay);
          setDisplayedDailyData(currentSlice);

          const lastDataPoint = currentSlice[currentSlice.length - 1];
          if (lastDataPoint) {
            if (lastDataPoint.CRA < 45) setPlantHealth(PlantHealth.DEAD);
            else if (lastDataPoint.CRA < 70) setPlantHealth(PlantHealth.STRESSED);
            else setPlantHealth(PlantHealth.HEALTHY);
          }
          
          return nextDay;
        });
      }, SIMULATION_DURATION_MS / TOTAL_DAYS);
    }
    return () => clearInterval(interval);
  }, [isRunning, simulationData]);
  
  const handleSimulate = () => {
    const data = getSimulationData(scenario);
    if (data) {
      setSimulationData(data);
      setIsRunning(true);
      setIsFinished(false);
      setCurrentDay(0);
      setDisplayedDailyData([]);
      setFinalChartData(null);
    }
  };
  
  const handleReset = () => {
    resetSimulation();
  };

  const handleInfoClick = (content: InfoContent) => {
    setModalContent(content);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ControlPanel 
            scenario={scenario} 
            setScenario={setScenario}
            onSimulate={handleSimulate}
            onReset={handleReset}
            isRunning={isRunning}
            isFinished={isFinished}
            onInfoClick={handleInfoClick}
          />
        </div>
        <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <PlantVisual 
              health={plantHealth} 
              day={currentDay} 
              totalDays={TOTAL_DAYS}
              isRunning={isRunning}
            />
          </div>
          <div className="md:col-span-1 flex items-center">
            <DataCharts 
              dailyData={displayedDailyData} 
              finalData={finalChartData}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
      <InfoModal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
};

export default ScenarioSimulator;
