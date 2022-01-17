import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateEmployee } from "./CreateEmployee"
import "../css/Employee.css"
import { AllEmployees } from './AllEmployees';
import { Button, Modal } from "react-bootstrap";
import EmployeeService from "../services/employee.service"
import { EmployeeCard } from './EmployeeCard';

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      employees: [],
      employeesDownloaded: false
    }

    this.handleShowHide = this.handleShowHide.bind(this);
  }

  handleShowHide() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    EmployeeService.getAll().then(emps => {
      this.setState({ employees: emps, employeesDownloaded: true });
      console.log(this.state.employees);
    });
  }

  render() {

    return this.state.employeesDownloaded ? (
      <section>
        <h2>Сотрудники</h2>

        <Button variant="primary" onClick={this.handleShowHide}>
          Создать новый
        </Button>

        <Modal show={this.state.show}
          onHide={this.handleShowHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
            <Modal.Title>Новый сотрудник</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEmployee handleShowHide={this.handleShowHide} />
          </Modal.Body>
        </Modal>

        <div className="d-flex flex-wrap px-5">
          {this.state.employees.map(emp => {
            return (
              <EmployeeCard key={emp.id} id={emp.id}
                firstName={emp.firstName}
                lastName={emp.lastName}
                address={emp.address}
                phoneNumber={emp.phoneNumber}
                salary={emp.salary}
                reRender={this.reRender}
                setEmployee={this.setEmployee} />
            )
          })}
        </div>

        <Routes>
          <Route path="/create" element={<CreateEmployee />} />
          <Route path="/all" element={<AllEmployees />} />
        </Routes>
      </section>) : <h2>Loading</h2>
  }
}