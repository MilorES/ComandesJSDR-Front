// Iconos estandarizados
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

export default function UsuarisTable({ usuaris = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow text-gray-800">
      {usuaris.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hi ha usuaris registrats</p>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Usuari</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Rol</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">Accions</th>
            </tr>
          </thead>
          <tbody>
            {usuaris.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 min-w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-800 font-medium truncate">{u.username}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    u.role === "Administrator" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {u.role === "Administrator" ? "Administrador" : "Usuari"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onEdit(u)} className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600" title="Editar">
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(u)} className="p-2 hover:bg-red-100 rounded-lg transition text-red-600" title="Eliminar">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
