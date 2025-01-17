import { Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';

import { LazyLoad } from './LazyLoad';
import { ProtectedRoute } from './ProtectedRoute';
import { UnProtectedRoute } from './UnProtectedRoute';
import {
  EditProfile,
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
  OrderHistory,
} from '../config/pages';
import { Modal } from '@/shared/ui/Modal';
import { IngredientDetails } from '@/widgets/IngredientDetails/IngredientDetails';
import { OrderDetails } from '@/widgets/OrderDetails';

export const AppRouter = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  const background = navType === 'PUSH' && location.state?.background;

  return (
    <Routes location={background || location}>
      <Route element={<LazyLoad />}>
        {/* Public Routes */}
        <Route path={ROUTER_PATHS.HOME_PAGE} element={<HomePage />}>
          {background && (
            <Route
              path={ROUTER_PATHS.INGREDIENT}
              element={
                <Modal onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
          )}
        </Route>
        <Route path={ROUTER_PATHS.INGREDIENT} element={<IngredientPage />} />
        <Route path={ROUTER_PATHS.FEED} element={<FeedPage />}>
          {background && (
            <Route
              path={ROUTER_PATHS.FEED_ORDER}
              element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDetails />
                </Modal>
              }
            />
          )}
        </Route>
        <Route path={ROUTER_PATHS.FEED_ORDER} element={<OrderPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTER_PATHS.PROFILE} element={<ProfilePage />}>
            <Route index element={<EditProfile />} />
            <Route path={ROUTER_PATHS.PROFILE_ORDERS} element={<OrderHistory />} />
          </Route>
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
    </Routes>
  );
};
