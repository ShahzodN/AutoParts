import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Employees } from "./Employees";
import { DeliveryOfGoods } from "./DeliveryOfGoods";
import "../css/Admin.css"
import { Categories } from "./Categories";
import { Manufactors } from "./Manufactors";
import { Models } from "./Models";
import { Products } from "./Products";
import { Main } from "./Main";
import { NewProduct } from "./NewProduct";
import { ProductDetail } from "./ProductDetail";
import { AdminNavbar } from "../components/AdminNavbar";
import { NewConsignment } from "./NewConsignment";
import { Consignment } from "./Consignment";
import { EmployeeDetails } from "../components/EmployeeDetails";
import { NewEmployee } from "./NewEmployee";
import { NewCategory } from "./NewCategory";
import { Category } from "./Category";
import { NewManufactor } from "./NewManufactor";
import { PageNotFound } from "./PageNotFound";
import { Sales } from "./Sales";
import { Sale } from "./Sale";
import { Reports } from "./Reports";

export function Admin() {
  return (
    <>
      <AdminNavbar />

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employee/:id" element={<EmployeeDetails />} />
        <Route path="employee/new" element={<NewEmployee />} />
        <Route path="delivery-of-goods/*" element={<DeliveryOfGoods />} />
        <Route path="delivery-of-goods/:id" element={<Consignment />} />
        <Route path="delivery-of-goods/new" element={<NewConsignment />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/new" element={<NewCategory />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="manufactors" element={<Manufactors />} />
        <Route path="manufactors/new" element={<NewManufactor />} />
        <Route path="manufactors/:manufName" element={<Models />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<NewProduct />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="sales" element={<Sales />} />
        <Route path="sales/:id" element={<Sale />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}