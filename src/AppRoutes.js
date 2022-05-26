import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LandingPage, LogoutPage, Page404, SignInPage } from "pages";
import { ROUTE_PATHS } from "lib/constants";
import { Favorites } from "components/Favorites";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTE_PATHS.HOME} element={<LandingPage />} />
        <Route exact path={ROUTE_PATHS.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTE_PATHS.LOGOUT} element={<LogoutPage />} />
        <Route path={ROUTE_PATHS.FAVORITES} element={<Favorites />} />
        <Route path={ROUTE_PATHS.ERROR_404} element={<Page404 />} />
      </Routes>
    </Router>
  );
};
