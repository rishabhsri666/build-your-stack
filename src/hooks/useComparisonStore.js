// src/hooks/useComparisonStore.js
import { useStackStore } from './useStackStore'
import { useStackAnalysis } from './useStackAnalysis'

export function useComparisonStore() {
  const storeA = useStackStore()
  const storeB = useStackStore()

  const analysisA = useStackAnalysis(storeA.nodes, storeA.edges)
  const analysisB = useStackAnalysis(storeB.nodes, storeB.edges)

  return { storeA, storeB, analysisA, analysisB }
}