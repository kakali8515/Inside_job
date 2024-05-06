<template>
  <div class="back-wh common-sec common-sec-gap-two">
    <div class="top-hdr top-hdr-br mb-16">
      <div class="container">
        <h4 class="heading">
          <a @click="store.state.appStatusTab='지원 완료',$router.go(-1)" class="left-arrow">
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >지원 현황
        </h4>
      </div>
    </div>
    <div class="container">
      <div class="tab-outr pr-tab tab-wd">
        <div class="tabs">
          <div class="tabs-otr">
            <ul class="tabs-header">
              <li
                v-for="(data, i) in applicationData.allList"
                :class="{ active: data.title == store.state.appStatusTab }"
                :key="i"
                @click="store.state.appStatusTab = data.title,data.title.includes('지원 완료') ? pagination.pageNo = 1 : paginationCancel.pageNo = 1"
              >
                <!-- :class="{ active: title == selectedTitle }" -->

                <span>{{ data.title }}</span>
              </li>
            </ul>
          </div>
          <div
            v-show="data.title == store.state.appStatusTab"
            class="tab-content"
            v-for="(data, index) in applicationData.allList"
            :key="index"
          >
            <div
              class="cm-top-space pb-16"
            >
              <div class="sub-otr mb-21 b-color">
                <h3 class="sub-heading mb-0">지원 리스트</h3>
              </div>
              <!-- Code For No Data -->
              <NoData v-if="data.content?.length == 0">
                <template v-slot:no-data-image>
                  <img
                    class="no-job-icon"
                    src="@/assets/icons/no-job-icon.svg"
                    alt=""
                  />
                </template>
                <template v-slot:no-data-content>
                  <p><span>지원현황이 없습니다.</span></p>
                  <p>최근 지원내역이 없습니다.</p>
                </template>
              </NoData>
              <!-- end -->
              <div class="document-list-otr radios-0">
                <div
                  class="document-list"
                  v-for="(item, i) in data.content"
                  :key="i"
                >
                  <div class="d-flex mb-12">
                    <h4 class="mb-0">[{{ item.announcement_title }}]</h4>
                    <span v-if="data.title.includes('지원 완료')">
                      <span class="btn rd-12" v-if="item.is_read === 0"
                        >미열람</span
                      >
                      <span class="btn rd-12 red" v-else>열람</span>
                    </span>
                    <span v-else>
                      <span
                        class="btn rd-12"
                        v-if="item.status === 'Cancelation of application'"
                        >지원취소</span
                      >
                    </span>
                  </div>
                  <ul class="sup-list">
                    <li>
                      <em>지원일</em
                      ><span>{{
                        store.methods.dateFormat(item.created_at, "YYYY년 M월 D일")
                      }}</span>
                    </li>
                    <li>
                      <em>지원이력서</em> <span>{{ item.resume_title }}</span>
                    </li>
                  </ul>

                  <div class="doc-btn-group">
                    <!-- cancelApplication(item.job_id,item.resume_id) -->
                    <a
                      v-if="data.title.includes('지원 완료')"
                      @click="
                        addCancelApplicationModal(
                          $event,
                          item.id,
                          item.resume_id
                        )
                      "
                      class="doc-btn-innr"
                      >지원 취소
                      <span
                        ><img
                          src="@/assets/icons/cross-gray.svg"
                          alt="" /></span
                    ></a>
                    <a
                      href="javascript:void(0);"
                      :class="data.title.includes('지원 완료') ? '' : 'w-100'"
                      class="doc-btn-innr"
                      @click="checkResume(item.resume_id)"
                      >지원이력서 보기
                      <!-- @click="$router.push(`/recruiter/applicant-information/${item.resume_id}`)" -->
                      <span
                        ><img src="@/assets/icons/doc-icon2.svg" alt="" /></span
                    ></a>
                  </div>
                </div>
              </div>

              <!-- <Pagination
                v-if="
                  data.title.includes('지원 완료') && data.content?.length !== 0
                "
                :totalRecords="data.pagination.totalRecords"
                v-on:setNumber="setPage($event)"
              />
              <Pagination
                v-if="
                  data.title.includes('지원 취소') && data.content?.length !== 0
                "
                :totalRecords="data.pagination.totalRecords"
                v-on:setNumber="setPageCancleList($event)"
              /> -->

              <VuePaginate
                v-if="data.title.includes('지원 완료') && data.content?.length !== 0"
                :limit="pagination.perPage"
                :page="pagination.pageNo"
                :totalItems="data.pagination.totalRecords"
                v-on:setNumber="setPage($event)"
              />
              <VuePaginate
                 v-if="data.title.includes('지원 취소') && data.content?.length !== 0"
                :limit="paginationCancel.perPage"
                :page="paginationCancel.pageNo"
                :totalItems="data.pagination.totalRecords"
                v-on:setNumber="setPageCancleList($event)"
              />
            </div>
          </div>
        </div>

        <!-- <DynamicTabWrapper
          @getResponseTitle="getTitle($event)"
          v-if="applicationData.allList.length > 0"
        >
          <Tabs
            :title="data.title"
            v-for="(data, index) in applicationData.allList"
            :key="index"
          >
            <div class="cm-top-space pb-32">
              <div class="sub-otr mb-21 b-color">
                <h3 class="sub-heading mb-0">지원 리스트</h3>
              </div>

              <NoData v-if="data.content?.length == 0">
                <template v-slot:no-data-image>
                  <img
                    class="no-job-icon"
                    src="@/assets/icons/no-job-icon.svg"
                    alt=""
                  />
                </template>
                <template v-slot:no-data-content>
                  <p><span>지원현황이 없습니다.</span></p>
                  <p>최근 지원내역이 없습니다.</p>
                </template>
              </NoData>

              <div class="document-list-otr radios-0">
                <div
                  class="document-list"
                  v-for="(item, i) in data.content"
                  :key="i"
                >
                  <div class="d-flex mb-16">
                    <h4 class="mb-0">[{{ item.announcement_title }}]</h4>
                    <span v-if="data.title.includes('지원 완료')">
                      <span class="btn rd-12" v-if="item.is_read === 1"
                        >미열람</span
                      >
                      <span class="btn rd-12 red" v-else>열람</span>
                    </span>
                    <span v-else>
                      <span
                        class="btn rd-12"
                        v-if="item.status === 'Cancelation of application'"
                        >지원취소</span
                      >
                    </span>
                  </div>
                  <ul class="sup-list">
                    <li>
                      <em>지원일</em
                      ><span>{{
                        store.methods.dateFormat(item.created_at, "YYYY.MM.DD")
                      }}</span>
                    </li>
                    <li>
                      <em>지원이력서</em> <span>{{ item.resume_title }}</span>
                    </li>
                  </ul>

                  <div class="doc-btn-group">
                    <a
                      v-if="data.title.includes('지원 완료')"
                      @click="
                        addCancelApplicationModal(
                          $event,
                          item.id,
                          item.resume_id
                        )
                      "
                      class="doc-btn-innr"
                      >지원 취소
                      <span
                        ><img
                          src="@/assets/icons/cross-gray.svg"
                          alt="" /></span
                    ></a>
                    <a
                      href="javascript:void(0);"
                      :class="data.title.includes('지원 완료') ? '' : 'w-100'"
                      class="doc-btn-innr"
                      >지원이력서 보기
                      <span
                        ><img src="@/assets/icons/doc-icon2.svg" alt="" /></span
                    ></a>
                  </div>
                </div>
              </div>

              <Pagination
                v-if="
                  data.title.includes('지원 완료') && data.content?.length !== 0
                "
                :totalRecords="data.pagination.totalRecords"
                v-on:setNumber="setPage($event)"
              />
              <Pagination
                v-if="
                  data.title.includes('지원 취소') && data.content?.length !== 0
                "
                :totalRecords="data.pagination.totalRecords"
                v-on:setNumber="setPage($event)"
              />
            </div>
          </Tabs>
        </DynamicTabWrapper> -->
      </div>
    </div>
    <CancelApplication
      @cancelModel="store.state.isCancleApplication = false"
      @conifrmModel="cancelApplication"
    />
    <CancelApplicationConfirmation
      :isModal="applicationData.isCancelApplicationConfirmModel"
      @conifrmModel="
        (applicationData.isCancelApplicationConfirmModel = false), list()
      "
    />
  </div>
  <div
    class="btm-button-group fixed-btn-otr"
    v-if="
      store.state.appStatusTab.includes('지원 완료') &&
      applicationData.list.length === 0
    "
  >
    <a @click="$router.push('search')" class="btn btn-primary lg">지원하기</a>
  </div>
  <div
    class="btm-button-group"
    v-if="
      store.state.appStatusTab.includes('지원 취소') &&
      applicationData.cancelList.length === 0
    "
  >
    <a @click="$router.push('search')" class="btn btn-primary lg">지원하기</a>
  </div>

  <ResumeNotExistsAlert 
  :isModal="applicationData.isResumeNotExistsAlert" 
  @conifrmModel="applicationData.isResumeNotExistsAlert = false" />
