// src/components/ui/ShareModal.jsx
import { useState } from 'react'

export default function ShareModal({ stackId, onClose }) {
  const shareUrl = `${window.location.origin}/stack/${stackId}`
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 
                          flex items-center justify-center text-xl">
            ✅
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Stack Saved!</h2>
            <p className="text-xs text-gray-400">Your shareable link is ready</p>
          </div>
        </div>

        {/* URL display */}
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 
                        rounded-xl px-3 py-2.5 mb-4">
          <span className="text-xs text-gray-300 truncate flex-1 font-mono">
            {shareUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg
                       bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium 
                       bg-gray-800 text-gray-300 hover:bg-gray-700 
                       border border-gray-700 transition-colors"
          >
            Close
          </button>
          <a
            href={`/stack/${stackId}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-center
                       bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 
                       transition-colors"
          >
            Open Link ↗
          </a>
        </div>
      </div>
    </div>
  )
}