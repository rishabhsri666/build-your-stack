// src/services/stackService.js
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'stacks'

// ─── Shape of a saved stack ───────────────────────────────────────────────────
//
// {
//   id: string              (Firestore auto-generated)
//   title: string
//   nodes: ReactFlowNode[]
//   edges: ReactFlowEdge[]
//   createdAt: Timestamp
//   updatedAt: Timestamp
//   viewCount: number
// }




// ─── Save a new stack ─────────────────────────────────────────────────────────

export async function saveStack({ title, nodes, edges }) {
  if (!nodes || nodes.length === 0) {
    throw new Error('Cannot save an empty stack.')
  }

  // Strip React Flow's internal runtime fields — only persist data we own
  const cleanNodes = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }))

  const cleanEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.animated ?? true,
    style: edge.style ?? {},
  }))

  const docRef = await addDoc(collection(db, COLLECTION), {
    title: title || 'Untitled Stack',
    nodes: cleanNodes,
    edges: cleanEdges,
    viewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id  // this becomes the shareable URL ID
}

export async function updateStack(id, { title, nodes, edges }) {
  if (!id) {
    throw new Error('Missing stack ID for update.')
  }
  if (!nodes || nodes.length === 0) {
    throw new Error('Cannot save an empty stack.')
  }

  const cleanNodes = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }))

  const cleanEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.animated ?? true,
    style: edge.style ?? {},
  }))

  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    title: title || 'Untitled Stack',
    nodes: cleanNodes,
    edges: cleanEdges,
    updatedAt: serverTimestamp(),
  })

  return id
}

export async function deleteStack(id) {
  if (!id) {
    throw new Error('Missing stack ID for delete.')
  }
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
  return id
}

// ─── Fetch a stack by ID ──────────────────────────────────────────────────────

export async function fetchStack(id) {
  const docRef = doc(db, COLLECTION, id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    throw new Error(`Stack not found: ${id}`)
  }

  // Increment view count silently (fire and forget — don't await)
  updateDoc(docRef, { viewCount: snapshot.data().viewCount + 1 }).catch(() => {})

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

// ─── Fetch recent stacks (for a gallery later) ────────────────────────────────

export async function fetchRecentStacks(count = 10) {
  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(count)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}