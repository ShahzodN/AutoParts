import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import salesService from "../services/sales.service";


export function Sales() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem("credentials"));

  useEffect(() => {
    salesService.getSales(`dateStart=${getFormatedDate(dateStart)}&dateEnd=${getFormatedDate(dateEnd)}&seller=${user.user}`).then(result => {
      setSales(result.data);
    });
  }, []);

  function getFormatedDate(date) {
    const year = date.getFullYear();
    const month = parseInt(date.getMonth()) + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }

  function getSales() {
    salesService.getSales(`dateStart=${getFormatedDate(dateStart)}&dateEnd=${getFormatedDate(dateEnd)}&seller=${user.user}`).then(result => {
      setSales(result.data);
    });
  }

  return (
    <div className="container">
      <h1>Продажи</h1>
      <div className="d-flex">
        <div>
          <span><b>С</b></span>
          <DatePicker
            selected={dateStart}
            dateFormat="dd-MM-yyyy"
            onChange={v => setDateStart(v)}
          />
        </div>
        <div className="ms-1">
          <span><b>До</b></span>
          <DatePicker
            selected={dateEnd}
            dateFormat="dd-MM-yyyy"
            onChange={v => setDateEnd(v)}
          />
        </div>
        <Button
          variant="outline-primary"
          onClick={_ => getSales()}
        >
          Загрузить
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Дата и время</th>
              <th>Сумма покупки</th>
              <th>Кассир</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => {
              return (
                <tr key={i}>
                  <td>{s.dateTime}</td>
                  <td>{s.sum}</td>
                  <td>{s.seller}</td>
                  <td><Link to={`${s.id}`}>Подробнее</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}