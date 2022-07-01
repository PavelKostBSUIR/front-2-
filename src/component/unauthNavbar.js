import { useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import { Navbar, Container, Nav, Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
function UnauthNavbar() {
  const navigate = useNavigate();
  const navigateToQuestions = () => {
    navigate("/questions");
  };
  const navigateToLogin = () => {
    navigate("/auth/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          LOGO<span className="text-primary">TYPE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto">
            <Nav.Link onClick={navigateToQuestions}>Questions</Nav.Link>
            <Nav.Link onClick={navigateToLogin}>Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default observer(UnauthNavbar);
