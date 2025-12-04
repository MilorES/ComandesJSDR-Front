import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import "./styles/global.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={menuOpen} onClose={closeMenu} />
      <div className="flex-1 flex flex-col bg-gray-100 overflow-x-hidden **min-w-0**">
        <Header onToggleMenu={toggleMenu} />

        <div className="flex-1 p-5 md:p-8 bg-white overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
