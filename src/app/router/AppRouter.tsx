import {
  RootPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404Page,
  ProfilePage,
  IngredientPage,
  FeedPage,
  OrderPage,
} from '@/pages';

import { Route, Routes, useLocation } from 'react-router-dom';
import { Paths } from '@/shared/router';
import { LazyLoad, ProtectedRoute, UnProtectedRoute } from './ui';

export const AppRouter = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <Routes location={background || location}>
      <Route element={<RootPage />}>
        <Route element={<LazyLoad />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path={Paths.INGREDIENT} element={<IngredientPage />} />
          <Route path={Paths.FEED} element={<FeedPage />} />
          <Route path={Paths.FEED_ORDER} element={<OrderPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={Paths.PROFILE} element={<ProfilePage />} />
          </Route>

          {/* Unprotected Routes */}
          <Route element={<UnProtectedRoute />}>
            <Route path={Paths.LOGIN} element={<LoginPage />} />
            <Route path={Paths.REGISTRATION} element={<RegistrationPage />} />
            <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={Paths.RESET_PASSWORD} element={<ResetPasswordPage />} />
          </Route>

          {/* Catch-all Route */}
          <Route path={Paths.NOT_FOUND} element={<NotFound404Page />} />
        </Route>
      </Route>
    </Routes>
  );
};
