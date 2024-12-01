import { LazyLoad, ProtectedRouteElement } from './components';
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
} from './pages';

export enum Paths {
  HOME_PAGE = '/',
  FEED = '/feed',
  LOGIN = '/login',
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
        path: Paths.LOGIN,
        element: (
          <LazyLoad>
            <LoginPage />
          </LazyLoad>
        ),
      },
      {
        path: Paths.REGISTRATION,
        element: (
          <LazyLoad>
            <RegistrationPage />
          </LazyLoad>
        ),
      },
      {
        path: Paths.FORGOT_PASSWORD,
        element: (
          <LazyLoad>
            <ForgotPasswordPage />
          </LazyLoad>
        ),
      },
      {
        path: Paths.RESET_PASSWORD,
        element: (
          <LazyLoad>
            <ResetPasswordPage />
          </LazyLoad>
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
      {
        path: Paths.PROFILE,
        element: (
          <ProtectedRouteElement>
            <LazyLoad>
              <ProfilePage />
            </LazyLoad>
          </ProtectedRouteElement>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
