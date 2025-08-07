
import { Bacteria, Condition, Xeroprotectant, PlantHealth, SimulationResult, InfoContent, GlossaryTerm, Scenario } from './types';

export const BACTERIA_OPTIONS = {
  [Bacteria.NO_INOCULATION]: "Sin Inocular (Control)",
  [Bacteria.P_PUTIDA]: "Pseudomonas putida KT2440",
  [Bacteria.MICROBACTERIUM_3J1]: "Microbacterium sp. 3J1",
  [Bacteria.RHODOCOCCUS_4J2A2]: "Rhodococcus sp. 4J2A2",
  [Bacteria.LEUCOBACTER_4J7B1]: "Leucobacter sp. 4J7B1",
  [Bacteria.ARTHROBACTER_4J27]: "Arthrobacter sp. 4J27",
  [Bacteria.ARTHROBACTER_5J12A]: "Arthrobacter sp. 5J12A",
};

export const XEROPROTECTANT_OPTIONS = {
  [Xeroprotectant.NONE]: "Ninguno",
  [Xeroprotectant.TREHALOSE]: "Trealosa",
  [Xeroprotectant.SYNTHESIZED]: "Xeroprotector Sintetizado",
};

export const CONDITION_OPTIONS = {
  [Condition.OPTIMAL]: "Riego Óptimo",
  [Condition.DROUGHT]: "Condiciones de Sequía",
};

// Mock simulation data based on thesis concepts
const SIMULATION_DATA_MAP: Map<string, SimulationResult> = new Map();

function generateKey(scenario: Scenario): string {
  return `${scenario.bacteria}|${scenario.xeroprotectant}|${scenario.condition}`;
}

function generateDailyData(days: number, startCra: number, endCra: number, startIra: number, endIra: number): { dailyData: any[], finalHealth: PlantHealth } {
  const data = [];
  let finalHealth = PlantHealth.HEALTHY;
  for (let i = 1; i <= days; i++) {
    const progress = i / days;
    const currentCra = startCra - (startCra - endCra) * progress * progress; // non-linear drop
    const currentIra = startIra - (startIra - endIra) * progress;
    data.push({ day: i, CRA: parseFloat(currentCra.toFixed(2)), IRA: parseFloat(currentIra.toFixed(2)) });
  }
  const finalCra = data[data.length - 1].CRA;
  if (finalCra < 45) finalHealth = PlantHealth.DEAD;
  else if (finalCra < 70) finalHealth = PlantHealth.STRESSED;
  else finalHealth = PlantHealth.HEALTHY;

  return { dailyData: data, finalHealth };
}

// Baseline Data
const baselineOptimal = { pf: 15, ps: 1.5, ptt: 16 };
const baselineDrought = { pf: 3, ps: 0.8, ptt: 3.2 };

// Populate Map for all combinations
for (const bacteria of Object.values(Bacteria)) {
  for (const xeroprotectant of Object.values(Xeroprotectant)) {
    for (const condition of Object.values(Condition)) {
      const scenario = { bacteria, xeroprotectant, condition };
      const key = generateKey(scenario);
      
      let craRange = { start: 98, end: 95 };
      let iraRange = { start: 100, end: 98 };
      let finalWeights = { ...baselineOptimal };
      
      if (condition === Condition.DROUGHT) {
        craRange = { start: 98, end: 30 };
        iraRange = { start: 95, end: 20 };
        finalWeights = { ...baselineDrought };

        // Bacteria effect
        if (bacteria !== Bacteria.NO_INOCULATION) {
          craRange.end += 15;
          iraRange.end += 20;
          finalWeights.pf += 4;
          finalWeights.ps += 0.3;
          finalWeights.ptt += 4;
        }
        if ([Bacteria.MICROBACTERIUM_3J1, Bacteria.ARTHROBACTER_5J12A].includes(bacteria)) {
          craRange.end += 15; // These are better
          iraRange.end += 15;
          finalWeights.pf += 3;
        }
        
        // Xeroprotectant effect
        if (xeroprotectant === Xeroprotectant.TREHALOSE) {
          craRange.end += 8;
          iraRange.end += 10;
          finalWeights.pf += 2;
        } else if (xeroprotectant === Xeroprotectant.SYNTHESIZED) {
          craRange.end += 18;
          iraRange.end += 25;
          finalWeights.pf += 4;
        }
      }
      
      // Cap values
      craRange.end = Math.min(craRange.end, 95);
      iraRange.end = Math.min(iraRange.end, 98);

      const { dailyData, finalHealth } = generateDailyData(25, craRange.start, craRange.end, iraRange.start, iraRange.end);
      
      SIMULATION_DATA_MAP.set(key, {
        dailyData,
        finalHealth,
        finalData: { PF: finalWeights.pf, PS: finalWeights.ps, PTT: finalWeights.ptt },
      });
    }
  }
}

