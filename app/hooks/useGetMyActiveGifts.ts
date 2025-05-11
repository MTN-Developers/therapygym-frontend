"use client";

import { useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useGetMyActiveGifts = () => {
  const fetchMyActiveGifts = useCallback(async () => {
    const res = await axiosInstance.get(`/user-gift/me`);
    return res;
  }, []);
  return useQuery({
    queryKey: ["active-gifts"],
    queryFn: () => fetchMyActiveGifts(),
  });
};

export default useGetMyActiveGifts;
