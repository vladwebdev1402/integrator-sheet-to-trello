import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import { MainPage } from "@/pages";
import { routerPaths } from "@/shared";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routerPaths.main} element={<Root />}>
      <Route index element={<MainPage />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
