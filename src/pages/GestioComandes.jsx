import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Toast from "../components/Toast";
import { getEstatText, getEstatColor, EstatComanda } from "../utils/estatComanda";

// ==== ICONOS ====


const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);


const EditIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffe0b2" d="M399.605 259.905V1788.1h837.825v-235.46h235.45V259.905z" />
    <path fill="#ffb74d" d="m1237.43 1788.1 117.73-117.73 117.72-117.73h-235.45z" />
    <path fill="#ffb74d" d="M479.98 505.261h912.53v-36.263H479.98z" />
    <path fill="#ffb74d" d="M479.98 633.167h912.53v-36.254H479.98z" />
    <path fill="#ffb74d" d="M479.98 761.051h912.53v-36.268H479.98z" />
    <path fill="#ffb74d" d="M479.98 888.921h912.53v-36.247H479.98z" />
    <path fill="#ffb74d" d="M479.98 1016.8h912.53v-36.242H479.98z" />
    <path fill="#0277bd" d="m1508.65 1649.66 139.75-139.75-485.95-485.95-139.74 139.75z" />
    <path fill="#424242" d="m1428.44 1569.43 139.74-139.74-25.28-25.28-139.75 139.73z" />
    <path fill="#ffef9d" d="m1162.45 1023.96-139.74 139.75-23.963-117.3 46.383-46.4z" />
    <path fill="#2e3031" d="m1045.13 1000.01-46.383 46.4-11.902-58.316z" />
    <path fill="#039be5" d="m1648.26 1510.05-80.23-80.22-69.86 69.87 80.22 80.22z" />
    <path fill="#039be5" d="m1542.75 1404.53-380.44-380.42-69.87 69.88 380.43 380.41z" />
    <path fill="#f05b55" d="m1568.03 1429.83-69.859 69.87 69.859-69.87zm-25.273-25.29-.012-.01-69.874 69.87h.015l69.87-69.86z" />
    <path fill="#616161" d="m1568.03 1429.83-25.27-25.29-69.87 69.86 25.28 25.3z" />
    <path fill="#2e2f2e" d="m1037.36 1007.78-15.55 15.57z" />
    <path fill="#abb1b0" d="m986.91 988.428-.038-.175-.163-.026z" />
    <path fill="#bcb17b" d="m1045.01 1000.13-7.65 7.65z" />
    <path fill="#292a2b" d="m1045.01 1000.13-58.138-11.877.038.175 34.9 34.922 15.55-15.57z" />
  </svg>
);

// BORRAR 
const DeleteIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path fill="#6770e6" d="M197 70H59c-8.837 0-16 7.163-16 16v14h170V86c0-8.837-7.163-16-16-16z" />
    <path fill="#858eff" d="M197 70H59c-8.837 0-16 7.164-16 16v6c0-8.836 7.163-16 16-16h138c8.837 0 16 7.164 16 16v-6c0-8.836-7.163-16-16-16z" />
    <path fill="#5861c7" d="M169 70h-12v-4c0-5.514-4.486-10-10-10h-38c-5.514 0-10 4.486-10 10v4H87v-4c0-12.131 9.869-22 22-22h38c12.131 0 22 9.869 22 22v4z" />
    <path fill="#6770e6" d="M147 44h-38c-12.131 0-22 9.869-22 22v4h.095C88.109 58.803 97.544 50 109 50h38c11.456 0 20.891 8.803 21.905 20H169v-4c0-12.131-9.869-22-22-22z" />
    <path fill="#858eff" d="M215 116H41a8 8 0 0 1 0-16h174a8 8 0 0 1 0 16z" />
    <path fill="#6770e6" d="M213 116H43l18.038 126.263A16 16 0 0 0 76.877 256h102.247a16 16 0 0 0 15.839-13.737L213 116z" />
    <path fill="#5861c7" d="M179.944 250H76.056c-7.23 0-13.464-4.682-15.527-11.303l.509 3.565A16 16 0 0 0 76.877 256h102.247a16 16 0 0 0 15.839-13.737l.509-3.565c-2.063 6.62-8.297 11.302-15.528 11.302zM82.665 136h-.93c-4.141 0-7.377 3.576-6.965 7.697l8.6 86A7 7 0 0 0 90.335 236h.93c4.141 0 7.377-3.576 6.965-7.697l-8.6-86A7 7 0 0 0 82.665 136zM165.165 236h-.93c-4.141 0-7.377-3.576-6.965-7.697l8.6-86a7 7 0 0 1 6.965-6.303h.93c4.141 0 7.377 3.576 6.965 7.697l-8.6 86a7 7 0 0 1-6.965 6.303zM128.5 136h-1a7 7 0 0 0-7 7v86a7 7 0 0 0 7 7h1a7 7 0 0 0 7-7v-86a7 7 0 0 0-7-7z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 2048 2048" className="w-5 h-5 text-gray-400">
    <defs><style>{`.fil1,.fil3{fill:#003761;fill-rule:nonzero}.fil1{fill:#01579b}`}</style></defs>
    <g id="Layer_x0020_1"><g id="_220499688"><circle cx="767" cy="769" r="452" style={{ fill: "#b3e5fe", stroke: "#373435", strokeWidth: "2.08347" }} /><path className="fil1" d="M405 407c100-100 231-150 362-150s262 50 362 150 150 231 150 362-50 262-150 362-231 150-362 150-262-50-362-150-150-231-150-362 50-262 150-362zm362-86c-115 0-229 44-317 131-87 87-131 202-131 317s44 229 131 317c87 87 202 131 317 131s229-44 317-131c87-87 131-202 131-317s-44-229-131-317c-87-87-202-131-317-131z" /><path d="M578 1006c14 11 16 31 5 45s-31 16-45 5c-6-5-11-9-16-14-6-5-11-10-15-14-72-72-108-166-108-260s36-188 108-260c2-2 6-6 12-11 13-12 33-11 45 2s11 33-2 45c-2 1-5 5-9 9-59 59-89 137-89 214 0 78 30 155 89 214 4 4 9 8 13 12 5 4 9 8 13 11z" style={{ fill: "#e1f5fe", fillRule: "nonzero" }} /><path className="fil1" d="m1115 1066 222 222-46 45-222-222z" /><path className="fil3" d="m1262 1355 93-93c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-93 93c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z" /><path d="m1309 1308 46-46c10-10 23-15 36-15s26 5 36 15l352 349c10 10 15 23 15 36s-5 26-15 36l-47 47-422-422z" style={{ fill: "#00406f", fillRule: "nonzero" }} /><path className="fil3" d="m1262 1355 47-47 422 422-46 46c-10 10-23 15-36 15s-26-5-36-15l-352-349c-10-10-15-23-15-36s5-26 15-36z" /></g><path style={{ fill: "none" }} d="M0 0h2048v2048H0z" /></g>
  </svg>
);

