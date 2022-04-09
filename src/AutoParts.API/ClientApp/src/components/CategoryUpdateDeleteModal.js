import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import categoryService from "../services/category.service";
import $ from 'jquery';
import { BsCheckCircle } from "react-icons/bs";

export function CategoryUpdateDeleteModal(props) {

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  let base64Image = '';
  const contentUrl = 'api/content/category';

  const deleteCategory = () => {
    setLoading(!loading);

    categoryService.remove(props.category.id).then(res => {
      if (res.ok) {
        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          props.handleShow();
          window.location.reload();
        }, 1500);
      }
    });
  }

  const onFormSubmit = (data) => {
    setLoading(true);

    data.id = props.category.id;
    data.image = base64Image;
    categoryService.update(data).then(res => {
      if (res.ok) {
        $('.spinner-border').hide();
        $('.done').show();

        setInterval(() => {
          props.handleShow();
          window.location.reload();
        }, 1500);
      }
    });
  }

  const onImageUploaded = (e) => {
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
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            id='categoryUpdate'
            className="d-flex flex-column align-items-center"
          >
            <div
              style={{ width: '200px' }}
              onClick={(e) => { $('#categoryImage').trigger('click') }}
            >
              <img
                src={`${contentUrl}/${props.category.id}`}
                alt="categoryImage"
                style={{ width: '100%' }}
                id="prev"
                className="mb-3"
              />
              <input
                hidden
                type="file"
                {...register('image')}
                id="categoryImage"
                onChange={onImageUploaded}
              />
            </div>
            <input
              required
              placeholder="Название"
              defaultValue={props.category.name}
              {...register('name')}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => deleteCategory(e)}>Удалить</Button>
          <Button type="submit" form="categoryUpdate">Сохранить</Button>
        </Modal.Footer>
      </Modal>
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
        </Modal.Body>
      </Modal>
    </div>
  )
}