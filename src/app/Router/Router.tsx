import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Root from "./Root";
import { MainPage, ProfilePage } from "@/pages";
import { routerPaths, useAppDispatch, useAppSelector } from "@/shared";
import { checkGoogleAuth, getGoogleUserInfo } from "@/entities/user-google";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routerPaths.main} element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path={routerPaths.profile} element={<ProfilePage />} />
    </Route>
  )
);

const Router = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.AuthGoogleReducer.isAuth);
  useEffect(() => {
    dispatch(checkGoogleAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) dispatch(getGoogleUserInfo());
  }, [isAuth, dispatch]);

  return <RouterProvider router={router} />;
};

export default Router;
