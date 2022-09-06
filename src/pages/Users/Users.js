import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ChangeMode from "../../component/ChangeMode/ChangeMode";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  getUsersList,
  postUsersList,
  moveUsersToTrash,
  getUsersListById,
  getIdBlogList,
} from "../../redux/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../util/config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllUsers } from "../../app/rootSaga";
import { selectTranslationsUsersList } from "../../redux/ChangeLanguage/ChangeLanguageSlice";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectionModel, setSelectionModel] = useState([]);

  const translationsUsersList = useSelector(selectTranslationsUsersList);

  const columns = [
    { field: "userID", headerName: "User ID", width: 100 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "password", headerName: "Password", width: 150 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: " ",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            // onClick={(event) => {
            //   // handleClick(event, cellValues);
            //   navigate(`/userdetail/${cellValues.id}`);
            // }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/userdetail/${cellValues.id}`}
            >
              View
            </Link>
          </Button>
        );
      },
    },
  ];

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  //User login account
  const userData = JSON.parse(localStorage.getItem("User"));

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDelete = () => {
    dispatch(moveUsersToTrash(selectionModel));
    dispatch(getIdBlogList(selectionModel));
  };

  return (
    <Box>
      {userData?.role === "Admin" ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Users List</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/adduser")}
              >
                ADD
              </Button>

              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  MOVE TO TRASH
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
            </Stack>
          </Box>
          <Box sx={{ height: 400, width: "100%", mt: 3 }}>
            <DataGrid
              rows={usersList}
              columns={translationsUsersList}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              pagination
              loading={isLoading}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              {...translationsUsersList}
            />
          </Box>
        </Box>
      ) : (
        <Box>Only administrators are allowed to use this site</Box>
      )}
    </Box>
  );
}
