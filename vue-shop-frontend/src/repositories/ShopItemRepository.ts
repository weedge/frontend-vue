import Http from "./clients/AxiosClient";
const shopv1 = "/shop/api/v1";

export default {
  getItems() {
    return Http.get(`${shopv1}/items`);
  },
  getItem(id: string | number) {
    return Http.get(`${shopv1}/item/${id}`);
  },
  search(keyword: string) {
    return Http.get(`${shopv1}/item/search?q=${keyword}`);
  },
};
