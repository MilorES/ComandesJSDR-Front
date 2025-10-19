import "../styles/productCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-name">{product?.nom || "Sense nom"}</h3>
      <p className="product-description">{product?.descripcio || "Sense descripció"}</p>
      <p className="product-price">
        💰 {product?.preu !== undefined ? product.preu.toFixed(2) : "N/A"} €
      </p>
      <p className="product-stock">
        📦 Estoc: {product?.estoc !== undefined ? product.estoc : "N/A"}
      </p>
      <p className={`product-status ${product?.actiu ? "active" : "inactive"}`}>
        {product?.actiu ? "Actiu" : "Inactiu"}
      </p>
      <button className="add-button">Afegir</button>
    </div>
  );
}
