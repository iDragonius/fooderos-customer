import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <GoogleOAuthProvider
        clientId={
            '1070790515940-o7tmobmfpftfqmtiampmvd08igs94s5j.apps.googleusercontent.com'
        }
    >
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </GoogleOAuthProvider>
)
