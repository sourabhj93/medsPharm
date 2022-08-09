import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/new_logo.jpg";
import QR from "../../assets/images/QRs.jpg";
import "./NavBar.css";

function NavBars() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid ms-4">
        <Navbar.Brand>
          <img
            src={logo}
            onClick={() => navigate("/")}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ cursor: "pointer" }}
          />
        </Navbar.Brand>
        <Navbar.Brand
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "dark blue",
            marginLeft: -10,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Arihant Medical Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              style={{
                color: "teal",
                fontFamily: "serif",
                width: "92%",
                cursor: "not-allowed",
              }}
              title="Contact Us"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Monospace",
                  cursor: "not-allowed",
                }}
              >
                <a href="tel:8817761119">+91 8817761119</a>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              style={{
                color: "teal",
                fontFamily: "serif",
                width: "92%",
                cursor: "not-allowed",
              }}
              title="Payment using QR"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <img
                  src={QR}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                  alt="QR scanner"
                />
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              style={{
                color: "teal",
                fontFamily: "serif",
                width: "92%",
                cursor: "not-allowed",
              }}
              title="Terms & Condition"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Serif",
                  whiteSpace: "normal",
                }}
              >
                Free delivery above 500&#8377;/- only for medicines.
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Serif",
                  whiteSpace: "normal",
                }}
              >
                Less than 500&#8377;/- delivery charge 50&#8377;/-
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Serif",
                  whiteSpace: "normal",
                }}
              >
                For FMCG product delivery charge 50&#8377;/-
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Serif",
                  whiteSpace: "normal",
                }}
              >
                For NRx and H1 drugs doctor's prescription is must.
              </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  color: "teal",
                  fontFamily: "Serif",
                  whiteSpace: "normal",
                }}
              >
                No exchange and return of products.
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBars;
