<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br m-0">
      <div class="container">
        <InnerHeader
          :headerTitle="
            Object.keys($route.query).length !== 0
              ? '별점 평가'
              : userType == 'job_seeker'
              ? '퇴사기업 평가'
              : '퇴사자 평가'
          "
          @backButtonPressed="cancelShowModal = true"
        />
      </div>
    </div>
    <div class="container">
      <div class="comp-profile-area">
        <div class="profile-image">
          <img
            v-if="company_profile_img !== null"
            :src="company_profile_img"
            alt=""
          />
          <img
            v-if="company_profile_img === null"
            src="@/assets/images/mypage-profile-img.png"
            alt=""
          />
        </div>
        <!-- <h4>{{ commonstore.state.regObj.company_name }}</h4> -->
        <h4 v-if="store.state.loginType === 'job_seeker'">
          {{ company_name }}
        </h4>
        <h4 v-if="store.state.loginType === 'job_recruiter'">{{ name }}</h4>
        <p
          class="star-rt"
          v-if="
            commonAverageRating != 0 && Object.keys($route.query).length !== 0
          "
        >
          <span><img src="@/assets/icons/star.svg" alt="" /></span
          >{{ commonAverageRating }}
        </p>
        <p
          class="star-rt"
          v-if="
            commonAverageRating == 0 && Object.keys($route.query).length !== 0
          "
        >
          <span><img src="@/assets/icons/star.svg" alt="" /></span>5
        </p>
      </div>
    </div>
  </div>

  <div class="form-wrapper resig-letter-wrapper">
    <div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">별점 평가</h3>
            </div>
            <!-- <div class="rating-wrap">
              <img src="@/assets/images/rating.jpg" alt="" />
            </div> -->
            <div class="rating-wrap">
              <div class="item-row">
                <!-- work_competency -->
                <p>
                  {{ userType == "job_seeker" ? "복지 및 급여" : "업무 역량" }}
                </p>
                <div class="star-cont">
                  <div class="rate-img">
                    <StarRating
                      @click="setRating(welfare_and_salary)"
                      v-model:rating="welfare_and_salary"
                      v-bind:increment="0.5"
                      inactive-color="#fff"
                      border-color="#DF1B3F"
                      active-color="#DF1B3F"
                      border-width="3"
                      :max-rating="5"
                      padding="1"
                      rounded-corners="true"
                      inline="true"
                      glow="3"
                      glow-color="#fff"
                      star-size="18"
                      :show-rating="false"
                    ></StarRating>
                  </div>
                  <span
                    ><em>{{ Number(welfare_and_salary) * 2 }}</em
                    >점</span
                  >
                </div>
              </div>
              <div class="item-row">
                <!-- responsibility -->
                <p>{{ userType == "job_seeker" ? "근무환경" : "책임감" }}</p>
                <div class="star-cont">
                  <div class="rate-img">
                    <StarRating
                      @click="setRating(workingEnv)"
                      v-model:rating="workingEnv"
                      v-bind:increment="0.5"
                      inactive-color="#fff"
                      border-color="#DF1B3F"
                      active-color="#DF1B3F"
                      border-width="3"
                      :max-rating="5"
                      padding="1"
                      rounded-corners="true"
                      inline="true"
                      glow="3"
                      glow-color="#fff"
                      star-size="18"
                      :show-rating="false"
                    ></StarRating>
                  </div>
                  <span
                    ><em>{{ Number(workingEnv) * 2 }}</em
                    >점</span
                  >
                </div>
              </div>
              <div class="item-row">
                <!-- teamwork -->
                <p>
                  {{ userType == "job_seeker" ? "업무와 삶의 균형" : "팀워크" }}
                </p>
                <div class="star-cont">
                  <div class="rate-img">
                    <StarRating
                      @click="setRating(work_life_bal)"
                      v-model:rating="work_life_bal"
                      v-bind:increment="0.5"
                      inactive-color="#fff"
                      border-color="#DF1B3F"
                      active-color="#DF1B3F"
                      border-width="3"
                      :max-rating="5"
                      padding="1"
                      rounded-corners="true"
                      inline="true"
                      glow="3"
                      glow-color="#fff"
                      star-size="18"
                      :show-rating="false"
                    ></StarRating>
                  </div>
                  <span
                    ><em> {{ Number(work_life_bal) * 2 }}</em
                    >점</span
                  >
                </div>
              </div>
              <div class="item-row">
                <!-- kindness/caring -->
                <p>{{ userType == "job_seeker" ? "사내문화" : "친절/배려" }}</p>
                <div class="star-cont">
                  <div class="rate-img">
                    <StarRating
                      @click="setRating(company_culture)"
                      v-model:rating="company_culture"
                      v-bind:increment="0.5"
                      inactive-color="#fff"
                      border-color="#DF1B3F"
                      active-color="#DF1B3F"
                      border-width="3"
                      :max-rating="5"
                      padding="1"
                      rounded-corners="true"
                      inline="true"
                      glow="3"
                      glow-color="#fff"
                      star-size="18"
                      :show-rating="false"
                    ></StarRating>
                  </div>
                  <span
                    ><em>{{ Number(company_culture) * 2 }}</em
                    >점</span
                  >
                </div>
              </div>
              <div class="item-row">
                <!-- sincerity/morality -->
                <p>
                  {{
                    userType == "job_seeker"
                      ? "승진기회 및 가능성"
                      : "성실/도덕성"
                  }}
                </p>
                <div class="star-cont">
                  <div class="rate-img">
                    <StarRating
                      @click="setRating(prom_oprt)"
                      v-model:rating="prom_oprt"
                      v-bind:increment="0.5"
                      inactive-color="#fff"
                      border-color="#DF1B3F"
                      active-color="#DF1B3F"
                      border-width="3"
                      :max-rating="5"
                      padding="1"
                      rounded-corners="true"
                      inline="true"
                      glow="3"
                      glow-color="#fff"
                      star-size="18"
                      :show-rating="false"
                    ></StarRating>
                  </div>
                  <span
                    ><em>{{ Number(prom_oprt) * 2 }}</em
                    >점</span
                  >
                </div>
              </div>
              <div class="item-row total-rating">
                <div class="star-cont">
                  <span
                    ><b>총</b><em>{{ averageRating }}</em
                    ><b>점</b></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">한 줄 평가</h3>
            </div>
            <div class="form-group mb-0">
              <textarea
                class="form-control"
                v-model="comment"
                :placeholder="placeholderText"
              ></textarea>
            </div>
            <div class="form-group mb-0" v-show="seekerBtn">
              <div class="fixed-btn-otr">
                <button class="btn btn-primary lg" @click="onsubmitModal">
                  작성 완료하기
                </button>
              </div>
            </div>
            <div class="btnn-group mt-16" v-show="recruiterBtn">
              <div class="btn-group-innr">
                <button
                  type="button"
                  class="btn btn-primary-outline lg"
                  @click="cancelShowModal = true"
                >
                  취소
                </button>
              </div>
              <div class="btn-group-innr">
                <input
                  type="button"
                  class="btn btn-primary lg"
                  value="작성 완료"
                  @click="
                    userType == job_seeker
                      ? saveRating()
                      : saveRecuirterRatings()
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <completeRatingModal
    :isModal="isShowModal"
    @closeModal="isShowModal = false"
    @backConfirm="saveRating"
  />
  <cancelStarRatingModal
    :isModal="cancelShowModal"
    @closeModal="cancelShowModal = false"
    @backConfirm="confirmRedirection"
  />
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import StarRating from "vue-star-rating";
import resignService from "../../service/API/resignation";
import { inject } from "@vue/runtime-core";
import completeRatingModal from "@/components/Modals/completeStarRatingModal.vue";
import cancelStarRatingModal from "../../components/Modals/cancelStarRatingModal.vue";
export default {
  name: "CompanyStarRating",
  components: {
    InnerHeader,
    StarRating,
    completeRatingModal,
    cancelStarRatingModal,
  },
  data() {
    return {
      seekerBtn: localStorage.getItem("login_type") == "job_seeker",
      recruiterBtn: localStorage.getItem("login_type") == "job_recruiter",
      userType: localStorage.getItem("login_type"),
      welfare_and_salary: 2.5,
      workingEnv: 2.5,
      work_life_bal: 2.5,
      company_culture: 2.5,
      prom_oprt: 2.5,
      store: inject("authenticateStore"),
      commonstore: inject("commonStore"),
      comment: "",
      avgRating: "5",
      isShowModal: false,
      cancelShowModal: false,
      company_name: "",
      company_profile_img: "",
      placeholderText: "",
      name: "",
      commonAverageRating: null,
    };
  },
  created() {
    this.resignservice = new resignService();
  },
  computed: {
    averageRating() {
      return (this.avgRating =
        (this.welfare_and_salary * 2 +
          this.workingEnv * 2 +
          this.work_life_bal * 2 +
          this.company_culture * 2 +
          this.prom_oprt * 2) /
        5);
    },
  },
  methods: {
    backToProcess() {
      this.$router.push({ name: "ResignationLetter" });
    },
    setRating(r) {
      console.log(r);
    },
    onsubmitModal() {
      if (Object.keys(this.$route.query).length !== 0) {
        this.saveRating();
      } else {
        this.isShowModal = true;
      }
    },
    confirmRedirection() {
      if (Object.keys(this.$route.query).length !== 0) {
        this.$router.push({ name: "StarManagement" });
      } else {
        this.$router.push({ name: "ResignationLetter" });
      }
    },
    saveRecuirterRatings() {
      this.resignservice
        .setEmployerRating({
          id:
            Object.keys(this.$route.query).length !== 0
              ? this.$route.query.id
              : this.commonstore.state.regObj.id,
          work_competency: this.welfare_and_salary.toString(),
          responsibility: this.workingEnv.toString(),
          teamwork: this.work_life_bal.toString(),
          kindness_caring: this.company_culture.toString(),
          sincerity_morality: this.prom_oprt.toString(),
          average_rating: this.averageRating.toString(),
          one_line_evaluation: this.comment,
        })
        .then(() => {
          if (Object.keys(this.$route.query).length !== 0) {
            this.$router.push({ name: "StarManagement" });
          } else {
            this.$router.push({
              name: "ResignationLetter",
              params: { tab: "진행완료" },
            });
          }
        })
        .catch((err) => console.log(err));
    },
    saveRating() {
      console.log("helloppp");
      this.isShowModal = false;
      let data = {
        id:
          Object.keys(this.$route.query).length !== 0
            ? this.$route.query.id
            : this.commonstore.state.regObj.id,
        welfare_and_salary: this.welfare_and_salary.toString(),
        working_environment: this.workingEnv.toString(),
        work_life_balance: this.work_life_bal.toString(),
        company_culture: this.company_culture.toString(),
        promotion_opportunity_and_posibilities: this.prom_oprt.toString(),
        average_rating: this.averageRating.toString(),
        one_line_evaluation: this.comment,
      };

      this.resignservice
        .setEmployerRating(data)
        .then(() => {
          if (Object.keys(this.$route.query).length !== 0) {
            this.$router.push({ name: "StarManagement" });
          } else {
            this.$router.push({
              name: "ResignationLetter",
              params: { tab: "진행완료" },
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    if (Object.keys(this.$route.query).length !== 0) {
      this.resignservice
        .employerRatingDetails(this.$route.query.id)
        .then((res) => {
          this.placeholderText = "기업의 장점이나 좋은 특징을 말씀해 주세요";
          this.company_name = res.data.company_name;
          this.company_profile_img = res.data.company_profile_img;
          this.commonAverageRating = res.data.employer_rating;
        })
        .catch((err) => console.log(err));
    } else {
      console.log(this.commonstore.state.regObj);
      this.placeholderText = "채용자의 장점이나 좋은 특징을 말씀해 주세요";
      this.name = this.commonstore.state.regObj.name;
      this.company_name = this.commonstore.state.regObj.company_name;
      this.company_profile_img =
        this.commonstore.state.regObj.company_profile_img;
      if (this.userType === "job_recruiter") {
        this.company_profile_img =
          this.commonstore.state.regObj.seeker_profile_image;
      }
    }
  },
};
</script>
<style scoped></style>
