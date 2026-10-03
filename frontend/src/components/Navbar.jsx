import { LogOut, Wallet } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Navbar() {

  const { logout } = useAuth()

  const navigate = useNavigate()

  const email = localStorage.getItem("userEmail")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (

    <div className="sticky top-5 z-50 px-6">

      <div
        className="
        relative
        overflow-hidden

        max-w-7xl
        mx-auto

        h-20
        px-8

        flex
        items-center
        justify-between

        rounded-[28px]

        bg-white/20
        backdrop-blur-[30px]

        border
        border-white/30

        shadow-[0_10px_45px_rgba(31,38,135,0.18)]
        ring-1
        ring-white/20

        transition-all
        duration-500
        "
      >

        {/* Liquid Glow */}

        <div className="absolute inset-0 pointer-events-none">

          <div
            className="
            absolute
            -top-20
            left-1/2
            -translate-x-1/2

            w-[70%]
            h-40

            bg-white/45
            blur-3xl
            opacity-80
            "
          />

          <div className="glass-shine" />

        </div>

        {/* Left */}

        <div className="relative z-10 flex items-center gap-4">

          <div
            className="
            w-12
            h-12

            rounded-2xl

            bg-gradient-to-br
            from-indigo-500
            to-violet-600

            text-white

            flex
            items-center
            justify-center

            shadow-xl
            "
          >

            <Wallet size={22} />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">

              ExpenseFlow

            </h1>

            <p className="text-sm text-gray-600">

              Personal Finance Dashboard

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="relative z-10 flex items-center gap-5">

          <div className="hidden md:flex flex-col items-end">

            <span className="text-xs text-gray-500">

              Signed in as

            </span>

            <span className="font-semibold text-gray-900">

              {email || "User"}

            </span>

          </div>

          <button
            onClick={handleLogout}
            className="
            flex
            items-center
            gap-2

            rounded-2xl

            bg-red-500/90
            hover:bg-red-600

            text-white

            px-5
            py-3

            shadow-xl

            transition-all
            duration-300

            hover:scale-105
            active:scale-95
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </div>

  )
}

export default Navbar