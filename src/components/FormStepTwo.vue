<template>
  <div class="form-wrapper" v-show="stepOne">
    <div class="cm-top-space">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">핸드폰 인증</h3>
        </div>
        <!-- {{ isFieldHide }} -- {{ checkSns }} -- {{ isAppaleId }} -->
        <div
          class="form-group"
          v-if="isAppaleId ? (!isFieldHide && !checkSns) || isFieldHide : true"
        >
          <label>이름</label>
          <input
            type="text"
            class="form-control"
            placeholder="이름을 입력해 주세요"
            v-model="name"
            @blur="this.name = removeSpaces(this.name)"
          />
          <small class="error-msgsign">{{ error.name }}</small>
        </div>
        <div class="form-group" v-if="isAppaleId ? isFieldHide : true">
          <label>나이</label>
          <input
            :type="inputType()"
            v-model="myAge"
            class="form-control"
            maxlength="8"
            placeholder="ex)19990101"
            onkeypress="return /[0-9]/i.test(event.key)"
          />
          <small class="error-msgsign">{{ error.age }}</small>
        </div>
        <div
          class="form-group"
          v-if="isAppaleId ? (!isFieldHide && !checkSns) || isFieldHide : true"
        >
          <label>핸드폰번호</label>
          <div class="group mb-12">
            <div class="group-input">
              <input
                :type="inputType()"
                class="form-control"
                placeholder="-를 제외하고 입력해 주세요"
                v-model="mobile"
                @keypress="onlyNumber"
                @keyup="mobileChange"
                maxlength="11"
              />
              <small class="error-msgsign"
                >{{ error.phone }}{{ lengtherror }}</small
              >
              <span class="time" v-show="cdnReset && !timerZero">{{
                timerDisplay
              }}</span>
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
            <button v-show="otpsendbtndisable" class="btn btn-default" disabled>
              {{ defaultbtn }}
            </button>
          </div>
          <div class="group" v-show="cdnReset">
            <div class="group-input">
              <input
                :type="inputType()"
                class="form-control"
                placeholder="123456"
                maxlength="6"
                @keypress="onlyNumber"
                v-model="otp"
              />
            </div>
            <button
              v-if="timerDisplay == '00:00'"
              type="button"
              class="btn btn-primary-outline"
              @click="sendotp()"
            >
              재전송
            </button>
            <button v-else type="button" class="btn btn-default">재전송</button>
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
  <div class="form-wrapper pb-32" v-show="steptwo">
    <!-- job seeker -->
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">회원정보 입력</h3>
        </div>
        <div
          class="form-group"
          v-if="isAppaleId ? (!isFieldHide && !checkSns) || isFieldHide : true"
        >
          <label>이메일 <span>[필수]</span></label>
          <div class="group">
            <div class="group-input">
              <input
                type="email"
                class="form-control"
                placeholder="이메일을 입력해 주세요"
                v-model="email"
                @keyup="ValidateEmail()"
                :disabled="emaildisable"
              />
              <small class="error-msgsign">{{ error.email }}</small>
              <small class="error-msgsign">{{ invalidmail }}</small>
              <small
                style="color: green"
                v-show="success && invalidmail == '' && error.email == ''"
                >*사용 가능한 이메일입니다*</small
              >
            </div>
            <button
              type="button"
              class="btn btn-primary-outline"
              @click="checkEmail"
            >
              중복확인
            </button>
          </div>
        </div>
        <!-- {{ snsType + " - snsType" }} -->
        <template v-if="snsType == ''">
          <div class="form-group">
            <label>비밀번호<span>[필수]</span></label>
            <div class="password-input pass-confirm-match">
              <input
                v-model="pass"
                :type="showInput ? 'text' : 'password'"
                class="form-control"
                placeholder="영문/숫자/특수문자 포함 8자 ~ 16자"
                @blur="confpassword()"
                maxlength="16"
              />
              <!-- <input v-model="pass" :type="showInput ? 'text' : 'password'" class="form-control"
              placeholder="영문/숫자/특수문자 포함 8자 ~ 16자" @blur="confpassword()" /> -->
              <small class="error-msgsign">{{ error.password }}</small>
              <span class="eye"
                ><img
                  src="@/assets/icons/eye.svg"
                  alt=""
                  @click="showpass('pass')"
                  v-show="eyeopen"
              /></span>
              <span class="eye"
                ><img
                  src="@/assets/icons/eye-open.svg"
                  alt=""
                  @click="hidepass('pass')"
                  v-show="eyeclose"
              /></span>
            </div>
          </div>
          <div class="form-group">
            <label>비밀번호 확인 <span>[필수]</span></label>
            <div class="password-input pass-confirm-match">
              <input
                v-model="confPass"
                :type="showInput2 ? 'text' : 'password'"
                class="form-control"
                placeholder="비밀번호를 한 번 더 입력해 주세요"
                maxlength="16"
                @keyup="confpassword()"
              />
              <small class="error-msgsign">{{ error.confirmPassword }}</small>
              <div>
                <small class="error-msgsign" v-if="conf_errmsg !== ''">{{
                  conf_errmsg
                }}</small>
                <small style="color: green">{{ conf_msg }}</small>
              </div>
              <small>
                {{ pass_msg }}
              </small>
              <span class="eye"
                ><img
                  src="@/assets/icons/eye.svg"
                  alt=""
                  @click="showpass('cnfpass')"
                  v-show="eyeopen2"
              /></span>
              <span class="eye"
                ><img
                  src="@/assets/icons/eye-open.svg"
                  alt=""
                  @click="hidepass('cnfpass')"
                  v-show="eyeclose2"
              /></span>
            </div>
          </div>
        </template>
        <div class="form-group">
          <label>성별<span>[필수]</span></label>
          <div class="radio-wrapper">
            <label class="radio-input"
              >남자
              <input
                type="radio"
                name="radio-gender"
                value="man"
                v-model="picked"
              />
              <span class="checkmark"></span>
            </label>
            <label class="radio-input"
              >여자
              <input
                type="radio"
                name="radio-gender"
                value="woman"
                v-model="picked"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="form-group" v-if="isAppaleId ? isFieldHide : true">
          <label>주소<span>[필수]</span></label>
          <div class="group mb-16">
            <div class="group-input">
              <input
                :type="inputType()"
                class="form-control"
                placeholder=""
                v-model="zcode"
                disabled
                @keypress="onlyNumber"
                maxlength="5"
              />
              <small class="error-msgsign">{{ error.addr1 }}</small>
            </div>
            <button
              type="button"
              class="btn btn-primary-outline"
              @click="findAdd('address')"
            >
              주소찾기
            </button>
          </div>

          <input
            type="text"
            class="form-control"
            placeholder="상세 주소를 입력해 주세요"
            v-model="address"
            disabled
          />
          <small class="error-msgsign">{{ error.addr2 }}</small>
        </div>
        <div class="form-group mb-0">
          <label>상세 주소<span class="gr">[선택]</span></label>
          <div class="group-input">
            <input class="form-control" v-model="detailed_addr" placeholder="상세 주소" />
          </div>
        </div>
      </div>

      <VueDaumPostcode
        @complete="handleAddress"
        class="modalone"
        v-show="modalshow"
      ></VueDaumPostcode>
    </div>

    

    <!-- Recruiter -->
    <!-- breaker -->
    <!-- <div class="cm-top-space pb-32" >
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">회원정보 입력 requiter</h3>
        </div>
        <div class="form-group">
          <label>이메일 <span>[필수]</span></label>
          <div class="group">
            <div class="group-input">
              <input
                type="text"
                class="form-control"
                placeholder="이메일을 입력해 주세요"
              />
            </div>
            <button type="button" class="btn btn-primary-outline">
              중복확인
            </button>
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호 <span>[필수]</span></label>
          <div class="password-input">
            <input
              type="text"
              class="form-control"
              placeholder="영문/숫자/특수문자 포함 8자 ~ 16자"
            />
            <span class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span>
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호 확인 <span>[필수]</span></label>
          <div class="password-input">
            <input
              type="text"
              class="form-control"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
            />
            <span class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span>
          </div>
        </div>
        <div class="form-group">
          <label>성별 <span>[필수]</span></label>
          <div class="radio-wrapper">
            <label class="radio-input"
              >남자
              <input type="radio" checked="checked" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="radio-input"
              >여자
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>주소<span>[필수]</span></label>
          <div class="group mb-16">
            <div class="group-input">
              <input type="text" class="form-control" placeholder="" />
            </div>
            <button type="button" class="btn btn-primary-outline">
              주소찾기
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="상세 주소를 입력해 주세요"
          />
        </div>
      </div>
    </div> -->
    <!-- breaker -->
    <div v-show="requirter_visible">
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">기업정보 입력</h3>
            </div>
            <div class="form-group">
              <label>기업 프로필<span class="gr">[선택]</span></label>
              <div class="file-input signup-profile-img">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  @change="onFileChange"
                />
                <!-- <span>{{fileName}}</span> -->
                <label class="file-input__label" for="file-input">
                  <span
                    ><img
                      id="blah"
                      src="@/assets/images/image.png"
                      alt="profile"
                      v-show="org" /><img :src="preview" v-show="dynamic"
                  /></span>
                  <em class="edit"
                    ><img src="@/assets/icons/edit-icon.svg" alt=""
                  /></em>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>기업/상호명<span>[필수]</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="기업명을 입력해 주세요"
                v-model="companyName"
              />
              <small class="error-msgsign">{{ error.cName }}</small>
            </div>
            <div class="form-group" v-if="isAppaleId ? isFieldHide : true">
              <label>기업주소<span>[필수]</span></label>
              <div class="group mb-16">
                <div class="group-input">
                  <input
                    :type="inputType()"
                    class="form-control"
                    placeholder=""
                    v-model="zncode"
                    @keypress="onlyNumber"
                    maxlength="6"
                    disabled
                  />
                  <small class="error-msgsign">{{ error.czcode }}</small>
                </div>
                <button
                  type="button"
                  class="btn btn-primary-outline"
                  @click="findAdd('addressCompany')"
                >
                  주소찾기
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="상세 주소를 입력해 주세요"
                v-model="zAddress"
                disabled
              />
              <small class="error-msgsign">{{ error.caddr }}</small>
            </div>
            <div class="form-group">
              <label>상세 주소<span class="gr">[선택]</span></label>
              <div class="group-input">
                <input class="form-control" v-model="detailed_companyAddr" placeholder="상세 주소" />
              </div>
            </div>
            <div class="form-group">
              <label>담당자명<span>[필수]</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="담당자명을 입력해 주세요"
                v-model="contactPerson"
              />
              <small class="error-msgsign">{{ error.cPerson }}</small>
            </div>
            <div class="form-group">
              <label>산업군<span class="gr">[선택]</span></label>
              <!-- <select class="form-control" v-model="industryType">
                <option
                  v-for="option in industrytype"
                  v-bind:value="option.id"
                  :key="option.id"
                >
                  {{ option.text }}
                </option>
              </select> -->
              <selectoption
                class="my-dropdown-toggle salary-drop"
                :options="industrytype"
                :selected="industryType"
                v-on:updateOption="levelset"
                :placeholder="'선택'"
                :closeOnOutsideClick="boolean"
              >
              </selectoption>
            </div>
            <div class="form-group">
              <label>직원수<span class="gr">[선택]</span></label>
              <input
                :type="inputType()"
                class="form-control"
                placeholder="직원수를 입력해 주세요"
                v-model="noEmployee"
                @keypress="onlyNumber"
              />
            </div>
            <div class="form-group mb-0">
              <label>소개글<span class="gr">[선택]</span></label>
              <textarea
                class="form-control"
                placeholder="소개글을 입력해 주세요"
                @keyup="getlength(intro)"
                v-model="intro"
                maxlength="500"
              ></textarea>
              <div class="count">
                <span
                  class="count-txt"
                  @click="(intro = ''), (introlength = '0')"
                  ><img src="@/assets/icons/initialization.svg" alt="" />
                  초기화</span
                >
                <!-- <span class="count-txt" @click="resetData"><img src="@/assets/icons/initialization.svg" alt="" />
                  초기화</span> -->

                <p>
                  <span>{{ introlength }}</span> /500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-top">
      <div class="cm-top-space">
        <div class="container">
      <div class="form-group">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">개인정보 제공 기간 선택<span class="essential">[필수]</span></h3>
          </div>
          <div class="radio-wrapper">
            <label class="radio-input"
              >1년
              <input
                type="radio"
                name="radio-duration"
                value="one_year"
                v-model="processing_period"
              />
              <span class="checkmark"></span>
            </label>
            <label class="radio-input"
              >3년
              <input
                type="radio"
                name="radio-duration"
                value="three_year"
                v-model="processing_period"
              />
              <span class="checkmark"></span>
            </label>
            <label class="radio-input"
              >무제한
              <input
                type="radio"
                name="radio-duration"
                value="unlimited"
                v-model="processing_period"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <small class="error-msgsign">{{ error.pInfoperiod }}</small>
        </div>
        </div>
        </div>
    </div>
    <!-- breaker -->
    <div class="border-top">
      <div class="cm-top-space">
        <div class="container">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">이용약관 동의</h3>
          </div>
          <div class="checkbox-otr">
            <div class="all-select-check">
              <label class="check-input"
                >전체동의
                <input
                  type="checkbox"
                  v-model="checkedall"
                  @change="selectall()"
                  :checked="checkedManually"
                />
                <span class="checkmark"></span>
              </label>
            </div>
            <ul class="check-list agreement-list">
              <li v-if="typeOfUser == 'job_recruiter'">
                <label class="check-input"
                  ><span class="check-label"
                    ><em>[필수]</em> 회원 이용약관 동의</span
                  >
                  <a
                    href="#"
                    class="gray-link"
                    @click.prevent="openPrivacyPolicy('memberBasedLocation')"
                    >보기</a
                  >
                  <input type="checkbox" v-model="check1" :checked="check1" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li v-else>
                <label class="check-input"
                  ><span class="check-label"
                    ><em>[필수]</em> 회원 이용약관 동의</span
                  >
                  <a
                    href="#"
                    class="gray-link"
                    @click.prevent="openPrivacyPolicy('seekerTerms')"
                    >보기</a
                  >
                  <input type="checkbox" v-model="check1" :checked="check1" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li>
                <label class="check-input"
                  ><span class="check-label"
                    ><em>[필수]</em> 위치기반 서비스 이용약관 동의</span
                  >
                  <a
                    href="#"
                    class="gray-link"
                    @click.prevent="openPrivacyPolicy('termsOfServices')"
                    >보기</a
                  >
                  <input type="checkbox" v-model="check2" :checked="check2" />
                  <span class="checkmark"></span>
                </label>
              </li>
              <li>
                <label class="check-input"
                  ><span class="check-label"
                    ><em>[필수]</em>개인정보 수집 및 이용 동의</span
                  >
                  <a
                    href="#"
                    class="gray-link"
                    @click.prevent="openPrivacyPolicy('privacyPolicy')"
                    >보기</a
                  >
                  <input type="checkbox" v-model="check3" :checked="check3" />
                  <span class="checkmark"></span>
                </label>
              </li>
            </ul>
          </div>
          <button class="btn btn-primary lg" @click.prevent="signup()">
            가입하기
          </button>
        </div>
      </div>
    </div>
    <acceptTermCondition
      :isModal="isShowModal"
      @closeModal="isShowModal = false"
      @deleteConfirm="isShowModal = false"
    />
  </div>
  <TermsOfService
    v-if="commonstore.state.isTermsOfServiceModal"
    :modalName="privacyType"
  />
  <!-- <EmploymentContractUnwrittenModal
    :isModal="showErrorModal"
    @closeModal="showErrorModal = false"
  /> -->
  <div
    class="required-fields-icon"
    v-if="commonstore.state.requiredToastMsgShow"
  >
    <p>
      <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
      입력값을 확인해 주세요.
    </p>
  </div>
  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
