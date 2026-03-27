// src/hooks/useStackAnalysis.js
import { useMemo } from 'react'
import { analyzeStack } from '../utils/stackAnalyzer'

export function useStackAnalysis(nodes, edges) {
  const analysis = useMemo(
    () => analyzeStack(nodes, edges),
    // Stringify is necessary — React Flow mutates node objects in place
    // so a reference check alone would miss position changes etc.
    // We only care about the component composition, not position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      nodes.map((n) => n.data.componentId).join(','),
      edges.map((e) => `${e.source}-${e.target}`).join(','),
    ]
  )

  return analysis
}