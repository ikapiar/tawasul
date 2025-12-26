import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'wouter'
import App from './App'
import './index.css'

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
