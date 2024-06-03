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
  ResultPage
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
        path: "/result/:id",
        element: <ResultPage />,
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
    </div>
  );
}

export default App;
