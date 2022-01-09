import Http from "./clients/AxiosClient";
const orderv1 = "/shop/api/v1";

export default {
  order(payload: any) {
    return Http.post(`${orderv1}/order`, payload);
  },
  getOrder(orderId: string | number) {
    return Http.get(`${orderv1}/order/${orderId}`);
  },
  getUserOrders(uid: string | number) {
    return Http.get(`${orderv1}/user/${uid}/orders`);
  },
};
