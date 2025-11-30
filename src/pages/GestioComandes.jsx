import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Toast from "../components/Toast";
import { getEstatText, getEstatColor, EstatComanda } from "../utils/estatComanda";

export default function GestioComandes() {
  const { getToken, logout } = useAuth();
  const [comandes, setComandes] = useState([]);
  const [filteredComandes, setFilteredComandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [estatFilter, setEstatFilter] = useState("");

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
      setFilteredComandes(data);
    } catch (error) {
      showToast(error.message || "Error al carregar comandes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComandes();
  }, []);

  // Aplicar filtros cuando cambien searchTerm o estatFilter
  useEffect(() => {
    let filtered = [...comandes];

    // Filtrar por término de búsqueda (número de comanda)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.numeroComanda.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (estatFilter !== "") {
      const estatNum = parseInt(estatFilter);
      filtered = filtered.filter((c) => c.estat === estatNum);
    }

    setFilteredComandes(filtered);
  }, [searchTerm, estatFilter, comandes]);

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

  const downloadXmlUbl = async (comandaId, numeroComanda) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comandes/${comandaId}/export/xml-ubl`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error("Error al descarregar XML");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comanda-${numeroComanda}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showToast("XML descarregat correctament", "success");
    } catch (error) {
      showToast(error.message || "Error al descarregar XML", "error");
    }
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

          {/* ====================== BUSCADOR Y FILTROS ====================== */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Buscador */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cercar per número de comanda
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="COM-2024-000001"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>

            {/* Filtro por estado */}
            <div className="md:w-72">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar per estat
              </label>
              <select
                value={estatFilter}
                onChange={(e) => setEstatFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
              >
                <option value="">Tots els estats</option>
                <option value={EstatComanda.Esborrany}>Esborrany</option>
                <option value={EstatComanda.PendentAprovacio}>Pendent aprovació</option>
                <option value={EstatComanda.Aprovada}>Aprovada</option>
                <option value={EstatComanda.EnProces}>En procés</option>
                <option value={EstatComanda.Enviada}>Enviada</option>
                <option value={EstatComanda.Finalitzada}>Finalitzada</option>
                <option value={EstatComanda.Cancellada}>Cancel·lada</option>
              </select>
            </div>

            {/* Botón limpiar filtros */}
            {(searchTerm || estatFilter) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setEstatFilter("");
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Netejar filtres
                </button>
              </div>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="mb-4 text-sm text-gray-600">
            {filteredComandes.length === comandes.length ? (
              <span>Total: <strong>{comandes.length}</strong> comandes</span>
            ) : (
              <span>
                Mostrant <strong>{filteredComandes.length}</strong> de <strong>{comandes.length}</strong> comandes
              </span>
            )}
          </div>

          {/* ====================== HEADER DE TAULA ====================== */}
          <div className="grid grid-cols-[120px_1fr_40px_40px] md:grid-cols-[160px_220px_1fr_140px_40px] font-bold text-gray-600 border-b pb-2 mb-3 items-center">
            <span>Número</span>
            <span className="hidden md:block">Data</span>
            <span>Total</span>
            <span className="hidden md:block text-right">Estat</span>
            <span className="text-right">XML</span>
          </div>

          {/* ====================== LLISTA DE COMANDES ====================== */}
          {filteredComandes.length === 0 ? (
            <div className="text-center py-12">
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                {searchTerm || estatFilter
                  ? "No s'han trobat comandes amb els filtres aplicats"
                  : "No hi ha comandes encara"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 space-y-0">
              {filteredComandes.map((comanda) => (
                <div key={comanda.id}>
                  {/* ---------------- Fila principal ---------------- */}
                  <div className="grid grid-cols-[120px_1fr_40px_40px] md:grid-cols-[160px_220px_1fr_140px_40px] items-center py-3 hover:bg-gray-50 transition">
                    {/* Número */}
                    <span 
                      className="text-gray-700 font-medium pr-2 break-words md:break-normal cursor-pointer"
                      onClick={() => toggleExpand(comanda.id)}
                    >
                      {comanda.numeroComanda}
                    </span>

                    {/* Data (solo escritorio) */}
                    <span 
                      className="hidden md:block text-gray-600 truncate pr-2 cursor-pointer"
                      onClick={() => toggleExpand(comanda.id)}
                    >
                      {formatDate(comanda.dataCreacio)}
                    </span>

                    {/* Total */}
                    <span 
                      className="text-gray-700 font-semibold cursor-pointer"
                      onClick={() => toggleExpand(comanda.id)}
                    >
                      {comanda.totalAmbDescompte.toFixed(2)} €
                    </span>

                    {/* Estat */}
                    <div 
                      className="flex justify-end items-center cursor-pointer"
                      onClick={() => toggleExpand(comanda.id)}
                    >
                      {/* MÒBIL → solo círculo */}
                      <span
                        className={`w-3 h-3 rounded-full md:hidden ${getEstatColor(
                          comanda.estat
                        )}`}
                        title={getEstatText(comanda.estat)}
                      ></span>

                      {/* ESCRIPTORI → badge con texto */}
                      <span
                        className={`hidden md:inline-block px-3 py-1 rounded-full text-sm font-medium text-right whitespace-nowrap ${getEstatColor(
                          comanda.estat
                        )}`}
                      >
                        {getEstatText(comanda.estat)}
                      </span>
                    </div>

                    {/* Botó XML */}
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadXmlUbl(comanda.id, comanda.numeroComanda);
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                        title="Descarregar XML-UBL"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </button>
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