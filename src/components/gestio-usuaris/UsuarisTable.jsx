// Iconos estandarizados
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
