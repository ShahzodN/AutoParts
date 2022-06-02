import { Button, Spinner } from "react-bootstrap";
import employeeService from "../services/employee.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { OperationResultModal } from "../components/OperationResultModal";
import noPhoto from "../assets/no-photo.png";
import { Chart } from "react-google-charts";
import { useWindowSize } from "./useWindowSize";
import "../css/EmployeeDetails.css";

export function EmployeeDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({ photo: "" });
  const [account, setAccount] = useState({});
  const [schedule, setSchedule] = useState({ employeeId: 0, workDays: [] });
  const [workedDays, setWorkedDays] = useState();
  const [showOperationResult, setShowOperationResult] = useState(false);
  const positions = ["Администратор", "Уборщица", "Продавец", "Охрана"];

  const imageSrc = `http://localhost:5000/images`;
  const size = useWindowSize();

  useEffect(() => {
    employeeService.getById(params.id).then(result => {
      setEmployee(result.data);
      renderDays(result.data.workDays);
      setSchedule({ employeeId: result.data.id, workDays: result.data.workDays });
      let arr = [
        [
          {
            type: "date",
            id: "Date"
          },
          {
            type: "number",
            id: "Worked"
          }
        ],
        [new Date(2022, 5, 2), 0]
      ];
      result.data.workedDays.forEach(x => {
        const a = x.split("-");
        arr.push([new Date(parseInt(a[2]), parseInt(a[1]) - 1, parseInt(a[0])), 1]);
      });
      setWorkedDays(arr);
    });

  }, [params.id, size]);

  function onDaySelect(day, e) {
    const exist = schedule.workDays.find(x => x === day);
    if (exist) {
      setSchedule({ ...schedule, employeeId: employee.id, workDays: schedule.workDays.filter(x => x !== day) });
    }
    else {
      setSchedule({ ...schedule, employeeId: employee.id, workDays: [...schedule.workDays, day] });
    }

    exist ? e.target.style.backgroundColor = "#fff" : e.target.style.backgroundColor = "#8cedd5";
  }

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

  function renderDays(days) {
    let dayHolders = document.getElementsByClassName("day-of-week");

    for (let i = 0; i < days.length; i++) {
      if (days[i] === 0)
        dayHolders[dayHolders.length - 1].style.backgroundColor = "#8cedd5";
      else
        dayHolders[days[i] - 1].style.backgroundColor = "#8cedd5";
    }
  }

  function saveSchedule() {
    employeeService.setSchedule(schedule).then(result => {
      setShowOperationResult(true);

      document.getElementById("success").style.display = "block";
      document.getElementById("op-result-message").innerText = "Успешно!";

      setTimeout(() => {
        setShowOperationResult(false);
      }, 1200);
    })
      .catch(error => {
        setShowOperationResult(true);
        document.getElementById("fail").style.display = "block";
        document.getElementById("op-result-message").innerText = "Операция не выполнена";

        setTimeout(() => {
          setShowOperationResult(false);
        }, 1200);
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

  function getCalendarChartData() {
    let arr = [
      [
        {
          type: "date",
          id: "Date"
        },
        {
          type: "number",
          id: "Worked"
        }
      ],
      [new Date(2022, 1, 1), 0]
    ];

    employee.workedDays.forEach(d => {
      const elements = d.split("-");
      arr.push([new Date(d), 1])
    });

    return arr;
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
            className="my-2 my-lg-0 mt-lg-0 mx-lg-1"
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
      <div>
        <h2>График работы</h2>
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <div className="d-flex">
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(1, e)}>
              ПН
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(2, e)}>
              ВТ
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(3, e)}>
              СР
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(4, e)}>
              ЧТ
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(5, e)}>
              ПТ
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(6, e)}>
              СБ
            </div>
            <div className="p-2 fs-4 border me-1 day-of-week" onClick={(e) => onDaySelect(0, e)}>
              ВС
            </div>
          </div>
          <div className="d-grid">
            <Button
              onClick={() => saveSchedule()}
              variant="outline-primary"
              style={{ boxShadow: "none" }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>

      <div className="p-2 d-flex justify-content-center mt-3 border border-2 overflow-">
        <Chart
          chartType="Calendar"
          data={workedDays}
          width="100%"
          height="100%"
          options={{
            title: "Рабочие дни сотрудника"
          }}
        />
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