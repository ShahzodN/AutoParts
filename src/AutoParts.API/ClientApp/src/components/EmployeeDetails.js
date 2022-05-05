import { Button, Spinner } from "react-bootstrap";
import employeeService from "../services/employee.service";
import $ from "jquery";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

export function EmployeeDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({ photo: "" });
  const positions = ["Администратор", "Уборщица", "Продавец", "Охрана"];

  const imageSrc = `${window.location.protocol}//${window.location.hostname}:5000/images`;

  useEffect(() => {
    employeeService.getById(params.id).then(result => setEmployee(result));
  }, [params.id]);

  const uploadEmployee = () => {
    setLoading(true);
    employeeService.update(employee).then(result => {
      setLoading(false);
      navigate("/admin/employee");
    });
  }

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setEmployee({ ...employee, photo: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const deleteEmployee = () => {
    setLoading(true);
    employeeService.deleteEmployee(employee.id).then(result => {
      if (result.ok) {
        setLoading(false);
        navigate("/admin/employee");
      }
    })
  }

  const toggleForms = (e) => {
    $('.eud-wrapper').toggle();
    $('.cae-wrapper').toggle();
    $('.empUpdate-btns').toggle();
    $('.empCreateAccount-btns').toggle();
  }

  return !loading ? (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 col-md-4 col-lg-3 justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <img
              src={employee.photo.length < 50 ? `${imageSrc}/Employee/${employee.id}/${employee.photo}` : employee.photo}
              alt="employeePhoto"
              id="prev"
              className="employee-photo"
              style={{ maxWidth: "14rem" }}
            />
            <input hidden type="file" id="employeePhoto" onChange={onFileUpload} />
          </div>
          <div className="d-grid mt-2">
            <Button
              variant="outline-dark"
              onClick={() => document.getElementById("employeePhoto")?.click()}
            >
              Выбрать фото
            </Button>
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeFirstname" className="form-label">Имя</label>
              <input
                className="form-control"
                id="employeeFirstname"
                placeholder="Имя"
                defaultValue={employee.firstName}
                onChange={e => setEmployee({ ...employee, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeLastname" className="form-label">Фамилия</label>
              <input
                className="form-control"
                id="employeeLastname"
                placeholder="Фамилия"
                defaultValue={employee.lastName}
                onChange={e => setEmployee({ ...employee, lastName: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeAddress" className="form-label">Адрес</label>
              <input
                className="form-control"
                placeholder="Адрес"
                defaultValue={employee.address}
                onChange={e => setEmployee({ ...employee, address: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeePhone" className="form-label">Номер телефона</label>
              <input
                className="form-control"
                placeholder="Номер телефона"
                defaultValue={employee.phoneNumber}
                onChange={e => setEmployee({ ...employee, phoneNumber: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeSalary" className="form-label">Зарплата</label>
              <input className="form-control"
                placeholder="Зарплата"
                defaultValue={employee.salary}
                onChange={e => setEmployee({ ...employee, salary: parseInt(e.target.value) })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeePosition" className="form-label">Должность</label>
              <Select
                options={positions.map(i => ({ value: i, label: i }))}
                isSearchable={false}
                onChange={value => setEmployee({ ...employee, position: value.label })}
                value={{ value: employee.position, label: employee.position }}
              />
            </div>
          </div>
        </div>
        <div className="d-grid d-lg-flex flex-row-reverse mt-2">
          <Button
            variant="outline-danger"
            onClick={() => deleteEmployee()}
          >
            Удалить
          </Button>
          <Button
            className="mt-2 mt-lg-0 mx-lg-1"
            onClick={uploadEmployee}
          >
            Сохранить
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log(employee)}
            className="mt-2 mt-lg-0"
          >
            Создать аккаунтx
          </Button>
        </div>
      </div>
      <div className="cae-wrapper" style={{ display: "none" }}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <input
            className="form-control m-1"
            placeholder="Email"
          />
          <input
            className="form-control m-1"
            placeholder="Пароль"
          />
          <input
            className="form-control m-1"
            placeholder="Подтвердить пароль"
          />
        </div>
      </div>
      <Button
        style={{ display: "none" }}
        onClick={toggleForms}
      >
        Отменить
      </Button>
      <Button type="submit" form="empCreateAccount" style={{ display: "none" }}>
        Создать
      </Button>
    </div>
  ) : (
    <div className="container-fluid justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}