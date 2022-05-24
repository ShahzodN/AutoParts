import { React, useState } from "react";
import { Product } from "../components/Product";
import "../css/Sale.css";
import saleService from "../services/saleService.service";

export function Sale() {
  const IMAGE_SRC = `${window.location.protocol}//localhost:5000/images/Product`;

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  function onScanner(value) {
    if (value.length) {
      saleService.getProduct(value).then(response => response.json())
        .then(json => {
          let index = products.findIndex(x => x.product.id === json.id);

          if (index !== -1) {
            products[index].quantity += 1;
            setProducts([...products]);
          }
          else
            setProducts([...products, { product: json, quantity: 1 }])
        });
    }
  }

  return (
    <div className="d-flex wrapper">
      <div className="p-3 history">
        <h2>История продаж</h2>
        <p>asdasd</p>
      </div>
      <div className="p-3 products">
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              onChange={e => onScanner(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          <table className="table">
            <thead>
              <th>Фото</th>
              <th className="px-2">Продукт</th>
              <th>Количество</th>
              <th>Цена</th>
            </thead>
            <tbody>
              {products.map(p => {
                return (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={`${IMAGE_SRC}/${p.product.id}/${p.product.image}`}
                        alt="productImage"
                        className="product-photo"
                      />
                    </td>
                    <td style={{ wordWrap: "break-word" }}>{p.product.name}</td>
                    <td>{p.quantity}</td>
                    <td>{p.product.price}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <td>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>Сумма: {products.map(p => (p.quantity * p.product.price))}</tr>
              </td>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}