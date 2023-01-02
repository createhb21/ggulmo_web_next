export interface UserModel {
  name: string;
  hasBusinessInfo: boolean;
  profile: string | null;
  profileS3Url?: string;
  accessToken: string;
  refreshToken: string;
}
