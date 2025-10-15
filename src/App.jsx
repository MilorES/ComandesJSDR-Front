import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
