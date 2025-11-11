import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const {
    cartItems,
    isOpen,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
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

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
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
              <div>
                <p className="font-semibold">{item.nom}</p>
                <p className="text-sm text-gray-500">{item.preu.toFixed(2)} €</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-2 border-t">
          <button className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700">
            Realitzar comanda
          </button>
        </div>
      )}
    </div>
  );
}
