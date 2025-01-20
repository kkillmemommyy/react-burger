export const ROUTER_PATHS = {
  HOME_PAGE: '/',
  FEED: '/feed',
  FEED_ORDER: '/feed/:id',
  LOGIN: '/login',
  INGREDIENT: '/ingredient/:id',
  REGISTRATION: '/registration',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDER: '/profile/orders/:id',
  NOT_FOUND: '*',
} as const;
