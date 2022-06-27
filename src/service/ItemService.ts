import { ItemApi } from "../api/ItemApi";
import { CreateItem, Item, Result } from "../types";
import { Handler } from "./result";

export interface IItemService {
  fetchAll(): Promise<Result<Array<Item>>>;
  createItem(item: CreateItem): Promise<Result<Item>>;
  deleteItem(item_id: number): Promise<Result<void>>;
}

export const ItemService: IItemService = {
  async fetchAll(): Promise<Result<Array<Item>>> {
    return await ItemApi.fetchAll()
      .then((res) => Handler.SuccessResult(res.data))
      .catch((reason) => Handler.ErrorResult(reason));
  },
  async createItem(item: CreateItem) {
    return await ItemApi.createItem(item)
      .then((res) => Handler.SuccessResult(res.data))
      .catch((reason) => Handler.ErrorResult(reason));
  },
  async deleteItem(item_id: number) {
    return await ItemApi.deleteItem(item_id)
      .then((res) => Handler.SuccessResult(res.data))
      .catch((reason) => Handler.ErrorResult(reason));
  },
};
