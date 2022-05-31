import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { ManufactorCard } from "../components/ManufactorCard.js";
import modelService from "../services/model.service.js";
import $ from "jquery";
import "../css/Models.css";
import { Link } from "react-router-dom";

export function Manufactors() {

  const [loading, setLoading] = useState(true);
  const [manufactors, setManufactors] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(0);

  useEffect(() => {
    modelService.getAllManufactors().then(result => {
      setManufactors(result.data);
      setLoading(false);
    });
  }, []);

  const deleteManufactor = (e) => {
    setLoading(!loading);

    modelService.deleteManufactor(selectedCardId).then(result => {
      e.target.parentElement.style.display = 'none';

      $('.spinner-border').hide();
      $('.done').show();

      setInterval(() => {
        window.location.reload();
      }, 1500);
    });
  }

  return !loading ? (
    <div className="container">
      <div id="context-menu" className="border shadow-lg">
        <span className="p-2" onClick={(e) => deleteManufactor(e)}>Удалить</span>
      </div>
      <Link
        to="/manufactors/new"
        className="btn btn-primary"
      >
        Создать производитель
      </Link>

      <div className="container">
        <div className="d-flex flex-wrap">
          {manufactors.map((m, i) => {
            return <Link
              to={`/manufactors/${m.name}`}
              key={i}
              className="me-3 mb-3"
            >
              <ManufactorCard
                manufactor={m}
                selectedCard={setSelectedCardId}
              />
            </Link>
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Modal
        show={loading}
        backdrop="static"
        centered
        className="modal-90w">
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner animation="border" size="large" />
          <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
        </Modal.Body >
      </Modal>
    </div >
  )
}