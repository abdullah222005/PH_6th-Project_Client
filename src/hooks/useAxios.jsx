import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-seven-gamma.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
