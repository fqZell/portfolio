import React from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import Root from "../pages/Root";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectPage from "../pages/ProjectPage";
import CalculatorPage from "../pages/CalculatorPage";
import AddProject from "../components/addProject/AddProject";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка страницы вверх при изменении маршрута
  }, [pathname]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
        <ScrollToTop /> {/* Добавляем компонент ScrollToTop внутри маршрутов */}
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/project/:id",
        element: <ProjectPage />,
      },
      {
        path: "/calculator",
        element: <CalculatorPage />,
      },
      {
        path: "/addProject",
        element: <AddProject />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;