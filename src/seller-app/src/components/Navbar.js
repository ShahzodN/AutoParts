import { Container, Nav, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export function TopNavbar() {

  const navigate = useNavigate();

  return (
    <Container>
      <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand as={Link} to="/">Главная</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link eventKey={1} as={Link} to="/history" className="align-items-center">История продаж</Nav.Link>
            <Nav.Link
              eventKey={2}
              as={Link}
              to="/signin"
              onClick={() => {
                authService.signOut();
              }}
            >
              Выйти
              <BiLogOut size={32} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}