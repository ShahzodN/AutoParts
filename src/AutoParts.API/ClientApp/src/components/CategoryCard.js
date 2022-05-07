import "../css/NewCategory.css";

export function CategoryCard({ category }) {

  function productsCount() {
    let str = `${category.productsCount} `;
    if (category.productsCount === 1)
      str += "товар";
    else if (category.productsCount > 1 && category.productsCount < 5)
      str += "товара";
    else
      str += "товаров";
    return str;
  }

  const IMAGE_SRC = `${window.location.protocol}//${window.location.hostname}:5000/images`;
  return (
    <div className="category-card p-2">
      <div>
        <img
          src={`${IMAGE_SRC}/Category/${category.id}/${category.image}`}
          alt="categoryImage"
          className="category-photo"
          style={{ width: '100%' }}
        />
      </div>
      <h6 className="category-name mt-2">{category.name}</h6>
      <span className="products-count">{productsCount()}</span>
    </div>
  )
}