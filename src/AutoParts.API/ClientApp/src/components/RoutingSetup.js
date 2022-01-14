import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import { SignIn } from "./SignIn";
import { Person } from "./Person";
import { Admin } from "./Admin";

export class RoutingSetup extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/person" element={<Person />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    );
  }
}