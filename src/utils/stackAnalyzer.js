// src/utils/stackAnalyzer.js
import { stackKnowledge } from './stackKnowledge'
import { useCaseTemplates } from './useCaseTemplates'

// ─── Helpers ────────────────────────────────────────────────────────────────

function getKnowledge(componentId) {
  return stackKnowledge[componentId] ?? null
}

function groupByType(components) {
  return components.reduce((acc, comp) => {
    const type = comp.type ?? 'other'
    if (!acc[type]) acc[type] = []
    acc[type].push(comp)
    return acc
  }, {})
}

// ─── Conflict Detection ──────────────────────────────────────────────────────

function detectConflicts(components) {
  const warnings = []
  const ids = components.map((c) => c.componentId)

  components.forEach((comp) => {
    const knowledge = getKnowledge(comp.componentId)
    if (!knowledge) return

    knowledge.conflicts_with?.forEach((conflictId) => {
      if (ids.includes(conflictId) && !warnings.find(
        (w) => w.ids.includes(comp.componentId) && w.ids.includes(conflictId)
      )) {
        const conflictComp = components.find((c) => c.componentId === conflictId)
        warnings.push({
          ids: [comp.componentId, conflictId],
          message: `${comp.label} and ${conflictComp?.label ?? conflictId} conflict — you typically use one or the other, not both.`,
          severity: 'warning',
        })
      }
    })
  })

  return warnings
}

// ─── Missing Layer Detection ─────────────────────────────────────────────────

function detectMissingLayers(grouped) {
  const suggestions = []

  if (!grouped.frontend) {
    suggestions.push({ message: 'No frontend detected. Consider adding React, Next.js, or Vue.', severity: 'info' })
  }
  if (!grouped.backend && !grouped.database) {
    suggestions.push({ message: 'No backend or database detected. Your stack has no data layer.', severity: 'info' })
  }
  if (grouped.backend && !grouped.database) {
    suggestions.push({ message: 'You have a backend but no database. Consider adding PostgreSQL or MongoDB.', severity: 'info' })
  }
  if (grouped.database && !grouped.auth) {
    suggestions.push({ message: 'Consider adding an auth layer. Firebase Auth, Clerk, or Auth0 are great options.', severity: 'info' })
  }

  return suggestions
}

// ─── Architecture Description ─────────────────────────────────────────────────

function buildArchitectureDescription(components, edges, grouped) {
  if (components.length === 0) return ''

  const layers = []

  if (grouped.frontend?.length) {
    const names = grouped.frontend.map((c) => c.label).join(', ')
    layers.push(`The frontend is built with **${names}**, serving the user interface.`)
  }
  if (grouped.backend?.length) {
    const names = grouped.backend.map((c) => c.label).join(', ')
    layers.push(`The backend is powered by **${names}**, handling business logic and API requests.`)
  }
  if (grouped.database?.length) {
    const names = grouped.database.map((c) => c.label).join(', ')
    layers.push(`Data is persisted in **${names}**.`)
  }
  if (grouped.auth?.length) {
    const names = grouped.auth.map((c) => c.label).join(', ')
    layers.push(`Authentication is managed by **${names}**.`)
  }
  if (grouped.hosting?.length) {
    const names = grouped.hosting.map((c) => c.label).join(', ')
    layers.push(`The application is deployed on **${names}**.`)
  }

  if (edges.length > 0) {
    layers.push(`The stack has **${edges.length} connection${edges.length !== 1 ? 's' : ''}** defining the data flow between services.`)
  }

  return layers.join(' ')
}

// ─── Pros & Cons Aggregation ─────────────────────────────────────────────────

function aggregateProsCons(components) {
  const allPros = []
  const allCons = []

  components.forEach((comp) => {
    const knowledge = getKnowledge(comp.componentId)
    if (!knowledge) return
    knowledge.pros?.forEach((pro) => allPros.push({ text: pro, source: comp.label }))
    knowledge.cons?.forEach((con) => allCons.push({ text: con, source: comp.label }))
  })

  // Deduplicate by text similarity (simple)
  const uniquePros = allPros.filter(
    (pro, idx) => allPros.findIndex((p) => p.text === pro.text) === idx
  )
  const uniqueCons = allCons.filter(
    (con, idx) => allCons.findIndex((c) => c.text === con.text) === idx
  )

  return { pros: uniquePros.slice(0, 8), cons: uniqueCons.slice(0, 8) }
}

// ─── Use Case Matching ────────────────────────────────────────────────────────

function matchUseCases(components, grouped) {
  const componentIds = components.map((c) => c.componentId)

  return useCaseTemplates
    .map((template) => {
      let score = 0

      // Score by direct component match
      if (template.matchComponents) {
        template.matchComponents.forEach((id) => {
          if (componentIds.includes(id)) score += 2
        })
      }

      // Score by layer completeness
      if (template.requires) {
        if (template.requires.frontend && grouped.frontend) score += 1
        if (template.requires.backend && grouped.backend) score += 1
        if (template.requires.database && grouped.database) score += 1
        if (template.requires.auth && grouped.auth) score += 1
      }

      return { ...template, score }
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // top 3 matches
}

// ─── Stack Complexity Score ───────────────────────────────────────────────────

function calculateComplexityScore(components, edges) {
  const layerCount = new Set(components.map((c) => {
    const k = getKnowledge(c.componentId)
    return k?.type ?? 'other'
  })).size

  const score = Math.min(
    10,
    Math.round((components.length * 1.5 + edges.length * 0.5 + layerCount * 1) / 1.5)
  )

  if (score <= 3) return { score, label: 'Simple', color: '#22c55e' }
  if (score <= 6) return { score, label: 'Moderate', color: '#f59e0b' }
  return { score, label: 'Complex', color: '#ef4444' }
}

// ─── Main Analyzer ────────────────────────────────────────────────────────────

export function analyzeStack(nodes, edges) {
  // Extract component data from React Flow node format
  const components = nodes.map((node) => ({
    nodeId: node.id,
    componentId: node.data.componentId,
    label: node.data.label,
    emoji: node.data.emoji,
    color: node.data.color,
    category: node.data.category,
    type: getKnowledge(node.data.componentId)?.type ?? 'other',
  }))

  const grouped = groupByType(components)
  const conflicts = detectConflicts(components)
  const missingLayers = detectMissingLayers(grouped)
  const { pros, cons } = aggregateProsCons(components)
  const useCases = matchUseCases(components, grouped)
  const complexity = calculateComplexityScore(components, edges)
  const architecture = buildArchitectureDescription(components, edges, grouped)
  const allWarnings = [...conflicts, ...missingLayers]

  return {
    components,
    grouped,
    architecture,
    pros,
    cons,
    useCases,
    complexity,
    warnings: allWarnings,
    isEmpty: components.length === 0,
  }
}