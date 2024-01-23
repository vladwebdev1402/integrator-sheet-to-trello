import React, { useEffect, lazy, Suspense } from "react";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Root from "./Root";
import { getGoogleUserInfo } from "@/entities/user-google";
import { getTrelloUserInfo } from "@/entities/user-trello";
import { routerPaths } from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { SheetsListPage } from "@/pages/SheetsListPage";
import { MainPage } from "@/pages/MainPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SkeletonsSheetDetail } from "@/pages/SheetDetailPage";
import { TrelloBoadrdsPage } from "@/pages/TrelloBoadrdsPage";
const SheetDetailPage = lazy(() => import("@/pages/SheetDetailPage"));

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

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path={routerPaths.main} element={<Root />}>
            <Route index element={<MainPage />} />
            <Route path={routerPaths.profile} element={<ProfilePage />} />
            <Route path={routerPaths.google} element={<SheetsListPage />} />
            <Route path={routerPaths.trello} element={<TrelloBoadrdsPage />} />
            {isGoogleAuth && (
              <Route
                path={routerPaths.sheetDetail}
                element={
                  <Suspense fallback={<SkeletonsSheetDetail />}>
                    <SheetDetailPage />
                  </Suspense>
                }
              />
            )}
          </Route>
        )
      )}
    />
  );
};

export default Router;
