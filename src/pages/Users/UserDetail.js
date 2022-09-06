import React, { useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIdBlog } from "../../redux/Users/UsersSlice";
import { getUserById } from "../../redux/Users/UsersSlice";

export default function UserDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userById } = useSelector((rootReducer) => rootReducer.getUserById);

  const { mode } = useSelector((rootReducer) => rootReducer.changeMode);

  useEffect(() => {
    dispatch(getIdBlog(id));
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div
      className={`container rounded ${
        mode === "light" ? "bg-white" : "bg-dark"
      }`}
    >
      <div className="row">
        <div className="d-flex justify-content-center align-items-center col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            {/* <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            /> */}
            <Avatar
              alt="Remy Sharp"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              sx={{ width: 150, height: 150, mb: 3 }}
            />

            <span className="font-weight-bold">
              {userById.firstName} {userById.lastName}
            </span>
            <span
              className={`${
                mode === "light" ? "text-black-50" : "text-white-50"
              }`}
            >
              {userById.email}
            </span>
            <span
              className={`${
                mode === "light" ? "text-black-50" : "text-white-50"
              }`}
            >
              ID: {userById.userID}
            </span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={userById.firstName}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="last name"
                  value={userById.lastName}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                  value={userById.email}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                  value={userById.password}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <h4>Projects</h4>
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Experience in Designing</label>
              <input
                type="text"
                className="form-control"
                placeholder="experience"
                defaultValue
              />
            </div>{" "}
            <br />
            <div className="col-md-12">
              <label className="labels">Additional Details</label>
              <input
                type="text"
                className="form-control"
                placeholder="additional details"
                defaultValue
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Box>
    //   <Box sx={{ height: 150, backgroundColor: "#d6d6d6", borderRadius: 5 }}>
    //     <Stack
    //       direction="row"
    //       spacing={2}
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         position: "relative",
    //         top: "75%",
    //       }}
    //     >
    //       <Avatar
    //         alt="Remy Sharp"
    //         src="/static/images/avatar/1.jpg"
    //         sx={{
    //           width: 86,
    //           height: 86,
    //         }}
    //       />
    //     </Stack>
    //   </Box>
    //   <Typography variant="h4" sx={{ my: 10, textAlign: "center" }}>
    //     {userById.firstName} {userById.lastName}
    //   </Typography>

    //   <Box sx={{ width: "100%" }}>
    //     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //       <Grid item xs={6}>
    //         <Typography variant="h6" sx={{ textAlign: "center" }}>
    //           Profile
    //         </Typography>
    //         <Box
    //           component="form"
    //           sx={{
    //             "& > :not(style)": { m: 1, width: "25ch" },
    //             display: "flex",
    //             justifyContent: "space-evenly",
    //           }}
    //           noValidate
    //           autoComplete="off"
    //         >
    //           <TextField
    //             id="standard-basic"
    //             label="First name"
    //             variant="standard"
    //             value='qwdqwdqwd'
    //           />
    //           <TextField
    //             id="standard-basic"
    //             label="Standard"
    //             variant="standard"
    //           />
    //         </Box>
    //       </Grid>

    //       <Grid item xs={6}>
    //         <Typography variant="h6" sx={{ textAlign: "center" }}>
    //           Project
    //         </Typography>
    //         <Box
    //           component="form"
    //           sx={{
    //             "& > :not(style)": { m: 1, width: "25ch" },
    //           }}
    //           noValidate
    //           autoComplete="off"
    //         >
    //           <TextField
    //             id="standard-basic"
    //             label="Standard"
    //             variant="standard"
    //           />
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Box>
  );
}
