import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage, 
  ogImageAlt,
  schema 
}) => {
  const baseUrl = 'https://www.blumenhotel.cl'
  const fullTitle = title || 'Blumen Hotel | Hotel en Concón - Costa Brava con habitaciones con vista al mar, piscina y jacuzzi'
  const fullDescription = description || 'Blumen Hotel en Concón, Costa Brava. 12 habitaciones con vista al mar, piscina, jacuzzi, sauna y cafetería. Ubicado a 300m de la costanera. Reserva tu estadía en la capital gastronómica de Chile.'
  const fullKeywords = keywords || 'hotel concón, hotel costa brava, hotel con piscina concón, hotel con jacuzzi concón, hotel con sauna concón, hotel vista al mar concón, hotel playa concón, hotel boutique concón, hotel spa concón, alojamiento costa brava, hotel relax concón, hotel concón chile, blumen hotel, hotel con piscina costa brava'
  const fullCanonical = canonical || baseUrl
  const fullOgImage = ogImage || `${baseUrl}/background-index/1.jpg`
  const fullOgImageAlt = ogImageAlt || 'Blumen Hotel - Vista del hotel en Costa Brava, Concón'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullOgImageAlt} />
      <meta property="og:locale" content="es_CL" />
      <meta property="og:site_name" content="Blumen Hotel" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={fullOgImageAlt} />
      
      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO

