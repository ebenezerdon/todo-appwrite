import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Notes from './pages/Notes'
import Auth from './pages/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Notes />} path="/" />
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
