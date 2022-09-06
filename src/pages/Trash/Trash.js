import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersTrash } from "../../app/rootSaga";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteUsers, getIdListToRestore } from "../../redux/Users/UsersSlice";

export default function Trash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState([]);

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
            onClick={(event) => {
              // handleClick(event, cellValues);
              navigate(`/userdetail/${cellValues.id}`);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  const { usersListTrash } = useSelector(
    (rootReducer) => rootReducer.getUsersListTrash
  );

  //User login account
  const userData = JSON.parse(localStorage.getItem("User"));

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getAllUsersTrash());
  }, []);

  const handleRestore = () => {
    dispatch(getIdListToRestore(selectionModel));
  };

  const handleDelete = () => {
    dispatch(deleteUsers(selectionModel));
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
            <Typography variant="h5">Trash List</Typography>
            <Stack direction="row" spacing={1}>
              <Box sx={{ position: "relative" }}>
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  onClick={handleRestore}
                >
                  RESTORE
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
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  DELETE
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
              rows={usersListTrash}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              pagination
              loading={isLoading}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              {...columns}
            />
          </Box>
        </Box>
      ) : (
        <Box>Only administrators are allowed to use this site</Box>
      )}
    </Box>
  );
}
