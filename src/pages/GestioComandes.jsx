import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Toast from "../components/Toast";
import { getEstatText, getEstatColor } from "../utils/estatComanda";


const gridLayoutClasses = `
  grid 
  grid-cols-[120px_1fr_40px] 
  md:grid-cols-[160px_220px_1fr_140px]
`;

export default function GestioComandes() {
  const { getToken, logout } = useAuth();
  const [comandes, setComandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const fetchComandes = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/comandes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setComandes(data);
    } catch (error) {
      showToast(error.message || "Error al carregar comandes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComandes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ca-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregant comandes...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 sm:p-6 flex justify-center">
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-[99%] md:w-full max-w-[1700px] p-4 md:p-6">

          {/* ====================== HEADER DE TAULA ====================== */}
          <div
            className={`${gridLayoutClasses} font-bold text-gray-600 border-b pb-2 mb-3 items-center`}
          >
            <span>Número</span>
            <span className="hidden md:block">Data</span>
            <span>Total</span>
            <span className="hidden md:block text-right">Estat</span>
          </div>

          {/* ====================== LLISTA DE COMANDES ====================== */}
          {comandes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No hi ha comandes encara.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 space-y-0">
              {comandes.map((comanda) => (
                <div key={comanda.id}>
                  {/* ---------------- Fila principal ---------------- */}
                  <div
                    className={`${gridLayoutClasses} items-center py-3 hover:bg-gray-50 transition cursor-pointer`}
                    onClick={() => toggleExpand(comanda.id)}
                  >
                    {/* Número */}
                    <span className="text-gray-700 font-medium pr-2 break-words md:break-normal">
                      {comanda.numeroComanda}
                    </span>

                    {/* Data (solo escritorio) */}
                    <span className="hidden md:block text-gray-600 truncate pr-2">
                      {formatDate(comanda.dataCreacio)}
                    </span>

                    {/* Total */}
                    <span className="text-gray-700 font-semibold">
                      {comanda.totalAmbDescompte.toFixed(2)} €
                    </span>

                    {/* Estat */}
                    <div className="flex justify-end items-center">
                      {/* MÒBIL → solo círculo */}
                      <span
                        className={`w-3 h-3 rounded-full md:hidden ${getEstatColor(
                          comanda.estat
                        )}`}
                        title={getEstatText(comanda.estat)}
                      ></span>

                      {/* ESCRIPTORI → badge con texto */}
                      <span
                        className={`
                        hidden md:inline-block 
                        px-3 py-1 
                        rounded-full text-sm font-medium text-right 
                        whitespace-nowrap          /* <<< AÑADIDO AQUÍ */
                        ${getEstatColor(comanda.estat)}
                      `}
                      >
                        {getEstatText(comanda.estat)}
                      </span>
                    </div>
                  </div>

                  {/* ---------------- Detalle expandido ---------------- */}
                  {expandedId === comanda.id && (
                    <div className="bg-gray-50 px-4 py-2 rounded-b-md text-sm">
                      <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 border-b pb-1 mb-1">
                        <span>Producte</span>
                        <span>Quantitat</span>
                        <span>Total</span>
                      </div>

                      {comanda.linies.map((l) => (
                        <div
                          key={l.id}
                          className="grid grid-cols-3 gap-4 py-1 text-gray-600"
                        >
                          <span>{l.nomProducte}</span>
                          <span>{l.quantitat}</span>
                          <span>{l.total.toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
