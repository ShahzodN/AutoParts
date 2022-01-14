import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/NavMenu.css';

export class NavMenu extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link navbar-brand" to="/">Autoparts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/person">Person</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            </ul>
            <div className="container-fluid d-flex flex-row-reverse">
              <a className="nav-link" href="/signin">
                <div className="d-flex">
                  <span className="text-dark">Sign in</span>
                  <div className="icon-holder ms-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="black" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                      <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </nav>
      </div >
    )
  }
}