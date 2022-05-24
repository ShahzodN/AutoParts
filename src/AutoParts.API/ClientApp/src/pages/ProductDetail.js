import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productService from "../services/product.service";
import Select from "react-select";
import { Image, ImageFit } from "@fluentui/react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { OperationResultModal } from "../components/OperationResultModal";
import modelService from "../services/model.service";
import bwipjs from "bwip-js";


export function ProductDetail() {

  const imageSrc = `${window.location.protocol}//${window.location.hostname}:5000/images`;

  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [data, setData] = useState({ categories: [], manufactors: [] });

  const [loading, setLoading] = useState(true);
  const [showOperationResultModal, setShowOperationResultModal] = useState(false);

  const [models, setModels] = useState([]);
  const [yearsOfIssue, setYearsOfIssue] = useState([]);

  const [modelsSelectValues, setModelsSelectValues] = useState([]);
  const [yearsSelectValues, setYearsSelectValues] = useState([]);

  useEffect(() => {
    productService.getProductById(params.id).then(res => {
      setProduct(res);

      setModelsSelectValues(res.models.map(model => ({ value: model.model, label: model.model })));

      setYearsSelectValues(...res.models.map(model => {
        return model.yearsOfIssue.map(y => ({ value: model.model + y, label: y, model: model.model }))
      }));

      setYearsOfIssue(res.models.map(model => ({
        label: model.model,
        options: model.yearsOfIssue.map(y => ({ value: model.model + y, label: y }))
      })));

      if (res.manufactorId)
        modelService.getModelsWithYearsOfIssue(res.manufactorId).then(r => setModels(r));

      setLoading(false);

      bwipjs.toCanvas("barcode", {
        bcid: "ean13",
        text: res.ean,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
        width: 30
      });
    });

    productService.getPreliminaryData().then(res => setData(res));
  }, [params.id]);

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setProduct({ ...product, image: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const onManufactorChange = (e) => {
    setModelsSelectValues(null);
    setYearsSelectValues([]);
    setYearsOfIssue([]);

    setProduct({ ...product, manufactorId: e.value, models: [] });
    modelService.getModelsWithYearsOfIssue(e.value).then(res => {
      setModels(res);
    });
  }

  const onModelsListChange = (e) => {
    //adding something
    if (modelsSelectValues === null || modelsSelectValues?.length < e.length) {
      setModelsSelectValues(e);
      let years = models.find(x => x.model === e[e.length - 1].label).yearsOfIssue;
      let options = {
        label: e[e.length - 1].label,
        options: years.map(y => ({ value: Math.random(), label: y.toString(), model: e[e.length - 1].label }))
      };

      setYearsOfIssue([...yearsOfIssue, options]);
    }
    //removing something
    else {
      let deletedModel = modelsSelectValues.filter(x => !e.includes(x))[0];

      setModelsSelectValues([...modelsSelectValues.filter(x => x !== deletedModel)]);
      setYearsOfIssue([...yearsOfIssue.filter(x => x.label !== deletedModel.label)]);
      setProduct({ ...product, models: product.models.filter(m => m.model !== deletedModel.label) })
      setYearsSelectValues([...yearsSelectValues.filter(x => x.model !== deletedModel.label)])
    }
  }

  const onYearsListChange = (e) => {
    let models = [...product.models];

    // adding something
    if (yearsSelectValues === null || yearsSelectValues?.length < e.length) {
      const newModel = e.filter(x => !yearsSelectValues.includes(x))[0];

      let model = models.find(x => x.model === newModel.model);

      // model exists
      if (model) {
        model.yearsOfIssue = [...model.yearsOfIssue, parseInt(newModel.label)];
      }
      // model doesn't exist
      else {
        model = {
          model: newModel.model,
          yearsOfIssue: [parseInt(newModel.label)]
        };
        models = [...models, model];

      }
      setProduct({ ...product, models: models });
    }
    // removing something
    else {
      let deletingModel = yearsSelectValues.filter(x => !e.includes(x))[0];

      let model = models.find(x => x.model === deletingModel.model);
      model.yearsOfIssue = [...model.yearsOfIssue.filter(x => x !== parseInt(deletingModel.label))];
      setProduct({ ...product, models: models });
    }
    setYearsSelectValues([...e]);
  }

  const uploadProduct = () => {
    setLoading(true);

    productService.update(product).then(res => {

      if (res.ok) {
        setLoading(false);
        setShowOperationResultModal(true);

        document.getElementById("success").style.display = "block";
        document.getElementById("op-result-message").innerText = "Успешно!";

        setTimeout(() => {
          setShowOperationResultModal(false);
          navigate("/admin/products");
        }, 1500)
      }
    });
  }

  const deleteProduct = () => {
    setLoading(true);
    setShowOperationResultModal(true);

    productService.delete(product.id).then(res => {
      if (res.ok) {
        setLoading(false);
        document.getElementById("success").style.display = "block";
        document.getElementById("op-result-message").innerText = "Успешно!";
      }
      else {
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      }

      setTimeout(() => {
        setShowOperationResultModal(false);
        setLoading(false);

        if (res.ok)
          navigate("/admin/products");
      }, 1200);
    })
  }

  const getDefaultManufactor = () => {
    const manufactor = data.manufactors.find(x => x.id === product.manufactorId);
    if (manufactor)
      return { value: manufactor.id, label: manufactor.name };

    return [];
  }

  return !loading ? (
    <div className="container-fluid p-xxl-5 mt-2">
      <div className="row mb-4">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="d-flex flex-column align-items-center">
            <div className="border p-1">
              <Image
                imageFit={ImageFit.centerCover}
                width={200}
                height={200}
                src={product.image.length < 50 ? `${imageSrc}/Product/${product.id}/${product.image}` : product.image}
                alt="productImage"
              />
            </div>
            <input type="file" hidden id="productImage" onChange={(e) => onFileUpload(e)} />
            <div className="d-flex">
              <Button
                variant="outline-dark"
                onClick={() => document.getElementById("productImage").click()}
                className="mt-2"
              >
                Выбрать фото
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="row align-items-end">
            <div className="col-md-12 col-lg-4">
              <label htmlFor="productName">Название</label>
              <input
                className="form-control"
                id="productName"
                defaultValue={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-4 mt-2">
              <label htmlFor="productName">Цена</label>
              <input
                className="form-control"
                id="productPrice"
                defaultValue={product.price}
                onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
              />
            </div>
            <div className="col-md-12 col-lg-4 mt-2">
              <Select
                options={data.categories.map(x => ({ value: x.id, label: x.name }))}
                defaultValue={{ value: product.categoryId, label: product.categoryName }}
                onChange={(newValue) => setProduct({ ...product, categoryId: newValue.value })}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="isEnabled"
                  defaultChecked={product.isEnabled}
                  onChange={(e) => setProduct({ ...product, isEnabled: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="isEnabled">Видно пользователям</label>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <textarea
                defaultValue={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Описание товара"
                className="form-control"
              >
              </textarea>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col justify-content-center">
              <canvas id="barcode"></canvas>
            </div>
          </div>
        </div>
      </div>
      <h2>Совместимость</h2>
      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="forAllManufactors"
              defaultChecked={product.forAllManufactors}
              onChange={(e) => setProduct({ ...product, forAllManufactors: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="forAllManufactors">Совместим со всеми производителями</label>
          </div>
        </div>
        <div className="col-md-12 col-lg-4 mt-2 mt-lg-0">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="forAllModels"
              onChange={(e) => setProduct({ ...product, forAllModels: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="forAllModels">Совместим со всеми моделями</label>
          </div>
        </div>
      </div>
      <div className="row align-items-end">
        <div className="col-12 col-md-4 mt-2">
          <Select
            placeholder="Производители"
            options={data.manufactors.map(x => ({ value: x.id, label: x.name }))}
            onChange={(e) => onManufactorChange(e)}
            value={getDefaultManufactor()}
            isDisabled={product.forAllManufactors}
          />
        </div>
        <div className="col-12 col-md-4 mt-2">
          <Select
            placeholder="Модели"
            options={models.map(m => ({ value: m.model, label: m.model }))}
            isMulti
            onChange={(e) => onModelsListChange(e)}
            value={modelsSelectValues}
            closeMenuOnSelect={false}
            isDisabled={product.forAllModels || product.forAllManufactors}
          />
        </div>
        <div className="col-12 col-md-4 mt-2">
          <Select
            placeholder="Год выпуска"
            options={yearsOfIssue}
            isMulti
            onChange={(e) => onYearsListChange(e)}
            value={yearsSelectValues}
            closeMenuOnSelect={false}
            isDisabled={product.forAllModels || product.forAllManufactors}
          />
        </div>
      </div>
      <div className="d-flex flex-column d-md-block my-2">
        <Button
          onClick={(e) => uploadProduct()}
          className="me-md-2"
        >
          Сохранить
        </Button>
        <Button
          onClick={(e) => deleteProduct()}
          className="mt-2 mt-md-0"
        >
          Удалить
        </Button>
      </div>

      <OperationResultModal
        show={showOperationResultModal}
      />
    </div >
  ) : (
    <Modal
      show={loading}
      backdrop="static"
      centered
      className="modal-90w"
    >
      <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spinner
          animation="border"
          role="status"
        />
      </Modal.Body>
    </Modal>
  )
}