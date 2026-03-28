// src/hooks/useAiAnalysis.js
import { useState, useCallback, useRef } from 'react'
import { analyzeStackWithAI } from '../services/aiService'
import { buildAiPrompt } from '../utils/buildAiPrompt'

const COOLDOWN_MS = 30_000 // 30 seconds between calls

export function useAiAnalysis() {
  const [status, setStatus]     = useState('idle')   // idle | loading | success | error
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)
  const [cooldown, setCooldown] = useState(false)
  const cooldownTimer           = useRef(null)

  const analyze = useCallback(async (nodes, edges, staticAnalysis) => {
    if (nodes.length === 0) {
      setError('Add components to the canvas first.')
      setStatus('error')
      return
    }

    if (cooldown) {
      setError('Please wait 30 seconds before analyzing again.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError(null)
    setResult(null)

    try {
      const prompt = buildAiPrompt(nodes, edges, staticAnalysis)
      const data   = await analyzeStackWithAI(prompt)
      setResult(data)
      setStatus('success')

      // Start cooldown
      setCooldown(true)
      cooldownTimer.current = setTimeout(() => setCooldown(false), COOLDOWN_MS)
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [cooldown])

  const reset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  return { analyze, status, result, error, cooldown, reset }
}