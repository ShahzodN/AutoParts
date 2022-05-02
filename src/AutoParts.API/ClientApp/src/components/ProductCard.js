import "../css/ProductCard.css";

export function ProductCard({ product }) {

  const imageSrc = `${window.location.protocol}//${window.location.hostname}:5000/images`;

  return (
    <div className="d-flex flex-column product-card p-2">
      <img
        src={`${imageSrc}/Product/${product.id}/${product.image}`}
        alt="productImage"
        className="p-card-img"
      />
      <div className="d-flex flex-column mt-2">
        <span className="p-price">{product.price} ₽</span>
        <span className="p-name">{product.name}</span>
      </div>
    </div>
  )
}