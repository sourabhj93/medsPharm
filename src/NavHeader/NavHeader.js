import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/appLogo.jpg";

export const NavHeader = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" fixed="top">
      <Container fluid>
        <Row>
          <Col>
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                onClick={() => navigate("/")}
                className="d-inline-block align-top ms-3"
                alt="React Bootstrap logo"
                style={{ cursor: "pointer" }}
              />
            </Navbar.Brand>
          </Col>
          <Col
            style={{
              fontSize: "24px",
              fontWeight: 700,
              fontFamily: "sans-serif",
              color: "teal",
              marginLeft: -32,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            MedsPharm%
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
