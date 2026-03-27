// src/hooks/useToast.js
import { useState, useCallback } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = ++toastId
    setToasts((t) => [...t, { id, message, type, leaving: false }])

    setTimeout(() => {
      // Mark as leaving (triggers exit animation)
      setToasts((t) => t.map((toast) => toast.id === id ? { ...toast, leaving: true } : toast))
      // Remove after animation
      setTimeout(() => {
        setToasts((t) => t.filter((toast) => toast.id !== id))
      }, 300)
    }, duration)
  }, [])

  const toast = {
    success: (message) => addToast({ message, type: 'success' }),
    error:   (message) => addToast({ message, type: 'error' }),
    info:    (message) => addToast({ message, type: 'info' }),
  }

  return { toasts, toast }
}