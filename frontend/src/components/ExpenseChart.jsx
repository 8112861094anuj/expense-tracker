import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#06B6D4"
]

function ExpenseChart({ expenses }) {

  const categoryData = expenses.reduce(
    (acc, expense) => {

      const existing = acc.find(
        (item) =>
          item.name === expense.category
      )

      if (existing) {

        existing.value += expense.amount

      } else {

        acc.push({
          name: expense.category,
          value: expense.amount
        })
      }

      return acc

    },
    []
  )

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Expense Breakdown
      </h2>

      <div className="w-full h-[320px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
            >

              {categoryData.map(
                (entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default ExpenseChart