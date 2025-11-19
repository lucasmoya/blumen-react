import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const handleReservar = () => {
    window.open('https://reservation.gofeels.com/es/reservation/?token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389&rooms', '_blank')
  }

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="https://i.postimg.cc/rskt76HR/blumen-mobile.png" alt="Blumen Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/entorno">Entorno</Link>
          <Link to="/habitaciones">Habitaciones</Link>
          <a href="https://app.menuo.cl/blumenhotel" target="_blank" rel="noopener noreferrer">Café</a>
        </div>
        <button className="app-button" onClick={handleReservar}>
          Reservar
          <i className="fa-solid fa-bell-concierge"></i>
        </button>
      </nav>
    </header>
  )
}

export default Header

