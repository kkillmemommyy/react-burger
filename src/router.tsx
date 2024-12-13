import { LazyLoad, ProtectedRoute, ProtectedAuthRoute } from './components';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

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
} from './pages';

export enum Paths {
  HOME_PAGE = '/',
  FEED = '/feed',
  LOGIN = '/login',
  INGREDIENT = '/ingredient/:id',
  REGISTRATION = '/registration',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  PROFILE = '/profile',
  PROFILE_ORDERS = '/profile/orders',
  PROFILE_ORDER = '/profile/orders/:id',
  NOT_FOUND = '*',
}

const routes: RouteObject[] = [
  {
    element: <RootPage />,
    children: [
      {
        path: Paths.HOME_PAGE,
        element: <HomePage />,
      },
      {
        path: Paths.INGREDIENT,
        element: (
          <LazyLoad>
            <IngredientPage />
          </LazyLoad>
        ),
      },
      {
        path: Paths.LOGIN,
        element: (
          <ProtectedAuthRoute>
            <LazyLoad>
              <LoginPage />
            </LazyLoad>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: Paths.REGISTRATION,
        element: (
          <ProtectedAuthRoute>
            <LazyLoad>
              <RegistrationPage />
            </LazyLoad>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: Paths.FORGOT_PASSWORD,
        element: (
          <ProtectedAuthRoute>
            <LazyLoad>
              <ForgotPasswordPage />
            </LazyLoad>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: Paths.RESET_PASSWORD,
        element: (
          <ProtectedAuthRoute>
            <LazyLoad>
              <ResetPasswordPage />
            </LazyLoad>
          </ProtectedAuthRoute>
        ),
      },
      {
        path: Paths.PROFILE,
        element: (
          <ProtectedRoute>
            <LazyLoad>
              <ProfilePage />
            </LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: Paths.NOT_FOUND,
        element: (
          <LazyLoad>
            <NotFound404Page />
          </LazyLoad>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
