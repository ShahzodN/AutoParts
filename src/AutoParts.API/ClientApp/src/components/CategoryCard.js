import { useState } from "react";
import { CategoryUpdateDeleteModal } from "./CategoryUpdateDeleteModal";

export function CategoryCard(props) {

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <CategoryUpdateDeleteModal
        show={showModal}
        handleShow={() => setShowModal(!showModal)}
        category={props.category}
      />

      <div className="shadow mx-5 my-3" onClick={() => setShowModal(!showModal)}>
        <div style={{ width: '200px', height: '200px' }}>
          <img src="https://f.nodacdn.net/325135" alt="" style={{ width: '100%' }} />
        </div>
        <h6>{props.category.name}</h6>
      </div>
    </div>
  )
}