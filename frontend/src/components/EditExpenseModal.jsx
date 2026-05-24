import {
  useState,
  useEffect
} from "react"

import Modal from "./ui/Modal"

import Input from "./ui/Input"

import Button from "./ui/Button"

function EditExpenseModal({
  isOpen,
  onClose,
  expense,
  onSave
}) {

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {

    if (expense) {

      setTitle(expense.title)
      setAmount(expense.amount)
      setCategory(expense.category)
    }

  }, [expense])

  const handleSubmit = (e) => {

    e.preventDefault()

    onSave({
      ...expense,
      title,
      amount: parseFloat(amount),
      category
    })
  }

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <h2 className="text-2xl font-bold mb-4">
        Edit Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <Input
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <Button
          type="submit"
          className="w-full"
        >
          Save Changes
        </Button>

      </form>

    </Modal>
  )
}

export default EditExpenseModal