import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import {
  getProjectId,
  updateProject,
} from "../../redux/Projects/ProjectsSlice";
import { getAllProjects, getAllUsers } from "../../app/rootSaga";
import swal from "sweetalert";

//remove in array 1 the elements that are the same as the elements in array 2
function removeDup(arr1, arr2) {
  arr1 = arr1?.filter(
    (item) => !arr2?.find((item2) => item2.userId === item.userId)
  );
  return arr1;
}

export default function BasicTextFields() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [usersAddToProject, setUsersAddToProject] = useState([]);

  const { projectById } = useSelector(
    (rootReducer) => rootReducer.getProjectById
  );

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getProjectId(id));
  }, [id]);

  const initialValues = {
    name: projectById.name,
    description: projectById.description,
  };

  const handleSubmit = (values) => {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to restore it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await dispatch(
            updateProject({
              ...projectById,
              name: values.name === undefined ? projectById.name : values.name,
              member: projectById?.member.concat(usersAddToProject),
              description:
                values.description === undefined
                  ? projectById.description
                  : values.description,
            })
          );
          setUsersAddToProject([]);
          dispatch(getAllProjects());
          swal({
            title: "Update successfully!",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleChange = (event, values) => {
    setUsersAddToProject(values);
  };

  const handleClick = (user) => {
    navigate(`/userdetail/${user.id}`);
  };

  const delUsersInProject = (e, value) => {
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
            member: projectById?.member.filter(
              (mem) => mem.userId !== value.userId
            ),
          })
        );
        swal({
          title: "Member removed from the project successfully!",
          icon: "success",
        });
      }
    });
  };

  const delUsersAddToProject = (e, value) => {
    setUsersAddToProject(
      usersAddToProject.filter((mem) => mem.userId !== value.userId)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
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
                      value={formikProps.values.name}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={formikProps.values.description}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Box>

                  {/* users in project */}
                  <Stack direction="row" spacing={1}>
                    {projectById.member?.map((user, index) => {
                      return (
                        <Chip
                          key={index}
                          color="primary"
                          label={user.firstName + ", " + user.lastName}
                          onClick={() => handleClick(user)}
                          onDelete={(e) => delUsersInProject(e, user)}
                        />
                      );
                    })}
                    {/* user want to add to project */}
                    {usersAddToProject !== []
                      ? usersAddToProject.map((user, index) => {
                          return (
                            <Chip
                              key={index}
                              label={user.firstName + ", " + user.lastName}
                              onClick={handleClick}
                              onDelete={(e) => delUsersAddToProject(e, user)}
                            />
                          );
                        })
                      : null}
                  </Stack>
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
                          options={removeDup(usersList, projectById.member)}
                          getOptionLabel={(option) =>
                            option.firstName + " " + option.lastName
                          }
                          value={usersAddToProject}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose who you want to add"
                              placeholder="User name"
                              variant="standard"
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
