// src/components/canvas/CanvasToolbar.jsx
import clsx from 'clsx'

export default function CanvasToolbar({
  onClear,
  onSave,
  onExport,
  onTemplates,
  nodeCount,
  saving,
  exporting,
}) {
  return (
    <div
      className="absolute top-5 left-1/2 -translate-x-1/2 z-10 canvas-toolbar
                 flex items-center gap-1 animate-fade-up"
      style={{
        background: 'rgba(13,17,23,0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border)',
        borderRadius: 99,
        padding: '5px 8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      {/* Templates */}
      <ToolbarButton onClick={onTemplates} title="Templates">
        📋 Templates
      </ToolbarButton>

      <Divider />

      {/* Node count */}
      <div className="flex items-center gap-2 px-3">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: nodeCount > 0 ? '#6366f1' : '#3d444d',
            boxShadow: nodeCount > 0 ? '0 0 6px #6366f1' : 'none',
          }}
        />
        <span
          className="text-xs font-medium"
          style={{ color: nodeCount > 0 ? 'var(--color-text-muted)' : 'var(--color-text-subtle)' }}
        >
          {nodeCount === 0
            ? 'Drop components to start'
            : `${nodeCount} component${nodeCount !== 1 ? 's' : ''}`}
        </span>
      </div>

      {nodeCount > 0 && (
        <>
          <Divider />

          {/* Export */}
          <ToolbarButton onClick={onExport} disabled={exporting} title="Export PNG">
            {exporting ? '⏳' : '🖼️'} Export
          </ToolbarButton>

          {/* Save */}
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 
                       rounded-full transition-all duration-150 disabled:opacity-50"
            style={{
              background: 'rgba(99,102,241,0.15)',
              color: '#818cf8',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.background = 'rgba(99,102,241,0.25)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(99,102,241,0.15)'
            }}
          >
            {saving ? (
              <>
                <span
                  className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full"
                  style={{ animation: 'spin 0.7s linear infinite', display: 'inline-block' }}
                />
                Saving...
              </>
            ) : (
              '💾 Save & Share'
            )}
          </button>

          {/* Clear */}
          <ToolbarButton
            onClick={onClear}
            hoverColor="rgba(239,68,68,0.1)"
            hoverTextColor="#f87171"
          >
            Clear
          </ToolbarButton>
        </>
      )}
    </div>
  )
}

function Divider() {
  return (
    <div
      className="w-px h-4 mx-1 flex-shrink-0"
      style={{ background: 'var(--color-border)' }}
    />
  )
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  hoverColor = 'var(--color-surface-2)',
  hoverTextColor = 'var(--color-text)',
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-xs font-medium px-3 py-1.5 rounded-full transition-all 
                 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ color: 'var(--color-text-muted)' }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = hoverColor
          e.currentTarget.style.color = hoverTextColor
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--color-text-muted)'
      }}
    >
      {children}
    </button>
  )
}