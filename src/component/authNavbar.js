import { useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect } from "react";
function AuthNavbar() {
  const navigate = useNavigate();
  const store = useStore();
  const userStore = store.userStore;
  const user = userStore.user;
  const handleLogout = () => {
    store.logout();
    navigate("/auth/login");
  };
  const navigateToFields = () => {
    navigate("/users/" + store.userId + "/fields");
  };
  const navigateToResponses = () => {
    navigate("/users/" + store.userId + "/answers");
  };
  const navigateToQuestions = () => {
    navigate("/questions");
  };
  const navigateToEditProfile = () => {
    navigate("/users/" + store.userId);
  };
  const navigateToChangePassword = () => {
    navigate("/users/" + store.userId + "/password");
  };
  useEffect(() => userStore.get(store.userId, store.access));
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          LOGO<span className="font-weight-bold text-primary">TYPE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto">
            <Nav.Link onClick={navigateToFields}>Fields</Nav.Link>
            <Nav.Link onClick={navigateToResponses}>Responses</Nav.Link>
            <Nav.Link onClick={navigateToQuestions}>Questions</Nav.Link>
            <NavDropdown
              title={user ? user.name + " " + user.surname : "Loading..."}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={navigateToEditProfile}>
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={navigateToChangePassword}>
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default observer(AuthNavbar);
