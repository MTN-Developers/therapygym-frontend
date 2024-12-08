"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default PublicRoute;
