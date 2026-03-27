// src/data/stackComponents.js

export const CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  AUTH: 'Auth',
  HOSTING: 'Hosting',
  DEVOPS: 'DevOps',
}

export const stackComponents = [
  // Frontend
  { id: 'react',      label: 'React',      category: CATEGORIES.FRONTEND, color: '#61DAFB', emoji: '⚛️' },
  { id: 'vue',        label: 'Vue',         category: CATEGORIES.FRONTEND, color: '#42B883', emoji: '💚' },
  { id: 'nextjs',     label: 'Next.js',     category: CATEGORIES.FRONTEND, color: '#000000', emoji: '▲' },
  { id: 'svelte',     label: 'Svelte',      category: CATEGORIES.FRONTEND, color: '#FF3E00', emoji: '🔥' },
  // Backend
  { id: 'nodejs',     label: 'Node.js',     category: CATEGORIES.BACKEND,  color: '#339933', emoji: '🟢' },
  { id: 'django',     label: 'Django',      category: CATEGORIES.BACKEND,  color: '#092E20', emoji: '🐍' },
  { id: 'fastapi',    label: 'FastAPI',     category: CATEGORIES.BACKEND,  color: '#009688', emoji: '⚡' },
  { id: 'express',    label: 'Express',     category: CATEGORIES.BACKEND,  color: '#404040', emoji: '🚂' },
  // Database
  { id: 'mongodb',    label: 'MongoDB',     category: CATEGORIES.DATABASE, color: '#47A248', emoji: '🍃' },
  { id: 'postgresql', label: 'PostgreSQL',  category: CATEGORIES.DATABASE, color: '#336791', emoji: '🐘' },
  { id: 'firebase',   label: 'Firebase',    category: CATEGORIES.DATABASE, color: '#FFCA28', emoji: '🔥' },
  { id: 'supabase',   label: 'Supabase',    category: CATEGORIES.DATABASE, color: '#3ECF8E', emoji: '⚡' },
  // Auth
  { id: 'firebase-auth', label: 'Firebase Auth', category: CATEGORIES.AUTH, color: '#FFCA28', emoji: '🔐' },
  { id: 'auth0',      label: 'Auth0',       category: CATEGORIES.AUTH,     color: '#EB5424', emoji: '🔑' },
  { id: 'clerk',      label: 'Clerk',       category: CATEGORIES.AUTH,     color: '#6C47FF', emoji: '🪪' },
  // Hosting
  { id: 'vercel',     label: 'Vercel',      category: CATEGORIES.HOSTING,  color: '#000000', emoji: '▲' },
  { id: 'netlify',    label: 'Netlify',     category: CATEGORIES.HOSTING,  color: '#00C7B7', emoji: '🌐' },
  { id: 'aws',        label: 'AWS',         category: CATEGORIES.HOSTING,  color: '#FF9900', emoji: '☁️' },
  { id: 'railway',    label: 'Railway',     category: CATEGORIES.HOSTING,  color: '#0B0D0E', emoji: '🚄' },
]

// Group by category for the sidebar
export const componentsByCategory = stackComponents.reduce((acc, comp) => {
  if (!acc[comp.category]) acc[comp.category] = []
  acc[comp.category].push(comp)
  return acc
}, {})