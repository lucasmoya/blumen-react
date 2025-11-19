import { useEffect, useRef } from 'react'

export const useMapbox = (mapElementId) => {
  const mapRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.mapboxgl) {
      console.warn('Mapbox GL not loaded')
      return
    }

    const mapboxgl = window.mapboxgl
    const mapElement = document.getElementById(mapElementId)
    if (!mapElement) return
    
    if (mapElement.classList.contains('mapboxgl-map') || mapElement.querySelector('.mapboxgl-canvas')) {
      return
    }
    
    mapElement.classList.add('loading-map')
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjYXNtb3lhIiwiYSI6ImNtOHJpbGZibzA2ZDcybXB3emd5MnF2b2wifQ.30AGj91NdxI-ZsqoEC6jDg'
    
    const initMap = async () => {
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Las%20Pimpinelas%20310%2C%20Concon%2C%20Chile.json?access_token=${mapboxgl.accessToken}`)
        const data = await response.json()
        
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center
          
          const originalDisplay = mapElement.style.display
          const originalVisibility = mapElement.style.visibility
          const originalHeight = mapElement.style.height
          
          mapElement.style.visibility = 'hidden'
          mapElement.style.height = '400px'
          mapElement.style.display = 'block'
          
          const map = new mapboxgl.Map({
            container: mapElementId,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [longitude, latitude + 0.0008],
            zoom: 16,
            attributionControl: false,
            preserveDrawingBuffer: true,
            renderWorldCopies: false,
            fadeDuration: 0,
            logoPosition: 'top-left',
            interactive: true
          })

          map.on('load', function() {
            const markerElement = document.createElement('div')
            markerElement.className = 'custom-marker'
            markerElement.innerHTML = `
              <svg width="30" height="40" viewBox="0 0 24 24" fill="#c49c74" stroke="#ffffff">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `

          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup({ offset: 15 })
                .setHTML(`
                  <div class="info-window">
                    <h3>Blumen Hotel</h3>
                    <p>Las Pimpinelas 310, Concon, Chile</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}" 
                       class="directions-button" target="_blank">
                       Cómo llegar
                    </a>
                  </div>
                `))
              .addTo(map)

            marker.togglePopup()
            
            mapElement.style.visibility = originalVisibility
            mapElement.style.display = originalDisplay
            mapElement.style.height = originalHeight
            
            map.dragPan.enable()
            map.scrollZoom.enable()
            map.touchZoomRotate.enable()
            
          map.addControl(new mapboxgl.NavigationControl(), 'top-right')
            
            mapElement.classList.remove('loading-map')
            
            setTimeout(() => {
              map.resize()
            }, 100)

            mapRef.current = map
          })
          
          map.on('error', function(e) {
            console.error('Map error:', e)
            mapElement.classList.remove('loading-map')
            mapElement.classList.add('map-error')
            
            mapElement.style.visibility = originalVisibility
            mapElement.style.display = originalDisplay
            mapElement.style.height = originalHeight
          })

          const handleResize = () => {
            if (mapRef.current) mapRef.current.resize()
          }

          window.addEventListener('resize', handleResize)
          
          const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect()
            return (
              rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.bottom >= 0 &&
              rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
              rect.right >= 0
            )
          }

          const handleScroll = () => {
            if (isElementInViewport(mapElement) && mapRef.current) {
              mapRef.current.resize()
            }
          }

          document.addEventListener('scroll', handleScroll)

          return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('scroll', handleScroll)
            if (mapRef.current) {
              mapRef.current.remove()
            }
          }
        }
      } catch (error) {
        console.error('Error loading map:', error)
        mapElement.classList.remove('loading-map')
        mapElement.classList.add('map-error')
      }
    }

    const timeoutId = setTimeout(() => {
      initMap()
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [mapElementId])
}

