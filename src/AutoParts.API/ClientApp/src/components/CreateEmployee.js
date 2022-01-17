import React from "react";
import { useForm } from "react-hook-form"
import EmployeeService from "../services/employee.service";
import user from "../assets/user.png";

export function CreateEmployee(props) {
  const { register, handleSubmit } = useForm();
  let base64Image = "";

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
      data.picture = base64Image;

      EmployeeService.create(data)
        .then(res => {
          if (res.ok) {
            props.handleShowHide();
          }
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
    document.getElementsByName("fileUploadBtn")[0]?.click();
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center m-2"
          style={{ width: "200px" }}
          onClick={onIconClick}>
          <img src={user} alt="" id="prev" style={{ width: "100%" }} />
          <input hidden={true} type="file" {...register("picture")} onChange={onFileUpload} name="fileUploadBtn" />
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
  );
}