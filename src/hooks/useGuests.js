import { useState, useEffect } from 'react'

export const useGuests = () => {
  const [counts, setCounts] = useState({
    adults: 2,
    children: 0,
    babies: 0
  })

  const [isOpen, setIsOpen] = useState(false)

  const limits = {
    adults: { min: 1, max: 10 },
    children: { min: 0, max: 6 },
    babies: { min: 0, max: 4 }
  }

  const updateCount = (type, delta) => {
    setCounts(prev => {
      const newValue = prev[type] + delta
      if (newValue < limits[type].min || newValue > limits[type].max) {
        return prev
      }
      return { ...prev, [type]: newValue }
    })
  }

  const getSummary = () => {
    const total = counts.adults + counts.children + counts.babies
    let summary = total === 1 ? '1 Huésped' : `${total} Huéspedes`
    
    if (counts.children > 0 || counts.babies > 0) {
      const details = []
      if (counts.adults > 0) details.push(`${counts.adults} ${counts.adults === 1 ? 'adulto' : 'adultos'}`)
      if (counts.children > 0) details.push(`${counts.children} ${counts.children === 1 ? 'niño' : 'niños'}`)
      if (counts.babies > 0) details.push(`${counts.babies} ${counts.babies === 1 ? 'bebé' : 'bebés'}`)
      summary += ` (${details.join(', ')})`
    }
    
    return summary
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      const guestSummary = document.getElementById('guestSummary')
      const guestDropdown = document.querySelector('.guest-dropdown')
      
      if (guestSummary && !guestSummary.contains(e.target) && 
          guestDropdown && !guestDropdown.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return {
    counts,
    isOpen,
    setIsOpen,
    updateCount,
    getSummary,
    limits
  }
}

