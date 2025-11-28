export default function UsuarisTable({ usuaris = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded shadow p-6 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4">Llista d'usuaris</h3>

      {usuaris.length === 0 ? (
        <p className="text-gray-500">No hi ha usuaris registrats.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Usuari</th>
              <th className="p-2 border-b">Nom complet</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Rol</th>
              <th className="p-2 border-b text-right">Accions</th>
            </tr>
          </thead>

          <tbody>
            {usuaris.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.fullname}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role === "admin" ? "Administrador" : "Usuari"}</td>
                <td className="p-2 text-right space-x-3">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(u)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
