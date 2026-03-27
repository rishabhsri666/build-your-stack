// src/pages/ComparePage.jsx
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import Sidebar from '../components/layout/Sidebar'
import StackCanvas from '../components/canvas/StackCanvas'
import ComparisonDiff from '../components/comparison/ComparisonDiff'
import TemplatesModal from '../components/ui/TemplatesModal'
import { useComparisonStore } from '../hooks/useComparisonStore'
import { useExport } from '../hooks/useExport'
import { useToast } from '../hooks/useToast'

function ComparePanel({ label, color, store, canvasRef, onExport, onTemplates, exporting }) {
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
          <StackCanvas
            store={store}
            readOnly={false}
            onExport={onExport}
            onTemplates={onTemplates}
            exporting={exporting}
          />
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default function ComparePage() {
  const { storeA, storeB, analysisA, analysisB } = useComparisonStore()
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateTarget, setTemplateTarget] = useState(null)
  const canvasRefA = useRef(null)
  const canvasRefB = useRef(null)

  const { exportPng: exportPngA, exporting: exportingA } = useExport(canvasRefA)
  const { exportPng: exportPngB, exporting: exportingB } = useExport(canvasRefB)
  const { toast } = useToast()

  const handleExport = async (id) => {
    if (id === 'A') {
      if (!storeA.nodes.length) {
        toast.error('Add components before exporting stack A.')
        return
      }
      await exportPngA('stack-a')
    } else {
      if (!storeB.nodes.length) {
        toast.error('Add components before exporting stack B.')
        return
      }
      await exportPngB('stack-b')
    }
    toast.success(`Stack ${id} exported as PNG!`)
  }

  const handleTemplates = (id) => {
    setTemplateTarget(id)
    setShowTemplates(true)
  }

  const handleLoadTemplate = (template) => {
    const targetStore = templateTarget === 'A' ? storeA : storeB
    targetStore.clearCanvas()

    setTimeout(() => {
      targetStore.setNodes(template.nodes)
      targetStore.setEdges(template.edges)
      toast.success(`Loaded: ${template.name} into Stack ${templateTarget}`)
    }, 100)
  }

  const hideTemplates = () => {
    setShowTemplates(false)
    setTemplateTarget(null)
  }

  return (
  <div
    className="h-screen w-screen flex overflow-hidden animate-fade-in"
    style={{ background: 'var(--color-bg)' }}
  >
    <Sidebar />

    <div className="flex-1 flex flex-col overflow-hidden">
      
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
            ← Builder
          </Link>
          <span>|</span>
          <h1 className="text-sm font-bold text-white">
            Stack Comparison
          </h1>
        </div>

        <p className="text-xs">
          Drag components into each canvas to compare architectures
        </p>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <ComparePanel
          label="A"
          color="#6366f1"
          store={storeA}
          canvasRef={canvasRefA}
          onExport={() => handleExport('A')}
          onTemplates={() => handleTemplates('A')}
          exporting={exportingA}
        />

        <ComparisonDiff analysisA={analysisA} analysisB={analysisB} />

        <ComparePanel
          label="B"
          color="#ec4899"
          store={storeB}
          canvasRef={canvasRefB}
          onExport={() => handleExport('B')}
          onTemplates={() => handleTemplates('B')}
          exporting={exportingB}
        />
      </div>

      {showTemplates && (
        <TemplatesModal
          onLoad={handleLoadTemplate}
          onClose={hideTemplates}
        />
      )}
    </div>
  </div>
)
}