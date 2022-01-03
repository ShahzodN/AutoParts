import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/SignIn.css';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(e) {
    const name = e.target.name;

    this.setState({ [name]: e.target.value });
  }

  async submitHandler(e) {
    // `e.preventDefault();

    // const response = await fetch('api/account/login', {
    //   method: 'post',
    //   body: new Url
    // })`
  }

  render() {
    return (
      <div className="background d-flex align-items-center justify-content-center shadow-lg">
        <div className="form-holder d-flex flex-column p-5">
          <span className="text-dark fs-3">Autoparts</span>
          <span className="text-dark fs-3 fw-bold">Вход</span>
          <form action="api/account/signin"
            method="post"
            className="d-flex flex-column"
            onSubmit={this.submitHandler}>
            <input type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              className="mb-2" />

            <input type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Пароль"
              className="mb-2" />

            <span className="mb-4">Нет учетной записи? <Link className="text-decoration-none" to="/register">Создать</Link></span>
            <button type="submit" className="btn btn-primary fs-5">Войти</button>
          </form>
        </div>
      </div>
    )
  }
}