import axios from "axios";

  const sendOTP = async (typ, mobile) => {
  // async sendOTP(typ, mobile) {
    return await axios
      .post(`/user/authenticate-phone`, {
        type: typ,
        phone_number: mobile,
      })
      .then((res) => res)
  }
 
  const verifyOTP = async (mobile,oTp) => {
    return await axios
      .post(`/user/verify-phone`, {
        phone_number: mobile,
        otp: oTp,
      })
      .then((res) => res)
  }

export const AuthenticateServices = {
  sendOTP,
  verifyOTP,
};