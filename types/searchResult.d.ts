export interface SearchResponse {
  data: {
    data: Course[];
    meta: Meta;
  };
  status: number;
  message: string;
}

interface Course {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  about_ar: string | null;
  about_en: string | null;
  benefits_ar: string | null;
  benefits_en: string | null;
  logo_ar: string;
  logo_en: string;
  course_duration: number | null;
  banner_ar: string;
  banner_en: string;
  calender: string;
  category: string;
  original_price: number;
  price_after_discount: number;
  type: string;
  erp_code: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  promo_video: string;
  teaser_video: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  status: {
    isPurchased: boolean;
    isSubscribed: boolean;
  };
  packages: Package[];
  number_of_subscribers: number;
}

interface Package {
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
  course_id: string;
  erp_code: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
