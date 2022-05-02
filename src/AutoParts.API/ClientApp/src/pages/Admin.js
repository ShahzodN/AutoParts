import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Employees } from "./Employees";
import { DeliveryOfGoods } from "./DeliveryOfGoods";
import "../css/Admin.css"
import { Categories } from "./Categories";
import { Manufactors } from "./Manufactors";
import { Models } from "./Models";
import { Products } from "./Products";
import { NewProduct } from "./NewProduct";
import { ProductDetail } from "./ProductDetail";
import { AdminNavbar } from "../components/AdminNavbar";

export class Admin extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <AdminNavbar />

        <Routes>
          <Route exact path="/" element={<AdminMainPage />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/delivery-of-goods/*" element={<DeliveryOfGoods />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/manufactors" element={<Manufactors />} />
          <Route path="/manufactors/:manufName" element={<Models />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
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