import axiosInstance from "@/app/utils/axiosInstance";
import { AxiosError } from "axios";

// import { redirect } from "next/navigation";

export async function getOne<T>(endpoint: string, id?: string): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(
      `${endpoint}${id ? `/${id}` : ""}`
    );
    // console.log(response);
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAll<T>(endpoint: string): Promise<T[]> {
  try {
    const { data } = await axiosInstance.get(endpoint);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteOne(endpoint: string, id: string) {
  try {
    const { data, status } = await axiosInstance.delete(`${endpoint}/${id}`);
    // console.log(status);
    if (status == 204 || status == 200) {
      return {
        status,
        message: data?.message || null,
      };
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateOne<T, D>(
  endpoint: string,
  id?: string | null,
  data?: D
): Promise<T> {
  try {
    // console.log(`${endpoint}${id ? `/${id}` : ''}`);
    const response = await axiosInstance.put<T>(
      `${endpoint}${id ? `/${id}` : ""}`,
      data
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function patchOne<T, D>(
  endpoint: string,
  id?: string | null,
  data?: D
): Promise<T> {
  try {
    const response = await axiosInstance.patch<T>(
      `${endpoint}${id ? `/${id}` : ""}`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    console.error(`Error updating ${endpoint} with id ${id}:`, error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
}

export async function createOne<T, D>(endpoint: string, data: D): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
