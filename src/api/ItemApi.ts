import { AxiosResponse } from "axios";
import { CreateItem, Item } from "../types";
import  instance  from "./axios";

export interface IItemApi {
  fetchAll(): Promise<AxiosResponse<Array<Item>>>;
  createItem(item: CreateItem): Promise<AxiosResponse<Item>>;
  deleteItem(item_id: number): Promise<AxiosResponse<void>>;
}

export const ItemApi: IItemApi = {
  async fetchAll(): Promise<AxiosResponse<Array<Item>>> {
    const route = "/item/all";

    return await instance.get<Array<Item>>(route);
  },
  async createItem(item: CreateItem) {
    const route = "/item/create";

    return await instance.post<Item>(route, item);  
  },
  async deleteItem(item_id: number) {
    const route = `/item/delete/${item_id}`;
    return await instance.delete<void>(route);
  },
};
