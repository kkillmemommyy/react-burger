export interface SuccessRefreshTokenResponse {
  success: true;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}
