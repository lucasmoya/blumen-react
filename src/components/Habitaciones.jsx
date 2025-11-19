import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Header from './Header'
import Footer from './Footer'
import LoadingSpinner from './LoadingSpinner'
import WhatsAppButton from './WhatsAppButton'
import '../styles/rooms.css'

const Habitaciones = () => {
  const [isLoading, setIsLoading] = useState(true)
  const swiperRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  // Función para actualizar el estado de las flechas
  const updateExternalArrows = useCallback(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning)
      setIsEnd(swiperRef.current.isEnd)
    }
  }, [])

  const rooms = [
    {
      name: "GARDEN VIEW SUITE",
      description: "CAMA MATRIMONIAL | BAÑO PRIVADO | WIFI | CALEFACCIÓN | TV | ESTACIONAMIENTO | VISTAS AL JARDÍN | BALCÓN",
      details: "Habitación de un ambiente con cama doble, Tv, baño en suite, una cómoda kitchenette integrada, mesa y sillas en interior, terraza con vistas a la piscina y jardines con mesa y sillas en el exterior.",
      image: "https://i.ibb.co/PZH0QP2G/IMG-2659.jpg",
      features: {
        size: "25 m²",
        capacity: 2
      },
      price: 100000,
      link: "https://reservation.gofeels.com/es/room-detail/4359?CLP&token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389"
    },
    {
      name: "SUPERIOR SEA VIEW SUITE",
      description: "CAMA MATRIMONIAL | BAÑO PRIVADO | WIFI | CALEFACCIÓN | TV | ESTACIONAMIENTO | VISTA AL MAR | BALCÓN",
      details: "Apartamento de un ambiente en segundo piso con cama doble, TV, kitchenette aparte, mesa y sillas de interior, en suite, y balcón exterior con mesa y sillas con una completa vista al mar.",
      image: "https://i.ibb.co/vvDXpjLC/IMG-2681.jpg",
      features: {
        size: "22 m²",
        capacity: 2
      },
      price: 125000,
      link: "https://reservation.gofeels.com/es/room-detail/4360?CLP&token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389"
    },
    {
      name: "SEA VIEW LOFT",
      description: "CAMA MATRIMONIAL + 2 INDIVIDUAL | BAÑO PRIVADO | WIFI | CALEFACCIÓN | TV | ESTACIONAMIENTO | VISTA AL MAR | BALCÓN",
      details: "Loft abierto con Cama doble + dos camas en espacios separados pero un solo gran ambiente con cocina completa y baño, terrazas y vista al mar.",
      image: "https://i.ibb.co/ZjPpjGQ/IMG-2663.jpg",
      features: {
        size: "30 m²",
        capacity: 4
      },
      price: 170000,
      link: "https://reservation.gofeels.com/es/room-detail/4361?CLP&token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389"
    },
    {
      name: "SEA VIEW TWO-BEDROOM APARTMENT",
      description: "1 CAMA MATRIMONIAL + 3 INDIVIDUAL | BAÑO PRIVADO | WIFI | CALEFACCIÓN | TV | COCINA EQUIPADA | VISTA AL MAR | BALCÓN",
      details: "Apartamento de tres ambientes para hasta 5 personas, dos dormitor, living con TV y cocina americana. Balcón con vista al mar, con mesa y sillas de exterior.",
      image: "https://i.ibb.co/sdN47fBq/IMG-2684.jpg",
      features: {
        size: "45 m²",
        capacity: 5
      },
      price: 170000,
      link: "https://reservation.gofeels.com/es/room-detail/4363?CLP&token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389"
    },
    {
      name: "SEA VIEW SUITE + LIVING",
      description: "CAMA MATRIMONIAL | BAÑO PRIVADO | WIFI | CALEFACCIÓN | TV | ESTACIONAMIENTO | VISTA AL MAR | TOALLAS",
      details: "Habitación de un ambiente, en segundo piso con cama doble, TV, frigobar, cómoda sala de estar con sofá doble, sitial, mesa y sillas de interior, con vista al mar y baño en la planta baja.",
      image: "https://i.ibb.co/4ZjGFZ2y/IMG-2691.jpg",
      features: {
        size: "25 m²",
        capacity: 2
      },
      price: 125000,
      link: "https://reservation.gofeels.com/es/room-detail/4367?CLP&token=c5e0b3c8-efe9-4cb5-b3bc-33536d76f389"
    }
  ]

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

    const heroImage = '/habitaciones-page.jpg'

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
      {isLoading && <LoadingSpinner />}
      <div id="main-content" style={{ opacity: isLoading ? 0 : 1 }}>
        <div className="hero">
          <div className="hero-overlay"></div>
          
          <Header />

          <div className="hero-content">
            <h1>Habitaciones</h1>
          </div>
          
          <a 
            href="#rooms-section" 
            className="explore-more"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('#rooms-section')
            }}
          >
            <span>Explore más</span>
            <div className="arrow-down">
              <i className="fas fa-chevron-down"></i>
            </div>
          </a>
        </div>

        <div className="rooms-section" id="rooms-section">
          <div className="container">
            <div className="carousel-header">
              <h3>HABITACIONES</h3>
            </div>
            <div className="carousel-container">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  }
                }}
                grabCursor={true}
                loop={false}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                  // Actualizar estado inicial
                  updateExternalArrows()
                  // Conectar evento de cambio de slide (igual que el original)
                  swiper.on('slideChange', updateExternalArrows)
                }}
                onSlideChange={(swiper) => {
                  updateExternalArrows()
                }}
              >
                {rooms.map((room, index) => {
                  const capacityIcons = Array(room.features.capacity).fill(0).map((_, i) => (
                    <i key={i} className="fas fa-user"></i>
                  ))
                  const formattedPrice = room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  
                  return (
                    <SwiperSlide key={index}>
                      <div className="room-card">
                        <div className="room-image" style={{ backgroundImage: `url('${room.image}')` }}></div>
                        <div className="room-details">
                          <div className="room-top-content">
                            <h3 className="room-name">{room.name}</h3>
                            <p className="room-description">{room.description}</p>
                            <p className="room-text">{room.details}</p>
                          </div>
                          <div className="room-bottom-content">
                            <div className="room-info">
                              <div className="room-capacity">{capacityIcons}</div>
                              <div className="room-size">{room.features.size}</div>
                              <div className="room-price">${formattedPrice} CLP por noche</div>
                            </div>
                            <div className="room-actions">
                              <a href={room.link} target="_blank" rel="noopener noreferrer" className="book-now-btn">RESERVAR AHORA</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
          {/* External navigation arrows - outside container, near page edges */}
          <button 
            className="external-nav-arrow external-nav-prev" 
            id="externalPrevBtn"
            aria-label="Anterior"
            disabled={isBeginning}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slidePrev()
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className="external-nav-arrow external-nav-next" 
            id="externalNextBtn"
            aria-label="Siguiente"
            disabled={isEnd}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideNext()
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
      
      <style>{`
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
          background-image: url('/habitaciones-page.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
        }

        .hero .hero-content h1 {
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
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

        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        .swiper-pagination {
          padding-top: 0 !important;
          margin-top: 40px !important;
          position: relative !important;
        }

        .swiper-pagination-bullet {
          background: #e5d3c0 !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          margin: 0 4px !important;
          transition: background 0.3s;
          box-shadow: none !important;
          border: none !important;
        }

        .swiper-pagination-bullet-active {
          background: #c49c74 !important;
        }
      `}</style>
    </>
  )
}

export default Habitaciones

