import { DefaultButton } from "@fluentui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProductCard } from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters"
import productService from "../services/product.service";

export function Products() {

  const [data, setData] = useState({ manufactors: [], categories: [] });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getPreliminaryData().then(result => setData(result));
    productService.getAll().then(result => setProducts(result));
  }, [])

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row align-items-center p-1">
        <h2>Продукты</h2>
        <div style={{ height: 40, width: 1, backgroundColor: 'gray' }} className="ms-2"></div>
        <Link to="/admin/products/new" >
          <DefaultButton
            iconProps={{ iconName: 'add' }}
            text="Новый продукт"
            className="ms-2" />
        </Link>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 col-xl-3 col-xxl-2 mb-4 mb-lg-0">
          <ProductFilters
            data={data}
            setProducts={setProducts}
          />
        </div>
        <div className="col">
          <div className="d-flex flex-wrap gap-1">
            {products.map(p => {
              return (
                <Link
                  to={`/admin/products/${p.id}`}
                  className="product-link"
                  key={p.id}
                >
                  <ProductCard
                    product={p}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  )
}