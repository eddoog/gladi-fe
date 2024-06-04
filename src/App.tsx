import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  HomePage,
  LoginPage,
  RegisterPage,
  RecordingListPage,
  CapturePage,
  TesPage,
  ResultPage,
  ProgressPage,
} from "./modules";
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
      {
        path: "/capture",
        element: <CapturePage />,
      },
      {
        path: "/result/:id/:user_id/:file_name",
        element: <ResultPage />,
      },
      {
        path: "/progress/:task_id/:user_id/:file_name",
        element: <ProgressPage />,
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
    <div className="relative flex min-h-screen w-full flex-col items-center gap-2">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
