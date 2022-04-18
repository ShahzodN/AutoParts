import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import $ from "jquery";
import modelService from "../services/model.service";

export function ModelCard(props) {

  const [bodies, setBodies] = useState([]);
  const [currentModelId, setCurrentModelId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBodies(props.model.specificModels[0].bodies);
    setCurrentModelId(props.model.specificModels[0].bodies[0].id);
  }, [props.model.specificModels]);

  const onYearChanged = (e) => {
    const sm = props.model.specificModels.find(s => s.yearOfIssue === parseInt(e.target.value));

    setBodies(sm.bodies);
    setCurrentModelId(sm.bodies[0].id);
  }

  const onBodyChange = (e) => {
    setCurrentModelId(e.target.options[e.target.options.selectedIndex].value);
  }

  const deleteSpecificModel = () => {
    setLoading(true);
    modelService.removeSpecificModel(currentModelId).then(res => {
      if (res.ok) {
        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }

  const deleteAllModels = () => {
    setLoading(true);

    modelService.removeAllModels(props.model.modelName).then(res => {
      if (res.ok) {
        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }

  return !loading ? (
    <div className="p-3" style={{ minWidth: '300px' }}>
      <div className="p-2 shadow">
        <div>
          <h3 className="model-card-title fs-4 text-center">
            {props.model.modelName}
          </h3>
        </div>
        <div className="mb-2">
          <span>Год выпуска:</span>
          <select
            onChange={(e) => onYearChanged(e)}
            className="form-select"
          >
            {props.model.specificModels.map((sm, i) => {
              return <option key={i}>{sm.yearOfIssue}</option>
            })}
          </select>
        </div>
        <div className="mb-2">
          <span>Тип кузова:</span>
          <select
            id="model-card-bodyTypes"
            className="form-select"
            onChange={e => onBodyChange(e)}
          >
            {bodies.map((b, i) => {
              return <option key={i} value={b.id}>{b.type}</option>
            })}
          </select>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <Button
            onClick={deleteSpecificModel}
          >
            Удалить
          </Button>
          <Button
            onClick={deleteAllModels}
          >
            Удалить все
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Modal
        show={loading}
        backdrop="static"
        centered
        className="modal-90w"
      >
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner animation="border" size="large" />
          <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}