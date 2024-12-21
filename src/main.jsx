import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementsByTagName('body')[0]).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
