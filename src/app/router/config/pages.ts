import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/Home'));
const IngredientPage = lazy(() => import('@/pages/Ingredient'));
const FeedPage = lazy(() => import('@/pages/Feed'));
const OrderPage = lazy(() => import('@/pages/Order'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const LoginPage = lazy(() => import('@/pages/Login'));
const RegistrationPage = lazy(() => import('@/pages/Registration'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPassword'));
const NotFound404Page = lazy(() => import('@/pages/NotFound404'));

export {
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
