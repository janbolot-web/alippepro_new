import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../axios";

export const fetchAllCourses = createAsyncThunk(
  "course/fetchAllCourses",
  async function () {
    try {
      const data = await axios
        .get("/getAllCourses")
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCourse = createAsyncThunk(
  "course/fetchCourse",
  async function (id) {
    try {
      const data = await axios
        .get("/getCourse/" + id)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLessons = createAsyncThunk(
  "course/fetchLessons",
  async function ({ id, userId }) {
    try {
      const data = await axios
        .get("/getLessons/" + id + "?userId=" + userId)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLesson = createAsyncThunk(
  "course/fetchLesson",
  async function (params) {
    console.log(params);
    try {
      const data = await axios
        .get("/getLesson/" + params.courseId + "?idLesson=" + params.lessonId)
        .then((res) => res.data)
        .then((data) => data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchModules = createAsyncThunk(
  "course/fetchModules",
  async function (id) {
    try {
      const data = await axios
        .get("/getModules/" + id)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchModule = createAsyncThunk(
  "course/fetchModule",
  async function (params) {
    console.log(params);
    try {
      const data = await axios
        .get("/getModule/" + params.courseId + "?moduleId=" + params.moduleId)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courese/createCourse",
  async function (params) {
    try {
      await axios
        .post("/createCourse", params)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courese/deleteCourse",
  async function (id) {
    try {
      await axios
        .delete(`/deleteCourse/${id}`)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const deleteModule = createAsyncThunk(
  "courese/deleteModule",
  async function ({ moduleId, id }) {
    try {
      await axios
        .delete(`/deleteModule/${id}?moduleId=${moduleId}`)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
      return moduleId;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const createModule = createAsyncThunk(
  "courese/createModule",
  async function (params) {
    try {
      await axios
        .patch(`/createModule/${params.id}`, params)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    courseDetail: null,
    lessons: null,
    lesson: null,
    modules: null,
    module: null,
    status: "",
    error: null,
  },
  reducers: {
    removeLesson: (state) => {
      state.lesson = null;
    },
    clearModules: (state) => {
      state.modules = null;
    },
  },
  extraReducers: {
    [fetchAllCourses.pending]: (state, action) => {
      state.status = "loading";
      state.courses = null;
    },
    [fetchAllCourses.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courses = action.payload;
    },
    [fetchAllCourses.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchCourse.pending]: (state, action) => {
      state.status = "loading";
      state.courseDetail = null;
    },
    [fetchCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courseDetail = action.payload;
    },
    [fetchCourse.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchLessons.pending]: (state, action) => {
      state.status = "loading";
      state.lessons = null;
    },
    [fetchLessons.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.lessons = action.payload;
    },
    [fetchLessons.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchLesson.pending]: (state, action) => {
      state.status = "loading";
      state.lesson = null;
    },
    [fetchLesson.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.lesson = action.payload;
    },
    [fetchLesson.rejected]: (state, action) => {
      state.status = "error";
    },
    [createCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [createCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
    },
    [createCourse.rejected]: (state, action) => {
      state.status = "error";
    },
    [deleteCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
      // courses.filter((course) => course.id !== action.payload);
    },
    [deleteCourse.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchModules.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchModules.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.modules = action.payload;
    },
    [fetchModules.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchModule.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchModule.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.module = action.payload;
    },
    [fetchModule.rejected]: (state, action) => {
      state.status = "error";
    },
    [createModule.pending]: (state, action) => {
      state.status = "loading";
    },
    [createModule.fulfilled]: (state, action) => {
      state.status = "loaded";
    },
    [createModule.rejected]: (state, action) => {
      state.status = "error";
    },
    [deleteModule.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteModule.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.modules = state.modules.filter(
        (course) => course._id !== action.payload
      );
      // courses.filter((course) => course.id !== action.payload);
    },
    [deleteModule.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const courseReducer = courseSlice.reducer;

export const { removeLesson, clearModules } = courseSlice.actions;
