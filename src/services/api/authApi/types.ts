export type ForgotPasswordRequest = {
  email: string;
};

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  name: string;
}

export type LoginRequest = Pick<RegistrationRequest, 'email' | 'password'>;

export interface RefreshTokenRequest {
  token: string;
}

export interface SuccessResponse {
  success: true;
  message: string;
}

export interface SuccessRegistrationAndLoginResponse {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export interface SuccessRefreshTokenResponse {
  success: true;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}
