import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

import {
  PieChart as PieChartIcon
} from "lucide-react"

const COLORS = [
  "#6366F1",
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#14B8A6"
]

function ExpenseChart({ expenses }) {

  const categoryData = expenses.reduce(
    (acc, expense) => {

      const existing = acc.find(
        item => item.name === expense.category
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

  const total = categoryData.reduce(
    (sum, item) => sum + item.value,
    0
  )

  return (

    <div className="glass p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

          <PieChartIcon
            size={22}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            Spending Analytics

          </h2>

          <p className="text-gray-500">

            Category-wise expense distribution

          </p>

        </div>

      </div>

      <div className="w-full h-[360px] min-w-0 chart-reveal">
        <ResponsiveContainer>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none"></div>

          <PieChart>

            <Pie
              isAnimationActive={true}
              animationBegin={250}
              animationDuration={1800}
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={125}
              paddingAngle={5}
              cornerRadius={8}
              strokeWidth={0}
            >

              {categoryData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            <Tooltip

              contentStyle={{
                borderRadius:16,
                border:"none",
                boxShadow:"0 10px 30px rgba(0,0,0,.12)"
              }}

            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop:20
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 flex justify-center">

        <div className="rounded-2xl bg-white/70 px-8 py-4 shadow">

          <p className="text-sm text-gray-500">

            Total Spending

          </p>

          <h2 className="text-3xl font-bold">

            ₹{total.toLocaleString()}

          </h2>

        </div>

      </div>

    </div>

  )

}

export default ExpenseChart