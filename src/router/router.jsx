import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectPage from "../pages/ProjectPage";
import CalculatorPage from "../pages/CalculatorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/projects",
                element: <ProjectsPage />
            },
            {
                path: "/project/:id",
                element: <ProjectPage />
            },
            {
                path: "/calculator",
                element: <CalculatorPage />
            },
        ]
    }
])

export default router;