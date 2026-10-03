import {
  Pencil,
  Trash2,
  Utensils,
  ShoppingBag,
  Car,
  HeartPulse,
  GraduationCap,
  Receipt,
  CircleDollarSign
} from "lucide-react"

const categoryIcons = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Travel: Car,
  Health: HeartPulse,
  Education: GraduationCap,
  Bills: Receipt,
  Entertainment: CircleDollarSign,
}

const categoryColors = {
  Food: "bg-orange-100 text-orange-600",
  Shopping: "bg-pink-100 text-pink-600",
  Travel: "bg-blue-100 text-blue-600",
  Health: "bg-green-100 text-green-600",
  Education: "bg-purple-100 text-purple-600",
  Bills: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-red-100 text-red-600",
}

function ExpenseCard({
  expense,
  onDelete,
  onEdit
}) {

  const Icon =
    categoryIcons[expense.category] || Receipt

  const badge =
    categoryColors[expense.category] ||
    "bg-gray-100 text-gray-600"

  return (
    <div className="glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <Icon
              size={24}
              className="text-indigo-600"
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold text-gray-900">
              {expense.title}
            </h2>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}
            >
              {expense.category}
            </span>

          </div>

        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold text-gray-900">
            ₹{Number(expense.amount).toLocaleString()}
          </h2>

          <p className="text-sm text-gray-400">
            {new Date(`${expense.created_at}Z`).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(expense)}
          className="w-11 h-11 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(expense.id)}
          className="w-11 h-11 rounded-xl bg-red-50 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  )
}

export default ExpenseCard