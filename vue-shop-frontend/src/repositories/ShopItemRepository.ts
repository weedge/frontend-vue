import Http from "./clients/AxiosClient";
const shopv1 = "/shop/api/v1";
const resource = "/items";

export default {
  getItems() {
    return Http.get(`${shopv1}${resource}`);
  },
  getItem(id: string | number) {
    return Http.get(`${shopv1}${resource}/${id}`);
  },
  search(keyword: string) {
    console.log("keyword", keyword)
    return Http.get(`${shopv1}${resource}/search?q=${keyword}`);
  },
};
