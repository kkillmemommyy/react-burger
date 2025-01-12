import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';

import { LazyLoad } from './LazyLoad';
import { ProtectedRoute } from './ProtectedRoute';
import { UnProtectedRoute } from './UnProtectedRoute';
import {
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  OrderPage,
  ProfilePage,
  RegistrationPage,
  ResetPasswordPage,
  RootPage,
} from '../config/pages';

export const AppRouter = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <Routes location={background || location}>
      <Route element={<RootPage />}>
        <Route element={<LazyLoad />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path={ROUTER_PATHS.INGREDIENT} element={<IngredientPage />} />
          <Route path={ROUTER_PATHS.FEED} element={<FeedPage />} />
          <Route path={ROUTER_PATHS.FEED_ORDER} element={<OrderPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTER_PATHS.PROFILE} element={<ProfilePage />} />
          </Route>

          {/* Unprotected Routes */}
          <Route element={<UnProtectedRoute />}>
            <Route path={ROUTER_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTER_PATHS.REGISTRATION} element={<RegistrationPage />} />
            <Route path={ROUTER_PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTER_PATHS.RESET_PASSWORD} element={<ResetPasswordPage />} />
          </Route>

          {/* Catch-all Route */}
          <Route path={ROUTER_PATHS.NOT_FOUND} element={<NotFound404Page />} />
        </Route>
      </Route>
    </Routes>
  );
};
