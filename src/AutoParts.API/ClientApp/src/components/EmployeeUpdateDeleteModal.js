import { CloseButton, Modal, Button, Spinner } from "react-bootstrap";
import { BsCheckCircle } from 'react-icons/bs';
import { useForm } from "react-hook-form";
import employeeService from "../services/employee.service";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import $ from "jquery";
import { useState } from "react";

export function EmployeeUpdateDeleteModal(props) {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  let base64Image = "";
  const contentUrl = 'api/content/employee';

  function validate(data) {
    let finalResult = 1;
    if (data.firstName === "" || data.firstName.length > 30)
      finalResult = 0;
    else if (data.lastName === "" || data.firstName.length > 30)
      finalResult = 0;
    else if (data.salary < 0)
      finalResult = 0;
    return finalResult;
  }

  const onEmployeeSubmit = (data) => {
    data.id = props.id;

    if (validate(data) === 1) {
      data.picture = base64Image;

      employeeService.update(data)
        .then(res => {
          console.log(res.status);
          props.handleShowHide();
        });
    }
  }

  const onAccountSubmit = data => {
    data.employeeId = props.id;

    if (validate(data) === 1) {
      data.picture = base64Image;

      employeeService.createAccount(data)
        .then(res => {
          if (res.ok)
            props.handleShowHide();
        });
    }
  }

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      base64Image = e.target.result;
      console.log(base64Image);
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const onIconClick = (e) => {
    $("input[name='fileUploadBtn']").trigger('click');
  }

  const deleteEmployee = () => {
    setLoading(true);

    employeeService.deleteEmployee(props.id)
      .then(res => {
        if (res.ok) {
          $('.spinner-border').hide();
          $('.done').show();

          setInterval(() => {
            props.handleShowHide();
          }, 1500);
          window.location.reload();
        }
      });

  }

  const toggleForms = (e) => {
    $('.eud-wrapper').toggle();
    $('.cae-wrapper').toggle();
    $('.empUpdate-btns').toggle();
    $('.empCreateAccount-btns').toggle();
  }

  return !loading ? (
    <Modal show={props.show}
      onHide={props.handleShowHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered>

      <ModalHeader>
        <CloseButton onClick={props.handleShowHide} />
      </ModalHeader>

      <Modal.Body>
        <div>
          <div className="eud-wrapper hide">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSubmit(onEmployeeSubmit)} className="d-flex flex-column align-items-center" id="empUpdate">
                <div className="d-flex flex-column align-items-center m-2"
                  style={{ width: "200px" }}
                  onClick={onIconClick}>
                  <img src={`${contentUrl}/${props.id}`} alt="" id="prev" style={{ width: "100%" }} />
                  <input hidden={true} type="file" {...register("picture")} onChange={onFileUpload} name="fileUploadBtn" />
                </div>
                <input className="m-1" placeholder="Имя" defaultValue={props.firstName} {...register("firstName")} />
                <input className="m-1" placeholder="Фамилия" defaultValue={props.lastName}{...register("lastName")} />
                <input className="m-1" placeholder="Адрес" defaultValue={props.address} {...register("address")} />
                <input className="m-1" placeholder="Номер телефона" defaultValue={props.phoneNumber} {...register("phoneNumber")} />
                <input className="m-1" placeholder="Зарплата" defaultValue={props.salary} {...register("salary")} />
                <select className="m-1" {...register("position")}>
                  <option value="Администратор">Администратор</option>
                  <option value="Сотрудник">Сотрудник</option>
                  <option value="Охрана">Охрана</option>
                  <option value="Уборщица">Уборщица</option>
                </select>
              </form>
            </div>
          </div>
          <div className="cae-wrapper" style={{ display: "none" }}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSubmit(onAccountSubmit)} className="d-flex flex-column align-items-center" id="empCreateAccount">
                <input className="m-1" placeholder="Email" {...register("email")} />
                <input className="m-1" placeholder="Пароль" {...register("password")} />
                <input className="m-1" placeholder="Подтвердить пароль" {...register("passwordConfirm")} />
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="empUpdate-btns" onClick={() => deleteEmployee()}>Удалить</Button>
        <Button className="empUpdate-btns" type="submit" form="empUpdate">Сохранить</Button>
        <Button className="empUpdate-btns" onClick={() => toggleForms()}>Создать аккаунт</Button>

        <Button className="empCreateAccount-btns"
          style={{ display: "none" }}
          onClick={toggleForms}
        >
          Отменить
        </Button>
        <Button className="empCreateAccount-btns" type="submit" form="empCreateAccount" style={{ display: "none" }}>
          Создать
        </Button>

      </Modal.Footer>
    </Modal>
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