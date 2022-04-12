import $ from "jquery";

export function ManufactorCard(props) {

  const contentUrl = 'api/content/manufactor';

  const onRightClick = (e) => {
    e.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = e;

    $('#context-menu').css({ top: `${mouseY}px`, left: `${mouseX}px` });
    $('#context-menu').css('display', 'flex');
    props.selectedCard(props.manufactor.id);
  }

  return (
    <div className="manuf-card" onContextMenu={(e) => onRightClick(e)}>
      <div className="shadow mx-5 my-3">
        <div style={{ width: '200px', height: '200px' }}>
          <img src={`${contentUrl}/${props.manufactor.id}`} alt="manufactorImage" style={{ width: '100%' }} />
        </div>
        <h6>{props.manufactor.name}</h6>
      </div>
    </div>
  )
}