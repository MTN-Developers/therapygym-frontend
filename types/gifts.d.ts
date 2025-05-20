/* ---------------- Shared helpers ---------------- */

export type ISODate = string; // e.g. "2025-05-11T12:15:02.422Z"
export type UUID = string;

/* ---------------- Enumerations ------------------ */

export type GiftStatus = "active" | "inactive" | "expired"; // extend when API grows
export type CourseType = "subscribe" | "one-time";

/* ---------------- Leaf objects ------------------ */

export interface Package {
  id: UUID;
  name_ar: string;
  name_en: string;
  image_ar: string;
  image_en: string;
  original_price: number;
  price_after_discount: number;
  duration: number; // months
  description_ar: string;
  description_en: string;
  course_id: UUID;
  erp_code: string | null;
  max_lives: number;
  gift_code: string;
  updated_at: ISODate;
  created_at: ISODate;
  deleted_at: ISODate | null;
}

export interface Course {
  id: UUID;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  about_ar: string | null;
  about_en: string | null;
  benefits_ar: string | null;
  benefits_en: string | null;
  logo_ar: string;
  logo_en: string;
  course_duration: number | null; // unit depends on backend docs
  banner_ar: string;
  banner_en: string;
  calender: string;
  category: string;
  original_price: number;
  price_after_discount: number;
  type: CourseType;
  erp_code: string | null;
  primary_color: string; // hex
  secondary_color: string; // hex
  accent_color: string; // hex
  promo_video: string | null;
  teaser_video: string | null;
  updated_at: ISODate;
  created_at: ISODate;
  deleted_at: ISODate | null;
}

/* ---------------- Composite object -------------- */

export interface Gift {
  id: UUID;
  user_id: UUID;
  gift_code: string;
  status: GiftStatus;
  updated_at: ISODate;
  created_at: ISODate;
  deleted_at: ISODate | null;
  package: Package;
  course: Course;
}

/* ---------------- Full API response ------------- */

export interface GiftListResponse {
  data: Gift[];
  status: number; // 200, 4xx, 5xx …
  message: string; // "Success", "Unauthorized", …
}
