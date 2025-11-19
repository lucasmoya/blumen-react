import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Establecer scroll al top de forma instantánea antes de renderizar
    // Usar requestAnimationFrame para asegurar que ocurra antes del render
    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    })
  }, [pathname])

  return null
}

export default ScrollToTop

