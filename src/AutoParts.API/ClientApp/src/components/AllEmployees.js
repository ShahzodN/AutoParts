import React, { Component } from "react";
import EmployeeService from "../services/employee.service";

export class AllEmployees extends Component {

    componentDidMount() {
        EmployeeService.getAll()
            .then(response => console.info(response));
    }

    render() {
        return (
            <h1>AllEmployees</h1>
        )
    }
}