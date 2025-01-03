import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const domNode = document.getElementById('root')
createRoot(domNode).render(<StrictMode>
  <App />
</StrictMode>)
