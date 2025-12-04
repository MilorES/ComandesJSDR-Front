import { useLocation } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import CartSidebar from "../components/CartSidebar";

export default function MainLayout({ children }) {
  const location = useLocation();

  const sectionNames = {
    "/admin": "Gestió Productes",
    "/gestio-usuaris": "Gestió d'Usuaris", 
    "/dashboard": "Dashboard",
    "/productes": "Productes",
    "/gestio-comandes": "Gestió de Comandes",
  };

  const currentSection =
    Object.entries(sectionNames).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] || "";

  const showCart = location.pathname === "/productes";

  return (
    <div className="relative flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      {currentSection && (
        <h1 className="text-2xl font-semibold text-slate-800 mb-4 p-4">
          {currentSection}
        </h1>
      )}

      <div className="px-2 sm:px-4 md:px-6 py-4">{children}</div>

      {showCart && (
        <>
          <CartIcon />
          <CartSidebar />
        </>
      )}
    </div>
  );
}
