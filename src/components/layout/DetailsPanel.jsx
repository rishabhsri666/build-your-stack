// src/components/layout/DetailsPanel.jsx
import { useStackAnalysis } from '../../hooks/useStackAnalysis'
import clsx from 'clsx'

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-3 py-2 bg-gray-800/60 border-b border-gray-800">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {title}
        </p>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

function ComplexityBar({ complexity }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(complexity.score / 10) * 100}%`,
            backgroundColor: complexity.color,
          }}
        />
      </div>
      <span
        className="text-xs font-semibold"
        style={{ color: complexity.color }}
      >
        {complexity.label}
      </span>
    </div>
  )
}

function WarningBadge({ warning }) {
  const isConflict = warning.severity === 'warning'
  return (
    <div
      className={clsx(
        'flex items-start gap-2 px-3 py-2 rounded-lg text-xs',
        isConflict
          ? 'bg-red-950/50 border border-red-900/50 text-red-300'
          : 'bg-amber-950/50 border border-amber-900/50 text-amber-300'
      )}
    >
      <span className="mt-0.5 flex-shrink-0">{isConflict ? '⚠️' : '💡'}</span>
      <span className="leading-relaxed">{warning.message}</span>
    </div>
  )
}

// ── Main Panel ────────────────────────────────────────────────────────────────

export default function DetailsPanel({ nodes = [], edges = [] }) {
  const analysis = useStackAnalysis(nodes, edges)

  if (analysis.isEmpty) {
    return (
      <aside className="w-72 h-full bg-gray-900 border-l border-gray-800 flex flex-col">
        <PanelHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Drag components onto the canvas to see your stack analysis here.
            </p>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-72 h-full bg-gray-900 border-l border-gray-800 flex flex-col">
      <PanelHeader />

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

        {/* Complexity */}
        <Section title="Complexity">
          <ComplexityBar complexity={analysis.complexity} />
          <p className="text-xs text-gray-500 mt-2">
            {nodes.length} component{nodes.length !== 1 ? 's' : ''} ·{' '}
            {edges.length} connection{edges.length !== 1 ? 's' : ''}
          </p>
        </Section>

        {/* Architecture Description */}
        {analysis.architecture && (
          <Section title="Architecture">
            <p className="text-xs text-gray-300 leading-relaxed">
              {/* Render **bold** markers */}
              {analysis.architecture.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                i % 2 === 1
                  ? <strong key={i} className="text-white font-semibold">{part}</strong>
                  : <span key={i}>{part}</span>
              )}
            </p>
          </Section>
        )}

        {/* Warnings & Suggestions */}
        {analysis.warnings.length > 0 && (
          <Section title="Warnings & Suggestions">
            <div className="space-y-2">
              {analysis.warnings.map((w, i) => (
                <WarningBadge key={i} warning={w} />
              ))}
            </div>
          </Section>
        )}

        {/* Pros */}
        {analysis.pros.length > 0 && (
          <Section title="Strengths">
            <ul className="space-y-1.5">
              {analysis.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">
                    {pro.text}
                    <span className="text-gray-600 ml-1">({pro.source})</span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Cons */}
        {analysis.cons.length > 0 && (
          <Section title="Trade-offs">
            <ul className="space-y-1.5">
              {analysis.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className="leading-relaxed">
                    {con.text}
                    <span className="text-gray-600 ml-1">({con.source})</span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Use Cases */}
        {analysis.useCases.length > 0 && (
          <Section title="Best For">
            <div className="space-y-2">
              {analysis.useCases.map((uc) => (
                <div
                  key={uc.id}
                  className="bg-gray-800/60 rounded-lg p-2.5 border border-gray-700/50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{uc.emoji}</span>
                    <span className="text-xs font-semibold text-white">{uc.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-1.5">
                    {uc.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {uc.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Stack composition by layer */}
        <Section title="Stack Layers">
          {Object.entries(analysis.grouped).map(([type, comps]) => (
            <div key={type} className="mb-2 last:mb-0">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-1">
                {type}
              </p>
              <div className="flex flex-wrap gap-1">
                {comps.map((c) => (
                  <span
                    key={c.nodeId}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${c.color}15`,
                      borderColor: `${c.color}40`,
                      color: c.color,
                    }}
                  >
                    {c.emoji} {c.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Section>

      </div>
    </aside>
  )
}

function PanelHeader() {
  return (
    <div className="px-4 py-5 border-b border-gray-800 flex-shrink-0">
      <h2 className="text-sm font-semibold text-white">Stack Analysis</h2>
      <p className="text-xs text-gray-500 mt-0.5">Live insights as you build</p>
    </div>
  )
}