import React from "react"
import { Toaster } from "react-hot-toast"
import ReactDOM from "react-dom/client"
import {
  ThemeProvider
} from "./context/ThemeContext"

import App from "./App"

import "./index.css"

import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"

import { GoogleOAuthProvider }
from "@react-oauth/google"

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>
	
	<Toaster position="top-right" />
	<ThemeProvider>

      <AuthProvider>

        <App />

      </AuthProvider>
	</ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>
)

<GoogleOAuthProvider;clientId="536095167798-7cjccgeonb3r7gcficsui5pvk6k9dc0a.apps.googleusercontent.com">

  <React.StrictMode>
    <BrowserRouter>

      <Toaster position="top-right" />

      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>