</template>


<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { onMounted, reactive, inject, watch } from "vue";
import { ApplicationStatus } from "@/service/API/ApplicationStatus.js";
import CancelApplication from "./CancelApplication.vue";
import CancelApplicationConfirmation from "@/components/Modals/CancelApplicationConfirmation.vue";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import NoData from "@/components/NoData.vue";
// import Pagination from "@/components/Pagination.vue";
import { resume } from "@/service/API/resume.js";
import ResumeNotExistsAlert from "@/components/Modals/ResumeNotExistsAlert.vue";
import { useRouter } from 'vue-router';
import VuePaginate from "@/components/Utils/VuePaginate.vue";


export default {
  name: "ApplicationStatus",
  components: {
    Tabs,
    TabWrapper,
    DynamicTabWrapper,
    CancelApplication,
    CancelApplicationConfirmation,
    NoData,
    VuePaginate,
    ResumeNotExistsAlert,
  },

  setup() {
    const store = inject("commonStore");
    const router = useRouter()
    const applicationData = reactive({
      allList: [],
      list: [],
      cancelList: [],
      tabTitle_complete: "",
      tabTitle_cancel: "",
      isCancelApplicationConfirmModel: false,
      application_id: 0,
      resume_id: 0,
      selectedTab: "지원 완료",
      isResumeNotExistsAlert: false,
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

    onMounted(() => {
      list();
    });

    watch(
      () => store.state.isCancleApplication,
      (newVal, oldVal) => {
        if (newVal) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    async function list() {
      let parms = {
        page: pagination.pageNo,
        limit: pagination.perPage,
      };
      let res = await ApplicationStatus.list(parms);
      let res2 = await ApplicationStatus.cancelList({
        page: paginationCancel.pageNo,
        limit: paginationCancel.perPage,
      });
      //complete application list
      applicationData.list = res?.data?.posts;
      applicationData.tabTitle_complete = `지원 완료 (${res.data?.total_records})`;
      pagination.perPage = res.data?.pagination_limit;
      pagination.totalRecords =res.data?.total_records

      //cancel application list
      applicationData.cancelList = res2?.data?.posts;
      applicationData.tabTitle_cancel = `지원 취소 (${res2.data?.total_records})`;
      paginationCancel.perPage = res2.data?.pagination_limit;
      paginationCancel.totalRecords = res2.data?.total_records

      applicationData.allList = [];
      applicationData.allList.push(
        {
          title: applicationData.tabTitle_complete,
          content: applicationData.list,
          pagination: pagination,
        },
        {
          title: applicationData.tabTitle_cancel,
          content: applicationData.cancelList,
          pagination: paginationCancel,
        }
      );

      if (store.state.appStatusTab.includes("지원 완료")) {
        store.state.appStatusTab = applicationData.tabTitle_complete;
      } else {
        store.state.appStatusTab = applicationData.tabTitle_cancel;
      }
    }

    async function cancelApplication(reason) {
      let userData = {
        resume_id: applicationData.resume_id.toString(),
        reason_for_cancel: reason,
      };
      let res = await ApplicationStatus.cancelApplication(
        applicationData.application_id,
        userData
      );
      if (res.status === 200) {
        store.state.isCancleApplication = false;
        applicationData.isCancelApplicationConfirmModel = true;
      }
    }

    const addCancelApplicationModal = (e, application_id, resume_id) => {
      e.preventDefault();
      store.state.isCancleApplication = true;
      applicationData.application_id = application_id;
      applicationData.resume_id = resume_id;
    };

    function setPage(event) {
      pagination.pageNo = event;
      list();
      window.scrollTo(0, 0);
    }

    function setPageCancleList(event) {
      paginationCancel.pageNo = event;
      list();
      window.scrollTo(0, 0);
    }

    async function checkResume(id) {
      let res = await resume.viewResume(id);
      console.log(res)
      if (res.status === 200) {
        router.push(`/recruiter/applicant-information/${id}`)
      } else if(res.response.data.error === 'resumeNotExists') {
        applicationData.isResumeNotExistsAlert = true
        // store.state.appStatusTab = applicationData.selectedTab
      }
    }

    //  function getTitle(e) {
    //   applicationData.selectedTab = e;
    // }

    return {
      applicationData,
      store,
      cancelApplication,
      addCancelApplicationModal,
      pagination,
      paginationCancel,
      list,
      setPage,
      setPageCancleList,
      checkResume,
    };
  },
};
</script>
