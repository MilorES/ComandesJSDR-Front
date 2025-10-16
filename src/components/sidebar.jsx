import logo from "../assets/LOGO2.png";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logotip" />
      </div>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Dashboard</Link>
        <Link to="/productes" className={location.pathname === "/productes" ? "active" : ""}>Productes</Link>
        <Link to="/gestio-comandes" className={location.pathname === "/gestio-comandes" ? "active" : ""}>Gestió Comandes</Link>
      </nav>
    </div>
  );
}
