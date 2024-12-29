/* eslint-disable no-unused-vars */
interface package {
  id: string;
  name_ar: string;
  name_en: string;
  original_price: number;
  price_after_discount: number;
  duration: number;
  description_ar: string;
  description_en: string;
  gift_videos: [];
  course_id: string;
  erp_code: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  image_ar: string;
  image_en: string;
}
interface Course_package {
  id: string;
  name_ar: string;
  name_en: string;
  original_price: number;
  price_after_discount: number;
  duration: number;
  description_ar: string;
  description_en: string;
  gift_videos: [];
  course_id: string;
  erp_code: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  image_ar: string;
  image_en: string;
}

type getPackage = {
  data: package;
};

export interface Course {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  logo_ar: string;
  logo_en: string;
  banner_ar: string;
  banner_en: string;
  calender: string | null; // or string if always provided
  category: string;
  original_price: number;
  price_after_discount: number;
  type: string;
  erp_code: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  promo_video: string | null;
  teaser_video: string | null;
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it
  deleted_at: string | null; // or Date if you parse it
}

export interface Package {
  id: string;
  name_ar: string;
  name_en: string;
  image_ar: string;
  image_en: string;
  original_price: number;
  price_after_discount: number;
  duration: number;
  description_ar: string;
  description_en: string;
  erp_code: string | null;
  updated_at: string; // or Date if you parse it
  created_at: string; // or Date if you parse it
  deleted_at: string | null; // or Date if you parse it
  course_id: string;
  course: Course;
}

export interface Subscription {
  id: string;
  user_id: string;
  package_id: string;
  start_date: string; // or Date
  end_date: string; // or Date
  updated_at: string; // or Date
  created_at: string; // or Date
  deleted_at: string | null; // or Date
  package: Package;
  course: Course;
}

export interface SubscriptionApiResponse {
  data: Subscription[];
  status: number;
  message: string;
}
