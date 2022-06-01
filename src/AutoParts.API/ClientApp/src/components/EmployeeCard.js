import React from "react";
import "../css/EmployeeCard.css";
import noPhoto from "../assets/no-photo.png";

export function EmployeeCard({ employee }) {
  const imageSrc = `http://localhost:5000/images`;

  return (
    <div className="p-2 emp-card">
      <div>
        <img
          src={employee.photo ? `${imageSrc}/Employee/${employee.id}/${employee.photo}` : noPhoto}
          alt="employeeImage"
          className="employee-photo"
        />
      </div>
      <div className="mt-2 fs-5"><strong>{employee.firstName} {employee.lastName}</strong></div>
    </div>
  )
}