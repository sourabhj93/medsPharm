import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import TextField from "@mui/material/TextField";
import { ProgressSpinner } from "primereact/progressspinner";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./CustomerDetail.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SimpleSnackbar } from "../common/Snackbar/FabIntegrationSnackbar";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const CustomerDetail = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const uploadedFileRef = useRef();
  const navigate = useNavigate();
  const name = /^[a-zA-Z ]*$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const supportedFormat = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];
  const subtitle = (
    <em>Please upload prescription along with some basic details of yours</em>
  );
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
  const header = (
    <h2 className="pt-4 mb-n1 headerName">Prescription Details</h2>
  );
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

  const validationSchema = yup.object({
    customerName: yup
      .string("Enter your name")
      .matches(name, "Please enter valid name")
      .required("Name is required"),
    mobileNumber: yup
      .string("Enter your number")
      .matches(phoneRegExp, "Please enter valid phone number")
      .min(10, "Mobile number should be of 10 characters length")
      .max(10, "Mobile number should be of 10 characters length")
      .required("Number is required"),
    address: yup.string("Enter your address").required("Address is required"),
    description: yup.string("Enter your description"),
    file: yup
      .mixed()
      .nullable()
      .required("Please upload prescription")
      .test(
        "FILE_SIZE",
        "Uploaded file is too big",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "FILE_FORMAT",
        "Uploaded file is not supported. Please upload pdf or image",
        (value) => !value || (value && supportedFormat.includes(value?.type))
      ),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues: {
      customerName: "",
      mobileNumber: "",
      address: "",
      description: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }, isValid) => {
      // alert(JSON.stringify(values, null, 2));
      submit(values);
      resetForm({ values: "" });
    },
  });

  const submit = ({
    customerName,
    mobileNumber,
    address,
    description,
    file,
  }) => {
    const customerInput = new FormData();
    const customerInfo = {
      customerName,
      mobileNumber,
      address,
      description,
    };
    customerInput.append("file", file);
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
      })
      .catch((err) => {
        setSpinner(false);
        setError(true);
        setSuccess(false);
      });
  };

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
            header={header}
          >
            {error && errorSnackbar()}
            {success && successSnackbar()}
            <form onSubmit={handleSubmit}>
              <Box
                component="div"
                style={{ borderRadius: 8, backgroundColor: "whitesmoke" }}
              >
                <Stack direction="row" mx={3} pt={3} mb={3}>
                  <TextField
                    required
                    fullWidth
                    id="customerName"
                    name="customerName"
                    label="Customer Name"
                    value={values.customerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.customerName && Boolean(errors.customerName)}
                    helperText={touched.customerName && errors.customerName}
                  />
                </Stack>
                <Stack direction="row" mx={3} mb={3}>
                  <TextField
                    required
                    fullWidth
                    id="mobileNumber"
                    name="mobileNumber"
                    label="Mobile Number"
                    type="mobileNumber"
                    value={values.mobileNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                  />
                </Stack>
                <Stack direction="row" mx={3} mb={3}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    id="address"
                    name="address"
                    label="Address"
                    type="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
                <Stack direction="row" mx={3} mb={3}>
                  <TextField
                    fullWidth
                    multiline
                    id="description"
                    name="description"
                    label="Description for chemist"
                    type="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>
                <Stack direction="row" mx={3} mb={1}>
                  <strong htmlFor="prescription">Upload Prescription *</strong>
                </Stack>
                <Stack direction="row" mx={3} mb={1}>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    ref={uploadedFileRef}
                    onChange={(e) => setFieldValue("file", e.target.files[0])}
                  />
                </Stack>
                {touched.file && Boolean(errors.file) && (
                  <Stack direction="row" mx={3}>
                    {errors.file}
                  </Stack>
                )}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  mx={3}
                  mb={2}
                  pb={3}
                  pt={2}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!(isValid && dirty)}
                    startIcon={<SaveIcon />}
                  >
                    Submit
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      marginTop: { xs: 2, sm: 0 },
                      marginLeft: { sm: 2, xs: 0 },
                    }}
                    variant="contained"
                    startIcon={<RestartAltIcon />}
                    type="button"
                  >
                    Reset
                  </Button>
                </Stack>
              </Box>
            </form>
          </Card>
        </>
      )}
    </Container>
  );
};

export default CustomerDetail;
