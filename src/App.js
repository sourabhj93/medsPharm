import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import { SimpleSnackbar } from "./common/Snackbar/FabIntegrationSnackbar";
import NavBars from "./Components/NavBar/NavBar";
import Animation from "./Components/Animation/Animation";

function App() {
  return (
    <>
      {/* <NavHeader /> */}
      <NavBars />
      <Container className="container-alignment">
        <Animation />
        <SimpleSnackbar
          snackBarProps={{
            alert: true,
            message:
              "Welcome to Dava Ghar Tak. We are looking forward to serve your needs.",
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
