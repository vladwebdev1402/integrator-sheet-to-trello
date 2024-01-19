import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Root from "./Root";
import { MainPage, ProfilePage } from "@/pages";
import { getGoogleUserInfo } from "@/entities/user-google";
import { getTrelloUserInfo } from "@/entities/user-trello";
import { routerPaths } from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { SheetsListPage } from "@/pages/SheetsListPage";
import { SheetDetailPage } from "@/pages/SheetDetailPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routerPaths.main} element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path={routerPaths.profile} element={<ProfilePage />} />
      <Route path={routerPaths.google} element={<SheetsListPage />} />
      <Route path={routerPaths.sheetDetail} element={<SheetDetailPage />} />
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
    if (isGoogleAuth) dispatch(getGoogleUserInfo(null));
  }, [isGoogleAuth, dispatch]);

  useEffect(() => {
    if (isTrelloAuth) dispatch(getTrelloUserInfo(null));
  }, [isTrelloAuth, dispatch]);

  return <RouterProvider router={router} />;
};

export default Router;
