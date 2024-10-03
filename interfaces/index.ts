export interface MenuItem {
  id: number;
  label: string;
  icon: string; // Path to the icon image
  link: string; // Path
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  work: string;
  city: string;
  nationality: string;
  birthdate: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface ApiUserResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponseData {
  user: ApiUserResponse;
  token: string;
}

export interface ApiResponse {
  data: ApiResponseData;
}
