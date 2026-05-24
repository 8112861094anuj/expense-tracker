import { useState } from "react"

import toast from "react-hot-toast"

import api from "../services/api"

import { useNavigate } from "react-router-dom"

function Register() {

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await api.post("/users", {
        email,
        password
      })

	toast.success("Account created")

      navigate("/login")

    } catch (error) {

      console.log(error)

      toast.error("Registration failed")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Register
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
          Register
        </button>

      </form>

    </div>
  )
}

export default Register