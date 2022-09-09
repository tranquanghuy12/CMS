import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProjectId } from "../../redux/Projects/ProjectsSlice";

export default function BasicTextFields() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { projectById } = useSelector(
    (rootReducer) => rootReducer.getProjectById
  );

  useEffect(() => {
    dispatch(getProjectId(id));
  }, [id]);

  return (
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
              id="standard-basic"
              variant="standard"
              label="Project name"
              multiline
              rows={1}
              defaultValue={projectById.name}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              defaultValue={projectById.description}
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>Add user into project</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
