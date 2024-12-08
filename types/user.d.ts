type getUserProfile = {
  data: {
    id: string;
    name: string;
    email: string;
    country: string;
    phone: string;
    role: string;
    updated_at: Date;
    created_at: Date;
    deleted_at: Date | null;
    profile: {
      id: string;
      user_id: string;
      bio: string | null;
      avatar: string | null;
      updated_at: Date;
      created_at: Date;
      deleted_at: Date | null;
    };
  };
  status: number;
  message: string;
};
