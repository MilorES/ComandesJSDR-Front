import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartItems, toggleCart } = useCart();

  return (
    <div
      className="
        fixed z-50 cursor-pointer
        top-24 right-5              /* mòbil */
        sm:top-20 sm:right-8       /* tablet */
        lg:top-28 lg:right-14      /* escritori */
      "
      onClick={toggleCart}
    >
      <div className="relative bg-white rounded-full shadow-md p-3 hover:shadow-xl transition">
        <span className="text-2xl">🛒</span>
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  );
}
