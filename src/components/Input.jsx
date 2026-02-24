export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
      {...props}
    />
  );
}
