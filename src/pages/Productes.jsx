import { useState } from "react";
import ProductList from "../components/ProductList";
import MainLayout from "../layouts/MainLayout";

export default function Productes() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <div className="p-2">
        {/* Barra de búsqueda */}
        <div className="mb-6 w-full max-w-md mx-auto">
          <label htmlFor="search" className="sr-only">Cercar producte</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Cercar producte..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600"
              value={searchTerm} // Aquí se muestra el valor actual
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza searchTerm al escribir
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Pasamos searchTerm como prop */}
        <ProductList searchTerm={searchTerm} />
      </div>
    </MainLayout>
  );
}
