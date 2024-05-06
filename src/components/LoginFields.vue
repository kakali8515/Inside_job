<template>
  <div class="login-tab-cont">
    <a href="javascript:void(0);" class="login-logo"
      ><img src="@/assets/login-logo.svg" alt=""
    /></a>
    <div class="form-wrapper">
      <div class="cm-top-space">
        <form @submit="isSubmit">
          <div class="form-group">
            <div class="mb-16">
              <div
                :class="`group ${errors && errors?.email ? 'valid-error' : ''}`"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="이메일"
                  v-model="email"
                  style="text-transform: lowercase"
                />
              </div>
              <small v-if="errors && errors?.email" class="error-msgsign">{{
                errors?.email
              }}</small>
            </div>
            <div
              :class="`group ${
                errors && errors?.password ? 'valid-error' : ''
              }`"
            >
              <input
                type="password"
                class="form-control"
                placeholder="비밀번호"
                v-model="password"
              />
            </div>
            <small v-if="errors && errors?.password" class="error-msgsign">{{
              errors?.password
            }}</small>
          </div>
          <input type="submit" value="로그인하기" class="btn btn-primary lg" />
        </form>
      </div>
    </div>
    <div class="login-bottom-nav">
      <ul>
        <li>
          <router-link :to="{ name: 'FindEmailAuthenticate' }"
            >이메일찾기</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'ForgotPassword' }"
            >비밀번호 찾기</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'SelectMembershipType' }"
            >회원가입</router-link
          >
        </li>
      </ul>
    </div>
    <div class="reg-btn">
      <button class="btn btn-secondary lg" @click="mbKakaoLogin">
        <em><img src="@/assets/icons/chat-icon.svg" alt="" /></em>
        카카오 로그인
      </button>
      <button
        :class="`btn btn-success lg ${isAppaleId ? '' : 'mb-btn-0'}`"
        @click="mbNaverLogin"
      >
        <em><img src="@/assets/icons/n-icon.svg" alt="" /></em>
        네이버 로그인
      </button>
      <!-- social login for appale -->
      <button
        class="btn btn-black lg"
        v-show="isAppaleId"
        @click="mbAppleLogin"
      >
        <em><img src="@/assets/icons/apple.svg" alt="" /></em>
        Apple로 계속하기
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import LoginValidation from "../Validations/login.js";
import { useCookies } from "vue3-cookies";
import { watch } from "@vue/runtime-core";

export default {
  emits: ["setLogin"],
  props: {
    isReset: Number,
  },
  setup(props, { emit }) {
    const { cookies } = useCookies();
    const errors = ref({});
    const email = ref("");
    const password = ref("");
    const loginType = ref("");

    watch(
      () => props.isReset,
      (oldVal, newVal) => {
        if (newVal != oldVal) {
          errors.value = {};
          email.value = "";
          password.value = "";
          loginType.value = "";
        }
      }
    );

    const CheckError = () => {
      if (loginType.value === "general") {
        let checkData = {
          email: email.value,
          password: password.value,
        };
        const { isInvalid, error } = LoginValidation(checkData);
        if (isInvalid) {
          errors.value = error;
          console.log(errors.value, "check error");
          return false;
        } else {
          errors.value = {};
          return true;
        }
      } else {
        errors.value = {};
        return true;
      }
    };

    const isSubmit = (e) => {
      loginType.value = "general";
      e.preventDefault();
      if (!CheckError()) {
        return;
      } else {
        console.log("login");
        emit("setLogin", {
          emailId: email.value,
          pass: password.value,
          optionLogin: loginType.value,
        });
      }
    };

    return {
      errors,
      email,
      password,
      isSubmit,
      cookies,
    };
  },

  data() {
    return {
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
    };
  },

  methods: {
    //post login
    mbKakaoLogin() {
      let data = {
        type: "kakaoLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("kakaoLoginClicked", "*");
      // alert("kakaoLoginClicked");
      // this.$emit('setKakaoLogin', true);
    },
    mbNaverLogin() {
      let data = {
        type: "naverLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("naverLoginClicked", "*");
      // alert("naver");
    },
    mbAppleLogin() {
      let data = {
        type: "appleLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("appleLoginClicked", "*");
      // alert('appleLoginClicked');
    },
  },
};
</script>

<style></style>
