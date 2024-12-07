type package = {
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
};
type course_package = {
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
};

type getPackage = {
  data: package;
};
