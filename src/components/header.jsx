import { useLocation } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const location = useLocation();

  const sectionNames = {
    "/": "Dashboard",
    "/productes": "Productes",
    "/gestio-comandes": "Gestió Comandes"
  };

  const currentSection = sectionNames[location.pathname] || "";

  return (
    <header className="header">
      <h1 className="header-title">{currentSection}</h1>
    </header>

  );
}
