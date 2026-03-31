// src/components/ui/StackCard.jsx
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { deleteStack } from '../../services/stackService'

function formatDate(timestamp) {
  if (!timestamp) return 'Unknown date'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function StackCard({ stack, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const shareUrl = `${window.location.origin}/stack/${stack.id}`

  // Get unique colors from nodes for the preview strip
  const nodeColors = [...new Set(
    (stack.nodes ?? []).map((n) => n.data?.color).filter(Boolean)
  )].slice(0, 6)

  // Get component labels for display
  const components = (stack.nodes ?? []).map((n) => ({
    label: n.data?.label ?? '',
    emoji: n.data?.emoji ?? '',
    color: n.data?.color ?? '#6366f1',
    category: n.data?.category ?? '',
  }))

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setDeleting(true)
    try {
      await deleteStack(stack.id)
      onDelete(stack.id)
    } catch {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200
                 hover:-translate-y-0.5 group"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
      }}
    >
      {/* Color strip preview */}
      <div className="h-1.5 flex">
        {nodeColors.length > 0 ? (
          nodeColors.map((color, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ background: color }}
            />
          ))
        ) : (
          <div className="flex-1" style={{ background: 'var(--color-border)' }} />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-bold text-white truncate mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {stack.title || 'Untitled Stack'}
            </h3>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {formatDate(stack.createdAt)} · {formatTime(stack.createdAt)}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc',
              }}
            >
              🧩 {stack.nodes?.length ?? 0}
            </div>
            <div
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc',
              }}
            >
              🔗 {stack.edges?.length ?? 0}
            </div>
            {stack.viewCount > 0 && (
              <div
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: '#a5b4fc',
                }}
              >
                👁 {stack.viewCount}
              </div>
            )}
          </div>
        </div>

        {/* Component pills */}
        {components.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {components.slice(0, 6).map((comp, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg"
                style={{
                  background: `${comp.color}12`,
                  border: `1px solid ${comp.color}30`,
                  color: comp.color,
                }}
              >
                {comp.emoji} {comp.label}
              </span>
            ))}
            {components.length > 6 && (
              <span
                className="text-[11px] px-2 py-1 rounded-lg"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-subtle)',
                }}
              >
                +{components.length - 6} more
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div
          className="flex items-center gap-2 pt-4 mt-2"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {/* View */}
          <Link
            to={`/stack/${stack.id}`}
            className="flex-1 py-2 rounded-xl text-xs font-semibold text-center
                       text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              boxShadow: '0 2px 12px rgba(99,102,241,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.3)'
            }}
          >
            View Stack ↗
          </Link>

          {/* Copy link */}
          <ActionButton onClick={handleCopyLink} title="Copy link">
            🔗
          </ActionButton>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            title={confirmDelete ? 'Click again to confirm' : 'Delete stack'}
            className="w-8 h-8 rounded-xl flex items-center justify-center
                       text-sm transition-all duration-150 disabled:opacity-50"
            style={{
              background: confirmDelete
                ? 'rgba(239,68,68,0.15)'
                : 'var(--color-surface-2)',
              border: `1px solid ${confirmDelete
                ? 'rgba(239,68,68,0.4)'
                : 'var(--color-border)'}`,
              color: confirmDelete ? '#f87171' : 'var(--color-text-subtle)',
            }}
          >
            {deleting ? (
              <span
                className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"
                style={{ animation: 'spin 0.7s linear infinite', display: 'inline-block' }}
              />
            ) : confirmDelete ? '✓' : '🗑'}
          </button>
        </div>

      </div>
    </div>
  )
}

function ActionButton({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-xl flex items-center justify-center
                 text-sm transition-all duration-150"
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.color = 'var(--color-text)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.color = 'var(--color-text-muted)'
      }}
    >
      {children}
    </button>
  )
}