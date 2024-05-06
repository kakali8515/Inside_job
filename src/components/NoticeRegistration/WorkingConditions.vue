<template>
  <div class="form-wrapper pb-0 work-condition-wrap">
    <div class="back-wh">
      <div class="cm-top-space pb-32">
        <div class="container">
          <div class="sub-otr no-border">
            <h3 class="sub-heading lg">근무조건 입력</h3>
            <p>인재가 근무하게 될 근무조건을 입력해 주세요</p>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group">
              <label>근무 형태 <span>[필수]</span></label>
              <selectoption
                class="my-dropdown-toggle"
                :options="workingType"
                :selected="selectedWorkingType"
                v-on:updateOption="workTypeset"
                :placeholder="defaultworktype"
                :closeOnOutsideClick="boolean"
                ref="workTypeDropdown"
              >
              </selectoption>
              <!-- <select class="form-control" v-model="selectedWorkingType">
                <option
                  selected
                  v-for="option in workingType"
                  v-bind:value="option.value"
                  :key="option.value"
                >
                  {{ option.name }}
                </option>
              </select> -->
              <small class="error-msgsign">{{ error.wType }}</small>
            </div>
            <div class="form-group mb-0">
              <label>수습기간 <span class="gr">[선택]</span></label>
              <div class="group pos">
                <input
                  :type="inputType()"
                  maxlength="2"
                  onkeypress="return /[0-9]/i.test(event.key)"
                  placeholder="입력"
                  class="form-control"
                  v-model.trim="probabation"
                />
                <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
                <span class="g-txt">개월</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <label>근무기간 <span>[필수]</span></label>
              <selectoption
                class="my-dropdown-toggle"
                :options="workingPeriod"
                :selected="selectedWorkingPeriod"
                v-on:updateOption="workPeriodset"
                :placeholder="defaultworkPeriodtype"
                :closeOnOutsideClick="boolean"
                ref="workPeriodDropdown"
              >
              </selectoption>
              <!-- <select class="form-control" v-model="selectedWorkingPeriod">
                <option
                  selected
                  v-for="option in workingPeriod"
                  v-bind:value="option.value"
                  :key="option.value"
                >
                  {{ option.name }}
                </option>
              </select> -->
              <small class="error-msgsign">{{ error.wPeriod }}</small>
              <div class="check-list squre mt-16 mbt-0">
                <label class="check-input mbt-0 wght"
                  >협의가능
                  <input type="checkbox" v-model="nego_workingPeriod" />
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
              <label>근무요일 <span>[필수]</span></label>
            </div>
            <div class="tab-outr mt-16 bord">
              <ul class="check-list box-check no-pad-li col-6 mt-16">
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="workdays"
                      value="notNegociate"
                      v-model="dayselect"
                      @change="checkNego()"
                    />
                    <span class="text">요일지정</span>
                  </label>
                </li>
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="workdays"
                      value="Negociate"
                      v-model="dayselect"
                      @change="checkNego()"
                    />
                    <span class="text">요일협의</span>
                  </label>
                </li>
              </ul>
              <div v-show="hidedays">
                <ul class="check-list box-check wp-check mt-16">
                  <li v-for="mainCat in workingDays" :key="mainCat.val">
                    <label class="check-input">
                      <input
                        type="checkbox"
                        :value="mainCat.val"
                        :id="mainCat.val"
                        v-model="checkedDays"
                        @click="check($event)"
                        :disabled="
                          checkedDays.length >= max &&
                          checkedDays.indexOf(index) == -1
                        "
                      />
                      <span class="text">{{ mainCat.dayName }}</span>
                    </label>
                  </li>
                </ul>
                <p class="c-font mt-16">요일은 최대 6일까지 선택 가능합니다.</p>
              </div>
              <!-- <TabWrapper>
                <Tabs title="요일지정">
                  <ul class="check-list box-check wp-check mt-16">
                    <li v-for="mainCat in workingDays" :key="mainCat.val">
                      <label class="check-input">
                        <input  type="checkbox"
                        :value="mainCat.val"
                        :id="mainCat.val"
                        v-model="checkedDays"
                        @click="check($event)" />
                        <span class="text">{{mainCat.dayName}}</span>
                      </label>
                    </li>
                  </ul>
                  <p class="c-font mt-16">
                    요일은 최대 6일까지 선택 가능합니다.
                  </p>
                </Tabs>
                <Tabs title="요일협의" @click="setNego()">
                </Tabs>
              </TabWrapper> -->
            </div>
            <small class="error-msgsign">{{ error.wdays }}</small>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <!-- <VueTimepicker
              :format="yourFormat"
              v-model="yourData"
            ></VueTimepicker> -->
            <div class="form-group mb-0">
              <label>근무시간 <span>[필수]</span></label>
            </div>
            <div class="form-group-wrapper bord">
              <div class="form-group mb-0">
                <input
                  type="time"
                  placeholder="ex) 09:00"
                  class="form-control"
                  v-model="workhrFrom"
                />
                <em>부터</em>
              </div>
              <span>~</span>
              <div class="form-group mb-0">
                <input
                  type="time"
                  placeholder="ex) 18:00"
                  class="form-control"
                  v-model="workhrTo"
                />
                <em>까지</em>
              </div>
            </div>
            <small class="error-msgsign">{{ error.wrkHrfrm }}</small>
            <small class="error-msgsign">{{ error.wrkHrto }}</small>
            <div class="form-group mb-0 mt-16">
              <label>휴게시간 <span class="gr">[선택]</span></label>
            </div>
            <div class="form-group-wrapper bord" v-show="workHr">
              <div class="form-group mb-0">
                <input
                  type="time"
                  placeholder="ex) 12:00"
                  class="form-control"
                  v-model="BreakhrFrom"
                />
                <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
                <em>부터</em>
              </div>
              <span>~</span>
              <div class="form-group mb-0">
                <input
                  type="time"
                  placeholder="ex) 13:00"
                  class="form-control"
                  v-model="BreakhrTo"
                />
                <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
                <em>까지</em>
              </div>
            </div>
            <div class="form-group mb-0 mt-16">
              <div class="check-list squre mt-16 mbt-0">
                <label class="check-input mbt-0 wght"
                  >휴게시간 없음
                  <input
                    type="checkbox"
                    @change="
                      breakControl(),
                        nobreak == true ? (workHr = false) : (workHr = true)
                    "
                    v-model="nobreak"
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
              <label>소정근무시간 <span>[필수]</span></label>
            </div>
            <div class="form-group-wrapper bord full-gr">
              <div class="form-group mb-0 working-hrs">
                <em class="in-left">주</em>
                <input
                  type="number"
                  placeholder="40"
                  class="form-control"
                  v-model.trim="prescribedWorkHours"
                  @keypress="onlyNumber"
                />
                <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
                <em>시간</em>
              </div>
            </div>
            <small class="error-msgsign">{{ error.pWorkHr }}</small>
            <div class="cm-bck mt-16">
              <p class="fn-12 scrollset">
                <span v-html="generalNotice"></span>
                <!-- {{ generalNotice }} -->
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-80">
          <div class="container">
            <div class="form-group mb-0">
              <label class="working-hrs-label">급여 <span>[필수]</span></label>
            </div>
            <div class="form-group-wrapper salary-form-group">
              <div class="form-group mb-0 fr-left">
                <selectoption
                  class="my-dropdown-toggle salary-drop"
                  :options="payTypes"
                  :selected="payType"
                  v-on:updateOption="payTypeset"
                  :placeholder="'일급'"
                  :closeOnOutsideClick="boolean"
                  ref="payTypeDropdown"
                  @click="openDd()"
                >
                </selectoption>
                <!-- <select class="form-control" v-model="payType">
                  <option
                    v-for="option in payTypes"
                    v-bind:value="option.value"
                    :key="option.value"
                  >
                    {{ option.name }}
                  </option>
                </select> -->
              </div>
              <div class="form-group mb-0 fr-right">
                <input
                  type="number"
                  placeholder="예상 급여"
                  class="form-control"
                  v-model.trim="Paysalary"
                  @keypress="onlyNumber"
                />
                <!-- onkeypress="return /[0-9]/i.test(event.key)" -->
                <em>원</em>
              </div>
            </div>
            <small class="error-msgsign">{{ error.salary }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="btm-button-group fixed-btn-otr">
      <button type="button" class="btn btn-primary lg" @click="workCondition()">
        다음으로
      </button>
    </div>
    <div class="required-fields-icon" v-if="commonstore.state.requiredToastMsgShow">
        <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
    </div>
    <!-- <errorModal
      :isModal="showErrorModal"
      @closeModal="showErrorModal=false"
    /> -->
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import workinginfoValidation from "@/Validations/noticeRegistratin/workinginfo.js";
import Tabs from "@/components/Tabs.vue";
import { inject } from "@vue/runtime-core";
import dropdown from "vue-dropdowns";
import selectoption from "@/components/selectOption.vue";
import VueTimepicker from "vue-time-picker";
// import errorModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import {TermsAndPrivacy} from "@/service/API/TermsAndPrivacy.js";
export default {
  name: "WorkingConditions",
  components: {
    Tabs,
    TabWrapper,
    dropdown,
    selectoption,
    VueTimepicker,
    // errorModal
  },
  data() {
    return {
      error: {},
      generalNotice: "",
      // showErrorModal: false,
      commonstore: inject("commonStore"),
      selectedWorkingType: "", //contract_worker
      selectedWorkingPeriod: "", //1_week_to_1_month
      workhrFrom: "", //09:00
      workhrTo: "", //18:00
      BreakhrFrom: "", //12:00
      BreakhrTo: "", //13:00
      workHr: true,
      nobreak: false,
      prescribedWorkHours: "", //40
      payType: { text: "시급", value: "hourly_wage" },
      Paysalary: "", //10000000
      //hourly_wage/daily_wage/salary
      payTypes: [
        { text: "시급", value: "hourly_wage" },
        { text: "일급", value: "daily_wage" },
        { text: "월급", value: "salary" },
      ],
      workingType: [
        // { text: "선택", value: "" },
        { text: "아르바이트", value: "part_time_job" },
        { text: "정규직", value: "full_time" },
        { text: "계약직", value: "contract_worker" },
        { text: "파견직", value: "dispatch" },
        { text: "인턴직", value: "internship" },
        { text: "프리랜서", value: "freelancer" },
        { text: "기타", value: "etc" },
      ],
      defaultworktype: "선택",
      defaultworkPeriodtype: "선택",
      //   1_day/less_than_1_week/1_week_to_1_month/1_month_to_3_months/3_months_to_6_months/6_months_to_1_year/more_than_1_year
      workingPeriod: [
        // { text: "선택", value: "" },
        { text: "하루(1일)", value: "1_day" },
        { text: "1주일이하", value: "less_than_1_week" },
        { text: "1주일~1개월", value: "1_week_to_1_month" },
        { text: "1개월~3개월", value: "1_month_to_3_months" },
        { text: "3개월~6개월", value: "3_months_to_6_months" },
        { text: "6개월~1년", value: "6_months_to_1_year" },
        { text: "1년 이상", value: "more_than_1_year" },
      ],
      probabation: "",
      nego_workingPeriod: false, //0/1
      checkedDays: [],
      max: 6,
      workingDays: [
        {
          dayName: "월",
          val: 1,
        },
        {
          dayName: "화",
          val: 2,
        },
        {
          dayName: "수",
          val: 3,
        },
        {
          dayName: "목",
          val: 4,
        },
        {
          dayName: "금",
          val: 5,
        },
        {
          dayName: "토",
          val: 6,
        },
        {
          dayName: "일",
          val: 7,
        },
      ],
      dayselect: "notNegociate",
      negoworkDays: 0,
      hidedays: true,
      yourData: {
        hh: "03",
        mm: "05",
        ss: "00",
        a: "am",
      },
      yourFormat: "hh:mm:ss a",
      GeneralDesc:""
    };
  },
  mounted() {
    this.termsDetail();
    },
  methods: {
    openDd() {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    },
    inputType() {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    },
    async termsDetail() {
      let res = await TermsAndPrivacy.detail();
      console.log(res);
      if (res.status === 200) {
        this.generalNotice=res.data.general;
        // console.log(res.data.general);
      }
    },
    workTypeset(payload) {
      this.selectedWorkingType = payload;
    },
    workPeriodset(payload) {
      this.selectedWorkingPeriod = payload;
    },
    breakControl() {
      if (this.nobreak) {
        this.BreakhrFrom = "";
        this.BreakhrTo = "";
      }
    },
    payTypeset(payload) {
      this.payType = payload;
    },
    checkNego() {
      if (this.dayselect == "notNegociate") {
        this.negoworkDays = 0;
        this.hidedays = true;
      } else {
        this.negoworkDays = 1;
        this.hidedays = false;
        this.checkedDays = [];
      }
    },
    seteditData() {
      const edata = this.commonstore.state.edata;

      if (this.$route.name == "NoticeRegistrationEdit" ||this.$route.query.successful == "true" ||
        this.$route.query.successful == "false") {
        if(this.$route.query.successful == "true" || this.$route.query.successful == "false"){
          this.selectedWorkingType = this.workingType.filter(
          (entry) => entry.value === `${edata.working_mode}`
        )[0];
        }else{
          this.selectedWorkingType = this.workingType.filter(
          (entry) => entry.value === `${edata.work_type}`
        )[0];
        }
        console.log(this.selectedWorkingType);
        this.defaultworktype = this.selectedWorkingType.name;
        this.probabation = edata.probation;
        this.selectedWorkingPeriod = this.workingPeriod.filter(
          (entry) => entry.value === `${edata.working_period}`
        )[0];
        this.nego_workingPeriod =
          edata.negotiable_working_period == 0 ? false : true;
        this.workhrFrom = edata.working_hour_from;
        this.workhrTo = edata.working_hour_end;
        this.BreakhrFrom = edata.break_time_from;
        this.dayselect = edata.working_days.length === 0 ? 'Negociate' : 'notNegociate';
        if(this.dayselect === 'notNegociate') {
          this.checkedDays = edata.working_days;
          this.hidedays = true;
        }
        else {
          this.hidedays = false;
        }
        this.BreakhrTo = edata.break_time_end;
        this.payType = this.payTypes.filter(
          (entry) => entry.value === `${edata.pay_type}`
        )[0];
        this.Paysalary = edata.salary;
        this.prescribedWorkHours = edata.prescribed_working_hours;
        console.log(this.defaultworktype);
        if(edata.break_time_from==null || edata.break_time_from== "" || edata.break_time_end== "" || edata.break_time_end==null){
          this.nobreak = true;
          this.workHr=false;
        }
        this.$refs.workTypeDropdown.updateOption(this.selectedWorkingType);
        this.$refs.workPeriodDropdown.updateOption(this.selectedWorkingPeriod);
        this.$refs.payTypeDropdown.updateOption(this.payType);
      }
    },
    workCondition() {
      console.log(this.negoworkDays, this.checkedDays);
      let vcheckData = {
        wType: this.selectedWorkingType.value == undefined ? "" : "something",
        wPeriod:
          this.selectedWorkingPeriod.value == undefined ? "" : "something",
        wdays:
          this.checkedDays.length == 0 && this.negoworkDays == 0 && this.dayselect === 'notNegociate'
            ? ""
            : "something",
        wrkHrfrm: this.workhrFrom == null ? "" : this.workhrFrom,
        wrkHrto: this.workhrTo == null ? "" : this.workhrTo,
        salary: String(this.Paysalary),
        pWorkHr: String(this.prescribedWorkHours),
      };
      const { isInvalid, error } = workinginfoValidation(vcheckData);
      if (isInvalid) {
        this.error = error;
        // this.showErrorModal = true;
        this.commonstore.methods.displayRequiredToast()
        console.log(error);
      } else {
        this.error = {}
        window.scrollTo(0, 0);
        localStorage.setItem("jobstep", "step3");
        this.$emit("getWorkConditions", {
          worktyp: this.selectedWorkingType.value,
          probabationperiod: this.selectedWorkingPeriod.value,
          probabaTion: String(this.probabation),
          workperiod: this.selectedWorkingPeriod.value,
          Negoworkperiod: this.nego_workingPeriod,
          working_days: this.checkedDays,
          working_hrFrom: this.workhrFrom,
          working_hrTo: this.workhrTo,
          Break_hrFrom: this.BreakhrFrom,
          Break_hrTo: this.BreakhrTo,
          payTp: this.payType.value,
          salary: String(this.Paysalary),
          workhour: String(this.prescribedWorkHours),
        });
      }
    },
    check: function (e) {
      if (e.target.checked) {
        console.log(e.target.value);
      }
      this.negoworkDays = 0;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
  },
};
</script>
