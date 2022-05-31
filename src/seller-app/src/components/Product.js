export function Product({ product }) {
  const IMAGE_SRC = `${window.location.protocol}//localhost:5000/images/Product`;

  return (
    <div className="d-flex">
      <img
        src={`${IMAGE_SRC}/${product.id}/${product.image}`}
        alt="productImage"
        className="product-photo"
      />

      <span className="product-name">{product.name}</span>
      <span>{product.price}</span>
    </div>
  )
}