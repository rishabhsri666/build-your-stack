// src/components/ui/ToastContainer.jsx
import clsx from 'clsx'

const typeStyles = {
  success: {
    border: 'border-emerald-800/60',
    bg: 'bg-emerald-950/80',
    icon: '✓',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-100',
  },
  error: {
    border: 'border-red-800/60',
    bg: 'bg-red-950/80',
    icon: '✕',
    iconColor: 'text-red-400',
    textColor: 'text-red-100',
  },
  info: {
    border: 'border-indigo-800/60',
    bg: 'bg-indigo-950/80',
    icon: 'i',
    iconColor: 'text-indigo-400',
    textColor: 'text-indigo-100',
  },
}

export default function ToastContainer({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] 
                    flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const styles = typeStyles[toast.type]
        return (
          <div
            key={toast.id}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md',
              'shadow-2xl pointer-events-auto min-w-[260px] max-w-[400px]',
              styles.bg, styles.border,
              toast.leaving
                ? 'animate-[toast-out_0.3s_ease_both]'
                : 'animate-[toast-in_0.3s_ease_both]'
            )}
          >
            <span className={clsx(
              'w-5 h-5 rounded-full flex items-center justify-center',
              'text-xs font-bold flex-shrink-0 border',
              styles.iconColor,
              toast.type === 'success' ? 'border-emerald-700' :
              toast.type === 'error'   ? 'border-red-700' : 'border-indigo-700'
            )}>
              {styles.icon}
            </span>
            <span className={clsx('text-sm font-medium', styles.textColor)}>
              {toast.message}
            </span>
          </div>
        )
      })}
    </div>
  )
}