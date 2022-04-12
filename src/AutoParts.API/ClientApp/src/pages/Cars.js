import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { ManufactorCard } from "../components/ManufactorCard.js";
import { ManufactorCreateModal } from "../components/ManufactorCreateModal.js";
import carService from "../services/car.service.js";
import $ from "jquery";
import "../css/Cars.css";

export function Cars() {

  const [loading, setLoading] = useState(true);
  const [manufactors, setManufactors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  useEffect(() => {
    carService.getAllManufactors().then(r => {
      setManufactors(r);
      setLoading(false);
    });
  }, []);

  const deleteManufactor = (e) => {
    setLoading(!loading);

    carService.deleteManufactor(selectedCardId).then(res => {
      if (res.ok) {
        e.target.parentElement.style.display = 'none';

        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }

  return !loading ? (
    <div className="m-2">
      <div id="context-menu" className="border shadow-lg">
        <span className="p-2" onClick={(e) => deleteManufactor(e)}>Удалить</span>
      </div>
      <Button
        onClick={() => setShowModal(!showModal)}
      >
        Создать
      </Button>

      <ManufactorCreateModal
        show={showModal}
        handleShow={() => setShowModal(!showModal)}
      />

      <div className="container">
        <div className="d-flex flex-wrap">
          {manufactors.map((m, i) => {
            return <ManufactorCard
              key={i}
              manufactor={m}
              selectedCard={setSelectedCardId}
            />
          })}
        </div>
      </div>

    </div >
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