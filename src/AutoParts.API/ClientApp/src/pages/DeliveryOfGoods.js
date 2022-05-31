import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import consignmentService from "../services/consignment.service";
import { Button, Spinner } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

export function DeliveryOfGoods() {

  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    consignmentService.getAll().then(result => {
      setConsignments(result.data);
      setLoading(true);
    });
  }, [])

  function deleteConsignment(e) {
    const id = parseInt(e.target.attributes['data-id'].value);

    consignmentService.remove(id).then(response => {
      if (response) {
        let copy = consignments.filter(s => s.id !== id);
        setConsignments(copy);
      }
    });
  }

  return loading ? (
    <div className="container-fluid">
      <div className="consignments">
        <h3>Поставка товаров</h3>
        <div className="row">
          <div className="col-12">
            <div className="d-grid d-lg-block">
              <Link to="/delivery-of-goods/new" className="btn btn-primary">Новая поставка</Link>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-sm align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Дата</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {consignments.map((v, i) => {
                return (
                  <tr key={v.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{v.date}</td>
                    <td><Link to={`/delivery-of-goods/${v.id}`}>Подробнее</Link></td>
                    <td>
                      <Button onClick={deleteConsignment} data-id={v.id}>
                        <BsXLg pointerEvents={'none'} />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <div className="container-fluid d-flex justify-content-center">
    <Spinner animation="border"></Spinner>
  </div>
}