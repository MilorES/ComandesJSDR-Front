import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

export default function AdminPanel() {
  const { user, getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // "add" | "edit" | "delete"

  // Simulación temporal
  useEffect(() => {
    setProducts([
      { id: 1, nom: "Producte A", preu: 10, estoc: 5, actiu: true },
      { id: 2, nom: "Producte B", preu: 20, estoc: 0, actiu: true },
      { id: 3, nom: "Producte C", preu: 15, estoc: 3, actiu: false },
    ]);
  }, []);

  const openModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-8 text-white">
        {/* Header + Botón */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={() => openModal("add")}
            className="
      bg-green-600 hover:bg-green-700
      px-3 py-2 text-sm
      rounded-lg font-semibold
      w-auto self-end
      sm:px-4 sm:text-base sm:self-auto
      text-center
    "
          >
            ➕ Afegir producte
          </button>
        </div>

        {/* 📱 Vista responsive de productos */}
        <div className="overflow-x-auto bg-white rounded-lg shadow text-gray-800">
          {/* Tabla (solo visible en pantallas medianas o más grandes) */}
          <table className="hidden md:table w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nom producte</th>
                <th className="py-3 px-4 text-left">Preu (€)</th>
                <th className="py-3 px-4 text-left">Estoc</th>
                <th className="py-3 px-4 text-left">Estat</th>
                <th className="py-3 px-4 text-center">Accions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{p.id}</td>
                  <td className="py-3 px-4 font-medium">{p.nom}</td>
                  <td className="py-3 px-4">{p.preu.toFixed(2)} €</td>
                  <td className="py-3 px-4">{p.estoc}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${p.actiu
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {p.actiu ? "Actiu" : "Inactiu"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openModal("edit", p)}
                        className="text-yellow-500 hover:text-yellow-400"
                        title="Editar"
                      >
                        📝
                      </button>
                      <button
                        onClick={() => openModal("delete", p)}
                        className="text-red-600 hover:text-red-500"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🧱 Cards (solo visible en móvil) */}
          <div className="block md:hidden divide-y">
            {products.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{p.nom}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${p.actiu
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {p.actiu ? "Actiu" : "Inactiu"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">💰 {p.preu.toFixed(2)} €</p>
                <p className="text-sm text-gray-600 mb-2">
                  📦 Estoc: {p.estoc}
                </p>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => openModal("edit", p)}
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    📝
                  </button>
                  <button
                    onClick={() => openModal("delete", p)}
                    className="text-red-600 hover:text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🧩 Modales (iguales que antes) */}
        {(modalType === "add" || modalType === "edit") && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg text-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {modalType === "add"
                  ? "🆕 Afegir producte"
                  : "✏️ Editar producte"}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    defaultValue={selectedProduct?.nom || ""}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Descripció</label>
                  <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    defaultValue={selectedProduct?.descripcio || ""}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Preu (€)</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2"
                      defaultValue={selectedProduct?.preu || ""}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Estoc</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2"
                      defaultValue={selectedProduct?.estoc || ""}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={selectedProduct?.actiu || false}
                  />
                  <label>Actiu</label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded font-medium w-full sm:w-auto"
                  >
                    {modalType === "add" ? "Afegir" : "Desar canvis"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium w-full sm:w-auto"
                  >
                    Cancel·lar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modalType === "delete" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm text-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-center">
                ⚠️ Confirmar eliminació
              </h2>
              <p className="text-center">
                Segur que vols eliminar el producte{" "}
                <strong>{selectedProduct?.nom}</strong>?
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded w-full sm:w-auto"
                >
                  Cancel·lar
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded w-full sm:w-auto"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
