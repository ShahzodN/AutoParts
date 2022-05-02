import { useState } from "react";
import { CategoryUpdateDeleteModal } from "./CategoryUpdateDeleteModal";

export function CategoryCard(props) {

  const [showModal, setShowModal] = useState(false);
  const contentUrl = 'http://localhost:5000/images';

  return (
    <div>
      <CategoryUpdateDeleteModal
        show={showModal}
        handleShow={() => setShowModal(!showModal)}
        category={props.category}
      />

      <div className="shadow mx-5 my-3" onClick={() => setShowModal(!showModal)}>
        <div style={{ width: '200px', height: '200px' }}>
          <img
            src={`${contentUrl}/category/${props.category.id}/${props.category.image}`}
            alt="categoryImage"
            style={{ width: '100%' }}
          />
        </div>
        <h6 className="mt-3 p-1">{props.category.name}</h6>
      </div>
    </div>
  )
}