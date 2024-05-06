<template>
    <div>
    <div class="common-sec back-wh">
      <div class="top-hdr top-hdr-br mb-0">
        <div class="container">
          <h4 class="heading">
            <div class="innr-search">
              <a href="javascript:void(0);" class="left-arrow" ><img src="@/assets/icons/left-arrow.svg" alt="" @click="$router.go(-1)"/></a
              ><span>자동 채용공고 등록</span>
            </div>
          </h4>
        </div>
      </div>
      <div class="container">
        <div class="employment-tab">
            <div class="tab-content">
                <div class="outerside outerside-nodata">
                    <div class="heading">신청 리스트</div>
                        <div class="tab-inner-cont">
                        <div v-if="automaticJobPostData.lists.length === 0">
                            <NoData>
                                <template v-slot:no-data-image>
                                <img
                                    class="no-job-icon"
                                    src="@/assets/icons/no-job-icon.svg"
                                    alt=""
                                />
                                </template>
                                <template v-slot:no-data-content>
                                    <p><span>신청하신 이력이 없습니다.</span></p>
                                </template>
                            </NoData>
                        </div>
                            <div class="jobpostingrequesthistory mb-16" v-if="automaticJobPostData.lists.length > 0">
                                <ul class="consultation-list">
                                    <li v-for="(i, e) in automaticJobPostData.lists" :key="e" class="b-color-f2">
                                        <div class="c-list-top c-list-top-right" @click="i.status === 1 ? $router.push({name: 'RecruiterJobPostingDetails', params: {id: i.job_id}}) : '' ">
                                            <h3 class="sub-heading mb-0">{{store.methods.dateFormat(i.created_at, "YYYY년 M월 D일")}}</h3>
                                            <span>
                                                <a href="javascript:void(0);" class="btn btn-progress" v-if="i.status === 0">진행중</a>
                                                <a href="javascript:void(0);" class="btn btn-declined" v-if="i.status === 2">반려</a>
                                                <a href="javascript:void(0);" class="btn btn-completed" v-if="i.status === 1">완료</a>
                                            </span>
                                        </div>
                                    </li>
                                    <!-- <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-declined">반려</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-completed">완료</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-progress">처리 완료</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-declined">반려</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-completed">완료</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-declined">반려</a>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-list-top c-list-top-right">
                                            <h3 class="sub-heading mb-0">2023.03.23</h3>
                                            <span>
                                                <a href="#" class="btn btn-completed">완료</a>
                                            </span>
                                        </div>
                                    </li> -->
                                </ul>
                            </div>
                            <button class="btn btn-outline-primary lg" @click="store.state.showAutomatiocJobPostSheet = true">자동 채용공고 등록 신청하기</button>

                            <VuePaginate
                            :limit="automaticJobPostData.limit"
                            :page="automaticJobPostData.page"
                            :totalItems="automaticJobPostData.totalItem"
                            v-on:setNumber="setPage($event)"
                        />
                        </div>
                    </div>
                    <!-- <button class="btn btn-outline-primary lg">자동 채용공고 등록 신청하기</button> -->
                </div>
            </div>
        </div>
    </div>
    <AutomatiocJobPostSheet
      v-if="store.state.showAutomatiocJobPostSheet"
      @applyAutomaticPost="applyAutomaticPost"
    />
    <RedirectionModal
      fromPage="history"
      :isModal="redirectionModal"
      @confirm="redirectionModal = false"
      @closeConfirm=" $router.push('/recruiter/job-listing')"
    />
</div>
  </template>
  
  <script>
    import { jobListing } from "@/service/API/jobListing.js";
    import VuePaginate from "@/components/Utils/VuePaginate.vue";
    import NoData from "@/components/NoData.vue";
    import { inject, onBeforeMount, reactive, ref, watch } from "@vue/runtime-core";
    import AutomatiocJobPostSheet from "../JobPostingManagement/AutomatiocJobPostSheet.vue";
    import RedirectionModal from "@/components/Modals/RedirectionModal.vue";
    import { useRouter } from "vue-router";
  export default {
    name: "AutomaticJobPostingRequestHistory",
    components: {
      NoData,
      AutomatiocJobPostSheet,
      RedirectionModal,
      VuePaginate,
    },
    setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const redirectionModal = ref(false);
    const automaticJobPostData = reactive({
    limit: 10,
    page: 1,
    totalItem: null, 
    lists: [],
  });
    
    onBeforeMount(async () => {
        await automaticJobPostListFetch();
    });
    watch(() => store.state.showAutomatiocJobPostSheet,() => {
      if (store.state.showAutomatiocJobPostSheet === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
    });

    const automaticJobPostListFetch = async () => {
      try{
            window.scrollTo(0, 0);
            let res = await jobListing.automaticJobPostList(automaticJobPostData.page, automaticJobPostData.limit);
            console.log(res.data)
            automaticJobPostData.totalItem = res.data.total_records;
            automaticJobPostData.lists = res.data.posts;
        } catch(e) {
            console.log(e)
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

    const setPage = async (event) => {
        automaticJobPostData.page = event;
        await automaticJobPostListFetch();
    };

    return {
      redirectionModal,
      automaticJobPostData,
      store,
      setPage,
      applyAutomaticPost,
    };
  },
  };
  </script>
  