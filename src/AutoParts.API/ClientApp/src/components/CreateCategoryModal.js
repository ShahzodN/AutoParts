import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import $ from 'jquery';
import emptyImage from "../assets/emptyImage.webp";
import categoryService from "../services/category.service";

export function CreateCategoryModal(props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  let base64Image = '';

  const onImageUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      base64Image = e.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const onFormSubmit = (data) => {
    setLoading(!loading);

    data.image = base64Image;

    categoryService.create(data).then(res => {
      if (res.ok) {
        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          props.onHide();
          window.location.reload();
        }, 1500);
      }
    })
  }

  return !loading ? (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form
            id="createCategory"
            onSubmit={handleSubmit(onFormSubmit)}
            className="d-flex flex-column align-items-center"
          >
            <div
              onClick={() => $("input[type=file]").trigger('click')}
              style={{ width: '200px', height: '200px', marginBottom: '10px' }}
            >
              <img
                src={emptyImage}
                alt="categoryImage"
                id="prev"
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
          <Button type="submit" form="createCategory">Создать</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <Modal
      show={loading}
      backdrop="static"
      centered
      className="modal-90w">
      <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spinner animation="border" size="large" />
        <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
      </Modal.Body>
    </Modal>
  )
}