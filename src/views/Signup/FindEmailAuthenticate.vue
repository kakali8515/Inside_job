<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader
          headerTitle="이메일 찾기"
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
          <form @submit="isSubmit">
            <!-- <div class="form-group">
                                <label>핸드폰번호</label>
                                <div class="group">
                                    <div class="group-input">
                                        <input type="text" class="form-control" placeholder="01012341234"  />
                                    </div>
                                    <button type="button" class="btn btn-default">전송하기</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>핸드폰번호</label>
                                <div class="group">
                                    <div class="group-input">
                                        <input type="text" class="form-control" placeholder="인증번호 입력"  />
                                        <div class="otp-timer">2:59</div>
                                    </div>
                                    <button type="button" class="btn btn-outline-primary">재전송</button>
                                </div>
                            </div> -->
            <div class="form-group">
              <label class="find-email-label">핸드폰번호</label>
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
                      v-model="phoneNo"
                      onkeypress="return /[0-9]/i.test(event.key)"
                    />
                    <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
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
                    전송하기
                  </button>
                </div>
                <small v-if="errors && errors?.phone" class="error-msgsign">{{
                  errors?.phone
                }}</small>
              </div>
              <div class="mb-16" v-if="isValidate">
                <div
                  :class="`group ${errors && errors?.otp ? 'valid-error' : ''}`"
                >
                  <div class="group-input">
                    <input
                      :type="inputType()"
                      class="form-control"
                      placeholder="인증번호 입력"
                      v-model="otp"
                      maxlength="6"
                      @keypress="onlyNumber"
                    />
                    <span class="time" id="timerDisplay" v-show="!isResend"></span>
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
            </div>
            <input
              type="submit"
              value="이메일 찾기"
              class="btn btn-primary lg"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
  <EmailVerificationModal
    :isModal="showModal"
    :emailId="forgottenEmail"
    @closeModal="redirectTo($event)"
  />
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import { ref } from "@vue/reactivity";
import { inject, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { LoginServices } from "@/service/API/loginServices.js";
import phoneValidation from "@/Validations/validatePhone.js";
import findIdValidate from "@/Validations/validateFindId.js";
import EmailVerificationModal from "@/components/Modals/EmailVerificationModal.vue";
import { useRouter } from "vue-router";
export default {
  name: "FindEmailAuthenticate",
  components: {
    InnerHeader,
    EmailVerificationModal,
  },
  setup() {
    const timerTime = ref(180);
    const isValidate = ref(false);
    const disableAuthenticate = ref(true);
    const isResend = ref(true);
    const phoneNo = ref("");
    const otp = ref("");
    const errors = ref({});
    const storeSetInterval = ref(0);
    const forgottenEmail = ref("");
    const showModal = ref(false);
    const router = useRouter();
    const disableSubmit = ref(false);
    const commonStore = inject("commonStore");

    watch(phoneNo, () => {
      console.log(phoneNo.value.length);
      if (phoneNo.value.length !== 0) {
        disableAuthenticate.value = false;
      } else {
        disableAuthenticate.value = true;
      }
    });

    onUnmounted(() => {
      if (storeSetInterval.value) {
        clearInterval(storeSetInterval.value);
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
      let authData = {
        type: typeAuth,
        phone_number: phoneNo.value,
      };
      var { isInvalid, error } = phoneValidation({ phone: phoneNo.value });
      if (isInvalid) {
        errors.value = error;
        console.log("errors", errors.value);
        return;
      } else {
        errors.value = {};
        let res = await LoginServices.authenticatePhone(authData);
        console.log(res);
        if (res.status === 200) {
          disableAuthenticate.value = true;
          isValidate.value = true;
          startTimer(timerTime.value);
        }
      }
    };

    // Resend OTP
    const reSendOTPMethod = async () => {
      let res = await LoginServices.resendOtp({
        phone_number: phoneNo.value,
      });
      console.log("resend otp", res);
      if (res.status === 200) {
        startTimer(timerTime.value);
      }
    };

    // Find Email ID method
    const isSubmit = async (e) => {
      e.preventDefault();
      if (!isValidate.value) {
        // alert("휴대폰번호를 인증해주세요.");
        commonStore.state.loginInfoModal.isShow = true;
        commonStore.state.loginInfoModal.message = "휴대폰번호를 인증해주세요.";
        errors.value = {};
        return;
      } else {
        var { isInvalid, error } = findIdValidate({
          phone: phoneNo.value,
          otp: otp.value,
        });
        if (isInvalid) {
          errors.value = error;
          // isValidate.value = false;
          console.log("errors", errors.value);
          return;
        } else {
          errors.value = {};
          let res = await LoginServices.findEmail({
            phone_number: phoneNo.value,
            otp: otp.value,
          });
          console.log(res);
          if (res.status === 200) {
            forgottenEmail.value = res.data.email;
            showModal.value = true;
          }
          if (res.response.data.error === "otpExpired") {
            // alert("인증번호가 일치하지 않습니다");
            errors.value["otp"] = "인증번호가 일치하지 않습니다";
            // errors.value["phone"] = "인증번호가 일치하지 않습니다";
          } else if (res.response.data.error == "userNotExists") {
            // alert("등록되지 않은 번호입니다.");
            commonStore.state.loginInfoModal.isShow = true;
            commonStore.state.loginInfoModal.message =
              "등록되지 않은 번호입니다.";
          } else {
            alert(res.response.data.error);
          }
        }
      }
    };

    const redirectTo = (e) => {
      showModal.value = e;
      router.push({ name: "home" });
      commonStore.state.isSheetOpen = true;
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
      phoneAuthenticate,
      reSendOTPMethod,
      isSubmit,
      redirectTo,
      inputType,
      isValidate,
      disableAuthenticate,
      phoneNo,
      errors,
      otp,
      forgottenEmail,
      showModal,
      isResend,
      commonStore,
      onlyNumber,
    };
  },
};
</script>
