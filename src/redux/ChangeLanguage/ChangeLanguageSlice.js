import { createSlice } from "@reduxjs/toolkit";
import { defaultLang, supportedLangs } from "./i18nConfig";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const initialState = {
  lang: defaultLang, // "en" when app loads
  supportedLangs: { ...supportedLangs },
  // We'll keep our translations in Redux to start.
  // Later on we'll move them to their own files so
  // that they're easier to manage.
  translationsSideBar: {
    en: [
      {
        name: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Team Members",
        path: "/users",
        icon: <GroupIcon />,
      },
      {
        name: "Projects",
        path: "/projects",
        icon: <FolderIcon />,
      },
      {
        name: "About Us",
        path: "/about",
        icon: <InfoIcon />,
      },
      {
        name: "Trash",
        path: "/trash",
        icon: <DeleteOutlineIcon />,
      },
    ],
    vi: [
      {
        name: "Bảng tin",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Thành viên",
        path: "/users",
        icon: <GroupIcon />,
      },
      {
        name: "Dự án",
        path: "/projects",
        icon: <FolderIcon />,
      },
      {
        name: "Giới thiệu",
        path: "/about",
        icon: <InfoIcon />,
      },
      {
        name: "Thùng rác",
        path: "/trash",
        icon: <DeleteOutlineIcon />,
      },
    ],
  },
  translationsUsersList: {
    en: [
      { field: "userId", headerName: "User ID", width: 100 },
      { field: "firstName", headerName: "First name", width: 150 },
      { field: "lastName", headerName: "Last name", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "password", headerName: "Password", width: 150 },
      { field: "role", headerName: "Role", width: 150 },
      {
        field: " ",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button variant="contained" color="primary">
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
    ],
    vi: [
      { field: "userId", headerName: "ID người dùng", width: 100 },
      { field: "firstName", headerName: "Tên", width: 150 },
      { field: "lastName", headerName: "Họ", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "password", headerName: "Mật khẩu", width: 150 },
      { field: "role", headerName: "Vai trò", width: 150 },
      {
        field: " ",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button variant="contained" color="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/userdetail/${cellValues.id}`}
              >
                Chi tiết
              </Link>
            </Button>
          );
        },
      },
    ],
  },
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const selectTranslationsSideBar = (state) =>
  state.i18n.translationsSideBar[state.i18n.lang];

export const selectTranslationsUsersList = (state) =>
  state.i18n.translationsUsersList[state.i18n.lang];

export const { setLang } = i18nSlice.actions;

export default i18nSlice.reducer;
