<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader
          headerTitle="마이페이지"
          @backButtonPressed="$router.push({ name: 'home' })"
        />
      </div>
    </div>
    <div class="container">
      <div class="mypage-profile-area recruiter-mypage pb-32">
        <div class="profile-otr">
          <div class="image-cont image-cont_img imag-cust-md">
            <!-- <img :src="myPageData.details.company_profile_img" alt="" /> -->
            <img
              v-if="myPageData.details.company_profile_img != null"
              :src="myPageData.details.company_profile_img"
              alt=""
            />
            <img
              class="no-img-wi"
              v-else
              src="@/assets/images/profile-no-img.svg"
              alt=""
            />
            <input
              type="file"
              name="file-input"
              id="file-input"
              class="file-input__input"
              ref="file"
              accept="image/gif,image/jpg,image/jpeg,image/png"
              hidden
              @change="onFileChange"
            />
            <em
              class="cross_icon"
              v-if="myPageData.details.company_profile_img !== null"
              @click="myPageData.isConfirmRemoveProfile = true"
              ><img src="@/assets/icons/profile-cross-icon.svg" alt=""
            /></em>
            <label class="file-input__label" for="file-input">
              <em class="edit_icon"><span></span> </em>
            </label>
          </div>
          <div class="info-cont">
            <div class="top-part">
              <h3>{{ myPageData.details.company_name }}</h3>
              <span
                class="rating n-br"
                v-if="myPageData.details.employer_avg_rating === 0"
              >
                <img src="@/assets/icons/star.svg" alt="" />
                5
              </span>
              <span
                class="rating n-br"
                v-if="myPageData.details.employer_avg_rating !== 0"
              >
                <img src="@/assets/icons/star.svg" alt="" />
                {{ myPageData.details.employer_avg_rating }}
              </span>
            </div>
            <p class="choco-btn">
              <img src="@/assets/icons/database-icon.svg" alt="" />
              <span>{{ myPageData.details.total_ammount }}</span> 초코
            </p>
            <!-- no data -->
            <!-- <p class="choco-btn"><img src="@/assets/icons/database-icon.svg" alt="" /> <span>0</span> 초코</p> -->
            <router-link
              :to="{ name: 'RecruiterSnsLoginSetting' }"
              class="setting-btn"
              ><img src="@/assets/icons/setting-icon.svg" alt=""
            /></router-link>
          </div>
        </div>
        <div class="counter-otr">
          <ul>
            <li
              class="red cursor-pointer"
              @click="$router.push(`/recruiter/job-listing/게재중`)"
            >
              {{ myPageData.details.publish_job_count }} <Span>게재중</Span>
            </li>
            <li
              class="gray cursor-pointer"
              @click="$router.push(`/recruiter/job-listing/마감`)"
            >
              {{ myPageData.details.cancel_job_count }} <Span>마감</Span>
            </li>
            <li
              @click="$router.push({ name: 'ApplicantConfirmationList' })"
              class="blue cursor-pointer"
            >
              {{ myPageData.details.unread_applicant_count }}
              <Span>미열람 지원서</Span>
            </li>
          </ul>
          <!-- no data  -->
          <!-- <ul>
                    <li class="red">0 <Span>게재중</Span></li>
                    <li class="gray">0 <Span>마감</Span></li>
                    <li class="blue">0 <Span>미열람 지원서</Span></li>
                </ul> -->
        </div>
        <router-link :to="{ name: 'NoticeRegistration' }">
          <span class="btn btn-white lg mt-16">공고 추가 등록하기 +</span>
        </router-link>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32 mypage-cont">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">스마트 서비스</h3>
        </div>
        <ul class="post-list req">
          <li>
            <a href="#" @click="commonStore.methods.openSilverBellModal(true)"
              >실버벨
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></a>
          </li>
          <li>
            <router-link
              :to="{ name: 'RecruiterConsultationOnLabor' }"
              @click="commonStore.state.fromPage = 'mypage'"
              >노무 상담하기
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'RecruiterStarManagement' }"
              >별점 관리
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AutomaticJobPostingRequestHistory' }"
              >자동 채용공고 등록
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32 mypage-cont">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">유료 서비스</h3>
        </div>
        <ul class="post-list req">
          <li>
            <router-link :to="{ name: 'SuperShortCoinShop' }"
              >초단코인샵
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PaidTalentSearchHistory' }"
              >인재 검색 내역
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PaidProductLocker' }"
              >유료상품 보관함
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32 mypage-cont">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">고객지원 서비스</h3>
        </div>
        <ul class="post-list req">
          <li>
            <router-link :to="{ name: 'RecruiterCustomerNotice' }"
              >공지사항
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <a
              @click="
                (commonStore.state.isTermsOfServiceModal = true),
                  (myPageData.selectedpage = 'memberBasedLocation')
              "
              >회원 이용약관
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></a>
          </li>
          <li>
            <a
              @click="
                (commonStore.state.isTermsOfServiceModal = true),
                  (myPageData.selectedpage = 'termsOfServices')
              "
              >위치기반 서비스 이용약관
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></a>
          </li>
          <li>
            <a
              @click="
                (commonStore.state.isTermsOfServiceModal = true),
                  (myPageData.selectedpage = 'privacyPolicy')
              "
              href="#"
              >개인정보처리방침
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <TermsOfService
    v-if="commonStore.state.isTermsOfServiceModal"
    :modalName="myPageData.selectedpage"
  />
  <ConfirmRemoveProfile
    :isModal="myPageData.isConfirmRemoveProfile"
    @conifrmModel="removeProfileImage()"
    @closeModal="myPageData.isConfirmRemoveProfile = false"
  />

  <RedirectionModal
    :isModal="redirectionModal"
    @confirm="$router.push('/recruiter/automaticjobpostingrequesthistory')"
    @closeConfirm="redirectionModal = false"
  />
  <MaxFileSizeModal
    :isModal="myPageData.isMaxFileSizeModal"
    @confirmModal="myPageData.isMaxFileSizeModal = false"
  />

  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import TermsOfService from "@/views/JobSeekers/TermsOfService.vue";
