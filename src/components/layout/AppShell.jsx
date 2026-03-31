// src/components/layout/AppShell.jsx
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import DetailsPanel from './DetailsPanel'
import StackCanvas from '../canvas/StackCanvas'
import SaveModal from '../ui/SaveModal'
import ShareModal from '../ui/ShareModal'
import TemplatesModal from '../ui/TemplatesModal'
import ToastContainer from '../ui/ToastContainer'
import { useStackStore } from '../../hooks/useStackStore'
import { useSaveStack } from '../../hooks/useSaveStack'
import { useToast } from '../../hooks/useToast'
import { useExport } from '../../hooks/useExport'

export default function AppShell({ initialNodes = [], initialEdges = [], readOnly = false }) {
  const store = useStackStore(initialNodes, initialEdges)
  const { save, saving, savedId, error, remove } = useSaveStack()
  const { toasts, toast } = useToast()
  const canvasRef = useRef(null)
  const { exportPng, exporting } = useExport(canvasRef)

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleSaveClick = () => {
    if (store.nodes.length === 0) {
      toast.error('Add at least one component before saving.')
      return
    }
    setShowSaveModal(true)
  }

  const handleDelete = async () => {
    if (!savedId) {
      toast.error('No stack saved yet.')
      return
    }
    const confirmed = window.confirm('Delete this saved stack permanently?')
    if (!confirmed) return

    const deleted = await remove()
    if (deleted) {
      setShowShareModal(false)
      toast.success('Saved stack deleted.')
    } else {
      toast.error('Failed to delete. Please try again.')
    }
  }

  const handleSaveConfirm = async (title) => {
    const existing = !!savedId
    const id = await save({ title, nodes: store.nodes, edges: store.edges })
    if (id) {
      setShowSaveModal(false)
      setShowShareModal(true)
      toast.success(existing ? 'Stack updated successfully!' : 'Stack saved successfully!')
    } else {
      toast.error('Failed to save. Please try again.')
    }
  }

  const handleLoadTemplate = (template) => {
    store.clearCanvas()
    // Small delay so clear animation completes
    setTimeout(() => {
      store.setNodes(template.nodes)
      store.setEdges(template.edges)
      toast.success(`Loaded: ${template.name}`)
    }, 100)
  }

  const handleExport = async () => {
    if (store.nodes.length === 0) {
      toast.error('Add components before exporting.')
      return
    }
    await exportPng('my-stack')
    toast.success('Diagram exported as PNG!')
  }

  return (
    <div
      className="flex h-screen w-screen overflow-hidden animate-fade-in"
      style={{ background: 'var(--color-bg)' }}
    >
      {!readOnly && <Sidebar />}

      <main className="flex-1 relative overflow-hidden" ref={canvasRef}>
        <StackCanvas
          store={store}
          onSave={handleSaveClick}
          onExport={handleExport}
          onTemplates={() => setShowTemplates(true)}
          onDelete={handleDelete}
          savedId={savedId}
          saving={saving}
          exporting={exporting}
          readOnly={readOnly}
        />
      </main>

      <DetailsPanel nodes={store.nodes} edges={store.edges} readOnly={readOnly} />

      {/* Modals */}
      {showTemplates && (
        <TemplatesModal
          onLoad={handleLoadTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
      {showSaveModal && (
        <SaveModal
          onSave={handleSaveConfirm}
          onClose={() => setShowSaveModal(false)}
          saving={saving}
          error={error}
        />
      )}
      {showShareModal && savedId && (
        <ShareModal
          stackId={savedId}
          onClose={() => { setShowShareModal(false) }}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}