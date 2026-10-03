import {
  TrendingUp,
  Wallet,
  ReceiptIndianRupee
} from "lucide-react"

const icons = {
  "Total Expenses": ReceiptIndianRupee,
  "Total Transactions": Wallet,
  "Average Expense": TrendingUp,
}

function SummaryCard({ title, value }) {

  const Icon = icons[title] || Wallet

  return (

    <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-all duration-300" />

      <div className="flex justify-between items-start relative">

        <div>

          <p className="text-sm text-gray-500 font-medium">

            {title}

          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">

            {typeof value === "number"
              ? `₹${value.toLocaleString()}`
              : value}

          </h2>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">

          <Icon size={24} />

        </div>

      </div>

    </div>

  )

}

export default SummaryCard