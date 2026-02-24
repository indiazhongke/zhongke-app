export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 text-sm font-medium rounded-lg transition focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800",
    success:
      "bg-emerald-500 hover:bg-emerald-600 text-white",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    warning:
      "bg-amber-500 hover:bg-amber-600 text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
