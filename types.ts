
export enum Bacteria {
  NO_INOCULATION = "NO_INOCULATION",
  P_PUTIDA = "P_PUTIDA",
  MICROBACTERIUM_3J1 = "MICROBACTERIUM_3J1",
  RHODOCOCCUS_4J2A2 = "RHODOCOCCUS_4J2A2",
  LEUCOBACTER_4J7B1 = "LEUCOBACTER_4J7B1",
  ARTHROBACTER_4J27 = "ARTHROBACTER_4J27",
  ARTHROBACTER_5J12A = "ARTHROBACTER_5J12A",
}

export enum Xeroprotectant {
  NONE = "NONE",
  TREHALOSE = "TREHALOSE",
  SYNTHESIZED = "SYNTHESIZED",
}

export enum Condition {
  OPTIMAL = "OPTIMAL",
  DROUGHT = "DROUGHT",
}

export enum PlantHealth {
  HEALTHY = "HEALTHY",
  STRESSED = "STRESSED",
  DEAD = "DEAD",
}

export interface Scenario {
  bacteria: Bacteria;
  xeroprotectant: Xeroprotectant;
  condition: Condition;
}

export interface DailyData {
  day: number;
  CRA: number; // Relative Water Content
  IRA: number; // Water Retention Index
}

export interface FinalData {
  PF: number; // Fresh Weight
  PS: number; // Dry Weight
  PTT: number; // Turgid Weight
}

export interface SimulationResult {
  dailyData: DailyData[];
  finalData: FinalData;
  finalHealth: PlantHealth;
}

export interface InfoContent {
  title: string;
  content: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}
