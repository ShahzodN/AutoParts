import { Modal, Spinner } from "react-bootstrap";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

export function OperationResultModal(props) {

  return (
    <Modal
      show={props.show}
      backdrop="static"
      centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <Spinner />
        <BsCheckCircleFill id="success" style={{ display: "none", fontSize: "3em", color: "green" }} />
        <BsExclamationCircleFill id="fail" style={{ display: "none", fontSize: '3em', color: "red" }} />
        <span className="text-break fs-4" id="op-result-message"></span>
      </Modal.Body>
    </Modal>
  )
}