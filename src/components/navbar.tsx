import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarPage() {
  return (
    <div>
      <Navbar bg="primary" expand="md">
        <Container>
          <Navbar.Brand href="#home" className="text-dark h1">
            Sissors{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/history">
                  History
                </Nav.Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
