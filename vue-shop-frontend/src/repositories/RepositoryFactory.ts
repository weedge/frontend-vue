import AuthRepository from "./AuthRepository";
import OrderRepository from "./OrderRepository";
import ShopItemRepository from "./ShopItemRepository";

const repositories = {
  auth: AuthRepository,
  items: ShopItemRepository,
  userorders: OrderRepository,
};
export default {
  get: (name: any) => repositories[name],
};
