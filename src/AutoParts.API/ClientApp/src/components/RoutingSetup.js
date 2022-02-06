import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./About";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { Admin } from "../pages/Admin";

export class RoutingSetup extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    );
  }
}