<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="94%"
    v-slot="{ closeSelf }"
    v-model:visible="store.state.isMultijobPostingModal"
  >
    <div :class="`common-sec back-wh ${store.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new mb-0">
        <div class="container">
          <h4 class="heading">
            <a
              href="javascript:void(0);"
              class="cross-arrow"
              @click="popClose(true, closeSelf())"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >공고 리스트
          </h4>
        </div>
      </div>

      <div class="container">
        <div >
          <div class="scrap-warpper p-0">
            <div class="sub-otr mb-21 b-color">
              <h3 class="sub-heading mb-0">공고 리스트</h3>
            </div>
            <!-- Code For No Data -->
            <!-- <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>AI 추천 조건이 없습니다.</span></p>
                            <p>나에게 맞는 채용정보를 조건을 설정해 확인해보세요! </p>
                        </template>
                    </NoData>         -->
          </div>
        </div>
        <div class="card-list">
          <div class="card-list ai-recommed-list">
            <div
              class="card-list-innr"
              v-for="item in resumePageData.resumeList"
              :key="item.id"
              @click="
                $router.push({
                  name: 'RecruiterJobPostingDetails',
                  params: { id: item.id },
                })
              "
            >
              <div class="slider-wrap">
                <div class="slider-content">
                 <div style="display: flex;justify-content: space-between;">
                  <div>
                  <h5>{{ item.company_name }}</h5>
                  <h3>
                    [{{ item.company_name }}]{{ item.announcement_title }}
                  </h3>
                </div>
                <span class="bookmark" v-show="loginType == 'job_seeker'">
                    <img
                      @click="
                        addtoScarp($event, item.id),
                          loginType == 'job_seeker' ||
                          loginType == 'job_recruiter'
                            ? (item.is_scraps = 1)
                            : item.is_scraps == 0
                      "
                      v-show="item.is_scraps == 0"
                      src="@/assets/icons/bookmark-icon.svg"
                      alt=""
                    />
                    <img
                      v-show="item.is_scraps == 1"
                      @click="
                        deleteScarp($event,item.scrap_id),
                          loginType == 'job_seeker' ||
                          loginType == 'job_recruiter'
                            ? (item.is_scraps = 0)
                            : item.is_scraps == 1
                      "
                      src="@/assets/icons/bookmark-red-icon.svg"
                      alt=""
                    />
                  </span>
                </div>
                  <div class="btm-content" style="display: flex;justify-content: space-between;">
                    <h6>
                      <b style="display: inline;padding-right: 5px;">
                        {{ item.rf_text }},
                        {{ item.rs_text }},
                        {{ item.rt_text }}
                      </b>
                      <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                      <span style="" v-if="item.pay_type === 'hourly_wage'"
                        >시급</span
                      >
                      <span style="" v-if="item.pay_type === 'daily_wage'"
                        >일급</span
                      >
                      <span style="" v-if="item.pay_type === 'salary'"
                        >월급</span
                      >
                      {{ store.methods.formatSalary(item.salary) }}원
                    </h6>
                    <span v-if="(isLogin && authStore.state.loginType == 'job_seeker') || !isLogin"
                      class="btn btn-primary-gradient apply-btn"
                      @click="setresume($event, item.id)"
                      >지원하기</span
                    >
                    <!-- @click="setresume($event, item.id)" -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scrapped-icon scrapped-icon-transform act  model-scrap" v-if="store.state.popupMessageShow">
      <p><span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span> 스크랩했습니다.</p>
    </div>
       
  </Sheet>
  <!-- <div
    class="scrapped-icon scrapped-icon-transform act region_scrap model-scrap"
    v-show="popupMessageShow"
  >
    <p>
      <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
      스크랩했습니다.
    </p>
  </div> -->
  <ApplyChooseResume :id="store.state.job_id" v-if="store.state.isApplyChooseResume" />
</template>

<script>
import NoData from "@/components/NoData.vue";
import ApplyChooseResume from "../JobSeekers/ApplyChooseResume.vue";
import mapService from "../../service/API/region";
import { reactive, onMounted, inject, onUpdated, computed, onBeforeMount } from "vue";
import { resume } from "@/service/API/resume.js";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "MultipleJobList",
  components: { NoData, ApplyChooseResume },
  props: {
    jobarray: Array,
    // fromPage: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const store = inject("commonStore");
    const loginType = localStorage.getItem("login_type");
    let popupMessageShow = false;
    const service = new mapService();
    const authStore = inject("authenticateStore");
    const isLogin = computed(() => (authStore.state.token ? true : false));
    const resumePageData = reactive({
      resumeList: [],
    });

    onMounted(() => {
      // resumeList();
    });
    onUpdated(() => {
      // console.log("hello", props.jobarray[0].id);
      resumePageData.resumeList = props.jobarray;
    });
    function setresume(e, id) {
      e.stopPropagation();
      store.state.isApplyChooseResume = true;
      store.state.job_id = id;
    }
    async function resumeList() {
      let res = await resume.list();
      if (res.status === 200) {
        resumePageData.resumeList = res.data;
      }
    }
    function addtoScarp(e, input) {
      e.stopPropagation();
      service.addscarp({ id: input }).then((res) => {
        console.log(res);
        // this.hellomap();
        store.methods.scrappedSuccessful()
        // popupMessageShow = true;
        // setTimeout(() => {
        //   popupMessageShow = false;
        // }, 4000);
      });
    }
    function deleteScarp(e, input) {
      e.stopPropagation();
      service
        .deletescarp({ id: [input] })
        .then((res) => {
          console.log(res);
          // this.hellomap();
        })
        .catch((err) => console.log(err));
    }

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    return {
      resumePageData,
      resumeList,
      store,
      popClose,
      setresume,
      addtoScarp,
      deleteScarp,
      loginType,
      popupMessageShow,
      authStore,
      isLogin,
    };
  },
};
</script>
