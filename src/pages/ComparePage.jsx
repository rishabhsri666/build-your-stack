// src/pages/ComparePage.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import StackCanvas from '../components/canvas/StackCanvas'
import ComparisonDiff from '../components/comparison/ComparisonDiff'
import { useComparisonStore } from '../hooks/useComparisonStore'

function ComparePanel({ label, color, store, canvasRef }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Label */}
      <div
        className="px-5 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
          style={{ background: color }}
        >
          {label}
        </div>
        <span
          className="text-sm font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Stack {label}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'var(--color-text-subtle)' }}>
          {store.nodes.length} component{store.nodes.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} className="flex-1 relative overflow-hidden">
        <ReactFlowProvider>
          <StackCanvas store={store} readOnly={false} />
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default function ComparePage() {
  const { storeA, storeB, analysisA, analysisB } = useComparisonStore()
  const canvasRefA = useRef(null)
  const canvasRefB = useRef(null)

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden animate-fade-in"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-display)',
            }}
          >
            ← Builder
          </Link>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <h1
            className="text-sm font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Stack Comparison
          </h1>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
          Drag components into each canvas to compare architectures
        </p>
      </header>

      {/* Main — two canvases + diff panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar (shared) */}
        <ComparePanel
          label="A"
          color="#6366f1"
          store={storeA}
          canvasRef={canvasRefA}
        />

        {/* Center diff */}
        <ComparisonDiff analysisA={analysisA} analysisB={analysisB} />

        {/* Right canvas */}
        <ComparePanel
          label="B"
          color="#ec4899"
          store={storeB}
          canvasRef={canvasRefB}
        />
      </div>
    </div>
  )
}