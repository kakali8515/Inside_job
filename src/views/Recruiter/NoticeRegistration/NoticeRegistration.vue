<template>
  <div>
    <div class="back-wh mb-16" v-show="set_step">
      <div class="top-hdr top-hdr-br mb-16">
        <div class="container">
          <h4 class="heading">
            <div class="innr-search">
              <span href="javascript:void(0);" class="left-arrow"
                ><img
                  src="@/assets/icons/left-arrow.svg"
                  alt=""
                  @click="stepback()" /></span
              ><span>공고 등록</span>
              <span class="cross-btn"
                ><img
                  @click="writeModal = true"
                  src="/src/assets/icons/modal-cross-icon.svg"
                  alt=""
              /></span>
            </div>
          </h4>
          <!-- <InnerHeader headerTitle="공고 등록" /> -->
        </div>
      </div>
      <div class="container">
        <div class="step-otr">
          <ul class="step-list mt-0">
            <li class="active">STEP.1 <br />기업정보</li>
            <li :class="setactive">STEP.2 <br />인재정보</li>
            <li :class="setactive2">STEP.3 <br />근무조건</li>
            <li :class="setactive3">STEP.4 <br />근무조건</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-wrapper-step">
      <!-- step 1 company information -->
      <!-- <p>step...........1{{companyInfo}}</p> -->
      <CompanyInformation
        v-show="companyInfo"
        @passData="GetData($event)"
        ref="childcompanyInfo"
      />
      <!-- step 2 Talent information -->
      <!-- <p>step...........2{{ talentInfo }}</p> -->
      <TalentInformation
        v-show="talentInfo"
        @getTalentData="GetTalent($event)"
        ref="childtalentInfo"
        @hidehead="sethide"
      />
      <!-- step 3 working conditions -->
      <!-- <p>step...........3{{ Workcondition }}</p> -->
      <WorkingConditions
        v-show="Workcondition"
        @getWorkConditions="GetCondition($event)"
        ref="childworkingInfo"
      />
      <!-- step 4 announcement information -->
      <!-- <p>step...........4{{ annouceInfo }}</p> -->
      <!-- <AnnouncementInformation v-show="annouceInfo" /> -->
      <div class="form-wrapper" v-show="annouceInfo">
        <div class="back-wh">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="sub-otr no-border">
                <h3 class="sub-heading lg">공고정보 입력</h3>
                <p>지원자가 지원할 공고에 대한 정보를 입력해 주세요</p>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <div class="d-flex mb-8">
                    <label>공고 제목 <span>[필수]</span></label>
                    <p class="number lg line-height-19">
                      <!-- <span>{{ anTitllength }}</span -->
                      <span>{{ anTitle.length }}</span
                      >/40
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="공고 제목 입력"
                    class="form-control"
                    v-model="anTitle"
                    maxlength="40"
                    style="color: black"
                  />
                  <!-- @input="getlength(anTitle)" -->
                  <small class="error-msgsign">{{ error.atitle }}</small>
                  <p class="c-font mt-16">
                    공고제목에는 한글,영문,숫자,일부 특수문자(-+#()[]%&,.㈜’/)만
                    사용할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-16">
              <div class="container">
                <div class="form-group mb-16">
                  <label
                    >공고 배경사진 - 대표사진
                    <span class="gr">[선택]</span></label
                  >
                  <p class="c-font-line">
                    공고가 올라갈 때 메인 화면에 보여지는 대표사진입니다.
                  </p>
                  <div class="file-input text-left mt-16">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      class="file-input__input"
                      accept="image/*"
                      :multiple="true"
                      @change="FileChangeThumnail($event)"
                    />
                    <span class="file-input__label video" for="file-input">
                      <img src="@/assets/icons/camara.svg" alt="" />
                      <p>{{ addthumbnaildata.image.length }} / 1</p>
                    </span>
                  </div>
                  <!-- input -->
                  <div class="selfpr-img-outr announcement-info-img pt-16">
                    <div
                      class="self-img-innr"
                      v-for="(item, i) in addthumbnaildata.image"
                      :key="i"
                    >
                      <div class="self-pic-innr">
                        <figure><img :src="item.path" alt="" /></figure>
                        <span
                          ><img
                            src="@/assets/icons/cross-wh.svg"
                            alt=""
                            @click="removePreview1(i)"
                        /></span>
                      </div>
                    </div>
                    <!-- ThumbImageList-view start -->
                    <div
                      class="self-img-innr"
                      v-for="(item, i) in ThumbImageList"
                      :key="i"
                    >
                      <div class="self-pic-innr">
                        <figure><img :src="item.image_url" alt="" /></figure>
                      </div>
                    </div>
                    <!-- ThumbImageList-view end -->
                  </div>
                  <span style="color: red">{{
                    addthumbnaildata.maxImagelengthError
                  }}</span>
                </div>
                <div class="form-group mb-16">
                  <label>공고 배경사진 <span class="gr">[선택]</span></label>
                  <div class="file-input text-left mt-16">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      class="file-input__input"
                      accept="image/*"
                      :multiple="true"
                      @change="FileChangeBackground($event)"
                    />
                    <span class="file-input__label video" for="file-input">
                      <img src="@/assets/icons/camara.svg" alt="" />
                      <p>{{ addImagePageData.image.length }} / 3</p>
                    </span>
                  </div>
                  <!-- input -->
                  <div class="selfpr-img-outr announcement-info-img pt-16">
                    <div
                      class="self-img-innr"
                      v-for="(item, i) in addImagePageData.image"
                      :key="i"
                    >
                      <div class="self-pic-innr">
                        <figure><img :src="item.path" alt="" /></figure>
                        <span
                          ><img
                            src="@/assets/icons/cross-wh.svg"
                            alt=""
                            @click="removePreview(i)"
                        /></span>
                      </div>
                    </div>
                    <!-- bgImageList-view start -->
                    <div
                      class="self-img-innr"
                      v-for="(item, i) in bgImageList"
                      :key="i"
                    >
                      <div class="self-pic-innr">
                        <figure><img :src="item.image_url" alt="" /></figure>
                      </div>
                    </div>
                    <!-- bgImageList-view end -->
                  </div>
                  <span style="color: red">{{
                    addImagePageData.maxImagelengthError
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-80">
              <div class="container">
                <div class="form-group mb-0 notice-post-period">
                  <label class="mb-0">공고 게시기간 <span>[필수]</span></label>
                  <ul class="check-list box-check col-6 mt-16">
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="NoticePost"
                          value="7_days"
                          v-model="NoticePostPeriod"
                          @change="directInput()"
                        />
                        <span class="text">7일</span>
                      </label>
                    </li>
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="NoticePost"
                          value="15_days"
                          v-model="NoticePostPeriod"
                          @change="directInput()"
                        />
                        <span class="text">15일</span>
                      </label>
                    </li>
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="NoticePost"
                          value="1_month"
                          v-model="NoticePostPeriod"
                          @change="directInput()"
                        />
                        <span class="text">1개월</span>
                      </label>
                    </li>
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="NoticePost"
                          value="direct_input"
                          v-model="NoticePostPeriod"
                          @change="directInput()"
                        />
                        <span class="text">직접입력</span>
                      </label>
                    </li>
                  </ul>
                  <div
                    class="form-group-wrapper text-center"
                    v-show="direct_Input_center"
                  >
                    <div class="form-group mb-0">
                      <!-- <input
                        type="date"
                        class="form-control"
                        @change="formatDate($event.target.value)"
                        v-model="notice_sdate"
                      /> -->
                      <VDatePicker
                        v-model="today"
                        :min-date="today"
                        is-required
                        locale="ko"
                        @dayclick="notice_sdate = formatDate(today)"
                      >
                        <template #default="{ togglePopover }">
                          <input
                            type="text"
                            class="form-control"
                            @click="togglePopover"
                            v-model="notice_sdate"
                            placeholder="2022.01.01"
                            readonly
                          />
                        </template>
                      </VDatePicker>
                      <small class="error-msgsign">{{ error.today }}</small>
                      <!-- <calenders/> -->
                      <!-- <Datepicker v-model="notice_sdate"/> -->
                      <!-- <p>{{notice_sdate}}</p> -->
                    </div>
                    <!--  -->
                    <span class="date-seprate">~</span>
                    <div class="form-group mb-0">
                      <!-- <input
                        type="date"
                        placeholder="2022.01.07"
                        class="form-control"
                        :min="formatDate(notice_sdate)"
                        v-model="notice_edate"
                      /> -->
                      <VDatePicker
                        v-model="today2"
                        :min-date="addOneDay(today)"
                        locale="ko"
                        is-required
                        @dayclick="notice_edate = formatDate(today2)"
                      >
                        <template #default="{ togglePopover }">
                          <input
                            type="text"
                            class="form-control"
                            @click="togglePopover"
                            v-model="notice_edate"
                            placeholder="2022.01.07"
                            readonly
                          />
                        </template>
                      </VDatePicker>
                      <small class="error-msgsign">{{ error.today2 }}</small>
                      <!-- <Datepicker v-model="notice_edate"/> -->
                      <!-- <p>{{notice_edate}}</p> -->
                      <!--  -->
                    </div>
                  </div>
                </div>
              </div>
              <small class="error-msgsign">{{ error.nPeriod }}</small>
            </div>
          </div>
        </div>
        <div class="btm-button-group fixed-btn-otr">
          <button type="button" class="btn btn-primary lg" @click="getFinal">
            공고 작성 완료하기!
          </button>
        </div>
      </div>
    </div>
    <confirmstep4modal
      :isModal="isShowModal"
      @closeModal="isShowModal = false"
      @deleteConfirm="finalsetup()"
    />
    <NotificationTypePurchase
      v-if="commonstore.state.isModalNotificationTypePurchase"
      @closeModal="
        (commonstore.state.isModalNotificationTypePurchase = false),
          (annouceInfo = true),
          (talentInfo = false),
          (companyInfo = false),
          (setactive3 = 'active'),
          (setactive2 = 'active'),
          (setactive = 'active')
      "
    />
    <stopWritemodal
      :isModal="writeModal"
      @closeModal="writeModal = false"
      @deleteConfirm="$router.push({ name: 'JobListing' })"
    />
    <StepBackWarningModal
      :isModal="backButtonclicked"
      @confirm="$router.push({ name: 'JobListing' })"
      @closeConfirm="backButtonclicked = false"
      fromPage="addJobPost"
    />
    <!-- <errorModal
      :isModal="showErrorModal"
      @closeModal="showErrorModal = false"
    /> -->
    <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
    <div
      class="required-fields-icon"
      v-if="commonstore.state.requiredToastMsgShow"
    >
      <p>
        <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
        입력값을 확인해 주세요.
      </p>
    </div>
  </div>
</template>
<script>
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import InnerHeader from "@/components/innerHeader.vue";
import CompanyInformation from "@/components/NoticeRegistration/CompanyInformation.vue";
import TalentInformation from "@/components/NoticeRegistration/TalentInformation.vue";
import WorkingConditions from "@/components/NoticeRegistration/WorkingConditions.vue";
import jobPostingService from "../../../service/API/jobPosting";
import confirmstep4modal from "@/components/Modals/confirmstep4modal.vue";
import StepBackWarningModal from "@/components/Modals/StepBackWarningModal.vue";
import NotificationTypePurchase from "./NotificationTypePurchase.vue";
// import errorModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import { inject } from "@vue/runtime-core";
import finalValidation from "@/Validations/noticeRegistratin/finalnotice.js";
import stopWritemodal from "@/components/Modals/stopWritemodal.vue";
import calenders from "@/components/calender.vue";
// import AnnouncementInformation from "@/components/NoticeRegistration/AnnouncementInformation.vue";
export default {
  name: "NoticeRegistration",
  components: {
    InnerHeader,
    CompanyInformation,
    TalentInformation,
    WorkingConditions,
    confirmstep4modal,
    NotificationTypePurchase,
    stopWritemodal,
    // errorModal,
    LoadingBar,
    calenders,
    StepBackWarningModal,
    // AnnouncementInformation,
  },
  data() {
    return {
      loading: {
        state: false,
        message: "잠시만 기다려 주세요.",
      },
      showErrorModal: false,
      writeModal: false,
      today: null,
      today2: null,
      minDate: new Date("2023-04-01"),
      notice_sdate: "",
      notice_edate: "",
      ThumbImageList: [],
      bgImageList: [],
      isShowModal: false,
      backButtonclicked: false,
      commonstore: inject("commonStore"),
      companyData: {},
      TalentData: {},
      WorkingData: {},
      set_step: true,
      companyInfo: true,
      talentInfo: false,
      Workcondition: false,
      annouceInfo: false,
      setactive: "",
      setactive2: "",
      setactive3: "",
      // ^\d{0,4}$|^\d{4}[-]$|^\d{4}[-](0?[0-9]|1[012])$
      // AnnouncementInformation start
      anTitle: "",
      error: {},
      anTitllength: "0",
      addImagePageData: {
        list: [],
        image: [],
        videoUrl: "",
        type: "",
        maxImagelengthError: "",
      },
      thumbnailRes: [],
      backgroundRes: [],
      allfinalbgAry: [],
      addthumbnaildata: {
        list: [],
        image: [],
        videoUrl: "",
        type: "",
        maxImagelengthError: "",
      },
      NoticePostPeriod: "7_days",
      direct_Input_center: false,
      editprefillData: {},
      // AnnouncementInformation start
    };
  },
  created() {
    this.jobpostingervice = new jobPostingService();
    console.log(this.today);
  },
  methods: {
    sethide(val) {
      console.log(val);
      if (val === false) {
        this.set_step = false;
      } else {
        this.set_step = true;
      }
    },

    stepback() {
      const rememberstep = localStorage.getItem("jobstep");
      //console.log(rememberstep)
      if (rememberstep == "golist" || rememberstep === null) {
        this.backButtonclicked = true;
      }
      if (rememberstep == "step0") {
        localStorage.setItem("jobstep", "golist");
        this.companyInfo = true;
        this.talentInfo = false;
        this.Workcondition = false;
        this.annouceInfo = false;
        this.setactive = "";
        this.setactive2 = "";
      }
      if (rememberstep == "step3") {
        localStorage.setItem("jobstep", "step2-2");
        this.companyInfo = false;
        this.talentInfo = false;
        this.Workcondition = true;
        this.annouceInfo = false;
        this.setactive3 = "";
      }
      if (rememberstep == "step2-2") {
        localStorage.setItem("jobstep", "step2-1");
        this.companyInfo = false;
        this.talentInfo = true;
        this.Workcondition = false;
        this.annouceInfo = false;
        this.setactive2 = "";
      }
      if (rememberstep == "step2-1") {
        localStorage.setItem("jobstep", "step1");
        this.$refs.childtalentInfo.talentInfo2 = true;
        this.$refs.childtalentInfo.talentInfo1 = false;
        this.companyInfo = false;
        this.talentInfo = true;
        this.Workcondition = false;
        this.annouceInfo = false;
        this.setactive2 = "";
      }
      if (rememberstep == "step1") {
        localStorage.setItem("jobstep", "step0");
        this.$refs.childtalentInfo.talentInfo2 = false;
        this.$refs.childtalentInfo.talentInfo1 = true;
        this.companyInfo = false;
        this.Workcondition = false;
        this.annouceInfo = false;
      }
    },
    addOneDay(date) {
      var newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    },
    formatDate(value) {
      console.log(value);
      if (value == null) {
        return "";
      } else {
        const date = new Date(value);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        return (value = yyyy + "." + mm + "." + dd);
      }
    },
    formatDate2(value) {
      const date = new Date(value);
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return (value = yyyy + "-" + mm + "-" + dd);
    },
    finalsetup() {
      if (
        this.$route.name == "NoticeRegistrationEdit" &&
        this.$route.params.operation != "copy"
      ) {
        this.jobpostingervice
          .editJob(this.$route.params.id, this.commonstore.state.fourstepdata)
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // this.$router.push({ name: "NotificationTypePurchase" });
        this.isShowModal = false;
        this.commonstore.state.isModalNotificationTypePurchase = true;
        this.annouceInfo = false;
      }
    },
    // $router.push({ name: 'NotificationTypePurchase' })
    bgimage() {
      const edata = this.commonstore.state.edata.background_pictures;
      if (this.$route.name == "NoticeRegistrationEdit") {
        for (let i = 0; i < edata.length; i++) {
          if (edata[i].type == "thumbnail") {
            this.ThumbImageList.push(edata[i]);
          } else {
            this.bgImageList.push(edata[i]);
          }
        }
        console.log(this.ThumbImageList);
        console.log(this.bgImageList);
      }
    },

    bgimageDuplicate() {
      let edata = this.commonstore.state.edata.pictures;
      if (edata.length > 0) {
        edata = edata.map((item) => {
          return {
            image_url: item.url,
            type: item.type,
          };
        });
        for (let i = 0; i < edata.length; i++) {
          if (edata[i].type == "thumbnail") {
            this.ThumbImageList.push(edata[i]);
          } else {
            this.bgImageList.push(edata[i]);
          }
        }
      }
    },
    // this.$router.push({name: 'RecruiterJobPostingDetails'})
    onsubmitModal() {
      this.isShowModal = true;
      this.anygender = false;
    },
    GetData(data) {
      console.log(data);
      if (data != {}) {
        this.companyData = data;
        this.companyInfo = false;
        this.talentInfo = true;
        this.setactive = "active";
      }
    },
    GetTalent(data) {
      console.log(data);
      if (data != {}) {
        this.TalentData = data;
        this.talentInfo = false;
        this.Workcondition = true;
        this.setactive2 = "active";
      }
    },
    GetCondition(data) {
      console.log(data);
      if (data != {}) {
        this.WorkingData = data;
        this.Workcondition = false;
        this.annouceInfo = true;
        this.setactive3 = "active";
      }
    },
    // AnnouncementInformation start backgroundRes
    // getFinal() {
    //   console.log('hhhh')
    //   console.log(this.backgroundRes)
    //   console.log(this.thumbnailRes)
    //   console.log('hhhh')
    //   if (this.thumbnailRes.length !== 0) {
    //   this.allfinalbgAry.splice(0, 0, this.thumbnailRes);
    //   console.log(this.allfinalbgAry);
    //   }
    //   // this.backgroundRes.forEach(e => {
    //   //   this.allfinalbgAry.push(e)
    //   // });
    //   // console.log(this.allfinalbgAry);

    //   this.savejob();
    // },
    //for live 3.30-4.30
    // getFinal() {
    //   console.log("hhhh");
    //   console.log(this.allfinalbgAry);
    //   console.log("hhhh");
    //   if (this.thumbnailRes.length == 0) {
    //     this.allfinalbgAry = [];
    //   } else {
    //     this.allfinalbgAry.splice(0, 0, this.thumbnailRes);
    //     console.log(this.allfinalbgAry);
    //   }
    //   this.savejob();
    // },
    getFinal() {
      if (this.thumbnailRes.length == 0) {
        if (this.$route.name == "NoticeRegistrationEdit") {
          console.log(this.allfinalbgAry);
          this.conditionalpushImage();
        } else {
          this.allfinalbgAry = [];
          this.savejob();
        }
        // this.savejob();
      } else {
        if (this.$route.name == "NoticeRegistrationEdit") {
          this.allfinalbgAry.splice(0, 0, this.thumbnailRes);
          this.conditionalpushImage();
        } else {
          this.allfinalbgAry.splice(0, 0, this.thumbnailRes);
          console.log(this.allfinalbgAry);
          // this.savejob();
          this.savejob();
        }
      }
      // console.log(this.allfinalbgAry);
    },
    conditionalpushImage() {
      let storedImage = this.commonstore.state.edata.background_pictures.map(
        ({ type, image_url }) => ({ type, url: image_url })
      );
      if (
        this.$route.name == "NoticeRegistrationEdit" &&
        storedImage.length > 0
      ) {
        console.log(storedImage);
        console.log(this.allfinalbgAry);
        // console.log(
        //   "bg-Arry-data:=",
        //   this.allfinalbgAry,
        //   this.allfinalbgAry.length,
        //   this.allfinalbgAry[0].type
        //   // this.allfinalbgAry[1].type
        // );
        if (
          this.allfinalbgAry.length == 1 &&
          this.allfinalbgAry[0].type == "thumbnail"
        ) {
          console.log(
            "thumbnail:-",
            this.allfinalbgAry.length,
            this.allfinalbgAry[0].type
          );
          const modifiedArry1 = this.replaceThumbnailInArray(storedImage, this.allfinalbgAry);
          this.allfinalbgAry = modifiedArry1;
          console.log(this.allfinalbgAry);
          this.savejob();
        } else if (
          this.allfinalbgAry.length == 1 &&
          this.allfinalbgAry[0].type == "background"
        ) {
          let ary2 = storedImage.filter((obj) => obj.type !== "background");
          console.log("ary2");
          ary2.push(...this.allfinalbgAry);
          this.allfinalbgAry = ary2;
          this.savejob();
          console.log(
            "background:-",
            this.allfinalbgAry.length,
            this.allfinalbgAry[0].type
          );
        } else if (
          this.allfinalbgAry.length > 1 &&
          this.allfinalbgAry[0].type == "thumbnail" &&
          this.allfinalbgAry[1].type == "background"
        ) {
          this.savejob();
          console.log(
            "All Type image:-",
            this.allfinalbgAry.length,
            this.allfinalbgAry[0].type,
            this.allfinalbgAry[1].type
          );
        } else if (
          this.allfinalbgAry.length > 1 &&
          this.allfinalbgAry[0].type == "background" &&
          this.allfinalbgAry[1].type == "background"
        ) {
          let ary2 = storedImage.filter((obj) => obj.type !== "background");
          console.log("ary2");
          ary2.push(...this.allfinalbgAry);
          this.allfinalbgAry = ary2;
          this.savejob();
          console.log(
            "All Type image:-",
            this.allfinalbgAry.length,
            this.allfinalbgAry[0].type,
            this.allfinalbgAry[1].type
          );
        } else if (this.allfinalbgAry.length == 0) {
          console.log("Not Changed", this.allfinalbgAry.length);
          this.savejob();
        }
      } else {
        console.log("else", storedImage);
        this.savejob();
      }
    },
    getlength(title) {
      this.anTitllength = title.trim().length;
    },
    replaceThumbnailInArray(arry1, arry2) {
      const thumbnailIndex = arry1.findIndex((obj) => obj.type === "thumbnail");

      if (thumbnailIndex !== -1) {
        arry1[thumbnailIndex] = arry2[0];
      }

      return arry1;
    },
    directInput() {
      if (this.NoticePostPeriod == "direct_input") {
        this.direct_Input_center = true;
      } else {
        this.direct_Input_center = false;
        // this.notice_sdate = "";
        // this.notice_edate = "";
      }
    },
    FileChangeBackground(evt) {
      this.bgImageList = [];
      let count = this.addImagePageData.image.length + evt.target.files.length;
      if (count <= 3) {
        this.addImagePageData.maxImagelengthError = "";
        for (let i = 0; i < evt.target.files.length; i++) {
          // // max 50 mb exceeds
          if (
            evt.target.files[i].size > 5000000 ||
            !/\.(jpg|png|jpeg)$/i.test(evt.target.files[i].name)
          ) {
          } else {
            let reader = new FileReader();
            reader.onload = (event) => {
              this.addImagePageData.image.push({
                name: evt.target.files[i].name,
                binary: evt.target.files[i],
                path: event.target.result,
              });
            };
            console.log(this.addImagePageData.image);
            reader.readAsDataURL(evt.target.files[i]);
          }
        }
        setTimeout(() => {
          this.uploadbgFile();
        }, 300);
      } else {
        this.addImagePageData.maxImagelengthError =
          "이미지는 최대 3개까지 업로드 가능합니다";
      }
    },
    async uploadbgFile() {
      this.loading.state = true;
      let formData = new FormData();
      // formData.append('files[' + i + ']', file);
      for (let i in this.addImagePageData.image) {
        formData.append("images", this.addImagePageData.image[i].binary);
      }
      await this.jobpostingervice
        .saveBgImage(formData)
        .then((res) => {
          this.backgroundRes = res.data;
          console.log("background_Image", this.backgroundRes);
          let newbgImage = this.backgroundRes.map((obj) => {
            return { ...obj, type: "background" };
          });
          let finalBgImage = newbgImage.map(({ name, ...rest }) => {
            return rest;
          });
          console.log("Final-Background-Image", finalBgImage);
          this.allfinalbgAry = finalBgImage;
          this.loading.state = false;
        })
        .catch((err) => console.log(err));
      this.loading.state = false;
    },
    async uploadThumbFile() {
      this.loading.state = true;
      let formData = new FormData();
      // formData.append('files[' + i + ']', file);
      for (let i in this.addthumbnaildata.image) {
        formData.append("image", this.addthumbnaildata.image[i].binary);
      }
      await this.jobpostingervice
        .saveThumnailImage(formData)
        .then((res) => {
          this.thumbnailRes = res.data;
          console.log("Thumbnail_Image", this.thumbnailRes.name);
          delete this.thumbnailRes.name;
          this.thumbnailRes.type = "thumbnail";
          console.log("Final-Thumbnail-Image", this.thumbnailRes);
          this.loading.state = false;
        })
        .catch((err) => console.log(err));
      this.loading.state = false;
    },
    FileChangeThumnail(evt) {
      this.ThumbImageList = [];
      let count = this.addthumbnaildata.image.length + evt.target.files.length;
      if (count <= 1) {
        this.addthumbnaildata.maxImagelengthError = "";
        for (let i = 0; i < evt.target.files.length; i++) {
          // // max 50 mb exceeds
          if (
            evt.target.files[i].size > 5000000 ||
            !/\.(jpg|png|jpeg)$/i.test(evt.target.files[i].name)
          ) {
          } else {
            let reader = new FileReader();
            reader.onload = (event) => {
              this.addthumbnaildata.image.push({
                name: evt.target.files[i].name,
                binary: evt.target.files[i],
                path: event.target.result,
              });
            };
            console.log(this.addthumbnaildata.image);
            reader.readAsDataURL(evt.target.files[i]);
          }
        }
        setTimeout(() => {
          this.uploadThumbFile();
        }, 300);
      } else {
        this.addthumbnaildata.maxImagelengthError =
          "이미지는 최대 1개까지 업로드 가능합니다.";
      }
    },
    removePreview(i) {
      this.addImagePageData.image.splice(i, 1);
    },
    removePreview1(i) {
      this.addthumbnaildata.image.splice(i, 1);
    },
    // AnnouncementInformation end
    // async
    savejob() {
      console.log(this.allfinalbgAry);
      console.log(
        this.TalentData.noOfpeople,
        typeof this.TalentData.noOfpeople
      );
      console.log("please check");
      console.log(this.allfinalbgAry);
      console.log("please check");
      const inputdata = {
        contact_name: this.companyData.name,
        is_private_name: this.companyData.hideName == false ? "0" : "1", //0/1
        contact_person_num: this.companyData.phone,
        is_private_person_num: this.companyData.hidePhone == false ? "0" : "1", //0/1
        contact_email: this.companyData.email,
        is_private_email: this.companyData.hideEmail == false ? "0" : "1", //0/1
        workarea_code:
          this.companyData.addresscheck == "new"
            ? this.companyData.New_zCode
            : this.companyData.ZCode_default,
        workarea_address:
          this.companyData.addresscheck == "new"
            ? this.companyData.New_zAddress
            : this.companyData.ZAddress_default,
        is_private_address: this.companyData.hide_Addres == false ? "0" : "1", //0/1
        region_1st_depth:
          this.companyData.addresscheck == "new"
            ? this.companyData.add_Newdepth.region_1depth_name
            : this.companyData.add_depth.region_1depth_name,
        region_2nd_depth:
          this.companyData.addresscheck == "new"
            ? this.companyData.add_Newdepth.region_2depth_name
            : this.companyData.add_depth.region_2depth_name,
        region_3rd_depth:
          this.companyData.addresscheck == "new"
            ? this.companyData.add_Newdepth.region_3depth_h_name
            : this.companyData.add_depth.region_3depth_h_name,
        lat:
          this.companyData.addresscheck == "new"
            ? this.companyData.add_Newdepth.y
            : this.companyData.add_depth.y,
        long:
          this.companyData.addresscheck == "new"
            ? this.companyData.add_Newdepth.x
            : this.companyData.add_depth.x,
        job_detail_address:
          this.companyData.addresscheck == "new"
            ? this.companyData.detailedAddrUpdated
            : this.companyData.detailedAddrDefault, // STEP:1(Done)
        //STEP-------------------1-----------------------dONE-----------------------------
        gender: this.TalentData.gender, //male/female/any
        age: this.TalentData.age, //any/manual
        mid_age_value: this.TalentData.ageMiddle, //45
        start_age:
          this.TalentData.startage == "" ? null : this.TalentData.startage,
        end_age: this.TalentData.endage == "" ? null : this.TalentData.endage,
        education: this.TalentData.educationL, //no_academic_background/elementary_school/middle_school/high_school/university_2_or_3_years/university_4_years/graduate_school
        occupations: this.TalentData.occupation,
        areas_of_recruitment: this.TalentData.areaOfreq,
        num_of_recruitment:
          this.TalentData.noOfpeople == "" ? null : this.TalentData.noOfpeople,
        is_num_of_recruitment_undecided:
          this.TalentData.noOfpeopleUndecided == false ? "0" : "1", //0/1
        preferential_conditions: this.TalentData.condition,
        responsibilities: this.TalentData.responsibility,
        eligibilities: this.TalentData.eligibilityy,
        career: this.TalentData.recruiterCarrer, //any/newcomer/experience
        min_experience:
          this.TalentData.minExperience == ""
            ? null
            : this.TalentData.minExperience,
        max_experience:
          this.TalentData.maxExperience == ""
            ? null
            : this.TalentData.maxExperience,
        any_experience: this.TalentData.any_experience,
        //STEP-2...........................dONE--------------------------
        working_mode: this.WorkingData.worktyp, //part_time_job/full_time/contract_worker/dispatch/internship/freelancer/etc
        probation: this.WorkingData.probabaTion,
        // probation: this.WorkingData.probabationperiod,
        working_period: this.WorkingData.probabationperiod, //1_day/less_than_1_week/1_week_to_1_month/1_month_to_3_months/3_months_to_6_months/6_months_to_1_year/more_than_1_year
        negotiable_working_period:
          this.WorkingData.Negoworkperiod == false ? "0" : "1", //0/1
        negotiable_working_days: "0", //0/1
        working_days: this.WorkingData.working_days,
        pay_type: this.WorkingData.payTp, //hourly_wage/daily_wage/salary
        salary: this.WorkingData.salary,
        working_hour_from: this.WorkingData.working_hrFrom,
        working_hour_end: this.WorkingData.working_hrTo,
        break_time_from: this.WorkingData.Break_hrFrom,
        break_time_end: this.WorkingData.Break_hrTo,
        no_break_time: "0", //0/1
        //STEP-3...........................dONE--------------------------
        pictures:
          this.$route.name == "NoticeRegistrationEdit"
            ? this.allfinalbgAry.length == 0
              ? this.commonstore.state.edata.background_pictures.map(
                  ({ type, image_url }) => ({ type, url: image_url })
                )
              : this.allfinalbgAry
            : this.allfinalbgAry,
        prescribed_working_hours: this.WorkingData.workhour,
        announcement_title: this.anTitle.trim(),
        notice_posting_period: this.NoticePostPeriod, //7_days/15_days/1_month/direct_input
        notice_posting_period_custom_start_date:
          this.notice_sdate == "" ? null : this.notice_sdate,
        notice_posting_period_custom_end_date:
          this.notice_edate == "" ? null : this.notice_edate,
        // array_purchase_for_ad: [1, 4],
        // array_storage_box_list: [],
      };

      if (this.TalentData.noOfpeopleUndecided === true) {
        delete inputdata.num_of_recruitment;
      }

      let vcheckData = {
        atitle: this.anTitle,
        nPeriod: this.NoticePostPeriod,
        today: this.today,
        today2: this.today2,
        direct_Input_center: this.direct_Input_center,
      };
      const { isInvalid, error } = finalValidation(vcheckData);
      if (isInvalid) {
        this.error = error;

        // this.showErrorModal = true;
        this.commonstore.methods.displayRequiredToast();
        console.log(error);
      } else {
        this.error = {};
        // await this.jobpostingervice
        //   .saveJob(inputdata)
        //   .then((res) => {
        //     alert("New job Added...");
        //     this.$router.push("/");
        //   })
        //   .catch((err) => console.log(err));
        this.commonstore.methods.sendRegObj(inputdata);
        console.log(this.commonstore.state.fourstepdata);
        this.isShowModal = true;
        //this.finalsetup()
        document.documentElement.style.overflow = "hidden";
      }
    },
    seteditData() {
      const edata = this.commonstore.state.edata;
      if (
        this.$route.name == "NoticeRegistrationEdit" ||
        this.$route.query.successful == "true" ||
        this.$route.query.successful == "false"
      ) {
        this.anTitle = edata.announcement_title;
        this.anTitllength = this.anTitle.length;
        this.NoticePostPeriod = edata.notice_posting_period;
        this.notice_sdate = this.formatDate(
          edata.notice_posting_period_custom_start_date
        );
        this.today = new Date(edata.notice_posting_period_custom_start_date);
        this.today2 = new Date(edata.notice_posting_period_custom_end_date);
        this.notice_edate = this.formatDate(
          edata.notice_posting_period_custom_end_date
        );
        console.log("sdfs", this.notice_sdate);
        this.directInput();
        if (this.$route.name == "NoticeRegistrationEdit") {
          this.bgimage();
        } else {
          this.bgimageDuplicate();
        }
      }
    },
  },

  mounted() {
    if (this.$route.name == "NoticeRegistration") {
      // alert(typeof this.$route.query.successful);
      if (
        this.$route.query.successful == "true" ||
        this.$route.query.successful == "false"
      ) {
        // this.editprefillData = this.commonstore.state.fourstepdata;
        this.commonstore.methods.seteditdata(
          this.commonstore.state.fourstepdata
        );
        this.$refs.childcompanyInfo.seteditData();
        this.$refs.childtalentInfo.seteditData();
        this.$refs.childworkingInfo.seteditData();
        this.seteditData();
        // alert("two");
        console.log(this.commonstore.state.fourstepdata);
        localStorage.setItem("jobstep", "step3");
      }
    }
    this.commonstore.methods.seteditdata({});
    console.log(this.companyInfo);
    this.not_step = true;
    console.log(this.$route.name);
    if (this.$route.name == "NoticeRegistrationEdit") {
      localStorage.setItem("jobstep", "step0");
      this.jobpostingervice.getJobDetails(this.$route.params.id).then((res) => {
        // console.log(res.data);
        this.editprefillData = res.data;
        this.commonstore.methods.seteditdata(res.data);
        this.$refs.childcompanyInfo.seteditData();
        this.$refs.childtalentInfo.seteditData();
        this.$refs.childworkingInfo.seteditData();
        this.seteditData();
        console.log(this.commonstore.state.edata);
        // seteditdata
      });
    }
    if (Object.keys(this.$route.query).length !== 0) {
      //console.log("hiiiiiii" + this.$route.query.backPressed);
      // if(this.$route.query.backPressed == true) {
      //   console.log('hiiiiiii')
      this.commonstore.state.isModalNotificationTypePurchase = true;
      this.companyInfo = false;
      //}
    }
  },

  // watch: {
  //   "commonstore.state.isModalNotificationTypePurchase"(newVal, oldVal) {
  //     if (newVal) {
  //       this.annouceInfo = false;
  //       var body = document.querySelector("html");
  //       body.style.overflow = "hidden";
  //     } else {
  //       this.annouceInfo = true;
  //       var body = document.querySelector("html");
  //       body.style.overflow = "auto";
  //     }
  //   },
  // },
};
</script>
<style scoped>
.hide {
  display: none !important;
}
</style>
