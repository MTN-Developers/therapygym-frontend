// Define the Package interface
interface Package {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image_ar: string;
  image_en: string;
  price_after_discount: number;
  original_price: number;
  duration: number;
  course_id: string;
  course_name_ar: string;
  course_name_en: string;
  course_logo_ar: string;
  course_logo_en: string;
}

// Define the API response interface
export interface PackagesResponse {
  data: Package[];
  status: number;
  message: string;
}
