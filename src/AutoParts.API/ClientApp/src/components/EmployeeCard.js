import React, { Component } from "react";
import user from "../assets/user.png";
import { EmployeeUpdateDeleteModal } from "./EmployeeUpdateDeleteModal";
import "../css/EmployeeCard.css";

export class EmployeeCard extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false };

    this.handleShowHide = this.handleShowHide.bind(this);
  }

  handleShowHide() {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div>
        <EmployeeUpdateDeleteModal show={this.state.show}
          handleShowHide={this.handleShowHide}
          id={this.props.id}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          address={this.props.address}
          phoneNumber={this.props.phoneNumber}
          salary={this.props.salary} />

        <div className="shadow mx-4 my-3 p-3 emp-card" onClick={this.handleShowHide}>
          <div style={{ width: "200px" }}>
            <img src={user} alt="" style={{ width: "100%" }} />
          </div>
          <div className="mb-1 fs-5"><strong>{this.props.firstName} {this.props.lastName}</strong></div>
          <div>{this.props.phoneNumber}</div>
          <div>{this.props.salary}</div>
        </div>
      </div>
    )
  }
}