<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader
          headerTitle="비밀번호 찾기"
          @backButtonPressed="
            $router.push({ name: 'home' }),
              (commonStore.state.isSheetOpen = true)
          "
        />
      </div>
    </div>
    <div class="container">
      <div class="form-wrapper-findid">
        <div class="form-wrapper">
          <form @submit="verifyDetails">
            <div class="form-group">
              <label>이메일</label>
              <div
                :class="`group ${errors && errors?.email ? 'valid-error' : ''}`"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="이메일 입력"
                  v-model="email"
                  style="text-transform: lowercase"
                />
              </div>
              <small v-if="errors && errors?.email" class="error-msgsign">{{
                errors?.email
              }}</small>
            </div>
            <div class="form-group">
              <label>핸드폰번호</label>
              <div class="mb-16">
                <div
                  :class="`group ${
                    errors && errors?.phone ? 'valid-error' : ''
                  }`"
                >
                  <div class="group-input">
                    <input
                      maxlength="11"
                      :type="inputType()"
                      class="form-control"
                      placeholder="-를 제외하고 입력"
                      v-model="number"
                      onkeypress="return /[0-9]/i.test(event.key)"
                    />
                  </div>
                  <button
                    type="button"
                    :class="`btn ${
                      disableAuthenticate
                        ? 'btn-default'
                        : 'btn-primary-outline'
                    }`"
                    @click="phoneAuthenticate('others')"
                    :disabled="disableAuthenticate"
                  >
                    인증하기
                  </button>
                </div>
                <small v-if="errors && errors?.phone" class="error-msgsign">{{
                  errors?.phone
                }}</small>
              </div>
              <div
                :class="`group ${errors && errors?.otp ? 'valid-error' : ''}`"
                v-if="isValidate"
              >
                <div class="group-input">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="인증번호 입력"
                    v-model="otp"
                    maxlength="6"
                    @keypress="onlyNumber"
                  />
                  <span
                    class="time"
                    id="timerDisplay"
                    v-show="!isResend"
                  ></span>
                </div>
                <button
                  type="button"
                  :class="`btn ${
                    !isResend ? 'btn-default' : 'btn-primary-outline'
                  }`"
                  @click="reSendOTPMethod"
                  :disabled="!isResend"
                >
                  재전송
                </button>
              </div>
              <small v-if="errors && errors?.otp" class="error-msgsign">{{
                errors?.otp
              }}</small>
            </div>
            <input
              type="submit"
              value="비밀번호 찾기"
              class="btn btn-primary lg"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
  <ForgotPassConfirmationModal
    :isModal="showModal"
    :Sns="false"
    @closeModal="redirectPageTo"
  />
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import ForgotPassConfirmationModal from "../../components/Modals/ForgotPassConfirmationModal.vue";
import { reactive, ref } from "@vue/reactivity";
import { LoginServices } from "@/service/API/loginServices.js";
import validateForgotPass from "@/Validations/validateForgotPass.js";
import phoneValidation from "@/Validations/validatePhone.js";
import { useRouter } from "vue-router";
import { inject, onUnmounted, watch } from "@vue/runtime-core";
export default {
  name: "ForgotPassword",
  components: {
    InnerHeader,
    ForgotPassConfirmationModal,
  },
  setup() {
    const email = ref("");
    const number = ref("");
    const errors = ref({});
    const storeSetInterval = ref(0);
    const isValidate = ref(false);
    const disableAuthenticate = ref(true);
    const isResend = ref(true);
    const timerTime = ref(180);
    const otp = ref("null");
    const showModal = reactive({
      state: false,
      msg: "",
      headerMsg: "",
      success: false,
    });

    const router = useRouter();
    const commonStore = inject("commonStore");
    const store = inject("authenticateStore");

    onUnmounted(() => {
      if (storeSetInterval.value) {
        clearInterval(storeSetInterval.value);
      }
    });

    watch(number, () => {
      if (number.value.length > 0) {
        disableAuthenticate.value = false;
      } else {
        disableAuthenticate.value = true;
      }
    });

    // timer on input field
    const startTimer = (duration) => {
      if (storeSetInterval.value) {
        clearInterval(storeSetInterval.value);
      }
      isResend.value = false;
      var timer = duration;
      storeSetInterval.value = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timerDisplay").innerHTML =
          minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(timer);
          document.getElementById("timerDisplay").innerHTML = "00:00";
          isResend.value = true;
        }
      }, 1000);
    };

    // Authenticate phone No. for OTP
    const phoneAuthenticate = async (typeAuth) => {
      var { isInvalid, error } = phoneValidation({ phone: number.value });
      if (isInvalid) {
        errors.value = error;
        isValidate.value = false;
        return;
      } else {
        errors.value = {};
        let authData = {
          type: typeAuth,
          phone_number: number.value,
        };
        let res = await LoginServices.authenticatePhone(authData);
        console.log(res);
        if (res.status === 200) {
          disableAuthenticate.value = true;
          otp.value = "";
          isValidate.value = true;
          startTimer(timerTime.value);
        }
      }
    };

    // Resend OTP
    const reSendOTPMethod = async () => {
      let res = await LoginServices.resendOtp({
        phone_number: number.value,
      });
      if (res.status === 200) {
        startTimer(timerTime.value);
      }
    };

    // check errors
    const checkValidate = (data) => {
      const { isInvalid, error } = validateForgotPass(data);
      if (isInvalid) {
        errors.value = error;
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const verifyDetails = async (e) => {
      e.preventDefault();
      if (!isValidate.value) {
        alert("핸드폰번호를 인증해 주세요.");
        errors.value = {};
        return;
      } else {
        let inputData = {
          email: email.value,
          phone_number: number.value,
          otp: otp.value,
        };
        if (!checkValidate(inputData)) {
          return;
        } else {
          let res = await LoginServices.passwordChangeVerify(inputData);
          console.log(res);
          if (res.status === 200) {
            showModal.state = true;
            showModal.msg = "새로운 비밀번호를 설정 후 로그인해주세요.";
            showModal.success = true;
          }
          if (res.response.data.error === "otpInvalid") {
            errors.value["otp"] = "인증번호가 일치하지 않습니다";
          } else if (res.response.data.error === "emailPhoneMismatch") {
            showModal.state = true;
            showModal.headerMsg = "본인확인 실패";
            showModal.msg = "이메일과 휴대폰 번호가 일치하지 않습니다.";
            showModal.success = false;
          } else if (res.response.data.error === "permisionDeniedForSns") {
            showModal.state = true;
            showModal.headerMsg = "SNS 회원가입 유저";
            showModal.msg =
              "SNS 회원가입 사용자는 해당 서비스 제공처에서 비밀번호를 변경해 주시기 바랍니다.";
            showModal.success = false;
          }
        }
      }
    };

    const redirectPageTo = () => {
      showModal.state = false;
      if (showModal.success) {
        localStorage.setItem("emailId", email.value);
        store.state.email_id = email.value;
        router.push({ name: "ChangePassword" });
      }
    };

    function inputType() {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    }

    function onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    }

    return {
      email,
      number,
      otp,
      errors,
      isValidate,
      showModal,
      disableAuthenticate,
      isResend,
      store,
      phoneAuthenticate,
      reSendOTPMethod,
      verifyDetails,
      redirectPageTo,
      inputType,
      commonStore,
      onlyNumber,
    };
  },
};
</script>
