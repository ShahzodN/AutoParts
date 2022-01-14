import { CloseButton, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import EmployeeService from "../services/employee.service";
import user from "../assets/user.png"
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export function EmployeeUpdateDeleteModal(props) {

  const { register, handleSubmit } = useForm();
  let base64Image = "";

  function validate(data) {
    let finalResult = 1;
    if (data.firstName === "" || data.firstName.length > 30)
      finalResult = 0;
    else if (data.lastName === "" || data.firstName.length > 30)
      finalResult = 0;
    else if (data.salary < 0)
      finalResult = 0;
    return finalResult;
  }

  const onSubmit = (data) => {
    data.id = props.id;
    if (validate(data) === 1) {
      data.picture = base64Image;

      EmployeeService.update(data)
        .then(res => {
          console.log(res.status);
          props.handleShowHide();
        });
    }
  }

  const onFileUpload = (e) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById("prev").setAttribute("src", e.target.result);
      base64Image = e.target.result;
      console.log(base64Image);
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  const onIconClick = (e) => {
    document.getElementsByName("fileUploadBtn")[0]?.click();
  }

  const deleteEmployee = () => {
    EmployeeService.deleteEmployee(props.id)
      .then(res => console.log(res.status));

    props.handleShowHide();
  }

  return (
    <Modal show={props.show}
      onHide={props.handleShowHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered>

      <ModalHeader>
        <CloseButton onClick={props.handleShowHide} />
      </ModalHeader>

      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center" id="empUpdate">
            <div className="d-flex flex-column align-items-center m-2"
              style={{ width: "200px" }}
              onClick={onIconClick}>
              <img src={user} alt="" id="prev" style={{ width: "100%" }} />
              <input hidden={true} type="file" {...register("picture")} onChange={onFileUpload} name="fileUploadBtn" />
            </div>
            <input className="m-1" placeholder="Имя" defaultValue={props.firstName} {...register("firstName")} />
            <input className="m-1" placeholder="Фамилия" defaultValue={props.lastName}{...register("lastName")} />
            <input className="m-1" placeholder="Адрес" defaultValue={props.address} {...register("address")} />
            <input className="m-1" placeholder="Номер телефона" defaultValue={props.phoneNumber} {...register("phoneNumber")} />
            <input className="m-1" placeholder="Зарплата" defaultValue={props.salary} {...register("salary")} />
          </form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => deleteEmployee()}>Удалить</Button>
        <Button type="submit" form="empUpdate">Сохранить</Button>
      </Modal.Footer>

    </Modal>
  );
}