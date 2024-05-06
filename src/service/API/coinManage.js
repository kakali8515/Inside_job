import axios from "axios";
export default class coinService {
  async coinlist() {
    return await axios
      .get(`/payment/coin-list`)
      .then((res) => res)
  }
  async paymentsuccess(data) {
    return await axios
      .post(`/payment/success`, data)
      .then((res) => res)
      .catch((err) => err);
  }
  async paymentHistorylist() {
    return await axios
      .get(`/payment/history-list?page=1&limit=5`)
      .then((res) => res)
  }
  async purchaseHistorylist(pg,limi) {
    return await axios
      .get(`/payment/purchase-history-list?page=${pg}&limit=${limi}`)
      .then((res) => res)
  }
}
 
