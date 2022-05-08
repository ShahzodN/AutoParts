import React, { useEffect, useState } from "react";
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
import { NewConsignment } from "./NewConsignment";
import { Consignment } from "./Consignment";
import { EmployeeDetails } from "../components/EmployeeDetails";
import { NewEmployee } from "./NewEmployee";
import { NewCategory } from "./NewCategory";
import { Category } from "./Category";
import dashboardService from "../services/dashboard.service";
import { Spinner } from "react-bootstrap";

export function Admin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getSecret().then(res => {
      if (res.ok) {
        setLoading(false);
      }
    });
  }, [])

  return !loading ? (
    <div className="d-flex flex-column">
      <AdminNavbar />

      <Routes>
        <Route exact path="/" element={<AdminMainPage />} />
        <Route path="/employee" element={<Employees />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/employee/new" element={<NewEmployee />} />
        <Route path="/delivery-of-goods/*" element={<DeliveryOfGoods />} />
        <Route path="/delivery-of-goods/:id" element={<Consignment />} />
        <Route path="/delivery-of-goods/new" element={<NewConsignment />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/new" element={<NewCategory />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/manufactors" element={<Manufactors />} />
        <Route path="/manufactors/:manufName" element={<Models />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}

export function AdminMainPage() {
  return (
    <div className="container">
      <h1>Главная страница</h1>

    </div>
  )
}