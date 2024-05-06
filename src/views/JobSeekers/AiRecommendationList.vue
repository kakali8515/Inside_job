<template>
  <HeaderSearch :searchType="false" />
  <div class="back-wh pb-16">
    <div class="container">
      <div
        class="place-fliter-cont rgn ai-recomnd-cont"
        @click="$router.push(`/job-seekers/ai-recommendation`)"
      >
        <button href="#" class="filter-ic">
          <img src="@/assets/icons/filter-icon.svg" alt="" />
        </button>
        <!-- add input 서울 전체-->
        <div class="search-input ai-list-srch">
          <!-- <img src="@/assets/icons/Vector.svg" alt=""/> -->
          <img
            v-if="count === 0"
            class="ai-focus-icon"
            src="@/assets/icons/Vector.svg"
            alt=""
          />
          <sapn class="ai-recom-label" v-if="count === 0"
            >AI 추천 조건을 설정하세요</sapn
          >
          <span v-else class="ai-recom-item-wrap">
            <span
              class="ai-recom-item-otr"
              v-for="(item, i) in Object.keys(AiRecommendationData)"
              :key="i"
              :class="
                typeof AiRecommendationData[item] !== 'object' &&
                AiRecommendationData[item] !== '' &&
                AiRecommendationData[item] !== 'any' &&
                AiRecommendationData[item] !== null
                  ? ''
                  : 'hide'
              "
            >
              <span
                class="ai-recom-item"
                v-if="
                  typeof AiRecommendationData[item] !== 'object' &&
                  AiRecommendationData[item] !== '' &&
                  AiRecommendationData[item] !== 'any'
                "
                >{{ AiRecommendationData[item] }}
                <img
                  href="#"
                  @click.stop="removeItem(item)"
                  src="@/assets/icons/cross.svg"
                  alt=""
                />
              </span>
            </span>

            <!-- <span  class="ai-recom-item" v-for="(item,i) in AiRecommendationData.working_periods" :key="i">
            {{item }} 
            <a href="#" @click="removeItem('working_periods',i)"><img src="@/assets/icons/cross.svg" alt="" /></a
          >
          </span> -->

            <span
              class="ai-recom-item-otr"
              v-for="(item, i) in AiRecommendationData.working_periods"
              :key="i"
            >
              <span
                class="ai-recom-item"
                v-for="(data, j) in aiLists.desiredPeriods"
                :key="j"
                v-show="data.value == item"
              >
                {{ data.name }}
                <img
                  src="@/assets/icons/cross.svg"
                  @click.stop="removeItem('working_periods', i)"
                  alt=""
                />
              </span>
            </span>

            <span
              class="ai-recom-item-otr"
              v-for="(item, i) in AiRecommendationData.employment_type"
              :key="i"
            >
              <span
                class="ai-recom-item"
                v-for="(data, j) in aiLists.employmentType"
                :key="j"
                v-show="data.value == item"
              >
                {{ data.name }}
                <img
                  src="@/assets/icons/cross.svg"
                  @click.stop="removeItem('employment_type', i)"
                  alt=""
                />
              </span>
            </span>

            <!-- <span v-for="(item, i) in aiLists.desiredPeriods" :key="i">
              <span
                class="ai-recom-item"
                v-for="(data, j) in AiRecommendationData.working_periods"
                :key="j"
                 v-show="item.value == data"
              >
                {{ item.name }}
                <a href="#" @click="removeItem('working_periods', j)"
                  ><img src="@/assets/icons/cross.svg" alt=""
                /></a>
              </span>
            </span>

            <span v-for="(item, i) in aiLists.employmentType" :key="i">
              <span
                class="ai-recom-item"
                v-for="(data, j) in AiRecommendationData.employment_type"
                :key="j"
                v-show="item.value == data"
              >
                {{ item.name }}
                <a href="#" @click="removeItem('employment_type', j)"
                  ><img src="@/assets/icons/cross.svg" alt=""
                /></a>
              </span>
            </span> -->

            <span
              class="ai-recom-item-otr"
              v-for="(item, i) in store.state.totalFilters"
              :key="i"
            >
              <span
                class="ai-recom-item"
                v-for="(data, j) in item.name"
                :key="j"
                >{{ data }}
                <img
                  @click.stop="
                    store.methods.removeFilter(data, j, $event),
                      removeItem('occupations')
                  "
                  src="@/assets/icons/cross.svg"
                  alt=""
                />
              </span>
            </span>

            <span
              class="ai-recom-item-otr"
              v-for="(item, i) in regionStore.state.totalFilters"
              :key="i"
            >
              <span
                class="ai-recom-item"
                v-for="(data, j) in item.name"
                :key="j"
                >{{ data }}
                <img
                  @click.stop="
                    regionStore.methods.removeFilter(data, j, $event),
                      removeItem('work_places')
                  "
                  src="@/assets/icons/cross.svg"
                  alt=""
              /></span>
            </span>
          </span>
          <!-- <span
            >잠실•송파•강동
            <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a
          ></span>
          <span
            >여자 <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a
          ></span> -->
        </div>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32">
        <div class="sub-otr mb-20 b-color">
          <h3 class="sub-heading mb-0">AI 추천 공고 리스트</h3>
        </div>
        <!-- Code For No Data -->
        <NoData v-if="AiData.list.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>AI 추천 조건이 없습니다.</span></p>
            <p>나에게 맞는 채용정보를 조건을 설정해 확인해보세요!</p>
          </template>
        </NoData>
        <div class="card-list ai-recommed-list" v-else>
          <div class="card-list-innr" v-for="(item, i) in AiData.list" :key="i">
            <div class="slider-wrap mb-0">
              <PostListSlider
                :pictures="item"
                @aiList="list()"
                @scrappedSuccessful="commonStore.methods.scrappedSuccessful"
                @click="
                  (e) => {
                    e.stopPropagation(),
                      $router.push({
                        name: 'RecruiterJobPostingDetails',
                        params: { id: item.id },
                      });
                  }
                "
              />
            </div>
            <CardWrapper
              @click="
                $router.push({
                  name: 'RecruiterJobPostingDetails',
                  params: { id: item.id },
                })
              "
            >
              <template v-slot:content>
                <h5>{{ item.company_name }}</h5>
                <h3>{{ item.announcement_title }}</h3>
              </template>
              <template v-slot:btn>
                <h6>
                  <b>
                    {{ item.region_1st_depth_name }}
                    {{ item.region_2nd_depth_name }}
                    {{ item.region_3rd_depth_name }}
                  </b>
                  <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                  <span style="" v-if="item.pay_type === 'hourly_wage'"
                    >시급</span
                  >
                  <span style="" v-if="item.pay_type === 'daily_wage'"
                    >일급</span
                  >
                  <span style="" v-if="item.pay_type === 'salary'">월급</span>
                  {{ commonStore.methods.formatSalary(item.salary) }}원
                </h6>
                <span
                  class="btn btn-primary-gradient apply-btn"
                  @click="
                    (e) => {
                      e.stopPropagation(),
                        (commonStore.state.isApplyChooseResume = true),
                        (applyId = item.id);
                    }
                  "
                  >지원하기</span
                >
              </template>
            </CardWrapper>
          </div>

          <!-- <Pagination
            :totalRecords="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          /> -->
          <VuePaginate
            :limit="pagination.perPage"
            :page="pagination.pageNo"
            :totalItems="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          />
          <ApplyChooseResume
            :id="applyId"
            v-if="commonStore.state.isApplyChooseResume"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    class="scrapped-icon scrapped-icon-transform act"
    v-if="commonStore.state.popupMessageShow"
  >
    <p>
      <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
      스크랩했습니다.
    </p>
  </div>
