import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import MainLayout from "../layouts/MainLayout";

// Iconos estandarizados (nuevo estilo)
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