export function ManufactorCard(props) {

  const imageSrc = `http://localhost:5000/images`;

  return (
    <div className="manuf-card">
      <div className="shadow p-2 my-3">
        <div style={{ width: '200px', height: '200px' }} className="mb-2">
          <img
            src={`${imageSrc}/Manufactor/${props.manufactor.id}/${props.manufactor.image}`}
            alt="manufactorImage"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <h6>{props.manufactor.name}</h6>
      </div>
    </div>
  )
}