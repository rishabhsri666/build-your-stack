// src/pages/MyStacksPage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSavedStacks } from '../hooks/useSavedStacks'
import StackCard from '../components/ui/StackCard'

// ── Loading skeleton ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="h-1.5" style={{ background: 'var(--color-border)' }} />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div
              className="h-4 w-3/4 rounded-lg animate-pulse"
              style={{ background: 'var(--color-surface-2)' }}
            />
            <div
              className="h-3 w-1/2 rounded-lg animate-pulse"
              style={{ background: 'var(--color-surface-2)' }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-7 w-20 rounded-lg animate-pulse"
              style={{ background: 'var(--color-surface-2)', animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div
          className="h-9 w-full rounded-xl animate-pulse"
          style={{ background: 'var(--color-surface-2)' }}
        />
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        🧱
      </div>
      <h2
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        No stacks saved yet
      </h2>
      <p
        className="text-sm max-w-xs leading-relaxed mb-8"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Build your first tech stack architecture and save it to see it here.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.6)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        🧱 Build Your First Stack
      </Link>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MyStacksPage() {
  const { stacks, loading, error, removeFromList } = useSavedStacks()
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const filtered = search.trim()
    ? stacks.filter((s) =>
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.nodes?.some((n) =>
          n.data?.label?.toLowerCase().includes(search.toLowerCase())
        )
      )
    : stacks

  const handleCopyLink = async (stackId) => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/stack/${stackId}`
    )
    setCopiedId(stackId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div
      className="min-h-screen animate-fade-in"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Top nav */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(8,11,17,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center
                         justify-center text-sm shadow-lg shadow-indigo-900/50"
            >
              🧱
            </div>
            <span
              className="text-sm font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Build Your Stack
            </span>
          </Link>

          <span style={{ color: 'var(--color-border)' }}>|</span>

          <h1
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
          >
            My Stacks
          </h1>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-3">
          <Link
            to="/compare"
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            Compare ↗
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold px-4 py-2 rounded-xl text-white transition-all"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99,102,241,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(99,102,241,0.15)'
            }}
          >
            + New Stack
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-8 py-10">

        {/* Page heading + search */}
        {!loading && stacks.length > 0 && (
          <div className="flex items-center justify-between gap-6 mb-8 animate-fade-up">
            <div>
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Saved Stacks
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {stacks.length} stack{stacks.length !== 1 ? 's' : ''} saved
                {filtered.length !== stacks.length && ` · ${filtered.length} shown`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-64">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                ⌕
              </span>
              <input
                type="text"
                placeholder="Search stacks or components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 text-xs rounded-xl
                           text-white placeholder-[#3d444d] focus:outline-none transition-all"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)' }}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="text-sm px-4 py-3 rounded-xl mb-8"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#fca5a5',
            }}
          >
            Failed to load stacks: {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && stacks.length === 0 && !error && <EmptyState />}

        {/* No search results */}
        {!loading && stacks.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">🔍</p>
            <p
              className="text-sm font-medium text-white mb-1"
            >
              No stacks match "{search}"
            </p>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Try searching by stack name or component like "React" or "MongoDB"
            </p>
          </div>
        )}

        {/* Stack grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((stack, i) => (
              <div
                key={stack.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <StackCard
                  stack={stack}
                  onDelete={removeFromList}
                  copiedId={copiedId}
                  onCopy={handleCopyLink}
                />
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}