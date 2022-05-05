import React from "react";
import { Link } from "react-router-dom";
import "../css/EmployeeCard.css";

export function EmployeeCard({ employee }) {
  const imageSrc = `${window.location.protocol}//${window.location.hostname}:5000/images`;

  return (
    <div className="p-2 emp-card">
      <div>
        <img
          src={`${imageSrc}/Employee/${employee.id}/${employee.photo}`}
          alt="employeeImage"
          className="employee-photo"
        />
      </div>
      <div className="mt-2 fs-5"><strong>{employee.firstName} {employee.lastName}</strong></div>
    </div>
  )
}