import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import consignmentService from "../services/consignment.service";
import $ from 'jquery';
import { Modal, Spinner } from "react-bootstrap";
import { BsCheckCircle } from 'react-icons/bs';

export function Consignment(props) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [consignment, setConsignment] = useState({ date: '', products: [] });
  let navigate = useNavigate();

  useEffect(() => {
    consignmentService.getById(params.id).then(res => {
      setConsignment(res);
      setLoading(false);
    });

    $('.consignments').toggle();

    return () => {
      $('.consignments').toggle();
    }
  }, [params.id])

  function onChange(e) {
    const id = parseInt(e.target.attributes['data-id'].value);

    const index = consignment.products.findIndex(p => p.productId === id);

    let updatingConsignment = Object.assign({}, consignment);
    updatingConsignment.products[index].quantity = parseInt(e.target.value);
    setConsignment(updatingConsignment);
  }

  function edit(e) {
    if (e.target.textContent === 'Отмена') {
      window.location.reload();
    }

    $('.cq').prop('disabled', !$('.cq').prop('disabled'));
    e.target.textContent = e.target.textContent === 'Редактировать' ? 'Отмена' : 'Редактировать';
    $('#submitUpdate').prop('hidden', !$('#submitUpdate').prop('hidden'));
  }

  function sendConsignment() {
    setLoading(true);

    let obj = {};
    let copy = { ...consignment };
    consignment.products.forEach(v => { obj[v.productId] = v.quantity });
    copy.productsList = obj;
    delete copy.products;
    copy.date = copy.date.split('-').reverse().join('-');

    consignmentService.update(copy)
      .then(res => {
        if (res.ok) {
          $('.spinner-border').hide();
          $('.done').show();

          setInterval(() => {
            setLoading(false);
            navigate(`/admin/delivery-of-goods/${params.id}`);
          }, 1500);
        }
      })
  }

  return !loading ? (
    <div className="container mt-1">
      <Link className="btn btn-primary" to="/admin/delivery-of-goods">Назад</Link>
      <button className="btn btn-primary mx-2" onClick={edit}>Редактировать</button>
      <button className="btn btn-primary" id="submitUpdate" onClick={sendConsignment} hidden>Сохранить</button>
      <h2>{consignment.date}</h2>
      <table className="table">Поставка товаров
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование товара</th>
            <th scope="col">Количество</th>
          </tr>
        </thead>
        <tbody>
          {consignment.products.map((v, i) => {
            return (
              <tr key={v.productId}>
                <th scope="row">{i + 1}</th>
                <td>{v.product}</td>
                <td>
                  <input type="text"
                    className="cq"
                    value={v.quantity}
                    onChange={onChange}
                    data-id={`${v.productId}`}
                    disabled />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  ) :
    <div className="container d-flex justify-content-center align-items-center">
      <Modal
        show={loading}
        backdrop="static"
        centered
        className="modal-90w">
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner animation="border" size="large" />
          <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
        </Modal.Body>
      </Modal>
    </div>
}