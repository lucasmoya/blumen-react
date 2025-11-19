import React from 'react'
import { useDatepicker } from '../hooks/useDatepicker'
import { useGuests } from '../hooks/useGuests'

const SearchForm = () => {
  useDatepicker('checkin', 'checkout')
  const { counts, isOpen, setIsOpen, updateCount, getSummary, limits } = useGuests()

  const handleSearch = () => {
    const bookingUrl = 'https://reservation.gofeels.com/es/reservation/?token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389&rooms'
    window.open(bookingUrl, '_blank')
  }

  return (
    <div className="search-form">
      <div className="search-container">
        <div className="search-input">
          <i className="fas fa-tag"></i>
          <input type="text" placeholder="Código descuento" />
        </div>
        <div className="search-input">
          <i className="fas fa-calendar"></i>
          <input type="text" placeholder="Check in" id="checkin" readOnly />
        </div>
        <div className="search-input">
          <i className="fas fa-calendar"></i>
          <input type="text" placeholder="Check out" id="checkout" readOnly />
        </div>
        <div className="search-actions">
          <div className="search-input guest-dropdown-container">
            <i 
              className="fas fa-users"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
              style={{ cursor: 'pointer' }}
            ></i>
            <input 
              type="text" 
              readOnly 
              placeholder="Huéspedes" 
              id="guestSummary"
              value={getSummary()}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
            />
            <div className={`guest-dropdown ${isOpen ? 'active' : ''}`}>
              <div className="guest-type">
                <span>Adultos</span>
                <div className="counter">
                  <button 
                    className={`counter-btn minus ${counts.adults <= limits.adults.min ? 'disabled' : ''}`}
                    onClick={() => updateCount('adults', -1)}
                    disabled={counts.adults <= limits.adults.min}
                  >
                    -
                  </button>
                  <span className="count">{counts.adults}</span>
                  <button 
                    className={`counter-btn plus ${counts.adults >= limits.adults.max ? 'disabled' : ''}`}
                    onClick={() => updateCount('adults', 1)}
                    disabled={counts.adults >= limits.adults.max}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest-type">
                <span>Niños (2-12 años)</span>
                <div className="counter">
                  <button 
                    className={`counter-btn minus ${counts.children <= limits.children.min ? 'disabled' : ''}`}
                    onClick={() => updateCount('children', -1)}
                    disabled={counts.children <= limits.children.min}
                  >
                    -
                  </button>
                  <span className="count">{counts.children}</span>
                  <button 
                    className={`counter-btn plus ${counts.children >= limits.children.max ? 'disabled' : ''}`}
                    onClick={() => updateCount('children', 1)}
                    disabled={counts.children >= limits.children.max}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest-type">
                <span>Bebés (0-2 años)</span>
                <div className="counter">
                  <button 
                    className={`counter-btn minus ${counts.babies <= limits.babies.min ? 'disabled' : ''}`}
                    onClick={() => updateCount('babies', -1)}
                    disabled={counts.babies <= limits.babies.min}
                  >
                    -
                  </button>
                  <span className="count">{counts.babies}</span>
                  <button 
                    className={`counter-btn plus ${counts.babies >= limits.babies.max ? 'disabled' : ''}`}
                    onClick={() => updateCount('babies', 1)}
                    disabled={counts.babies >= limits.babies.max}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="apply-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
              >
                Aplicar
              </button>
            </div>
          </div>
          <button className="search-button" onClick={handleSearch}>Buscar</button>
        </div>
      </div>
    </div>
  )
}

export default SearchForm

