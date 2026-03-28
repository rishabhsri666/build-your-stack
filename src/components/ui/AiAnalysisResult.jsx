// src/components/ui/AiAnalysisResult.jsx
import clsx from 'clsx'

// ── Helpers ───────────────────────────────────────────────────────────────────

function AiSection({ title, children }) {
  return (
    <div className="space-y-2">
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: 'var(--color-text-subtle)' }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function AiCard({ children }) {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: 'rgba(99,102,241,0.05)',
        border: '1px solid rgba(99,102,241,0.15)',
      }}
    >
      {children}
    </div>
  )
}

function BulletList({ items, color = '#a5b4fc' }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-xs">
          <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color }}>
            ›
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ScalabilityBadge({ rating }) {
  const config = {
    Good:     { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)'  },
    Moderate: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)'  },
    Poor:     { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  }
  const style = config[rating] ?? config.Moderate

  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {rating}
    </span>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AiAnalysisResult({ result, onReset }) {
  if (!result) return null

  return (
    <div className="space-y-4 animate-fade-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-xs"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            ✦
          </div>
          <span
            className="text-xs font-semibold"
            style={{ color: '#a5b4fc' }}
          >
            AI Analysis
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-[10px] transition-colors px-2 py-1 rounded-lg"
          style={{ color: 'var(--color-text-subtle)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-muted)'
            e.currentTarget.style.background = 'var(--color-surface-2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-subtle)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          ✕ Clear
        </button>
      </div>

      {/* Summary */}
      <AiSection title="Architecture Summary">
        <AiCard>
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {result.summary}
          </p>
        </AiCard>
      </AiSection>

      {/* Best For */}
      {result.bestFor && (
        <AiSection title="Best For">
          <AiCard>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              🎯 {result.bestFor}
            </p>
          </AiCard>
        </AiSection>
      )}

      {/* Scalability */}
      {result.scalability && (
        <AiSection title="Scalability">
          <AiCard>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Rating
              </span>
              <ScalabilityBadge rating={result.scalability.rating} />
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {result.scalability.note}
            </p>
          </AiCard>
        </AiSection>
      )}

      {/* Strengths */}
      {result.strengths?.length > 0 && (
        <AiSection title="AI-Identified Strengths">
          <AiCard>
            <BulletList items={result.strengths} color="#4ade80" />
          </AiCard>
        </AiSection>
      )}

      {/* Concerns */}
      {result.concerns?.length > 0 && (
        <AiSection title="Architectural Concerns">
          <AiCard>
            <BulletList items={result.concerns} color="#f87171" />
          </AiCard>
        </AiSection>
      )}

      {/* Suggestions */}
      {result.suggestions?.length > 0 && (
        <AiSection title="Suggestions">
          <div className="space-y-2">
            {result.suggestions.map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{
                  background: 'rgba(99,102,241,0.05)',
                  border: '1px solid rgba(99,102,241,0.15)',
                }}
              >
                <p className="text-xs font-semibold text-white mb-1">
                  {s.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </AiSection>
      )}

      {/* Learn Next */}
      {result.learnNext?.length > 0 && (
        <AiSection title="Learn Next">
          <AiCard>
            <div className="space-y-1.5">
              {result.learnNext.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold w-4 h-4 rounded flex items-center 
                               justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(99,102,241,0.2)',
                      color: '#a5b4fc',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </AiCard>
        </AiSection>
      )}

      {/* Footer timestamp */}
      <p
        className="text-[10px] text-center pb-1"
        style={{ color: 'var(--color-text-subtle)' }}
      >
        Generated by Groq · {new Date().toLocaleTimeString()}
      </p>
    </div>
  )
}