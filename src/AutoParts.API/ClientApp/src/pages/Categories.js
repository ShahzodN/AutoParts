import { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import categoryService from "../services/category.service";

export function Categories() {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getAll().then(res => {
      setCategories(res);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="container">
      <h2>Категории</h2>
      <div className="row">
        <div className="d-grid d-lg-block">
          <Link
            to="/admin/categories/new"
            className="btn btn-primary"
          >
            Создать новый
          </Link>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 gy-2 gx-2">
          {categories.map((v) => {
            return (
              <Link
                to={`/admin/category/${v.id}`}
                key={v.id}
                className="col justify-content-center align-items-center"
              >
                <CategoryCard
                  key={v.id}
                  category={v}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="container d-flex justify-content-center">
      <Spinner animation="border" size="large" />
    </div>
  )
}