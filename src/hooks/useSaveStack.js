// src/hooks/useSaveStack.js
import { useState } from 'react'
import { saveStack, updateStack, deleteStack } from '../services/stackService'

export function useSaveStack() {
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [error, setError] = useState(null)

  const save = async ({ title, nodes, edges, id }) => {
    setSaving(true)
    setError(null)

    try {
      const targetId = id || savedId
      const resultId = targetId
        ? await updateStack(targetId, { title, nodes, edges })
        : await saveStack({ title, nodes, edges })
      setSavedId(resultId)
      return resultId
    } catch (err) {
      setError(err.message || 'Failed to save stack.')
      return null
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!savedId) {
      setError('No saved stack ID to delete.')
      return false
    }

    setSaving(true)
    setError(null)

    try {
      await deleteStack(savedId)
      setSavedId(null)
      return true
    } catch (err) {
      setError(err.message || 'Failed to delete stack.')
      return false
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    setSavedId(null)
    setError(null)
  }

  return { save, saving, savedId, error, remove, reset }
}