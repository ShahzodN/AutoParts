import { useEffect, useState } from "react";
import { TodayWorkers } from "../components/TodayWorkers";
import { Card, Spinner } from "react-bootstrap";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";
import dashboardService from "../services/dashboard.service";
import "../css/Main.css";

export function Main() {

  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({ workers: [], quantities: [] });
  const [lowBalanceProducts, setLowBalanceProducts] = useState();
  const [popularProducts, setPopularProducts] = useState();
  const [categoriesPercentage, setCategoriesPercentage] = useState();
  const [categoriesSalePercentage, setCategoriesSalePercentage] = useState();
  const [marksPercentage, setMarksPercentage] = useState();
  const [marksSalePercentage, setMarksSalePercentage] = useState();

  const columnColors = ["#34cf29", "#cfcc29", "#cf2929", "#29cfc1", "#3960e3"];

  useEffect(() => {
    dashboardService.getStatistics().then(result => {
      setLoading(false);
      setStatistics(result.data);
      let tableData = [
        ["Название", "EAN", "Цена", "Количество"]
      ];
      result.data.lowBalanceProducts.forEach(x => {
        tableData.push([x.name, x.ean, x.price, x.quantity]);
      })

      let _popularProducts = [
        ["Продукт", "Продажи", { role: "style" }]
      ]

      result.data.popularProducts.forEach((p, i) => {
        _popularProducts.push([p.name, p.quantity, columnColors[i]]);
      });

      let _categoriesPercentage = [
        ["Категории", "Товары"]
      ];

      let _categoriesSalePercentage = [
        ["Категории", "Продажи"]
      ];

      let _marksPercentage = [
        ["Марки", "Товары"]
      ];

      let _marksSalePercentage = [
        ["Марки", "Продажи"]
      ];

      result.data.categoriesPercentage.forEach(c => {
        _categoriesPercentage.push([c.category, c.quantity]);
      });

      result.data.categoriesSalePercentage.forEach(c => {
        _categoriesSalePercentage.push([c.category, c.quantity]);
      });

      result.data.marksPercentage.forEach(c => {
        _marksPercentage.push([c.mark, c.quantity]);
      });

      result.data.marksSalePercentage.forEach(c => {
        _marksSalePercentage.push([c.mark, c.quantity]);
      });

      console.log(_marksPercentage);
      setMarksSalePercentage(_marksSalePercentage);
      setMarksPercentage(_marksPercentage);
      setCategoriesPercentage(_categoriesPercentage);
      setCategoriesSalePercentage(_categoriesSalePercentage);
      setPopularProducts(_popularProducts);
      setLowBalanceProducts(tableData);
    })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return !loading ? (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <div className="dot dot-category"></div>
              <span className="ms-2 fs-3">{statistics.quantities.categories} категорий</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="dot dot-product"></div>
              <span className="ms-2 fs-3">{statistics.quantities.products} товаров</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="dot dot-mark"></div>
              <span className="ms-2 fs-3">{statistics.quantities.marks} марки</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="dot dot-model"></div>
              <span className="ms-2 fs-3">{statistics.quantities.models} модели</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <span className="fs-3">Средний чек</span>
            <CountUp
              start={0}
              end={statistics.saleAvarage}
              separator=" "
              suffix="₽"
              decimals={2}
              duration={1}
              style={{ fontSize: "4rem" }}
            />
          </div>
        </div>
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <span className="fs-3">Сегодня продажи</span>
            <CountUp
              start={0}
              end={statistics.todaySales}
              duration={5}
              useEasing={true}
              easingFn={(t, b, c, d) => { return -c * (t /= d) * (t - 2) + b }}
              style={{ fontSize: "4rem" }}
            />
          </div>
        </div>
        <div className="col">
          <TodayWorkers workers={statistics.workers} />
        </div>
      </div>
      <div className="row">
        <h3>Заканчивающиеся товары</h3>
        <div className="col">
          <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
            <Chart
              chartType="Table"
              width="100%"
              options={{ showRowNumber: true, title: "Закончивающиеся товары" }}
              data={lowBalanceProducts}
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-4">
        <div style={{ width: "50%" }}>
          <h4>Часто продаваемые товары</h4>
          <Chart
            chartType="ColumnChart"
            width={"100%"}
            data={popularProducts}
            options={{
              legend: "none"
            }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h4>Редко продаваемые товары</h4>
          <Chart
            chartType="ColumnChart"
            width={"100%"}
            data={popularProducts}
            options={{
              legend: "none"
            }}
          />
        </div>
      </div>
      <div className="d-flex">
        <div style={{ width: "50%" }}>
          <h4>Доля товаров по категориям</h4>
          <Chart
            chartType="PieChart"
            width={"100%"}
            data={categoriesPercentage}
            options={{
              pieHole: 0.4,
              width: 600,
              height: 300
            }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h4>Доля продажи по категориям</h4>
          <Chart
            chartType="PieChart"
            width={"100%"}
            data={categoriesSalePercentage}
            options={{
              pieHole: 0.4,
              width: 600,
              height: 300
            }}
          />
        </div>
      </div>
      <div className="d-flex">
        <div style={{ width: "50%" }}>
          <h4>Доля товаров по маркам</h4>
          <Chart
            data={marksPercentage}
            chartType="PieChart"
            options={{
              pieHole: 0.4,
              width: 600,
              height: 300
            }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h4>Доля продаж по маркам</h4>
          <Chart
            data={marksSalePercentage}
            chartType="PieChart"
            options={{
              pieHole: 0.4,
              width: 600,
              height: 300
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}