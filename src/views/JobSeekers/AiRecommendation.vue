<template>
  <div
    class="back-wh"
    v-if="!AiOtherData.isOccupationOpen && !AiOtherData.isRegionSelectOpen"
  >
    <div class="top-hdr m-0">
      <div class="container">
        <h4 class="heading">
          <a @click="$router.go(-1)" class="left-arrow">
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >AI 추천 상세조건
          <a @click="AiOtherData.isConfirmAiModal = true" class="refresh"
            ><img src="@/assets/icons/refresh.svg" alt=""
          /></a>
        </h4>
      </div>
    </div>
  </div>
  <div
    class="form-wrapper ai-recommed-form"
    v-if="!AiOtherData.isOccupationOpen && !AiOtherData.isRegionSelectOpen"
  >
    <!-- <form> -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color d-flex">
              <h3 class="sub-heading mb-0">희망 근무지</h3>
              <p class="number"><label>선택 가능 갯수</label> <span>{{regionStore.state.workPlaceVisibleState.length}}</span>/10</p>
            </div>
            <div class="form-group mb-0">
              <div @click="openRegion()">
                <select class="form-control">
                  <option>지역을 선택해 주세요</option>
                </select>
              </div>
              <ul class="select-list"  :class="regionStore.state.workPlaceVisibleState.length === 0?'select-list-show' : ''">
                <li
                  v-for="(item, i) in regionStore.state.workPlaceVisibleState"
                  :key="i"
                >
                  <span
                    >{{ item }}
                    <a
                      @click="clearRegion(item, i, $event)"
                      ><img src="@/assets/icons/cross.svg" alt="" /></a
                  ></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color d-flex">
              <h3 class="sub-heading mb-0">업직종</h3>
              <p class="number">
                <label>선택 가능 갯수</label>
                <span>{{ store.state.filtersVisibleState.length }}</span
                >/10
              </p>
            </div>
            <div class="form-group mb-0">
              <div @click="openOccupation()">
                <select class="form-control">
                  <option>업직종을 선택해 주세요</option>
                </select>
              </div>
              <ul class="select-list" :class="store.state.filtersVisible.length === 0?'select-list-show' : '' ">
                <li v-for="(item, i) in store.state.filtersVisibleState" :key="i">
                  <span
                    >{{ item }}
                    <a
                      href="javascript:void(0);"
                      @click="removeOccupationFilter(item, i, $event)"
                      ><img src="@/assets/icons/cross.svg" alt="" /></a
                  ></span>
                </li>
                <!-- <li v-for="(item, i) in store.state.totalFilters" :key="i">
                  <span v-for="(data, j) in item.name" :key="j"
                    >{{ data }}
                    <a
                      href="javascript:void(0);"
                      @click="store.methods.removeFilter(data, j, $event)"
                      ><img src="@/assets/icons/cross.svg" alt="" /></a
                  ></span>
                </li> -->
                <!-- <li>
                  <span
                    >주방장•조리사
                    <a href="javascript:void(0);"
                      ><img src="@/assets/icons/cross.svg" alt="" /></a
                  ></span>
                </li>
                <li>
                  <span
                    >바리스타
                    <a href="javascript:void(0);"
                      ><img src="@/assets/icons/cross.svg" alt="" /></a
                  ></span>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">성별/나이</h3>
            </div>
            <div class="form-group mb-12">
              <div class="radio-wrapper">
                <label class="radio-input"
                  >남자
                  <input
                    type="radio"
                    name="radio1"
                    v-model="AiRecommendationData.gender"
                    value="male"
                    @change="resetAge()"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >여자
                  <input
                    type="radio"
                    name="radio1"
                    v-model="AiRecommendationData.gender"
                    value="female"
                    @change="resetAge()"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="form-group mb-0">
              <!-- <select class="form-control" v-model="AiRecommendationData.age">
                <option :value="i" v-for="i in 50" :key="i">{{ i }}</option>
              </select> -->
              <selectoption  
                class="my-dropdown-toggle salary-drop"
                :options="AiOtherData.age"
                :selected="AiOtherData.select"
                v-on:updateOption="ageset"
                :placeholder="'나이'"
                :closeOnOutsideClick="boolean"
                ref="child"
              >
              </selectoption>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color d-flex">
              <h3 class="sub-heading mb-0">희망 근무 기간</h3>
              <p class="number">
                <label>선택 가능 갯수</label>
                <span>{{ AiRecommendationData.working_periods.length }}</span
                >/7
              </p>
            </div>
            <ul class="check-list box-check">
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="1_day"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">하루(1일)</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="less_than_1_week"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">1주일이하</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="1_week_to_1_month"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">1주일~1개월</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="1_month_to_3_months"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">1개월~3개월</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="3_months_to_6_months"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">3개월~6개월</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="6_months_to_1_year"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">6개월~1년</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="more_than_1_year"
                    v-model="AiRecommendationData.working_periods"
                  />
                  <span class="text">1년 이상</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">경력</h3>
            </div>
            <div class="form-group mb-0">
              <div class="radio-wrapper">
                <label class="radio-input"
                  >신입
                  <input
                    type="radio"
                    name="radio2"
                    value="newcomer"
                    v-model="AiRecommendationData.career_type"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >경력
                  <input
                    type="radio"
                    name="radio2"
                    value="experience"
                    v-model="AiRecommendationData.career_type"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <!-- <div class="form-group mb-0">
              <select class="form-control">
                <option>30</option>
                <option>31</option>
                <option>32</option>
              </select>
            </div> -->
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color d-flex">
              <h3 class="sub-heading mb-0">고용형태</h3>
              <p class="number">
                <label>선택 가능 갯수</label>
                <span>{{ AiRecommendationData.employment_type.length }}</span
                >/7
              </p>
            </div>
            <ul class="check-list box-check">
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="part_time_job"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">아르바이트</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="full_time"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">정규직</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="contract_worker"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">계약직</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="dispatch"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">파견직</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="internship"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">인턴직</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="freelancer"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">프리랜서</span>
                </label>
              </li>
              <li>
                <label class="check-input">
                  <input
                    type="checkbox"
                    value="etc"
                    v-model="AiRecommendationData.employment_type"
                  />
                  <span class="text">기타</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">급여</h3>
            </div>
            <div class="form-group mb-12" @change="resetSalary">
              <div class="radio-wrapper">
                <label class="radio-input"
                  >시급
                  <input
                    type="radio"
                    name="radio"
                    value="hourly_wage"
                    v-model="AiRecommendationData.pay_type"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >일급
                  <input
                    type="radio"
                    name="radio"
                    value="daily_wage"
                    v-model="AiRecommendationData.pay_type"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >월급
                  <input
                    type="radio"
                    name="radio"
                    value="salary"
                    v-model="AiRecommendationData.pay_type"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="form-group mb-0">
              <div class="pos">
                <div
                :class="`group ${
                  AiOtherData.errors?.salary
                    ? 'valid-error'
                    : ''
                }`"
              >
                <input
                @keypress="onlyNumber"
                @blur="AiRecommendationData.salary=commonStore.methods.formatSalary(AiRecommendationData.salary!== null ? AiRecommendationData.salary.replaceAll(',','') : AiRecommendationData.salary)"
                  type="text"
                  class="form-control"
                  placeholder="원하시는 급여를 입력해 주세요"
                  v-model="AiRecommendationData.salary"
                  :disabled="
                    AiRecommendationData.pay_type === '' ||
                    AiRecommendationData.pay_type == null
                      ? true
                      : false
                  "
                />
                <button type="button" class="won">원</button>
                </div>
                <small
                style="color: red"
                v-if="
                  AiOtherData.errors && AiOtherData.errors?.salary
                "
                class="error-msg"
                >{{ AiOtherData.errors?.salary }}</small
              >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="pb-32 pt-32">
  
          <button
            class="btn btn-primary lg"
            type="button"
            @click="settingUp()"
          >설정하기</button>
        </div>
      </div>
    <!-- </form> -->
  </div>

  <OccupationSetting
    @setfalse="hideoccupation($event)"
    @submittedValue="setOccupationFinal($event)"
    v-show="AiOtherData.isOccupationOpen"
  />

  <RegionSelect
    @setfalse="hideRegion($event)"
    @submittedValue="setRegionFinal($event)"
    v-show="AiOtherData.isRegionSelectOpen"
  />

  <ConfirmAiRecommendation
    :isModal="AiOtherData.isConfirmAiModal"
    @closeModal="AiOtherData.isConfirmAiModal = false"
    @confirm="reset()"
  />
</template>
  
  <script>
import { reactive } from "@vue/reactivity";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import RegionSelect from "@/views/JobSeekers/RegionSelect.vue";
import ConfirmAiRecommendation from "@/components/Modals/ConfirmAiRecommendation.vue";
import { inject, onMounted, ref} from "@vue/runtime-core";
import { AiServices } from "@/service/API/AiRecommendation.js";
import { useRouter } from "vue-router";
import  validate  from "../../Validations/aiValidate.js";
import selectoption from "@/components/selectOption.vue";

export default {
  name: "AiRecommendation",
  components: { OccupationSetting, ConfirmAiRecommendation, RegionSelect, selectoption },

  setup() {
    const child = ref(null);
    const store = inject("occupationStore");
    const regionStore = inject("regionStore");
    const commonStore = inject("commonStore");
    const router = useRouter();
    const finalOccupation = ref([]);
    const finalRegion = ref([]);
    // const age= [{text: '10대', value:'10'},
    //        {text: '20대', value:'20'},
    //        {text: '30대', value:'30'},
    //        {text: '40대', value:'40'},
    //        {text: '50대', value:'50'},
    //        {text: '60대', value:'60'},
    //        {text: '70대', value:'70'},
    //       ];
    const AiOtherData = reactive({
      isOccupationOpen: false,
      isRegionSelectOpen: false,
      isConfirmAiModal: false,
      type: "",
      errors: [],
      age:[{text: '10대', value:'10'},
           {text: '20대', value:'20'},
           {text: '30대', value:'30'},
           {text: '40대', value:'40'},
           {text: '50대', value:'50'},
           {text: '60대', value:'60'},
           {text: '70대', value:'70'},
          ],
      select: []
    });
    const AiRecommendationData = reactive({
      career_type: "",
      work_places: [],
      occupations: [],
      working_periods: [],
      employment_type: [],
      gender: "",
      pay_type: "",
      salary: "",
      age: "",
    });

    onMounted(async () => {
      store.methods.refreshAllData();
      regionStore.methods.refreshAllData();
      // for(let i=1; i <= 50; i++) {
      //   AiOtherData.age.push({text:i,value:i})
      // }
      if(localStorage.getItem('login_type')){
        await details();
      } else {
        // store.state.totalFilters = res.data.ai_occupation;
        // regionStore.state.totalFilters = res.data.ai_work_place;
        AiRecommendationData.career_type = commonStore.state.AiRecommendationData.career_type;
        AiRecommendationData.working_periods = commonStore.state.AiRecommendationData.working_periods;
        AiRecommendationData.employment_type = commonStore.state.AiRecommendationData.employment_type;
        AiRecommendationData.gender = commonStore.state.AiRecommendationData.gender;
        AiRecommendationData.pay_type = commonStore.state.AiRecommendationData.pay_type;
        AiRecommendationData.salary = commonStore.methods.formatSalary(commonStore.state.AiRecommendationData.salary);
        AiRecommendationData.age = commonStore.state.AiRecommendationData.age;
        AiOtherData.select.text = commonStore.state.AiRecommendationData.age ? commonStore.state.AiRecommendationData.age + '대' : ''
        AiOtherData.select.value = commonStore.state.AiRecommendationData.age
        
      }
    });

    function ageset(payload) {
      AiOtherData.select = payload;
      AiRecommendationData.age = payload.value;
    }

    async function details() {
      let res = await AiServices.details();
      if (res.status === 200) {
        AiOtherData.type = "update";
        store.state.totalFilters = [];
        regionStore.state.totalFilters = [];
        // store.state.totalFilters = res.data.ai_occupation;
        finalOccupation.value = res.data.occupations;
        finalRegion.value = res.data.work_places;
        res.data.ai_occupation.forEach((ele) => {
          store.state.totalFilters.push({
            occupation_first: ele.occupation_first,
            occupation_second: ele.occupation_second,
            occupation_third: ele.occupation_third,
            name: ele.name,
          });
        });
        res.data.ai_work_place.forEach((ele) => {
          regionStore.state.totalFilters.push({
            work_place_first: ele.work_place_first,
            work_place_second: ele.work_place_second,
            work_place_third: ele.work_place_third,
            name: ele.name,
          });
        });
        setTimeout(() => {
          store.methods.submitFilter();
          regionStore.methods.submitFilter();
        }, 100);
        // regionStore.state.totalFilters = res.data.ai_work_place;

        AiRecommendationData.career_type = res.data.career;
        AiRecommendationData.working_periods = res.data.working_periods;
        AiRecommendationData.employment_type = res.data.employment_type;
        AiRecommendationData.gender = res.data.gender;
        AiRecommendationData.pay_type = res.data.pay_type;
        AiRecommendationData.salary = commonStore.methods.formatSalary(res.data.salary);
        AiRecommendationData.age = res.data.age;
        AiOtherData.select.text = res.data.age ? res.data.age + '대' : ''
        AiOtherData.select.value = res.data.age
      } else if (res.response.data.error === "AiRecommendationNotExists") {
        // if (res.status === 400) {
        AiOtherData.type = "insert";
      }
    }



    function hideoccupation(data) {
      AiOtherData.isOccupationOpen = data;
    }

    function hideRegion(data) {
      AiOtherData.isRegionSelectOpen = data;
    }

    async function settingUp() {
      // setTimeout(() => {
      //   store.methods.submitFilter();
      //   // regionStore.methods.submitFilter();
      // }, 100);
      console.log("finalOccupation while submit", finalOccupation.value);
      AiRecommendationData.occupations = store.state.totalFilterState;
      AiRecommendationData.work_places = regionStore.state.totalFilterState;
      
      if (AiRecommendationData.gender === "") {
        AiRecommendationData.gender = "any";
      }

      if (AiRecommendationData.career_type == "") {
        AiRecommendationData.career_type = null;
      }
      if (AiRecommendationData.pay_type == "") {
        AiRecommendationData.pay_type = null;
      }
      if (AiRecommendationData.salary == "") {
        AiRecommendationData.salary = null;
      }
      if (AiRecommendationData.age == "") {
        AiRecommendationData.age = null;
      }

      let userData = {
          career_type: AiRecommendationData.career_type,
          work_places: finalRegion.value,
          occupations: finalOccupation.value,
          working_periods: AiRecommendationData.working_periods,
          employment_type: AiRecommendationData.employment_type,
          gender: AiRecommendationData.gender,
          pay_type: AiRecommendationData.pay_type,
          salary: AiRecommendationData.salary,
          age: AiRecommendationData.age,
        };
      userData.salary = userData.salary !== null ? userData.salary.replaceAll(',','') : userData.salary = userData.salary
      if(localStorage.getItem('login_type')) {
        if (AiOtherData.type === "insert") {
          // AiRecommendationData.salary = AiRecommendationData.salary.replaceAll(',','')
          let res = await AiServices.add(userData);
          if (res.status === 200) {
            router.push(`/job-seekers/ai-recommendation-list`);
          }
        } else {
          // AiRecommendationData.salary = AiRecommendationData.salary.replaceAll(',','')
          let res = await AiServices.editDetails(userData);
          if (res.status === 200) {
            router.push(`/job-seekers/ai-recommendation-list`);
          }
        }
      } else {
        commonStore.state.AiRecommendationData = userData
        router.push({name: 'AiRecommendationList', query: {fromPage: 'AiRecommendation'}})
      }

      
    }

    // function checkValidation() {
      // if (
      //   AiRecommendationData.pay_type !== "" &&
      //   AiRecommendationData.pay_type !== null
      // ) {
        
      //   let validation = validate(AiRecommendationData.salary);
      //   if (validation.isInvalid) {
      //     AiOtherData.errors = validation.error;
      //   }
      //   else {
          // settingUp()
          // AiOtherData.isConfirmAiModal = true;
      //   }
      // } else {
      //   settingUp()
      //   // AiOtherData.isConfirmAiModal = true;
      // }
    // }

    function onlyNumber($event) {
      AiRecommendationData.salary=AiRecommendationData.salary !== null ? AiRecommendationData.salary.replaceAll(',','') : AiRecommendationData.salary
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 44) {
        // 46 is dot
        $event.preventDefault();
      }
    }

    function formatSalary() {
      
      // alert(AiRecommendationData.salary.length)
      
      if(AiRecommendationData.salary.length === 3){
        AiRecommendationData.salary = ',' + AiRecommendationData.salary
      }
    }

    function openRegion() {
      AiOtherData.isRegionSelectOpen = true
    }

    function openOccupation() {
      AiOtherData.isOccupationOpen = true
    }

    function reset() {
      // window.addEventListener("click",function test(event) {
        regionStore.methods.refreshAllData()
        store.methods.refreshAllData()
      // })
      AiRecommendationData.career_type = "",
      AiRecommendationData.work_places = [],
      finalRegion.value = [],
      AiRecommendationData.occupations = [],
      finalOccupation.value = []
      AiRecommendationData.working_periods = [],
      AiRecommendationData.employment_type = [],
      AiRecommendationData.gender = "",
      AiRecommendationData.pay_type = "",
      AiRecommendationData.salary = "",
      AiRecommendationData.age = ""
      AiOtherData.select.text = ""
      AiOtherData.select.value = ""
      AiOtherData.isConfirmAiModal = false;
    }
    
    function resetAge() {
      // AiOtherData.select.text = ""
      // AiOtherData.select.value = ""
      AiRecommendationData.age = ""
      child.value.updateOption(AiOtherData.age);
    }

    function resetSalary() {
     AiRecommendationData.salary = ""
    }
    
    function removeOccupationFilter(i, id, event) {
      store.methods.removeFilter(i, id, event);
      setTimeout(() => {
        store.methods.submitFilter();
      }, 100);
      setOccupationFinal(store.state.totalFilters)
    }
    const setOccupationFinal = (event) => {
      finalOccupation.value = event;
    };

    function clearRegion(i, id, event) {
      regionStore.methods.removeFilter(i, id, event);
      setTimeout(() => {
        regionStore.methods.submitFilter();
      }, 100); 
      setRegionFinal(regionStore.state.totalFilters)
      
      // if(regionStore.state.workPlaceVisibleState.length !== 0) {
      //    alert('1234')
      //   setRegionFinal(regionStore.state.workPlaceFilterState)
      // } else {
      //   regionStore.state.workPlaceFilterState= []
      //   setRegionFinal(regionStore.state.workPlaceFilterState)
      // }
    }

     const setRegionFinal = (event) => {
      console.log("only when hit submit region", event);
      finalRegion.value = event
    }

    return {
      AiRecommendationData,
      AiOtherData,
      hideoccupation,
      hideRegion,
      store,
      regionStore,
      settingUp,
      onlyNumber,
      formatSalary,
      openRegion,
      openOccupation,
      reset,
      commonStore,
      ageset,
      resetAge,
      resetSalary,
      child,
      removeOccupationFilter,
      setOccupationFinal,
      clearRegion,
      finalRegion,
      setRegionFinal
    };
  },
};
</script>


  