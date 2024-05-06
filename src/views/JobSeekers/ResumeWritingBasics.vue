<template>
  <div
    class="back-wh"
    v-if="!occupationFilter && !regionFilter && !openSelfPr && !openCareers"
  >
    <div class="top-hdr m-0 top-hdr-br">
      <div class="container">
        <h4 class="heading fff">
          <a
            href="javascript:void(0);"
            class="left-arrow"
            @click.prevent="setLeave()"
          >
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >이력서 작성
        </h4>
      </div>
    </div>
    <div
      class="required-fields-icon"
      v-if="commonStore.state.requiredToastMsgShow"
    >
      <p>
        <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
        입력값을 확인해 주세요.
      </p>
    </div>
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="app-outr form-wrapper">
          <div class="app-innr">
            <div class="app-left">
              <div class="form-group mb-0">
                <!-- @click="$router.push({
                  name: 'EditMemberInformation'
                })" -->
                <div class="file-input">
                  <!-- <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    class="file-input__input"
                    ref="file"
                    accept="image/gif,image/jpg,image/jpeg,image/png"
                    hidden
                    @change="onFileChange"
                  /> -->

                  <div class="profile-img-otr">
                    <div class="image-wrap">
                      <!-- <img src="@/assets/images/image.png" alt=""
                /> -->
                      <span class="resume-profile-sub">
                        <img
                          v-if="personalDetails.profileImg == null"
                          src="@/assets/images/image.png"
                        />
                        <img
                          v-else
                          id="blah"
                          :src="personalDetails.profileImg"
                        />
                      </span>
                    </div>

                    <!-- <em
                      class="cross"
                      v-if="personalDetails.profileImg !== null"
                      @click="removeProfileImage"
                      ><img src="@/assets/icons/profile-cross-icon.svg" alt=""
                    /></em>
                    <label class="file-input__label" for="file-input">
                      <em class="edit"
                        ><img src="@/assets/icons/edit-icon.svg" alt=""
                      /></em>
                    </label> -->
                  </div>
                  <!-- <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    class="file-input__input"
                    @change="onFileChange"
                  />
                  <label class="file-input__label" for="file-input">
                    <span
                      ><img :src="personalDetails.profileImg" alt=""
                    /></span>
                    <em class="edit"
                      ><img src="@/assets/icons/edit-icon.svg" alt=""
                    /></em>
                  </label> -->
                </div>
              </div>
            </div>
            <div class="app-right">
              <div class="app-top">
                <h3 class="sub-heading mb-0">{{ personalDetails.name }}</h3>
                <router-link :to="{ name: 'EditMemberInformation' }"
                  ><img src="@/assets/icons/setting-icon.svg" alt=""
                /></router-link>
              </div>
              <ul class="app-list">
                <li>{{ personalDetails.gender }}</li>
                <li>{{ personalDetails.age }}세</li>
              </ul>
            </div>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">근로자 주소</p>
              <p class="p-right">{{ personalDetails.address }}</p>
            </li>
            <li>
              <p class="p-left">연락처</p>
              <p class="p-right">{{ personalDetails.contactNo }}</p>
            </li>
            <li>
              <p class="p-left">이메일</p>
              <p class="p-right">{{ personalDetails.email }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <form
    v-if="!occupationFilter && !regionFilter && !openSelfPr && !openCareers"
  >
    <div class="form-wrapper">
      <form @submit="saveResume('0', $event)">
        <div class="back-wh border-top-two-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0">
                <label>이력서 제목 <span>[필수]</span></label>
                <!-- check --- {{ resumeTitleSelected }} -->
                <selectoption
                  class="my-dropdown-toggle salary-drop"
                  :options="resumeLists.titles"
                  :selected="resumeTitleSelected"
                  v-on:updateOption="getCustomTitle($event)"
                  :placeholder="'이력서 제목을 선택해 주세요'"
                  :closeOnOutsideClick="boolean"
                >
                </selectoption>
                <!-- <select
                  class="form-control"
                  v-model="resumeStore.state.resumeTitle"
                  @change="getCustomTitle"
                >
                  <option value="">이력서 제목을 선택해 주세요</option>
                  <option
                    :value="i.name"
                    v-for="(i, e) in resumeLists.titles"
                    :key="e"
                  >
                    {{ i.name }}
                  </option>
                </select> -->
                <input
                  type="text"
                  class="custom-title"
                  placeholder="이력서 제목을 입력해주세요."
                  v-if="resumeStore.state.resumeTitle == '직접 입력'"
                  v-model="resumeStore.state.title"
                />
                <small class="error-msgsign">{{ errors.resume_title }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0">
                <label>최종학력 <span>[필수]</span></label>
                <selectoption
                  class="my-dropdown-toggle salary-drop"
                  :options="resumeLists.academics"
                  :selected="resumeEducationSelected"
                  v-on:updateOption="getCustomEducation($event)"
                  :placeholder="'학력을 선택해 주세요'"
                  :closeOnOutsideClick="boolean"
                >
                </selectoption>
                <small class="error-msgsign">{{
                  errors.last_educational_background
                }}</small>
                <!-- <select
                  class="form-control"
                  v-model="resumeStore.state.academics"
                >
                  <option value="">학력을 선택해 주세요</option>
                  <option
                    :value="j.value"
                    v-for="(j, id) in resumeLists.academics"
                    :key="id"
                  >
                    {{ j.name }}
                  </option>
                </select> -->
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0 resume-basic-area">
                <label>경력사항 <span>[필수]</span></label>
                <!-- {{ careerRadio }} -->
                <ul class="check-list box-check col-6">
                  <li>
                    <label class="check-input">
                      <input
                        type="radio"
                        name="Careerradio"
                        value="newcomer"
                        v-model="careerRadio"
                      />
                      <span class="text">신입</span>
                    </label>
                  </li>
                  <li>
                    <label class="check-input">
                      <input
                        type="radio"
                        name="Careerradio"
                        value="experience"
                        :checked="careers.length > 0"
                        v-model="careerRadio"
                        @change="CheckCareer"
                      />
                      <span class="text">경력</span>
                    </label>
                  </li>
                </ul>
                <small class="error-msgsign">{{ errors.career_type }}</small>
                <div class="mt-16" v-if="careerRadio == 'experience'">
                  <template v-for="(career, id) in careers">
                    <CareerCard :key="id" v-if="career">
                      <template v-slot:cr-date>
                        <span>{{
                          findDate(
                            career?.emp_period_from,
                            career?.emp_period_until
                          )
                        }}</span>
                      </template>
                      <template v-slot:cr-title>
                        <h3 class="sb-heading">{{ career.company_name }}</h3>
                      </template>
                      <template v-slot:cr-link>
                        <a href="javascript:void(0);" class="detail-link">
                          {{ career.responsiblities }}
                        </a>
                      </template>
                    </CareerCard>
                  </template>
                </div>
                <a
                  href="#"
                  @click="setOpenCareers"
                  v-if="careers.length > 0 && careerRadio == 'experience'"
                  class="btn btn-border-outline lg mt-16"
                  >관리하기</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two" ref="top">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0">
                <div class="d-flex mb-8">
                  <label>희망 근무지 <span>[필수]</span></label>
                  <p class="number lg">
                    <span>{{
                      regionStore.state.workPlaceVisibleState.length
                    }}</span
                    >/10
                  </p>
                </div>
                <div @click="openRegion">
                  <select class="form-control">
                    <option>지역을 선택해 주세요</option>
                  </select>
                </div>
                <small class="error-msgsign">{{ errors.work_places }}</small>
                <ul class="select-list">
                  <li
                    v-for="(i, e) in regionStore.state.workPlaceVisibleState"
                    :key="e"
                  >
                    <span
                      >{{ i }}
                      <a
                        href="javascript:void(0);"
                        @click="clearRegion(i, e, $event)"
                        ><img src="@/assets/icons/cross.svg" alt="" />
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0">
                <div class="d-flex mb-8">
                  <label>업직종 <span>[필수]</span></label>
                  <p class="number lg">
                    <span>{{
                      occupationStore.state.filtersVisibleState.length
                    }}</span
                    >/10
                  </p>
                </div>
                <div @click="openOccupation">
                  <select class="form-control">
                    <option>업직종을 선택해 주세요</option>
                  </select>
                </div>
                <small class="error-msgsign">{{ errors.occupations }}</small>
                <ul class="select-list">
                  <li
                    v-for="(i, e) in occupationStore.state.filtersVisibleState"
                    :key="e"
                  >
                    <span
                      >{{ i }}
                      <a
                        href="javascript:void(0);"
                        @click="removeOccupationFilter(i, e, $event)"
                        ><img src="@/assets/icons/cross.svg" alt=""
                      /></a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <CustomMultiCheckSelect
                :limit="3"
                title="희망 근무 일수 "
                :optionArray="resumeLists.desiredPeriods"
                :preselected="resumeStore.state.desired_periods"
                @selectedValues="getDesiredPeriod($event)"
              />
              <small class="error-msgsign">{{ errors.working_periods }}</small>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <CustomMultiCheckSelect
                :limit="3"
                title="희망 근무 요일 "
                :optionArray="resumeLists.desiredDays"
                :preselected="resumeStore.state.desired_days"
                @selectedValues="getDesiredDays($event)"
              />
              <small class="error-msgsign">{{ errors.working_days }}</small>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <CustomMultiCheckSelect
                :limit="3"
                title="희망 근무 시간 "
                :optionArray="resumeLists.desiredHours"
                :preselected="resumeStore.state.desired_hours"
                @selectedValues="getDesiredHours($event)"
              />
              <small class="error-msgsign">{{ errors.working_hours }}</small>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <CustomMultiCheckSelect
                :limit="5"
                title="고용형태 "
                :optionArray="resumeLists.employmentType"
                :preselected="resumeStore.state.employment_type"
                @selectedValues="getEmploymentType($event)"
              />
              <small class="error-msgsign">{{ errors.employment_type }}</small>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0">
                <label>자기소개서<span>[필수]</span></label>
                <!-- {{ selfIntro }} -->
                <!-- maxlength="501" -->
                <textarea
                  class="form-control"
                  placeholder=""
                  :value="selfIntro"
                  @input="(e) => setSelfIntro(e)"
                  ref="IntroField"
                ></textarea>
                <div class="count">
                  <span class="count-txt" @click="reInitialize"
                    ><img src="@/assets/icons/initialization.svg" alt="" />
                    초기화</span
                  >
                  <p>
                    <span>{{ selfIntro && selfIntro?.length }}</span>
                    /500
                  </p>
                </div>
                <small class="error-msgsign">{{
                  errors.self_introduction
                }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="form-group mb-0 photo-add">
                <label>자기 PR<span class="gr">[선택]</span></label>
                <div class="back" v-if="pr_photo_video.length">
                  <h5 class="pr-hdr">사진/동영상</h5>
                  <div class="selfpr-img-outr announcement-info-img">
                    <div
                      class="self-img-innr"
                      v-for="(i, e) in pr_photo"
                      :key="e"
                    >
                      <figure>
                        <img :src="i.url" alt="" />
                      </figure>
                    </div>
                  </div>
                  <div class="add-wrap" v-for="(i, e) in pr_video" :key="e">
                    <div class="add-wrap-left">
                      <p>
                        <a href="#">{{ i.url }}</a>
                      </p>
                      <h6>
                        {{ i.type }}
                        <span>{{
                          commonStore.methods.dateFormat(
                            i.created_at,
                            "YYYY.M.D"
                          )
                        }}</span>
                      </h6>
                    </div>
                    <!--  -->
                    <a href="#" @click.prevent="removeVideo(e)"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </div>
                <div class="back mt-12" v-if="pr_otherDoc.length">
                  <h5 class="pr-hdr">기타 문서</h5>
                  <div
                    class="add-wrap"
                    v-for="(ele, id) in pr_otherDoc"
                    :key="id"
                  >
                    <div class="add-wrap-left">
                      <p>
                        <a href="#">{{ ele.url }}</a>
                      </p>
                      <h6>
                        동영상
                        <span>{{
                          commonStore.methods.dateFormat(
                            ele.created_at,
                            "YYYY.M.D"
                          )
                        }}</span>
                      </h6>
                    </div>
                    <a href="#" @click.prevent="removeSelfDocs(id)"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </div>

                <a
                  href="#"
                  class="btn btn-border-outline lg mt-12"
                  v-if="pr_photo_video.length || pr_otherDoc.length"
                  @click="setSelfPr($event)"
                  >관리하기</a
                >
                <div
                  class="no-data-content"
                  v-if="!pr_photo_video.length && !pr_otherDoc.length"
                >
                  <img
                    class="no-job-icon"
                    src="@/assets/icons/doc-icon.svg"
                    alt=""
                  />
                  <p><span>등록한 파일이 없습니다.</span></p>
                  <p style="text-align: center">
                    본인의 작업물, 포토폴리오를 관리하여 <br />
                    돋보이는 이력서를 만들어 보세요!
                  </p>
                  <a
                    href="#"
                    class="btn btn-border-outline lg"
                    @click="setSelfPr($event)"
                    >관리하기</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="back-wh border-top-two">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">기본 이력서</h3>
              </div>
              <div class="check-list squre basic-resume-check">
                <label class="check-input">
                  해당 이력서를 <span>기본이력서로 저장</span>하시겠습니까?
                  <input
                    type="checkbox"
                    name="default_type"
                    @change="setDefault($event)"
                    ref="checkDefault"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="btnn-group">
                <div class="btn-group-innr">
                  <button
                    type="button"
                    class="btn btn-primary-outline lg"
                    @click="saveResume('1', $event)"
                  >
                    임시 저장하기
                  </button>
                </div>
                <div class="btn-group-innr">
                  <input
                    type="submit"
                    class="btn btn-primary lg"
                    value="작성 완료하기"
                    :disabled="disableSubmit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </form>
  <OccupationSetting
    @setfalse="hideoccupation($event)"
    @submittedValue="setOccupationFinal($event)"
    v-show="occupationFilter"
  />

  <RegionSelect
    @setfalse="hideRegion($event)"
    @submittedValue="setRegionFinal($event)"
    v-show="regionFilter"
  />

  <EmploymentContractUnwrittenModal
    :isModal="showErrorModal"
    @closeModal="closeErrorModal"
  />
  <ResumeTemporaryModal
    :isModal="showtemporaryModal"
    @closeModal="closeTemporaryModal"
    @setClose="GoToEdit"
  />
  <ResumeCompletedModal
    :isModal="showSuccessModal"
    @closeModal="redirectToHome"
    @checkResume="GoToDetails"
  />
  <CancelResumeMOdal
    :isModal="cancelModal"
    @closeModal="cancelModal = false"
    @goToList="redirectToList"
  />
  <SelfPrPage
    v-if="openSelfPr"
    v-show="openSelfPr"
    @closePr="hidePr"
    @setPr="getsefPr"
    @deletePR="removePr"
    @deleteOtherDoc="removeSelfDocs"
    :selfPrId="pageId"
    :selfPr_photo_video="pr_photo_video"
    :selfPr_otherDoc="pr_otherDoc"
  />
  <CareerPage
    v-if="openCareers"
    @setClose="resetCareer"
    @setBack="openCareers = false"
  />
  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
  <ResumeErrorVue
    :errMsg="showErrModal"
    :isModal="showErrModal.state"
    @closeModal="CloseErrModal"
  />
</template>

<script>
import CareerCard from "@/components/CareerCard.vue";
import moment from "moment";
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
} from "@vue/runtime-core";
import { careerServices } from "@/service/API/career.js";
import { resume } from "@/service/API/resume.js";
import { profile } from "@/service/API/profile.js";
import { resumeLists } from "@/config/resumeOptions.js";
import resumeValidate from "@/Validations/resumeValidate.js";
import CustomMultiCheckSelect from "@/components/Resume/CustomMultiCheckSelect.vue";
import EmploymentContractUnwrittenModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import ResumeTemporaryModal from "@/components/Modals/ResumeTemporaryModal.vue";
import CancelResumeMOdal from "@/components/Modals/cancelResumeMOdal.vue";
import ResumeCompletedModal from "@/components/Modals/ResumeCompletedModal.vue";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import RegionSelect from "@/views/JobSeekers/RegionSelect.vue";
import SelfPrPage from "@/views/JobSeekers/SelfPR.vue";
import CareerPage from "@/views/JobSeekers/ExperienceNoData.vue";
import { CompanyInfo } from "@/service/API/CompanyInfo.js";
import selectoption from "@/components/selectOption.vue";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import ResumeErrorVue from "@/components/Modals/ResumeError.vue";
export default {
  name: "ResumeWritingBasics",
  components: {
    CareerCard,
    CustomMultiCheckSelect,
    OccupationSetting,
    EmploymentContractUnwrittenModal,
    ResumeTemporaryModal,
    RegionSelect,
    CancelResumeMOdal,
    ResumeCompletedModal,
    SelfPrPage,
    CareerPage,
    selectoption,
    LoadingBar,
    ResumeErrorVue,
  },
  emits: ["input"],
  setup(props, { emit }) {
    const router = useRouter();
    const careerRadio = ref("");
    const careers = ref([]);
    const desired_periods = ref([]);
    const desired_days = ref([]);
    const desired_hours = ref([]);
    const employment_type = ref([]);
    const selfIntro = ref("");
    const resumeTitle = ref("");
    const resumeTitleSelected = ref({});
    const resumeEducationSelected = ref({});
    const resumeStore = inject("resumeStore");
    const occupationStore = inject("occupationStore");
    const regionStore = inject("regionStore");
    const commonStore = inject("commonStore");
    const pr_photo_video = ref([]);
    const pr_photo = ref([]);
    const pr_video = ref([]);
    const pr_otherDoc = ref([]);
    const errors = ref({});
    const is_default = ref("0");
    const showErrorModal = ref(false);
    const showSuccessModal = ref(false);
    const showtemporaryModal = ref(false);
    const checkDefault = ref(null);
    const route = useRoute();
    const pageId = computed(() => route.params.id);
    const occupationFilter = ref(false);
    const regionFilter = ref(false);
    const cancelModal = ref(false);
    const completedModal = ref(false);
    const openSelfPr = ref(false);
    const openCareers = ref(false);
    const resumeId = ref("");
    const memberData = reactive({
      file: undefined,
      fileName: "",
      company_profile_img: "",
    });
    const disableSubmit = ref(false);
    const loading = reactive({
      state: false,
      message: "잠시만 기다려 주세요.",
    });

    const personalDetails = reactive({
      name: "",
      address: "",
      gender: "",
      age: "",
      contactNo: "",
      email: "",
      profileImg: "src/assets/images/image.png",
    });

    const finalOccupation = ref([]);
    const finalRegion = ref([]);
    const count = ref(1);
    const top = ref(null);
    const isJustSelfprClose = ref(false);
    const IntroField = ref(null);
    const showErrModal = reactive({
      state: false,
      headMsg: "",
      bodyMsg: "",
    });
    // const internalValue = computed({
    //   get() {
    //     return selfIntro.value;
    //   },
    //   set(aModifiedValue) {
    //     emit("input", aModifiedValue.substring(0, 500));
    //   },
    // });

    // watch(
    //   () => internalValue,
    //   (val) => {
    //     console.log(val);
    //   }
    // );

    // computed: {
    //   internalValue: {
    //     get () {
    //       return this.value;
    //     },
    //     set (aModifiedValue) {
    //       this.$emit("input", aModifiedValue.substring(0, this.max));
    //     }
    //   }
    // },

    onMounted(() => {
      // getCarrer();
      if (pageId.value !== "add") {
        getDetails();
      }
      getMemberDetails();
      // IntroField.value.addEventListener("keydown", function (event) {
      //   if (selfIntro.value.length === 500 && event.keyCode != 8) {
      //     event.preventDefault();
      //     return false;
      //   }
      //   var length =
      //     event.keyCode != 8 ? selfIntro.value.length + 1 : selfIntro.value.length - 1;
      //   console.log(length);
      // });
    });

    onUnmounted(() => {
      localStorage.removeItem("PhotoData");
      localStorage.removeItem("OtherDocData");
      resumeStore.methods.refreshData();
      occupationStore.methods.refreshUnMount();
      regionStore.methods.refreshUnMount();
    });

    watch(
      () => top.value,
      () => {
        if (count.value == 1 && isJustSelfprClose.value === false) {
          if (top.value) {
            top.value.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    );
    watch(
      () => is_default.value,
      (val) => {
        // console.log(val);
        if (val == "1") {
          checkDefault.value.checked = true;
        }
      }
    );

    const getMemberDetails = async () => {
      let res = await profile.userDeatils();
      // console.log(res);
      personalDetails.name = res.data.name;
      personalDetails.address = res.data.address;
      personalDetails.gender = res.data.gender == "m" ? "남자" : "여자";
      personalDetails.age =
        res.data.age_in_years == null ? "" : res.data.age_in_years;
      personalDetails.contactNo = res.data.phone_number;
      personalDetails.email = res.data.email;
      personalDetails.profileImg = res.data.profile_image;
    };

    const getDetails = async () => {
      console.log("details called");
      let res = await resume.viewResume(pageId.value);
      // console.log(res);
      occupationStore.state.totalFilters = [];
      regionStore.state.totalFilters = [];
      resumeStore.state.resumeTitle = res.data.resume_title;
      resumeStore.state.title = res.data.resume_title;
      resumeTitleSelected.value["text"] = res.data.resume_title;
      resumeStore.state.academics = res.data.last_educational_background;
      resumeEducationSelected.value = resumeLists.academics
        .filter((degree) => {
          if (degree.value == res.data.last_educational_background) {
            return degree.text;
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr }), {});
      console.log(resumeEducationSelected.value);
      resumeStore.state.desired_periods = res.data.working_periods;
      resumeStore.state.desired_days = res.data.working_days;
      resumeStore.state.desired_hours = res.data.working_hours;
      resumeStore.state.employment_type = res.data.employment_type;
      selfIntro.value = res.data.self_introduction;
      careerRadio.value = res.data.career;
      if (res.data.career == "experience") {
        careers.value = res.data.career_list;
      }
      res.data.selfPrPhotoVideo.forEach(({ image_url, ...rest }) => {
        pr_photo_video.value.push({
          ...rest,
          url: image_url,
        });
      });
      if (pr_photo_video.value) {
        pr_photo.value = pr_photo_video.value.filter(
          (res) => res.type === "image"
        );
        pr_video.value = pr_photo_video.value.filter(
          (res) => res.type === "video"
        );
        localStorage.setItem("PhotoData", pr_photo_video.value);
      }
      res.data.selfPrOtherDocs.forEach(({ doc_url, ...rest }) => {
        pr_otherDoc.value.push({
          ...rest,
          url: doc_url,
        });
      });
      if (pr_otherDoc.value) {
        localStorage.setItem("OtherDocData", pr_otherDoc.value);
      }
      is_default.value = res.data.is_default;
      // let occu_arr = res.data.resume_occupation.map(
      //   ({
      //     occupation_first_txt,
      //     occupation_second_txt,
      //     occupation_third_txt,
      //     ...rest
      //   }) => {
      //     return rest;
      //   }
      // );
      finalOccupation.value = res.data.occupations;
      finalRegion.value = res.data.work_places;
      // console.log("occu_arr", occu_arr);
      res.data.resume_occupation.forEach((ele) => {
        occupationStore.state.totalFilters.push({
          occupation_first: ele.occupation_first,
          occupation_second: ele.occupation_second,
          occupation_third: ele.occupation_third,
          name: ele.name,
        });
      });
      res.data.resume_work_place.forEach((ele) => {
        regionStore.state.totalFilters.push({
          work_place_first: ele.work_place_first,
          work_place_second: ele.work_place_second,
          work_place_third: ele.work_place_third,
          name: ele.name,
        });
      });
      setTimeout(() => {
        console.log("setTimeout called");
        occupationStore.methods.submitFilter();
        regionStore.methods.submitFilter();
      }, 100);
    };

    function removePr(i) {
      pr_photo_video.value.splice(i, 1);
    }

    const getsefPr = () => {
      pr_photo_video.value = JSON.parse(localStorage.getItem("PhotoData"));
      if (pr_photo_video.value) {
        pr_photo.value = pr_photo_video.value.filter(
          (res) => res.type === "image"
        );
        pr_video.value = pr_photo_video.value.filter(
          (res) => res.type === "video"
        );
      }
      pr_otherDoc.value = JSON.parse(localStorage.getItem("OtherDocData"));
      // console.log(pr_photo.value, pr_video.value, pr_otherDoc.value);
    };

    function removeVideo(id) {
      pr_video.value.splice(id, 1);
      pr_photo_video.value = [...pr_photo.value, ...pr_video.value];
      // console.log("pr_photo_video.value", pr_photo_video.value);
      localStorage.setItem("PhotoData", JSON.stringify(pr_photo_video.value));
    }

    function removeSelfDocs(id) {
      pr_otherDoc.value.splice(id, 1);
    }

    const getCarrer = async () => {
      let res = await careerServices.careerList();
      careers.value = res.data.result;
      console.log("check career", careers.value);
      // if (careers.value.length > 0) {
      //   careerRadio.value = "experience";
      // }
      // else {
      //   careerRadio.value = "newcomer";
      // }
    };

    async function resetCareer() {
      openCareers.value = false;
      await getCarrer();
      if (careers.value.length > 0) {
        careerRadio.value = "experience";
      } else {
        careerRadio.value = "newcomer";
      }
    }

    const CheckCareer = async () => {
      await getCarrer();
      // console.log(careerRadio.value, "career type");
      if (careerRadio.value === "experience" && careers.value.length == 0) {
        openCareers.value = true;
        // careerRadio.value = "newcomer";
      }
    };

    const findDate = (from, till) => {
      return (
        moment(String(from)).format("YYYY.MM") +
        " ~ " +
        moment(String(till)).format("YYYY.MM")
      );
    };

    const getDesiredPeriod = (e) => {
      desired_periods.value = e;
      resumeStore.state.desired_periods = [...e];
    };

    const getDesiredDays = (e) => {
      desired_days.value = e;
      resumeStore.state.desired_days = [...e];
    };

    const getDesiredHours = (e) => {
      desired_hours.value = e;
      resumeStore.state.desired_hours = [...e];
    };

    const getEmploymentType = (e) => {
      employment_type.value = e;
      resumeStore.state.employment_type = [...e];
    };

    const reInitialize = () => {
      selfIntro.value = "";
      resumeStore.state.selfIntro = "";
    };

    const setSelfPr = (e) => {
      e.preventDefault();
      isJustSelfprClose.value = true;
      openSelfPr.value = true;
    };

    const checkValidate = (data) => {
      const { isInvalid, error } = resumeValidate(data);
      if (error.require) {
        commonStore.methods.displayRequiredToast();
        return false;
      }
      if (isInvalid) {
        errors.value = error;
        // console.log(errors.value, "check error");
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const saveResume = async (istempo, e) => {
      e.preventDefault();
      // console.log(
      //   "check states",
      //   regionStore.state.workPlaceFilterState,
      //   occupationStore.state.totalFilterState
      // );
      console.log("finalOccupation while submit", finalOccupation.value);
      let inputData = {
        resume_title:
          resumeStore.state.resumeTitle == "직접 입력"
            ? resumeStore.state.title
            : resumeStore.state.resumeTitle,
        last_educational_background: resumeStore?.state?.academics?.length
          ? resumeStore.state.academics
          : null,
        career_type: careerRadio.value,
        work_places: finalRegion.value,
        occupations: finalOccupation.value,
        working_days: resumeStore.state.desired_days,
        working_periods: resumeStore.state.desired_periods,
        working_hours: resumeStore.state.desired_hours,
        employment_type: resumeStore.state.employment_type,
        self_introduction: selfIntro.value,
        is_default: is_default.value.toString(),
        is_temporary: istempo,
        selfPrPhotoVideo: pr_photo_video.value,
        selfPrOtherDocs: pr_otherDoc.value,
      };
      console.log(inputData);
      if (!checkValidate(inputData) && istempo == "0") {
        commonStore.methods.displayRequiredToast();
        // showErrorModal.value = true;
        return;
      } else {
        console.log(inputData);
        disableSubmit.value = true;
        if (pageId.value == "add") {
          let res = await resume.addResume(inputData);
          disableSubmit.value = false;
          console.log(res);
          if (res.status == 200 && istempo == "0") {
            resumeId.value = res.data.resume_id;
            showSuccessModal.value = true;
          } else if (res.status == 200 && istempo == "1") {
            resumeId.value = res.data.resume_id;
            showtemporaryModal.value = true;
          }
          if (
            res.response?.data.error ==
            "Can not set default to temporary resume"
          ) {
            showErrModal.bodyMsg = "기본 이력서는 임시 저장이 불가능 합니다.";
            showErrModal.headMsg = "임시 저장";
            showErrModal.state = true;
          }
        } else {
          let res2 = await resume.editResume(pageId.value, inputData);
          console.log(res2, "tempo", istempo);
          disableSubmit.value = false;
          if (res2.status == 200 && istempo == "0") {
            // console.log("edit complete");
            showSuccessModal.value = true;
          } else if (res2.status == 200 && istempo == "1") {
            // console.log("edit complete tempo");
            showtemporaryModal.value = true;
          }
          if (
            res2.response?.data.error ==
            "Can not set default to temporary resume"
          ) {
            showErrModal.bodyMsg = "기본 이력서는 임시 저장이 불가능 합니다.";
            showErrModal.headMsg = "임시 저장";
            showErrModal.state = true;
          }
        }
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      router.push({ name: "Resume" });
      localStorage.removeItem("PhotoData");
      localStorage.removeItem("OtherDocData");
    };

    const closeTemporaryModal = () => {
      showtemporaryModal.value = false;
      router.push({ name: "Resume" });
      localStorage.removeItem("PhotoData");
      localStorage.removeItem("OtherDocData");
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    const setDefault = (e) => {
      is_default.value = e.target.checked ? "1" : "0";
    };

    function hideoccupation(data) {
      isJustSelfprClose.value = false;
      count.value = count.value + 1;
      occupationFilter.value = data;
      // clearTimeout(storeSubmit.value);
      console.log("finalOccupation", finalOccupation.value);
      occupationStore.methods.clearSelected();
      // window.scrollTo(0, 0);
    }

    function hideRegion(data) {
      isJustSelfprClose.value = false;
      count.value = count.value + 1;
      regionFilter.value = data;
      console.log("finalRegion", finalRegion.value);
      regionStore.methods.clearSelected();
      // window.scrollTo(0, 0);
    }

    const setLeave = () => {
      cancelModal.value = true;
    };

    const redirectToList = () => {
      showSuccessModal.value = false;
      resumeStore.methods.refreshData();
      router.go(-1);
      cancelModal.value = false;
    };

    const redirectToHome = () => {
      cancelModal.value = false;
      showSuccessModal.value = false;
      resumeStore.methods.refreshData();
      router.push({ name: "home" });
    };

    const GoToDetails = () => {
      showSuccessModal.value = false;
      showtemporaryModal.value = false;
      router.push({
        name: "ApplicantInformation",
        params: {
          id: pageId.value == "add" ? resumeId.value : pageId.value,
        },
      });
    };

    function hidePr() {
      openSelfPr.value = false;
    }

    function setOpenCareers(e) {
      e.preventDefault();
      openCareers.value = true;
    }

    function GoToEdit() {
      // console.log("edit tempo");
      showtemporaryModal.value = false;
      router.push({
        name: "ResumeWritingBasics",
        params: {
          id: pageId.value == "add" ? resumeId.value : pageId.value,
        },
      });
    }

    function openRegion() {
      count.value = count.value - 1;
      regionFilter.value = true;
      window.scrollTo(0, 0);
      // alert("region open");
    }

    function openOccupation() {
      count.value = count.value - 1;
      occupationFilter.value = true;
      window.scrollTo(0, 0);
      // alert("occupation open");
    }

    const onFileChange = async (e) => {
      var formData = new FormData();
      var files = e.target.files || e.dataTransfer.files;
      const [file] = files;
      if (!files.length) return;
      memberData.file = files[0];
      // console.log(memberData.file);
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(memberData.file.name)) {
        //this.render1 = true;
        memberData.fileName = "";
        return false;
      } else {
        //this.render1 = false;
        memberData.fileName = memberData.file.name;
        formData.append("image", files[0]);
      }
      //this.fileExtension = memberData.fileName.replace(/^.*\./, "");
      await updateProfilePhoto(formData);
      personalDetails.profileImg = URL.createObjectURL(file);
    };

    const updateProfilePhoto = async (data) => {
      disableSubmit.value = true;
      loading.state = true;
      try {
        let res = await CompanyInfo.updateProfilePic(data);
        if (res.status == 200) {
          disableSubmit.value = false;
          loading.state = false;
        }
      } catch (e) {
        // console.log(e);
        disableSubmit.value = false;
        loading.state = false;
      }
    };

    function getCustomTitle(ele) {
      resumeTitleSelected.value = ele;
      resumeStore.state.resumeTitle = ele.text;
    }

    function getCustomEducation(ele) {
      resumeEducationSelected.value = ele;
      resumeStore.state.academics = ele.value;
    }

    async function removeProfileImage() {
      let res = await profile.deleteProfilePic();
      // console.log(res);
      if (res.status == 200) {
        getMemberDetails();
      }
    }

    function clearRegion(i, id, event) {
      // console.log(
      //   "check state.workPlaceFilterState before",
      //   regionStore.state.workPlaceFilterState
      // );
      // setTimeout(() => {
      regionStore.methods.removeFilter(i, id, event);
      // }, 5000);

      setTimeout(() => {
        regionStore.methods.submitFilter();
      }, 100);
    }

    function removeOccupationFilter(i, id, event) {
      occupationStore.methods.removeFilter(i, id, event);
      setTimeout(() => {
        occupationStore.methods.submitFilter();
      }, 100);
    }

    const setOccupationFinal = (event) => {
      console.log("only when hit submit occu", event);
      finalOccupation.value = event;
    };

    const setRegionFinal = (event) => {
      console.log("only when hit submit region", event);
      finalRegion.value = event;
    };

    const setSelfIntro = (event) => {
      console.log("event", event);
      console.log(IntroField.value.value.length, IntroField.value.maxLength);
      selfIntro.value = event.target.value;
      if (
        IntroField.value.value.length > 500 &&
        event.inputType != "deleteContentBackward"
      ) {
        // alert("input method called");
        // event.preventDefault();

        selfIntro.value = IntroField.value.value.slice(0, 500);
        console.log("input method called");
        IntroField.value.blur();
        return false;
      }
      // else {
      //   console.log("set val", event.target.value);
      //   selfIntro.value = event.target.value;
      // }
    };

    function CloseErrModal() {
      showErrModal.state = false;
    }

    return {
      careerRadio,
      IntroField,
      careers,
      resumeLists,
      desired_periods,
      desired_days,
      desired_hours,
      employment_type,
      selfIntro,
      resumeTitle,
      resumeStore,
      occupationStore,
      pr_photo_video,
      pr_photo,
      pr_video,
      pr_otherDoc,
      commonStore,
      is_default,
      showErrorModal,
      showSuccessModal,
      showtemporaryModal,
      checkDefault,
      occupationFilter,
      regionFilter,
      CheckCareer,
      findDate,
      getDesiredPeriod,
      getDesiredDays,
      getDesiredHours,
      getEmploymentType,
      reInitialize,
      setSelfPr,
      saveResume,
      closeSuccessModal,
      closeErrorModal,
      closeTemporaryModal,
      setDefault,
      hideoccupation,
      hideRegion,
      regionStore,
      setLeave,
      cancelModal,
      redirectToList,
      completedModal,
      GoToDetails,
      openSelfPr,
      hidePr,
      pageId,
      openCareers,
      setOpenCareers,
      getsefPr,
      personalDetails,
      GoToEdit,
      openRegion,
      openOccupation,
      onFileChange,
      resetCareer,
      removeVideo,
      removeSelfDocs,
      redirectToHome,
      getCustomTitle,
      resumeTitleSelected,
      getCustomEducation,
      resumeEducationSelected,
      removeProfileImage,
      clearRegion,
      removeOccupationFilter,
      disableSubmit,
      loading,
      removePr,
      setOccupationFinal,
      setRegionFinal,
      count,
      top,
      errors,
      setSelfIntro,
      showErrModal,
      CloseErrModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-title {
  width: 100%;
  padding: 12px 8px;
  gap: 10px;
  border-bottom: 1px solid #a4a4a4;
}
</style>
