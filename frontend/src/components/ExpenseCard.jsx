import Button from "./ui/Button"

function ExpenseCard({
  expense,
  onDelete,
  onEdit
}) {

  return (

    <div
      className="
        bg-white
        dark:bg-gray-800
        p-5
        rounded-xl
        shadow-md
        flex justify-between items-center
      "
    >

      <div>

        <h2 className="text-xl font-bold">
          {expense.title}
        </h2>

        <p className="text-gray-500">
          {expense.category}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <p className="text-2xl font-bold">
          ₹ {expense.amount}
        </p>

        <Button
          onClick={() => onEdit(expense)}
          className="bg-blue-500"
        >
          Edit
        </Button>

        <Button
          onClick={() => onDelete(expense.id)}
          className="bg-red-500"
        >
          Delete
        </Button>

      </div>

    </div>
  )
}

export default ExpenseCard