<template>
  <div v-show="includeCondition">
    <div class="back-wh pb-32 curve-It">
      <!-- <InnerHeader headerTitle="우대조건 선택" /> -->
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a href="javascript:void(0);" class="cross-arrow"
              ><img
                src="@/assets/icons/cross-icon2.svg"
                alt=""
                @click="$emit('setfalse', true)" /></a
            >우대조건 선택
          </h4>
        </div>
      </div>
      <div class="container resume-select-list preferential-list">
        <div class="sub-otr b-color mb-0">
          <h3 class="sub-heading mb-0">우대조건 리스트</h3>
        </div>
        <Accordion>
          <AccordionItem>
            <template v-slot:accordion-trigger>
              <h3>취업보호·장려</h3>
            </template>
            <template v-slot:accordion-content>
              <ul class="acc-check-list">
                <li
                  v-for="item in employment_protection_and_promotion"
                  :key="item.id"
                >
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="employment_Data.conditions"
                        @input="employmentcheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </li>
              </ul>
            </template>
          </AccordionItem>

          <AccordionItem>
            <template v-slot:accordion-trigger>
              <h3>자격·능력</h3>
            </template>
            <!-- <template v-slot:accordion-content>
              <div class="add-list">
                <div
                  class="cm-bk"
                  v-for="item in qualifications_and_abilities"
                  :key="item.id"
                >
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="qualification_Data.conditions"
                        @input="qualificationcheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </template> -->
            <template v-slot:accordion-content>
              <ul class="acc-check-list">
                <li v-for="item in qualifications_and_abilities" :key="item.id">
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="qualification_Data.conditions"
                        @input="qualificationcheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </li>
              </ul>
            </template>
          </AccordionItem>

          <AccordionItem>
            <template v-slot:accordion-trigger>
              <h3>활동·경험</h3>
            </template>
            <!-- <template v-slot:accordion-content>
              <div class="add-list">
                <div
                  class="cm-bk"
                  v-for="item in activities_or_experiences"
                  :key="item.id"
                >
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="activity_Data.conditions"
                        @input="activitycheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </template> -->
            <template v-slot:accordion-content>
              <ul class="acc-check-list">
                <li v-for="item in activities_or_experiences" :key="item.id">
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="activity_Data.conditions"
                        @input="activitycheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </li>
              </ul>
            </template>
          </AccordionItem>

          <AccordionItem>
            <template v-slot:accordion-trigger>
              <h3>근무조건</h3>
            </template>
            <!-- <template v-slot:accordion-content>
              <div class="add-list">
                <div
                  class="cm-bk"
                  v-for="item in activities_or_experiences"
                  :key="item.id"
                >
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="working_condition_Data.conditions"
                        @input="workingcheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </template> -->
            <template v-slot:accordion-content>
              <ul class="acc-check-list">
                <li v-for="item in working_conditions" :key="item.id">
                  <div class="check-list squre mbt-0">
                    <label class="check-input mbt-0 wght"
                      >{{ item.message }}
                      <input
                        type="checkbox"
                        :value="item.message"
                        :id="item.message"
                        v-model="working_condition_Data.conditions"
                        @input="workingcheck($event)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </li>
              </ul>
            </template>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    <div class="bck-btm">
      <div class="cm-top-space pb-32">
        <div class="container">
          <div class="sub-otr mb-16 d-flex">
            <h3 class="sub-heading fnt">선택한 우대조건</h3>
            <span class="number" @click="rejectModal = true">+ 직접 추가</span>
          </div>
          <div class="add-list">
            <div class="cm-bk" v-show="employeementdiv">
              <h4 class="pro-hdr">취업보호·장려</h4>
              <ul class="selected-list m-0" @click="emptycheck()">
                <li v-for="item in employment_Data.conditions" :key="item">
                  {{ item }}
                  <img
                    src="@/assets/icons/cross-lg.svg"
                    alt=""
                    class="cross"
                    @click="
                      removeItemOnce(
                        employment_Data.conditions,
                        employment_Data.conditions.indexOf(item)
                      )
                    "
                  />
                </li>
              </ul>
            </div>
            <div class="cm-bk" v-show="qualificationdiv">
              <h4 class="pro-hdr">자격·능력</h4>
              <ul class="selected-list m-0">
                <li
                  v-for="item in qualification_Data.conditions"
                  :key="item"
                  @click="
                    removeItemOnce(
                      qualification_Data.conditions,
                      qualification_Data.conditions.indexOf(item)
                    )
                  "
                >
                  {{ item }}
                  <img src="@/assets/icons/cross-lg.svg" alt="" class="cross" />
                </li>
              </ul>
            </div>
            <div class="cm-bk" v-show="activitydiv">
              <h4 class="pro-hdr">활동·경험</h4>
              <ul class="selected-list m-0">
                <li v-for="item in activity_Data.conditions" :key="item">
                  {{ item }}
                  <img
                    src="@/assets/icons/cross-lg.svg"
                    alt=""
                    class="cross"
                    @click="
                      removeItemOnce(
                        activity_Data.conditions,
                        activity_Data.conditions.indexOf(item)
                      )
                    "
                  />
                </li>
              </ul>
            </div>
            <div class="cm-bk" v-show="workingdiv">
              <h4 class="pro-hdr">근무조건</h4>
              <ul class="selected-list m-0">
                <li
                  v-for="item in working_condition_Data.conditions"
                  :key="item"
                >
                  {{ item }}
                  <img
                    src="@/assets/icons/cross-lg.svg"
                    alt=""
                    class="cross"
                    @click="
                      removeItemOnce(
                        working_condition_Data.conditions,
                        working_condition_Data.conditions.indexOf(item)
                      )
                    "
                  />
                </li>
              </ul>
            </div>
            <div class="cm-bk" v-show="directdiv">
              <h4 class="pro-hdr">우대조건 직접 추가</h4>
              <ul class="selected-list m-0">
                <li v-for="item in directly.conditions" :key="item">
                  {{ item }}
                  <img
                    src="@/assets/icons/cross-lg.svg"
                    alt=""
                    class="cross"
                    @click="
                      removeItemOnce(
                        directly.conditions,
                        directly.conditions.indexOf(item)
                      )
                    "
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="ap-btn-otr mt-16">
            <div class="refresh-bx">
              <span
                ><img
                  src="@/assets/icons/refresh-red.svg"
                  alt=""
                  @click="resetAll()"
              /></span>
            </div>
            <button
              type="button"
              class="btn btn-primary lg"
              @click="sendCondition()"
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
    <directentrymodal
      ref="parentdirect"
      :isModal="rejectModal"
      @closeModal="
        () => {
          rejectModal = false;
        }
      "
      @EntryData="setEntryData($event)"
    />
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import directentrymodal from "@/components/Modals/directentrymodal.vue";
import { inject } from "@vue/runtime-core";
export default {
  components: { InnerHeader, Accordion, AccordionItem, directentrymodal },
  name: "SelectPreferentialConditions",
  props: { includeCondition: Boolean },
  data() {
    return {
      commonstore: inject("commonStore"),
      rejectModal: false,
      employment_protection_and_promotion: [
        { id: 1, message: "국가유공자" },
        { id: 2, message: "보훈대상자" },
        { id: 3, message: "장애인우대" },
        { id: 4, message: "외국인우대" },
        { id: 5, message: "병역특례" },
        { id: 6, message: "주부(전업주부)" },
        { id: 7, message: "고령자(55세이상)" },
        { id: 8, message: "취업보호대상자" },
        { id: 9, message: "고용촉진장려금 대상" },
        { id: 10, message: "특성화고/마이스터고" },
      ],
      employeementdiv: false,
      qualificationdiv: false,
      activitydiv: false,
      workingdiv: false,
      directdiv: false,
      employment_Data: {
        type: "employment_protection_and_promotion",
        conditions: [],
      },
      qualifications_and_abilities: [
        { id: 1, message: "학점4.0 이상" },
        { id: 2, message: "통계분석능숙자" },
        { id: 3, message: "컴퓨터활용능력 우수" },
        { id: 4, message: "문서작성 우수자" },
        { id: 5, message: "엑셀 고급능력자" },
        { id: 6, message: "더존/회계 능숙자" },
        { id: 7, message: "CAD/CAM 능숙자" },
        { id: 8, message: "포토샵 능숙자" },
        { id: 9, message: "FLASH 능숙자" },
        { id: 10, message: "MAC/편집 전문가" },
        { id: 11, message: "PPT능력 우수자" },
        { id: 12, message: "영어가능자" },
        { id: 13, message: "영어능통자" },
        { id: 14, message: "일본어 가능자" },
        { id: 15, message: "중국어 가능자" },
        { id: 16, message: "불어 가능자" },
        { id: 17, message: "스페인어 가능자" },
        { id: 18, message: "러시아어 가능자" },
        { id: 19, message: "베트남어 가능자" },
        { id: 20, message: "아랍어 가능자" },
        { id: 21, message: "독일어 가능자" },
      ],
      qualification_Data: {
        type: "qualifications_and_abilities",
        conditions: [],
      },
      activities_or_experiences: [
        { id: 1, message: "공모전 입상자" },
        { id: 2, message: "해당직무 인턴경력" },
        { id: 3, message: "해당직무 알바경험" },
        { id: 4, message: "해당직무 근무경험" },
        { id: 5, message: "해외연수자" },
        { id: 6, message: "사회봉사활동 경험" },
        { id: 7, message: "군전역간부" },
        { id: 8, message: "MBA학위 수여자" },
        { id: 9, message: " 우수사원 수상자" },
        { id: 10, message: "석사학위 수여자" },
        { id: 11, message: "박사학위 수여자" },
      ],
      activity_Data: {
        type: "activities_or_experiences",
        conditions: [],
      },
      working_conditions: [
        { id: 1, message: "인근거주자" },
        { id: 2, message: "운전가능자" },
        { id: 3, message: "차량소지자" },
        { id: 4, message: "기숙사 생활가능자" },
        { id: 5, message: "해외근무 가능자" },
        { id: 6, message: "지방근무 가능자" },
        { id: 7, message: "야간근무 가능자" },
        { id: 8, message: "격일근무 가능자" },
        { id: 9, message: "2교대근무 가능자" },
        { id: 10, message: "3교대근무 가능자" },
        { id: 11, message: "단기근무 가능자" },
        { id: 12, message: "장기근무 가능자" },
      ],
      working_condition_Data: {
        type: "working_conditions",
        conditions: [],
      },
      directly: {
        type: "directly",
        conditions: [],
      },
    };
  },
  methods: {
    seteditData() {
      let edata = this.commonstore.state.edata.preferential_conditions;
      if (
        this.$route.name == "NoticeRegistrationEdit" ||
        this.$route.query.successful == "true" ||
        this.$route.query.successful == "false"
      ) {
        if(this.$route.name === "NoticeRegistration") {
          if (edata.length > 0) {
            edata = edata.map(item => {
            return {
              condiotion_direct_text: item.conditions,
              condition_type: item.type
            };
          });
          }
        }
        if (edata.length > 0) {
          let employment_protection = edata.find(
            ({ condition_type }) =>
              condition_type === "employment_protection_and_promotion"
          );
          this.employment_Data.conditions =
            employment_protection == undefined
              ? []
              : employment_protection.condiotion_direct_text;
          let qualifications_abilities = edata.find(
            ({ condition_type }) =>
              condition_type === "qualifications_and_abilities"
          );
          this.qualification_Data.conditions =
            qualifications_abilities == undefined
              ? []
              : qualifications_abilities.condiotion_direct_text;
          let activityData = edata.find(
            ({ condition_type }) =>
              condition_type === "activities_or_experiences"
          );
          this.activity_Data.conditions =
            activityData == undefined
              ? []
              : activityData.condiotion_direct_text;
          let workingData = edata.find(
            ({ condition_type }) => condition_type === "working_conditions"
          );
          this.working_condition_Data.conditions =
            workingData == undefined ? [] : workingData.condiotion_direct_text;
          let directdata = edata.find(
            ({ condition_type }) => condition_type === "directly"
          );
          this.directly.conditions =
            directdata == undefined ? [] : directdata.condiotion_direct_text;
          this.$refs.parentdirect.seteditData(this.directly.conditions);
        }
      
      }
    },
    resetAll() {
      this.employment_Data.conditions = [];
      this.qualification_Data.conditions = [];
      this.activity_Data.conditions = [];
      this.working_condition_Data.conditions = [];
      this.directly.conditions = [];
    },
    sendCondition() {
      this.$emit("conditionData", [
        this.employment_Data,
        this.qualification_Data,
        this.activity_Data,
        this.working_condition_Data,
        this.directly,
      ]);
    },
    setEntryData(data) {
      data.forEach(element => {
       this.directly.conditions.push(element)
      });
      //this.directly.conditions = data;
      //console.log(data);
      this.rejectModal = false;
      this.emptycheck();
    },
    employmentcheck: function (e) {
      if (e.target.checked) {
        this.employment_Data.conditions.push(e.target.value);
        console.log("Employment-data", this.employment_Data);
        this.emptycheck();
      } else {
        this.emptycheck();
      }
    },
    qualificationcheck: function (e) {
      if (e.target.checked) {
        this.qualification_Data.conditions.push(e.target.value);
        console.log("Qualification-data", this.qualification_Data);
        this.emptycheck();
      } else {
        this.emptycheck();
      }
    },
    activitycheck: function (e) {
      if (e.target.checked) {
        this.activity_Data.conditions.push(e.target.value);
        console.log("Activity-data", this.activity_Data);
        this.emptycheck();
      } else {
        this.emptycheck();
      }
    },
    workingcheck: function (e) {
      if (e.target.checked) {
        this.working_condition_Data.conditions.push(e.target.value);
        console.log("working-conditions-data", this.working_condition_Data);
        this.emptycheck();
      } else {
        this.emptycheck();
      }
    },
    removeItemOnce(arr, value) {
      this.emptycheck();
      //console.log(arr + "     " + value)
      //var index = arr.indexOf(value);
      if (value > -1) {
        arr.splice(value, 1);
      }
     // return arr.splice(index, 1);
    },
    emptycheck() {
      console.log(this.employment_Data.conditions.length);
      if (this.employment_Data.conditions.length > 0) {
        this.employeementdiv = true;
      } else {
        this.employeementdiv = false;
      }
      // activitydiv: false,
      // workingdiv: false,
      if (this.qualification_Data.conditions.length > 0) {
        this.qualificationdiv = true;
      } else {
        this.qualificationdiv = false;
      }
      if (this.activity_Data.conditions.length > 0) {
        this.activitydiv = true;
      } else {
        this.activitydiv = false;
      }
      if (this.working_condition_Data.conditions.length > 0) {
        this.workingdiv = true;
      } else {
        this.workingdiv = false;
      }
      if (this.directly.conditions.length > 0) {
        this.directdiv = true;
      } else {
        this.directdiv = false;
      }
    },
  },
  // mounted(){
  //   setTimeout(() => {
  //     this.emptycheck();
  //   }, 2000);
  // }
};
</script>
