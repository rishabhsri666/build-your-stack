// src/pages/StackPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchStack } from '../services/stackService'
import AppShell from '../components/layout/AppShell'

export default function StackPage() {
  const { id } = useParams()
  const [stack, setStack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStack(id)
        setStack(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent 
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading stack...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-white font-semibold mb-2">Stack Not Found</h1>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <Link
            to="/"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white 
                       text-sm font-medium rounded-xl transition-colors"
          >
            Build Your Own Stack
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-950 text-white overflow-hidden">
      {/* Banner */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 
                      border-b border-gray-800 flex-shrink-0">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
            Shared Stack
          </span>
          <h1 className="text-sm font-semibold text-white mt-0.5">
            {stack.title}
          </h1>
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white 
                     text-xs font-medium rounded-lg transition-colors"
        >
          🧱 Build Your Own
        </Link>
      </div>

      {/* Read-only canvas with analysis */}
      <div className="flex-1 overflow-hidden">
        <AppShell
          initialNodes={stack.nodes}
          initialEdges={stack.edges}
          readOnly
        />
      </div>
    </div>
  )
}