import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Productes from "./pages/Productes";
import Dashboard from "./pages/Dashboard";
import GestioComandes from "./pages/GestioComandes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/productes", element: <Productes /> },
      { path: "/gestio-comandes", element: <GestioComandes /> },
    ],
  },
]);

export default router;
