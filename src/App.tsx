import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  HomePage,
  LoginPage,
  RegisterPage,
  RecordingListPage,
  CapturePage,
  TesPage
} from "./modules";
import { Navbar } from "./components";
import ToggleTheme from "./components/common/ToggleTheme";

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
      {
        path: "/capture",
        element: <CapturePage />,
      },
      {
        path: "/tes",
        element: <TesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function NavbarWrapper() {
  return (
    <div className="min-h-screen flex flex-col gap-2 w-full items-center relative">
      <Navbar />
      <Outlet />
      <ToggleTheme />
    </div>
  );
}

export default App;
