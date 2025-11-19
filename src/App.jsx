import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './components/Home'
import Habitaciones from './components/Habitaciones'
import Entorno from './components/Entorno'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/entorno" element={<Entorno />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

