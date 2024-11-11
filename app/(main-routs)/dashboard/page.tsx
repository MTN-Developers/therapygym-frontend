"use client";
import React from "react";
import MainHome from "@/app/components/MainHome";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store/store";
// import { useRouter } from "next/navigation";
// import { initializeAuthState } from "@/app/store/slices/authSlice";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
import useAxiosInterceptors from "@/app/hooks/useAxiosInterceptors";

export default function Home() {
  useAxiosInterceptors();
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );
  // const router = useRouter();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initializeAuthState());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     router.replace("/login");
  //   }
  // }, [isAuthenticated, router]);

  // if (isAuthenticated === undefined) {
  //   // Authentication status is being determined
  //   return <div>Loading...</div>;
  // }

  // if (isAuthenticated === true) {
  // User is authenticated
  return (
    // <ProtectedRoute>
    <div>
      <MainHome />
    </div>
    // </ProtectedRoute>
  );
  // }

  // If isAuthenticated is false, we've already redirected to /login
  // return null;
}
