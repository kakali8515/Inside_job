<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="94%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isAddCareer"
  >
    <div :class="`common-sec back-wh ${commonStore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            {{ pageHeading
            }}<a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </h4>
        </div>
      </div>
      <form @submit.prevent="isSubmit">
        <div class="pb-90">
          <div class="container">
            <div class="cm-back form-wrapper add-career-form">
              <div class="form-group">
                <label>회사명</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="회사명"
                  v-model="companyName"
                />
              </div>
              <div class="form-group">
                <label>근무형태</label>
                <select class="form-control" v-model="workType">
                  <option value="">선택</option>
                  <option value="part_time_job">아르바이트</option>
                  <option value="full_time">정규직</option>
                  <option value="contract_worker">계약직</option>
                  <option value="dispatch">파견직</option>
                  <option value="internship">인턴직</option>
                  <option value="freelancer">프리랜서</option>
                  <option value="etc">기타</option>
                </select>
              </div>
              <div class="form-group">
                <label>근무기간</label>
                <div class="business-period-cont">
                  <div class="period-row from-row">
                    <ul class="date-info">
                      <li>
                        <span
                          ><input
                            :type="inputType()"
                            maxlength="4"
                            @keypress="onlyNumber"
                            class="form-control"
                            placeholder="YYYY"
                            v-model="periodFrom.year" /></span
                        >년
                      </li>
                      <li>
                        <span
                          ><input
                            :type="inputType()"
                            maxlength="2"
                            @keypress="onlyNumber"
                            class="form-control"
                            placeholder="MM"
                            v-model="periodFrom.month" /></span
                        >월
                      </li>
                    </ul>
                    <span>부터</span>
                  </div>
                  <div class="period-row until-row">
                    <ul class="date-info">
                      <li>
                        <span
                          ><input
                            :type="inputType()"
                            maxlength="4"
                            @keypress="onlyNumber"
                            class="form-control"
                            placeholder="YYYY"
                            v-model="periodTill.year" /></span
                        >년
                      </li>
                      <li>
                        <span
                          ><input
                            :type="inputType()"
                            maxlength="2"
                            @keypress="onlyNumber"
                            class="form-control"
                            placeholder="MM"
                            v-model="periodTill.month" /></span
                        >월
                      </li>
                    </ul>
                    <span>까지</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>담당업무</label>
                <textarea
                  class="form-control"
                  placeholder="담당업무를 입력해 주세요"
                  :value="responsiblity"
                  @input="(e) => setResponsiblity(e)"
                  ref="responsiblityField"
                ></textarea>
                <div class="count">
                  <span class="count-txt" @click="reInitialize"
                    ><img src="@/assets/icons/initialization.svg" alt="" />
                    초기화</span
                  >
                  <p>
                    <span>{{ responsiblity.length }}</span> /500
                  </p>
                </div>
              </div>
              <div class="fixed-btn-otr">
                <input
                  type="submit"
                  class="btn btn-primary lg"
                  value="등록하기"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </Sheet>
</template>

<script>
import {
  computed,
  inject,
  onBeforeMount,
  reactive,
  ref,
} from "@vue/runtime-core";
import { careerServices } from "@/service/API/career.js";
export default {
  name: "AddCareer",
  emits: ["AddSuccess"],
  props: {
    Pagetype: {
      type: String,
      default: "경력 추가",
    },
    pageID: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const commonStore = inject("commonStore");
    const companyName = ref("");
    const workType = ref("");
    const periodFrom = reactive({
      year: "",
      month: "",
    });
    const periodTill = reactive({
      year: "",
      month: "",
    });
    const responsiblity = ref("");
    const responsiblityField = ref(undefined);

    const pageHeading = computed(() =>
      props.Pagetype === "add" ? "경력 추가" : "경력 수정"
    );

    onBeforeMount(async () => {
      if (props.Pagetype == "edit") {
        let res = await careerServices.careerDetails(props.pageID);
        companyName.value = res.data.company_name;
        workType.value = res.data.work_type;
        periodFrom.year = commonStore.methods.dateFormat(
          res.data.emp_period_from,
          "YYYY"
        );
        periodFrom.month = commonStore.methods.dateFormat(
          res.data.emp_period_from,
          "MM"
        );
        periodTill.year = commonStore.methods.dateFormat(
          res.data.emp_period_until,
          "YYYY"
        );
        periodTill.month = commonStore.methods.dateFormat(
          res.data.emp_period_until,
          "MM"
        );
        responsiblity.value = res.data.responsiblities;
      }
    });

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    const reInitialize = () => {
      responsiblity.value = "";
    };

    const isSubmit = async (e) => {
      e.preventDefault();
      let inputDetails = {
        company_name: companyName.value,
        work_type: workType.value,
        emp_period_from: periodFrom.year + "-" + periodFrom.month,
        emp_period_until: periodTill.year + "-" + periodTill.month,
        responsiblities: responsiblity.value,
      };
      if (props.Pagetype === "add") {
        var res = await careerServices.addCareer(inputDetails);
      } else {
        var res = await careerServices.editCareer(props.pageID, inputDetails);
      }
      console.log(res);
      if (res.status === 200) {
        commonStore.state.isAddCareer = false;
        emit("AddSuccess");
      }
    };

    const setResponsiblity = (event) => {
      responsiblity.value = event.target.value;
      if (
        responsiblityField.value.value.length > 500 &&
        event.inputType != "deleteContentBackward"
      ) {
        responsiblity.value = responsiblityField.value.value.slice(0, 500);
        responsiblityField.value.blur();
        return false;
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
      popClose,
      reInitialize,
      isSubmit,
      onlyNumber,
      inputType,
      setResponsiblity,
      commonStore,
      companyName,
      workType,
      periodFrom,
      periodTill,
      responsiblity,
      pageHeading,
      responsiblityField,
    };
  },
};
</script>
