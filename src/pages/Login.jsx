import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Per favor, omple tots els camps');
      setLoading(false);
      return;
    }

    const result = await login(formData.username, formData.password);
    
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Credencials incorrectes');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar sessió
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Usuari
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Introdueix nom usuari"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contrasenya
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="******"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-slate-700 hover:bg-slate-600'
            } text-white`}
          >
            {loading ? 'Entrant...' : 'Entrar'}
          </button>
        </form>
            
        <div className="mt-6 p-3 bg-blue-50 rounded text-sm text-gray-600">
          <p className="font-semibold mb-2">Usuaris de prova:</p>
          <p><strong>Admin:</strong> administrador / ComandesJSDR</p>
          <p><strong>User:</strong> usuari / ComandesJSDR</p>
        </div>

      </div>
    </div>
  );
}
