import {
  put,
  takeEvery,
  all,
  takeLatest,
  take,
  throttle,
  debounce,
  call,
  delay,
} from "redux-saga/effects";
import {
  getIdBlog,
  getUserById,
  getUsersList,
  getUsersListById,
  getUsersListTrash,
  postUsersList,
} from "../redux/Users/UsersSlice";
import { http } from "../util/config";
import swal from "sweetalert";
import { createAction } from "@reduxjs/toolkit";
import { getLoading } from "../redux/Loading/LoadingSlice";
import { useNavigate } from "react-router-dom";

export const getAllUsers = createAction("Users/getAllUsers");
export const getAllUsersTrash = createAction("Users/getAllUsersTrash");
export const getLoadingOnRefresh = createAction("Loading/getLoadingOnRefresh");

function* watchLoadingOnRefresh() {
  yield put(getLoading(true));
  yield put(getLoading(false));
}

// get all users
function* watchGetUsersList() {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, "/blogs");
    yield put(getUsersList(res.data));
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetUserById(action) {
  try {
    const res = yield call(http.get, `/blogs/${action.payload}`);
    yield put(getUserById(res.data));
  } catch (error) {
    console.log(error);
  }
}

// get users by id that are move to trash
function* watchGetUsersMoveToTrash(action) {
  let usersToTrash = [];
  try {
    for (let i in action.payload) {
      const res = yield call(http.get, `/blogs/${action.payload[i]}`);
      usersToTrash.push(res.data);
    }

    // post usersToTrash to trash
    for (let i in usersToTrash) {
      const res = yield call(http.post, "/trash", usersToTrash[i]);
      console.log("res", res.data);
    }
  } catch (error) {
    console.log(error);
  }
}

// get all users in trash
function* watchGetUsersTrash() {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, "/trash");
    yield put(getUsersListTrash(res.data));
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* watchPostUsersList(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.post, "/blogs", action.payload);
    if (res.status === 201) {
      swal({
        title: "Add user successfully",
        icon: "success",
      });
    }
    yield put(getLoading(false));
  } catch (error) {
    swal({
      title: "Add user failed",
      icon: "error",
    });
  }
}

// move to trash
function* watchMoveUsersToTrash(action) {
  try {
    yield put(getLoading(true));
    for (let i in action.payload) {
      const res = yield call(http.delete, `/blogs/${action.payload[i]}`);
    }
    yield put(getLoading(false));
    swal({
      title: "Move to trash successfully",
      icon: "success",
    });

    // re-render Users component
    yield put(getAllUsers());
  } catch (error) {
    swal({
      title: "Move to trash failed",
      icon: "error",
    });
  }
}

// restore from trash
function* watchRestoreUsers(action) {
  try {
    yield put(getLoading(true));
    // post users want to restore to usersList, then delete those users.
    for (let i in action.payload) {
      const res = yield call(http.get, `/trash/${action.payload[i]}`);
      const resToPost = yield call(http.post, "/blogs", res.data);
    }
    for (let i in action.payload) {
      const res = yield call(http.delete, `/trash/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    // re-render Trash component
    yield put(getAllUsersTrash());
    swal({
      title: "Restore user successfully",
      icon: "success",
    });
  } catch (error) {
    swal({
      title: "Restore user failed",
      icon: "error",
    });
  }
}

//delete users from trash
function* watchDeleteUsers(action) {
  try {
    yield put(getLoading(true));
    for (let i in action.payload) {
      const res = yield call(http.delete, `/trash/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    //re-render Trash component
    yield put(getAllUsersTrash());
    swal({
      title: "Delete users successfully",
      icon: "success",
    });
  } catch (error) {
    swal({
      title: "Delete users failed",
      icon: "error",
    });
  }
}

function* watchRegister(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.post, "/blogs", action.payload);
    if (res.status === 201) {
      swal({
        title: "Register successfully",
        icon: "success",
      });
    }
    yield put(getLoading(false));
  } catch (error) {
    swal({
      title: "Registration failed",
      icon: "error",
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(getLoadingOnRefresh, watchLoadingOnRefresh);
  yield takeLatest(getAllUsers, watchGetUsersList);
  yield takeLatest("Users/getIdBlog", watchGetUserById);
  yield takeLatest("Users/getIdBlogList", watchGetUsersMoveToTrash);
  yield takeLatest(getAllUsersTrash, watchGetUsersTrash);
  yield takeLatest("Users/postUsersList", watchPostUsersList);
  yield takeLatest("Users/moveUsersToTrash", watchMoveUsersToTrash);

  yield takeLatest("Users/getIdListToRestore", watchRestoreUsers);
  yield takeLatest("Users/deleteUsers", watchDeleteUsers);

  yield takeLatest("Register/userRegistration", watchRegister);
}
