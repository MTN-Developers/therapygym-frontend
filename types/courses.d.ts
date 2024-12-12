type getCourses = {
  data: {
    data: SubscribedCourse[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
};

type SubscribedCourse = {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  logo_ar: string;
  logo_en: string;
  banner_ar: string;
  banner_en: string;
  calender: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  promo_video: string | null;
  category: string;
  original_price: number;
  price_after_discount: number;
  type: "standalone" | "subscribe" | "standalone_subscribe";
  erp_code: string | null;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  status: {
    isPurchased: boolean;
    isSubscribed: boolean;
  };
  packages: package[];
};

type getCourse = {
  data: SubscribedCourse;
  status: number;
  message: string;
};
