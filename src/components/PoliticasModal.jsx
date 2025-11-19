import React, { useEffect } from 'react'

const PoliticasModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      id="politicas-modal" 
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target.id === 'politicas-modal') {
          onClose()
        }
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Políticas de propiedad</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="politicas-content">
            <section className="politica-section">
              <h3>Consideraciones generales</h3>
              <div className="politica-item">
                <h4>Prohibición de fumar</h4>
                <p>No se permite fumar dentro de las habitaciones. Si desea hacerlo, consulte con administración por los espacios habilitados.</p>
              </div>
              <div className="politica-item">
                <h4>Mascotas</h4>
                <p>No se admiten animales de compañía.</p>
              </div>
              <div className="politica-item">
                <h4>Ruido y convivencia</h4>
                <p>La música, conversaciones o ruidos en terrazas están permitidos hasta las 21:00 horas. Posterior a ese horario, solicitamos mantener volumen bajo para resguardar el descanso de todos nuestros huéspedes.</p>
              </div>
              <div className="politica-item">
                <h4>Check-in y Check-out</h4>
                <ul>
                  <li><strong>Check-in:</strong> desde las 15:00 horas.</li>
                  <li><strong>Check-out:</strong> hasta las 12:00 horas.</li>
                  <li>Después de las 12:00 horas se cobrará un día adicional de estadía.</li>
                </ul>
              </div>
            </section>

            <section className="politica-section">
              <h3>Servicios y consideraciones para una estadía confortable</h3>
              <ul>
                <li>El servicio de mantención de habitaciones se realiza previo aviso a administración.</li>
                <li>Se entrega 1 set de toallas por persona al día.</li>
                <li>Las toallas del hotel son exclusivamente para uso en la ducha. Para piscina, jacuzzi o playa, el huésped debe traer sus propias toallas.</li>
                <li>El servicio de mucamas incluye aseo diario de habitaciones, camas y baño.</li>
                <li>No incluye lavado de loza, utensilios de cocina, horno ni cocina.</li>
                <li>Las habitaciones serán revisadas al momento del Check-out.</li>
                <li>Cualquier daño o pérdida ocasionado a la propiedad será cargado a la cuenta del huésped responsable.</li>
                <li>Servicio de lavado de ropa disponible: $18.000 por carga.</li>
              </ul>
            </section>

            <section className="politica-section">
              <h3>Políticas de Cancelación</h3>
              <ul>
                <li>Cancelaciones con mínimo 48 horas de anticipación: reembolso del 75% del valor abonado.</li>
                <li>Cancelaciones con menos de 48 horas de anticipación: no cuentan con reembolso.</li>
                <li>Re-agendamientos: se permiten sin costo con un mínimo de 24 horas de anticipación.</li>
                <li>No se realizan reembolsos si el huésped decide retirarse al llegar al hotel.</li>
                <li>No se realizan reembolsos si el huésped decide retirarse antes de su fecha de Check-out; deberá cancelar el saldo completo de la estadía.</li>
              </ul>
            </section>

            <section className="politica-section">
              <h3>Uso de Instalaciones</h3>
              <div className="politica-item">
                <h4>Sauna</h4>
                <p>Servicio externo al uso de la habitación. Disponible según disponibilidad.</p>
                <p><strong>Valores:</strong></p>
                <ul>
                  <li>$15.000 por persona</li>
                  <li>$25.000 para dos o más personas</li>
                </ul>
              </div>
              <div className="politica-item">
                <h4>Jacuzzi</h4>
                <p>Instalación externa incluida sin costo adicional.</p>
                <ul>
                  <li><strong>Horario de uso:</strong> 18:00 a 23:00 horas</li>
                  <li>Requiere coordinación previa con recepción.</li>
                </ul>
              </div>
              <div className="politica-item">
                <h4>Piscina</h4>
                <p>Instalación externa incluida sin costo adicional.</p>
                <p><strong>Horario de uso:</strong> 10:00 a 21:00 horas</p>
              </div>
              <div className="politica-item">
                <h4>Cafetería</h4>
                <p><strong>Horario de funcionamiento:</strong></p>
                <ul>
                  <li>Lunes a viernes: 9:00 a 21:00 hrs (pausa de 13:00 a 15:00 hrs)</li>
                  <li>Fin de semana: 9:00 a 22:30 hrs</li>
                </ul>
                <p>En caso de estar cerrada, comunicarse por WhatsApp para verificar disponibilidad.</p>
              </div>
            </section>

            <section className="politica-section">
              <h3>Instrucción de uso – Duchas</h3>
              <p>La ducha permite regular temperatura y presión moviendo la palanca bajo la regadera:</p>
              <ul>
                <li><strong>Caliente:</strong> hacia la izquierda y bajar la presión</li>
                <li><strong>Tibia:</strong> hacia la izquierda y subir</li>
                <li><strong>Fría:</strong> hacia la derecha y subir</li>
              </ul>
            </section>

            <section className="politica-section">
              <h3>Códigos QR disponibles</h3>
              <ul>
                <li>Wi-Fi</li>
                <li>Carta</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoliticasModal

