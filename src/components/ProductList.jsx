import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 2048 2048" className="w-5 h-5 text-gray-400">
    <defs><style>{`.fil1,.fil3{fill:#003761;fill-rule:nonzero}.fil1{fill:#01579b}`}</style></defs>
    <g id="Layer_x0020_1"><g id="_220499688"><circle cx="767" cy="769" r="452" style={{ fill:"#b3e5fe",stroke:"#373435",strokeWidth:"2.08347" }}/><path className="fil1" d="M405 407c100-100 231-150 362-150s262 50 362 150 150 231 150 362-50 262-150 362-231 150-362 150-262-50-362-150-150-231-150-362 50-262 150-362zm362-86c-115 0-229 44-317 131-87 87-131 202-131 317s44 229 131 317c87 87 202 131 317 131s229-44 317-131c87-87 131-202 131-317s-44-229-131-317c-87-87-202-131-317-131z"/><path d="M578 1006c14 11 16 31 5 45s-31 16-45 5c-6-5-11-9-16-14-6-5-11-10-15-14-72-72-108-166-108-260s36-188 108-260c2-2 6-6 12-11 13-12 33-11 45 2s11 33-2 45c-2 1-5 5-9 9-59 59-89 137-89 214 0 78 30 155 89 214 4 4 9 8 13 12 5 4 9 8 13 11z" style={{ fill:"#e1f5fe",fillRule:"nonzero" }}/><path className="fil1" d="m1115 1066 222 222-46 45-222-222z"/><path className="fil3" d="m1262 1355 93-93c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-93 93c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/><path d="m1309 1308 46-46c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-47 47-422-422z" style={{ fill:"#00406f",fillRule:"nonzero" }}/><path className="fil3" d="m1262 1355 47-47 422 422-46 46c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/></g><path style={{ fill:"none" }} d="M0 0h2048v2048H0z"/></g>
  </svg>
);

export default function ProductList({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTermLocal, setSearchTermLocal] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  const { user, logout, isAdmin, getToken, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

        const url = isAdmin()
          ? `${import.meta.env.VITE_API_URL}/articles`
          : `${import.meta.env.VITE_API_URL}/articles?actius=true`;

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
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al carregar productes:", err);
        setError(err.message || "Error desconegut");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, logout, isAdmin, getToken, authLoading]);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products];

    // Filtro por búsqueda desde searchTerm (prop de Productes.jsx)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    // Filtro por búsqueda local (lupa dentro de ProductList)
    if (searchTermLocal.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nom.toLowerCase().startsWith(searchTermLocal.toLowerCase())
      );
    }

    // Filtro por ordenación
    if (sortFilter !== "") {
      switch (sortFilter) {
        case "nom-asc":
          filtered.sort((a, b) => a.nom.localeCompare(b.nom));
          break;
        case "nom-desc":
          filtered.sort((a, b) => b.nom.localeCompare(a.nom));
          break;
        case "preu-asc":
          filtered.sort((a, b) => {
            const preuA = Number(a.preu) || 0;
            const preuB = Number(b.preu) || 0;
            return preuA - preuB;
          });
          break;
        case "preu-desc":
          filtered.sort((a, b) => {
            const preuA = Number(a.preu) || 0;
            const preuB = Number(b.preu) || 0;
            return preuB - preuA;
          });
          break;
        case "recent":
          filtered.sort((a, b) => {
            const dateA = new Date(a.dataCreacio || 0);
            const dateB = new Date(b.dataCreacio || 0);
            return dateB - dateA;
          });
          break;
        case "antic":
          filtered.sort((a, b) => {
            const dateA = new Date(a.dataCreacio || 0);
            const dateB = new Date(b.dataCreacio || 0);
            return dateA - dateB;
          });
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [searchTerm, searchTermLocal, sortFilter, products]);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <div className="flex-1 max-w-lg w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cercar producte
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nom del producte..."
              value={searchTermLocal}
              onChange={(e) => setSearchTermLocal(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
          </div>
        </div>

        <div className="md:w-72 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar per
          </label>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
          >
            <option value="">Sense ordenar</option>
            <option value="nom-asc">Nom: A → Z</option>
            <option value="nom-desc">Nom: Z → A</option>
            <option value="preu-asc">Preu: menor a major</option>
            <option value="preu-desc">Preu: major a menor</option>
            <option value="recent">Més recents primer</option>
            <option value="antic">Més antics primer</option>
          </select>
        </div>

        {(searchTermLocal || sortFilter) && (
          <div className="flex items-end w-full md:w-auto">
            <button
              onClick={() => {
                setSearchTermLocal("");
                setSortFilter("");
              }}
              className="w-full md:w-auto px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Netejar filtres
            </button>
          </div>
        )}
      </div>

      <div className="px-2 text-sm text-gray-600">
        {filteredProducts.length === products.length ? (
          <span>Total: <strong>{products.length}</strong> productes</span>
        ) : (
          <span>
            Mostrant <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productes
          </span>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-gray-300 mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p className="text-gray-500 text-lg">
            {searchTerm || searchTermLocal || sortFilter
              ? "No s'han trobat productes amb els filtres aplicats"
              : "No hi ha productes disponibles"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}