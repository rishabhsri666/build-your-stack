// src/components/comparison/ComparisonDiff.jsx
import clsx from 'clsx'

function DiffRow({ label, valueA, valueB }) {
  const same = valueA === valueB
  return (
    <div
      className="grid grid-cols-3 gap-2 py-2 text-xs"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <span style={{ color: 'var(--color-text-subtle)' }}>{label}</span>
      <span
        className="font-medium text-center"
        style={{ color: same ? 'var(--color-text-muted)' : '#6ee7b7' }}
      >
        {valueA}
      </span>
      <span
        className="font-medium text-center"
        style={{ color: same ? 'var(--color-text-muted)' : '#fca5a5' }}
      >
        {valueB}
      </span>
    </div>
  )
}

function ComponentDiff({ analysisA, analysisB }) {
  const idsA = new Set(analysisA.components.map((c) => c.componentId))
  const idsB = new Set(analysisB.components.map((c) => c.componentId))

  const onlyInA = analysisA.components.filter((c) => !idsB.has(c.componentId))
  const onlyInB = analysisB.components.filter((c) => !idsA.has(c.componentId))
  const inBoth  = analysisA.components.filter((c) =>  idsB.has(c.componentId))

  return (
    <div className="space-y-3">
      {inBoth.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
             style={{ color: 'var(--color-text-subtle)' }}>
            Shared
          </p>
          <div className="flex flex-wrap gap-1">
            {inBoth.map((c) => (
              <span
                key={c.componentId}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                  color: c.color,
                }}
              >
                {c.emoji} {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {onlyInA.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
             style={{ color: '#6ee7b7' }}>
            Only in Stack A
          </p>
          <div className="flex flex-wrap gap-1">
            {onlyInA.map((c) => (
              <span
                key={c.componentId}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.25)', color: '#6ee7b7' }}
              >
                {c.emoji} {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {onlyInB.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
             style={{ color: '#fca5a5' }}>
            Only in Stack B
          </p>
          <div className="flex flex-wrap gap-1">
            {onlyInB.map((c) => (
              <span
                key={c.componentId}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(252,165,165,0.1)', border: '1px solid rgba(252,165,165,0.25)', color: '#fca5a5' }}
              >
                {c.emoji} {c.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ComparisonDiff({ analysisA, analysisB }) {
  const isEmpty = analysisA.isEmpty && analysisB.isEmpty

  return (
    <div
      className="w-64 flex-shrink-0 h-full overflow-y-auto flex flex-col"
      style={{
        background: 'var(--color-surface)',
        borderLeft: '1px solid var(--color-border)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <h3
          className="text-sm font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Comparison
        </h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          A vs B
        </p>
      </div>

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-xs text-center" style={{ color: 'var(--color-text-subtle)' }}>
            Add components to both canvases to compare stacks
          </p>
        </div>
      ) : (
        <div className="flex-1 px-4 py-4 space-y-5">

          {/* Stats comparison */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
               style={{ color: 'var(--color-text-subtle)' }}>
              Stats
            </p>
            <div
              className="grid grid-cols-3 gap-2 pb-2 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text-subtle)', borderBottom: '1px solid var(--color-border)' }}
            >
              <span></span>
              <span className="text-center" style={{ color: '#6ee7b7' }}>A</span>
              <span className="text-center" style={{ color: '#fca5a5' }}>B</span>
            </div>
            <DiffRow
              label="Components"
              valueA={analysisA.components.length}
              valueB={analysisB.components.length}
            />
            <DiffRow
              label="Complexity"
              valueA={analysisA.isEmpty ? '—' : analysisA.complexity.label}
              valueB={analysisB.isEmpty ? '—' : analysisB.complexity.label}
            />
            <DiffRow
              label="Warnings"
              valueA={analysisA.warnings.length}
              valueB={analysisB.warnings.length}
            />
            <DiffRow
              label="Use Cases"
              valueA={analysisA.useCases.length}
              valueB={analysisB.useCases.length}
            />
          </div>

          {/* Component diff */}
          {(!analysisA.isEmpty || !analysisB.isEmpty) && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                 style={{ color: 'var(--color-text-subtle)' }}>
                Components
              </p>
              <ComponentDiff analysisA={analysisA} analysisB={analysisB} />
            </div>
          )}

          {/* Verdict */}
          {!analysisA.isEmpty && !analysisB.isEmpty && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                 style={{ color: 'var(--color-text-subtle)' }}>
                Verdict
              </p>
              <div
                className="rounded-xl p-3 text-xs leading-relaxed"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {analysisA.warnings.length < analysisB.warnings.length
                  ? '🟢 Stack A has fewer conflicts.'
                  : analysisB.warnings.length < analysisA.warnings.length
                  ? '🟢 Stack B has fewer conflicts.'
                  : '🟡 Both stacks have equal compatibility.'}
                {' '}
                {analysisA.complexity.score < analysisB.complexity.score
                  ? 'Stack A is simpler to maintain.'
                  : analysisB.complexity.score < analysisA.complexity.score
                  ? 'Stack B is simpler to maintain.'
                  : 'Both have similar complexity.'}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}