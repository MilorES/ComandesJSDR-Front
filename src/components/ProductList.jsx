import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, logout, isAdmin, getToken, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Esperar a que AuthContext cargue
        if (authLoading) return;

        const token = getToken();
        if (!user || !token) {
          setError("No estàs autenticat. Torna a iniciar sessió.");
          setLoading(false);
          return;
        }

        
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.expiresAt && new Date(userData.expiresAt) < new Date()) {
          logout();
          setError("Sessió expirada. Torna a iniciar sessió.");
          setLoading(false);
          return;
        }

        // Construir URL según rol
        const url = isAdmin()
          ? `${import.meta.env.VITE_API_URL}/articles`
          : `${import.meta.env.VITE_API_URL}/articles?actius=true`;

        console.log("Token usado para fetch:", token);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            throw new Error("Sessió expirada. Torna a iniciar sessió.");
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al carregar productes:", err);
        setError(err.message || "Error desconocido");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, logout, isAdmin, getToken, authLoading]);

  // --- Renderizado ---

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregant productes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">No hi ha productes disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      {isAdmin() && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
          <strong>Mode Administrador:</strong> Mostrant tots els productes (actius i inactius)
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}