import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import carService from "../services/car.service";
import $ from "jquery";
import { useState } from "react";
import emptyImage from "../assets/emptyImage.webp";

export function ManufactorCreateModal(props) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  let base64Image = '';

  const onSubmitForm = (data) => {
    data.image = base64Image;
    if (base64Image === '') {
      setLoading(false);
    }
    else {
      setLoading(true);

      carService.createManufactor(data).then(res => {
        if (res.ok) {
          $('.spinner-border').hide();
          $('.done').show();

          setInterval(() => {
            props.handleShow();
            window.location.reload();
          }, 1500);
        }
      })
    }
  }

  const onImageUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      base64Image = e.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  return !loading ? (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleShow}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="d-flex flex-column align-items-center"
            id="manufactorCreate"
          >
            <div
              onClick={() => $("input[type=file]").trigger('click')}
              style={{ width: '200px', height: '200px', marginBottom: '10px' }}
            >
              <img
                src={emptyImage}
                alt="categoryImage"
                id="prev"
                style={{ width: '100%', height: '100%' }}
              />
              <input
                hidden
                type="file"
                {...register('image')}
                onChange={onImageUpload}
              />
            </div>
            <input
              placeholder="Название"
              {...register('name')}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="manufactorCreate">Сохранить</Button>
        </Modal.Footer>
      </Modal>
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
        </Modal.Body >
      </Modal>
    </div>
  )
}