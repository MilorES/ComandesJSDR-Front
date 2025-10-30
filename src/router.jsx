import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Productes from "./pages/Productes";
import Dashboard from "./pages/Dashboard";
import GestioComandes from "./pages/GestioComandes";
import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="productes" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "productes", element: <Productes /> },
      { path: "gestio-comandes", element: <GestioComandes /> },
    ],
  },
]);

export default router;
