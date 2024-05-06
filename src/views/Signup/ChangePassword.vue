<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="비밀번호 변경" />
      </div>
    </div>
    <div class="container">
      <div class="form-wrapper-findid">
        <div class="form-wrapper change-pwd-wrap">
          <form @submit="isSubmit">
            <div
              :class="`form-group ${
                errors && errors?.password ? 'valid-error' : ''
              }`"
            >
              <label class="mb-12">비밀번호</label>
              <PasswordInput
                inputPlaceholder="영문/숫자/특수문자 포함 8자 ~ 16자"
                @inputData="getPassword($event)"
              />
              <span class="error-msg">{{ errors && errors?.password }}</span>
            </div>

            <!-- Use this for error msg -->

            <!-- <div class="form-group valid-error">
                                    <label>비밀번호</label>
                                    <div class="password-input">
                                        <input type="text" class="form-control" placeholder="영문/숫자/특수문자 포함 8자 ~ 16자"  />
                                        <span class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span>
                                    </div>
                                    <span class="error-msg">비밀번호는 영문/숫자/특수문자 포함 8자 이상 16자 미만으로 설정해주세요.</span>
                            </div> -->

            <div
              :class="`form-group ${
                errors && errors?.confirmPassword ? 'valid-error' : ''
              }`"
            >
              <label class="mb-12">비밀번호 확인</label>
              <PasswordInput
                inputPlaceholder="비밀번호를 한 번 더 입력"
                @inputData="getConfirmPassword($event)"
              />
              <span class="error-msg">{{
                errors && errors?.confirmPassword
              }}</span>
            </div>
            <input type="submit" value="변경하기" class="btn btn-primary lg" />
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="required-fields-icon" v-if="commonstore.state.requiredToastMsgShow">
    <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
  </div>
  <ChangePassConfirmationModal
    :isModal="showModal"
    :isLoggedIn="isLoggedin"
    @closeModal="redirectPageTo"
  />
  <InfoModal
    :isModal="commonstore.state.loginInfoModal.isShow"
    :message="commonstore.state.loginInfoModal.message"
    @closeModal="commonstore.state.loginInfoModal.isShow = false"
  />
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import PasswordInput from "@/components/passwordInput.vue";
import validateChangePass from "@/Validations/validateChangePass.js";
import ChangePassConfirmationModal from "@/components/Modals/ChangePassConfirmationModal.vue";
import { LoginServices } from "@/service/API/loginServices.js";
import { ref } from "@vue/reactivity";
import { inject, onMounted, onUnmounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import InfoModal from "@/components/Modals/InfoModal.vue";
export default {
  name: "ChangePassword",
  components: {
    PasswordInput,
    InnerHeader,
    ChangePassConfirmationModal,
    InfoModal,
  },
  setup() {
    const password = ref("");
    const confirmPassword = ref("");
    const errors = ref({});
    const showModal = ref(false);
    const isLoggedin = ref(false);
    const commonstore = inject("commonStore");
    const store = inject("authenticateStore");
    const router = useRouter();

    // onUnmounted(() => {
    //   if (localStorage.getItem("emailId")) {
    //     localStorage.removeItem("emailId");
    //   }
    // });

    onMounted(() => {
      if (store.methods.isAuthenticate()) {
        isLoggedin.value = true;
      } else {
        isLoggedin.value = false;
      }
    });

    const getPassword = (e) => {
      password.value = e;
      console.log("pass", password.value);
    };

    const getConfirmPassword = (e) => {
      confirmPassword.value = e;
    };

    const checkValid = () => {
      let checkData = {
        password: password.value,
        confirm_password: confirmPassword.value,
      };
      const { isInvalid, error } = validateChangePass(checkData);
      // if(error.require) {
      //   commonstore.methods.displayRequiredToast()
      // }
      if (isInvalid) {
        errors.value = error;
        console.log(errors.value, "check error");
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const isSubmit = async (e) => {
      e.preventDefault();
      let inputData = {
        email: store.state.email_id,
        password: password.value,
      };
      if (!checkValid()) {
        // commonstore.methods.displayRequiredToast()
        return;
      } else {
        let res = await LoginServices.changePassword(inputData);
        console.log(res);
        if (res.status === 200) {
          showModal.value = true;
        } else if (res.response.data.error == "cannotUseOldPassword") {
          commonstore.state.loginInfoModal.isShow = true;
          commonstore.state.loginInfoModal.message =
            "새로운 비밀번호를 설정해 주세요.";
        } else {
          // alert(res.response.data.error);
          commonstore.state.loginInfoModal.isShow = true;
          commonstore.state.loginInfoModal.message = res.response.data.error;
        }
      }
    };

    const redirectPageTo = () => {
      showModal.value = false;
      router.push({ name: "home" });
      if (!store.methods.isAuthenticate()) {
        commonstore.state.isSheetOpen = true;
      }
    };

    return {
      password,
      confirmPassword,
      store,
      errors,
      showModal,
      isLoggedin,
      getPassword,
      getConfirmPassword,
      isSubmit,
      redirectPageTo,
      commonstore,
    };
  },
};
</script>
