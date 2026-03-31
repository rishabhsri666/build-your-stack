// src/hooks/useSavedStacks.js
import { useState, useEffect } from 'react'
import { fetchRecentStacks } from '../services/stackService'

export function useSavedStacks() {
  const [stacks, setStacks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRecentStacks(50)
        setStacks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const removeFromList = (id) => {
    setStacks((prev) => prev.filter((s) => s.id !== id))
  }

  return { stacks, loading, error, removeFromList }
}