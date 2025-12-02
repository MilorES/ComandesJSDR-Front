import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Toast from "../components/Toast";
import { getEstatText, getEstatColor, EstatComanda } from "../utils/estatComanda";

// Icono de Descargar (XML)
const DownloadIcon = () => (
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
);

// Icono de búsqueda
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 2048 2048" className="w-5 h-5 text-gray-400">
    <defs><style>{`.fil1,.fil3{fill:#003761;fill-rule:nonzero}.fil1{fill:#01579b}`}</style></defs>
    <g id="Layer_x0020_1"><g id="_220499688"><circle cx="767" cy="769" r="452" style={{ fill:"#b3e5fe",stroke:"#373435",strokeWidth:"2.08347" }}/><path className="fil1" d="M405 407c100-100 231-150 362-150s262 50 362 150 150 231 150 362-50 262-150 362-231 150-362 150-262-50-362-150-150-231-150-362 50-262 150-362zm362-86c-115 0-229 44-317 131-87 87-131 202-131 317s44 229 131 317c87 87 202 131 317 131s229-44 317-131c87-87 131-202 131-317s-44-229-131-317c-87-87-202-131-317-131z"/><path d="M578 1006c14 11 16 31 5 45s-31 16-45 5c-6-5-11-9-16-14-6-5-11-10-15-14-72-72-108-166-108-260s36-188 108-260c2-2 6-6 12-11 13-12 33-11 45 2s11 33-2 45c-2 1-5 5-9 9-59 59-89 137-89 214 0 78 30 155 89 214 4 4 9 8 13 12 5 4 9 8 13 11z" style={{ fill:"#e1f5fe",fillRule:"nonzero" }}/><path className="fil1" d="m1115 1066 222 222-46 45-222-222z"/><path className="fil3" d="m1262 1355 93-93c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-93 93c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/><path d="m1309 1308 46-46c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-47 47-422-422z" style={{ fill:"#00406f",fillRule:"nonzero" }}/><path className="fil3" d="m1262 1355 47-47 422 422-46 46c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z"/></g><path style={{ fill:"none" }} d="M0 0h2048v2048H0z"/></g>
  </svg>
);


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
        <div className="w-[99%] md:w-full max-w-[1700px] flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestió de Comandes</h1>
          
          {/* --- FILTROS (Mantiene estilos de tarjeta redondeada) --- */}
          <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex-1 max-w-lg w-full">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <SearchIcon />
                </span>
              </div>
            </div>

            <div className="md:w-72 w-full">
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

            {(searchTerm || estatFilter) && (
              <div className="flex items-end w-full md:w-auto">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setEstatFilter("");
                  }}
                  className="w-full md:w-auto px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Netejar filtres
                </button>
              </div>
            )}
          </div>
          {/* --- FIN FILTROS --- */}

          {/* --- TABLA DE COMANDAS --- */}
          {/* Contenedor principal con esquinas redondeadas (rounded-xl) */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-0 overflow-x-auto">
            
            {/* Título/Conteo */}
            <div className="px-4 pt-4 text-sm text-gray-600">
              {filteredComandes.length === comandes.length ? (
                <span>Total: <strong>{comandes.length}</strong> comandes</span>
              ) : (
                <span>
                  Mostrant <strong>{filteredComandes.length}</strong> de <strong>{comandes.length}</strong> comandes
                </span>
              )}
            </div>

            {filteredComandes.length === 0 ? (
              // Contenido de "sin resultados"
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
              <table className="w-full border-collapse mt-2">
                {/* Cabecera con rounded-t-xl para las esquinas superiores */}
                <thead className="bg-slate-800 text-white rounded-t-xl">
                  <tr>
                    <th className="py-3 px-4 text-left w-[150px] rounded-tl-xl">Número</th>
                    <th className="py-3 px-4 text-left w-[200px] hidden md:table-cell">Data</th>
                    <th className="py-3 px-4 text-left">Total</th>
                    <th className="py-3 px-4 text-center hidden md:table-cell w-[140px]">Estat</th>
                    <th className="py-3 px-4 text-center w-[60px] rounded-tr-xl">XML</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComandes.map((comanda) => (
                    <>
                      <tr
                        key={comanda.id}
                        className="border-b hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => toggleExpand(comanda.id)}
                      >
                        <td className="py-3 px-4 text-gray-700 font-medium break-words md:break-normal">
                          {comanda.numeroComanda}
                        </td>
                        <td className="py-3 px-4 text-gray-600 truncate hidden md:table-cell">
                          {formatDate(comanda.dataCreacio)}
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-semibold">
                          {comanda.totalAmbDescompte.toFixed(2)} €
                        </td>
                        <td className="py-3 px-4 text-center hidden md:table-cell">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getEstatColor(
                              comanda.estat
                            )}`}
                          >
                            {getEstatText(comanda.estat)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center w-[60px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Evita que se colapse/expanda la fila
                              downloadXmlUbl(comanda.id, comanda.numeroComanda);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                            title="Descarregar XML-UBL"
                          >
                            <DownloadIcon />
                          </button>
                        </td>
                      </tr>
                      {expandedId === comanda.id && (
                        <tr>
                          <td colSpan={5} className="bg-gray-50 p-4">
                            <h4 className="font-bold text-gray-700 mb-2">Detall de la comanda:</h4>
                            <div className="overflow-x-auto">
                              {/* Esta tabla interna también se redondea */}
                              <table className="min-w-full text-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead>
                                  <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-3 text-left w-1/2 rounded-tl-lg">Producte</th>
                                    <th className="py-2 px-3 text-left w-1/4">Quantitat</th>
                                    <th className="py-2 px-3 text-right w-1/4 rounded-tr-lg">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {comanda.linies.map((l, index) => (
                                    <tr key={l.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                      <td className="py-2 px-3 text-gray-600">{l.nomProducte}</td>
                                      <td className="py-2 px-3 text-gray-600">{l.quantitat}</td>
                                      <td className="py-2 px-3 text-gray-600 text-right">{l.total.toFixed(2)} €</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* --- FIN TABLA DE COMANDAS --- */}
        </div>
      </div>
    </MainLayout>
  );
}