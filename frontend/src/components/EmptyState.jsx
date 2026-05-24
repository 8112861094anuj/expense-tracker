import {
  Receipt
} from "lucide-react"

function EmptyState() {

  return (

    <div className="bg-white p-10 rounded-xl shadow-md text-center">

      <Receipt
        size={60}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-2xl font-bold mt-4">
        No Expenses Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Start adding expenses to track spending.
      </p>

    </div>
  )
}

export default EmptyState