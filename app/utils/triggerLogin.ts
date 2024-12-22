import { AxiosError } from "axios";
import { login } from "../store/slices/authSlice";
import axiosInstance from "./axiosInstance";
// import { setUser } from '@/store/user/userSlice';

export const TriggerLogin = async ({
  dispatch,
  user,
  message,
  setCookie,
  router,
  course_id,
  package_id,
}: {
  dispatch: any;
  user: any;
  message: any;
  setCookie: any;
  router: any;
  course_id?: string;
  package_id?: string;
}) => {
  try {
    const resultAction = await dispatch(
      login({ email: user.email, password: user.password })
    );
    if (login.fulfilled.match(resultAction)) {
      message.success("Login successful");
      // Set cookies with appropriate options
      setCookie("access_token", resultAction.payload.access_token, {
        path: "/",
      });
      setCookie("refresh_token", resultAction.payload.refresh_token, {
        path: "/",
      });
      setCookie("user", resultAction.payload.user, { path: "/" });

      if (course_id) {
        router.push(`/courses/${course_id}`);
      }

      if (package_id) {
        try {
          const { data } = await axiosInstance.post(
            "/user-compensation-request",
            {
              package_id: package_id,
            }
          );
          console.log(data);
          router.push(`/`);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      message.error("Login failed");
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      message.error(err.response?.data?.message || err.message);
    }
  }
};
