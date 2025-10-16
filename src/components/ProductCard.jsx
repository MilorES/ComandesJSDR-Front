import "../styles/productCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.Nom}</h3>
      <p className="product-description">{product.Descripcio}</p>
      <p className="product-price">💰 {product.Preu.toFixed(2)} €</p>
      <p className="product-stock">📦 Estoc: {product.Estoc}</p>
      <p className={`product-status ${product.Actiu ? "active" : "inactive"}`}>
        {product.Actiu ? "Actiu" : "Inactiu"}
      </p>
      <button className="add-button">Afegir</button>
    </div>
  );
}
