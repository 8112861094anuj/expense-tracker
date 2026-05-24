import { useAuth } from "../context/AuthContext"

import { useNavigate } from "react-router-dom"

import {
  Moon,
  Sun
} from "lucide-react"

import {
  useTheme
} from "../context/ThemeContext"

function Navbar() {

  const { logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {

    logout()

    navigate("/login")
  }

  return (

    <div className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Expense Tracker
      </h1>

     <div className="flex items-center gap-4">

  <button
    onClick={toggleTheme}
    className="bg-gray-700 p-2 rounded"
  >

    {darkMode ? <Sun /> : <Moon />}

  </button>

  <button
    onClick={handleLogout}
    className="bg-red-500 px-4 py-2 rounded"
  >
    Logout
  </button>

</div>

    </div>
  )
}

export default Navbar