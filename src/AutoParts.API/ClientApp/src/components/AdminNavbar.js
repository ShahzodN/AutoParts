import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AdminNavbar() {

    return (
        <Container>
            <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand as={Link} to="/admin">Главная</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link eventKey={1} as={Link} to="/admin/employee">Сотрудники</Nav.Link>
                        <Nav.Link eventKey={2} as={Link} to="/admin/delivery-of-goods">Поставки товаров</Nav.Link>
                        <Nav.Link eventKey={3} as={Link} to="/admin/categories">Категория</Nav.Link>
                        <Nav.Link eventKey={4} as={Link} to="/admin/manufactors">Производители</Nav.Link>
                        <Nav.Link eventKey={5} as={Link} to="/admin/products">Продукты</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}