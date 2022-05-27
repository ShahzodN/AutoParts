import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/SignIn.css';
import authService from "../services/auth.service";

export function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) navigate("/");
  }, []);

  function submitForm() {
    authService.signIn(form).then(result => {
      if (result.status >= 200 && result.status < 300) {
        localStorage.setItem("credentials", JSON.stringify(result.data));
        navigate("/");
      }
    })
      .catch(error => {
        setError(error.response.data.error);
      });
  }

  return (
    <div className="background d-flex align-items-center justify-content-center shadow-lg">
      <div className="form-holder d-flex flex-column p-5">
        <span className="text-dark fs-3">Autoparts</span>
        <span className="text-dark fs-3 fw-bold">Вход</span>
        <span className="text-danger" style={{ display: error === null ? "none" : "block" }}>{error}</span>
        <div className="d-flex flex-column">
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Пароль"
            className="form-control mb-2"
          />
          <span className="mb-4">Нет учетной записи? <Link className="text-decoration-none" to="/register">Создать</Link></span>
          <button
            type="submit"
            className="btn btn-primary fs-5"
            onClick={submitForm}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}