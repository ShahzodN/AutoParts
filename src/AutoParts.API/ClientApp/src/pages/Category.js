import { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { OperationResultModal } from "../components/OperationResultModal";
import categoryService from "../services/category.service";
import noPhoto from "../assets/no-photo.png";

export function Category() {

  const IMAGE_SRC = `http://localhost:5000/images`;

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showOperationResult, setShowOperationResult] = useState();
  const [category, setCategory] = useState({});

  useEffect(() => {
    categoryService.getById(params.id).then(result => {
      setCategory(result.data);
      setLoading(false);
    })
  }, [params.id]);

  function uploadCategory() {
    setLoading(true);
    delete category.productsCount;

    categoryService.update(category).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => {
        setShowOperationResult(false);
        if (result.ok)
          navigate("/categories");
      }, 1500);
    })
      .catch(error => {
        showOperationResult(true);
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      });
  }

  function onImageUpoad(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      setCategory({ ...category, image: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  function deleteCategory() {
    categoryService.remove(category.id).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => {
        setShowOperationResult(false);
        navigate("/categories");
      }, 1200);
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
              src={category.image ? (category.image.length < 50 ? `${IMAGE_SRC}/Category/${category.id}/${category.image}` : category.image) : noPhoto}
              alt=""
              id="prev"
              className="category-photo"
            />
            <input
              hidden
              type="file"
              id="categoryImageUploader"
              onChange={onImageUpoad}
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
          <label htmlFor="categoryName" className="form-label mt-2 mt-lg-0">Название</label>
          <input
            placeholder="Название"
            className="form-control"
            id="categoryName"
            value={category.name}
            onChange={e => setCategory({ ...category, name: e.target.value })}
          />
          <div className="d-grid mt-2">
            <Button
              onClick={uploadCategory}
            >
              Сохранить
            </Button>
            <Button
              onClick={deleteCategory}
              className="mt-2"
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
      <OperationResultModal
        show={showOperationResult}
      />
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}