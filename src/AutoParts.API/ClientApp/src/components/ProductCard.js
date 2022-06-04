import "../css/ProductCard.css";
import noPhoto from "../assets/no-photo.png";

export function ProductCard({ product }) {

  const imageSrc = `http://localhost:5000/images`;

  return (
    <div className="d-flex flex-column product-card p-2">
      <img
        src={product.image ? `${imageSrc}/Product/${product.id}/${product.image}` : noPhoto}
        alt="productImage"
        className="p-card-img"
      />
      <div className="d-flex flex-column mt-2">
        <span className="p-price">{product.price} ₽</span>
        <span className="p-name">{product.name}</span>
        <span className="p-balance">В наличии: {product.quantity}</span>
        <span className="p-category">Категория: {product.category}</span>
      </div>
    </div>
  )
}