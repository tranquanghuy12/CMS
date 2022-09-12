import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ChangeMode from "../../component/ChangeMode/ChangeMode";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
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
  const [selectionModel, setSelectionModel] = useState([]);

  //including 2 languages for the users list table
  const translationsUsersList = useSelector(selectTranslationsUsersList);

  const { mode } = useSelector((rootReducer) => rootReducer.changeMode);

  // lang = 'en' or 'vi'
  const { lang } = useSelector((rootReducer) => rootReducer.i18n);

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  //User login account
  const userData = JSON.parse(localStorage.getItem("User"));

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  //dispatch(getAllUsers()) to get usersList
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
            <Typography variant="h5">
              {lang === "en" ? "Users list" : "Danh sách người dùng"}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip
                title={lang === "en" ? "Add user" : "Thêm người dùng"}
                arrow
              >
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/adduser")}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>

              <Box sx={{ m: 1, position: "relative" }}>
                {selectionModel.length !== 0 ? (
                  <Tooltip
                    title={
                      lang === "en" ? "Move to trash" : "Chuyển đến thùng rác"
                    }
                    arrow
                  >
                    <IconButton
                      disabled={isLoading}
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton disabled={true} variant="contained">
                    <DeleteIcon />
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
              isRowSelectable={(params) =>
                params.row.email !== "tranquanghuy12h@gmail.com"
              }
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
