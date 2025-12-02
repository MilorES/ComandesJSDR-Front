import ProductList from "../components/ProductList";
import MainLayout from "../layouts/MainLayout";

export default function Productes() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 flex justify-center">
        <div className="w-[99%] md:w-full max-w-[1700px] flex flex-col space-y-6">
          {/* Lista de productos con filtro y lupa dentro */}
          <ProductList />
        </div>
      </div>
    </MainLayout>
  );
}
