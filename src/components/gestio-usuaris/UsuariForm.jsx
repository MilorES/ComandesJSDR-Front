import { useState } from "react";

export default function UsuariForm({ initialData, onCancel, onSave }) {
  const [form, setForm] = useState({
    username: initialData?.username || "",
    password: "",
    fullname: initialData?.fullname || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "Editar usuari" : "Crear nou usuari"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">Nom d'usuari</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contrasenya</label>
          <input
            name="password"
            type="password"
            placeholder={initialData ? "(deixa buit per no canviar)" : ""}
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nom complet</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rol</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">Usuari</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel·lar
        </button>

        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
