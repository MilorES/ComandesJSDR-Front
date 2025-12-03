import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Toast from "./Toast";


// Icono de Eliminar
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

export default function CartSidebar() {
  const {
    cartItems,
    isOpen,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  
  const { getToken, logout } = useAuth();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + (item.preu * item.quantity), 0);
  };

  const handleRealitzarComanda = async () => {
    if (cartItems.length === 0) {
      showToast("El carret està buit", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      
      // Preparar les línies de comanda
      const linies = cartItems.map((item, index) => ({
        articleId: item.id,
        nomProducte: item.nom,
        descripcio: item.descripcio || "",
        quantitat: item.quantity,
        preuUnitari: item.preu,
        descomptePercentatge: 0,
        ordre: index
      }));

      // Crear la comanda
      const body = {
        observacions: null,
        descomptePercentatge: 0,
        linies: linies
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/comandes`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          logout();
          throw new Error("Sessió expirada");
        }
        if (response.status === 400) {
          throw new Error(errorText || "Dades incorrectes");
        }
        throw new Error(errorText || "Error al crear la comanda");
      }

      const data = await response.json();
      
      showToast(`Comanda ${data.numeroComanda} realitzada correctament`, "success");
      clearCart();
      
      // Tancar el carret després de 2 segons
      setTimeout(() => {
        toggleCart();
      }, 2000);

    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-96 max-[640px]:w-full   
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Cistella</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No hi ha productes a la cistella.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.nom}</p>
                  <p className="text-sm text-gray-500">{item.preu.toFixed(2)} € x {item.quantity}</p>
                  <p className="text-sm font-medium text-gray-700">
                    Total: {(item.preu * item.quantity).toFixed(2)} €
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <DeleteIcon></DeleteIcon>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="mb-3 flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>{calcularTotal().toFixed(2)} €</span>
            </div>
            <button 
              onClick={handleRealitzarComanda}
              disabled={isSubmitting}
              className={`w-full py-2 rounded font-medium transition ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-sky-900 hover:bg-sky-700"
              } text-white`}
            >
              {isSubmitting ? "Enviant..." : "Realitzar comanda"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}