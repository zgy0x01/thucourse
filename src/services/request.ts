import axios from "axios";

export const request = axios.create({
  baseURL:"https://yourschool.cc/thucourse_api",
  //xsrfCookieName: "csrftoken",
  //xsrfHeaderName: "X-CSRFToken",
  //withCredentials: true,
});

export const fetcher = (url: string) =>
  request.get(url).then((res) => res.data);
