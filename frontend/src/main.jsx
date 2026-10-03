import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from "@react-oauth/google"

import App from "./App"

import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"

import "./index.css"

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId={clientId}>

      <BrowserRouter>

        <Toaster position="top-right" />

        <ThemeProvider>

          <AuthProvider>

            <App />

          </AuthProvider>

        </ThemeProvider>

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>
)