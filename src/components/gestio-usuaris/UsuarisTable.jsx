export default function UsuarisTable({ usuaris = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Llista d'usuaris</h3>

      {usuaris.length === 0 ? (
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
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <p className="text-gray-500 text-lg">No hi ha usuaris registrats</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Usuari</th>
                <th className="py-3 px-4 text-left">Rol</th>
                <th className="py-3 px-4 text-center">Accions</th>
              </tr>
            </thead>

            <tbody>
              {usuaris.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-100 transition-colors">
                  {/* USUARI */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-medium">{u.username}</span>
                    </div>
                  </td>

                  {/* ROL - Diseño similar a "Estat" */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                        u.role === "Administrator"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role === "Administrator" ? "Administrador" : "Usuari"}
                    </span>
                  </td>

                  {/* ACCIONS - Emoticonos como AdminPanel */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(u)}
                        className="text-yellow-500 hover:text-yellow-400 text-xl"
                        title="Editar"
                      >
                        📝
                      </button>
                      <button
                        onClick={() => onDelete(u)}
                        className="text-red-600 hover:text-red-500 text-xl"
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
        </div>
      )}
    </div>
  );
}