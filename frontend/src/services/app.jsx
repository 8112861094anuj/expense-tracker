import { useEffect } from "react"
import api from "./services/api"

function App() {

  useEffect(() => {

    api.get("/")
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (
    <div className="p-10 text-3xl">
      Expense Tracker Frontend
    </div>
  )
}

export default App