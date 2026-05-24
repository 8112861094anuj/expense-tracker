import {
  Pie
} from "react-chartjs-2"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function ExpenseChart({ expenses }) {

  const categoryTotals = {}

  expenses.forEach((expense) => {

    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0
    }

    categoryTotals[expense.category] += expense.amount
  })

  const data = {

    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals)
      }
    ]
  }

  return (

    <div className="bg-white p-6 rounded-xl shadow-md">

      <Pie data={data} />

    </div>
  )
}

export default ExpenseChart