import { lazy } from 'react';

const RootPage = lazy(() => import('@/pages/RootPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const IngredientPage = lazy(() => import('@/pages/IngredientPage'));
const FeedPage = lazy(() => import('@/pages/FeedPage'));
const OrderPage = lazy(() => import('@/pages/OrderPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));
const NotFound404Page = lazy(() => import('@/pages/NotFound404Page'));

export {
  RootPage,
  HomePage,
  IngredientPage,
  FeedPage,
  OrderPage,
  ProfilePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404Page,
};
