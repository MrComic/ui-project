export interface AccessToken {
  accessTokenExpiry: Date;
  refreshTokenValidityMinutes: number;
  accessToken: string;
  userId: number;
  refreshToken: string;
}
