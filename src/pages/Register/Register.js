import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import { Schema } from "../../services/Schema";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import { getLoadingOnRefresh } from "../../app/rootSaga";
import { userRegistration } from "../../redux/Register/Register";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getLoadingOnRefresh());
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "member",
  };

  const handleSubmit = (values) => {
    dispatch(userRegistration(values));
    // console.log("values", values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { values, error, touched, isSubmitting } = formikProps;

          return (
            <Form onSubmit={formikProps.handleSubmit}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", pb: 4, pt: 3 }}
                >
                  Register
                </Typography>
              </Box>
              <Grid
                sx={{
                  "& > :not(style)": { mb: 2, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
                container
                spacing={0}
                direction="row"
                alignItems="flex-start"
                justifyContent="space-evenly"
              >
                <Box>
                  <TextField
                    color="primary"
                    required
                    name="firstName"
                    id="outlined-error"
                    label="First name"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage name="firstName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Box>

                <Box>
                  <TextField
                    color="primary"
                    required
                    name="lastName"
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Box>
              </Grid>

              <Grid
                sx={{
                  "& > :not(style)": { width: "50ch" },
                }}
                noValidate
                autoComplete="off"
                container
                spacing={0}
                direction="row"
                justifyContent="space-evenly"
              >
                <Box>
                  <TextField
                    color="primary"
                    required
                    name="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Box>
                <Box>
                  <TextField
                    color="primary"
                    required
                    name="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Box>
              </Grid>

              <Grid
                container
                spacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction="row"
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <ButtonGroup>
                  <Box sx={{ mr: 2, position: "relative" }}>
                    <Button
                      disabled={isLoading}
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Confirm
                    </Button>
                    {isLoading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: blue[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>

                  <Button color="primary" variant="outlined">
                    Clear
                  </Button>
                </ButtonGroup>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
