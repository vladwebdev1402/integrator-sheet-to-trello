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
import { checkTrelloAuth, getTrelloUserInfo } from "@/entities/user-trello";

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
  const { isAuth: isGoogleAuth } = useAppSelector(
    (state) => state.AuthGoogleReducer
  );
  const { isAuth: isTrelloAuth } = useAppSelector(
    (state) => state.AuthTrelloReducer
  );
  useEffect(() => {
    dispatch(checkGoogleAuth());
    dispatch(checkTrelloAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isGoogleAuth) dispatch(getGoogleUserInfo());
  }, [isGoogleAuth, dispatch]);

  useEffect(() => {
    if (isTrelloAuth) dispatch(getTrelloUserInfo());
  }, [isTrelloAuth, dispatch]);

  return <RouterProvider router={router} />;
};

export default Router;
