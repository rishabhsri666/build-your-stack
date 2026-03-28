// src/components/layout/DetailsPanel.jsx
import { useStackAnalysis } from '../../hooks/useStackAnalysis'
import { useAiAnalysis } from '../../hooks/useAiAnalysis'
import AiAnalyzeButton from '../ui/AiAnalyzeButton'
import AiAnalysisResult from '../ui/AiAnalysisResult'
import clsx from 'clsx'

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2.5 px-1"
      style={{ color: 'var(--color-text-subtle)' }}
    >
      {title}
    </p>
  )
}

function Card({ children }) {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      {children}
    </div>
  )
}

function ComplexityBar({ complexity }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white font-medium">Stack Complexity</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: `${complexity.color}18`,
            color: complexity.color,
            border: `1px solid ${complexity.color}30`,
          }}
        >
          {complexity.label}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${(complexity.score / 10) * 100}%`,
            background: `linear-gradient(90deg, ${complexity.color}99, ${complexity.color})`,
          }}
        />
      </div>
    </Card>
  )
}

function WarningItem({ warning }) {
  const isConflict = warning.severity === 'warning'
  return (
    <div
      className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-xs leading-relaxed"
      style={{
        background: isConflict ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)',
        border: `1px solid ${isConflict ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
        color: isConflict ? '#fca5a5' : '#fcd34d',
      }}
    >
      <span className="flex-shrink-0 mt-0.5">{isConflict ? '⚠' : '💡'}</span>
      <span>{warning.message}</span>
    </div>
  )
}

function Divider() {
  return (
    <div
      className="my-4 h-px w-full"
      style={{ background: 'var(--color-border)' }}
    />
  )
}

// ── Main Panel ────────────────────────────────────────────────────────────────

export default function DetailsPanel({ nodes = [], edges = [] }) {
  const analysis = useStackAnalysis(nodes, edges)
  const { analyze, status, result, error, cooldown, reset } = useAiAnalysis()

  const handleAnalyze = () => {
    analyze(nodes, edges, analysis)
  }

  return (
    <aside
      className="w-72 h-full flex flex-col overflow-hidden animate-slide-right"
      style={{
        background: 'var(--color-surface)',
        borderLeft: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <h2
          className="text-sm font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Stack Analysis
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {analysis.isEmpty
            ? 'Add components to see insights'
            : `${nodes.length} component${nodes.length !== 1 ? 's' : ''} · ${edges.length} connection${edges.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Empty state */}
      {analysis.isEmpty ? (
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="text-center animate-fade-up">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              📊
            </div>
            <p className="text-sm font-medium text-white mb-1.5">No stack yet</p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Drag components onto the canvas to get architecture insights and AI-powered recommendations.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">

          {/* ── STATIC ANALYSIS ── */}

          {/* Complexity */}
          <div className="animate-fade-up stagger-1">
            <ComplexityBar complexity={analysis.complexity} />
          </div>

          {/* Architecture */}
          {analysis.architecture && (
            <div className="animate-fade-up stagger-2">
              <SectionHeader title="Architecture" />
              <Card>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {analysis.architecture.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                    i % 2 === 1
                      ? <strong key={i} className="text-white font-semibold">{part}</strong>
                      : <span key={i}>{part}</span>
                  )}
                </p>
              </Card>
            </div>
          )}

          {/* Warnings */}
          {analysis.warnings.length > 0 && (
            <div className="animate-fade-up stagger-2">
              <SectionHeader title="Warnings & Tips" />
              <div className="space-y-2">
                {analysis.warnings.map((w, i) => (
                  <WarningItem key={i} warning={w} />
                ))}
              </div>
            </div>
          )}

          {/* Pros */}
          {analysis.pros.length > 0 && (
            <div className="animate-fade-up stagger-3">
              <SectionHeader title="Strengths" />
              <Card>
                <ul className="space-y-2">
                  {analysis.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-emerald-400 flex-shrink-0 mt-0.5 font-bold">✓</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {pro.text}
                        <span className="ml-1 text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>
                          ({pro.source})
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Cons */}
          {analysis.cons.length > 0 && (
            <div className="animate-fade-up stagger-3">
              <SectionHeader title="Trade-offs" />
              <Card>
                <ul className="space-y-2">
                  {analysis.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-red-400 flex-shrink-0 mt-0.5 font-bold">✗</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {con.text}
                        <span className="ml-1 text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>
                          ({con.source})
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Use cases */}
          {analysis.useCases.length > 0 && (
            <div className="animate-fade-up stagger-4">
              <SectionHeader title="Best For" />
              <div className="space-y-2">
                {analysis.useCases.map((uc) => (
                  <div
                    key={uc.id}
                    className="rounded-xl p-3"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{uc.emoji}</span>
                      <span className="text-xs font-semibold text-white">{uc.name}</span>
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {uc.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {uc.examples.map((ex) => (
                        <span
                          key={ex}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            color: '#a5b4fc',
                          }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layer breakdown */}
          <div className="animate-fade-up stagger-5">
            <SectionHeader title="Layer Breakdown" />
            <Card>
              {Object.entries(analysis.grouped).map(([type, comps]) => (
                <div key={type} className="mb-3 last:mb-0">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--color-text-subtle)' }}
                  >
                    {type}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {comps.map((c) => (
                      <span
                        key={c.nodeId}
                        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg"
                        style={{
                          background: `${c.color}12`,
                          border: `1px solid ${c.color}30`,
                          color: c.color,
                        }}
                      >
                        {c.emoji} {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* ── AI SECTION DIVIDER ── */}
          <Divider />

          {/* AI Trigger or Result */}
          <div className="space-y-4 animate-fade-up stagger-6">

            {/* Error state */}
            {status === 'error' && error && (
              <div
                className="text-xs px-3 py-2.5 rounded-lg"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5',
                }}
              >
                {error}
              </div>
            )}

            {/* Show result OR the analyze button */}
            {status === 'success' && result ? (
              <AiAnalysisResult result={result} onReset={reset} />
            ) : (
              <div className="space-y-3">
                <div
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: 'rgba(99,102,241,0.04)',
                    border: '1px dashed rgba(99,102,241,0.2)',
                  }}
                >
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: '#a5b4fc' }}
                  >
                    ✦ AI-Powered Insights
                  </p>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: 'var(--color-text-subtle)' }}
                  >
                    Get contextual architecture analysis, scalability assessment, and personalized learning recommendations for your exact stack.
                  </p>
                </div>

                <AiAnalyzeButton
                  onClick={handleAnalyze}
                  status={status}
                  cooldown={cooldown}
                  disabled={analysis.isEmpty}
                />

                {cooldown && (
                  <p
                    className="text-[10px] text-center"
                    style={{ color: 'var(--color-text-subtle)' }}
                  >
                    Next analysis available in 30s
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      )}
    </aside>
  )
}