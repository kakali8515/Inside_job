<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br mb-16">
      <div class="container">
        <InnerHeader headerTitle="근로계약서" @backButtonPressed="goBackTo" />
      </div>
    </div>
    <div class="container">
      <div class="employment-tab">
        <div class="tab-outr">
          <div class="tabs">
            <div class="tabs-otr">
              <ul class="tabs-header">
                <li
                  :class="`${
                    pagination.tabType == 'inProgress' ? 'active' : ''
                  }`"
                  @click="setTitleTabId(0)"
                >
                  진행중 ({{ tabTitle_inprogress }})
                </li>
                <li
                  :class="`${
                    pagination.tabType != 'inProgress' ? 'active' : ''
                  }`"
                  @click="setTitleTabId(1)"
                >
                  진행완료 ({{ tabTitle_complete }})
                </li>
              </ul>
            </div>
          </div>

          <div class="tab-content">
            <div class="outerside">
              <div class="heading">문서 리스트</div>
              <template v-if="pagination.tabType == 'inProgress'">
                <div class="tab-inner-cont">
                  <!-- Code For No Data -->
                  <NoData v-if="inprogressListEmpty">
                    <template v-slot:no-data-image>
                      <img
                        class="no-job-icon"
                        src="@/assets/icons/no-job-icon.svg"
                        alt=""
                      />
                    </template>
                    <template v-slot:no-data-content>
                      <p><span>진행중인 근로계약서가 없습니다.</span></p>
                      <!-- <p>다양한 채용정보가 여러분을 기다리고 있습니다!</p> -->
                    </template>
                  </NoData>
                  <!--  -->
                  <div
                    class="labor-contaract-card"
                    v-for="(item, id) in inprogress_list"
                    :key="id"
                    @click.prevent="CheckDetails(item)"
                  >
                    <EmploymentContractCard>
                      <template v-slot:employ-contract-heading>
                        <h5>{{ item.company_name }}</h5>
                      </template>
                      <template v-slot:employ-contract-contant>
                        <p>
                          {{
                            commonStore.methods.dateFormat(
                              item.created_at,
                              "YYYY년 M월 D일"
                            )
                          }}
                        </p>
                        <a
                          href="#"
                          :class="`btn ${
                            item.status === 'pending'
                              ? 'btn-default-red'
                              : item.status === 'accepted'
                              ? 'btn-primary'
                              : 'btn-default'
                          }`"
                          >{{
                            item.status === "pending"
                              ? "진행중"
                              : item.status === "accepted"
                              ? "승인"
                              : "반려"
                          }}</a
                        >
                      </template>
                    </EmploymentContractCard>
                  </div>
                  <div class="mb-60">
                    <VuePaginate
                      :limit="pagination.perPage"
                      :page="pagination.pageNo"
                      :totalItems="pagination.totalRecords"
                      v-on:setNumber="setPage($event)"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="tab-inner-cont">
                  <!-- Code For No Data -->
                  <NoData v-if="completedListEmpty">
                    <template v-slot:no-data-image>
                      <img
                        class="no-job-icon"
                        src="@/assets/icons/no-job-icon.svg"
                        alt=""
                      />
                    </template>
                    <template v-slot:no-data-content>
                      <p><span>진행중인 근로계약서가 없습니다.</span></p>
                      <!-- <p>다양한 채용정보가 여러분을 기다리고 있습니다!</p> -->
                    </template>
                  </NoData>
                  <!--  -->
                  <div
                    class="labor-contaract-card"
                    v-for="(item, id) in completed_list"
                    :key="id"
                    @click.prevent="CheckDetails(item)"
                  >
                    <EmploymentContractCard>
                      <template v-slot:employ-contract-heading>
                        <h5>{{ item.company_name }}</h5>
                      </template>
                      <template v-slot:employ-contract-contant>
                        <p>
                          {{
                            commonStore.methods.dateFormat(
                              item.created_at,
                              "YYYY년 M월 D일"
                            )
                          }}
                        </p>
                        <a
                          href="#"
                          :class="`btn ${
                            item.status === 'pending'
                              ? 'btn-default-red'
                              : item.status === 'accepted' &&
                                authStore.state.loginType === 'job_recruiter'
                              ? 'btn-primary'
                              : 'btn-default'
                          }`"
                          >{{
                            item.status === "pending"
                              ? "진행중"
                              : item.status === "accepted" &&
                                authStore.state.loginType === "job_recruiter"
                              ? "완료"
                              : item.status === "accepted" &&
                                authStore.state.loginType !== "job_recruiter"
                              ? "처리 완료"
                              : "반려"
                          }}</a
                        >
                      </template>
                    </EmploymentContractCard>
                  </div>
                  <!-- <Pagination
                    :totalRecords="pagination.totalRecords"
                    v-on:setNumber="setPage($event)"
                  /> -->
                  <div class="mb-60">
                    <VuePaginate
                      :limit="pagination.perPage"
                      :page="pagination.pageNo"
                      :totalItems="pagination.totalRecords"
                      v-on:setNumber="setPage($event)"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="btm-button-group fixed-btn-otr"
    v-if="authStore.state.loginType === 'job_recruiter'"
  >
    <router-link
      :to="{ name: 'EmploymentContractWritingStepOne' }"
      class="btn btn-primary lg"
      >근로계약서 작성하기</router-link
    >
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import EmploymentContractCard from "@/components/EmploymentContractCard.vue";
import NoData from "@/components/NoData.vue";
import { employmentService } from "@/service/API/EmplymentContract.js";
import { ref, reactive } from "@vue/reactivity";
import { inject, onBeforeMount, watch } from "@vue/runtime-core";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
export default {
  name: "LaborContract",
  components: {
    InnerHeader,
    Tabs,
    TabWrapper,
    EmploymentContractCard,
    NoData,
    DynamicTabWrapper,
    Pagination,
    VuePaginate,
  },

  setup() {
    const inprogress_list = ref([]);
    const inprogressListEmpty = ref(false);
    const completed_list = ref([]);
    const completedListEmpty = ref(false);
    const employmentList = ref([]);
    const tabTitle_inprogress = ref(0);
    const tabTitle_complete = ref(0);
    const tabState = ref("");
    const commonStore = inject("commonStore");
    const employmentStore = inject("employmentStore");
    const authStore = inject("authenticateStore");
    const router = useRouter();
    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
      tabType: "inProgress",
    });

    onBeforeMount(() => {
      // pagination.tabType = "inProgress";
      if (authStore.state.loginType == "job_recruiter") {
        getEmploymentListRecuiter();
      } else {
        getEmploymentList();
      }
      if (employmentStore.state.contractListTabState == 0) {
        pagination.tabType = "inProgress";
      } else {
        pagination.tabType = "completed";
      }
    });

    const getEmploymentList = async () => {
      // employmentList.value = [];
      let res = await employmentService.pendingList(
        pagination.tabType == "inProgress" ? pagination.pageNo : 1,
        pagination.perPage
      );
      let res2 = await employmentService.approvedList(
        pagination.tabType == "completed" ? pagination.pageNo : 1,
        pagination.perPage
      );
      // console.log(res);
      inprogress_list.value = res?.data?.posts;
      tabTitle_inprogress.value = res?.data?.total_records;
      completed_list.value = res2?.data?.posts;
      if (res2?.data?.posts.length == 0) {
        completedListEmpty.value = true;
      }
      if (res?.data?.posts.length == 0) {
        inprogressListEmpty.value = true;
      }
      tabTitle_complete.value = res2?.data?.total_records;
      if (pagination.tabType == "inProgress") {
        pagination.totalRecords = res?.data?.total_records;
      } else {
        pagination.totalRecords = res2?.data?.total_records;
      }
      // employmentList.value = [
      //   {
      //     title: tabTitle_inprogress.value,
      //     content: inprogress_list.value,
      //     totalItems: Math.ceil(res?.data?.total_records / pagination.perPage),
      //   },
      //   {
      //     title: tabTitle_complete.value,
      //     content: completed_list.value,
      //     totalItems: Math.ceil(res2?.data?.total_records / pagination.perPage),
      //   },
      // ];

      // console.log(employmentList.value, "employmentList.value");
    };

    // const getEmploymentListInprogress = async () => {
    //   let res = await employmentService.pendingList(
    //     pagination.tabType == "inProgress" ? pagination.pageNo : 1,
    //     pagination.perPage
    //   );
    //   inprogress_list.value = res?.data?.posts;
    //   pagination.totalRecords = Math.ceil(
    //     res?.data?.total_records / pagination.perPage
    //   );
    // };

    // async function getEmploymentListCompleted () {
    //   let res2 = await employmentService.approvedList(
    //     pagination.tabType == "completed" ? pagination.pageNo : 1,
    //     pagination.perPage
    //   );
    // }

    const getEmploymentListRecuiter = async () => {
      employmentList.value = [];
      let res = await employmentService.recruiterPendingList(
        pagination.tabType == "inProgress" ? pagination.pageNo : 1,
        pagination.perPage
      );
      let res2 = await employmentService.recruiterApprovedList(
        pagination.tabType == "completed" ? pagination.pageNo : 1,
        pagination.perPage
      );
      // console.log(res);
      inprogress_list.value = res?.data?.posts;
      tabTitle_inprogress.value = res?.data?.total_records;
      completed_list.value = res2?.data?.posts;
      tabTitle_complete.value = res2?.data?.total_records;
      if (res2?.data?.posts.length == 0) {
        completedListEmpty.value = true;
      }
      if (res?.data?.posts.length == 0) {
        inprogressListEmpty.value = true;
      }
      if (pagination.tabType == "inProgress") {
        pagination.totalRecords = res?.data?.total_records;
      } else {
        pagination.totalRecords = res2?.data?.total_records;
      }
    };

    const CheckDetails = (ele) => {
      employmentStore.state.contractDetailsState = ele.status;
      if (ele.status === "pending" || ele.status === "accepted") {
        router.push({
          name: "LaborContractDetails",
          params: {
            id: ele.id,
            type: ele.status,
          },
        });
      } else {
        router.push({
          name: "LaborContractDetails",
          params: {
            id: ele.id,
            type: "rejected",
          },
        });
      }
    };

    function setPage(event) {
      pagination.pageNo = event;
      window.scrollTo(0, 0);
      if (authStore.state.loginType !== "job_recruiter") {
        getEmploymentList();
      } else {
        getEmploymentListRecuiter();
      }
    }

    function setTitleTabId(event) {
      // console.log("clicked");
      employmentStore.state.contractListTabState = event;
    }

    function goBackTo() {
      // console.log("back button clicked");
      employmentStore.state.contractListTabState = 0;
      pagination.tabType = "inProgress";
      // router.go(-1);
      router.currentRoute.value.query.fromPage === "notification"
        ? router.go(-1)
        : router.push({ name: "home" });
      // router.push({ name: 'home' })
    }

    watch(
      () => employmentStore.state.contractListTabState,
      (newVal, oldVal) => {
        if (newVal == 0) {
          pagination.tabType = "inProgress";
          pagination.pageNo = 1;
          pagination.totalRecords = tabTitle_inprogress.value;
        } else {
          pagination.tabType = "completed";
          pagination.pageNo = 1;
          pagination.totalRecords = tabTitle_complete.value;
        }
      }
    );

    return {
      inprogress_list,
      completed_list,
      tabTitle_inprogress,
      tabTitle_complete,
      employmentList,
      commonStore,
      authStore,
      employmentStore,
      pagination,
      inprogressListEmpty,
      completedListEmpty,
      setPage,
      CheckDetails,
      setTitleTabId,
      goBackTo,
    };
  },
};
</script>
