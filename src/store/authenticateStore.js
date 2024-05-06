import { reactive } from "vue";

const state = reactive({
  token: localStorage.getItem("token"),
  email_id: localStorage.getItem("emailId"),
  loginType: localStorage.getItem("login_type"),
});

const methods = {
  setToken(key) {
    state.token = key;
  },
  isAuthenticate() {
    if (state.token) {
      return true;
    } else {
      return false;
    }
  },
};

export default {
  state,
  methods,
};
