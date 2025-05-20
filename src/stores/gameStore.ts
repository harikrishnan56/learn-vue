import { defineStore } from 'pinia'

export interface StageTaskDetail {
  id: string
  description: string
  type?: 'orderByHeight' | 'findMissingNumber' | 'quiz' | 'comparisonQuiz' | 'binaryComparisonSymbols' | 'orderByTownPopulation' | 'compareTownPopulations'
  data?: any 
}

export interface ComparisonQuizData {
  questionText: string
  options: Array<{ id: string, label: string }>
}

export interface TownData {
  id: string
  label: string
  population: number
  giraffeCount: number
}

export interface StageTasks {
  primary: StageTaskDetail | null
  secondary: StageTaskDetail | null
  tertiary: StageTaskDetail | null
}

export interface GameState {
  currentStage: number
  stageTaskConfigurations: Record<number, StageTasks>
  showSecondaryObjectiveModal: boolean
  showTertiaryObjectiveModal: boolean
  gameHeaderMessage: string | null
  gameHeaderMessageType: 'info' | 'success' | 'error' | null
}

function generateTownPopulations(): TownData[] {
  const basePopulation = 2000;
  const towns: TownData[] = [];
  const usedPopulations = new Set<number>();

  for (let i = 0; i < 4; i++) {
    const label = String.fromCharCode(65 + i);
    let population;
    
    do {
      population = basePopulation + Math.floor(Math.random() * 4000) + 500;
    } while (usedPopulations.has(population));
    
    usedPopulations.add(population);
    
    towns.push({
      id: `town${label}`,
      label,
      population,
      giraffeCount: 3
    });
  }

  return towns;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => {
    const townData = generateTownPopulations();
    
    return {
      currentStage: 1,
      stageTaskConfigurations: {
        1: {
          primary: { id: 's1p1', description: 'Stage 1 - Primary: Order Giraffes', type: 'orderByHeight' },
          secondary: { id: 's1s1', description: 'Stage 1 - Secondary: Find Missing Number', type: 'findMissingNumber' },
          tertiary: { id: 's1t1', description: 'Stage 1 - Tertiary: Quick Quiz', type: 'quiz', data: { question: "What is a giraffe\\'s favorite food?" } },
        },
        2: {
          primary: { id: 's2p1', description: 'Stage 2 - Primary: Order Giraffes (Numbers < 100)', type: 'orderByHeight', data: { rangeMax: 99 } },
          secondary: { id: 's2s1', description: 'Stage 2 - Secondary: Find Missing Number (Numbers < 100)', type: 'findMissingNumber', data: { rangeMax: 99 } },
          tertiary: { 
            id: 's2t1', 
            description: 'Stage 2 - Tertiary: Comparison Quiz',
            type: 'comparisonQuiz',
            data: {
              questionText: "Who is the tallest Giraffe?",
              options: [
                { id: 'optA', label: 'A' },
                { id: 'optB', label: 'B' },
                { id: 'optC', label: 'C' },
                { id: 'optD', label: 'D' }
              ]
            }
          },
        },
        3: {
          primary: { id: 's3p1', description: 'Stage 3 - Primary: Order Giraffes (Numbers < 1000)', type: 'orderByHeight', data: { rangeMax: 999 } },
          secondary: { id: 's3s1', description: 'Stage 3 - Secondary: Find Missing Number (Numbers < 1000)', type: 'findMissingNumber', data: { rangeMax: 999 } },
          tertiary: {
            id: 's3t1',
            description: 'Stage 3 - Tertiary: Compare Giraffes with Symbols',
            type: 'binaryComparisonSymbols',
            data: {
              questionText: "How does giraffe A compare to giraffe B?",
              rangeMax: 999,
              options: [
                { id: 'gt', label: '>' },
                { id: 'lt', label: '<' },
                { id: 'eq', label: '=' }
              ]
            }
          }
        },
        4: {
          primary: { 
            id: 's4p1', 
            description: 'Stage 4 - Primary: Order Town Populations', 
            type: 'orderByTownPopulation', 
            data: { 
              questionText: 'Order the giraffe towns based on their population', 
              towns: townData
            } 
          },
          secondary: {
            id: 's4s1',
            description: 'Stage 4 - Secondary: Find Missing Town Population',
            type: 'findMissingNumber',
            data: {
              questionText: 'What could be the population of the new town?',
              rangeMax: 5000
            }
          },
          tertiary: {
            id: 's4t1',
            description: 'Stage 4 - Tertiary: Compare Town Populations',
            type: 'compareTownPopulations',
            data: {
              questionText: "How does the population of Town A compare to Town B?",
              townLabel1: "Town A",
              townLabel2: "Town B",
              options: [
                { id: 'gt', label: '>' },
                { id: 'lt', label: '<' },
                { id: 'eq', label: '=' }
              ]
            }
          }
        }
      },
      showSecondaryObjectiveModal: false,
      showTertiaryObjectiveModal: false,
      gameHeaderMessage: null,
      gameHeaderMessageType: null
    }
  },
  getters: {
    getCurrentStage(state): number {
      return state.currentStage
    },
    getCurrentStageTasks(state): StageTasks | undefined {
      return state.stageTaskConfigurations[state.currentStage]
    },
    hasNextStage(state): boolean {
      const nextStage = state.currentStage + 1
      return !!state.stageTaskConfigurations[nextStage]
    },
    getTaskByStageAndType(state) {
      return (stageNumber: number, taskType: 'primary' | 'secondary' | 'tertiary'): StageTaskDetail | null | undefined => {
        return state.stageTaskConfigurations[stageNumber]?.[taskType]
      }
    }
  },
  actions: {
    advanceStage() {
      if (this.hasNextStage) {
        this.currentStage++
        
        if (this.currentStage === 4) {
          const townData = generateTownPopulations();
          if (this.stageTaskConfigurations[4]?.primary?.data) {
            this.stageTaskConfigurations[4].primary.data.towns = townData;
          }
        }
      } else {
        this.currentStage = 1;
      }
    },
    setStage(stageNumber: number) {
      if (this.stageTaskConfigurations[stageNumber]) {
        this.currentStage = stageNumber
        
        if (stageNumber === 4) {
          const townData = generateTownPopulations();
          if (this.stageTaskConfigurations[4]?.primary?.data) {
            this.stageTaskConfigurations[4].primary.data.towns = townData;
          }
        }
      } else {
        // console.warn(\`Stage ${stageNumber} configuration not found.\`)
      }
    },
    resetGame() {
      this.currentStage = 1
    },
    initializeStage(stageNumber: number) {
      if (this.stageTaskConfigurations[stageNumber]) {
        this.currentStage = stageNumber
        
        if (stageNumber === 4) {
          const townData = generateTownPopulations();
          if (this.stageTaskConfigurations[4]?.primary?.data) {
            this.stageTaskConfigurations[4].primary.data.towns = townData;
          }
        }
      } else {
        this.currentStage = 1
      }
    },
    _updateStageTaskConfiguration(stageNumber: number, tasks: StageTasks) {
      this.stageTaskConfigurations[stageNumber] = tasks
    }
  },
}) 