import ProductList from "../components/ProductList";
import MainLayout from "../layouts/MainLayout";

export default function Productes() {
  return (
    <MainLayout>
      <div className="p-2">
       
        <div className="mb-6 w-full max-w-md mx-auto">
          <label htmlFor="search" className="sr-only">Cercar producte</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Cercar producte..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <ProductList />
      </div>
    </MainLayout>
  );
}
