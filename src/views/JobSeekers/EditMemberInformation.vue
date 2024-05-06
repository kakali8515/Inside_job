<template>
  <div class="back-wh common-sec pb-50">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader
          headerTitle="회원정보 수정"
          @backButtonPressed="$router.push('/job-seekers/profile-setting')"
        />
      </div>
    </div>

    <div class="form-wrapper edit-member-info-wrap">
      <form>
        <div class="container">
          <!-- <div class="form-group">
            <label>이메일</label>
            <input
              type="text"
              placeholder="alba123@naver.com"
              class="form-control"
              v-model="memberData.details.email"
            />
          </div> -->
          <!-- CODE FOR SNS LOGIN -->
          <div class="form-group sns-login-area">
            <label>이메일</label>
            <div class="group">
              <span v-if="memberData.details.sns_type !== null">
                <span v-if="memberData.details.sns_type === 'kakao'"
                  ><img src="@/assets/images/kakao-chat.png" alt=""
                /></span>
                <span v-else-if="memberData.details.sns_type === 'naver'"
                  ><img src="@/assets/images/naver-chat.png" alt=""
                /></span>
                <span
                  v-else-if="
                    memberData.details.sns_type === 'apple' || isIPhone === true
                  "
                  ><img src="@/assets/images/apple-chat.png" alt=""
                /></span>
              </span>
              <div class="group-input">
                <input
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="01012341234"
                  v-model="memberData.details.email"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>이름</label>
            <input
              type="text"
              placeholder="김알바"
              class="form-control"
              v-model="memberData.details.name"
              disabled
            />
            <small class="error-msgsign">{{ memberData.errors.name }}</small>
          </div>
          <div class="form-group" v-if="isFieldHide == true">
            <label>생년월일</label>
            <input
              type="text"
              placeholder="1990년 01월 01일"
              class="form-control"
              v-model="memberData.details.age"
              disabled
            />
            <small class="error-msgsign">{{ memberData.errors.age }}</small>
          </div>
          <div class="form-group">
            <label>성별</label>
            <input
              type="text"
              placeholder="여자"
              class="form-control"
              v-model="memberData.kogender"
              disabled
            />

            <small class="error-msgsign">{{ memberData.errors.gender }}</small>
          </div>

          <!-- <div class="form-group">
            <label>성별</label>
            <div class="radio-wrapper">
              <label class="radio-input"
                >남자
                <input
                  type="radio"
                  checked="checked"
                  name="radio"
                  value="m"
                  v-model="memberData.details.gender"
                />
                <span class="checkmark"></span>
              </label>
              <label class="radio-input"
                >여자
                <input
                  type="radio"
                  name="radio"
                  value="f"
                  v-model="memberData.details.gender"
                />
                <span class="checkmark"></span>
              </label>
              <small class="error-msgsign">{{
                memberData.errors.gender
              }}</small>
            </div>
          </div> -->
          <div class="form-group">
            <label>핸드폰번호</label>
            <div class="group">
              <div class="group-input">
                <input
                  type="text"
                  class="form-control blkclr"
                  placeholder="01012341234"
                  v-model="memberData.details.phone_number"
                  @keypress="onlyNumber"
                  @input="changephone"
                  maxlength="11"
                  :disabled="memberData.isMobileInputDisabled"
                />
                <!-- <span class="time" v-show="memberData.cdnReset">{{
                  memberData.timerDisplay
                }}</span> -->
              </div>
              <button
                v-if="memberData.isMobileInputDisabled === true"
                type="button"
                :class="
                  memberData.isChangeBtnDisabled === true
                    ? 'btn btn-default my-page-button'
                    : 'btn btn-outline-primary my-page-button'
                "
                @click="memberData.isMobileInputDisabled = false"
                :disabled="memberData.isChangeBtnDisabled"
              >
                변경하기
              </button>
              <button
                v-if="
                  memberData.old_phone_number ===
                    memberData.details.phone_number &&
                  memberData.details.phone_number.length === 11 &&
                  memberData.isMobileInputDisabled === false
                "
                type="button"
                class="btn btn-default btn-disable-gray-outline my-page-button"
                disabled
              >
                변경하기
              </button>

              <button
                v-if="
                  memberData.old_phone_number !==
                    memberData.details.phone_number &&
                  memberData.isMobileInputDisabled === false
                "
                type="button"
                :class="
                  memberData.isResendDisabled === false &&
                  memberData.details.phone_number.length === 11
                    ? 'btn btn-outline-primary my-page-button'
                    : 'btn btn-default btn-disable-gray-outline my-page-button'
                "
                @click="(memberData.isMobileInputDisabled = false), sendotp()"
                :disabled="memberData.details.phone_number.length !== 11"
              >
                <!-- :disabled="memberData.isResendDisabled && memberData.details.phone_number.length === 11" -->
                {{ memberData.sendBtnTitle }}
              </button>
              <!-- <button
                v-if="memberData.timerDisplay == '00:00'"
                type="button"
                class="btn btn-primary-outline"
                @click="sendotp()"
              >
                재전송하기resend
              </button> -->
            </div>
            <small class="error-msgsign">{{
              memberData.errors.phone_number
            }}</small>
            <div class="group my-mt-32" v-show="memberData.cdnReset">
              <div class="group-input">
                <input
                  type="text"
                  class="form-control blkclr"
                  placeholder="123456"
                  @keypress="onlyNumber"
                  maxlength="6"
                  v-model="memberData.details.otp"
                />
                <span
                  class="time time2"
                  v-show="memberData.cdnReset"
                  v-if="memberData.timerDisplay !== '00:00'"
                  >{{ memberData.timerDisplay }}</span
                >
              </div>
              <!-- <button
                v-if="memberData.timerDisplay == '00:00'"
                type="button"
                class="btn btn-primary-outline"
                @click="sendotp()"
              >
                재전송
              </button> -->
              <button
                @click="verifyotp()"
                type="button"
                class="btn btn-primary-outline my-page-button"
              >
                인증하기
              </button>
            </div>
          </div>
          <div class="form-group address-area" v-if="isFieldHide == true">
            <label>주소</label>
            <div class="group">
              <div class="group-input">
                <input
                  type="text"
                  class="form-control blkclr"
                  placeholder="123123"
                  maxlength="5"
                  v-model="memberData.details.postal_code"
                  readonly
                />
              </div>
              <button
                type="button"
                class="btn btn-outline-primary my-page-button"
                @click="findAdd('address')"
              >
                주소찾기
              </button>
            </div>
            <small class="error-msgsign">{{
              memberData.errors.postal_code
            }}</small>
            <div class="group">
              <input
                type="text"
                class="form-control blkclr"
                placeholder="서울 00구 00로 111-1"
                v-model="memberData.details.address"
                readonly
              />
            </div>
            <small class="error-msgsign">{{
              memberData.errors.postal_code
            }}</small>
            <div class="form-group">
              <label>상세 주소<span class="gr">[선택]</span></label>
              <div class="group-input">
                <input
                  class="form-control"
                  v-model="memberData.details.detailed_addr"
                  placeholder="상세 주소"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="required-fields-icon" v-if="store.state.requiredToastMsgShow">
        <p>
          <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
          입력값을 확인해 주세요.
        </p>
      </div>
      <MemberComfirmationModal
        :isModal="memberData.isMemberConfirmModal"
        @confirmModal="$router.push('/job-seekers/profile-setting')"
      />
      <AuthenticationComplete
        :isModal="memberData.isAuthenticationComplete"
        @confirmModal="memberData.isAuthenticationComplete = false"
      />
      <VerifyPhoneNumber
        :isModal="memberData.isVerifyPhoneNumber"
        @conifrmModel="memberData.isVerifyPhoneNumber = false"
      />
    </div>
    <LoadingBar
      v-if="memberData.loading.state"
      :loadingMsg="memberData.loading.message"
    />
    <VueDaumPostcode
      @complete="handleAddress"
      class="modalone"
      v-show="memberData.modalshow"
    ></VueDaumPostcode>
  </div>
  <div class="btm-button-group fixed-btn-otr">
    <button type="button" class="btn btn-primary lg" @click="editMemberInfo()">
      수정하기
    </button>
  </div>
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import { profile } from "@/service/API/profile.js";
import { AuthenticateServices } from "@/service/API/AuthenticateServices.js";
import { reactive } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import MemberComfirmationModal from "@/components/Modals/MemberComfirmationModal.vue";
import AuthenticationComplete from "@/components/Modals/AuthenticationComplete.vue";
import { useRouter } from "vue-router";
import validate from "@/Validations/editMember.js";
import { inject } from "@vue/runtime-core";
import { useCookies } from "vue3-cookies";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import VerifyPhoneNumber from "@/components/Modals/VerifyPhoneNumber.vue";
export default {
  name: "EditMemberInformation",
  components: {
    InnerHeader,
    MemberComfirmationModal,
    AuthenticationComplete,
    LoadingBar,
    VerifyPhoneNumber,
  },
  data() {
    return {
      cookies: new useCookies(),
      isFieldHide: JSON.parse(this.$cookies.get("isfieldHide")),
      isIPhone: JSON.parse(this.$cookies.get("isiPhone")),
    };
  },
  setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const memberData = reactive({
      details: {
        email: "",
        name: "",
        age: "",
        gender: "",
        phone_number: "",
        address: "",
        postal_code: "",
        sns_type: null,
        otp: "",
        region_1st_depth: "",
        region_2nd_depth: "",
        region_3rd_depth: "",
        y: "", //lat
        x: "", //lng
        detailed_addr: "",
      },
      loading: {
        state: false,
        message: "잠시만 기다려 주세요.",
      },
      gender: "",
      errors: {},
      isMemberConfirmModal: false,
      alladdr: "",
      modalshow: false,
      countDown: "180",
      cdnReset: false,
      defaultbtn: "인증하기",
      otpsendbtn: true,
      timerDisplay: "",
      old_phone_number: "",
      isChangeBtnDisabled: false,
      isMobileInputDisabled: true,
      isAuthenticationComplete: false,
      sendBtnTitle: "전송하기",
      isValidate: false,
      isResendDisabled: false,
      isVerifyPhoneNumber: false,
    });

    onMounted(() => {
      getMemberInfo();
    });

    watch(
      () => memberData.modalshow,
      (newVal, oldVal) => {
        if (newVal) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );
    //--------------------------------------------------------------------------
    function setdepth(searchdata) {
      console.log("searchdata", searchdata);
      memberData.loading.state = true;
      fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${searchdata}`,
        {
          method: "get",
          headers: {
            Authorization: `KakaoAK 5118e62bb72b728896d88de20f4b265b`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          memberData.details.region_1st_depth =
            data.documents[0].address.region_1depth_name;
          memberData.details.region_2nd_depth =
            data.documents[0].address.region_2depth_name;
          memberData.details.region_3rd_depth =
            data.documents[0].address.region_3depth_h_name;
          memberData.details.y = data.documents[0].address.y; //lat
          memberData.details.x = data.documents[0].address.x; //lng
          console.log("Success:", data.documents[0].address);
          memberData.loading.state = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          memberData.loading.state = false;
        });
    }
    //-----------------------------------------------------------------------------
    async function getMemberInfo() {
      let res = await profile.userDeatils();
      if (res.status === 200) {
        memberData.details.email = res.data.email;
        memberData.details.name = res.data.name;
        memberData.details.age =
          res.data.age != null
            ? store.methods.dateFormat(res.data.age, "YYYY년 MM월 DD일")
            : "";
        memberData.details.gender = res.data.gender;
        memberData.kogender = res.data.gender == "m" ? "남자" : "여자";
        memberData.details.phone_number = res.data.phone_number;
        memberData.old_phone_number = res.data.phone_number;
        memberData.details.address = res.data.address;
        memberData.details.postal_code = res.data.postal_code;
        memberData.details.sns_type = res.data.sns_type;
        memberData.details.region_1st_depth = res.data.region_1st_depth;
        memberData.details.region_2nd_depth = res.data.region_2nd_depth;
        memberData.details.region_3rd_depth = res.data.region_3rd_depth;
        memberData.details.y = res.data.lat;
        memberData.details.x = res.data.long;
        memberData.details.detailed_addr = res.data.detail_address;
      }
    }

    async function editMemberInfo() {
      // delete memberData.details.sns_type;
      // delete memberData.details.email;
      let validationData = {
        // name: memberData.details.name,
        // age: memberData.details.age,
        // gender: memberData.details.gender,
        phone_number: memberData.details.phone_number,
        address: memberData.details.address,
        postal_code: memberData.details.postal_code,
      };
      let inputData = {
        phone_number: memberData.details.phone_number,
        address: memberData.details.address,
        postal_code: memberData.details.postal_code,
        region_1st_depth: memberData.details.region_1st_depth,
        region_2nd_depth: memberData.details.region_2nd_depth,
        region_3rd_depth: memberData.details.region_3rd_depth,
        lat: memberData.details.y,
        long: memberData.details.x,
        detail_address:
          memberData.details.detailed_addr == ""
            ? null
            : memberData.details.detailed_addr,
        // otp: memberData.details.otp,
      };
      let validation = validate(validationData);
      if (validation.error.require) {
        store.methods.displayRequiredToast();
      }
      if (validation.isInvalid) {
        // store.methods.displayRequiredToast()
        memberData.errors = validation.error;
      } else if (
        memberData.isValidate === false &&
        memberData.old_phone_number !== memberData.details.phone_number
      ) {
        // alert("휴대폰번호를 인증해주세요.");
        memberData.isVerifyPhoneNumber = true;
      } else {
        let res = await profile.updateUserDeatils(inputData);
        if (res.status === 200) {
          // router.push("/job-seekers/profile-setting");
          memberData.isMemberConfirmModal = true;
        }
      }
    }

    function findAdd(addr) {
      memberData.alladdr = addr;
      memberData.modalshow = true;
    }
    function handleAddress(data) {
      console.log("fgdgh");
      setdepth(data.address);
      if (memberData.alladdr == "addressCompany") {
        memberData.details.postal_code = data.zonecode;
        memberData.details.address = data.address;
      }
      if (memberData.alladdr == "address") {
        memberData.details.address = data.address;
        memberData.details.postal_code = data.zonecode;
      }
      memberData.modalshow = false;
    }

    function onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    }

    function changephone() {
      if (
        memberData.old_phone_number !== memberData.details.phone_number &&
        memberData.details.phone_number.length === 11
      ) {
        memberData.isChangeBtnDisabled = false;
      } else {
        memberData.isChangeBtnDisabled = true;
      }
    }

    function countDownTimer() {
      if (memberData.countDown > 0) {
        setTimeout(() => {
          memberData.countDown -= 1;
          let minutes = parseInt(memberData.countDown / 60, 10);
          let seconds = parseInt(memberData.countDown % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          memberData.timerDisplay = `${minutes}:${seconds}`;
          countDownTimer();
        }, 1000);
      } else {
        memberData.isResendDisabled = false;
      }
    }

    function sendotp() {
      memberData.isResendDisabled = true;
      memberData.countDown = 180;
      AuthenticateServices.sendOTP("signup", memberData.details.phone_number)
        .then((res) => {
          memberData.sendBtnTitle = "재전송하기";
          memberData.otpsendbtn = false;
          memberData.defaultbtn = "전송하기";
          memberData.cdnReset = true;
          countDownTimer();
        })
        .catch((err) => console.log(err));
    }

    function verifyotp() {
      AuthenticateServices.verifyOTP(
        memberData.details.phone_number,
        memberData.details.otp
      )
        .then(() => {
          memberData.isAuthenticationComplete = true;
          memberData.details.otp = "";
          memberData.cdnReset = false;
          memberData.isValidate = true;
          memberData.isResendDisabled = false;
        })
        .catch((err) => {
          alert("인증번호가 일치하지 않습니다");
        });
    }

    return {
      memberData,
      getMemberInfo,
      editMemberInfo,
      findAdd,
      handleAddress,
      onlyNumber,
      sendotp,
      changephone,
      verifyotp,
      store,
      setdepth,
    };
  },
};
</script>

<style>
.modalone {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.vue-daum-postcode-container {
  height: 350px !important;
  max-width: 330px;
  margin: 0 auto;
  border-radius: 8px !important;
  overflow: hidden;
}
</style>
