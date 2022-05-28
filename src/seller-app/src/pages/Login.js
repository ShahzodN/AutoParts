import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import authService from "../services/auth.service";

export function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();

  function submitForm() {
    authService.signIn(form).then(result => {
      localStorage.setItem("credentials", JSON.stringify(result.data));
      navigate("/");
    })
      .catch(error => {
        setError(error.response.data.error);
      })
  }

  return (
    <div className="background d-flex align-items-center justify-content-center shadow-lg">
      <div className="form-holder d-flex flex-column p-5">
        <span className="text-dark fs-3">AUTOPARTS.CASHIER</span>
        <span className="text-dark fs-3 fw-bold">Вход</span>
        <span className="text-danger" style={{ display: error === null ? "none" : "block" }}>{error}</span>
        <div className="d-flex flex-column">
          <input
            type="text"
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