export default function GestioComandes() {

  const { getToken, logout, isAdmin, user } = useAuth();
  const [comandes, setComandes] = useState([]);
  const [usuaris, setUsuaris] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentComanda, setCurrentComanda] = useState(null);
  const [newEstat, setNewEstat] = useState("");

  // MODAL ELIMINAR
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [comandaToDelete, setComandaToDelete] = useState(null);

  // Cercador local de comandes
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const [filteredComandes, setFilteredComandes] = useState([]);
  const [selectedEstat, setSelectedEstat] = useState("");

  const showToast = (message, type = "success") => setToast({ message, type });

  const fetchUsuaris = async () => {
    if (!isAdmin()) return;
    try {
      const token = getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const map = {};
        data.forEach(u => map[u.id] = u.fullName || u.username);
        setUsuaris(map);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchComandes = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comandes`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        if (res.status === 401) logout();
        throw new Error("Error carregant comandes");
      }

      const data = await res.json();
      setComandes(data);
      // Inicialitzar la llista filtrada amb totes les comandes
      setFilteredComandes(data);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuaris();
    fetchComandes();
  }, []);

  // Aplicar filtres de cerca sobre comandes (independents)
  useEffect(() => {
    // Si hi ha un estat seleccionat, mostrar només per estat (independent de la cerca)
    if (selectedEstat !== "") {
      const estatNum = parseInt(selectedEstat, 10);
      setFilteredComandes(comandes.filter((c) => Number(c.estat) === estatNum));
      return;
    }

    // Si hi ha una cerca escrita, mostrar només els resultats de la cerca
    const q = searchTermLocal.trim().toLowerCase();
    if (q !== "") {
      setFilteredComandes(
        comandes.filter((c) => {
          const numero = (c.numeroComanda || "").toString().toLowerCase();
          const usuariNom = (getNomUsuari(c.usuariId) || "").toString().toLowerCase();
          const idStr = (c.id || "").toString().toLowerCase();
          return numero.includes(q) || usuariNom.includes(q) || idStr.includes(q);
        })
      );
      return;
    }

    // Si no hi ha ni estat ni cerca, mostrar totes les comandes
    setFilteredComandes(comandes);
  }, [searchTermLocal, selectedEstat, comandes, usuaris]);

  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("ca-ES", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  // === MODAL EDITAR ESTAT ===
  const openModal = (c) => {
    setCurrentComanda(c);
    setNewEstat(c.estat);
    setModalOpen(true);
  };

  const updateEstat = async () => {
    try {
      const token = getToken();
      const r = await fetch(`${import.meta.env.VITE_API_URL}/comandes/${currentComanda.id}/estat`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ estat: parseInt(newEstat) })
      });

      if (!r.ok) throw new Error("Error actualitzant estat");

      setComandes(prev => {
        const next = prev.map(c => c.id === currentComanda.id
          ? { ...c, estat: parseInt(newEstat) }
          : c);
        setFilteredComandes(next);
        return next;
      }
      );

      setModalOpen(false);
      showToast("Estat actualitzat correctament");
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  // ==== MODAL ELIMINAR ====
  const openDeleteModal = (c) => {
    setComandaToDelete(c);
    setModalDeleteOpen(true);
  };

  const confirmDeleteComanda = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comandes/${comandaToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Error eliminant la comanda");

      setComandes(prev => {
        const next = prev.filter(c => c.id !== comandaToDelete.id);
        setFilteredComandes(next);
        return next;
      });

      showToast("Comanda eliminada correctament");
      setModalDeleteOpen(false);
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const getNomUsuari = (uid) => isAdmin()
    ? (usuaris[uid] || "Carregant...")
    : (user?.fullName || user?.username);

  // Descarregar XML UBL de la comanda
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

  // ================== RENDER ==================

  if (loading)
    return (
      <MainLayout>
        <div className="p-8 text-center">Carregant comandes...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="p-4 flex justify-center">
        <div className="w-[99%] max-w-[1700px] space-y-6">

          {/* Bloc de buscador i filtre */}
          <div className="bg-white shadow rounded-xl border p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cercar comanda</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Número, usuari o id..."
                      value={searchTermLocal}
                      onChange={(e) => {
                        setSearchTermLocal(e.target.value);
                        // assegurar que el filtre per estat és independent
                        if (selectedEstat) setSelectedEstat("");
                      }}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <SearchIcon />
                    </span>
                  </div>

                  {searchTermLocal && (
                    <button
                      onClick={() => setSearchTermLocal("")}
                      className="hidden sm:inline-block px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 whitespace-nowrap"
                    >
                      Netejar
                    </button>
                  )}
                </div>
                {searchTermLocal && (
                  <div className="mt-2 sm:hidden">
                    <button
                      onClick={() => setSearchTermLocal("")}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full"
                    >
                      Netejar
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar per estat</label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedEstat}
                    onChange={(e) => {
                      setSelectedEstat(e.target.value);
                      // assegurar que la cerca és independent
                      if (searchTermLocal) setSearchTermLocal("");
                    }}
                    className="w-full sm:w-48 border border-gray-300 rounded-lg p-2 text-gray-700 bg-white"
                  >
                    <option value="">Tots els estats</option>
                    {Object.keys(EstatComanda).map((k) => (
                      <option key={k} value={EstatComanda[k]}>{getEstatText(EstatComanda[k])}</option>
                    ))}
                  </select>

                  {selectedEstat !== "" && (
                    <button
                      onClick={() => setSelectedEstat("")}
                      className="hidden sm:inline-block px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 whitespace-nowrap"
                    >
                      Netejar estat
                    </button>
                  )}
                </div>

                {selectedEstat !== "" && (
                  <div className="mt-2 sm:hidden">
                    <button
                      onClick={() => setSelectedEstat("")}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full"
                    >
                      Netejar estat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bloc de taula */}
          <div className="bg-white shadow rounded-xl overflow-x-auto border">

            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Usuari / Comanda</th>
                  <th className="py-3 px-4 text-left hidden md:table-cell">Data</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">Estat</th>
                  {isAdmin() && (
                    <th className="py-3 px-4 text-center">Accions</th>
                  )}
                  <th className="py-3 px-4 text-center">XML</th>
                </tr>
              </thead>

              <tbody>
                {filteredComandes.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-100">

                    <td className="px-4 py-3">
                      {getNomUsuari(c.usuariId)}<br />
                      <small>{c.numeroComanda}</small>
                    </td>

                    <td className="px-4 py-3 hidden md:table-cell">
                      {formatDate(c.dataCreacio)}
                    </td>

                    <td className="px-4 py-3">
                      {c.totalAmbDescompte.toFixed(2)} €
                    </td>

                    <td className="px-4 py-3 hidden md:table-cell text-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${getEstatColor(c.estat)}`}>
                        {getEstatText(c.estat)}
                      </span>
                    </td>

                    {isAdmin() && (
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">

                          <button
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            onClick={() => openModal(c)}
                          >
                            <EditIcon />
                          </button>

                          <button
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            onClick={() => openDeleteModal(c)}
                          >
                            <DeleteIcon />
                          </button>

                        </div>
                      </td>
                    )}

                    <td className="px-4 py-3 text-center">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        onClick={() => downloadXmlUbl(c.id, c.numeroComanda)}
                      >
                        <DownloadIcon />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4">
              Canviar estat – {currentComanda.numeroComanda}
            </h3>

            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={newEstat}
              onChange={(e) => setNewEstat(e.target.value)}
            >
              {Object.keys(EstatComanda).map((k) => (
                <option key={k} value={EstatComanda[k]}>
                  {getEstatText(EstatComanda[k])}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="border px-3 py-1 rounded">
                Cancel·lar
              </button>
              <button onClick={updateEstat} className="bg-slate-600 text-white px-3 py-1 rounded">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Eliminar Comanda
            </h3>

            <p className="mb-4">
              Estàs segur que vols eliminar definitivament la comanda:
              <br />
              <strong>{comandaToDelete.numeroComanda}</strong>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalDeleteOpen(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel·lar
              </button>

              <button
                onClick={confirmDeleteComanda}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>

        </div>
      )}

    </MainLayout>
  );
}
