import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async function (user, { dispatch }) {
    try {
      const data = await axios
        .post(`/auth/login`, user)
        .then((res) => res.data)
        .then((data) => data);
      toast.success(data.message);
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async function (user) {
    try {
      const data = await axios
        .post(`/auth/register`, user)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);
export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async function () {
    const data = await axios
      .get(`/auth/me`)
      .then((res) => res.data)
      .then((data) => data);
    return data;
  }
);

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async function () {
    const data = await axios
      .get(`/getUsers`)
      .then((res) => res.data)
      .then((data) => data);
    return data;
  }
);

export const searchUser = createAsyncThunk(
  "auth/searchUser",
  async function (params) {
    const data = await axios
      .get(`/users/search/${params}`)
      .then((res) => res.data)
      .then((data) => data);
    return data;
  }
);

export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async function (id) {
    const data = await axios
      .get(`/getUserById/${id}`)
      .then((res) => res.data)
      .then((data) => data);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async function (id) {
    try {
      await axios
        .delete(`/removeUser/${id}`)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const addModuleToUser = createAsyncThunk(
  "auth/addModuleToUser",
  async function (params) {
    try {
      const data = await axios
        .patch(`/addCourseToUser`, { params })
        .then((res) => res.data)
        .then((data) => data);
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const removeUserModule = createAsyncThunk(
  "auth/removeUserModule",
  async function (params) {
    console.log(params);
    try {
      await axios
        .delete(`/removeUserModule/${params.moduleId}?userId=${params.userId}`)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
      return params.moduleId;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    users: null,
    user: null,
    status: "",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          token: action.payload.token,
          // role: action.payload.role,
        })
      );
      // state.isAuth = true;
      state.user = action.payload;
      state.status = "resolved";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.users = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.users = null;
    },
    [searchUser.pending]: (state) => {
      state.status = "loading";
      state.users = null;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.users = action.payload;
    },
    [searchUser.rejected]: (state, action) => {
      state.status = "error";
      state.users = null;
    },
    [deleteUser.pending]: (state) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      console.log(action.payload);
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = "error";
    },
    [addModuleToUser.pending]: (state) => {
      state.status = "loading";
    },
    [addModuleToUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      let data = action.payload.module[0];
      data = { ...data, isAccess: false };
      console.log(data);
      state.user.courses = [...state.user.courses, data];
    },
    [addModuleToUser.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchUserById.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.status = "error";
      state.user = null;
    },
    [removeUserModule.pending]: (state) => {
      state.status = "loading";
    },
    [removeUserModule.fulfilled]: (state, action) => {
      state.status = "loaded";
      console.log(action.payload);
      state.user.courses = state.user.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    [removeUserModule.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => state.auth.data?.roles[0];
export const { setUser, logout, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
