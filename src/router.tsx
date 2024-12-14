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
        element: <LazyLoad />,
        children: [
          {
            path: Paths.HOME_PAGE,
            element: <HomePage />,
          },
          {
            path: Paths.INGREDIENT,
            element: <IngredientPage />,
          },
          {
            element: <ProtectedAuthRoute />,
            children: [
              {
                path: Paths.LOGIN,
                element: <LoginPage />,
              },
              {
                path: Paths.REGISTRATION,
                element: <RegistrationPage />,
              },
              {
                path: Paths.FORGOT_PASSWORD,
                element: <ForgotPasswordPage />,
              },
              {
                path: Paths.RESET_PASSWORD,
                element: <ResetPasswordPage />,
              },
            ],
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: Paths.PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
          {
            path: Paths.NOT_FOUND,
            element: <NotFound404Page />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
