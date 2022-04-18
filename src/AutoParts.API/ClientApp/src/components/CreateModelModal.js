import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import $ from "jquery";
import modelService from "../services/model.service";

export function CreateModelModal(props) {

  const params = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [bodyTypes, setBodyTypes] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    modelService.getBodyTypes().then(res => {
      setBodyTypes(res);
    })
  }, [params]);

  const onFormSubmit = (data) => {

    data.manufactor = params.manufName;

    if (data.bodyType === 'empty') {
      setShowAlert(true);
      $('#errMsg').text('Выберите тип кузова!');
      setTimeout(() => setShowAlert(false), 2000);
    }
    modelService.create(data).then(res => {
      if (res.ok) {
        window.location.reload();
      }
      else {
        setShowAlert(true);
        $('#errMsg').text('Ошибка! Попробуйте позже');
        setTimeout(() => setShowAlert(false), 2000);
      }
    });
  }

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="d-flex flex-column"
              id="createCar"
            >
              <div className="form-floating mb-1">
                <input
                  {...register("model")}
                  id="carModel"
                  placeholder="Модель"
                  className="form-control"
                  required
                />
                <label htmlFor="carModel">Модель</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  {...register("yearOfIssue")}
                  id="yearOfIssue"
                  placeholder="Год выпуска"
                  className="form-control"
                  required
                />
                <label htmlFor="yearOfIssue">Год выпуска</label>
              </div>
              <div className="mb-1">
                <select
                  className="form-select"
                  {...register("bodyType")}
                >
                  <option value="empty" defaultValue={true}>Тип кузова</option>
                  {bodyTypes.map((b, i) => {
                    return <option value={b} key={i}>{b}</option>
                  })}
                </select>
              </div>
            </form>
            <Alert
              variant="danger"
              show={showAlert}
              onClose={() => setShowAlert(!showAlert)}
            >
              <span id="errMsg"></span>
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="createCar">Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}