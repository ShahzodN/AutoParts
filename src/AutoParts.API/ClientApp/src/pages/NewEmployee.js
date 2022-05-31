import { useState } from "react"
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { OperationResultModal } from "../components/OperationResultModal";
import employeeService from "../services/employee.service";

export function NewEmployee() {

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const [showOperationResult, setShowOperationResult] = useState(false);
  const positions = ["Администратор", "Уборщица", "Продавец", "Охрана"];

  function onFileUpload(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      setEmployee({ ...employee, photo: e.target.result });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  function uploadEmployee() {
    setLoading(true);

    employeeService.create(employee).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => {
        if (result)
          navigate("/employees");
        setShowOperationResult(false);
      }, 1500);
    })
      .catch(error => {
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      })
  }

  return !loading ? (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 col-md-4 col-lg-3 justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <img
              src={employee.photo}
              alt=""
              id="prev"
              className="border employee-photo"
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
              />
            </div>
          </div>
        </div>
        <div className="d-grid d-lg-flex flex-row-reverse mt-2">
          <Button
            className="mt-2 mt-lg-0 mx-lg-1"
            onClick={uploadEmployee}
          >
            Сохранить
          </Button>
        </div>
        <OperationResultModal
          show={showOperationResult}
        />
      </div>
    </div>
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}