import { useEffect, useRef } from 'react'
import flatpickr from 'flatpickr'

export const useDatepicker = (checkinId, checkoutId) => {
  const checkinPickerRef = useRef(null)
  const checkoutPickerRef = useRef(null)

  useEffect(() => {
    const spanishConfig = {
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        },
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        rangeSeparator: ' hasta ',
        time_24hr: true
      },
      dateFormat: "d/m/Y",
      minDate: "today",
      disableMobile: "true"
    }

    const checkinInput = document.getElementById(checkinId)
    const checkoutInput = document.getElementById(checkoutId)

    if (!checkinInput || !checkoutInput) return

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }

    checkinInput.value = formatDate(today)
    checkoutInput.value = formatDate(tomorrow)

    const checkinPicker = flatpickr(checkinInput, {
      ...spanishConfig,
      defaultDate: today,
      onChange: function(selectedDates, dateStr) {
        if (selectedDates[0]) {
          const nextDay = new Date(selectedDates[0])
          nextDay.setDate(nextDay.getDate() + 1)
          checkoutPickerRef.current.set('minDate', nextDay)
          
          const currentCheckout = checkoutPickerRef.current.selectedDates[0]
          if (currentCheckout && currentCheckout <= selectedDates[0]) {
            checkoutPickerRef.current.setDate(nextDay)
          }
        }
      }
    })

    const checkoutPicker = flatpickr(checkoutInput, {
      ...spanishConfig,
      defaultDate: tomorrow,
      minDate: tomorrow
    })

    checkinPickerRef.current = checkinPicker
    checkoutPickerRef.current = checkoutPicker

    const checkinIcon = checkinInput.parentElement?.querySelector('.fa-calendar')
    const checkoutIcon = checkoutInput.parentElement?.querySelector('.fa-calendar')
    
    if (checkinIcon) {
      checkinIcon.addEventListener('click', function(e) {
        e.stopPropagation()
        checkinPicker.open()
      })
      checkinIcon.style.cursor = 'pointer'
    }
    
    if (checkoutIcon) {
      checkoutIcon.addEventListener('click', function(e) {
        e.stopPropagation()
        checkoutPicker.open()
      })
      checkoutIcon.style.cursor = 'pointer'
    }

    return () => {
      if (checkinPickerRef.current) {
        checkinPickerRef.current.destroy()
      }
      if (checkoutPickerRef.current) {
        checkoutPickerRef.current.destroy()
      }
    }
  }, [checkinId, checkoutId])
}

