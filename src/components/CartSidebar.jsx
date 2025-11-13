import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Toast from "./Toast";
import { EstatComanda } from "../utils/estatComanda";

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
                    🗑️
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