import { useState, useEffect } from "react";

export default function UsuariForm({ initialData, onCancel, onSave }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "User",
  });

  // Actualizar formulario cuando cambie initialData
  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        password: "",
        role: initialData.role || "User",
      });
    } else {
      setForm({
        username: "",
        password: "",
        role: "User",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validar campos obligatorios
    if (!form.username && !initialData) {
      alert("El nom d'usuari és obligatori");
      return;
    }

    if (!form.password && !initialData) {
      alert("La contrasenya és obligatòria");
      return;
    }

    if (!form.role) {
      alert("El rol és obligatori");
      return;
    }

    onSave(form);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        {initialData ? "Editar usuari" : "Crear nou usuari"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERNAME */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Nom d'usuari <span className="text-red-500">*</span>
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!!initialData}
            className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              initialData ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
            }`}
            placeholder="usuari123"
          />
          {initialData && (
            <p className="text-xs text-gray-500 mt-1">
              No es pot canviar el nom d'usuari
            </p>
          )}
        </div>

        {/* PASSWORD */}
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

        {/* ROL */}
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
        {initialData && (
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel·lar
          </button>
        )}

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
        >
          {initialData ? "Actualitzar" : "Crear"}
        </button>
      </div>
    </div>
  );
}