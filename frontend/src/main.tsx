// frontend/src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Registro del Service Worker generado por el plugin de Vite
import { registerSW } from 'virtual:pwa-register'

// Esta funcion registra el Service Worker apenas carga la app
registerSW({ immediate: true })

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('No se encontro el elemento root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)