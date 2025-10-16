import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
]);
