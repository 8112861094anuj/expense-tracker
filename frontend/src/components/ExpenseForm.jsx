import { useState } from "react"

function ExpenseForm({ onAddExpense }) {

  const [title, setTitle] = useState("")

  const [amount, setAmount] = useState("")

  const [category, setCategory] = useState("")

  const handleSubmit = (e) => {

    e.preventDefault()

    onAddExpense({
      title,
      amount: parseFloat(amount),
      category
    })

    setTitle("")
    setAmount("")
    setCategory("")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button
        className="bg-black text-white px-4 py-3 rounded w-full"
      >
        Add Expense
      </button>

    </form>
  )
}

export default ExpenseForm