import { createSlice } from "@reduxjs/toolkit";
import { usersSlice } from "../Users/UsersSlice";

const initialState = {
  projectId: "",
  projectsList: [],
  projectById: {},
};

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    getProjectId: (state, action) => {},
    getProjectsList: (state, action) => {
      state.projectsList = action.payload;
    },
    getProjectById: (state, action) => {
      state.projectById = action.payload;
    },
  },
});

export const { getProjectId, getProjectsList, getProjectById } =
  projectsSlice.actions;

export default projectsSlice.reducer;
