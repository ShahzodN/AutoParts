import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from 'react-bootstrap';
import { BsCheckCircle } from "react-icons/bs";
import { CategoryCard } from "../components/CategoryCard";
import { CreateCategoryModal } from "../components/CreateCategoryModal";
import categoryService from '../services/category.service';

export function Categories() {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    categoryService.getAll().then(res => {
      console.log(res);
      setCategories(res);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="container">
      <CreateCategoryModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(!showCreateModal)}
      />
      <div className="p-1">
        <Button onClick={() => setShowCreateModal(!showCreateModal)}>
          Создать
        </Button>
      </div>
      <div className="d-flex flex-wrap">
        {categories.map((v, i) => {
          return <CategoryCard
            key={i}
            category={v}
          />
        })}
      </div>
    </div>
  ) : (
    <div>
      <Modal
        show={loading}
        backdrop="static"
        centered
        className="modal-90w">
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner animation="border" size="large" />
          <BsCheckCircle className="done" style={{ display: 'none', fontSize: '1.8em' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}