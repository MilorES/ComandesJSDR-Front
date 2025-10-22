export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {product?.nom || "Sense nom"}
      </h3>
      <p className="text-gray-600 text-sm mb-4 min-h-[3rem]">
        {product?.descripcio || "Sense descripció"}
      </p>
      <div className="space-y-2">
        <p className="text-2xl font-semibold text-green-600">
          💰 {product?.preu !== undefined ? product.preu.toFixed(2) : "N/A"} €
        </p>
        <p className="text-gray-700">
          📦 Estoc: <span className="font-medium">{product?.estoc !== undefined ? product.estoc : "N/A"}</span>
        </p>
        <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          product?.actiu 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {product?.actiu ? "✓ Actiu" : "✗ Inactiu"}
        </p>
      </div>
    </div>
  );
}
