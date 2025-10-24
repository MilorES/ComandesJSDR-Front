import { useLocation } from "react-router-dom";

export default function Header({ onToggleMenu }) {
  const location = useLocation();

  const sectionNames = {
    "/": "Dashboard",
    "/productes": "Productes",
    "/gestio-comandes": "Gestió Comandes"
  };

  const currentSection = sectionNames[location.pathname] || "";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-10 px-4 md:px-6 md:py-14 flex items-center gap-4">
      {/* Botón hamburguesa visible solo en mòbil */}
      <button
        onClick={onToggleMenu}
        className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        aria-label="Abrir menú"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{currentSection}</h1>

      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }}
        className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Tancar sessió
      </button>

    </header>
  );
}
