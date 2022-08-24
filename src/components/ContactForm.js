import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, TextField } from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  firstName: yup.string("Enter First Name.").required("Enter First Name.").max(25),
  lastName: yup.string("Enter Last Name.").required("Enter Last Name.").max(25),
  email: yup.string("Enter Email.").required("Enter Email.").email("Enter Valid Email.").max(50),
  message: yup.string("Enter Message.").required("Enter Message.").max(500),
});
const ContactForm = () => {
  const [error, setError] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("http://localhost:5000/contact", values)
        .then((data) => {
          setLoading(false);
          setError({
            type: "success",
            message: "Your message sent successfully.",
          });
        })
        .catch((error) => {
          setLoading(false);
          setError({
            type: "error",
            message: error.message,
          });
          setTimeout(() => {
            setError({ type: "", message: "" });
          }, 5000);
        });
    },
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Box className="contact-form" component="form" onSubmit={formik.handleSubmit} noValidate>
        <h2>Let’s Stay Connected.</h2>
        {error.message && (
          <Alert sx={{ mb: 3 }} severity={error.type}>
            {error.message}
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <TextField
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="dense"
          id="email"
          name="email"
          label="Email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          margin="dense"
          id="message"
          name="message"
          label="Message"
          fullWidth
          value={formik.values.message}
          onChange={formik.handleChange}
          multiline
          rows={5}
        />
        <LoadingButton loadingPosition="end" loading={loading} variant="contained" type="submit" sx={{ mt: 4 }} endIcon={<SendIcon />}>
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ContactForm;
