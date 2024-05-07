import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { LandingPage, HomePage, LoginPage, RegisterPage, RecordingListPage } from "./modules";
import { Navbar } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/recordings",
        element: <RecordingListPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function NavbarWrapper() {
  return (
    <div className="min-h-screen flex flex-col gap-2 w-full items-center">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
