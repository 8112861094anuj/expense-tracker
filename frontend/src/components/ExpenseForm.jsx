import { useState } from "react"

import {
  Pencil,
  IndianRupee,
  Tag,
  Plus
} from "lucide-react"

function ExpenseForm({ onAddExpense }) {

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!title || !amount || !category) return

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

    <div className="glass p-8 relative overflow-hidden">

      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Add New Expense

        </h2>

        <p className="text-gray-500 mt-1">

          Track your daily spending beautifully.

        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div className="relative">

          <Pencil
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Expense title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white/80 pl-12 pr-4 py-4 text-gray-800 shadow-sm focus:border-indigo-500"
          />

        </div>

        <div className="relative">

          <IndianRupee
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white/80 pl-12 pr-4 py-4 text-gray-800 shadow-sm focus:border-indigo-500"
          />

        </div>

        <div className="relative">

          <Tag
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white/80 pl-12 pr-4 py-4 text-gray-800 shadow-sm focus:border-indigo-500 appearance-none"
          >

            <option value="">
              Select Category
            </option>

            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Others</option>

          </select>

        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >

          <Plus size={20} />

          Add Expense

        </button>

      </form>

    </div>

  )
}

export default ExpenseForm