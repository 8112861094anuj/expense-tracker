function Modal({
  isOpen,
  onClose,
  children
}) {

  if (!isOpen) return null

  return (

    <div
      className="
        fixed inset-0
        bg-black/50
        flex justify-center items-center
        z-50
      "
    >

      <div
        className="
          bg-white
          p-6
          rounded-xl
          shadow-xl
          w-full
          max-w-md
        "
      >

        {children}

        <button
          onClick={onClose}
          className="
            mt-4
            text-red-500
            font-medium
          "
        >
          Close
        </button>

      </div>

    </div>
  )
}

export default Modal