export interface MenuItem {
  id: number;
  label: string;
  icon: string; // Path to the icon image
  link: string; // Path
}

// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   phone: string;
//   work: string;
//   city: string;
//   nationality: string;
//   birthdate: string;
//   accessToken: string;
//   refreshToken: string;
//   accessTokenExpires: string | number;
// }

export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  reset_token: string | null;
  reset_token_expires: string | null;
  refresh_token: string;
  // role: UserRole;
  updated_at: string; // Consider using Date if you parse it
  created_at: string; // Consider using Date if you parse it
  deleted_at: string | null;
}

// Optional: Define an enum for user roles if there are limited roles
// export enum UserRole {
//   Admin = "admin",
//   User = "user",
//   // Add other roles as needed
// }

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
  access_token: string;
  refresh_token: string;
  expires_at: string;
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

export interface SubscribedCourseApi {
  course_request_id: number;
  course_id: number;
  title: string;
  logo: string;
  calendar_image: string;
}

// export interface IVideo {
//   id: number;
//   title: string;
//   url: string;
// }

export interface IChapter {
  id: number;
  title: string;
  videos: IVideo[];
}
export interface SubscribedCourse {
  id: number;
  title: string;
  course_id: number;
  chapters: IChapter[];
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
  gender: string;
  work: string;
  city: string;
  nationality: string;
  birthdate: Date | null;
  country: string;
}

export interface IEvent {
  id: number;
  location: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  url: string; //
  start?: Date; // Added for react-big-calendar
  end?: Date; // Added for react-big-calendar
}

/* start dev and build video page */

export interface IVideo {
  id: string;
  title_ar: string;
  title_en: string;
  video_url: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface IVideoCategory {
  data: IVideo[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ICourseVideosResponse {
  data: {
    introVideos: IVideoCategory;
    endVideos: IVideoCategory;
    giftVideos: IVideoCategory | null;
    packageVideos: IVideo[];
  };
  status: number;
  message: string;
}
