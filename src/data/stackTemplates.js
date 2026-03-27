// src/data/stackTemplates.js

export const stackTemplates = [
  {
    id: 'react-firebase-mvp',
    name: 'React + Firebase MVP',
    emoji: '🌱',
    description: 'Ship fast. Perfect for validating ideas.',
    tags: ['MVP', 'No-backend', 'Real-time'],
    nodes: [
      {
        id: 'react-tpl',
        type: 'stackNode',
        position: { x: 80, y: 160 },
        data: { label: 'React', emoji: '⚛️', color: '#61DAFB', category: 'Frontend', componentId: 'react' },
      },
      {
        id: 'firebase-tpl',
        type: 'stackNode',
        position: { x: 340, y: 100 },
        data: { label: 'Firebase', emoji: '🔥', color: '#FFCA28', category: 'Database', componentId: 'firebase' },
      },
      {
        id: 'firebase-auth-tpl',
        type: 'stackNode',
        position: { x: 340, y: 240 },
        data: { label: 'Firebase Auth', emoji: '🔐', color: '#FFCA28', category: 'Auth', componentId: 'firebase-auth' },
      },
      {
        id: 'vercel-tpl',
        type: 'stackNode',
        position: { x: 600, y: 160 },
        data: { label: 'Vercel', emoji: '▲', color: '#ffffff', category: 'Hosting', componentId: 'vercel' },
      },
    ],
    edges: [
      { id: 'e1', source: 'react-tpl', target: 'firebase-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'react-tpl', target: 'firebase-auth-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'react-tpl', target: 'vercel-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS',
    emoji: '🚀',
    description: 'Production SaaS with auth, DB, and CDN.',
    tags: ['SaaS', 'SSR', 'Enterprise-ready'],
    nodes: [
      {
        id: 'next-tpl',
        type: 'stackNode',
        position: { x: 80, y: 180 },
        data: { label: 'Next.js', emoji: '▲', color: '#ffffff', category: 'Frontend', componentId: 'nextjs' },
      },
      {
        id: 'pg-tpl',
        type: 'stackNode',
        position: { x: 340, y: 100 },
        data: { label: 'PostgreSQL', emoji: '🐘', color: '#336791', category: 'Database', componentId: 'postgresql' },
      },
      {
        id: 'clerk-tpl',
        type: 'stackNode',
        position: { x: 340, y: 260 },
        data: { label: 'Clerk', emoji: '🪪', color: '#6C47FF', category: 'Auth', componentId: 'clerk' },
      },
      {
        id: 'vercel-tpl2',
        type: 'stackNode',
        position: { x: 600, y: 180 },
        data: { label: 'Vercel', emoji: '▲', color: '#ffffff', category: 'Hosting', componentId: 'vercel' },
      },
    ],
    edges: [
      { id: 'e1', source: 'next-tpl', target: 'pg-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'next-tpl', target: 'clerk-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'next-tpl', target: 'vercel-tpl2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
  {
    id: 'mern-classic',
    name: 'MERN Stack',
    emoji: '🍃',
    description: 'The classic full-stack JavaScript setup.',
    tags: ['Full-stack', 'REST API', 'JavaScript'],
    nodes: [
      {
        id: 'react-mern',
        type: 'stackNode',
        position: { x: 60, y: 180 },
        data: { label: 'React', emoji: '⚛️', color: '#61DAFB', category: 'Frontend', componentId: 'react' },
      },
      {
        id: 'express-mern',
        type: 'stackNode',
        position: { x: 280, y: 180 },
        data: { label: 'Express', emoji: '🚂', color: '#404040', category: 'Backend', componentId: 'express' },
      },
      {
        id: 'mongo-mern',
        type: 'stackNode',
        position: { x: 500, y: 180 },
        data: { label: 'MongoDB', emoji: '🍃', color: '#47A248', category: 'Database', componentId: 'mongodb' },
      },
      {
        id: 'node-mern',
        type: 'stackNode',
        position: { x: 280, y: 340 },
        data: { label: 'Node.js', emoji: '🟢', color: '#339933', category: 'Backend', componentId: 'nodejs' },
      },
      {
        id: 'railway-mern',
        type: 'stackNode',
        position: { x: 500, y: 340 },
        data: { label: 'Railway', emoji: '🚄', color: '#0B0D0E', category: 'Hosting', componentId: 'railway' },
      },
    ],
    edges: [
      { id: 'e1', source: 'react-mern', target: 'express-mern', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'express-mern', target: 'mongo-mern', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'express-mern', target: 'node-mern', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e4', source: 'node-mern', target: 'railway-mern', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
  {
    id: 'python-api',
    name: 'Python API Stack',
    emoji: '🐍',
    description: 'High-performance async API with FastAPI.',
    tags: ['API', 'Python', 'Async'],
    nodes: [
      {
        id: 'fastapi-tpl',
        type: 'stackNode',
        position: { x: 80, y: 180 },
        data: { label: 'FastAPI', emoji: '⚡', color: '#009688', category: 'Backend', componentId: 'fastapi' },
      },
      {
        id: 'pg-py',
        type: 'stackNode',
        position: { x: 320, y: 100 },
        data: { label: 'PostgreSQL', emoji: '🐘', color: '#336791', category: 'Database', componentId: 'postgresql' },
      },
      {
        id: 'auth0-py',
        type: 'stackNode',
        position: { x: 320, y: 260 },
        data: { label: 'Auth0', emoji: '🔑', color: '#EB5424', category: 'Auth', componentId: 'auth0' },
      },
      {
        id: 'aws-py',
        type: 'stackNode',
        position: { x: 560, y: 180 },
        data: { label: 'AWS', emoji: '☁️', color: '#FF9900', category: 'Hosting', componentId: 'aws' },
      },
    ],
    edges: [
      { id: 'e1', source: 'fastapi-tpl', target: 'pg-py', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'fastapi-tpl', target: 'auth0-py', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'fastapi-tpl', target: 'aws-py', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
  {
    id: 'django-classic',
    name: 'Django Full-Stack',
    emoji: '🐍',
    description: 'Batteries-included Python web framework.',
    tags: ['Full-stack', 'Python', 'Admin panel'],
    nodes: [
      {
        id: 'django-tpl',
        type: 'stackNode',
        position: { x: 80, y: 180 },
        data: { label: 'Django', emoji: '🐍', color: '#092E20', category: 'Backend', componentId: 'django' },
      },
      {
        id: 'pg-django',
        type: 'stackNode',
        position: { x: 320, y: 100 },
        data: { label: 'PostgreSQL', emoji: '🐘', color: '#336791', category: 'Database', componentId: 'postgresql' },
      },
      {
        id: 'vue-django',
        type: 'stackNode',
        position: { x: 320, y: 260 },
        data: { label: 'Vue', emoji: '💚', color: '#42B883', category: 'Frontend', componentId: 'vue' },
      },
      {
        id: 'aws-django',
        type: 'stackNode',
        position: { x: 560, y: 180 },
        data: { label: 'AWS', emoji: '☁️', color: '#FF9900', category: 'Hosting', componentId: 'aws' },
      },
    ],
    edges: [
      { id: 'e1', source: 'django-tpl', target: 'pg-django', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'vue-django', target: 'django-tpl', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'django-tpl', target: 'aws-django', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
  {
    id: 'supabase-stack',
    name: 'Supabase Modern Stack',
    emoji: '⚡',
    description: 'Open-source Firebase alternative with Postgres.',
    tags: ['Real-time', 'Open-source', 'PostgreSQL'],
    nodes: [
      {
        id: 'next-supa',
        type: 'stackNode',
        position: { x: 80, y: 180 },
        data: { label: 'Next.js', emoji: '▲', color: '#ffffff', category: 'Frontend', componentId: 'nextjs' },
      },
      {
        id: 'supa-db',
        type: 'stackNode',
        position: { x: 320, y: 100 },
        data: { label: 'Supabase', emoji: '⚡', color: '#3ECF8E', category: 'Database', componentId: 'supabase' },
      },
      {
        id: 'clerk-supa',
        type: 'stackNode',
        position: { x: 320, y: 260 },
        data: { label: 'Clerk', emoji: '🪪', color: '#6C47FF', category: 'Auth', componentId: 'clerk' },
      },
      {
        id: 'vercel-supa',
        type: 'stackNode',
        position: { x: 560, y: 180 },
        data: { label: 'Vercel', emoji: '▲', color: '#ffffff', category: 'Hosting', componentId: 'vercel' },
      },
    ],
    edges: [
      { id: 'e1', source: 'next-supa', target: 'supa-db', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e2', source: 'next-supa', target: 'clerk-supa', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'e3', source: 'next-supa', target: 'vercel-supa', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    ],
  },
]