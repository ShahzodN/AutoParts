import { DefaultButton } from "@fluentui/react"
import { Link } from "react-router-dom"
import { ProductFilters } from "../components/ProductFilters"

export function Products() {


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
        <aside className="col-2">
          <ProductFilters />
        </aside>
      </div>
    </div >
  )
}