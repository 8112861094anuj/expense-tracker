import { useState } from "react"

import toast from "react-hot-toast"

import api from "../services/api"

import { useAuth } from "../context/AuthContext"

import { useNavigate } from "react-router-dom"

import { GoogleLogin }
from "@react-oauth/google";

import axios from "axios";


function Login() {

const handleGoogleSuccess = async (
  credentialResponse
) => {

  try {

    const response = await api.post(
      "/google-login",
      {
        token: credentialResponse.credential
      }
    )

    console.log("FULL RESPONSE:", response.data)

    const token =
      response.data.access_token ||
      response.data.token ||
      response.data.jwt

    if (!token) {
      toast.error("No token returned")
      return
    }

    login(token)

    console.log(
      "TOKEN SAVED:",
      localStorage.getItem("token")
    )

    toast.success("Login successful")

    navigate("/dashboard")

  } catch (error) {

    console.log(error)

    toast.error("Google authentication failed")
  }
}

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/login",
        {
          email,
          password
        }
      )

      login(response.data.access_token)
	toast.success("Login successful")

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

       toast.error("Invalid credentials")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
  className="w-full bg-black text-white p-3 rounded"
>
  Login
</button>

<div className="pt-4">

  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => {
      toast.error("Google login failed")
    }}
  />

</div>

<p className="text-center text-sm">
  Don't have an account?
</p>

 


<button
  type="button"
  onClick={() => navigate("/register")}
  className="w-full border border-black p-3 rounded"
>
  Create Account
</button>

      </form>

    </div>
  )
}

export default Login