import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/productes");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sessió</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Usuari</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Introdueix nom usuari"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contrasenya</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
