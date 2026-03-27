// src/utils/exportDiagram.js
import { toBlob } from 'html-to-image'

export async function exportCanvasAsPng(canvasElement, filename = 'my-stack') {
  if (!canvasElement) throw new Error('No canvas element provided')

  // Find the React Flow viewport inside the wrapper
  const viewport = canvasElement.querySelector('.react-flow__viewport')
  if (!viewport) throw new Error('React Flow viewport not found')

  const blob = await toBlob(canvasElement, {
    quality: 1,
    pixelRatio: 2,           // retina quality
    backgroundColor: '#080b11',
    filter: (node) => {
      // Exclude controls and minimap from export
      if (!node.classList) return true
      return (
        !node.classList.contains('react-flow__controls') &&
        !node.classList.contains('react-flow__minimap') &&
        !node.classList.contains('canvas-toolbar')
      )
    },
  })

  if (!blob) throw new Error('Failed to generate image')

  // Trigger browser download
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename.toLowerCase().replace(/\s+/g, '-')}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}