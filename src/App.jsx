// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StackPage from './pages/StackPage'
import ComparePage from './pages/ComparePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/stack/:id"  element={<StackPage />} />
        <Route path="/compare"    element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  )
}