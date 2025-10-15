import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Dashboard</Link>
        <Link to="/productes" className={location.pathname === "/productes" ? "active" : ""}>Productes</Link>
        <Link to="/gestio-comandes" className={location.pathname === "/gestio-comandes" ? "active" : ""}>Gestió Comandes</Link>
      </nav>
    </div>
  );
}
