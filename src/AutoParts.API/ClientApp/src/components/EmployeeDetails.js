import { Button, Spinner } from "react-bootstrap";
import employeeService from "../services/employee.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { OperationResultModal } from "../components/OperationResultModal";
import noPhoto from "../assets/no-photo.png";

export function EmployeeDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({ photo: "" });
  const [account, setAccount] = useState({});
  const [showOperationResult, setShowOperationResult] = useState(false);
  const positions = ["Администратор", "Уборщица", "Продавец", "Охрана"];

  const imageSrc = `http://localhost:5000/images`;

  useEffect(() => {
    employeeService.getById(params.id).then(result => {
      setEmployee(result.data);
    });
  }, [params.id]);

  function uploadEmployee() {
    setLoading(true);
    employeeService.update(employee).then(result => {
      setLoading(false);
      navigate("/employees");
    });
  }

  function uploadAccount() {
    if (account.password !== account.passwordConfirmation)
      return;

    setLoading(true);
    account.employeeId = employee.id;
    employeeService.createAccount(account).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => setShowOperationResult(false), 1200);
    })
      .catch(error => {
        setShowOperationResult(true);
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
      });
  }

  function deleteAccount() {
    setLoading(true);

    employeeService.deleteAccount(employee.id).then(result => {
      setLoading(false);
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => setShowOperationResult(false), 1200);
    })
      .catch(error => {
        setShowOperationResult(true);
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";
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
      if (result) {
        setLoading(false);
        navigate("/employees");
      }
    })
  }

  const toggleForms = (e) => {
    let div = document.getElementById("cae-wrapper");

    div.style.display === "none" ? div.style.display = "block" : div.style.display = "none";
  }

  return !loading ? (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 col-md-4 col-lg-3 justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <img
              src={employee.photo ? (employee.photo.length < 50 ? `${imageSrc}/Employee/${employee.id}/${employee.photo}` : employee.photo) : noPhoto}
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
              <label htmlFor="employeeFirstname" className="form-label"><strong>Имя</strong></label>
              <input
                className="form-control"
                id="employeeFirstname"
                placeholder="Имя"
                defaultValue={employee.firstName}
                onChange={e => setEmployee({ ...employee, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeLastname" className="form-label"><strong>Фамилия</strong></label>
              <input
                className="form-control"
                id="employeeLastname"
                placeholder="Фамилия"
                defaultValue={employee.lastName}
                onChange={e => setEmployee({ ...employee, lastName: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeAddress" className="form-label"><strong>Адрес</strong></label>
              <input
                className="form-control"
                placeholder="Адрес"
                defaultValue={employee.address}
                onChange={e => setEmployee({ ...employee, address: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeePhone" className="form-label"><strong>Номер телефона</strong></label>
              <input
                className="form-control"
                placeholder="Номер телефона"
                defaultValue={employee.phoneNumber}
                onChange={e => setEmployee({ ...employee, phoneNumber: e.target.value })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeeSalary" className="form-label"><strong>Зарплата</strong></label>
              <input className="form-control"
                placeholder="Зарплата"
                defaultValue={employee.salary}
                onChange={e => setEmployee({ ...employee, salary: parseInt(e.target.value) })}
              />
            </div>
            <div className="col-md-12 col-lg-6 mt-2">
              <label htmlFor="employeePosition" className="form-label"><strong>Должность</strong></label>
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
            variant="outline-danger"
            hidden={!employee.hasAccount}
            onClick={deleteAccount}
          >
            Удалить аккаунт
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => toggleForms()}
            className="mt-2 mt-lg-0 mx-lg-1"
            hidden={employee.hasAccount}
          >
            Создать аккаунт
          </Button>
          <Button
            onClick={uploadEmployee}
            variant="outline-primary"
          >
            Сохранить
          </Button>
        </div>
      </div>
      <div id="cae-wrapper" style={{ display: "none" }}>
        <div className="row">
          <div className="col-3">
            <label htmlFor=""><b>Имя пользователя</b></label>
            <input
              className="form-control m-1"
              value={account.userName}
              onChange={e => setAccount({ ...account, userName: e.target.value.trim() })}
            />
            <label htmlFor=""><b>Пароль</b></label>
            <input
              className="form-control mb-1"
              type="password"
              value={account.password}
              onChange={e => setAccount({ ...account, password: e.target.value.trim() })}
            />
            <label htmlFor=""><b>Подтвердить пароль</b></label>
            <input
              className="form-control mb-2"
              type="password"
              value={account.passwordConfirmation}
              onChange={e => setAccount({ ...account, passwordConfirmation: e.target.value.trim() })}
            />
            <div className="d-grid">
              <Button
                variant="outline-primary"
                className="mb-2"
                onClick={() => uploadAccount()}
              >
                Готово
              </Button>
              <Button
                onClick={toggleForms}
                variant="outline-secondary"
              >
                Отменить
              </Button>
            </div>
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