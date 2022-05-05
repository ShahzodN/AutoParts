import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import employeeService from "../services/employee.service"
import { EmployeeCard } from '../components/EmployeeCard';
import "../css/Employee.css"
import { Link } from 'react-router-dom';

export function Employees() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeService.getAll().then(emps => {
      setEmployees(emps);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="container-fluid">
      <h2>Сотрудники</h2>

      <div className="d-grid d-lg-block">
        <Link
          to="/admin/employee/new"
          className="btn btn-primary"
        >
          Создать новый
        </Link>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-2 gx-2 mt-1">
        {employees.map(emp => {
          return (
            <Link
              to={`/admin/employee/${emp.id}`}
              key={emp.id}
            >
              <EmployeeCard
                employee={emp}
              />
            </Link>
          )
        })}
      </div>
    </div>
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}