import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/AboutPage";
import AddLessonPage from "./pages/AddLessonPage";
import AdminPanel from "./pages/AdminPanel";
import BuyPage from "./pages/BuyPage";
import CoursesPage from "./pages/CoursesPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Otzyvy from "./pages/Otzuvy";
import PersonalPage from "./pages/PersonalPage";
import RegistrationPage from "./pages/RegistrationPage";
import VideoPage from "./pages/VideoPage";
import { selectIsAuth } from "./store/slices/auth";

const useRoutes = () => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth === "ADMIN") {
    console.log(true);
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/createLesson/:id" element={<AddLessonPage />} />
        <Route path="/login" element={<Navigate to="/adminPanel" replace />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/otzuvy" element={<Otzyvy />} />
      </Routes>
    );
  } else if (isAuth === "USER") {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/adminPanel" element={<VideoPage />} />
        <Route path="/buyCourse/:id" element={<BuyPage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/otzuvy" element={<Otzyvy />} />
      </Routes>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/adminPanel" element={<Navigate to="/" replace />} /> */}
        <Route path="/about-us" element={<About />} />
        <Route path="/otzuvy" element={<Otzyvy />} />
      </Routes>
    </div>
  );
};

export default useRoutes;
