import Http from "./clients/AxiosClient";
const orderv1 = "/shop/api/v1";
const resource = "/orders";

export default {
  order(payload: any) {
    return Http.post(`${orderv1}/order`, payload);
  },
  getOrder(orderId: string | number) {
    return Http.get(`${orderv1}${resource}/${orderId}`);
  },
  getUserOrders(uid: string | number) {
    return Http.get(`${orderv1}/users/${uid}${resource}`);
  },
};
