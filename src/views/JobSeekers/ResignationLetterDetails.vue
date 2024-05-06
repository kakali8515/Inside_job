<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br m-0">
      <div class="container">
        <h4 class="heading">
          <div class="innr-search">
            <a href="javascript:void(0);" class="left-arrow"
              ><img
                src="@/assets/icons/left-arrow.svg"
                @click="
                  $route.query.tab == 0
                    ? $router.push(`/job-seekers/resignation-letter/진행중`)
                    : $router.push(`/job-seekers/resignation-letter/진행완료`)
                "
                alt="" /></a
            ><span>사직서</span>
          </div>
        </h4>
        <!-- <InnerHeader headerTitle="사직서" /> -->
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32 resignation-letter-cont">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">근로자 정보</h3>
        </div>
        <ul class="post-list">
          <li>
            <p class="p-left">소속</p>
            <p class="p-right">{{ details.company_name }}</p>
          </li>
          <li>
            <p class="p-left">성명</p>
            <p class="p-right">{{ details.name }}</p>
          </li>
          <li>
            <p class="p-left">직위</p>
            <p class="p-right">{{ details.position }}</p>
          </li>
          <li>
            <p class="p-left">업무 기간</p>
            <p class="p-right">
              {{ formatDate(details.job_start) }} ~
              {{ formatDate(details.job_end) }}
            </p>
          </li>
          <li>
            <p class="p-left">사유</p>
            <p class="p-right">{{ details.reason }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">근로자 서명</h3>
        </div>
        <div class="worker-sign-cont">
          <img :src="details.signature_url" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="back-wh border-top mb-80">
    <div class="container">
      <div class="cm-top-space pb-32">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">사직서 제출일</h3>
        </div>
        <div class="date-content">
          <p>상기인은 위 사유로 인하여</p>
          <ul class="date-info">
            <li>
              <span>{{ work_period.yy }}</span
              >년
            </li>
            <li>
              <span>{{ work_period.mm }}</span
              >월
            </li>
            <li>
              <span>{{ work_period.dd }}</span
              >일
            </li>
          </ul>
          <p>사직하고자 이에 사직서를 제출합니다.</p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="btm-button-group btm-half-button fixed-btn-otr pt-16 border-top"
    v-show="seekerBtn"
  >
    <!-- <span class="btn btn-primary-outline pointerhand" @click="pdfdownload()"
      >pdf 다운로드하기</span
    > -->

    <button
        type="button"
        class="btn btn-primary-outline"
        @click="downloadPdf"
        v-if="isPlatMobile"
      >
        pdf 다운로드하기
      </button>
    <a
      :href="pdfdUrl"
      class="btn btn-primary-outline pointerhand"
      :download="pdfdUrl"
      v-if="!isPlatMobile"
    >
      pdf 다운로드하기
    </a>
    <span class="btn btn-primary pointerhand" @click="openEmailModal"
      >이메일 전송하기</span
    >
    <!-- <a href="#" class="btn btn-primary-gray lg">마감된 공고 입니다</a> -->
  </div>
  <div class="btm-button-group mt-32 fixed-btn-otr" v-show="recruiterBtn">
    <span class="btn btn-primary pointerhand lg" @click="onsubmitModal()"
      >사직서 수리하기</span
    >
  </div>
  <EmploymentSendEmail
    :Email="
      loginType === 'job_recruiter'
        ? details.seeker_email
        : details.employer_email
    "
    @sendMailto="setEmail($event)"
    v-if="commonStore.state.isContractEmailModal"
  />
  <acceptResignationModal
    :isModal="isShowModal"
    @closeModal="isShowModal = false"
    @deleteConfirm="acceptResignation(details.id)"
  />
  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
</template>

<script>
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import InnerHeader from "../../components/innerHeader.vue";
import resignService from "../../service/API/resignation";
import {DownloadPdfService} from "../../service/API/DownloadPdf";
import acceptResignationModal from "@/components/Modals/acceptResignationModal.vue";
import { useCookies } from "vue3-cookies";
import EmploymentSendEmail from "../JobSeekers/EmploymentSendEmail.vue";
import { inject, onMounted, computed, ref, reactive, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ResignationLetterDetails",
  components: {
    InnerHeader,
    EmploymentSendEmail,
    acceptResignationModal,
    LoadingBar,
  },
  setup() {
    const route = useRoute();
    const loading = reactive({
        state: false,
        message: "잠시만 기다려 주세요.",
    });
    const downloadButtonLoaded = ref(null);
    const { cookies } = useCookies();
    const isPlatMobile = computed(() => cookies.get("isMobile") === "true");
    const pdfdUrl = ref("");
    const pdfUrlFetched = ref(false);
    const commonStore = inject("commonStore");

    const downloadPdf = async () => {
      let data = {
        type: "pdfDownload",
        url: pdfdUrl,
      };
      window.parent.postMessage(JSON.stringify(data), "*");
    };

    watch(
      () => commonStore.state.isContractEmailModal,
      () => {
        if (commonStore.state.isContractEmailModal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );
    onMounted(async () => {
      await getPDfDetails();
    });

    const getPDfDetails = async () => {
        loading.state = true;
        let res = await DownloadPdfService.getExcel(route.query.ids);
        pdfdUrl.value = res.data.pdf_url;
        //pdfUrlFetched.value = true;
        loading.state = false;
    };

    return {
      downloadPdf,
      isPlatMobile,
      pdfdUrl,
      loading,
      pdfUrlFetched,
      downloadButtonLoaded,
      commonStore
    };
  },
  data() {
    return {
      seekerBtn: false,
      recruiterBtn: false,
      details: {},
      work_period: {},
      commonStore: inject("commonStore"),
      isShowModal: false,
      loginType: localStorage.getItem("login_type"),
    };
  },
  created() {
    this.resignservice = new resignService();
  },
  methods: {
    onsubmitModal() {
      this.isShowModal = true;
    },
    acceptResignation(ids) {
      this.isShowModal = false;
      this.resignservice
        .approveResignation({ id: ids })
        .then((res) => {
          console.log("Accept_Reg: ", res);
          // this.$router.push({ name: "CompanyStarRating" });
          this.showsetdata();
        })
        .catch((err) => console.log(err));
    },
    showsetdata(){
      this.resignservice.processlist(1,10).then((res) => {
        sessionStorage.setItem("count1", res.data.total_records);
      });
      this.resignservice.completelist(1,10).then((res) => {
        sessionStorage.setItem("count2", res.data.total_records);
      });
      setTimeout(() => {
        this.$router.push({ name: "CompanyStarRating" });
      }, 100);
    },
    formatDate(value) {
      const date = new Date(value);
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return (value = `${yyyy}.${mm}.${dd}`);
    },
    // async pdfdownload() {
    //   await this.resignservice
    //     .getExcel(this.$route.query.ids)
    //     .then((response) => {
    //       console.log(response.data.pdf_url);
    //       this.pdfdUrl = response.data.pdf_url;
    //       // let data = {
    //       //   type: "pdfDownload",
    //       //   url: this.pdfdUrl,
    //       // };
    //       // window.parent.postMessage(JSON.stringify(data), "*");
    //       // let link = document.createElement("a");
    //       // link.href = response.data.pdf_url;
    //       // link.setAttribute("download", "details.pdf");
    //       // link.dispatchEvent(new MouseEvent("click"));
    //     });
    // },
    openEmailModal() {
      this.commonStore.state.isContractEmailModal = true;
    },
    setEmail(event) {
      this.commonStore.state.isContractEmailModal = false;
      let inputData = {
        email: event,
      };
      this.resignservice
        .sendResignationEmail(this.$route.query.ids, inputData)
        .then((res) => {
          this.$router.push({
            name: "ResignationLetter",
            params: { tab: this.$route.query.tab == 1 ? "진행완료" : "진행중" },
          });
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
  async mounted() {
    if (localStorage.getItem("login_type") == "job_recruiter") {
      if (
        this.$route.query.tab == 1 &&
        localStorage.getItem("login_type") == "job_recruiter"
      ) {
        this.seekerBtn = true;
        this.recruiterBtn = false;
      } else {
        this.seekerBtn = false;
        this.recruiterBtn = true;
      }
    }
    if (localStorage.getItem("login_type") == "job_seeker") {
      this.seekerBtn = true;
      this.recruiterBtn = false;
    }
    //resignationDetailsRecruiter
    {
      this.resignservice
        .resignationDetails(this.$route.query.ids)
        .then((res) => {
          console.log("Resignation-Details: ", res.data);
          this.details = res.data;
          let jobEnd_date = new Date(res.data.job_end);
          this.work_period = {
            yy: jobEnd_date.getFullYear(),
            mm: jobEnd_date.getMonth() + 1,
            dd: jobEnd_date.getDate(),
          };
          //this.commonStore.methods.fetchRegObj(res.data);
          console.log(this.commonStore.state.regObj);
        })
        .catch((err) => console.log(err));
    }
    // await this.pdfdownload();
  },
};
</script>
<style scoped>
.pointerhand {
  cursor: pointer;
}
</style>
