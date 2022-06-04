import "../css/TodayWorkers.css";
import avatar from "../assets/avatar.jpg";

export function TodayWorkers({ workers }) {

  return (
    <div className="p-3 shadow-lg today-workers-card">
      <span className="fs-5 fw-bolder">Сегодня работают</span>
      {workers.map((x, i) => {
        return (
          <div key={i} className="d-flex align-items-center mt-2">
            <img
              src={x.image ? `http://localhost:5000/images/Employee/${x.id}/${x.image}` : avatar}
              alt="employeeImage"
              className="avatar-photo"
            />
            <div className="d-flex flex-column ms-3">
              <span className="fw-bold fs-5">{x.fullName}</span>
              <span className="text-secondary">{x.position}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}