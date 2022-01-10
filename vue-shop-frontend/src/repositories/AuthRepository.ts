import Http from "./clients/AxiosClient";
const resource = "/api/v1/auth";

export default {
  async login(payload: any) {
    return await Http.post(`${resource}/login`, payload);
  },

  async register(payload: any) {
    return await Http.post(`${resource}/register`, payload);
  },

  async logout() {
    return await Http.post(`${resource}/logout`);
  },
};
