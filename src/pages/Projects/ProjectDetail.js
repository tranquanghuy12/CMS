import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import {
  getProjectId,
  updateProject,
} from "../../redux/Projects/ProjectsSlice";
import { getAllUsers } from "../../app/rootSaga";
import swal from "sweetalert";

export default function BasicTextFields() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const { projectById } = useSelector(
    (rootReducer) => rootReducer.getProjectById
  );

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getProjectId(id));
  }, [id]);

  const initialValues = {
    name: projectById?.name,
    description: projectById?.description,
    member: projectById?.member,
  };

  const handleSubmit = (values) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to restore it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          updateProject({
            ...projectById,
            name: values.name,
            description: values.description,
          })
        );
        swal({
          title: "Update successfully!",
          icon: "success",
        });
      }
    });
  };

  const handleChange = (event, values) => {
    console.log(values);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <Box>
              <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
                Detail of project {projectById.projectId}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="name"
                      variant="standard"
                      label="Project name"
                      multiline
                      rows={1}
                      defaultValue={projectById.name}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      defaultValue={projectById.description}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add user
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add user</DialogTitle>
                    <DialogContent>
                      <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={usersList}
                          getOptionLabel={(option) =>
                            option.firstName + " " + option.lastName
                          }
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose who you want to add"
                              placeholder="User name"
                              variant="standard"
                              name="member"
                            />
                          )}
                          onChange={handleChange}
                        />
                      </Stack>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

                <Button type="submit">Update</Button>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
