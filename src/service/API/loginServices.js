import axios from "axios";

const postLogin = async (data) => {
  return axios
    .post("user/login", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const snsSignup = async (data) => {
  return await axios
    .post(`/user/signup`, data)
    .then((res) => res)
};

const authenticatePhone = async (data) => {
  return axios
    .post("user/authenticate-phone", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const resendOtp = async (data) => {
  return axios
    .post("user/resent-otp", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const findEmail = async (data) => {
  return axios
    .post("user/find-email", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

const passwordChangeVerify = async (data) => {
  return axios
    .post("user/verify-for-change-password", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

const changePassword = async (data) => {
  return axios
    .post("user/change-password", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

// withdrawal

const withdrawal = async (data) => {
  return axios
    .post("user/account-withdraw", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const LoginServices = {
  postLogin,
  snsSignup,
  authenticatePhone,
  resendOtp,
  findEmail,
  passwordChangeVerify,
  changePassword,
  withdrawal,
};
