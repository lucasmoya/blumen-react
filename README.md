# Blumen Hotel - React Landing Page

Landing page del Hotel Blumen convertida a React con Vite.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El proyecto se ejecutará en `http://localhost:3000`

## Build para producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`

## Preview de producción

```bash
npm run preview
```

## Estructura del proyecto

```
├── public/              # Archivos estáticos (imágenes, favicons, etc.)
├── src/
│   ├── components/      # Componentes React
│   │   ├── Home.jsx
│   │   ├── Habitaciones.jsx
│   │   ├── Entorno.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── hooks/           # Custom hooks
│   │   ├── useBackgroundSlideshow.js
│   │   ├── useDatepicker.js
│   │   ├── useGuests.js
│   │   └── useMapbox.js
│   ├── styles/          # Archivos CSS
│   │   ├── index.css
│   │   └── rooms.css
│   ├── App.jsx          # Componente principal con rutas
│   └── main.jsx         # Punto de entrada
├── index.html           # HTML principal para Vite
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias del proyecto
```

## Tecnologías utilizadas

- React 18
- Vite
- React Router DOM
- Flatpickr (datepicker)
- Swiper (carrusel de habitaciones)
- Mapbox GL JS (mapa)

## Notas

- Los archivos HTML originales se guardaron como `*-original.html`
- Todos los estilos y funcionalidades se mantienen igual que en la versión original
- El diseño y la interfaz no han sido modificados

