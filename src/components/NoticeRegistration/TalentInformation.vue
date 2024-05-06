<template>
  <div>
    <div v-show="exceptCondition">
      <!-- Talent information 1 -->
      <div class="form-wrapper pb-0" v-show="talentInfo1">
        <div class="back-wh">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="sub-otr no-border">
                <h3 class="sub-heading lg">인재정보 입력 (기본)</h3>
                <p>원하시는 인재의 기본 정보를 입력해 주세요</p>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>성별</label>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >성별무관
                      <input
                        type="checkbox"
                        v-model="anygender"
                        @change="checkgender()"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <ul class="check-list box-check col-6 mt-16">
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          v-model="gender"
                          :checked="commonstore.state.edata.gender == 'male'"
                          @change="onsubmitModal()"
                        />
                        <span class="text">남자</span>
                      </label>
                    </li>
                    <li>
                      <label class="check-input">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          v-model="gender"
                          :checked="commonstore.state.edata.gender == 'female'"
                          @change="onsubmitModal()"
                        />
                        <span class="text">여자</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>연령</label>
                  <div>
                    <p></p>
                    <div class="check-list squre mt-16 mbt-0">
                      <label class="check-input mbt-0 wght"
                        >연령무관
                        <input
                          type="checkbox"
                          v-model="checkAgebetw"
                          @change="
                            checkAgebetw == true
                              ? ((age_between = false),
                                (startAge = ''),
                                (endAge = ''))
                              : (age_between = true)
                          "
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="form-group-wrapper mt-16" v-show="age_between">
                      <div class="form-group mb-0 form-group-24">
                        <input
                          :type="inputType()"
                          placeholder=""
                          class="form-control"
                          v-model="startAge"
                          maxlength="2"
                          onkeypress="return /[0-9]/i.test(event.key)"
                          @keyup="checkAgeOrder"
                        />
                        <small class="error-msgsign">{{
                          error.startAge
                        }}</small>
                        <em>세 이상</em>
                      </div>
                      <span>~</span>
                      <div class="form-group mb-0 form-group-24">
                        <input
                          :type="inputType()"
                          placeholder=""
                          class="form-control"
                          v-model="endAge"
                          maxlength="2"
                          onkeypress="return /[0-9]/i.test(event.key)"
                          @keyup="checkAgeOrder"
                        />
                        <small class="error-msgsign">{{ error.endAge }}</small>
                        <em>세 이하</em>
                      </div>
                    </div>
                    <small class="error-msgsign">{{ error.ageError }}</small>
                  </div>
                  <div class="cm-bck mt-16">
                    <div class="check-list squre mbt-0">
                      <label class="check-input mbt-0 wght"
                        >중장년층 채용
                        <input type="checkbox" v-model="middle_age" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <p class="mt-8 mid-age-note">
                      (중장년층 채용으로 설정하시면 실버벨 공고로 자동
                      노출됩니다.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-80">
              <div class="container">
                <div class="form-group mb-0">
                  <label>학력</label>
                  <div class="radio-wrapper col">
                    <label class="radio-input"
                      >학력무관
                      <input
                        type="radio"
                        value="no_academic_background"
                        name="education"
                        v-model="educationLevel"
                        :checked="
                          $route.name == 'NoticeRegistration'
                            ? true
                            : commonstore.state.edata.education ==
                              'no_academic_background'
                        "
                        @change="checkeducation()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <label class="radio-input"
                      >학력 조건 선택
                      <input
                        type="radio"
                        value="educated"
                        v-model="educationLevel"
                        name="education"
                        :checked="
                          $route.name == 'NoticeRegistration'
                            ? false
                            : commonstore.state.edata.education !=
                              'no_academic_background'
                        "
                        @change="checkeducation()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <!-- <select
                      class="form-control"
                      v-model="select"
                      v-show="showEdcnLevel"
                    > -->
                    <!-- education level -->
                    <!-- <option
                        v-for="option in educationOptions"
                        v-bind:value="option.value"
                        :key="option.value"
                      >
                        {{ option.name }}
                      </option>
                    </select> -->
                    <selectoption
                      @click="dropdownClicked"
                      v-show="showEdcnLevel"
                      class="my-dropdown-toggle salary-drop"
                      :options="educationOptions"
                      :selected="select"
                      v-on:updateOption="educationset"
                      :placeholder="'일급'"
                      :closeOnOutsideClick="boolean"
                      ref="eduDropdown"
                    >
                    </selectoption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btm-button-group fixed-btn-otr">
          <button
            type="button"
            class="btn btn-primary lg"
            @click="stepchange()"
          >
            다음으로
          </button>
        </div>
      </div>

      <!-- Talent information 2 -->
      <div class="form-wrapper" v-show="talentInfo2">
        <div class="back-wh">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="sub-otr no-border">
                <h3 class="sub-heading lg">인재정보 입력 (업무)</h3>
                <p>원하시는 인재가 업무할 정보를 입력해 주세요</p>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>직무 선택 <span>[필수]</span></label>
                  <!-- <div class="form-group mb-0 mt-16">
                    <input
                      type="button"
                      name="file"
                      id="file"
                      class="inputfile"
                    />
                    <label for="file" @click="scrollTopJob()">{{
                      prefentialConditions == "" ? "선택하기" : "선택 수정하기"
                    }}</label>
                  </div> -->
                  <div class="form-group mb-0">
                    <div @click="scrollTopJob()" class="job-select-field">
                      <!-- <select class="form-control">
                        <option>선택</option>
                      </select> -->

                      <label>선택</label>
                    </div>
                    <ul
                      :class="
                        store.state.filtersVisibleState.length === 0
                          ? 'select-list-show'
                          : 'select-list'
                      "
                    >
                      <li
                        v-for="(item, i) in store.state.filtersVisibleState"
                        :key="i"
                      >
                        <span
                          >{{ item }}
                          <a @click="clearOccupation(item, i, $event)"
                            ><img src="@/assets/icons/cross.svg" alt="" /></a
                        ></span>
                      </li>
                    </ul>
                  </div>
                  <small class="error-msgsign">{{ error.jobSelect }}</small>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>직무 선택 <span>[필수] Demo</span></label>
                  <div class="form-group mb-0">
                    <div class="job-select-field">
                      <label>선택</label>
                    </div>
                  </div>
                  <small class="error-msgsign">{{ error.jobSelect }}</small>
                </div>
              </div>
            </div>
          </div> -->

          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>모집분야 <span>[필수]</span></label>
                  <div class="reqmnt-group">
                    <div class="form-group mb-0 text-rg">
                      <input
                        type="text"
                        placeholder="예) R&d, 경영지원"
                        class="form-control"
                        v-model.trim="areaRecruitment"
                      />
                      <small class="error-msgsign">{{
                        error.jobRequirement
                      }}</small>
                    </div>
                    <div
                      class="form-group mb-0 pos area-rec-field"
                      v-show="noOfPeople_visible"
                    >
                      <input
                        :type="inputType()"
                        placeholder="0"
                        class="form-control"
                        maxlength="5"
                        v-model.trim="noOfPeople"
                        onkeypress="return /[0-9]/i.test(event.key)"
                      />
                      <span>명 모집</span>
                    </div>
                  </div>
                  <div class="check-list squre mbt-0 mt-16">
                    <label class="check-input mbt-0 wght"
                      >인원미정
                      <input
                        type="checkbox"
                        v-model="checknoPeople"
                        @change="
                          checknoPeople == true
                            ? (noOfPeople_visible = false)
                            : (noOfPeople_visible = true)
                        "
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>우대조건 <span class="gray">[선택]</span></label>
                  <div class="form-group mb-0 mt-16">
                    <input
                      type="button"
                      name="file"
                      id="file"
                      class="inputfile"
                    />
                    <label for="file" @click="scrollTop()">{{
                      prefentialConditions == "" ? "선택하기" : "선택 수정하기"
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>담당업무 <span>[필수]</span></label>
                  <Quill-Editor
                    v-model:content="responsible"
                    ref="myQuillEditor"
                    contentType="html"
                    class="ql-toolbar"
                    theme="bubble"
                    placeholder="지원자가 맡게 될 업무를 상세하게 기입해 주세요"
                    :readonly="responsible.length >= 500"
                  />
                  <!-- <QuillEditor theme="snow" tyle="min-height: 200px;overflow:auto;" /> -->
                  <!-- <textarea
                    class="form-control"
                    placeholder="지원자가 맡게 될 업무를 상세하게 기입해 주세요"
                    v-model="responsible"
                    maxlength="500"
                  ></textarea> -->
                  <small class="error-msgsign">{{
                    error.responsibility
                  }}</small>
                  <div class="count">
                    <span class="count-txt" @click="resetData('responsible')"
                      ><img src="@/assets/icons/initialization.svg" alt="" />
                      초기화</span
                    >
                    <p>
                      <span>{{
                        responsible !== "" ? responsible.length : 0
                      }}</span>
                      /500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>지원자격 <span>[필수]</span></label>
                  <Quill-Editor
                    v-model:content="eligibility"
                    ref="myQuillEditor"
                    contentType="html"
                    class="ql-toolbar"
                    theme="bubble"
                    placeholder="지원자의 지원자격 요건을 상세하게 기입해 주세요"
                    :readonly="eligibility.length >= 500"
                  />
                  <!-- <textarea
                    class="form-control"
                    placeholder="지원자의 지원자격 요건을 상세하게 기입해 주세요"
                    v-model.trim="eligibility"
                    maxlength="500"
                  ></textarea> -->
                  <small class="error-msgsign">{{ error.qualification }}</small>
                  <div class="count">
                    <span class="count-txt" @click="resetData('eligibility')"
                      ><img src="@/assets/icons/initialization.svg" alt="" />
                      초기화</span
                    >
                    <p>
                      <span>{{
                        eligibility !== "" ? eligibility.length : 0
                      }}</span>
                      /500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-80">
              <div class="container talent-career-cont">
                <div class="form-group mb-0">
                  <label>경력 <span>[필수]</span></label>
                  <div class="radio-wrapper col" v-show="hidecarrers">
                    <label class="radio-input"
                      >경력무관
                      <input
                        type="radio"
                        value="any"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <label class="radio-input"
                      >신입
                      <input
                        type="radio"
                        value="newcomer"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <!-- <p>elementary</p> -->
                    <label class="radio-input"
                      >경력(초급)
                      <input
                        type="radio"
                        value="elementary"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <!-- <p>intermidate</p> -->
                    <label class="radio-input"
                      >경력(중급)
                      <input
                        type="radio"
                        value="intermediate"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <!-- <p>advanced</p> -->
                    <label class="radio-input"
                      >경력(고급)
                      <input
                        type="radio"
                        value="advanced"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <!-- <p>advanced-end</p> -->
                    <label class="radio-input"
                      >경력(직접 입력)
                      <input
                        type="radio"
                        value="experience"
                        name="carrer"
                        v-model="carrer"
                        @change="showCarrierField()"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="form-group mb-0 mt-16" v-show="carrerField">
                  <div class="cm-bck">
                    <div class="form-group-wrapper" v-show="hidecarrers">
                      <div class="form-group mb-0">
                        <input
                          :type="inputType()"
                          placeholder=""
                          class="form-control"
                          maxlength="2"
                          v-model.trim="min_exper"
                          onkeypress="return /[0-9]/i.test(event.key)"
                        />
                        <em>년 이상</em>
                      </div>
                      <span>~</span>
                      <div class="form-group mb-0">
                        <input
                          :type="inputType()"
                          placeholder=""
                          class="form-control"
                          maxlength="2"
                          v-model.trim="max_exper"
                          onkeypress="return /[0-9]/i.test(event.key)"
                        />
                        <em>년 이하</em>
                      </div>
                    </div>
                    <small class="error-msgsign">{{
                      error.max_exper_min_exper
                    }}</small>

                    <div class="check-list squre mbt-0 mt-16">
                      <label class="check-input mbt-0 wght"
                        >경력 연수 무관
                        <input
                          type="checkbox"
                          v-model="regardlessAny"
                          @change="
                            regardlessAny == true
                              ? (hidecarrers = false)
                              : (hidecarrers = true)
                          "
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <p class="mt-8 mid-age-note">
                      (경력인재를 경력 연수에 상관 없이 뽑고 싶을 때 선택하세요)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btm-button-group fixed-btn-otr">
          <button type="button" class="btn btn-primary lg" @click="talent()">
            다음으로
          </button>
        </div>
      </div>
    </div>
    <SelectPreferentialConditions
      :includeCondition="isShow"
      @conditionData="setConditions($event)"
      ref="childprefcondition"
      @setfalse="
        $emit('hidehead', true), (isShow = false);
        exceptCondition = true;
      "
    />
    <OccupationSetting
      @setfalse="hideoccupation($event)"
      v-show="hideOccupation"
      ref="childOccupation"
    />
    <legalMatterModal
      :isModal="isShowModal"
      @closeModal="(isShowModal = false), (anygender = true), (gender = '')"
      @deleteConfirm="isShowModal = false"
    />
    <!-- <errorModal
      :isModal="showErrorModal"
      @closeModal="showErrorModal=false"
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
  </div>
</template>
<script>
import SelectPreferentialConditions from "@/views/Recruiter/NoticeRegistration/SelectPreferentialConditions.vue";
import talentinfoValidation from "@/Validations/noticeRegistratin/talentinfo.js";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import selectoption from "@/components/selectOption.vue";
import legalMatterModal from "@/components/Modals/legalMatterModal.vue";
import { inject, watch } from "@vue/runtime-core";
// import errorModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
export default {
  name: "TalentInformation",
  components: {
    SelectPreferentialConditions,
    OccupationSetting,
    legalMatterModal,
    selectoption,
    // errorModal
  },
  data() {
    return {
      error: {},
      // showErrorModal: false,
      options: {
        debug: "info",
        modules: {
          toolbar: ["bold", "italic", "underline"],
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "bubble",
      },
      isShowModal: false,
      store: inject("occupationStore"),
      commonstore: inject("commonStore"),
      checkAgebetw: false,
      isShow: false,
      carrer: "any",
      hideOccupation: false,
      exceptCondition: true,
      talentInfo1: true,
      talentInfo2: false,
      gender: "",
      anygender: true,
      age_between: true,
      middle_age: false,
      middleAgeArray: [
        45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      ],
      educationLevel: "no_academic_background",
      select: { text: "대학(4년제)", value: "university_4_years" },
      educationOptions: [
        { text: "초등학교", value: "elementary_school" },
        { text: "중학교", value: "middle_school" },
        { text: "고등학교", value: "high_school" },
        { text: "대학(2,3년제)", value: "university_2_or_3_years" },
        { text: "대학(4년제)", value: "university_4_years" },
        { text: "대학원", value: "graduate_school" },
      ],
      showEdcnLevel: true,
      noOfPeople_visible: true,
      noOfPeople: "",
      checknoPeople: false,
      responsible: "",
      eligibility: "",
      prefentialConditions: [],
      carrerField: false,
      min_exper: null,
      max_exper: null,
      regardlessAny: false,
      hidecarrers: true,
      startAge: "",
      endAge: "",
      education: "",
      areaRecruitment: "",
    };
  },
  methods: {
    inputType() {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    },
    educationset(payload) {
      this.select = payload;
    },
    onsubmitModal() {
      this.isShowModal = true;
      this.anygender = false;
    },

    resetData(type) {
      if (type === "responsible") {
        this.responsible = "<p></p>";
        setTimeout(() => {
          this.responsible = "";
        }, 100);
      } else {
        this.eligibility = "<p></p>";
        setTimeout(() => {
          this.eligibility = "";
        }, 100);
      }
    },

    checkAgeOrder() {
      if (this.startAge !== "" && this.endAge !== "") {
        if (Number(this.startAge) > Number(this.endAge)) {
          this.error.ageError = "나이를 확인해 주세요.";
          this.error.startAge = "";
          this.error.endAge = "";
          this.middle_age = false;
        } else {
          this.error.ageError = "";
          for (let index = 0; index < this.middleAgeArray.length; index++) {
            if (
              this.inRange(
                this.middleAgeArray[index],
                this.startAge,
                this.endAge
              )
            ) {
              this.middle_age = true;
              this.error.ageError = "";
              break;
            } else {
              this.middle_age = false;
              this.error.ageError = "";
            }
          }
        }
      } else {
        this.middle_age = false;
        this.error.ageError = "";
      }
    },
    methodToRunOnSelect(payload) {
      this.object = payload;
      console.log(payload);
    },
    seteditData() {
      const edata = this.commonstore.state.edata;
      if (
        this.$route.name == "NoticeRegistrationEdit" ||
        this.$route.query.successful == "true" ||
        this.$route.query.successful == "false"
      ) {
        this.$refs.childprefcondition.seteditData();
        this.gender = edata.gender;
        this.anygender = edata.gender == "any" ? true : false;
        this.checkAgebetw = edata.age == "any" ? true : false;
        this.age_between = edata.age == "any" ? false : true;
        this.middle_age = edata.mid_age_value == "45" ? true : false;
        this.startAge = edata.start_age;
        this.endAge = edata.end_age;
        this.showEdcnLevel =
          edata.education != "no_academic_background" ? true : false;
        this.select =
          edata.education != "no_academic_background"
            ? this.educationOptions.filter(
                (entry) => entry.value === `${edata.education}`
              )[0]
            : { text: "대학(4년제)", value: "university_4_years" };
        this.areaRecruitment = edata.areas_of_recruitment;
        this.noOfPeople = edata.num_of_recruitment;
        this.checknoPeople =
          edata.is_num_of_recruitment_undecided == "0" ? false : true;
        this.noOfPeople_visible =
          edata.is_num_of_recruitment_undecided == "0" ? true : false;
        this.responsible = edata.responsibilities;
        this.eligibility = edata.eligibilities;
        this.carrer = edata.career;
        console.log(this.carrer);
        this.carrerField = edata.career == "experience" ? true : false;
        this.min_exper = edata.min_experience;
        this.max_exper = edata.max_experience;
        this.regardlessAny = edata.any_experience === 1 ? true : false;
        this.hidecarrers = this.regardlessAny === true ? false : true;
        if (
          this.$route.query.successful == "true" ||
          this.$route.query.successful == "false"
        ) {
          // this.store.state.totalFilters = edata.occupations;
          console.log("I am back...filter", JSON.stringify(edata.occupations));
          // this.store.state.totalFilters = edata.occupations;
          // setTimeout(() => {
          //   this.store.methods.submitFilter();
          // }, 100);
        } else {
          console.log(
            "I am backedit...filter",
            JSON.stringify(edata.occupations)
          );
          this.store.state.totalFilters = edata.occupations;
          setTimeout(() => {
            this.store.methods.submitFilter();
          }, 100);
        }
        // this.store.state.totalFilters = edata.occupations;
        this.$refs.eduDropdown.updateOption(this.select);
        console.log(this.select);
      }
    },
    checkgender() {
      if (this.gender != "") {
        this.gender = "any";
      }
    },
    dropdownClicked() {
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    },
    showCarrierField() {
      if (this.carrer == "experience") {
        this.carrerField = true;
        setTimeout(() => {
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          );
        }, 100);
      } else {
        this.carrerField = false;
        this.min_exper = null;
        this.max_exper = null;
      }
    },
    stepchange() {
      if (this.checkAgebetw === false) {
        if (this.startAge === "") {
          this.error.startAge = "필수 입력란 입니다.";
          this.commonstore.methods.displayRequiredToast();
        } else {
          this.error.startAge = "";
        }
        if (this.endAge === "") {
          this.error.endAge = "필수 입력란 입니다.";
          this.commonstore.methods.displayRequiredToast();
        } else {
          this.error.endAge = "";
        }
        if (
          this.error.ageError !== "" &&
          this.startAge > this.endAge &&
          this.middle_age === false &&
          this.startAge !== "" &&
          this.endAge !== ""
        ) {
          this.error.ageError = "나이를 확인해 주세요.";
          this.error.startAge = "";
          this.error.endAge = "";
        } else {
          this.error.ageError = "";
        }
        if (
          this.startAge !== "" &&
          this.endAge !== "" &&
          this.error.ageError === ""
        ) {
          (this.talentInfo1 = false),
            (this.talentInfo2 = true),
            localStorage.setItem("jobstep", "step1");
          this.error = {};
        }
      } else {
        (this.talentInfo1 = false),
          (this.talentInfo2 = true),
          localStorage.setItem("jobstep", "step1");
        this.error = {};
      }
    },
    talent() {
      console.log(this.min_exper, this.max_exper);
      this.$refs.childprefcondition.sendCondition();
      this.$refs.childOccupation.setData();
      console.log(this.store.state.totalFilterState.length);
      let vcheckData = {
        jobSelect:
          this.$route.name == "NoticeRegistrationEdit"
            ? this.store.state.totalFilters.length == 0
              ? ""
              : "something"
            : this.store.state.totalFilterState.length == 0
            ? ""
            : "something",
        jobRequirement: this.areaRecruitment,
        responsibility: this.responsible,
        qualification: this.eligibility,
        min_exper: this.min_exper == "" ? null : this.min_exper,
        max_exper: this.max_exper == "" ? null : this.max_exper,
        carrer: this.carrer,
        regardlessAny: this.regardlessAny,
      };
      const { isInvalid, error } = talentinfoValidation(vcheckData);
      if (isInvalid) {
        this.error = error;
        this.commonstore.methods.displayRequiredToast();
        // this.showErrorModal=true;
        console.log(error);
      } else {
        this.error = {};
        localStorage.setItem("jobstep", "step2-1");
        window.scrollTo(0, 0);
        this.$emit("getTalentData", {
          gender: this.anygender == true ? "any" : this.gender,
          startage: this.checkAgebetw == true ? "" : this.startAge,
          age: this.checkAgebetw == true ? "any" : "manual",
          endage: this.checkAgebetw == true ? "" : this.endAge,
          educationL:
            this.educationLevel == "no_academic_background"
              ? "no_academic_background"
              : this.select.value,
          ageMiddle: this.middle_age == true ? "45" : null,
          occupation:
            this.$route.name == "NoticeRegistrationEdit"
              ? this.store.state.totalFilters
              : this.store.state.totalFilterState,
          areaOfreq: this.areaRecruitment,
          // noOfpeople: String(this.noOfPeople),
          noOfpeople: this.noOfPeople,
          noOfpeopleUndecided: this.checknoPeople,
          condition: this.prefentialConditions,
          responsibility: this.responsible,
          eligibilityy: this.eligibility,
          recruiterCarrer: this.carrer,
          minExperience:
            this.regardlessAny === true ? null : String(this.min_exper),
          maxExperience:
            this.regardlessAny === true ? null : String(this.max_exper),
          any_experience: this.regardlessAny === true ? 1 : 0,
        });
      }
    },
    hideoccupation(data) {
      console.log("occupation result", data);
      this.hideOccupation = data;
      this.exceptCondition = true;
      console.log("occupation-Array", this.store.state.totalFilterState);
      this.$emit("hidehead", true);
      // this.error.jobSelect = "";
      this.store.state.totalFilterState.length !== 0
        ? (this.error.jobSelect = "")
        : (this.error.jobSelect = "직무를 선택해 주세요");
      // : (this.error.jobSelect = "버튼을 클릭하여 작업을 선택하십시오.");
    },
    setConditions(data) {
      console.log(data);
      this.isShow = false;
      this.exceptCondition = true;
      this.prefentialConditions = data;
      this.$emit("hidehead", true);
    },
    scrollTop() {
      this.isShow = true;
      this.exceptCondition = false;
      window.scrollTo(0, 0);
      this.$refs.childprefcondition.emptycheck();
      this.$emit("hidehead", false);
    },
    scrollTopJob() {
      this.exceptCondition = false;
      this.hideOccupation = true;
      window.scrollTo(0, 0);
      this.$emit("hidehead", false);
    },
    checkeducation() {
      if (this.educationLevel == "no_academic_background") {
        this.showEdcnLevel = false;
        this.education = "no_academic_background";
      } else {
        setTimeout(() => {
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          );
        }, 100);

        this.showEdcnLevel = true;
        this.education = this.select;
      }
    },
    inRange(x, min, max) {
      return (x - min) * (x - max) <= 0;
    },
  },
  mounted() {
    if (this.$route.name == "NoticeRegistration") {
      this.showEdcnLevel = false;
      this.store.methods.refreshAllData();
    } else {
      this.showEdcnLevel = true;
    }
  },
  created() {},
  setup() {
    const store = inject("occupationStore");

    const clearOccupation = (item, i, event) => {
      store.methods.removeFilter(item, i, event);
      setTimeout(() => {
        store.methods.submitFilter();
      }, 100);
    };
    // watch(
    //   () => store.state.totalFilters,
    //   (val) => {
    //     store.state.filtersVisible = [];
    //     console.log(val, "changed");
    //     val.forEach((ele, e) => {
    //       store.state.filtersVisible.push(...ele.name);
    //     });
    //     console.log(store.state.filtersVisible, "check value after add");
    //     // setFiltervalue
    //     store.state.filtervalue = store.state.filtersVisible;
    //     console.log(store.state.filtervalue);
    //   },
    //   { deep: true }
    // );

    return {
      store,
      clearOccupation,
    };
  },
};
</script>
<style>
.ql-toolbar.ql-container.ql-bubble {
  height: 250px;
  padding: 16px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
}
</style>
