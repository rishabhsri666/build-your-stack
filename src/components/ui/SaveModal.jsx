// src/components/ui/SaveModal.jsx
import { useState } from 'react'

export default function SaveModal({ onSave, onClose, saving, error }) {
  const [title, setTitle] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
         style={{ background: 'rgba(8,11,17,0.8)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-md mx-4 p-6 rounded-2xl animate-scale-in"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        <h2
          className="text-base font-bold text-white mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Save Your Stack
        </h2>
        <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
          Give your architecture a name to generate a shareable link.
        </p>

        <input
          autoFocus
          type="text"
          placeholder="e.g. My SaaS Stack, React + Firebase MVP"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && title.trim() && onSave(title.trim())}
          maxLength={80}
          className="w-full px-4 py-3 text-sm text-white rounded-xl mb-4
                     placeholder-[#3d444d] focus:outline-none transition-all"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            fontFamily: 'var(--font-body)',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)' }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)' }}
        />

        {error && (
          <div
            className="text-xs px-3 py-2.5 rounded-lg mb-4"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#fca5a5',
            }}
          >
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium 
                       transition-colors disabled:opacity-50"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => title.trim() && onSave(title.trim())}
            disabled={saving || !title.trim()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold 
                       text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              boxShadow: saving || !title.trim() ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
            }}
          >
            {saving ? 'Saving...' : '💾 Save & Get Link'}
          </button>
        </div>
      </div>
    </div>
  )
}