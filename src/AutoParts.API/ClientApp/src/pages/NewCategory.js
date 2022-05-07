import { useState } from "react"
import { Button, Spinner } from "react-bootstrap";
import categoryService from "../services/category.service";
import "../css/NewCategory.css";
import { OperationResultModal } from "../components/OperationResultModal";
import { useNavigate } from "react-router-dom";

export function NewCategory() {

  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [showOperationResult, setShowOperationResult] = useState(false);

  function onImageUpload(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      setCategory({ ...category, image: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  function uploadCategory() {
    setLoading(true);

    categoryService.create(category).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      if (result.ok) {
        document.getElementById("success").style.display = "block";
        document.getElementById("op-result-message").innerText = "Успешно!";
      }
      else {
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      }

      setTimeout(() => {
        setShowOperationResult(false);

        if (result.ok)
          navigate("/admin/categories");
      }, 1500);
    })
  }

  return !loading ? (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="d-flex flex-column align-items-center">
            <img
              src={category.image}
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
            value={category.name}
            onChange={e => setCategory({ ...category, name: e.target.value })}
          />
          <div className="d-grid mt-2">
            <Button
              onClick={uploadCategory}
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