</template>
<script>
import { useCookies } from "vue3-cookies";
import AuthenticateService from "../service/API/authenticate";
import signUpsteponeValidation from "@/Validations/steponeSignUp.js";
import signUpsteptwoValidation from "@/Validations/steptwoSignUp.js";
import signUpfinalValidation from "@/Validations/signUpfinal.js";
//import EmploymentContractUnwrittenModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import acceptTermCondition from "@/components/Modals/acceptTermCondition.vue";
import writeRegValidation from "@/Validations/signUpfinal.js";
import TermsOfService from "@/views/JobSeekers/TermsOfService.vue";
import { invalid } from "moment";
import { inject } from "@vue/runtime-core";
import selectoption from "@/components/selectOption.vue";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
export default {
  name: "FormStepTwo",
  components: {
    acceptTermCondition,
    TermsOfService,
    selectoption,
    LoadingBar,
    //EmploymentContractUnwrittenModal,
  },
  data() {
    return {
      introlength: 0,
      isShowModal: false,
      eyeopen: false,
      eyeopen2: false,
      eyeclose: true,
      eyeclose2: true,
      check1: true,
      check2: false,
      check3: false,
      checkedall: false,
      stepOne: true,
      steptwo: false,
      privacyType: "",
      //one start
      error: {},
      cdnReset: false,
      defaultbtn: "인증하기",
      otpsendbtn: true,
      otpsendbtndisable: false,
      emaildisable: localStorage.getItem("snsemailid") ? true : false,
      name:
        localStorage.getItem("snsuserName") != ""
          ? localStorage.getItem("snsuserName")
          : "",
      email:
        localStorage.getItem("snsemailid") != ""
          ? localStorage.getItem("snsemailid")
          : "",
      snsType:
        localStorage.getItem("snsloginVia") == null
          ? ""
          : localStorage.getItem("snsloginVia"),
      socialId:
        localStorage.getItem("snssocialId") != ""
          ? localStorage.getItem("snssocialId")
          : "",
      typeOfUser: localStorage.getItem("UserType"),
      isAppaleId: this.$cookies.get("isiPhone") === "true" ? true : false,
      myAge: "",
      countDown: "180",
      mobile: "",
      type: "signup",
      otp: "",
      //end
      org: true,
      dynamic: false,
      pass: "",
      confPass: "",
      showInput: false,
      showInput2: false,
      success: false,
      error: false,
      pass_msg: "",
      picked: "",
      processing_period: "unlimited",
      modalshow: false,
      requirter_visible: false,
      file: undefined,
      fileName: "",
      companyName: "",
      zncode: "",
      zAddress: "",
      address: "",
      zcode: "",
      contactPerson: "",
      noEmployee: "",
      intro: "",
      preview: null,
      image: null,
      alladdr: "",
      formData: new FormData(),
      industrytype: [],
      industryType: "",
      timerDisplay: "",
      invalidmail: "",
      lengtherror: "",
      addressdepth: "",
      conf_errmsg: "",
      conf_msg: "",
      cookies: new useCookies(),
      isFieldHide: JSON.parse(this.$cookies.get("isfieldHide")),
      timerZero: false,
      commonstore: inject("commonStore"),
      loading: {
        state: false,
        message: "잠시만 기다려 주세요.",
      },
      oldmobile: "",
      detailed_addr:"",
      detailed_companyAddr:"",
    };
  },
  created() {
    this.authService = new AuthenticateService();
    console.log("check sns", this.snsType);
    if (this.snsType == "") {
      this.name = "";
    }
  },
  mounted() {
    this.authService
      .industryType()
      .then((res) => {
        this.industrytype = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("UserType") == "job_recruiter") {
      this.requirter_visible = true;
    }
  },
  unmounted() {
    localStorage.removeItem("snsuserName");
    localStorage.removeItem("snsemailid");
    localStorage.removeItem("snsloginVia");
    localStorage.removeItem("snssocialId");
  },
  computed: {
    checkedManually() {
      if (this.check1 && this.check2 && this.check3) {
        return true;
      } else {
        return false;
      }
    },

    checkSns() {
      if (
        ["kakao", "naver", "apple"].includes(
          localStorage.getItem("snsloginVia")
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {
    timerDisplay(newTime, oldTime) {
      if (newTime == "00:00") {
        this.timerZero = true;
      } else {
        this.timerZero = false;
      }
    },

    modalshow(newVal, oldVal) {
      if (newVal) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
  },

  methods: {
    mobileChange() {
      if (sessionStorage.getItem("signup-step-one") == "completed") {
        if (this.oldmobile != this.mobile) {
          this.otpsendbtn = true;
          this.otpsendbtndisable = false;
        }
      }
    },
    levelset(payload) {
      this.industryType = payload;
    },
    getlength(title) {
      this.introlength = title.trim().length;
    },
    // resetData() {
    //   this.email = ''
    //   this.pass = ''
    //   this.confPass = ''
    //   this.picked = ''
    //   this.zcode = ''
    //   this.address = ''
    //   this.industryType = ''
    //   this.intro = ''
    //   this.companyName = ''
    //   this.zAddress = ''
    //   this.contactPerson=''
    //   this.noEmployee=''
    //   this.zncode=''
    //   this.preview = ''
    // },
    setdepth(searchdata) {
      this.loading.state = true;
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
          this.addressdepth = data.documents[0].address;
          console.log("Success0depth:", data.documents[0].address);
          this.loading.state = false;
        })
        .catch((error) => {
          this.loading.state = false;
          console.error("Error:", error);
        });
    },
    showpass(val) {
      if (val == "pass") {
        this.eyeopen = false;
        this.eyeclose = true;
        this.showInput = false;
      } else {
        this.eyeopen2 = false;
        this.eyeclose2 = true;
        this.showInput2 = false;
      }
    },
    hidepass(val) {
      if (val == "pass") {
        this.eyeopen = true;
        this.eyeclose = false;
        this.showInput = true;
      } else {
        this.eyeopen2 = true;
        this.eyeclose2 = false;
        this.showInput2 = true;
      }
    },
    selectall() {
      if (this.checkedall == true) {
        this.check1 = this.check2 = this.check3 = true;
      } else {
        this.check1 = this.check2 = this.check3 = false;
      }
    },
    submitData(e) {
      window.scrollTo(0, 0);
      sessionStorage.setItem("signup-step", "step1-done");
      console.log(this.name, this.myAge, this.mobile);
      this.$emit("receivedata", {
        name: this.name,
        age: this.myAge,
        mobile: this.mobile,
      });
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    numberMobile(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      return false;
    },
    inputType() {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    },
    confpassword() {
      if (this.pass != "" && this.confPass) {
        if (this.pass != this.confPass) {
          this.error.confirmPassword = "";
          this.conf_errmsg = "비밀번호가 일치하지 않습니다.";
          this.conf_msg = "";
        } else {
          this.conf_msg = "비밀번호가 일치했습니다.";
          this.conf_errmsg = "";
          this.error.confirmPassword = "";
        }
      } else {
        this.conf_errmsg = "";
        this.conf_msg = "";
        this.error.confirmPassword = "";
      }
    },
    checkMovestep2() {
      console.log(" this.checkSns--", this.checkSns, this.isFieldHide);
      if (!this.isFieldHide && this.checkSns) {
        console.log(" this.checkSns--", this.checkSns, this.isFieldHide);
        this.submitData();
        this.stepOne = false;
        this.steptwo = true;
      } else {
        let vcheckData = {
          name: this.name == null ? "" : this.name,
          age: this.myAge == null ? "" : this.myAge,
          phone: this.mobile == null ? "" : this.mobile,
          isVisible: this.isFieldHide,
          isAppaleId: this.isAppaleId,
        };
        // alert(JSON.stringify(vcheckData));
        const { isInvalid, error } = signUpsteponeValidation(vcheckData);
        if (error.require) {
          this.commonstore.methods.displayRequiredToast();
        }
        if (isInvalid) {
          this.lengtherror = "";
          this.error = error;
          this.conf_errmsg = "";
        } else {
          const rememberstep = sessionStorage.getItem("signup-step-one");
          if (rememberstep === "completed" && this.oldmobile == this.mobile) {
            this.stepOne = false;
            this.steptwo = true;
            sessionStorage.setItem("signup-step", "step1-done");
            this.$emit("activeStepTwo");
          } else {
            this.verifyotp();
          }
        }
      }
      // if (this.name == "" && this.myAge == "" && this.mobile == "") {
      //   alert("please fill all fields");
      // } else {
      //   this.submitData();
      //   this.stepOne = false;
      //   this.steptwo = true;
      // }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        this.timeoutId = setTimeout(() => {
          this.countDown -= 1;
          let minutes = parseInt(this.countDown / 60, 10);
          let seconds = parseInt(this.countDown % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          this.timerDisplay = `${minutes}:${seconds}`;
          this.countDownTimer();
        }, 1000);
      }
    },
    clearTimeout() {
      clearTimeout(this.timeoutId);
    },
    sendotp() {
      if (this.mobile.length == 11) {
        let self = this;
        self.countDown = 180;
        self.lengtherror = "";
        self.authService
          .sendOTP(self.type, self.mobile)
          .then(() => {
            self.otpsendbtn = false;
            self.otpsendbtndisable = true;
            self.defaultbtn = "전송하기";
            self.cdnReset = true;
            this.otp = "";
            self.countDownTimer();
          })
          .catch((err) => {
            //alert("이미 등록된 핸드폰 번호입니다.");
            this.commonstore.state.loginInfoModal.isShow = true;
            this.commonstore.state.loginInfoModal.message =
              "이미 등록된 핸드폰 번호입니다.";
          });
      } else {
        this.lengtherror = "핸드폰번호 11자리를 입력해 주세요.";
        this.error.phone = "";
      }
    },
    verifyotp() {
      this.authService
        .verifyOTP(this.mobile, this.otp)
        .then(() => {
          this.submitData();
          this.stepOne = false;
          this.steptwo = true;
          this.cdnReset = false; //sayantani
          this.error = {};
          // alert("OTP가 인증되었습니다");
          this.oldmobile = this.mobile;
          this.commonstore.state.loginInfoModal.isShow = true;
          this.commonstore.state.loginInfoModal.message = "인증 되었습니다. ";
        })
        .catch((err) => {
          // alert("인증번호가 일치하지 않습니다.");
          this.commonstore.state.loginInfoModal.isShow = true;
          this.commonstore.state.loginInfoModal.message =
            "인증 번호를 확인해 주세요.";
        });
    },
    callSignUp() {
      this.loading.state = true;
      this.formData.append("name", this.name);
      this.formData.append("email", this.email);
      this.formData.append("age", this.myAge);
      this.formData.append("gender", this.picked == "man" ? "m" : "f");
      this.formData.append("password", this.pass);
      this.formData.append("sns_type", this.snsType);
      this.formData.append("social_id", this.socialId);
      this.formData.append("phone_number", this.mobile);
      this.formData.append("user_type", localStorage.getItem("UserType"));
      this.formData.append("postal_code", this.zcode);
      this.formData.append("address", this.address);
      this.formData.append("company_name", this.companyName);
      this.formData.append("company_address", this.zAddress);
      this.formData.append("company_postal_code", this.zncode);
      this.formData.append("company_contact_person", this.contactPerson);
      this.formData.append("detail_address", this.detailed_addr==""?null:this.detailed_addr);
      this.formData.append("c_detail_address", this.detailed_companyAddr==""?null:this.detailed_companyAddr);
      this.formData.append(
        "industry",
        this.industryType.id == undefined ? "" : this.industryType.id
      );
      this.formData.append("no_of_employees", this.noEmployee);
      this.formData.append("company_introduction", this.intro);
      this.formData.append(
        "region_1st_depth",
        this.addressdepth.region_1depth_name
      );
      this.formData.append(
        "region_2nd_depth",
        this.addressdepth.region_2depth_name
      );
      this.formData.append(
        "region_3rd_depth",
        this.addressdepth.region_3depth_h_name
      );
      this.formData.append("lat", this.addressdepth.y);
      this.formData.append("long", this.addressdepth.x);
      this.formData.append("person_info_processing_period", this.processing_period);
      console.log(this.formData);
      this.authService
        .signUp(this.formData)
        .then(() => {
          this.loading.state = false;
          this.$router.push({ path: "/" });
          localStorage.removeItem("snsuserName");
          // alert("stored name removed");
        })
        .catch((err) => {
          console.log(err);
          this.loading.state = false;
          if (err.response.data.error == "duplicateEmail") {
            this.invalidmail = "*이미 존재하는 이메일입니다*";
          } else {
            this.invalidmail = "";
          }
        });
    },
    removeSpaces(value) {
      return value.trim();
    },
    zeroSpace(value) {
      return value.split(" ").join("");
    },
    signup() {
      // alert(this.snsType);
      this.snsType = this.snsType.trim();
      if (localStorage.getItem("UserType") == "job_seeker") {
        let vcheckData = {
          password: this.snsType
            ? "Inside@#123456"
            : this.pass == null
            ? ""
            : this.pass,

          confirm_password: this.snsType
            ? "Inside@#123456"
            : this.confPass == null
            ? ""
            : this.confPass,
          email: this.email == null ? "" : this.email,
          addr1: this.zcode == null ? "" : this.zcode,
          addr2: this.address == null ? "" : this.address,
          isVisible: this.isFieldHide,
          pInfoperiod:this.processing_period,
        };
        const { isInvalid, error } = signUpsteptwoValidation(vcheckData);
        // alert(JSON.stringify(vcheckData));
        // alert(JSON.stringify(error));
        if (error.require) {
          this.commonstore.methods.displayRequiredToast();
        }
        if (isInvalid) {
          this.error = error;
          // this.commonstore.methods.displayRequiredToast();
          this.invalidmail = "";
          this.conf_errmsg = "";
          console.log(error);
        } else {
          this.error = {};
          if (
            this.check1 == true &&
            this.check2 == true &&
            this.check3 == true
          ) {
            this.callSignUp();
          } else {
            this.isShowModal = true;
          }
        }
      } else {
        // "kakao", "naver", "apple"
        let vcheckData2 = {
          password: this.snsType
            ? "Inside@#123456"
            : this.pass == null
            ? ""
            : this.pass,

          confirm_password: this.snsType
            ? "Inside@#123456"
            : this.confPass == null
            ? ""
            : this.confPass,
          email: this.email == null ? "" : this.email,
          addr1: this.address == null ? "" : this.address,
          addr2: this.zcode == null ? "" : this.zcode,
          cName: this.companyName == null ? "" : this.companyName,
          czcode: this.zncode == null ? "" : this.zncode,
          caddr: this.zAddress == null ? "" : this.zAddress,
          cPerson: this.contactPerson == null ? "" : this.contactPerson,
          pInfoperiod:this.processing_period,
        };
        const { isInvalid, error } = signUpfinalValidation(vcheckData2);
        if (error.require) {
          this.commonstore.methods.displayRequiredToast();
        }
        if (isInvalid) {
          this.error = error;
          this.conf_errmsg = "";
          // this.commonstore.methods.displayRequiredToast();
          console.log(error);
        } else {
          this.error = {};
          if (
            this.check1 == true &&
            this.check2 == true &&
            this.check3 == true
          ) {
            this.callSignUp();
          } else {
            this.isShowModal = true;
          }
        }
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      // this.previewImage();
      const [file] = files;
      this.preview = URL.createObjectURL(file);
      this.dynamic = true;
      this.org = false;
      console.log(this.preview);
      if (!files.length) return;
      this.file = files[0];
      console.log(this.file);
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.render1 = true;
        this.fileName = "";
        return false;
      } else {
        this.formData.delete("image");
        this.render1 = false;
        this.fileName = this.file.name;
        this.formData.append("image", files[0]);
      }
      this.fileExtension = this.fileName.replace(/^.*\./, "");
      console.log(this.fileName);
    },
    handleAddress(data) {
      if (this.alladdr == "addressCompany") {
        this.zncode = data.zonecode;
        this.zAddress = data.address;
        this.setdepth(data.address);
      }
      if (this.alladdr == "address") {
        this.address = data.address;
        this.addressZipcode = data.zonecode;
        this.zcode = data.zonecode;
        this.setdepth(data.address);
      }
      console.log(data);
      this.modalshow = false;
    },
    findAdd(addr) {
      this.alladdr = addr;
      console.log(addr);
      this.modalshow = true;
    },
    confirmPassCheck() {
      if (this.pass == this.confPass) {
        this.pass_msg = "Password matched";
      }
      if (this.pass != this.confPass) {
        this.pass_msg = "Password not matching";
      }
    },
    ValidateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.invalidmail = "";
        this.success = false;
        return true;
      }
      this.invalidmail = "유효한 이메일을 입력해주세요";
      this.error.email = "";
      return false;
    },
    checkEmail() {
      
      if (this.email == "" || this.email == null) {
        this.invalidmail = "유효한 이메일을 입력해주세요";
        this.error.email = "";
      } else {
        if (this.invalidmail == "") {
          this.authService
            .duplicateEmailCheck(this.email)
            .then(() => {
              this.success = true;
              this.invalidmail = "";
              this.error.email = "";
            })
            .catch((e) => {
              this.success = false;
              this.invalidmail = "*이미 존재하는 이메일입니다*";
              this.error.email = "";
            });
        }
      }
    },
    openPrivacyPolicy(event) {
      this.commonstore.state.isTermsOfServiceModal = true;
      this.privacyType = event;
    },
  },
};
</script>
<style>
.modalone {
  display: block;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
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
.successmsg {
  color: green;
}
.vue-daum-postcode-container {
  height: 350px !important;
  max-width: 330px;
  margin: 0 auto;
  border-radius: 8px !important;
  overflow: hidden;
}
</style>
