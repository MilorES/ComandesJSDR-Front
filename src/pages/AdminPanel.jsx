import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import MainLayout from "../layouts/MainLayout";

// Iconos estandarizados (mismo estilo que GestioComandes y UsuarisTable)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export default function AdminPanel() {
  const { getToken, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    descripcio: "",
    preu: "",
    estoc: "",
    categoria: "",
    actiu: true
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchCategories = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status} al carregar categories`);
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      showToast(error.message || "Error al carregar categories", "error");
    }
  };

  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      const token = getToken();

      const url = `${import.meta.env.VITE_API_URL}/articles${category ? `?categoria=${encodeURIComponent(category)}` : ""}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showToast(error.message || "Error al carregar productes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    fetchProducts(newCategory);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const openModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    setFormErrors({});

    if (type === "edit" && product) {
      setFormData({
        nom: product.nom,
        descripcio: product.descripcio || "",
        preu: product.preu,
        estoc: product.estoc,
        categoria: product.categoria || "",
        actiu: product.actiu
      });
    } else if (type === "add") {
      setFormData({
        nom: "",
        descripcio: "",
        preu: "",
        estoc: "",
        categoria: "", 
        actiu: true
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormData({
      nom: "",
      descripcio: "",
      preu: "",
      estoc: "",
      categoria: "",
      actiu: true
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nom.trim()) {
      errors.nom = "El nom és obligatori";
    }

    const parsedPreu = parseFloat(formData.preu);
    if (isNaN(parsedPreu) || parsedPreu <= 0) {
      errors.preu = "El preu ha de ser superior a 0";
    }

    const parsedEstoc = parseInt(formData.estoc, 10);
    if (isNaN(parsedEstoc) || parsedEstoc < 0) {
      errors.estoc = "L'estoc ha de ser un número sencer positiu o zero";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = getToken();
      const url = modalType === "add"
        ? `${import.meta.env.VITE_API_URL}/articles`
        : `${import.meta.env.VITE_API_URL}/articles/${selectedProduct.id}`;

      const method = modalType === "add" ? "POST" : "PUT";

      const body = {
        nom: formData.nom,
        descripcio: formData.descripcio || null,
        preu: parseFloat(formData.preu),
        estoc: parseInt(formData.estoc),
        categoria: formData.categoria || null,
        actiu: formData.actiu
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 409) {
          throw new Error(errorData || "Ja existeix un article amb aquest nom");
        }
        if (response.status === 400) {
          throw new Error(errorData || "Dades incorrectes");
        }
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(errorData || "Error al guardar el producte");
      }

      showToast("Canvis aplicats correctament", "success");
      closeModal();
      await fetchProducts();
      await fetchCategories();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${selectedProduct.id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        if (response.status === 404) {
          throw new Error("Producte no trobat");
        }
        throw new Error(errorText || "Error al eliminar el producte");
      }

      showToast("Producte eliminat correctament", "success");
      closeModal();
      await fetchProducts();
      await fetchCategories(); 
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregant productes...</p>
          </div>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-1/3"> 
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-800 mb-1">Filtrar per Categoria:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 bg-white"
            >
              <option value="">Totes les categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => openModal("add")}
            className="bg-green-600 hover:bg-green-700 px-3 py-2 text-sm rounded-lg font-semibold w-full sm:w-auto sm:px-4 sm:text-base text-center text-white mt-auto"
          >
            + Afegir producte
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow text-gray-800">
          <table className="hidden md:table w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nom producte</th>
                <th className="py-3 px-4 text-left">Categoria</th>
                <th className="py-3 px-4 text-left">Preu (€)</th>
                <th className="py-3 px-4 text-left">Estoc</th>
                <th className="py-3 px-4 text-left">Estat</th>
                <th className="py-3 px-4 text-center">Accions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-4">{p.id}</td>
                  <td className="py-3 px-4 font-medium">{p.nom}</td>
                  <td className="py-3 px-4">{p.categoria || "-"}</td>
                  <td className="py-3 px-4">{p.preu.toFixed(2)} €</td>
                  <td className="py-3 px-4">{p.estoc}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${p.actiu ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                      {p.actiu ? "Actiu" : "Inactiu"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openModal("edit", p)} 
                        className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600" 
                        title="Editar"
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => openModal("delete", p)} 
                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600" 
                        title="Eliminar"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="block md:hidden divide-y">
            {products.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{p.nom}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${p.actiu ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {p.actiu ? "Actiu" : "Inactiu"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{p.categoria || "Sense categoria"}</p>
                <p className="text-sm text-gray-600"> {p.preu.toFixed(2)} €</p>
                <p className="text-sm text-gray-600 mb-2"> Estoc: {p.estoc}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={() => openModal("edit", p)} 
                    className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                  >
                    <EditIcon />
                  </button>
                  <button 
                    onClick={() => openModal("delete", p)} 
                    className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(modalType === "add" || modalType === "edit") && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg text-gray-800 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {modalType === "add" ? "Afegir producte" : "Editar producte"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Nom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={`w-full border rounded p-2 ${formErrors.nom ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formErrors.nom && <p className="text-red-500 text-sm mt-1">{formErrors.nom}</p>}
                </div>

                <div>
                  <label className="block font-medium mb-1">Descripció</label>
                  <textarea
                    name="descripcio"
                    value={formData.descripcio}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded p-2"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-medium mb-1">Categoria</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Elegeix la categoria</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Preu (€) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="preu"
                      step="0.01"
                      value={formData.preu}
                      onChange={handleInputChange}
                      className={`w-full border rounded p-2 ${formErrors.preu ? "border-red-500" : "border-gray-300"}`}
                    />
                    {formErrors.preu && <p className="text-red-500 text-sm mt-1">{formErrors.preu}</p>}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Estoc <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="estoc"
                      value={formData.estoc}
                      onChange={handleInputChange}
                      className={`w-full border rounded p-2 ${formErrors.estoc ? "border-red-500" : "border-gray-300"}`}
                    />
                    {formErrors.estoc && <p className="text-red-500 text-sm mt-1">{formErrors.estoc}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" name="actiu" checked={formData.actiu} onChange={handleInputChange} className="w-4 h-4" />
                  <label>Actiu</label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium w-full sm:w-auto">
                    Cancel·lar
                  </button>
                  <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded font-medium w-full sm:w-auto">
                    {modalType === "add" ? "Afegir" : "Desar canvis"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalType === "delete" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-center">Confirmar eliminació</h2>
              <p className="text-center">
                Segur que vols eliminar el producte <strong>{selectedProduct?.nom}</strong>?
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded w-full sm:w-auto">
                  Cancel·lar
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded w-full sm:w-auto">
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