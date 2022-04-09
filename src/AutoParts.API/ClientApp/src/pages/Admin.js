import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Employees } from "./Employees";
import { DeliveryOfGoods } from "./DeliveryOfGoods";
import "../css/Admin.css"
import { Categories } from "./Categories";

export class Admin extends Component {
  render() {
    return (
      <div className="d-flex flex-row">
        <aside className="left-bar">
          <ul className="list-group">
            <li className="list-group-item">
              <Link className="btn btn-primary" to="/admin">Главная</Link>
            </li>
            <li className="list-group-item">
              <Link className="btn btn-primary" to="/admin/employee">Сотрудники</Link>
            </li>
            <li className="list-group-item">
              <Link className="btn btn-primary" to="/admin/delivery-of-goods">Поставки товаров</Link>
            </li>
            <li className="list-group-item">
              <Link className="btn btn-primary" to="/admin/categories">Категория</Link>
            </li>
          </ul>
        </aside>

        <Routes>
          <Route exact path="/" element={<AdminMainPage />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/delivery-of-goods/*" element={<DeliveryOfGoods />} />
          <Route path="/categories/*" element={<Categories />} />
        </Routes>
      </div>
    )
  }
}

class AdminMainPage extends Component {
  render() {
    return (
      <h1>main</h1>
    )
  }
}