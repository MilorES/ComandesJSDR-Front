import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import UsuarisTable from "../components/gestio-usuaris/UsuarisTable";
import UsuariForm from "../components/gestio-usuaris/UsuariForm";
import Toast from "../components/Toast";
import MainLayout from "../layouts/MainLayout";
import Modal from "../components/gestio-usuaris/ModalUsuari";
import ModalConfirmacio from "../components/gestio-usuaris/ModalConfirmacio";

export default function GestioUsuaris() {
  const { getToken, logout } = useAuth();
  const [usuaris, setUsuaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para el modal de confirmación de eliminación
  const [deletingUser, setDeletingUser] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleOpenModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleSave = async (formData) => {
    try {
      const token = getToken();

      let url, method, body;

      if (editingUser) {
        url = `${import.meta.env.VITE_API_URL}/users/${editingUser.id}`;
        method = "PUT";
        body = JSON.stringify({
          role: formData.role,
          isEnabled: true,
          ...(formData.password && { password: formData.password }),
        });
      } else {
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
      handleCloseModal();
      fetchUsuaris();
    } catch (error) {
      showToast(error.message || "Error al guardar usuari", "error");
    }
  };

  // Abrir modal de confirmación de eliminación
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;

    try {
      const token = getToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${deletingUser.id}`,
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
    } finally {
      setDeletingUser(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregant usuaris...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="flex justify-start">
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            + Crear Usuari
          </button>
        </div>

        <Modal isOpen={isModalOpen && !editingUser} onClose={handleCloseModal} title="Crear Nou Usuari">
          <UsuariForm
            initialData={null}
            onCancel={handleCloseModal}
            onSave={handleSave}
          />
        </Modal>

        <Modal
          isOpen={!!editingUser}
          onClose={handleCancel}
          title={`Editar Usuari: ${editingUser?.username || 'Càrrega...'}`}
        >
          {editingUser && (
            <UsuariForm
              initialData={editingUser}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          )}
        </Modal>

        <ModalConfirmacio
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleConfirmDelete}
          title="Eliminar Usuari"
          message={`Estàs segur que vols eliminar l'usuari "${deletingUser?.username}"? Aquesta acció no es pot desfer.`}
          confirmText="Eliminar"
          cancelText="Cancel·lar"
          type="danger"
        />

        <UsuarisTable
          usuaris={usuaris}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
    </MainLayout>
  );
}