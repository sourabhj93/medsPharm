import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";

const validationSchema = yup.object({
  customerName: yup.string("Enter your name").required("Name is required"),
  mobileNumber: yup
    .string("Enter your number")
    .min(10, "Mobile Number should be of 10 characters length")
    .max(10, "Mobile Number should be of 10 characters length")
    .required("Number is required"),
  address: yup.string("Enter your address").required("Address is required"),
  description: yup.string("Enter your description"),
});

export const Error = () => {
  const { handleSubmit, handleChange, touched, errors, values } = useFormik({
    initialValues: {
      customerName: "",
      mobileNumber: "",
      address: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          component="div"
          sx={{ mt: 12 }}
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
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </Stack>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};
