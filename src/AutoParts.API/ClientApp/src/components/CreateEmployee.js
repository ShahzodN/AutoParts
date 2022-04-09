import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Spinner } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import employeeService from "../services/employee.service";
import user from "../assets/user.png";
import $ from 'jquery';

export function CreateEmployee(props) {
  const { register, handleSubmit } = useForm();
  const [base64Image, setBase64Image] = useState('');
  const [loading, setLoading] = useState(false);

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

  const onSubmit = (data) => {
    if (validate(data) === 1) {
      data.image = base64Image;
      setLoading(!loading);

      props.handleShowHide();
      employeeService.create(data)
        .then(res => {
          if (res.ok) {
            $('.spinner-border').hide();
            $('.done').show();

            setInterval(() => {
              window.location.reload();
            }, 5000);
          }
        });
    }
  }

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      setBase64Image(e.target.result);
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const onIconClick = (e) => {
    document.getElementsByName("fileUploadBtn")[0]?.click();
  }

  return !loading ? (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center m-2"
          style={{ width: "200px" }}
          onClick={onIconClick}>
          <img src={user} alt="" id="prev" style={{ width: "100%" }} />
          <input hidden={true} type="file" {...register("image")} onChange={onFileUpload} name="fileUploadBtn" />
        </div>
        <input className="m-1" placeholder="Имя" {...register("firstName")} />
        <input className="m-1" placeholder="Фамилия" {...register("lastName")} />
        <input className="m-1" placeholder="Адрес" {...register("address")} />
        <input className="m-1" placeholder="Номер телефона" {...register("phoneNumber")} />
        <input className="m-1" placeholder="Зарплата" {...register("salary")} />
        <select className="m-1" {...register("position")}>
          <option value="Администратор">Администратор</option>
          <option value="Сотрудник">Сотрудник</option>
          <option value="Охрана">Охрана</option>
          <option value="Уборщица">Уборщица</option>
        </select>
        <button type="submit" className="btn btn-primary">Создать</button>
      </form>
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