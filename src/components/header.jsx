// Header.jsx
import { useLocation } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const location = useLocation();

  // Mapa de rutas a nombres
  const sectionNames = {
    "/": "Dashboard",
    "/productes": "Productes",
    "/gestio-comandes": "Gestió Comandes"
  };

  // Obtener el nombre de la sección actual
  const currentSection = sectionNames[location.pathname] || "";

  return (
    <header className="header">
      <h1>{currentSection}</h1>
    </header>
  );
}
