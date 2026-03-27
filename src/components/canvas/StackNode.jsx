// src/components/canvas/StackNode.jsx
import { Handle, Position } from '@xyflow/react'
import { memo } from 'react'

function StackNode({ data, selected }) {
  const { label, emoji, color, category } = data

  return (
    <div
      className="relative transition-all duration-200"
      style={{
        minWidth: 140,
        animation: 'scaleIn 0.2s ease both',
      }}
    >
      {/* Glow layer — only visible when selected */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 -z-10"
        style={{
          opacity: selected ? 1 : 0,
          background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)`,
          transform: 'scale(1.3)',
          filter: 'blur(8px)',
        }}
      />

      {/* Card */}
      <div
        className="px-4 py-3.5 rounded-2xl text-center relative"
        style={{
          background: selected
            ? `linear-gradient(135deg, #0d1117 0%, ${color}0d 100%)`
            : '#0d1117',
          border: `1.5px solid ${selected ? color : color + '33'}`,
          boxShadow: selected
            ? `0 0 0 1px ${color}22, 0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${color}18`
            : '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
      >
        {/* Source handle — right */}
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: 10,
            height: 10,
            background: '#161b22',
            border: `2px solid ${color}66`,
            right: -6,
            transition: 'all 0.15s',
          }}
          className="hover:!scale-125 hover:!border-indigo-400 hover:!bg-indigo-500"
        />

        {/* Target handle — left */}
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: 10,
            height: 10,
            background: '#161b22',
            border: `2px solid ${color}66`,
            left: -6,
            transition: 'all 0.15s',
          }}
          className="hover:!scale-125 hover:!border-indigo-400 hover:!bg-indigo-500"
        />

        {/* Emoji icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mx-auto mb-2"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
          }}
        >
          {emoji}
        </div>

        {/* Label */}
        <p
          className="text-xs font-semibold text-white leading-tight mb-1.5 tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {label}
        </p>

        {/* Category badge */}
        <span
          className="text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          {category}
        </span>
      </div>
    </div>
  )
}

export default memo(StackNode)