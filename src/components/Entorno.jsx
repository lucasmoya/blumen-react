import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import LoadingSpinner from './LoadingSpinner'
import WhatsAppButton from './WhatsAppButton'
import SEO from './SEO'

const Entorno = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Scroll al top cuando se monta el componente (sin animación)
  useEffect(() => {
    // Establecer directamente sin animación
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [])

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

    const heroImage = '/entorno-page.jpg'

    Promise.all([
      document.fonts.ready,
      loadImages([heroImage])
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
      <SEO
        title="Blumen Hotel - Entorno | Hotel en Concón - Costa Brava con habitaciones con vista al mar, piscina y jacuzzi"
        description="Conoce el entorno único de Blumen Hotel en Costa Brava, Concón. A 300m de la costanera, cerca de playas, dunas y restaurantes. Ubicación privilegiada con vista al mar."
        keywords="hotel costa brava concón, hotel playa concón, hotel cerca del mar concón, ubicación hotel concón, hotel dunas concón, hotel playa amarilla, hotel concón centro, entorno hotel costa brava, hotel con vista al mar concón, hotel piscina costa brava, hotel jacuzzi concón, entorno blumen hotel"
        canonical="https://www.blumenhotel.cl/entorno"
        ogImage="https://www.blumenhotel.cl/entorno-page.jpg"
        ogImageAlt="Entorno de Blumen Hotel en Costa Brava, Concón"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Entorno - Blumen Hotel",
          "description": "Conoce el entorno único de Blumen Hotel en Costa Brava, Concón. A 300m de la costanera, cerca de playas, dunas y restaurantes.",
          "url": "https://www.blumenhotel.cl/entorno",
          "mainEntity": {
            "@type": "Hotel",
            "name": "Blumen Hotel",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Las Pimpinelas 310",
              "addressLocality": "Concón",
              "addressRegion": "Valparaíso",
              "addressCountry": "CL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -33.0167,
              "longitude": -71.5167
            }
          }
        }}
      />
      {isLoading && <LoadingSpinner />}
      <div id="main-content" style={{ opacity: isLoading ? 0 : 1 }}>
        <div className="hero">
          <div className="hero-overlay"></div>
          
          <Header />

          <div className="hero-content">
            <h1>Entorno</h1>
          </div>
          
          <a 
            href="#entorno-section" 
            className="explore-more"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('#entorno-section')
            }}
          >
            <span>Explore más</span>
            <div className="arrow-down">
              <i className="fas fa-chevron-down"></i>
            </div>
          </a>
        </div>

        <div className="entorno-section" id="entorno-section">
          <div className="container">
            <div className="entorno-header">
              <h3>NOSOTROS Y EL ENTORNO</h3>
            </div>
            <div className="entorno-content">
              <div className="entorno-text">
                <p>El Hotel Blumen está ubicado en la calle Las Pimpinelas 310, en el sector Costa Brava de Concón, un barrio residencial exclusivo y muy tranquilo. Goza de un escenario costero privilegiado, con 12 habitaciones —8 de ellas con vista al mar— piscina, jacuzzi al aire libre, sauna, sala de masajes y una acogedora cafetería con seis mesas y una preciosa vista al océano.</p>
                
                <p>A tan solo 300 metros de la costanera, el hotel se encuentra muy próximo al mar y a las dunas de Concón, lo que permite que los huéspedes disfruten de un entorno marítimo auténtico y una atmósfera natural y apacible. Las dunas que se extienden entre Concón y Reñaca son un espacio emblemático de la zona, con vegetación costera característica y una panorámica abierta al horizonte, perfecta para paseos o fotografías al atardecer.</p>
                
                <p>El acceso al hotel conserva un ambiente residencial: calles silenciosas, edificaciones bajas y jardines bien cuidados, que refuerzan la sensación de calma y descanso. Sin embargo, su ubicación también ofrece gran comodidad: a pocos minutos hay restaurantes, cafés, supermercados y servicios locales, lo que permite disfrutar tanto de la tranquilidad como de la cercanía al comercio y la vida urbana costera.</p>
                
                <p>A corta distancia se encuentran playas como Playa Amarilla (300 m), reconocida por su arena clara y ambiente familiar, así como Los Lilenes (500 m) y Cochoa (2,4 km). El Club Náutico de Concón, ubicado a unos 700 metros, complementa este entorno marítimo con actividades náuticas y un paisaje de mar abierto.</p>
                
                <p>En conjunto, el entorno del Hotel Blumen combina serenidad y comodidad: la cercanía al mar, el aire salino, la luz costera y los servicios del vecindario crean una experiencia equilibrada entre descanso, naturaleza y vida local.</p>
              </div>
              <div className="entorno-image">
                <img src="/gaviota.png" alt="Gaviota volando sobre el entorno costero de Blumen Hotel en Concón" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
      
      <style>{`
        #main-content {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        .hero {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        .hero-background-slideshow {
          display: none !important;
        }
        
        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/entorno-page.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
        }

        .hero .logo img {
          filter: brightness(0) invert(1) !important;
        }

        .hero .logo a {
          display: inline-block;
          text-decoration: none;
        }

        .hero .nav-links a {
          color: white;
          transition: color 0.3s;
        }

        .hero .nav-links a:hover {
          color: #c49c74;
        }

        .hero .app-button {
          background-color: transparent !important;
          color: white !important;
          border: 2px solid white !important;
        }

        .hero .app-button:hover {
          background-color: rgba(255, 255, 255, 0.2) !important;
          border-color: #e5e5e5 !important;
          color: #ffffff !important;
        }

        .hero .app-button i {
          color: white !important;
        }

        .hero .hero-content h1 {
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .entorno-section {
          padding: 80px 0 60px;
          background-color: white;
        }

        .entorno-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .entorno-header h3 {
          font-size: 24px;
          font-weight: 700;
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .entorno-content {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .entorno-text {
          max-width: 100%;
        }

        .entorno-text p {
          font-size: 16px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 24px;
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
          font-weight: 400;
        }

        .entorno-text p:last-child {
          margin-bottom: 0;
        }

        .entorno-image {
          width: 100%;
        }

        .entorno-image img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        @media (min-width: 992px) {
          .entorno-content {
            flex-direction: row;
            align-items: flex-start;
          }

          .entorno-text {
            flex: 1;
            max-width: 60%;
          }

          .entorno-image {
            flex: 1;
            max-width: 40%;
          }
        }
      `}</style>
    </>
  )
}

export default Entorno

