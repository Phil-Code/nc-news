import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LoginProvider } from './Components/Contexts/LoginContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </LoginProvider>
  </React.StrictMode>,
)
