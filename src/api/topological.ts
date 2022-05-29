import axios, { ResponseData } from "./index";
import { AxiosPromise } from "axios";
// interface LoginReqArguInterface {
//   user_name: string;
//   password: number | string;
// }
// export const loginReq = (
//   data: LoginReqArguInterface
// ): AxiosPromise<ResponseData> => {
//   return axios.request({
//     url: "/api/user/login",
//     data,
//     method: "GET",
//   });
// };

export const topoListReq = (): AxiosPromise<ResponseData> => {
  return axios.request({
    url: "https://private-2afaaa-toponet.apiary-mock.com/list",
    method: "GET",
  });
};

export const topoGroupReq = (): AxiosPromise<ResponseData> => {
  return axios.request({
    url: "https://private-2afaaa-toponet.apiary-mock.com/group",
    method: "GET",
  });
};

export const topoFloorReq = (): AxiosPromise<ResponseData> => {
  return axios.request({
    url: "https://private-2afaaa-toponet.apiary-mock.com/floor",
    method: "GET",
  });
};
