<template>
  <div class="common-sec back-wh">
    <!-- <div class="top-hdr top-hdr-br no-tp-sp"></div> -->

    <div class="container">
      <div class="employment-tab job-list-tab">
        <div class="tab-outr">
          <div class="tabs">
            <div class="tabs-otr">
              <ul class="tabs-header">
                <li
                  v-for="(data, i) in jobListData.allList"
                  :class="{ active: data.title == jobListData.selectedTab }"
                  :key="i"
                  @click="jobListData.selectedTab = data.title"
                >
                  <span>{{ data.title }}</span>
                </li>
              </ul>
            </div>

            <div
              class="tab-content"
              v-for="(data, index) in jobListData.allList"
              :key="index"
            >
              <div
                class="outerside"
                v-if="data.title == jobListData.selectedTab"
              >
                <div class="heading">공고 리스트</div>
                <div class="tab-inner-cont">
                  <!-- Code For No Data -->
                  <NoData v-if="data.content?.length == 0">
                    <template v-slot:no-data-image>
                      <img
                        class="no-job-icon"
                        src="@/assets/icons/no-job-icon.svg"
                        alt=""
                      />
                    </template>
                    <template
                      v-slot:no-data-content
                      v-if="data.title.includes('게재중')"
                    >
                      <p><span>진행중인 채용공고가 없습니다.</span></p>
                      <p>채용공고를 등록해 우수한 인재를 만나보세요!</p>
                    </template>
                    <template v-slot:no-data-content v-else>
                      <p><span>마감된 채용공고가 없습니다.</span></p>
                      <p>채용공고를 등록해 우수한 인재를 만나보세요!</p>
                    </template>
                  </NoData>
                  <div
                    class="job-listing-card hand-pointer rec-job-listing"
                    v-for="(item, i) in data.content"
                    :key="i"
                    @click="$router.push(`/job-posting-details/${item.id}`)"
                  >
                    <!-- :class="item.status === 'readytopublish' ? 'hand-pointer' : ''" -->
                    <!-- @click="item.status === 'readytopublish' || item.status === 'published' ? $router.push(`/job-posting-details/${item.id}`) : ''" -->
                    <div class="top-area">
                      <span
                        class="btn btn-default"
                        v-if="item.status === 'readytopublish'"
                        >게재 준비</span
                      >
                      <span
                        class="btn btn-default red"
                        v-if="item.status === 'published'"
                        >게재중</span
                      >
                      <span
                        class="btn btn-default red"
                        v-if="item.status === 'rejected'"
                        >반려</span
                      >
                      <span
                        class="btn btn-default"
                        v-if="item.status === 'pending'"
                        >검토중</span
                      >
                      <span
                        class="btn btn-default"
                        v-if="item.status === 'closed'"
                        >마감</span
                      >
                      <span
                        class="btn btn-default"
                        v-if="item.status === 'on_hold'"
                        >무료공고 대기중</span
                      >                      
                      <span class="toggle" @click="myFunction"
                        ><img src="@/assets/icons/dot-icon.svg" alt=""
                      /></span>
                      <div
                        class="job-feature-dropdown"
                        v-if="item.status === 'closed'"
                        @click="
                          (e) => {
                            e.stopPropagation();
                          }
                        "
                      >
                        <ul>
                          <li class="hand-pointer">
                            <a
                              @click="
                                $router.push(`/recruiter/notice-registration/edit/${item.id}/copy`)
                              "
                              >재등록</a
                            >
                          </li>
                        </ul>
                      </div>
                      <div
                        class="job-feature-dropdown"
                        v-else
                        @click="
                          (e) => {
                            e.stopPropagation();
                          }
                        "
                      >
                        <ul>
                          <li
                            v-if="
                              item.status !== 'rejected' &&
                              item.status !== 'pending' &&
                              item.status !== 'on_hold'
                            "
                            class="hand-pointer"
                          >
                            <a
                              @click="
                                (store.state.isPaidProductAppModal = true),
                                  (jobListData.id = item.id)
                              "
                              >유료상품 적용</a
                            >
                          </li>
                          <li
                            v-if="
                              item.status !== 'published' &&
                              item.status !== 'rejected' &&
                              item.status !== 'pending' &&
                              item.status !== 'on_hold'
                            "
                            class="hand-pointer"
                          >
                            <a
                              @click="
                                withdrawPaidProduct(
                                  item.status,
                                  item.paid_feature
                                ),
                                  (jobListData.id = item.id)
                              "
                              >유료상품 해제</a
                            >
                            <!-- <router-link
                              :to="{ name: 'PaidProductCancellation' }"
                              >유료상품 해제</router-link
                            > -->
                          </li>
                          <li class="hand-pointer">
                            <a
                              @click="
                                $router.push(
                                  `/recruiter/notice-registration/edit/${item.id}`
                                )
                              "
                              >수정하기</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h4>[{{ item.announcement_title }}]</h4>
                    <ul>
                      <li>
                        <div class="lft-part">노출 기간</div>
                        <div class="rht-part">
                          {{
                            store.methods.dateFormat(
                              item.start_date,
                              "YYYY년 M월 D일"
                            )
                          }}
                          ~
                          {{
                            store.methods.dateFormat(
                              item.end_date,
                              "YYYY년 M월 D일"
                            )
                          }}
                        </div>
                      </li>
                      <li>
                        <div class="lft-part">지원자관리</div>
                        <div class="rht-part">
                          <span class="applicant"
                            ><img
                              src="@/assets/icons/user-small-icon.svg"
                              alt=""
                            />
                            지원자<label>{{ item.applicant_cnt }}</label></span
                          >
                          <span class="unread"
                            ><img
                              src="@/assets/icons/user-small-icon.svg"
                              alt=""
                            />
                            미열람<label>{{ item.unread_cnt }}</label></span
                          >
                        </div>
                      </li>
                      <li>
                        <div class="lft-part">유료상품</div>
                        <div class="rht-part">
                          {{ paid_feature(item.paid_feature) }}
                        </div>
                      </li>
                    </ul>
                    <div
                      class="applicant-area"
                      v-if="item.status === 'published'"
                    >
                      <button
                        @click="(e) => {e.stopPropagation(),
                          $router.push({
                            name: 'ParticularJobPostApplicantConfirmation',
                            params: { id: item.id },
                          })}
                        "
                        class="btn btn-default lg"
                      >
                        지원자 확인
                        <span
                          ><img src="@/assets/icons/user-small-icon.svg" alt=""
                        /></span>
                      </button>
                    </div>
                    <div
                      class="applicant-area"
                      v-if="item.status === 'rejected'"
                    >
                      <button class="btn btn-default lg">
                        {{ item.reason }}
                      </button>
                    </div>
                  </div>

                  <button
                    class="btn btn-outline-primary mt-16"
                    v-if="data.title.includes('게재중') && data.content?.length === 0"
                    @click="$router.push(`/recruiter/notice-registration`)"
                  >
                    채용공고 등록하기
                  </button>

                  <button
                    class="btn btn-outline-primary mt-16"
                    v-if="data.title.includes('게재중') && data.content?.length !== 0"
                    @click="$router.push(`/recruiter/notice-registration`)"
                  >
                    채용공고 추가하기
                  </button>
                  <!-- New button added -->
                  <button class="btn btn-outline-primary" v-if="data.title.includes('게재중')" @click="store.state.showAutomatiocJobPostSheet = true">자동 채용공고 등록 신청하기</button>
                  
                  <div class="pagination-outer">
                  <VuePaginate
                  v-if="
                      data.title.includes('게재중') &&
                      data.content?.length !== 0
                    "
                    :limit="pagination.perPage"
                    :page="pagination.pageNo"
                    :totalItems="data.pagination.totalRecords"
                    v-on:setNumber="setPage($event)"
                  />
                  
                  <VuePaginate
                  v-if="
                      data.title.includes('마감') && data.content?.length !== 0
                    "
                    :limit="paginationCancel.perPage"
                    :page="paginationCancel.pageNo"
                    :totalItems="data.pagination.totalRecords"
                    v-on:setNumber="setPageCancleList($event)"
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PaidProductApplication
      v-if="store.state.isPaidProductAppModal"
      :id="jobListData.id"
    />

    <PaidProductCancellation
      v-if="store.state.isPaidProductCancelModal"
      :id="jobListData.id"
      @jobList="list()"
    />

    <WithdrawPaidFeature
      :isModal="jobListData.isWithdrawPaidFeatureModal"
      @conifrmModel="(jobListData.isWithdrawPaidFeatureModal = false), list()"
    />

    <AutomatiocJobPostSheet
      v-if="store.state.showAutomatiocJobPostSheet"
      @applyAutomaticPost="applyAutomaticPost"
    />

    <RedirectionModal
      :isModal="redirectionModal"
      @confirm="$router.push('/recruiter/automaticjobpostingrequesthistory')"
      @closeConfirm="redirectionModal = false"
    />
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import AutomatiocJobPostSheet from "./AutomatiocJobPostSheet.vue";
import RedirectionModal from "@/components/Modals/RedirectionModal.vue";
import Tabs from "@/components/Tabs.vue";
import EmploymentContractCard from "@/components/EmploymentContractCard.vue";
import NoData from "@/components/NoData.vue";
import { inject, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { jobListing } from "@/service/API/jobListing.js";
import Pagination from "@/components/Pagination.vue";
import PaidProductApplication from "./PaidProductApplication.vue";
import PaidProductCancellation from "./PaidProductCancellation.vue";
import WithdrawPaidFeature from "@/components/Modals/WithdrawPaidFeature.vue";
import { useRouter } from "vue-router";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "JobListing",
  components: {
    Tabs,
    TabWrapper,
    EmploymentContractCard,
    NoData,
    Pagination,
    PaidProductApplication,
    WithdrawPaidFeature,
    PaidProductCancellation,
    VuePaginate,
    AutomatiocJobPostSheet,
    RedirectionModal,
  },

  setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const redirectionModal = ref(false);
    const jobListData = reactive({
      allList: [],
      list: [],
      cancelList: [],
      tabTitle_complete: "",
      tabTitle_cancel: "",
      selectedTab: "게재중",
      id: 0,
      isWithdrawPaidFeatureModal: false,
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    const paginationCancel = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    watch(
      () => store.state.isPaidProductAppModal,
      (newVal, oldVal) => {
        if (newVal) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      }
    );

    watch(() => store.state.showAutomatiocJobPostSheet,() => {
      if (store.state.showAutomatiocJobPostSheet === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
    });

    onMounted(() => {
      if (router.currentRoute.value.params.tab) {
        jobListData.selectedTab = router.currentRoute.value.params.tab;
      }
      // let elements = document.getElementsByClassName("toggle");
      // for (let i = 0; i < elements.length; i++) {
      //   console.log(elements.length);
      //   const element = elements[i];
      //   window.addEventListener("click", function test(event) {
      //     // console.log(event.target.parentElement)
      //     myFunction(element);
      //   });
      // }
      // myFunction(element)
      list();
    });

    function myFunction(e) {
      e.stopPropagation();
      let elements = document.getElementsByClassName("toggle");
      let parent = e.target.parentElement.parentElement;
      console.log(parent);
      let hide_box = parent.querySelector(".job-feature-dropdown");
      let list = hide_box.classList;
      console.log(list);

      if (list.contains("show")) {
        list.remove("show");
      } else {
        console.log(elements);
        for (let i = 0; i < elements.length; i++) {
          elements[i].parentElement
            .querySelector(".job-feature-dropdown")
            .classList.remove("show");
          elements[i].parentElement.parentElement.parentElement
            .querySelector(".job-listing-card")
            .classList.remove("hand-pointer");
        }
        list.add("show");
      }
    }

    async function list() {
      window.scrollTo(0, 0);
      let res = await jobListing.publishList({
        page: pagination.pageNo,
        limt: pagination.perPage,
      });
      let res2 = await jobListing.cancelList({
        page: paginationCancel.pageNo,
        limt: paginationCancel.perPage,
      });

      //publish job list
      jobListData.list = res?.data?.posts;
      jobListData.tabTitle_complete = `게재중 (${res.data?.total_records})`;
      pagination.perPage = res.data?.pagination_limit;
      pagination.totalRecords = res.data?.total_records 
      //close job list
      jobListData.cancelList = res2?.data?.posts;
      jobListData.tabTitle_cancel = `마감 (${res2.data?.total_records})`;
      paginationCancel.perPage = res2.data?.pagination_limit;
      paginationCancel.totalRecords = res2.data?.total_records
      jobListData.allList = [];
      jobListData.allList.push(
        {
          title: jobListData.tabTitle_complete,
          content: jobListData.list,
          pagination: pagination,
        },
        {
          title: jobListData.tabTitle_cancel,
          content: jobListData.cancelList,
          pagination: paginationCancel,
        }
      );

      if (jobListData.selectedTab.includes("게재중")) {
        jobListData.selectedTab = jobListData.tabTitle_complete;
      } else {
        jobListData.selectedTab = jobListData.tabTitle_cancel;
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      list();
    }

    function setPageCancleList(event) {
      paginationCancel.pageNo = event;
      list();
    }

    function withdrawPaidProduct(status, paid_feature) {
      let paid_feature_len = paid_feature.split(",").length;

      if (paid_feature_len >= 2 && status === "readytopublish") {
        // if (paid_feature_len > 2) {
        store.state.isPaidProductCancelModal = true;
      } else {
        jobListData.isWithdrawPaidFeatureModal = true;
      }
    }

    function paid_feature(array) {
      if(array !== null) {
      var actual_Value = "";
      let paid_feature_name = array.split(",");
      // console.log(paid_feature_name)
      let paidFeature = [
        {
          name: "긴급",
          value: "emergency",
        },
        {
          name: "프리미엄",
          value: "premium",
        },
        {
          name: "스페셜",
          value: "special",
        },
        {
          name: "라인",
          value: "line",
        },
        {
          name: "무료공고",
          value: "free",
        },
        {
          name: "업글",
          value: "upgle",
        },
      ];
      paid_feature_name.forEach((element,i) => {
        paidFeature.forEach((e) => {
          // console.log(element + '== '  +e.value)
          if (element === e.value) {
            actual_Value = actual_Value + e.name + ', '
          }
        });
      });
      actual_Value = actual_Value.slice(0,-2)
      return actual_Value;
      }
    }

    const applyAutomaticPost = async () => {
      try{
            let res = await jobListing.automatiocApplyJob();
            store.state.showAutomatiocJobPostSheet = false
            redirectionModal.value = true
        } catch(e) {
            console.log(e)
        }
    }

    return {
      myFunction,
      jobListData,
      store,
      setPage,
      setPageCancleList,
      withdrawPaidProduct,
      list,
      paid_feature,
      applyAutomaticPost,
      redirectionModal,
      pagination,
      paginationCancel,
    };
  },

  //  mounted(){
  //     var elements = document.getElementsByClassName('toggle')

  // 	for (let i = 0; i < elements.length; i++) {
  // 		const element = elements[i];
  // 		element.addEventListener("click", myFunction);
  // 	}

  // 	function myFunction() {
  // 		var parent = this.parentElement
  //         console.log(parent)
  // 		var hide_box = parent.querySelector('.job-feature-dropdown')
  // 		var list = hide_box.classList
  //         console.log(list)

  // 		if (list.contains('show')) {
  // 			list.remove('show')
  // 		} else {
  //             console.log(elements)
  // 			for (let i = 0; i < elements.length; i++) {
  // 				elements[i].parentElement.querySelector('.job-feature-dropdown').classList.remove('show')
  // 			}
  // 			list.add('show')
  // 		}
  // 	}
  //   }
};
</script>
<style scoped>
.hand-pointer {
  cursor: pointer !important;
}
</style>
