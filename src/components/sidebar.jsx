import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";
import logo from "../assets/LOGO2.png";

export default function Sidebar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`sidebar ${menuOpen ? "active" : ""}`}>
      <div className="sidebar-top">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir/cerrar menú">
          ☰
        </button>
        <div className="logo">
          <img src={logo} alt="logotip" />
        </div>
      </div>

      <nav>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>

        <Link
          to="/productes"
          className={location.pathname === "/productes" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Productes
        </Link>

        <Link
          to="/gestio-comandes"
          className={location.pathname === "/gestio-comandes" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Gestió Comandes
        </Link>
      </nav>
    </div>
  );
}
