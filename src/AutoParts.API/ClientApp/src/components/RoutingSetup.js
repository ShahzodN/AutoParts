import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Admin } from "../pages/Admin";

export class RoutingSetup extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/*" element={<Admin />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    );
  }
}