import React, { useState } from 'react'
import PoliticasModal from './PoliticasModal'

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="https://i.postimg.cc/rskt76HR/blumen-mobile.png" alt="Blumen Logo" className="footer-logo" />
              <div className="social-icons">
                <a href="https://www.instagram.com/blumen_hotel/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/+56982161327" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="mailto:reservasblumenconcon@gmail.com">
                  <i className="far fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="footer-address">
              <p>Las Pimpinelas 310,</p>
              <p>Costa Brava,</p>
              <p>Concón.</p>
            </div>
          </div>
        </div>
        <div className="legal-footer">
          <div className="container">
            <div className="legal-footer-content">
              <div className="legal-links">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Términos y condiciones</a>
              </div>
              <div className="copyright">
                <span>Powered by</span>
                <img src="/protolab-logo.png" alt="Protolab Logo" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <PoliticasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Footer

