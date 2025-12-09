import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ onToggleMenu }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-800 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMenu}
          className="p-2 hover:bg-slate-700 rounded-lg transition md:hidden"
          aria-label="Toggle menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {user && (
          <span className="text-gray-200 sm:inline">
            {user.username}
            {user.role && (
              <span className="text-gray-400 ml-1">({user.role})</span>
            )}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          title="Tancar sessió"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Sortir</span>
        </button>
      </div>
    </header>
  );
}
