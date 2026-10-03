import { useEffect, useState } from "react"
import api from "../services/api"

import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
import EmptyState from "../components/EmptyState"
import ExpenseCard from "../components/ExpenseCard"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseChart from "../components/ExpenseChart"
import SummaryCard from "../components/SummaryCard"
import EditExpenseModal from "../components/EditExpenseModal"
import Input from "../components/ui/Input"

import toast from "react-hot-toast"

function Dashboard() {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [editingExpense, setEditingExpense] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const fetchExpenses = async () => {

    try {

      setLoading(true)

      const response = await api.get("/expenses")

      console.log("Expenses:", response.data)

      setExpenses(response.data)

    } catch (error) {

      console.log(error)

      toast.error("Failed to load expenses")

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchExpenses()

  }, [])

  const handleAddExpense = async (expenseData) => {

    try {

      const response = await api.post(
        "/expenses",
        expenseData
      )

      setExpenses([
        response.data,
        ...expenses
      ])

      toast.success("Expense added")

    } catch (error) {

      console.log(error)

      toast.error("Failed to add expense")

    }

  }

  const handleEditExpense = async (updatedExpense) => {

    try {

      const response = await api.put(
        `/expenses/${updatedExpense.id}`,
        updatedExpense
      )

      setExpenses(

        expenses.map((expense) =>

          expense.id === updatedExpense.id
            ? response.data
            : expense

        )

      )

      toast.success("Expense updated")

      setIsEditOpen(false)

    } catch (error) {

      console.log(error)

      toast.error("Failed to update expense")

    }

  }

  const handleDeleteExpense = async (id) => {

    const confirmed = window.confirm(
      "Delete this expense?"
    )

    if (!confirmed) return

    try {

      await api.delete(`/expenses/${id}`)

      setExpenses(

        expenses.filter(
          (expense) => expense.id !== id
        )

      )

      toast.success("Expense deleted")

    } catch (error) {

      console.log(error)

      toast.error("Failed to delete expense")

    }

  }

  const totalExpenses = expenses.reduce(

    (sum, expense) => sum + expense.amount,

    0

  )

  const filteredExpenses = expenses.filter(

    (expense) =>

      expense.title
        .toLowerCase()
        .includes(search.toLowerCase())

  )

  if (loading) {

    return <Loader />

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

     <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <SummaryCard
            title="Total Expenses"
            value={totalExpenses}
          />

          <SummaryCard
            title="Total Transactions"
            value={`${expenses.length}`}
          />

          <SummaryCard
            title="Average Expense"
            value={
            expenses.length
            ? Number(
             (
              totalExpenses /
            expenses.length
            ).toFixed(2)
            )
            : 0
            }
          />

        </div>

       <div className="glass p-4">
  <Input
    placeholder="Search your expenses..."
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
</div>

        <ExpenseForm
          onAddExpense={handleAddExpense}
        />

        <ExpenseChart
          expenses={expenses}
        />

        <div className="space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Recent Expenses
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Your latest spending activity
      </p>
    </div>

    <span className="text-sm text-gray-500">
      {filteredExpenses.length} transactions
    </span>
  </div>
          {
            filteredExpenses.length === 0
              ? <EmptyState />
              : filteredExpenses.map((expense) => (

                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDeleteExpense}
                    onEdit={expense => {

                      setEditingExpense(expense)

                      setIsEditOpen(true)

                    }}
                  />

                ))
          }

        </div>

      </div>

      <EditExpenseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        expense={editingExpense}
        onSave={handleEditExpense}
      />

    </div>

  )

}

export default Dashboard