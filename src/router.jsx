import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Productes from "./pages/Productes";
import Dashboard from "./pages/Dashboard";
import GestioComandes from "./pages/GestioComandes";
import AdminPanel from "./pages/AdminPanel"; 
import GestioUsuaris from "./pages/GestioUsuaris";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "productes", element: <Productes /> },
      { path: "gestio-comandes", element: <GestioComandes /> },

      //Només accès administrador
      {
        path: "admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },

      {
        path: "gestio-usuaris",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <GestioUsuaris />
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export default router;
