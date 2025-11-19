import { useEffect, useRef } from 'react'

// Configuración
const FADE_DURATION = 2000 // Duración del fade en milisegundos (debe coincidir con CSS)
const ZOOM_DURATION = 3000 // Duración del zoom (3 segundos)
const HOLD_DURATION = 1000 // Tiempo que se queda en el tamaño final (1 segundo)
const DISPLAY_DURATION = ZOOM_DURATION + HOLD_DURATION // Tiempo total que cada imagen se muestra (3s zoom + 1s espera = 4s)

export const useBackgroundSlideshow = () => {
  const intervalRef = useRef(null)

  useEffect(() => {
    // Pre-cargar todas las imágenes para evitar flashes
    const preloadImages = (callback) => {
      const imagePaths = []
      for (let i = 1; i <= 6; i++) {
        imagePaths.push(`/background-index/${i}.jpg`)
      }

      let loadedCount = 0
      const images = []

      imagePaths.forEach((path, index) => {
        const img = new Image()
        img.onload = function() {
          loadedCount++
          if (loadedCount === imagePaths.length && callback) {
            callback()
          }
        }
        img.onerror = function() {
          loadedCount++
          if (loadedCount === imagePaths.length && callback) {
            callback()
          }
        }
        img.src = path
        images.push(img)
      })

      return images
    }

    // Inicializar el slideshow
    const initSlideshow = () => {
      const slides = document.querySelectorAll('.hero-slide')
      
      if (slides.length === 0) {
        console.warn('No se encontraron slides para el hero')
        return
      }

      let currentIndex = 0
      let nextIndex = 1

      // Función para cambiar a la siguiente imagen
      const nextSlide = () => {
        const currentSlide = slides[currentIndex]
        const nextSlide = slides[nextIndex]

        if (!currentSlide || !nextSlide) return

        // Reiniciar la animación de zoom removiendo y agregando la clase
        // Esto asegura que la animación se reinicie cada vez
        if (nextSlide.classList.contains('active')) {
          nextSlide.classList.remove('active')
          void nextSlide.offsetHeight // Forzar reflow
        }
        
        // Agregar la clase active a la siguiente imagen
        // Esto iniciará el fade-in y zoom-in de la nueva imagen
        nextSlide.classList.add('active')
        
        // Forzar reflow para asegurar que el navegador procese el cambio
        // antes de remover la clase de la imagen actual
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Capturar el transform actual de la imagen que se va a ocultar
            // para mantenerlo durante el fade out
            const computedStyle = window.getComputedStyle(currentSlide)
            const currentTransform = computedStyle.transform
            
            // Aplicar el transform actual para mantenerlo durante el fade out
            // Asegurarse de incluir translateZ(0) para aceleración por hardware
            if (currentTransform && currentTransform !== 'none') {
              // Si el transform no incluye translateZ, agregarlo
              if (!currentTransform.includes('translateZ')) {
                currentSlide.style.transform = currentTransform.replace('matrix', 'translateZ(0) matrix')
              } else {
                currentSlide.style.transform = currentTransform
              }
            } else {
              currentSlide.style.transform = 'translateZ(0) scale(1.08)'
            }
            
            // Remover la clase active de la imagen actual
            // Esto iniciará el fade-out mientras la nueva imagen hace fade-in
            currentSlide.classList.remove('active')
            
            // Resetear el zoom de la imagen anterior DESPUÉS del fade out
            // Esto evita el salto visual
            setTimeout(() => {
              // Remover el transform inline para permitir que el reset funcione
              currentSlide.style.transform = ''
              currentSlide.classList.add('resetting')
              void currentSlide.offsetHeight // Forzar reflow
              currentSlide.classList.remove('resetting')
            }, FADE_DURATION)
          })
        })

        // Actualizar índices
        currentIndex = nextIndex
        nextIndex = (nextIndex + 1) % slides.length
      }

      // Iniciar el ciclo de transiciones
      const startSlideshow = () => {
        // Iniciar el intervalo inmediatamente para que todas las imágenes tengan la misma duración
        // La primera imagen ya está activa desde el HTML, así que empezará el ciclo después de DISPLAY_DURATION
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(nextSlide, DISPLAY_DURATION)
      }

      // Pre-cargar imágenes y luego iniciar
      preloadImages(() => {
        // Las imágenes están cargadas, iniciar el slideshow
        startSlideshow()
      })
    }

    // Limpiar intervalo cuando la página se oculta (para ahorrar recursos)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      } else {
        // Re-inicializar si no hay intervalo activo
        const slides = document.querySelectorAll('.hero-slide')
        if (slides.length > 0 && !intervalRef.current) {
          let currentIndex = 0
          let nextIndex = 1

          const nextSlide = () => {
            const currentSlide = slides[currentIndex]
            const nextSlide = slides[nextIndex]

            if (!currentSlide || !nextSlide) return

            if (nextSlide.classList.contains('active')) {
              nextSlide.classList.remove('active')
              void nextSlide.offsetHeight
            }
            
            nextSlide.classList.add('active')
            
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const computedStyle = window.getComputedStyle(currentSlide)
                const currentTransform = computedStyle.transform
                
                if (currentTransform && currentTransform !== 'none') {
                  if (!currentTransform.includes('translateZ')) {
                    currentSlide.style.transform = currentTransform.replace('matrix', 'translateZ(0) matrix')
                  } else {
                    currentSlide.style.transform = currentTransform
                  }
                } else {
                  currentSlide.style.transform = 'translateZ(0) scale(1.08)'
                }
                
                currentSlide.classList.remove('active')
                
                setTimeout(() => {
                  currentSlide.style.transform = ''
                  currentSlide.classList.add('resetting')
                  void currentSlide.offsetHeight
                  currentSlide.classList.remove('resetting')
                }, FADE_DURATION)
              })
            })

            currentIndex = nextIndex
            nextIndex = (nextIndex + 1) % slides.length
          }

          intervalRef.current = setInterval(nextSlide, DISPLAY_DURATION)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Esperar a que los slides estén en el DOM
    const checkAndInit = () => {
      const slides = document.querySelectorAll('.hero-slide')
      if (slides.length > 0) {
        initSlideshow()
      } else {
        // Si no están disponibles, intentar de nuevo después de un delay
        setTimeout(checkAndInit, 100)
      }
    }

    // Inicializar después de que el componente se monte
    const timeoutId = setTimeout(checkAndInit, 200)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])
}

