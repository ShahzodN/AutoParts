import $ from "jquery";
import { Link } from "react-router-dom";

export function ManufactorCard(props) {

  const imageSrc = `${window.location.protocol}//${window.location.hostname}:5000/images`;

  const onRightClick = (e) => {
    e.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = e;

    $('#context-menu').css({ top: `${mouseY}px`, left: `${mouseX}px` });
    $('#context-menu').css('display', 'flex');
    props.selectedCard(props.manufactor.id);
  }

  return (
    <Link to={`/admin/manufactors/${props.manufactor.name}`} className="me-3 mb-3">
      <div className="manuf-card" onContextMenu={(e) => onRightClick(e)}>
        <div className="shadow p-2 my-3">
          <div style={{ width: '200px', height: '200px' }} className="mb-2">
            <img
              src={`${imageSrc}/manufactor/${props.manufactor.id}/${props.manufactor.image}`}
              alt="manufactorImage"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h6>{props.manufactor.name}</h6>
        </div>
      </div>
    </Link>
  )
}