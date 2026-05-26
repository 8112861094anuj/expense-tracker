import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react"
 

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  )

  const [user, setUser] = useState(null)

  const login = (jwtToken) => {

    localStorage.setItem("token", jwtToken)

    setToken(jwtToken)
  }

  const logout = () => {

    localStorage.removeItem("token")

    setToken(null)

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}