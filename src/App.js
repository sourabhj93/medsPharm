import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { NavHeader } from "./NavHeader/NavHeader";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import { SimpleSnackbar } from "./common/Snackbar/FabIntegrationSnackbar";
import { Error } from "./Components/Error/Error";
import BasicExample from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      {/* <NavHeader /> */}
      <BasicExample />
      <Container className="container-alignment">
        <SimpleSnackbar
          snackBarProps={{
            alert: true,
            message:
              "Welcome to MedsPharm%. We are looking forward to serve your needs.",
            duration: "3500",
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="prescription" element={<CustomerDetail />} />
          <Route path="*" element={<CustomerDetail />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
