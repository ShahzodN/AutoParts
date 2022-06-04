import { useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import reportService from "../services/report.service";

export function SalesReport() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ products: [] });
  const [date, setDate] = useState(new Date());

  function getReport() {
    setLoading(true);
    reportService.getSalesReport(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).then(result => {
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
              <th>Цена ₽</th>
              <th>Себестоимость ₽</th>
              <th>Цена продажи ₽</th>
              <th>Выручка ₽</th>
              <th>Доход ₽</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x.name}</td>
                  <td>{x.quantity}</td>
                  <td>{x.costPrice}</td>
                  <td>{x.costPriceSum}</td>
                  <td>{x.price}</td>
                  <td>{x.revenue}</td>
                  <td>{x.income}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Итого</th>
              <th></th>
              <th>{data.quantitySum}</th>
              <th></th>
              <th>{data.costPriceSum}</th>
              <th></th>
              <th>{data.revenueSum}</th>
              <th>{data.incomeSum}</th>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner size="large" animation="border" />
    </div>
  )
}