import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import LoadingSpinner from './LoadingSpinner'
import SearchForm from './SearchForm'
import WhatsAppButton from './WhatsAppButton'
import { useBackgroundSlideshow } from '../hooks/useBackgroundSlideshow'
import { useMapbox } from '../hooks/useMapbox'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const slideshowRef = useRef(null)
  
  // Inicializar slideshow después de que el componente se monte
  useEffect(() => {
    if (!isLoading) {
      // Pequeño delay para asegurar que los slides estén en el DOM
      const timer = setTimeout(() => {
        slideshowRef.current = true
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isLoading])
  
  useBackgroundSlideshow()
  useMapbox('map')

  useEffect(() => {
    const loadImages = (urls) => {
      return Promise.all(
        urls.map(url => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve
            img.src = url
          })
        })
      )
    }

    const heroImages = [
      '/background-index/1.jpg',
      '/background-index/2.jpg',
      '/background-index/3.jpg',
      '/background-index/4.jpg',
      '/background-index/5.jpg',
      '/background-index/6.jpg'
    ]

    Promise.all([
      document.fonts.ready,
      loadImages(heroImages)
    ]).then(() => {
      setIsLoading(false)
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.style.opacity = '1'
        mainContent.style.transition = 'opacity 0.5s ease-in'
      }
    })
  }, [])

  const smoothScrollTo = (elementId) => {
    const element = document.querySelector(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div id="main-content" style={{ opacity: isLoading ? 0 : 1 }}>
        <div className="hero">
          <div className="hero-background-slideshow">
            <div className="hero-slide active" style={{ backgroundImage: "url('/background-index/1.jpg')" }}></div>
            <div className="hero-slide" style={{ backgroundImage: "url('/background-index/2.jpg')" }}></div>
            <div className="hero-slide" style={{ backgroundImage: "url('/background-index/3.jpg')" }}></div>
            <div className="hero-slide" style={{ backgroundImage: "url('/background-index/4.jpg')" }}></div>
            <div className="hero-slide" style={{ backgroundImage: "url('/background-index/5.jpg')" }}></div>
            <div className="hero-slide" style={{ backgroundImage: "url('/background-index/6.jpg')" }}></div>
          </div>
          <div className="hero-overlay"></div>
          
          <Header />

          <div className="hero-content">
            <h1 className="sr-only">Blumen Hotel | Hotel en Concón - Costa Brava con habitaciones con vista al mar, piscina y jacuzzi</h1>
            <SearchForm />
          </div>
          
          <a 
            href="#highlights" 
            className="explore-more"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('#highlights')
            }}
          >
            <span>Explore más</span>
            <div className="arrow-down">
              <i className="fas fa-chevron-down"></i>
            </div>
          </a>
        </div>

        <div className="highlights-section" id="highlights">
          <div className="container">
            <div className="highlights-grid">
              <Link to="/entorno" className="highlight-card">
                <img src="/entorno.jpg" alt="Entorno costero de Blumen Hotel en Costa Brava, Concón con vista al mar y dunas" className="highlight-image" />
                <div className="highlight-overlay">
                  <h3 className="highlight-title">Entorno</h3>
                </div>
              </Link>
              <div className="highlight-card">
                <Link to="/habitaciones">
                  <img src="/habitaciones.jpg" alt="Habitaciones de Blumen Hotel con vista al mar en Concón, Costa Brava" className="highlight-image" />
                  <div className="highlight-overlay">
                    <h3 className="highlight-title">Habitaciones</h3>
                  </div>
                </Link>
              </div>
              <a href="https://app.menuo.cl/blumenhotel" target="_blank" rel="noopener noreferrer" className="highlight-card">
                <img src="/cafeteria.jpg" alt="Cafetería de Blumen Hotel con vista al océano en Concón" className="highlight-image" />
                <div className="highlight-overlay">
                  <h3 className="highlight-title">Café</h3>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="container">
            <h2 className="sr-only">¿Por qué elegir Blumen Hotel?</h2>
            <div className="features-grid">
              <div className="feature">
                <h3>Ubicación privilegiada</h3>
                <p>En Costa Brava, Concón, rodeado de dunas y a solo 300 metros de la costanera. Disfrute de un entorno costero exclusivo y tranquilo.</p>
              </div>
              <div className="feature">
                <h3>Instalaciones</h3>
                <p>Piscina, jacuzzi al aire libre, sauna, sala de masajes y cafetería con vista al mar. 12 habitaciones, 8 con vista al océano.</p>
              </div>
              <div className="feature">
                <h3>Experiencia costera</h3>
                <p>Disfrute de la serenidad junto al mar, con playas cercanas, dunas naturales y la tranquilidad que busca para desconectarse.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="seo-content-section sr-only">
          <div className="container">
            <h2>Hotel Boutique con Piscina, Sauna y Jacuzzi en Concón</h2>
            <div>
              <p>Blumen Hotel es el hotel ideal en Concón para quienes buscan un lugar de descanso con todas las comodidades. Nuestro <strong>hotel cuenta con piscina</strong> climatizada al aire libre, <strong>jacuzzi con vista al mar</strong>, y <strong>sauna finlandesa</strong> para una experiencia de relajación completa. Ubicados en Costa Brava, somos el único hotel boutique en Concón que combina vistas al océano Pacífico con instalaciones de spa de primer nivel.</p>

              <p>Si buscas un <strong>hotel con piscina en Concón</strong>, nuestras instalaciones están abiertas todo el año para que disfrutes del clima privilegiado de la zona. El <strong>hotel con jacuzzi en Costa Brava</strong> que estabas buscando: nuestro jacuzzi al aire libre ofrece una experiencia única con vista directa al mar. Y para los amantes del wellness, nuestro <strong>hotel con sauna en Concón</strong> te ofrece sesiones de relajación profunda en un entorno costero incomparable.</p>

              <p>Nuestro <strong>hotel vista al mar en Concón</strong> ofrece 8 habitaciones con vistas panorámicas al océano, perfectas para despertar con el sonido de las olas. Como <strong>hotel playa Concón</strong>, estamos a solo 300 metros de la costanera y cerca de playas icónicas como Playa Amarilla. Descubre por qué somos el <strong>mejor hotel en Costa Brava</strong> para tu próxima escapada junto al mar.</p>
            </div>
          </div>
        </div>

        <div className="info-section" id="info-section">
          <div className="container">
            <div className="info-content">
              <div className="info-text">
                <h2>Nuestro hotel está ubicado en Concón, en el sector de Costa Brava, característico por su tranquilidad y hermosas vistas.</h2>
                <p>Ubicado en el corazón de la capital gastronómica de Chile, Blumen Hotel te invita a vivir la auténtica esencia de Concón: un destino donde la buena mesa, la naturaleza y el mar se combinan en perfecta armonía. A pocos pasos de reconocidas picadas y restaurantes de cocina marina, podrás disfrutar de lo mejor del Pacífico chileno mientras contemplas las vistas únicas de la costa. Muy cerca también encontrarás la icónica Playa La Boca, punto de encuentro de surfistas durante todo el año, ideal para quienes buscan energía, deporte y atardeceres inolvidables.</p>
              </div>
              <div className="info-map" id="map"></div>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
      
      <style>{`
        /* Asegurar que no haya imagen de fondo estática en Home */
        .hero::before {
          display: none !important;
          content: none !important;
          background-image: none !important;
        }
        
        /* Asegurar que el slideshow esté visible */
        .hero-background-slideshow {
          display: block !important;
        }
      `}</style>
    </>
  )
}

export default Home

