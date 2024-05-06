import axios from "axios";
//Inside Job error check
// export const errCheck = (err) => {
//   if (err.response.data.statusCode == "401") {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }
// };
export default class AuthenticateService {
  async signup(name, email) {
    return await axios
      .post(`/user/signup`, {
        name: name,
        email: email,
      })
      .then((res) => res)
      // .catch((err) => {
      //   errCheck(err);
      // });
  }
  async sendOTP(typ, mobile) {
    return await axios
      .post(`/user/authenticate-phone`, {
        type: typ,
        phone_number: mobile,
      })
      .then((res) => res)
  }
  async signUp(data) {
    return await axios
      .post(`/user/signup`, data)
      .then((res) => res)
  }
  async industryType(data) {
    return await axios
      .get(`/master-data/occupation-1st-level`)
      .then((res) => res)
  }
  async verifyOTP(mobile,oTp) {
    return await axios
      .post(`/user/verify-phone`, {
        phone_number: mobile,
        otp: oTp,
      })
      .then((res) => res)
  }
  async duplicateEmailCheck(mail) {
    return await axios
      .post(`/user/check-duplicate-email`, {
        email: mail
      })
      .then((res) => res)
  }
}
