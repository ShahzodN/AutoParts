import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import modelService from "../services/model.service";
import { Button, Modal, Spinner } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { ModelCard } from "../components/ModelCard";
import { CreateModelModal } from "../components/CreateModelModal";

export function Models() {

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    modelService.getAll(params.manufName).then(result => {
      setModels(result.data);
      setLoading(false);
    });
  }, [params, loading]);

  return !loading ? (
    <div className="container">
      <h1>{params.manufName}</h1>
      <div className="d-flex flex-row">
        <Button
          onClick={() => setShowModal(!showModal)}
          className="me-1"
        >
          Создать модель
        </Button>
      </div>
      <CreateModelModal
        show={showModal}
        handleShow={() => setShowModal(!showModal)}
      />
      <div className="d-flex">
        {models.map((m, i) => {
          return <ModelCard
            model={m}
            key={i}
          />
        })}
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