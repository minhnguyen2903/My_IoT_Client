import axiosServices from "../axios";

export const userPostRequest = (url, data) => {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  return axiosServices.post(url, {
    ...data,
    userId
  });
}