import { useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import reportService from "../services/report.service";
import DatePicker from "react-datepicker";

export function BalanceReport() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  function getReport() {
    setLoading(true);
    reportService.getBalanceReport(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).then(result => {
      setData(result.data);
      setLoading(false);
    })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }

  return !loading ? (
    <>
      <div className="d-flex align-items-end">
        <div>
          <span className="mb-1"><b>Выберите месяц</b></span>
          <DatePicker
            selected={date}
            dateFormat="MM-yyyy"
            onChange={v => setDate(v)}
          />
        </div>
        <div>
          <Button
            variant="outline-primary"
            onClick={_ => getReport()}
          >
            Загрузить
          </Button>
        </div>
      </div>
      <div>
        <Table size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Последняя поставка</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((x, i) => {
              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.name}</td>
                <td>{x.quantity}</td>
                <td>{x.lastDelivery}</td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    </>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner size="large" animation="border" />
    </div>
  )
}