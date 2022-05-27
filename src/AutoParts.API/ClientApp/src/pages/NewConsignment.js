import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BsXLg } from 'react-icons/bs';
import productService from '../services/product.service';
import consignmentService from '../services/consignment.service';
import { Button, Spinner } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import AsyncSelect from "react-select/async";
import '../css/NewConsignment.css';
registerLocale("ru", ru);


export function NewConsignment() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productsInTable, setProductsInTable] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [prodList, setProdList] = useState({ date: new Date(), productsList: {} });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  function addProduct() {
    if (!selectedProduct.value || quantity === 0) return;

    let productsListCopy = { ...prodList.productsList };
    productsListCopy[selectedProduct.value] = quantity;
    setProdList({ ...prodList, productsList: productsListCopy });

    let newRecord = {
      id: selectedProduct.value,
      name: selectedProduct.label,
      quantity: quantity
    };

    setProductsInTable([...productsInTable, newRecord]);

    setSelectedProduct(null);
    setQuantity("");
  }

  function deleteProduct(e) {
    const rowNumber = e.target.parentElement.parentElement.firstChild.innerText;
    const id = productsInTable[rowNumber - 1].id;
    delete prodList.productsList[id];
    setProdList(prodList);
    setProductsInTable(productsInTable.filter((v, i) => i !== rowNumber - 1));
  }

  function sendConsignment(e) {
    setLoading(true);

    consignmentService.create(prodList)
      .then(res => {
        setInterval(() => {
          setLoading(false);
          navigate('/delivery-of-goods');
        }, 1500);
      });
  }

  function loadProducts(value, callback) {
    productService.getSuggestions(value.trim()).then(result => callback(result.data.map(item => ({ value: item.id, label: item.name }))));
  }

  return !loading ? (
    <div className="container-fluid">
      <div className="row mt-lg-2 align-items-center">
        <div className="col-12 col-lg-2 col-xl-2">
          <DatePicker
            selected={prodList.date}
            locale="ru"
            onChange={(date) => setProdList({ ...prodList, date: date })}
            className="datepicker"
          />
        </div>
        <div className="col-12 col-lg-6 col-xl-8 mt-2 mt-lg-0">
          <AsyncSelect
            cacheOptions
            placeholder="Продукты"
            isSearchable
            value={selectedProduct}
            onChange={(newValue) => {
              setSelectedProduct(newValue);
              document.getElementById("quantity").focus();
            }}
            loadOptions={loadProducts}
          />
        </div>
        <div className="col-12 col-lg-2 col-xl-1 mt-2 mt-lg-0">
          <input
            placeholder="Количество"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            onKeyPress={e => {
              if (e.code === "Enter")
                addProduct();
            }}
          />
        </div>
        <div className="col-12 col-lg-2 col-xl-1 mt-2 mt-lg-0">
          <div className="d-grid d-lg-block">
            <Button onClick={e => addProduct(e.target)} variant="secondary">Добавить</Button>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-1 mt-2">
        <div className="d-grid d-lg-block">
          <Button variant="primary" onClick={sendConsignment}>Сохранить</Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table products my-1">
          <thead>
            <tr>
              <th>#</th>
              <th>Товар</th>
              <th>Количество</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsInTable.map((v, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td className="col-product-name">{v.name}</td>
                  <td>{v.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={deleteProduct} data-id={v.id}>
                      <BsXLg pointerEvents={'none'} />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div >
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}