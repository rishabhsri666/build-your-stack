// src/components/ui/ComponentCard.jsx

export default function ComponentCard({ component }) {
  const { label, emoji, color } = component

  // HTML5 drag API — we store the component data as JSON in the drag event
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(component))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-800 
                 hover:bg-gray-700 cursor-grab active:cursor-grabbing 
                 border border-gray-700 hover:border-gray-500 
                 transition-all duration-150 select-none group"
    >
      <span className="text-base">{emoji}</span>
      <span className="text-sm font-medium text-gray-200 group-hover:text-white">
        {label}
      </span>
      <span
        className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}