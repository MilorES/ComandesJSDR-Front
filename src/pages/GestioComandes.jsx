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
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

// BORRAR 
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

      setComandes(await res.json());
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

      setComandes(prev =>
        prev.map(c => c.id === currentComanda.id
          ? { ...c, estat: parseInt(newEstat) }
          : c)
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

      setComandes(prev => prev.filter(c => c.id !== comandaToDelete.id));

      showToast("Comanda eliminada correctament");
      setModalDeleteOpen(false);
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const getNomUsuari = (uid) => isAdmin()
    ? (usuaris[uid] || "Carregant...")
    : (user?.fullName || user?.username);

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
        <div className="w-[99%] max-w-[1700px]">

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
                {comandes.map((c) => (
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

                          {/* EDITAR */}
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            onClick={() => openModal(c)}
                          >
                            <EditIcon />
                          </button>

                          {/* ELIMINAR */}
                          <button
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            onClick={() => openDeleteModal(c)}
                          >
                            <DeleteIcon />
                          </button>

                        </div>
                      </td>
                    )}

                    {/* DESCARGAR XML */}
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

      {/* =================== MODAL EDITAR =================== */}
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
              <button onClick={updateEstat} className="bg-blue-600 text-white px-3 py-1 rounded">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== MODAL ELIMINAR =================== */}
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
