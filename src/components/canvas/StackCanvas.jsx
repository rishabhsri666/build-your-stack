// src/components/canvas/StackCanvas.jsx
import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import clsx from 'clsx'

import StackNode from './StackNode'
import CanvasToolbar from './CanvasToolbar'

const nodeTypes = { stackNode: StackNode }

export default function StackCanvas({ store, onSave, saving, readOnly = false }) {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, clearCanvas } = store

  const onDragOver = useCallback((e) => {
    if (readOnly) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }, [readOnly])

  const onDragLeave = useCallback(() => {
    setIsDragOver(false)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (readOnly) return
    const raw = e.dataTransfer.getData('application/reactflow')
    if (!raw || !reactFlowInstance) return
    const component = JSON.parse(raw)
    const position = reactFlowInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY })
    addNode(component, position)
  }, [reactFlowInstance, addNode, readOnly])

  return (
    <div
      ref={reactFlowWrapper}
      className={clsx(
        'w-full h-full relative transition-colors duration-200',
        isDragOver && 'canvas-drop-active'
      )}
    >
      {!readOnly && (
        <CanvasToolbar
          onClear={clearCanvas}
          onSave={onSave}
          nodeCount={nodes.length}
          saving={saving}
        />
      )}

      {/* Drop zone border — only visible on drag over */}
      {isDragOver && (
        <div
          className="absolute inset-3 rounded-2xl pointer-events-none z-10 animate-fade-in"
          style={{
            border: '1.5px dashed rgba(99,102,241,0.4)',
            background: 'rgba(99,102,241,0.02)',
          }}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        nodeTypes={nodeTypes}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
        fitView
        deleteKeyCode={readOnly ? null : 'Backspace'}
        style={{ background: 'var(--color-bg)' }}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={28}
          size={1}
          color="#21262d"
        />
        <Controls
          showInteractive={false}
          className="!shadow-xl"
        />
        <MiniMap
          nodeColor={(node) => node.data?.color ?? '#6366f1'}
          maskColor="rgba(8,11,17,0.7)"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
          }}
        />
      </ReactFlow>

      {/* Empty state */}
      {nodes.length === 0 && !readOnly && !isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-up">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center 
                         justify-center text-3xl"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              🏗️
            </div>
            <p
              className="font-semibold text-sm mb-1.5"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Your canvas is empty
            </p>
            <p
              className="text-xs max-w-[220px] mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Drag components from the sidebar to start designing your architecture
            </p>
          </div>
        </div>
      )}
    </div>
  )
}