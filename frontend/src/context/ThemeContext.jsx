import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light")

  useEffect(() => {

    document.documentElement.className = theme

  }, [theme])

  const toggleTheme = () => {

    setTheme((prevTheme) =>

      prevTheme === "light"
        ? "dark"
        : "light"
    )
  }

  return (

    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext.Provider>
  )
}

export const useTheme = () => {

  return useContext(ThemeContext)
}