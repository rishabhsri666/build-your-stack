// src/components/ui/AiAnalyzeButton.jsx

export default function AiAnalyzeButton({ onClick, status, cooldown, disabled }) {
  const isLoading = status === 'loading'

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold
                 transition-all duration-200 flex items-center justify-center gap-2
                 disabled:cursor-not-allowed"
      style={{
        background: isLoading
          ? 'rgba(99,102,241,0.1)'
          : disabled
          ? 'var(--color-surface-2)'
          : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        border: isLoading || disabled
          ? '1px solid rgba(99,102,241,0.2)'
          : '1px solid rgba(99,102,241,0.4)',
        color: disabled ? 'var(--color-text-subtle)' : '#fff',
        boxShadow: isLoading || disabled
          ? 'none'
          : '0 4px 20px rgba(99,102,241,0.35)',
      }}
      onMouseEnter={(e) => {
        if (!isLoading && !disabled) {
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.5)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isLoading || disabled
          ? 'none'
          : '0 4px 20px rgba(99,102,241,0.35)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {isLoading ? (
        <>
          <span
            className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full"
            style={{ animation: 'spin 0.7s linear infinite', display: 'inline-block' }}
          />
          Analyzing your stack...
        </>
      ) : cooldown ? (
        <>⏳ Cooldown active</>
      ) : (
        <>
          <span>✦</span>
          Analyze with AI
        </>
      )}
    </button>
  )
}