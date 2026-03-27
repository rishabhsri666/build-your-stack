// src/hooks/useSaveStack.js
import { useState } from 'react'
import { saveStack } from '../services/stackService'

export function useSaveStack() {
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [error, setError] = useState(null)

  const save = async ({ title, nodes, edges }) => {
    setSaving(true)
    setError(null)

    try {
      const id = await saveStack({ title, nodes, edges })
      setSavedId(id)
      return id
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    setSavedId(null)
    setError(null)
  }

  return { save, saving, savedId, error, reset }
}