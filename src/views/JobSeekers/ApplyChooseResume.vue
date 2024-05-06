<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="94%"
    v-slot="{ closeSelf }"
    v-model:visible="store.state.isApplyChooseResume"
  >
    <div :class="`common-sec back-wh ${store.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a
              href="javascript:void(0);"
              class="cross-arrow"
              @click="popClose(true, closeSelf())"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >이력서 선택
          </h4>
        </div>
      </div>
      <div class="container">
        <div class="apply-resume-heading">
          <h4>이력서 선택하기</h4>
          <p>지원할 공고에 보낼 이력서를 선택해 주세요.</p>
        </div>
      </div>
      <div class="scrap-resume-warpper">
        <!-- Code For No Data -->
        <NoData v-if="resumePageData.resumeList.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>작성한 이력서가 없습니다.</span></p>
            <p>이력서를 작성하고 구직활동을 시작해 보세요!</p>
          </template>
        </NoData>

        <!-- Code For Resume List -->
        <div class="form-wrapper" v-else>
          <form>
            <div class="container">
              <div class="resume-list-cont choose-resume-area">
                <div
                  class="form-group resume-card"
                  v-for="(item, i) in resumePageData.resumeList"
                  :key="i"
                >
                  <div class="top-row">
                    <div class="lft-part">
                      <label class="radio-input">
                        <input
                          type="radio"
                          name="radio"
                          v-model="resumePageData.selectedResumeId"
                          :value="item.id"
                        />
                        <span class="checkmark"></span>
                      </label>
                      <span class="tag-btn" v-if="item.is_default === 1"
                        >기본</span
                      >
                    </div>
                    <div class="rht-part">
                      {{
                        store.methods.dateFormat(item.created_at, "YYYY년 M월 D일")
                      }}
                    </div>
                  </div>
                  <div class="bot-row">
                    <div class="title">{{ item.resume_title }}</div>
                    <div class="sub-txt sub-txt-scrp">
                      <span>희망근무지</span>{{ item.work_places }}
                    </div>
                    <div class="sub-txt sub-txt-scrp">
                      <span>희망업직종</span>{{ item.occupations }}
                    </div>
                  </div>
                </div>
                <!-- <div class="form-group resume-card" v-for="(item,i) in resumePageData.resumeList" :key="i">
                <div class="top-row">
                  <div class="lft-part">
                    <label class="radio-input">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="tag-btn">기본</span>
                  </div>
                  <div class="rht-part">2022.06.10</div>
                </div>
                <div class="bot-row">
                  <div class="title">제목</div>
                  <div class="sub-txt"><span>희망근무지</span>서울 전체</div>
                  <div class="sub-txt">
                    <span>희망업직종</span>외식,음료 전체 / 주방장•조리사 /
                    바리스타
                  </div>
                </div>
              </div> -->
                <!-- <div class="form-group resume-card">
                <div class="top-row">
                  <div class="lft-part">
                    <label class="radio-input">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="rht-part">2022.06.10</div>
                </div>
                <div class="bot-row">
                  <div class="title">제목</div>
                  <div class="sub-txt"><span>희망근무지</span>서울 전체</div>
                  <div class="sub-txt">
                    <span>희망업직종</span>외식,음료 전체 / 주방장•조리사 /
                    바리스타
                  </div>
                </div>
              </div> -->
              </div>
            </div>

            <div class="btn-space fixed-btn-otr">
              <input
                type="button"
                value="지원하기"
                class="btn btn-primary lg"
                @click="apply()"
              />
            </div>
          </form>
        </div>
      </div>
      <ChooseResumeAlertModel
        :isModal="resumePageData.isChooseResumeAlertModel"
        @conifrmModel="resumePageData.isChooseResumeAlertModel = false"
      />
      <AlreadyJobApplyAlert
        :isModal="resumePageData.isAlreadyJobApplyAlertModel"
        @conifrmModel="resumePageData.isAlreadyJobApplyAlertModel = false"
      />
    </div>
  </Sheet>
</template>

<script>
import NoData from "@/components/NoData.vue";
import { reactive, onMounted, inject } from "vue";
import { resume } from "@/service/API/resume.js";
import { useRouter, useRoute } from "vue-router";
import ChooseResumeAlertModel from "@/components/Modals/ChooseResumeAlertModel.vue";
import AlreadyJobApplyAlert from "@/components/Modals/AlreadyJobApplyAlert.vue";

export default {
  name: "ApplyChooseResume",
  components: { NoData, ChooseResumeAlertModel, AlreadyJobApplyAlert },
  props: {
    id: Number,
    // fromPage: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const store = inject("commonStore");
    const resumePageData = reactive({
      resumeList: [],
      selectedResumeId: "",
      isChooseResumeAlertModel: false,
      isAlreadyJobApplyAlertModel: false,
    });

    onMounted(() => {
      resumeList();
    });

    async function resumeList() {
      let res = await resume.list();
      if (res.status === 200) {
        resumePageData.resumeList = res.data;
      }
    }

    async function apply() {
      if (resumePageData.selectedResumeId) {
        let userData = {
          id: props.id,
          resume_id: resumePageData.selectedResumeId,
        };
        let res = await resume.applyForJob(userData);
        if (res.status === 200) {
          if (route.name === "RecruiterJobPostingDetails") {
            emit("changeJobDetailsData");
          }
          store.state.loginInfoModal.isShow = true;
          store.state.loginInfoModal.message = "지원 완료되었습니다.";
          store.state.isApplyChooseResume = false;
        } else if (res.response.data.error === "Already Apply this job") {
          resumePageData.isAlreadyJobApplyAlertModel = true;
        }
      } else {
        resumePageData.isChooseResumeAlertModel = true;
      }
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
      apply,
      store,
      popClose,
    };
  },
};
</script>
