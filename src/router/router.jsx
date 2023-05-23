import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import SingleProjectPage from "../pages/singleProjectPage";

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
                element: <SingleProjectPage />,
            },
        ]
    }
])

export default router;