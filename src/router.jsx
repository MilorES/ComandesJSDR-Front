import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Productes from "./pages/Productes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/productes", element: <Productes /> },
    ],
  },
]);

export default router;
