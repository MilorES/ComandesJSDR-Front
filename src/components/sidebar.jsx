import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo3.png";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`w-64 bg-gradient-to-b from-slate-800 to-slate-600 text-white flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:relative h-full z-50`}
      >
        <div className="p-4 border-b border-slate-600 flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <img src={logo} alt="logotip" className="h-26 w-auto" />
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

        <nav className="flex-1 py-6">
          <Link
            to="/"
            className={`block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
              location.pathname === "/" ? "bg-slate-600 border-l-4 border-white" : ""
            }`}
            onClick={onClose}
          >
            🏠 Inici
          </Link>

          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
                isActive ? "bg-slate-600 border-l-4 border-white" : ""
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/productes"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
                isActive ? "bg-slate-600 border-l-4 border-white" : ""
              }`
            }
          >
            📦 Productes
          </NavLink>

          <NavLink
            to="/gestio-comandes"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-6 py-3 text-lg font-medium transition-colors hover:bg-slate-500 ${
                isActive ? "bg-slate-600 border-l-4 border-white" : ""
              }`
            }
          >
            📋 Gestió Comandes
          </NavLink>
        </nav>

        <div className="p-4 border-t border-blue-700 text-sm text-blue-200">
          © 2025 ComandesJSDR
        </div>
      </div>
    </>
  );
}
