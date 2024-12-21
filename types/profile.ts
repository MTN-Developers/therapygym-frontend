export interface Profile {
  id: string;
  user_id: string;
  bio: string | null;
  avatar: string | null;
  updated_at: string; // or Date if you parse it
  created_at: string; // or Date if you parse it
  deleted_at: string | null; // or Date if you parse it
  //added from front
  date_of_birth: string | null; // or Date if you
  facebook_url: string | null;
  instagram_url: string | null;
  x_url: string | null;
  linkedin_url: string | null;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  reset_token_tries: number;
  role: string;
  role_id: string | null;
  gender: string;
  is_account_verified: boolean;
  verification_token: string | null;
  verification_token_expires: string | null; // or Date if you parse it
  verification_token_tries: number;
  stripe_customer_id: string | null;
  last_feedback_at: string | null; // or Date if you parse it
  updated_at: string; // or Date if you parse it
  created_at: string; // or Date if you parse it
  deleted_at: string | null; // or Date if you parse it
  profile: Profile;
}

export interface ApiResponse {
  data: UserData;
  status: number;
  message: string;
}
