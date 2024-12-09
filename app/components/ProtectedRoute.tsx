"use client";

// import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { RootState } from "../store/store";
// import { Spin } from "antd";
import { initializeAuthState } from "../store/slices/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace("/login");
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return (
  //     <>
  //       <Spin />
  //       <p>loading...</p>
  //     </>
  //   ); // Optionally, render a loading spinner
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
