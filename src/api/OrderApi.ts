import { AxiosResponse } from "axios";
import { CreateOrder } from "../types";
import instance from "./axios";

export interface IOrderApi {
  createOrder(order: CreateOrder): Promise<AxiosResponse<any>>;
}

export const OrderApi: IOrderApi = {
  async createOrder(order: CreateOrder): Promise<AxiosResponse<any>> {
    const route = "/order/create";
    return await instance.post<any>(route, order);
  },
};
