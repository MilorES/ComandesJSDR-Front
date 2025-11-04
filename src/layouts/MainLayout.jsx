import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  const sectionNames = {
    "/admin": "Panell d'Administració",
    "/dashboard": "Dashboard",
    "/productes": "Productes",
    "/gestio-comandes": "Gestió de Comandes",
  };

  const currentSection =
    Object.entries(sectionNames).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] || "";

  return (
    <main className="flex-1 overflow-y-auto">
      {currentSection && (
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">
          {currentSection}
        </h1>
      )}
      {children}
    </main>
  );
}
