"use client";

import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:4000/api/profile", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};
