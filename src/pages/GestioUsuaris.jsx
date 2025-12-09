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
    setEditingUser(null);
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
        const updatePayload = {
          role: formData.role || editingUser.role,
          isEnabled: formData.isEnabled ?? true,
        };
        if (formData.password) updatePayload.password = formData.password;
        if (formData.fullName) updatePayload.fullName = formData.fullName;
        if (formData.email) updatePayload.email = formData.email;
        // Eliminar claus amb valor cadena buida abans d'enviar
        Object.keys(updatePayload).forEach(k => {
          if (updatePayload[k] === "") delete updatePayload[k];
        });
        body = JSON.stringify(updatePayload);
      } else {
        // Validacions bàsiques al client per evitar peticions clarament invàlides
        const usernameTrim = (formData.username || "").toString().trim();
        if (!usernameTrim) throw new Error("El nom d'usuari és obligatori");
        if (!formData.password || formData.password.length < 6) throw new Error("La contrasenya ha de tenir almenys 6 caràcters");

        url = `${import.meta.env.VITE_API_URL}/users`;
        method = "POST";
        const payload = {
          username: usernameTrim,
          password: formData.password,
          role: formData.role,
          isEnabled: true,
        };
        if (formData.fullName) payload.fullName = formData.fullName;
        if (formData.email) payload.email = formData.email;
        // Eliminar claus amb valor cadena buida abans d'enviar
        Object.keys(payload).forEach(k => {
          if (payload[k] === "") delete payload[k];
        });
        body = JSON.stringify(payload);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      // Parsejar resposta amb tolerància: JSON primer, si falla provar text
      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        try {
          const txt = await response.text();
          if (txt) data = { message: txt };
        } catch (ee) {
          data = null;
        }
      }

      if (!response.ok) {
        const serverMsg = data?.message || data?.title || `Error ${response.status} ${response.statusText}`;
        throw new Error(serverMsg);
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

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

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

      if (!response.ok) {
        let errorMessage = "Error al eliminar usuari";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch (e) {
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      showToast("Usuari eliminat correctament", "success");
      setDeletingUser(null);
      fetchUsuaris();
    } catch (error) {
      showToast(error.message || "Error al eliminar usuari", "error");
      setDeletingUser(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleToggleEnabled = async (user) => {
    try {
      const token = getToken();

      const body = JSON.stringify({
        role: user.role,
        isEnabled: !user.isEnabled,
        fullName: user.fullName || "",
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al actualitzar usuari");
      }

      showToast(
        `Usuari ${user.username} ${!user.isEnabled ? "habilitat" : "deshabilitat"} correctament`,
        "success"
      );
      fetchUsuaris();
    } catch (error) {
      showToast(error.message || "Error al actualitzar usuari", "error");
    }
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

        <Modal
          isOpen={isModalOpen && !editingUser}
          onClose={handleCloseModal}
          title="Crear Nou Usuari"
        >
          <UsuariForm
            initialData={null}
            onCancel={handleCloseModal}
            onSave={handleSave}
          />
        </Modal>

        <Modal
          isOpen={isModalOpen && !!editingUser}
          onClose={handleCancel}
          title={`Editar Usuari: ${editingUser?.username || "Càrrega..."}`}
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
          onToggleEnabled={handleToggleEnabled} // añadir función toggle
        />
      </div>
    </MainLayout>
  );
}
