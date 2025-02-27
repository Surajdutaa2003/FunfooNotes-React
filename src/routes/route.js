import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "../components/Login/login";
import RegisterPage from "../components/Register/Registerpage";
import Dashboard from "../components/DashboardContainer/Dashboard";
import Notes from "../components/NotesContainer/Notes";
import Archive from "../components/Archives/Archive";

const DashboardLayout = () => (
  <Dashboard>
    <Outlet />
  </Dashboard>
);

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Notes /> },
      { path: "archive", element: <Archive /> }, // ✅ Archive inside Dashboard
    ],
  },
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
