<template>
  <div class="form-wrapper">
    <div class="cm-top-space">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">핸드폰 인증</h3>
        </div>
        <div class="form-group">
          <label>이름</label>
          <input
            type="text"
            class="form-control"
            placeholder="이름을 입력해 주세요"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label>나이</label>
          <input
            type="text"
            v-model="myAge"
            class="form-control"
            placeholder="ex)19990101"
          />
        </div>
        <div class="form-group">
          <label>핸드폰번호</label>
          <!-- <div class="group mb-12">
            <div class="group-input">
              <input
                type="text"
                class="form-control"
                placeholder="-를 제외하고 입력해 주세요"
              />
            </div>
            <button type="button" class="btn btn-default">인증하기</button>
          </div> -->
          <div class="group mb-12">
            <div class="group-input">
              <input
                type="text"
                class="form-control"
                placeholder="-를 제외하고 입력해 주세요"
                v-model="mobile"
              />
              <span class="time" v-show="cdnReset">{{ countDown }}</span>
              <button></button>
            </div>
            <button
              v-show="otpsendbtn"
              type="button"
              :class="
                mobile == '' ? 'btn btn-default' : 'btn btn-primary-outline'
              "
              :disabled="mobile == '' ? true : false"
              @click="sendotp()"
            >
              {{ defaultbtn }}
            </button>
          </div>
          <div class="group" v-show="cdnReset">
            <div class="group-input">
              <input
                type="text"
                class="form-control"
                placeholder="123456"
                v-model="otp"
              />
            </div>
            <button
              @click="verifyotp"
              type="button"
              class="btn btn-primary-outline"
            >
              재전송
            </button>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary lg"
          @click="checkMovestep2"
        >
          필수정보 입력하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticateService from "../service/API/authenticate";
export default {
  name: "FormStepOne",
  data() {
    return {
      cdnReset: false,
      defaultbtn: "인증하기",
      otpsendbtn: true,
      name: "",
      myAge: "",
      countDown: "180",
      mobile: "",
      type: "signup",
      otp: "",
    };
  },
  created() {
    this.authService = new AuthenticateService();
  },
  methods: {
    submitData(e) {
      console.log(this.name, this.myAge, this.mobile);
      this.$emit("passData", {
        name: this.name,
        age: this.myAge,
        mobile: this.mobile,
      });
    },
    checkMovestep2() {
      if (this.name == "" && this.myAge == "" && this.mobile == "") {
        alert("please fill all fields");
      } else {
        this.submitData();
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    sendotp() {
      this.countDown = 180;
      this.authService
        .sendOTP(this.type, this.mobile)
        .then((res) => {
          this.otpsendbtn = false;
          this.defaultbtn = "전송하기";
          this.cdnReset = true;
          this.countDownTimer();
        })
        .catch((err) => console.log(err));
    },
    verifyotp() {
      this.authService
        .verifyOTP(this.mobile, this.otp)
        .then(() => {
          alert("OTP가 인증되었습니다");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
