import { useState, useEffect } from "react";

export default function UsuariForm({ initialData, onCancel, onSave }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "User",
  });
  // Nuevo estado para gestionar los errores de validación sin usar alert()
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        password: "", // La contraseña siempre se inicializa vacía
        role: initialData.role || "User",
      });
    } else {
      setForm({
        username: "",
        password: "",
        role: "User",
      });
    }
    setError(null); // Limpiar errores al cambiar de usuario/modo
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError(null);
    let validationError = null;

    // Validar campos obligatorios
    if (!form.username && !initialData) {
      validationError = "El nom d'usuari és obligatori";
    } else if (!form.password && !initialData) {
      validationError = "La contrasenya és obligatòria";
    } else if (!form.role) {
      validationError = "El rol és obligatori";
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    // Netegem el payload: eliminem claus amb cadena buida/null/undefined
    const payload = { ...form };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "" || payload[k] === null || typeof payload[k] === "undefined") delete payload[k];
    });

    onSave(payload);
  };

  // Eliminamos containerClasses, ya que el Modal se encarga del fondo y la sombra
  const isCreating = !initialData;

  return (
    <div className="p-1"> 

      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Tancar</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L5.651 7.689a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.03a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.15 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Nom d'usuari <span className="text-red-500">*</span>
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!!initialData}
            className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${initialData ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
              }`}
            placeholder="usuari123"
          />
          {initialData && (
            <p className="text-xs text-gray-500 mt-1">
              No es pot canviar el nom d'usuari
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Contrasenya <span className="text-red-500">*</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder={initialData ? "(deixa buit per no canviar)" : "••••••••"}
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Rol <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
          >
            <option value="User">Usuari</option>
            <option value="Administrator">Administrador</option>
          </select>
        </div>
        
        
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Cancel·lar
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg"
        >
          {initialData ? "Actualitzar" : "Crear"}
        </button>
      </div>
    </div>
  );
}