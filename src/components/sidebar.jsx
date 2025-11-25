import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo3.png";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Overlay mòbil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-gradient-to-b bg-slate-800 text-white flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:relative h-full z-50`}
      >
        {/* Header amb logo */}
        <div className="p-4 border-b border-slate-600 flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <img src={logo} alt="logotip" className="h-22 md:h-26 w-auto" />
          </div>
          <button
            className="md:hidden text-white hover:bg-blue-700 p-2 rounded transition ml-2"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navegació */}
        <nav className="flex-1 py-6">

          {/* Només admin */}
          {user?.role === "Administrator" && (
            <>
              <Link
                to="/admin"
                className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
                  location.pathname === "/admin"
                    ? "bg-slate-600 border-l-4 border-yellow-400"
                    : ""
                }`}
                onClick={onClose}
              >
                ⚙️ Administració
              </Link>

              {/* 🔵 Nova secció: Gestió Usuaris */}
              <Link
                to="/gestio-usuaris"
                className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
                  location.pathname === "/gestio-usuaris"
                    ? "bg-slate-600 border-l-4 border-yellow-400"
                    : ""
                }`}
                onClick={onClose}
              >
                👥 Gestió Usuaris
              </Link>
            </>
          )}

          <Link
            to="/dashboard"
            className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
              location.pathname === "/dashboard"
                ? "bg-slate-600 border-l-4 border-white"
                : ""
            }`}
            onClick={onClose}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/productes"
            className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
              location.pathname === "/productes"
                ? "bg-slate-600 border-l-4 border-white"
                : ""
            }`}
            onClick={onClose}
          >
            📦 Productes
          </Link>

          <Link
            to="/gestio-comandes"
            className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
              location.pathname === "/gestio-comandes"
                ? "bg-slate-600 border-l-4 border-white"
                : ""
            }`}
            onClick={onClose}
          >
            📋 Gestió Comandes
          </Link>
        </nav>

        {/* Peu */}
        <div className="p-4 border-t border-blue-700 text-sm text-blue-200">
          <div>© 2025 ComandesJSDR </div>
          <div>
            v{__APP_VERSION__} {__BUILD_DATE__}
          </div>
        </div>
      </div>
    </>
  );
}
