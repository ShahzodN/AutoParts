import React, { useState } from "react";
import { EmployeeUpdateDeleteModal } from "./EmployeeUpdateDeleteModal";
import "../css/EmployeeCard.css";

export function EmployeeCard(props) {

  const [show, setShow] = useState(false);

  const contentUrl = 'api/content/employee';

  const handleShowHide = () => setShow(!show);

  return (
    <div>
      <EmployeeUpdateDeleteModal show={show}
        handleShowHide={handleShowHide}
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
        address={props.address}
        phoneNumber={props.phoneNumber}
        salary={props.salary} />

      <div className="shadow mx-4 my-3 p-3 emp-card" onClick={handleShowHide}>
        <div style={{ width: "200px" }}>
          <img src={`${contentUrl}/${props.id}`} alt="employeeImage" style={{ width: "100%" }} />
        </div>
        <div className="mb-1 fs-5"><strong>{props.firstName} {props.lastName}</strong></div>
        <div>{props.phoneNumber}</div>
        <div>{props.salary}</div>
      </div>
    </div>
  )
}