import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Tooltip from "@mui/material/Tooltip";
import { ProgressSpinner } from "primereact/progressspinner";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./CustomerDetail.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SimpleSnackbar } from "../common/Snackbar/FabIntegrationSnackbar";

const CustomerDetail = () => {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const uploadedFileRef = useRef();
  const navigate = useNavigate();
  const subtitle = (
    <em>Please upload prescription along with some basic details of yours</em>
  );

  const sendCustomerDetails = (e) => {
    if (mobileNumber.startsWith(0)) alert("Mobile number cannot start with 0");
    else if (!(mobileNumber.length === 10))
      alert("Please provide 10 digit mobile number");
    else if (!address) alert("Please provide your address");
    else if (!(mobileNumber && address && uploadedFile))
      alert("Please provide value for all the inputs");
    else submit(e);
  };

  const submit = (e) => {
    const customerInput = new FormData();
    const customerInfo = {
      customerName,
      mobileNumber,
      address,
      description,
    };
    customerInput.append("file", uploadedFile);
    customerInput.append("customerInfo", JSON.stringify(customerInfo));
    let url = "https://medspharmabe.herokuapp.com/sendEmail";
    setSpinner(true);
    axios
      .post(url, customerInput, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSpinner(false);
        if (res?.status === 200) setSuccess(true);
        else setError(true);
        setIsDisable(true);
        resetForm();
      })
      .catch((err) => {
        setSpinner(false);
        setError(true);
        setIsDisable(true);
        setSuccess(false);
        setUploadedFile(null);
      });
  };

  const errorSnackbar = () => {
    return (
      <SimpleSnackbar
        snackBarProps={{
          alert: false,
          message:
            "Sorry!!! something wrong happened. Please try again after sometime",
          severity: "error",
          duration: "4000",
        }}
      />
    );
  };

  const successSnackbar = () => {
    return (
      <SimpleSnackbar
        snackBarProps={{
          alert: false,
          message:
            "We have received your prescription will reach out to you on mentioned mobile number asap",
          succesMsg: "Thanks for reaching out to us.",
          severity: "success",
          duration: "4000",
        }}
      />
    );
  };

  const resetForm = () => {
    setCustomerName("");
    setMobileNumber("");
    setAddress("");
    setDescription("");
    setUploadedFile(null);
    uploadedFileRef.current !== null && (uploadedFileRef.current.value = null);
  };

  const header = (
    <h2 className="pt-4 mb-n1 headerName">Prescription Details</h2>
  );
  const footer = (
    <span>
      <Button
        label="Save"
        icon="pi pi-check"
        className="me-2"
        onClick={sendCustomerDetails}
      />
      <Button
        label="Reset"
        icon="pi pi-undo"
        className="p-button-secondary"
        onClick={resetForm}
      />
    </span>
  );

  return (
    <Container className="mt-2 mb-3">
      {spinner ? (
        <ProgressSpinner className="spinner" />
      ) : (
        <>
          <Typography
            variant="body1"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosIcon style={{ color: "white" }} />{" "}
            <Typography
              variant="caption"
              style={{
                fontSize: 20,
                color: "whitesmoke",
                position: "relative",
                top: 4,
                left: -4,
              }}
            >
              Back
            </Typography>
          </Typography>
          <Card
            subTitle={subtitle}
            className="mb-3 card-container"
            footer={footer}
            header={header}
          >
            {error && errorSnackbar()}
            {success && successSnackbar()}
            <Row className="mb-3">
              <Col md={12} sm={12} className="mb-1">
                <strong htmlFor="customerName">Customer Name *</strong>
              </Col>
              <Col md={12} sm={12}>
                <InputText
                  id="customerName"
                  className="w-100"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} sm={12} className="mb-1">
                <strong htmlFor="mobileNumber">Mobile No. *</strong>
              </Col>
              <Col md={12} sm={12}>
                <InputText
                  minLength={10}
                  maxLength={10}
                  id="mobileNumber"
                  className="w-100"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} sm={12} className="mb-1">
                <strong htmlFor="address">Address *</strong>
              </Col>
              <Col md={12} sm={12}>
                <InputTextarea
                  className="w-100"
                  value={address}
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoResize
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} sm={12} className="mb-1">
                <strong htmlFor="description">
                  Additional information for chemist
                </strong>
                <Tooltip title="Please provide additional details for chemist if you want something else from prescription">
                  <Button className="btn-tooltip">i</Button>
                </Tooltip>
              </Col>
              <Col md={12} sm={12}>
                <InputTextarea
                  className="w-100"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  autoResize
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} sm={12} className="mb-1">
                <strong htmlFor="prescription">Upload Prescription *</strong>
              </Col>
              <Col md={12} sm={12}>
                <input
                  type="file"
                  className="form-control"
                  name="upload_file"
                  ref={uploadedFileRef}
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </Col>
            </Row>
          </Card>
        </>
      )}
    </Container>
  );
};

export default CustomerDetail;
