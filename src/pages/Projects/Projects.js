import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../app/rootSaga";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectsList } = useSelector(
    (rootReducer) => rootReducer.getProjectsList
  );

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const handleChange = (event) => {
    console.log(event.target.checked);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5">Projects List</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Add project" arrow>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/addproject")}
            >
              <CreateNewFolderIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box
        sx={{
          minWidth: 275,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {projectsList.map((project, index) => {
          return (
            <Card
              sx={{ mb: 3, mr: 3, width: "30%" }}
              variant="outlined"
              key={index}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Checkbox
                    onClick={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Box>
                <Typography variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {project.member.length}{" "}
                  {project.member.length > 1 ? "members" : "member"}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View detail
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
