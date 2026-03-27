// src/hooks/useStackStore.js
import { useState, useCallback } from 'react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'

export function useStackStore(initialNodes = [], initialEdges = []) {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
          eds
        )
      ),
    []
  )

  const addNode = useCallback((component, position) => {
    const newNode = {
      id: `${component.id}-${Date.now()}`,
      type: 'stackNode',
      position,
      data: {
        label: component.label,
        emoji: component.emoji,
        color: component.color,
        category: component.category,
        componentId: component.id,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [])

  const removeNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId))
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
  }, [])

  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [])

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    removeNode,
    clearCanvas,
    setNodes,   // ← expose useState setter directly — no re-declaration needed
    setEdges,   // ← same here
  }
}