// src/components/ui/TemplatesModal.jsx
import { useState } from 'react'
import { stackTemplates } from '../../data/stackTemplates'

export default function TemplatesModal({ onLoad, onClose }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const handleLoad = () => {
    if (!selected) return
    onLoad(selected)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ background: 'rgba(8,11,17,0.85)', backdropFilter: 'blur(10px)' }}
    >
      <div
        className="w-full max-w-2xl mx-4 rounded-2xl overflow-hidden animate-scale-in"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div>
            <h2
              className="text-base font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Stack Templates
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Start from a battle-tested architecture
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-surface-2)'
              e.currentTarget.style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-text-muted)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Template grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            {stackTemplates.map((template, i) => {
              const isSelected = selected?.id === template.id
              return (
                <button
                  key={template.id}
                  onClick={() => setSelected(template)}
                  onMouseEnter={() => setHovered(template.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="text-left p-4 rounded-xl transition-all duration-150 animate-fade-up"
                  style={{
                    animationDelay: `${i * 0.04}s`,
                    background: isSelected
                      ? 'rgba(99,102,241,0.1)'
                      : 'var(--color-surface-2)',
                    border: `1.5px solid ${
                      isSelected
                        ? 'rgba(99,102,241,0.5)'
                        : hovered === template.id
                        ? 'var(--color-border-hover)'
                        : 'var(--color-border)'
                    }`,
                    boxShadow: isSelected
                      ? '0 0 0 1px rgba(99,102,241,0.2), 0 4px 16px rgba(99,102,241,0.1)'
                      : 'none',
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{template.emoji}</span>
                    {isSelected && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        style={{ background: '#6366f1', color: 'white' }}
                      >
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <p
                    className="text-sm font-semibold text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {template.name}
                  </p>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          color: '#a5b4fc',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
            {selected ? `Selected: ${selected.name}` : 'Select a template to preview'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleLoad}
              disabled={!selected}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white
                         transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: selected
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                  : '#1f2937',
                boxShadow: selected ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
              }}
            >
              Load Template →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
