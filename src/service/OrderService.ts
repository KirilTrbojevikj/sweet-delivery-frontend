import { OrderApi } from "../api/OrderApi";
import { CreateOrder, Result } from "../types";
import { Handler } from "./result";

export interface IOrderService {
  createOrder(order: CreateOrder): Promise<Result<any>>;
}

export const OrderService: IOrderService = {
  async createOrder(order: CreateOrder): Promise<Result<any>> {
    return await OrderApi.createOrder(order)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
};
