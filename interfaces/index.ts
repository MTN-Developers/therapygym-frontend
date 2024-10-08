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

export interface Course {
  id: number;
  title: string;
  logo: string;
  calendar_image: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  // Add other properties as needed
}

export interface PDF {
  id: number;
  title: string;
  url: string;
  // Add other properties as needed
}

export interface SingleCourse {
  id: number;
  title: string;
  logo: string;
  calendar_image: string;
  created_at: string;
  updated_at: string;
  chapters: Chapter[];
  pdfs: PDF[];
}

// Define the interface for your form data
export interface RegisterFormData {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  phone: string;
  work: string;
  city: string;
  nationality: string;
  birthdate: Date | null;
}
