// src/hooks/useExport.js
import { useState, useCallback } from 'react'
import { exportCanvasAsPng } from '../utils/exportDiagram'

export function useExport(canvasRef) {
  const [exporting, setExporting] = useState(false)

  const exportPng = useCallback(async (filename = 'my-stack') => {
    if (!canvasRef?.current) return
    setExporting(true)
    try {
      await exportCanvasAsPng(canvasRef.current, filename)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }, [canvasRef])

  return { exportPng, exporting }
}