</template>

<script>
import { AiServices } from "@/service/API/AiRecommendation.js";
import CardWrapper from "@/components/CardWrapper.vue";
import PostListSlider from "@/components/PostListSlider.vue";
import { reactive, ref } from "@vue/reactivity";
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  watch,
} from "@vue/runtime-core";
import NoData from "@/components/NoData.vue";
import Pagination from "@/components/Pagination.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import { aiLists } from "@/config/aiOptions.js";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import common from "../../store/common";
import { useRouter } from "vue-router";
import ApplyChooseResume from "./ApplyChooseResume.vue";

export default {
  name: "AiRecommendationList",
  components: {
    CardWrapper,
    PostListSlider,
    NoData,
    Pagination,
    HeaderSearch,
    VuePaginate,
    ApplyChooseResume,
  },

  setup() {
    const store = inject("occupationStore");
    const regionStore = inject("regionStore");
    const commonStore = inject("commonStore");
    const router = useRouter();
    const applyId = ref(0);
    const AiData = reactive({
      list: [],
    });
    const count = ref(0);
    const AiRecommendationData = reactive({
      work_places: [],
      occupations: [],
      working_periods: [],
      employment_type: [],
      gender: "any",
      pay_type: null,
      salary: "",
      age: "",
      career_type: null,
    });
    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    onMounted(async () => {
      if (localStorage.getItem("login_type")) {
        await details();
        await list();
      } else {
        if (router.currentRoute.value.query.fromPage === "AiRecommendation") {
          await list1();
          AiRecommendationData.career_type =
            commonStore.state.AiRecommendationData.career_type;
          AiRecommendationData.working_periods =
            commonStore.state.AiRecommendationData.working_periods;
          AiRecommendationData.employment_type =
            commonStore.state.AiRecommendationData.employment_type;
          AiRecommendationData.gender =
            commonStore.state.AiRecommendationData.gender;
          AiRecommendationData.pay_type =
            commonStore.state.AiRecommendationData.pay_type;
          AiRecommendationData.salary = commonStore.methods.formatSalary(
            commonStore.state.AiRecommendationData.salary
          );
          AiRecommendationData.age = commonStore.state.AiRecommendationData.age;
        } else {
          commonStore.state.AiRecommendationData.career_type = "";
          commonStore.state.AiRecommendationData.working_periods = [];
          commonStore.state.AiRecommendationData.employment_type = [];
          commonStore.state.AiRecommendationData.gender = "any";
          commonStore.state.AiRecommendationData.pay_type = "";
          commonStore.state.AiRecommendationData.salary = "";
          commonStore.state.AiRecommendationData.age = "";
          store.methods.refreshAllData(), regionStore.methods.refreshAllData();
        }
      }
      noDataSearchInput();
    });

    watch(
      () => commonStore.state.isApplyChooseResume,
      (newVal, oldVal) => {
        if (newVal) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    function noDataSearchInput() {
      count.value = 0;
      Object.keys(AiRecommendationData).forEach((key) => {
        if (typeof AiRecommendationData[key] === "string") {
          if (
            AiRecommendationData[key] === "" ||
            AiRecommendationData[key] === null ||
            AiRecommendationData[key] === "any"
          ) {
          } else {
            count.value = count.value + 1;
          }
        } else {
          if (
            AiRecommendationData[key] == null ||
            AiRecommendationData[key].length == 0
          ) {
            // count = 0
          } else {
            count.value = count.value + 1;
          }
        }
        if (count.value > 0) {
          return count.value;
        }
      });

      return count.value;
    }

    async function details() {
      let res = await AiServices.details();
      if (res.status === 200) {
        store.state.totalFilters = res.data.ai_occupation;
        regionStore.state.totalFilters = res.data.ai_work_place;
        AiRecommendationData.occupations = res.data.ai_occupation;
        // AiRecommendationData.career_type = res.data.career;
        aiLists.career_type.forEach((element) => {
          console.log(element);
          if (res.data.career === element.value) {
            AiRecommendationData.career_type = element.name;
          }
        });
        AiRecommendationData.work_places = res.data.ai_work_place;
        // AiRecommendationData.occupations = res.data.occupations;
        AiRecommendationData.working_periods = res.data.working_periods;
        AiRecommendationData.employment_type = res.data.employment_type;
        // AiRecommendationData.gender = res.data.gender;
        aiLists.gender.forEach((element) => {
          if (res.data.gender === element.value) {
            AiRecommendationData.gender = element.name;
          }
        });
        AiRecommendationData.pay_type = res.data.pay_type;
        aiLists.pay_type.forEach((element) => {
          console.log(element);
          if (res.data.pay_type === element.value) {
            AiRecommendationData.pay_type = element.name;
          }
        });
        AiRecommendationData.salary = commonStore.methods.formatSalary(
          res.data.salary
        );
        AiRecommendationData.age = res.data.age;
      }
    }

    async function list() {
      let res = await AiServices.AiList({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        AiData.list = res.data.data;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = res.data.total_records;
      }
    }

    async function list1() {
      commonStore.state.AiRecommendationData.page = pagination.pageNo;
      commonStore.state.AiRecommendationData.limit = pagination.perPage;
      let res = await AiServices.AiList(commonStore.state.AiRecommendationData);
      if (res.status === 200) {
        AiData.list = res.data.data;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = res.data.total_records;
      }
    }

    async function removeItem(key, i = 0) {
      pagination.pageNo = 1;
      if (typeof AiRecommendationData[key] !== "object") {
        if (key === "gender") {
          AiRecommendationData[key] = "any";
          commonStore.state.AiRecommendationData[key] = "any";
        }
        // else if (key === "pay_type") {
        //   AiRecommendationData[key] = null;
        //   AiRecommendationData["salary"] = null;
        // }
        else {
          AiRecommendationData[key] = null;
          commonStore.state.AiRecommendationData[key] = null;
        }
      }
      if (key === "working_periods" || key === "employment_type") {
        AiRecommendationData[key].splice(i, 1);
        commonStore.state.AiRecommendationData[key].splice(i, 1);
      }

      AiRecommendationData.occupations = store.state.totalFilters;
      commonStore.state.AiRecommendationData.occupations =
        store.state.totalFilters;
      AiRecommendationData.work_places = regionStore.state.totalFilters;
      commonStore.state.AiRecommendationData.work_places =
        regionStore.state.totalFilters;

      // this for give value in api in english
      aiLists.career_type.forEach((element) => {
        if (AiRecommendationData.career_type === element.name) {
          AiRecommendationData.career_type = element.value;
        }
      });
      aiLists.gender.forEach((element) => {
        if (AiRecommendationData.gender === element.name) {
          AiRecommendationData.gender = element.value;
        }
      });
      aiLists.pay_type.forEach((element) => {
        if (AiRecommendationData.pay_type === element.name) {
          AiRecommendationData.pay_type = element.value;
        }
      });

      if (localStorage.getItem("login_type")) {
        let res = await AiServices.editDetails(AiRecommendationData);
        if (res.status === 200) {
          await details();
          await list();
          aiLists.career_type.forEach((element) => {
            console.log(element);
            if (res.data.career === element.value) {
              AiRecommendationData.career_type = element.name;
            }
          });
        }
      } else {
        list1();
      }

      noDataSearchInput();
    }

    function setPage(event) {
      window.scrollTo(0, 0);
      pagination.pageNo = event;
      if (router.currentRoute.value.query.fromPage === "AiRecommendation") {
        list1();
      } else {
        list();
      }
    }

    return {
      AiData,
      setPage,
      pagination,
      AiRecommendationData,
      store,
      regionStore,
      removeItem,
      list,
      noDataSearchInput,
      count,
      aiLists,
      pagination,
      commonStore,
      applyId,
    };
  },
};
</script>
<style scoped>
.hide {
  display: none !important;
}

.scrapped-icon-transform {
  transform: none;
}
</style>
