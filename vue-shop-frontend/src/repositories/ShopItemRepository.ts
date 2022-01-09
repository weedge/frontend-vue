import Http from "./clients/AxiosClient";
const shopv1 = "/shop/api/v1";
const resource = "/item";

export default {
  getItems() {
    return Http.get(`${shopv1}${resource}`);
  },
  getItem(id: string | number) {
    return Http.get(`${shopv1}${resource}/${id}`);
  },
  search(keyword: string) {
    return Http.get(`${shopv1}/${resource}/search?q=${keyword}`);
  },
};
