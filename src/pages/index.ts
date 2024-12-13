import HomePage from './HomePage/HomePage';
import RootPage from './RootPage/RootPage';
import { lazy } from 'react';

const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./RegistrationPage/RegistrationPage'));
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./ResetPasswordPage/ResetPasswordPage'));
const NotFound404Page = lazy(() => import('./NotFound404Page/NotFound404Page'));
const ProfilePage = lazy(() => import('./ProfilePage/ProfilePage'));
const IngredientPage = lazy(() => import('./IngredientPage/IngredientPage'))

export {
  RootPage,
  HomePage,
  IngredientPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404Page,
  ProfilePage,
};
