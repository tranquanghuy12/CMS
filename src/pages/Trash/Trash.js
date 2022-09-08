import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersTrash } from "../../app/rootSaga";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { deleteUsers, getIdListToRestore } from "../../redux/Users/UsersSlice";
import swal from "sweetalert";
import { selectTranslationsUsersList } from "../../redux/ChangeLanguage/ChangeLanguageSlice";

export default function Trash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectionModel, setSelectionModel] = useState([]);

  //including 2 languages for the trash table
  const translationsUsersList = useSelector(selectTranslationsUsersList);

  const { mode } = useSelector((rootReducer) => rootReducer.changeMode);

  // lang = 'en' or 'vi'
  const { lang } = useSelector((rootReducer) => rootReducer.i18n);

  // const columns = [
  //   { field: "userID", headerName: "User ID", width: 100 },
  //   { field: "firstName", headerName: "First name", width: 150 },
  //   { field: "lastName", headerName: "Last name", width: 150 },
  //   { field: "email", headerName: "Email", width: 250 },
  //   { field: "password", headerName: "Password", width: 150 },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 200,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  //   {
  //     field: " ",
  //     width: 200,
  //     renderCell: (cellValues) => {
  //       return (
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={(event) => {
  //             // handleClick(event, cellValues);
  //             navigate(`/userdetail/${cellValues.id}`);
  //           }}
  //         >
  //           View
  //         </Button>
  //       );
  //     },
  //   },
  // ];

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
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to restore it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUsers(selectionModel));
        swal("Delete users successfully!", {
          icon: "success",
        });
      }
    });
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
            <Typography variant="h5">
              {lang === "en" ? "Trash" : "Thùng rác"}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box sx={{ position: "relative" }}>
                {selectionModel.length !== 0 ? (
                  <Tooltip
                    title={lang === "en" ? "Restore" : "Khôi phục"}
                    arrow
                  >
                    <IconButton
                      disabled={isLoading}
                      variant="contained"
                      color="primary"
                      onClick={handleRestore}
                    >
                      <RestoreFromTrashIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton disabled={true} variant="contained">
                    <RestoreFromTrashIcon />
                  </IconButton>
                )}

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
                {selectionModel.length !== 0 ? (
                  <Tooltip title={lang === "en" ? "Delete" : "Xóa"} arrow>
                    <IconButton
                      disabled={isLoading}
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton disabled={true} variant="contained">
                    <DeleteForeverIcon />
                  </IconButton>
                )}

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
              sx={{
                backgroundColor: `${mode === "light" ? "white" : "#424242"}`,
              }}
            />
          </Box>
        </Box>
      ) : userData?.role === "Member" ? (
        <Box>Only admins are allowed to use this site</Box>
      ) : (
        <Box>
          Please <Link to="/login">login</Link> to use this site
        </Box>
      )}
    </Box>
  );
}
