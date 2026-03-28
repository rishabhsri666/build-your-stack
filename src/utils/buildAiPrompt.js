// src/utils/buildAiPrompt.js

export function buildAiPrompt(nodes, edges, staticAnalysis) {
  const components = nodes.map((n) => n.data.label).join(', ')

  const connections = edges.map((e) => {
    const source = nodes.find((n) => n.id === e.source)?.data.label ?? e.source
    const target = nodes.find((n) => n.id === e.target)?.data.label ?? e.target
    return `${source} → ${target}`
  })

  const layers = Object.entries(staticAnalysis.grouped)
    .map(([type, comps]) => `  ${type}: ${comps.map((c) => c.label).join(', ')}`)
    .join('\n')

  const existingWarnings = staticAnalysis.warnings.map((w) => `  - ${w.message}`).join('\n')

  return `You are a senior software architect reviewing a tech stack chosen by a developer.

The developer has selected the following stack:

COMPONENTS: ${components}

LAYERS:
${layers}

${connections.length > 0 ? `DATA FLOW CONNECTIONS:\n${connections.map((c) => `  ${c}`).join('\n')}` : 'No connections defined yet.'}

${existingWarnings ? `KNOWN ISSUES ALREADY FLAGGED:\n${existingWarnings}` : ''}

Complexity rating: ${staticAnalysis.complexity.label} (${staticAnalysis.complexity.score}/10)

---

Please analyze this stack and respond in the following exact JSON format. Do not include any text outside the JSON:

{
  "summary": "2-3 sentence honest architectural summary. Be specific to THIS stack, not generic.",
  "strengths": [
    "Specific strength of this exact combination (not just individual tools)",
    "Another genuine strength",
    "A third if applicable"
  ],
  "concerns": [
    "A real architectural concern specific to this combination",
    "Another concern with practical consequences",
    "A third if applicable"
  ],
  "suggestions": [
    {
      "title": "Short action title",
      "detail": "Specific, actionable suggestion for improving this stack"
    },
    {
      "title": "Another suggestion title",
      "detail": "Detail about the suggestion"
    }
  ],
  "scalability": {
    "rating": "Good | Moderate | Poor",
    "note": "One specific sentence about how this stack scales and where the bottleneck is."
  },
  "bestFor": "One sentence describing the ideal project type for this exact stack.",
  "learnNext": [
    "Specific technology or concept this developer should learn to use this stack better",
    "Another learning recommendation",
    "A third"
  ]
}

Rules:
- Be specific to the actual components chosen. Never give generic advice.
- If the stack has real problems, say so honestly.
- Keep each string concise — max 2 sentences per field.
- The suggestions must be actionable, not vague.
- learnNext should be concrete skills, not "learn more about X".`
}