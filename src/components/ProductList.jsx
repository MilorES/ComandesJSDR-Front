import ProductCard from "./ProductCard";
import "../styles/productList.css";

export default function ProductList() {
  const products = [
    {
      Id: 1,
      Nom: "Ordinador portàtil",
      Descripcio: "Ordinador portàtil per oficina amb pantalla de 15.6 polzades",
      Preu: 899.99,
      Estoc: 10,
      Categoria: "Informàtica",
      Actiu: true,
    },
    {
      Id: 2,
      Nom: "Ratolí sense fils",
      Descripcio: "Ratolí òptic sense fils amb sensor de precisió",
      Preu: 25.5,
      Estoc: 50,
      Categoria: "Informàtica",
      Actiu: true,
    },
    {
      Id: 3,
      Nom: "Teclat mecànic",
      Descripcio: "Teclat mecànic retroil·luminat amb switches Cherry MX",
      Preu: 120.0,
      Estoc: 25,
      Categoria: "Informàtica",
      Actiu: true,
    },
    {
      Id: 4,
      Nom: "Cadira d'oficina",
      Descripcio: "Cadira ergonòmica amb suport lumbar ajustable",
      Preu: 149.99,
      Estoc: 8,
      Categoria: "Mobiliari",
      Actiu: false,
    },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.Id} product={product} />
      ))}
    </div>
  );
}
