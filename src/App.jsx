import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Habitaciones from './components/Habitaciones'
import Entorno from './components/Entorno'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/entorno" element={<Entorno />} />
      </Routes>
    </Router>
  )
}

export default App

