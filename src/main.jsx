// import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="600395796293-1ct9un3h4oq87j5defursu78o2fp9nmk.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)