import { onMounted, reactive, inject, ref, watch } from "vue";
import { recruitermypage } from "@/service/API/recruitermypage.js";
import { CompanyInfo } from "@/service/API/CompanyInfo.js";
import { profile } from "@/service/API/profile.js";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import { jobListing } from "@/service/API/jobListing.js";
import ConfirmRemoveProfile from "@/components/Modals/ConfirmRemoveProfile.vue";
import AutomatiocJobPostSheet from "../JobPostingManagement/AutomatiocJobPostSheet.vue";
import RedirectionModal from "@/components/Modals/RedirectionModal.vue";
import MaxFileSizeModal from "@/components/Modals/MaxFileSizeModal.vue";
export default {
  name: "RecruiterMyPage",
  components: {
    InnerHeader,
    NoData,
    TermsOfService,
    LoadingBar,
    ConfirmRemoveProfile,
    AutomatiocJobPostSheet,
    RedirectionModal,
    MaxFileSizeModal,
  },

  setup() {
    const commonStore = inject("commonStore");
    const redirectionModal = ref(false);

    watch(
      () => commonStore.state.isSilverBellOpen,
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
    
    onMounted(() => {
      console.log("fdsg", commonStore.state.isTermsOfServiceModal);
      myPageDetails();
      commonStore.state.fromPage = "";
    });
    const memberData = reactive({
      file: undefined,
      fileName: "",
      company_profile_img: "",
    });

    const loading = reactive({
      state: false,
      message: "잠시만 기다려 주세요.",
    });

    const myPageData = reactive({
      isMaxFileSizeModal: false,
      details: [],
      selectedpage: "",
      isConfirmRemoveProfile: false,
    });

    async function myPageDetails() {
      let res = await recruitermypage.userRecruiterDeatils();
      if (res.status === 200) {
        myPageData.details = res.data.company_info;
        myPageData.details.total_ammount =
          myPageData.details.total_ammount.toLocaleString("en-US");
      }
    }
    const onFileChange = async (e) => {
      var formData = new FormData();
      var files = e.target.files || e.dataTransfer.files;
      const [file] = files;
      if (!files.length) return;
      memberData.file = files[0];
      // console.log(memberData.file);
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(memberData.file.name)) {
        //this.render1 = true;
        memberData.fileName = "";
        return false;
      } else if (e.target.files[0].size > 5000000) {
        myPageData.isMaxFileSizeModal = true;
        return false;
      } else {
        //this.render1 = false;
        memberData.fileName = memberData.file.name;
        formData.append("image", files[0]);
      }
      //this.fileExtension = memberData.fileName.replace(/^.*\./, "");
      await updateProfilePhoto(formData, file);
      // myPageData.details.company_profile_img = URL.createObjectURL(file);
    };

    const updateProfilePhoto = async (data, file) => {
      // disableSubmit.value = true;
      loading.state = true;
      try {
        let res = await CompanyInfo.updateProfilePic(data);
        if (res.status == 200) {
          // disableSubmit.value = false;
          myPageData.details.company_profile_img = URL.createObjectURL(file);
          loading.state = false;
        }
      } catch (e) {
        loading.state = false;
        if (e.response.data.error === "fileSizeNotMatch") {
          myPageData.isMaxFileSizeModal = true;
        }
        // console.log(e);
        // disableSubmit.value = false;
        // loading.state = false;
      }
    };
    watch(
      // isSilverBellOpen
      () => commonStore.state.isTermsOfServiceModal,
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
    watch(
      () => commonStore.state.isSilverBellOpen,
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
    async function removeProfileImage() {
      const inputReset = document.getElementById("file-input");
      inputReset.value = "";

      let res = await profile.deleteProfilePic();
      // console.log(res);
      if (res.status == 200) {
        myPageData.isConfirmRemoveProfile = false;
        myPageDetails();
      }
    }

    return {
      myPageData,
      myPageDetails,
      commonStore,
      onFileChange,
      removeProfileImage,
      loading,
      redirectionModal,
    };
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
