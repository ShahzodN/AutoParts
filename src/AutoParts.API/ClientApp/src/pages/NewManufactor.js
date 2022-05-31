import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OperationResultModal } from "../components/OperationResultModal";
import modelService from "../services/model.service";

export function NewManufactor() {

  const navigate = useNavigate();
  const [manufactor, setManufactor] = useState();
  const [loading, setLoading] = useState(false);
  const [showOperationResult, setShowOperationResult] = useState(false);

  function onImageUpload(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      setManufactor({ ...manufactor, image: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  function uploadManufactor() {
    setLoading(true);

    modelService.createManufactor(manufactor).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";

      document.getElementById("op-result-message").innerText = "Успешно!";
      setTimeout(() => {
        setShowOperationResult(false);

        navigate("/manufactors");
      }, 1500);
    })
      .catch(error => {
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      });
  }

  return !loading ? (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="d-flex flex-column align-items-center">
            <img
              src={manufactor?.image}
              alt=""
              id="prev"
              className="category-photo"
            />
            <input
              hidden
              type="file"
              id="categoryImageUploader"
              onChange={onImageUpload}
            />
          </div>
          <div className="d-grid mt-2">
            <Button
              variant="outline-dark"
              onClick={() => document.getElementById("categoryImageUploader").click()}
            >
              Выбрать фото
            </Button>
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <input
            placeholder="Название"
            className="form-control mt-2"
            onChange={e => setManufactor({ ...manufactor, name: e.target.value })}
          />
          <div className="d-grid mt-2">
            <Button
              onClick={uploadManufactor}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
      <OperationResultModal
        show={showOperationResult}
      />
    </div>
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}