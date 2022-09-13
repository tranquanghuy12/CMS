import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllProjects,
  getLoadingOnRefresh,
  postProject,
} from "../../app/rootSaga";
import swal from "sweetalert";

export default function AddProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectsList } = useSelector(
    (rootReducer) => rootReducer.getProjectsList
  );

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  const initialValues = {
    name: "",
    description: "",
  };

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getLoadingOnRefresh());
  }, []);

  const handleSubmit = async (values) => {
    //find project in projectsList has the same name as the name entered in the form
    const projectData = projectsList.find(
      (project) => project.name === values.name
    );

    if (projectData) {
      swal({
        title: "Project name already exists!",
        icon: "error",
      });
    } else {
      try {
        await dispatch(postProject(values));
        navigate("/projects");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => {
          const { values, error, touched } = formikProps;
          return (
            <Form onSubmit={formikProps.handleSubmit}>
              <Container component="main" maxWidth="sm">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <PersonAddAltIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Add user
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Project name"
                          name="name"
                          autoComplete="name"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                        <ErrorMessage name="email">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="description"
                          label="Description"
                          id="description"
                          autoComplete="description"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                        <ErrorMessage name="password">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      </Grid>
                    </Grid>

                    <Box sx={{ position: "relative" }}>
                      <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Comfirm
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
                  </Box>
                </Box>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
