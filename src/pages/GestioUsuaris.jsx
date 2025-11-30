import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import UsuarisTable from "../components/gestio-usuaris/UsuarisTable";
import UsuariForm from "../components/gestio-usuaris/UsuariForm";
import Toast from "../components/Toast";

export default function GestioUsuaris() {
  const { getToken, logout } = useAuth();
  const [usuaris, setUsuaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Obtener todos los usuarios
  const fetchUsuaris = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setUsuaris(data);
    } catch (error) {
      showToast(error.message || "Error al carregar usuaris", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuaris();
  }, []);

  // Guardar usuario (crear o editar)
  const handleSave = async (formData) => {
    try {
      const token = getToken();
      
      // Preparar los datos según si es crear o editar
      let url, method, body;

      if (editingUser) {
        // EDITAR usuario existente - Solo enviar rol
        url = `${import.meta.env.VITE_API_URL}/users/${editingUser.id}`;
        method = "PUT";
        body = JSON.stringify({
          role: formData.role,
          isEnabled: true,
        });
      } else {
        // CREAR nuevo usuario - Solo username, password y role
        url = `${import.meta.env.VITE_API_URL}/users`;
        method = "POST";
        body = JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role,
          isEnabled: true,
        });
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar usuari");
      }

      showToast(
        editingUser ? "Usuari actualitzat correctament" : "Usuari creat correctament",
        "success"
      );
      
      setEditingUser(null);
      fetchUsuaris();
    } catch (error) {
      showToast(error.message || "Error al guardar usuari", "error");
    }
  };

  // Eliminar usuario
  const handleDelete = async (user) => {
    if (!confirm(`Estàs segur que vols eliminar l'usuari "${user.username}"?`)) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar usuari");
      }

      showToast("Usuari eliminat correctament", "success");
      fetchUsuaris();
    } catch (error) {
      showToast(error.message || "Error al eliminar usuari", "error");
    }
  };

  // Editar usuario
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregant usuaris...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 space-y-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-3xl font-semibold text-left text-gray-800">
        Gestió d'Usuaris
      </h1>

      {/* FORMULARIO ARRIBA - Ancho completo */}
      <UsuariForm
        initialData={editingUser}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {/* TABLA ABAJO - Ancho completo */}
      <UsuarisTable
        usuaris={usuaris}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}