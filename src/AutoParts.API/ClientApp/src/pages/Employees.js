import React, { useEffect, useState } from 'react';
import { CreateEmployee } from "../components/CreateEmployee"
import { Button, Modal, Spinner } from "react-bootstrap";
import { BsCheckCircle } from 'react-icons/bs';
import EmployeeService from "../services/employee.service"
import { EmployeeCard } from '../components/EmployeeCard';
import "../css/Employee.css"

export function Employees(props) {

  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowHide = () => setShow(!show);

  useEffect(() => {
    EmployeeService.getAll().then(emps => {
      setEmployees(emps);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <section>
      <h2>Сотрудники</h2>

      <Button variant="primary" onClick={handleShowHide}>
        Создать новый
      </Button>

      <Modal show={show}
        onHide={handleShowHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title>Новый сотрудник</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEmployee handleShowHide={handleShowHide} />
        </Modal.Body>
      </Modal>

      <div className="d-flex flex-wrap px-5">
        {employees.map(emp => {
          return (
            <EmployeeCard key={emp.id} id={emp.id}
              firstName={emp.firstName}
              lastName={emp.lastName}
              address={emp.address}
              phoneNumber={emp.phoneNumber}
              salary={emp.salary} />
          )
        })}
      </div>
    </section>) : (
    <Modal
      show={loading}
      backdrop="static"
      centered
      className="modal-90w">
      <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spinner animation="border" size="large" />
        <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
      </Modal.Body>
    </Modal>
  )
}