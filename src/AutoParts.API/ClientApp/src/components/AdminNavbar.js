import { Container, Nav, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export function AdminNavbar() {

  const navigate = useNavigate();

  return (
    <Container>
      <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand as={Link} to="/admin">Главная</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link eventKey={1} as={Link} to="/admin/employee">Сотрудники</Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="/admin/delivery-of-goods">Поставки товаров</Nav.Link>
            <Nav.Link eventKey={3} as={Link} to="/admin/categories">Категория</Nav.Link>
            <Nav.Link eventKey={4} as={Link} to="/admin/manufactors">Производители</Nav.Link>
            <Nav.Link eventKey={5} as={Link} to="/admin/products" className="align-items-center">Продукты</Nav.Link>
            <Nav.Link
              eventKey={6}
              as={Link}
              to=""
              onClick={() => authService.signOut().then(response => {
                if (response.ok)
                  navigate("/");
              })}
            >
              Выйти
              <BiLogOut size={"2rem"} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}