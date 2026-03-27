// src/components/layout/Sidebar.jsx
import { useState } from 'react'
import { componentsByCategory } from '../../data/stackComponents'
import ComponentCard from '../ui/ComponentCard'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [search, setSearch] = useState('')
  const categories = Object.entries(componentsByCategory)

  const filtered = search.trim()
    ? categories.map(([cat, comps]) => [
      cat,
      comps.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
      ),
    ]).filter(([, comps]) => comps.length > 0)
    : categories

  return (
    <aside
      className="w-64 h-full flex flex-col overflow-hidden animate-fade-in"
      style={{
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Wordmark */}
      <div
        className="px-5 pt-5 pb-4 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center 
                          justify-center text-sm shadow-lg shadow-indigo-900/50">
            🧱
          </div>
          <div>
            <h1
              className="text-sm font-bold leading-none tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Build Your Stack
            </h1>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Visual architecture designer
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-2 text-xs rounded-lg transition-colors
                       placeholder-[#3d444d] text-white focus:outline-none"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-accent)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)'
            }}
          />
        </div>
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {filtered.length === 0 && (
          <p
            className="text-xs text-center py-8"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            No components match "{search}"
          </p>
        )}

        {filtered.map(([category, components], catIdx) => (
          <div key={category} className="animate-fade-up" style={{ animationDelay: `${catIdx * 0.05}s` }}>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2 px-1"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {category}
            </p>
            <div className="space-y-1">
              {components.map((comp, i) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 flex-shrink-0 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <p className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>
          Drag to canvas to build
        </p>
        <Link
          to="/compare"
          className="text-[10px] font-medium transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#a5b4fc' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
        >
          Compare ↗
        </Link>
      </div>
    </aside>
  )
}