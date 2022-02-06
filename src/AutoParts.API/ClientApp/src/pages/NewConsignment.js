import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsCheckCircle, BsXLg } from 'react-icons/bs';
import productService from '../services/product.service';
import consignmentService from '../services/consignment.service';
import { Button, Modal, Spinner } from 'react-bootstrap';
import $ from 'jquery';
import '../css/NewConsignment.css';


export function NewConsignment() {
  const [products, setProducts] = useState([]);
  const [productsInTable, setProductsInTable] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [prodList, setProdList] = useState({ date: '', productsList: {} });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    $('.consignments').toggle();
    productService.getAll().then(res => setProducts(res));

    return (() => {
      $('.consignments').toggle();
    })
  }, [])

  let navigate = useNavigate();

  function searchProduct(value) {
    setInputValue(inputValue);
    if (value.length === 0) {
      $('.suggestions').toggle();
      setSuggestion([]);
      return;
    }
    $('.suggestions').show();
    const res = products.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
    setSuggestion(res);
  }

  function selectSuggestion(e) {
    $('#productInput').val(e.target.innerHTML).attr('data-id', e.target.attributes['data-id'].value)
    setSuggestion([]);
  }

  function addProduct(e) {
    if ($('#productInput').val() === '' || $('#quantity').val() === '') return;

    const id = $('#productInput').attr('data-id');

    let copy = { ...prodList };
    copy.productsList[id] = $('#quantity').val();
    setProdList(copy);

    productsInTable.push({
      id: id,
      name: $('#productInput').val(),
      quantity: $('#quantity').val()
    });

    setProductsInTable(productsInTable);

    $('#productInput').val('');
    $('#quantity').val('');
  }

  function onDateChange(e) {
    let copy = { ...prodList };
    copy.date = e.target.value;
    setProdList(copy);
  }

  function deleteProduct(e) {
    const id = parseInt(e.target.attributes['data-id'].value);

    const productsInTableCopy = productsInTable.filter(s => s.id !== id);
    setProductsInTable(productsInTableCopy);

    delete prodList.productsList[id];

    setProdList(prodList);
  }

  function sendConsignment(e) {
    setUploading(true);

    consignmentService.create(prodList)
      .then(res => {
        if (res.ok) {
          $('.spinner-border').hide();
          $('.done').show();

          setInterval(() => {
            setUploading(false);
            navigate('/admin/delivery-of-goods');
          }, 1500);
        }
      });
  }


  return !uploading ? (
    <div>
      <div className="py-1">
        <Link to="/admin/delivery-of-goods" className="btn btn-primary"><BsArrowLeft color="white" fontSize="1.2em" /></Link>
        <Button className="mx-1" onClick={sendConsignment}>Готово</Button>
        <input type="date" id="conDate" onChange={onDateChange} />
      </div>
      <div className="d-flex">
        <input type="text"
          onChange={e => searchProduct(e.target.value)}
          id="productInput"
          onBlur={() => {
            setTimeout(() => setSuggestion([]), 100)
          }}
          placeholder="Товар"
          required={true}
          className="mx-0" />
        <input type="text"
          placeholder="Количество"
          id="quantity"
          className="mx-1"
          required />
        <Button onClick={e => addProduct(e.target)}>Добавить</Button>
      </div>
      <div className="suggestions">
        <ul className="list-group">
          {suggestion.map((v, i) => {
            return <li className="list-group-item" key={i} data-id={v.id} onClick={selectSuggestion}>{v.name}</li>
          })}
        </ul>
      </div>
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
                <td>{v.name}</td>
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
    </div >
  ) : (
    <div>
      <Modal
        show={uploading}
        backdrop="static"
        centered
        className="modal-90w">
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner animation="border" size="large" />
          <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}