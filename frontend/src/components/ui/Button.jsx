function Button({
  children,
  onClick,
  className = "",
  type = "button"
}) {

  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg
        transition-all duration-200
        font-medium
        bg-black text-white
        hover:opacity-90
        ${className}
      `}
    >

      {children}

    </button>
  )
}

export default Button