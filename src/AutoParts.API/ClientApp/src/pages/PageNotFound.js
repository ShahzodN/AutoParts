import notfound from "../assets/pageNotFound.jpg";
import { Link } from "react-router-dom";

export function PageNotFound() {

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <img
          src={notfound}
          alt="PageNotFound"
          style={{ width: "80%", minWidth: "20rem" }}
        />
        <h1><span className="text-danger">404</span> Ошибка! Страница не найдена</h1>
        <Link className="btn btn-outline-dark" to="/">Главная страница</Link>
      </div>
    </div>
  )
}