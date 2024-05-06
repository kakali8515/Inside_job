<template>
  <div
    v-if="Object.keys(jobDetailsData).length !== 0"
    :class="[
      store.state.loginType == 'job_recruiter' &&
      jobDetailsData.employer_id != userId &&
      (jobDetailsData.status != 'readytopublish' ||
        jobDetailsData.status != 'published')
        ? ''
        : 'pb-66',
    ]"
  >
    <div class="back-wh">
      <div class="top-hdr top-hdr-br">
        <div class="container">
          <h4 class="heading">
            <a href="javascript:void(0);" class="left-arrow">
              <img
                src="@/assets/icons/left-arrow.svg"
                alt=""
                @click="
                  (commonStore.state.isMultijobPostingModal = false),
                    $router.go(-1)
                " /></a
            >채용공고
          </h4>
        </div>
      </div>
      <div class="container">
        <PostSlider :companyImage="jobDetailsData.background_pictures" />
        <div class="post-details">
          <p class="date">
            {{
              commonStore.methods.dateFormat(
                jobDetailsData.created_at,
                "YYYY년 M월 D일"
              )
            }}
          </p>
          <div class="rating-otr devide-star">
            <h5>
              <span v-if="jobDetailsData.company_profile_img !== null"
                ><img :src="jobDetailsData.company_profile_img" alt=""
              /></span>
              <span v-if="jobDetailsData.company_profile_img === null"
                ><img src="@/assets/images/mypage-profile-img.png" alt=""
              /></span>
              {{ jobDetailsData.company_name }}
            </h5>
            <p v-if="jobDetailsData.employer_rating === 0">
              <span><img src="@/assets/icons/star.svg" alt="" /></span>
              <span class="star-mid">5</span>
            </p>
            <p v-if="jobDetailsData.employer_rating !== 0">
              <span><img src="@/assets/icons/star.svg" alt="" /></span>
              <span class="star-mid">{{ jobDetailsData.employer_rating }}</span>
            </p>
          </div>
          <div class="sub-otr mb-16 b-color-f2">
            <h3 class="sub-heading lg mb-0">
              {{ jobDetailsData.announcement_title }}
            </h3>
          </div>
          <ul>
            <li>
              {{ jobDetailsData.region_1st_depth_name }}
              {{ jobDetailsData.region_2nd_depth_name }}
            </li>
            <!-- <li
              v-if="
                jobDetailsData.region_2nd_depth_name == null &&
                jobDetailsData.region_3rd_depth_name == null &&
                jobDetailsData.region_1st_depth_name !== null
              "
            >
              {{ jobDetailsData.region_1st_depth_name }} 전체
            </li>
            <li
              v-if="
                jobDetailsData.region_3rd_depth_name == null &&
                jobDetailsData.region_1st_depth_name !== null &&
                jobDetailsData.region_2nd_depth_name !== null
              "
            >
              {{ jobDetailsData.region_2nd_depth_name }} 전체
            </li>
            <li v-if="jobDetailsData.region_3rd_depth_name !== null">
              {{ jobDetailsData.region_3rd_depth_name }} 전체
            </li> -->
            <li v-if="jobDetailsData.pay_type == 'hourly_wage'">시급</li>
            <li v-if="jobDetailsData.pay_type == 'daily_wage'">일급</li>
            <li v-if="jobDetailsData.pay_type == 'salary'">월급</li>

            <li v-if="jobDetailsData.education == 'elementary_school'">
              초등학교
            </li>
            <li v-if="jobDetailsData.education == 'middle_school'">중학교</li>
            <li v-if="jobDetailsData.education == 'high_school'">고등학교</li>
            <li v-if="jobDetailsData.education == 'university_2_or_3_years'">
              대학(2,3년제)
            </li>
            <li v-if="jobDetailsData.education == 'university_4_years'">
              대학(4년제)
            </li>
            <li v-if="jobDetailsData.education == 'graduate_school'">대학원</li>

            <li v-if="jobDetailsData.gender == 'any'">성별무관</li>
            <li v-if="jobDetailsData.gender == 'male'">남자</li>
            <li v-if="jobDetailsData.gender == 'female'">여자</li>
            <!-- <li v-if="jobDetailsData.gender !== 'any'">
              {{ jobDetailsData.gender }}
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container job-post-details">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">근무조건</h3>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">급여</p>
              <p class="p-right red">
                <span v-if="jobDetailsData.pay_type == 'hourly_wage'"
                  >시급</span
                >
                <span v-if="jobDetailsData.pay_type == 'daily_wage'">일급</span>
                <span v-if="jobDetailsData.pay_type == 'salary'">월급</span>

                {{ (jobDetailsData.salary * 1).toLocaleString("en-US") }} 원
              </p>
            </li>
            <li class="bg-none-span">
              <p class="p-left">근무형태</p>
              <p class="p-right p-right-span">
                <span v-if="jobDetailsData.work_type == 'part_time_job'"
                  >아르바이트</span
                >
                <span v-if="jobDetailsData.work_type == 'full_time'"
                  >정규직</span
                >
                <span v-if="jobDetailsData.work_type == 'contract_worker'"
                  >계약직</span
                >
                <span v-if="jobDetailsData.work_type == 'dispatch'"
                  >파견직</span
                >
                <span v-if="jobDetailsData.work_type == 'internship'"
                  >인턴직</span
                >
                <span v-if="jobDetailsData.work_type == 'freelancer'"
                  >프리랜서</span
                >
                <span v-if="jobDetailsData.work_type == 'etc'">기타</span>
                (수습기간 {{ jobDetailsData.probation }} 개월)
              </p>
            </li>
            <!-- 3개월  -->
            <!-- <li>
              <p class="p-left">근무기간</p>
              <p class="p-right">{{ timeDifferenceData }}</p>
            </li> -->
            <li>
              <p class="p-left">근무기간</p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == '1_day'"
              >
                하루(1일)
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == 'less_than_1_week'"
              >
                1주일이하
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == '1_week_to_1_month'"
              >
                1주일~1개월
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == '1_month_to_3_months'"
              >
                1개월~3개월
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == '3_months_to_6_months'"
              >
                3개월~6개월
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == '6_months_to_1_year'"
              >
                6개월~1년
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.working_period == 'more_than_1_year'"
              >
                1년 이상
              </p>
            </li>
            <li>
              <p class="p-left">근무요일</p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 7">
                {{ jobDetailsData.working_days.length }}일
                (월,화,수,목,금,토,일)
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 6">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 5">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 4">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 3">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 2">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 1">
                {{ jobDetailsData.working_days.length }}일 ({{workDays}})
              </p>
              <p class="p-right" v-if="jobDetailsData.working_days.length == 0">
                요일협의
              </p>
            </li>
            <li>
              <p class="p-left">근무시간</p>
              <p class="p-right">
                {{ jobDetailsData.working_hour_from }} ~
                {{ jobDetailsData.working_hour_end }}
              </p>
            </li>
            <li>
              <p class="p-left">휴게시간</p>
              <p
                class="p-right"
                v-if="
                  jobDetailsData.break_time_from === null &&
                  jobDetailsData.break_time_end === null
                "
              >
                휴게시간 없음
              </p>
              <p class="p-right" v-else>
                {{ jobDetailsData.break_time_from }} ~
                {{ jobDetailsData.break_time_end }}
              </p>
            </li>
            <li>
              <p class="p-left">경력</p>
              <p class="p-right" v-if="jobDetailsData.career === 'newcomer'">
                신입
              </p>
              <p class="p-right" v-if="jobDetailsData.career === 'any'">
                경력무관
              </p>
              <p
                class="p-right"
                v-if="
                  jobDetailsData.career === 'experience' &&
                  jobDetailsData.any_experience === 0 &&
                  jobDetailsData.max_experience !== null &&
                  jobDetailsData.min_experience !== null
                "
              >
                {{ jobDetailsData.min_experience }} ~
                {{ jobDetailsData.max_experience }} 년
              </p>
              <p
                class="p-right"
                v-if="
                  jobDetailsData.career === 'experience' &&
                  jobDetailsData.any_experience === 1
                "
              >
                경력 연수 무관
              </p>
              <p class="p-right" v-if="jobDetailsData.career === 'elementary'">
                초급
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.career === 'intermediate'"
              >
                중급
              </p>
              <p class="p-right" v-if="jobDetailsData.career === 'advanced'">
                고급
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">담당업무</h3>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">직무</p>
              <p class="p-right">
                {{ jobDetailsData.job_type }}
              </p>
            </li>
            <li>
              <p class="p-left">담당업무 상세</p>
              <!-- <p class="p-right">
                {{ convertStringToHTML(jobDetailsData.responsibilities) }}
              </p> -->
              <p v-html="jobDetailsData.responsibilities" class="p-right"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">모집조건</h3>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">모집분야</p>
              <p class="p-right">{{ jobDetailsData.areas_of_recruitment }}</p>
            </li>
            <li>
              <p class="p-left">모집인원</p>
              <p class="p-right">{{ jobDetailsData.num_of_recruitment }} 명</p>
            </li>
            <li>
              <p class="p-left">성별</p>
              <p class="p-right" v-if="jobDetailsData.gender == 'any'">
                성별무관
              </p>
              <p class="p-right" v-if="jobDetailsData.gender == 'male'">남자</p>
              <p class="p-right" v-if="jobDetailsData.gender == 'female'">
                여자
              </p>
            </li>
            <li>
              <p class="p-left">연령</p>
              <p class="p-right" v-if="jobDetailsData.age == 'any'">연령무관</p>
              <p class="p-right" v-if="jobDetailsData.age == 'manual'">
                {{ jobDetailsData.start_age }} ~ {{ jobDetailsData.end_age }}
              </p>
            </li>
            <li>
              <p class="p-left">학력</p>

              <p
                class="p-right"
                v-if="jobDetailsData.education == 'elementary_school'"
              >
                초등학교
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.education == 'middle_school'"
              >
                중학교
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.education == 'high_school'"
              >
                고등학교
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.education == 'university_2_or_3_years'"
              >
                대학(2,3년제)
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.education == 'university_4_years'"
              >
                대학(4년제)
              </p>
              <p
                class="p-right"
                v-if="jobDetailsData.education == 'graduate_school'"
              >
                대학원
              </p>
            </li>
            <li>
              <p class="p-left">우대조건</p>
              <p class="p-right">
                {{ jobDetailsData.preferential_conditions_txt }}
              </p>
            </li>
            <li>
              <p class="p-left">지원자격</p>
              <!-- <p class="p-right">{{ jobDetailsData.eligibilities }}</p> -->
              <p v-html="jobDetailsData.eligibilities" class="p-right"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">근무지역</h3>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-right">
                {{ jobDetailsData.workarea_address }}
              </p>
            </li>
            <li>
              <p class="p-left">상세 주소</p>
              <p class="p-right">
                {{ jobDetailsData.job_detail_address }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">담당자 정보</h3>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">담당자 이름</p>
              <p class="p-right">
                {{
                  jobDetailsData.is_private_name == "1"
                    ? "비공개"
                    : jobDetailsData.contact_name
                }}
              </p>
            </li>
            <li>
              <p class="p-left">담당자 연락처</p>
              <p class="p-right">
                {{
                  jobDetailsData.is_private_person_num == "1"
                    ? "비공개"
                    : jobDetailsData.contact_person_num
                }}
              </p>
            </li>
            <li>
              <p class="p-left">담당자 이메일</p>
              <p class="p-right">
                {{
                  jobDetailsData.is_private_email == "1"
                    ? "비공개"
                    : jobDetailsData.contact_email
                }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="back-wh border-top">
      <div class="container">
        <div class="cm-top-space pb-32">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">기업정보</h3>
          </div>
          <div class="rating-otr wishlist">
            <h5>
              <span v-if="jobDetailsData.company_profile_img !== null"
                ><img :src="jobDetailsData.company_profile_img" alt=""
              /></span>
              <span v-if="jobDetailsData.company_profile_img === null"
                ><img src="@/assets/images/mypage-profile-img.png" alt=""
              /></span>
              <!-- <span
                ><img :src="jobDetailsData.company_profile_img" alt=""
              /></span> -->
              {{ jobDetailsData.company_name }}
            </h5>
            <p
              v-if="
                store.state.loginType == 'job_seeker' &&
                jobDetailsData.is_company_interest == 0
              "
            >
              관심
              <span
                ><img
                  @click="addToAttention(jobDetailsData.employer_id)"
                  src="@/assets/icons/wishlist.svg"
                  alt=""
              /></span>
            </p>
            <p
              v-if="
                store.state.loginType == 'job_seeker' &&
                jobDetailsData.is_company_interest == 1
              "
            >
              관심
              <span
                ><img
                  @click="removeFromAttention(jobDetailsData.employer_id)"
                  src="@/assets/icons/wishlist-fill.svg"
                  alt=""
              /></span>
            </p>
          </div>
          <ul class="post-list">
            <li>
              <p class="p-left">직원수</p>
              <p class="p-right">{{ jobDetailsData.no_of_emp }} 명</p>
            </li>
            <li>
              <p class="p-left">회사 주소</p>
              <p class="p-right">{{ jobDetailsData.business_address }}</p>
            </li>
            <li>
              <p class="p-left">산업군</p>
              <p class="p-right">{{ jobDetailsData.industry }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="btm-button-group fixed-btn-otr job-details-btn">
      <button
        @click="isLogin ? saveToBookmark() : openSheet($event, true)"
        v-if="
          !isLogin ||
          (isLogin &&
            store.state.loginType == 'job_seeker' &&
            jobDetailsData.status !== 'closed' &&
            jobDetailsData.is_scrap == 0)
        "
        class="btn btn-primary-outline left-btn"
      >
        스크랩하기
      </button>
      <a
        @click="removeFromBookmark(jobDetailsData.scrap_id)"
        v-if="
          isLogin &&
          store.state.loginType == 'job_seeker' &&
          jobDetailsData.status !== 'closed' &&
          jobDetailsData.is_scrap == 1
        "
        class="btn btn-primary-outline left-btn"
        >스크랩 완료</a
      >
      <a
        v-if="
          !isLogin ||
          (isLogin &&
            store.state.loginType == 'job_seeker' &&
            jobDetailsData.status !== 'closed' &&
            jobDetailsData.is_job_applied == 0)
        "
        @click="isLogin ? openResume() : openSheet($event, true)"
        class="btn btn-primary rg-btn"
        >지원하기</a
      >
      <a
        v-if="
          isLogin &&
          store.state.loginType == 'job_seeker' &&
          jobDetailsData.status !== 'closed' &&
          jobDetailsData.is_job_applied == 1
        "
        class="btn btn-primary rg-btn"
        >지원 완료</a
      >
      <a
        @click="openDeleteModal"
        class="btn btn-primary-outline lg hand-pointer"
        v-if="
          isLogin &&
          store.state.loginType == 'job_recruiter' &&
          jobDetailsData.employer_id == userId &&
          jobDetailsData.status == 'readytopublish'
        "
        >공고 삭제하기</a
      >
      <a
        @click="openCloseModal"
        v-if="
          isLogin &&
          store.state.loginType == 'job_recruiter' &&
          jobDetailsData.employer_id == userId &&
          jobDetailsData.status == 'published'
        "
        class="btn btn-primary-outline lg"
        >공고 마감하기</a
      >
      <p
        class="btn btn-primary-gray lg"
        v-if="jobDetailsData.status === 'closed'"
      >
        마감된 공고 입니다
      </p>
    </div>
    <div class="scrapped-icon wish-icon act" v-if="!popupMessageShow">
      <p>
        <span><img src="@/assets/icons/wishlist-fill.svg" alt="" /></span> 관심
        기업 등록이 완료되었습니다.
      </p>
    </div>
    <div
      class="scrapped-icon wish-icon scrapped-icon-transform act"
      v-if="popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/wishlist-fill.svg" alt="" /></span> 관심
        기업 등록이 완료되었습니다.
      </p>
    </div>

    <div
      class="scrapped-icon wish-icon scrapped-icon-transform act"
      v-if="commonStore.state.popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
        스크랩했습니다.
      </p>
    </div>

    <DeleteJobPostConfirmModal
      :isModal="showDeleteModal"
      @closeModal="showDeleteModal = false"
      @deleteConfirm="deleteConfirm"
    />

    <CloseJobPostConfirmModal
      :isModal="showCloseModal"
      @closeModal="showCloseModal = false"
      @closeConfirm="closeConfirm"
    />

    <ApplyChooseResume
      :id="jobDetailsData.id"
      v-if="commonStore.state.isApplyChooseResume"
      @changeJobDetailsData="jobDetailsData.is_job_applied = 1"
    />
  </div>
</template>

<script>
import { computed, inject, onMounted } from "vue";
import DeleteJobPostConfirmModal from "../../../components/Modals/DeleteJobPostConfirmModal.vue";
import CloseJobPostConfirmModal from "../../../components/Modals/CloseJobPostConfirmModal.vue";
import PostSlider from "@/components/PostSlider.vue";
import { onBeforeMount, watch } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
import { HomeService } from "../../../service/API/Home";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import ApplyChooseResume from "@/views/JobSeekers/ApplyChooseResume.vue";

export default {
  name: "JobPostingDetails",
  components: {
    PostSlider,
    CloseJobPostConfirmModal,
    DeleteJobPostConfirmModal,
    ApplyChooseResume,
  },
  setup() {
    const commonStore = inject("commonStore");
    const router = useRouter();
    const route = useRoute();
    const store = inject("authenticateStore");
    const userId = localStorage.getItem("user_id");
    const jobDetailsData = ref({});
    const lockerDetailsData = ref([]);
    const publishedTab = ref(true);
    const closedTab = ref(false);
    const showDeleteModal = ref(false);
    const popupMessageShow = ref(false);
    const showCloseModal = ref(false);
    const timeDifferenceData = ref("");
    const isLogin = computed(() => (store.state.token ? true : false));
    const daysMap = {
    1: "월", //Mon
    2: "화", //Tue
    3: "수", //Wed
    4: "목", //Thu
    5: "금", //Fri
    6: "토", //Sat
    7: "일", //Sun
};
const workDays = ref("");

    onBeforeMount(async () => {
      await fetchJobDatails();
    });

    onMounted(() => {
      if (!isLogin.value) {
        let token = localStorage.getItem("token");
        store.methods.setToken(token);
      }
    });

    watch(
      () => commonStore.state.isApplyChooseResume,
      (newVal, oldVal) => {
        if (newVal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    const openSheet = (e, val) => {
      e.preventDefault();
      if (val && isLogin) {
        commonStore.state.isSheetOpen = val;
        console.log("Bottom Sheet Active !!", val);
      }
    };

    const fetchJobDatails = async () => {
      try {
        let res = await HomeService.jobDetails(route.params.id);
        console.log(res);
        Object.assign(jobDetailsData.value, res.data);
        workDays.value = jobDetailsData.value.working_days?.map(day => daysMap[day])?.join(', ');

        await timeDifference(
          new Date(
            res.data.notice_posting_period_custom_end_date.split("T")[0]
          ),
          new Date(
            res.data.notice_posting_period_custom_start_date.split("T")[0]
          )
        );
      } catch (e) {}
    };
    const FormatDate = (value) => {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    };

    const timeDifference = async (timestamp1, timestamp2) => {
      var diff = Math.floor(timestamp1.getTime() - timestamp2.getTime());
      var day = 1000 * 60 * 60 * 24;

      var days = Math.floor(diff / day);
      var months = Math.floor(days / 31);
      var years = Math.floor(months / 12);

      var message = days + " 일 ";
      message += months + " 개월 ";
      message += years + " 년제 \n";
      timeDifferenceData.value = message;
    };

    const openDeleteModal = () => {
      showDeleteModal.value = true;
    };

    const openCloseModal = () => {
      showCloseModal.value = true;
    };

    const deleteConfirm = async () => {
      try {
        let res = await HomeService.deleteJob(route.params.id);
        showDeleteModal.value = false;
        router.push({ name: "JobListing" });
      } catch (e) {
        console.log(e);
      }
    };
    const closeConfirm = async () => {
      try {
        let res = await HomeService.closeJob(route.params.id);
        jobDetailsData.value.status = "closed";
        showCloseModal.value = false;
        router.push(`/recruiter/job-listing/마감`);
      } catch (e) {
        console.log(e);
      }
    };

    const openResume = () => {
      commonStore.state.isApplyChooseResume = true;
    };

    const addToAttention = async (id) => {
      try {
        let data = {
          employer_id: id,
        };
        let res = await HomeService.addFavourites(data);
        popupMessageShow.value = true;
        jobDetailsData.value.is_company_interest = 1;
        setTimeout(() => {
          popupMessageShow.value = false;
        }, 4000);
      } catch (e) {
        console.log(e);
      }
    };

    const removeFromAttention = async (id) => {
      try {
        let data = {
          employer_id: id,
        };
        let res = await HomeService.deletedCompany(data);
        jobDetailsData.value.is_company_interest = 0;
      } catch (e) {
        console.log(e);
      }
    };

    const saveToBookmark = async () => {
      try {
        let data = {
          id: route.params.id,
        };
        let res = await HomeService.addScrap(data);
        //console.log(res)
        jobDetailsData.value.is_scrap = 1;
        jobDetailsData.value.scrap_id = res.data.scrap_id;
        commonStore.methods.scrappedSuccessful();
      } catch (e) {
        console.log(e);
      }
    };
   
    const removeFromBookmark = async (id) => {
      try {
        let data = {
          id: [id],
        };
        let res = await HomeService.deleteScrap(data);
        jobDetailsData.value.is_scrap = 0;
        jobDetailsData.value.scrap_id = 0;
      } catch (e) {
        console.log(e);
      }
    };

    const showPublished = () => {
      publishedTab.value = true;
      closedTab.value = false;
    };
    const showClosed = () => {
      closedTab.value = true;
      publishedTab.value = false;
    };
    const showUnread = () => {
      router.push({ name: "ApplicantConfirmationList" });
    };

    return {
      jobDetailsData,
      store,
      showDeleteModal,
      showCloseModal,
      userId,
      lockerDetailsData,
      popupMessageShow,
      publishedTab,
      closedTab,
      isLogin,
      commonStore,
      timeDifferenceData,
      showPublished,
      showClosed,
      showUnread,
      openDeleteModal,
      openCloseModal,
      deleteConfirm,
      closeConfirm,
      saveToBookmark,
      removeFromAttention,
      addToAttention,
      removeFromBookmark,
      FormatDate,
      openResume,
      openSheet,
      workDays
    };
  },
};
</script>

<style scoped>
.scrapped-icon-transform {
  transform: none;
}

.hand-pointer {
  cursor: pointer !important;
}
</style>