export function getSimulationData(scenario: Scenario): SimulationResult | undefined {
  return SIMULATION_DATA_MAP.get(generateKey(scenario));
}

export const INFO_CONTENT: Record<string, InfoContent> = {
  pgpr: {
    title: "Rizobacterias Promotoras del Crecimiento Vegetal (PGPR)",
    content: "Las PGPR son un grupo de bacterias que colonizan las raíces de las plantas y mejoran su crecimiento. Lo hacen a través de varios mecanismos, como la producción de hormonas vegetales, la mejora de la absorción de nutrientes y la protección contra patógenos. En esta tesis, se aislaron y estudiaron nuevas cepas por su capacidad para ayudar a las plantas a sobrevivir en condiciones de sequía."
  },
  xeroprotectant: {
    title: "Xeroprotectores",
    content: "Los xeroprotectores son compuestos que protegen a las células del daño causado por la deshidratación extrema. La trealosa es un azúcar natural conocido por esta propiedad. En la tesis, se investigó tanto la trealosa como un xeroprotector sintetizado por una de las cepas bacterianas para evaluar su eficacia en la protección de las plantas."
  },
  drought: {
    title: "Estrés por Sequía",
    content: "El estrés por sequía ocurre cuando una planta pierde agua más rápido de lo que puede absorberla del suelo. Esto lleva a una reducción en el contenido de agua relativo (CRA), marchitamiento, cierre de estomas, y si es prolongado, puede detener el crecimiento y causar la muerte de la planta. El objetivo es encontrar métodos biotecnológicos para mitigar estos efectos."
  }
};

export const THESIS_CONCLUSIONS: InfoContent = {
  title: "Conclusiones Principales de la Tesis",
  content: `
    <ul class="list-disc space-y-2 pl-5">
      <li>Se aislaron y caracterizaron con éxito múltiples cepas bacterianas del género Arthrobacter, Microbacterium, Rhodococcus y Leucobacter de ambientes áridos.</li>
      <li>Las cepas Microbacterium sp. 3J1 y Arthrobacter sp. 5J12A demostraron ser las más eficaces como PGPR, mejorando significativamente la supervivencia y el crecimiento de las plantas de rábano bajo estrés hídrico.</li>
      <li>La aplicación combinada de inoculación bacteriana con xeroprotectores (especialmente el sintetizado) proporcionó el mayor nivel de protección contra la sequía, manteniendo un alto contenido de agua relativo y biomasa.</li>
      <li>Estos hallazgos sugieren que el uso de estas cepas bacterianas, solas o en combinación con xeroprotectores, es una estrategia prometedora y sostenible para mejorar la productividad agrícola en regiones afectadas por la escasez de agua.</li>
    </ul>
  `
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "PGPR", definition: "Rizobacterias Promotoras del Crecimiento Vegetal. Bacterias del suelo que viven cerca o sobre las raíces de las plantas y estimulan su crecimiento." },
  { term: "Desecación", definition: "El estado de sequedad extrema, o el proceso de secado extremo." },
  { term: "Xeroprotector", definition: "Una sustancia que protege a las células y macromoléculas del daño inducido por la deshidratación." },
  { term: "CRA (Contenido Relativo de Agua)", definition: "Una medida del estado hídrico de una planta, que indica el nivel de turgencia y la salud general en relación con la máxima retención de agua posible." },
  { term: "IRA (Índice de Retención de Agua)", definition: "Indica la capacidad de la planta para retener agua a lo largo del tiempo, un indicador clave de la tolerancia a la sequía." },
  { term: "Biomasa", definition: "El peso total de la materia vegetal, usualmente medido como peso fresco (PF) y peso seco (PS)." }
];
