import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" 
    ? "bg-green-500" 
    : type === "error" 
    ? "bg-red-500" 
    : "bg-blue-500";

  const icon = type === "success" 
    ? "✓" 
    : type === "error" 
    ? "✕" 
    : "ℹ";

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px]`}>
        <span className="text-2xl font-bold">{icon}</span>
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}