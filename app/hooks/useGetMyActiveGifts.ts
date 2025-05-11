"use client";

import { useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GiftListResponse } from "@/types/gifts";

const useGetMyActiveGifts = () => {
  const fetchMyActiveGifts = useCallback(async () => {
    const res = await axiosInstance.get(`/user-gift/me`);
    return res.data as GiftListResponse;
  }, []);
  return useQuery({
    queryKey: ["active-gifts"],
    queryFn: () => fetchMyActiveGifts(),
  });
};

export default useGetMyActiveGifts;
