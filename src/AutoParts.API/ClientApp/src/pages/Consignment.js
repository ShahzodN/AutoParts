import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import consignmentService from "../services/consignment.service";
import $ from 'jquery';
import { Spinner } from "react-bootstrap";

export function Consignment() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [consignment, setConsignment] = useState({ date: '', products: [] });
  let navigate = useNavigate();

  useEffect(() => {
    consignmentService.getById(params.id).then(res => {
      setConsignment(res);
      setLoading(false);
    });
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
    <div className="container-fluid">
      <h2>{consignment.date}</h2>
      <div className="row">
        <div className="col-12 col-lg-2 mt-1">
          <div className="d-grid d-lg-block">
            <button className="btn btn-secondary" onClick={edit}>Редактировать</button>
          </div>
        </div>
        <div className="col-12 col-lg-2 mt-2">
          <div className="d-grid d-lg-block">
            <button className="btn btn-primary" id="submitUpdate" onClick={sendConsignment} hidden>Сохранить</button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-sm align-middle">
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
                  <td style={{ maxWidth: "4rem" }}>
                    <input type="text"
                      className="cq form-control"
                      value={v.quantity}
                      onChange={onChange}
                      data-id={`${v.productId}`}
                      disabled
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) :
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
}