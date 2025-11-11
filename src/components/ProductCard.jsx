import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 relative">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {product?.nom || "Sense nom"}
      </h3>
      <p className="text-gray-600 text-sm mb-4 min-h-[3rem]">
        {product?.descripcio || "Sense descripció"}
      </p>
      <div className="space-y-2 mb-4">
        <p className="text-2xl font-semibold text-green-600">
          💰 {product?.preu !== undefined ? product.preu.toFixed(2) : "N/A"} €
        </p>
        <p className="text-gray-700">
          📦 Estoc: <span className="font-medium">{product?.estoc ?? "N/A"}</span>
        </p>
        <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            product?.actiu
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product?.actiu ? "✓ Actiu" : "✗ Inactiu"}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        disabled={!product?.actiu}
        className={`w-full py-2 mt-2 rounded-md font-semibold transition ${
          product?.actiu
            ? "bg-sky-900 text-white hover:bg-sky-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        + Afegir
      </button>
    </div>
  );
}
