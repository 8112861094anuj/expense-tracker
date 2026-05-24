
import {
  useEffect,
  useState
} from "react"

import api from "../services/api"

import Loader from "../components/Loader"

import EmptyState from "../components/EmptyState"

import Navbar from "../components/Navbar"

import ExpenseCard from "../components/ExpenseCard"

import toast from "react-hot-toast"

import ExpenseForm from "../components/ExpenseForm"

import ExpenseChart from "../components/ExpenseChart"

import SummaryCard from "../components/SummaryCard"

import Input from "../components/ui/Input"
import EditExpenseModal
from "../components/EditExpenseModal"

const [search, setSearch] = useState("")

const [editingExpense, setEditingExpense] =
  useState(null)

const [isEditOpen, setIsEditOpen] =
  useState(false)

function Dashboard() {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async() => {

  try {

    setLoading(true)

    const response = await api.get("/expenses")

    setExpenses(response.data)

  } catch (error) {

    console.log(error)

  } finally {

    setLoading(false)
  }
}

    try {

      const response = api.get("/expenses")

      setExpenses(response.data)

    } catch (error) {

      console.log(error)
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

    } catch (error) {

      console.log(error)
    }
  }

const handleEditExpense = async (
  updatedExpense
) => {

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

    try {
	const confirmed =
  window.confirm(
    "Delete this expense?"
  )

if (!confirmed) return

      await api.delete(`/expenses/${id}`)
      toast.success("Expense deleted")

	toast.success("Expense added")

      setExpenses(
        expenses.filter(
          (expense) => expense.id !== id
        )
      )

    } catch (error) {

      console.log(error)
    }
  }

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  )

if (loading) {
  return <Loader />
}

const filteredExpenses =
  expenses.filter((expense) =>
    expense.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6 grid gap-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <SummaryCard
            title="Total Expenses"
            value={totalExpenses}
          />

          <SummaryCard
            title="Total Transactions"
            value={expenses.length}
          />

          <SummaryCard
            title="Average Expense"
            value={
              expenses.length
                ? (
                    totalExpenses /
                    expenses.length
                  ).toFixed(2)
                : 0
            }
          />

        </div>
<Input
  placeholder="Search expenses..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

        <ExpenseForm
          onAddExpense={handleAddExpense}
        />

        <ExpenseChart expenses={expenses} />

       <div className="space-y-4">

  {expenses.length === 0 ? (

    <EmptyState />

  ) : (

    filteredExpenses.map((expense) => (

      <ExpenseCard
  key={expense.id}
  expense={expense}
  onDelete={handleDeleteExpense}
  onEdit={(expense) => {

    setEditingExpense(expense)

    setIsEditOpen(true)
  }}
/>

    ))

  )}

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


export default Dashboard