<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">
          <div class="innr-search">
            <a
              href="javascript:void(0);"
              class="left-arrow"
              @click="$router.push({ name: 'home' })"
              ><img src="@/assets/icons/left-arrow.svg" alt="" /></a
            ><span>마이페이지</span>
          </div>
        </h4>
        <!-- <InnerHeader headerTitle="마이페이지" /> -->
      </div>
    </div>
    <div class="container">
      <div class="mypage-profile-area pb-32">
        <div class="profile-otr">
          <div class="image-cont image-cont_img imag-cust-md">
            <img
              v-if="myPageData.details.profile_image != null"
              :src="myPageData.details.profile_image"
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
              v-if="myPageData.details.profile_image !== null"
              @click="myPageData.isConfirmRemoveProfile = true"
              ><img src="@/assets/icons/profile-cross-icon.svg" alt=""
            /></em>
            <label class="file-input__label" for="file-input">
              <em class="edit_icon"><span></span> </em>
            </label>
          </div>
          <div class="info-cont">
            <div class="top-part">
              <h3>{{ myPageData.details.name }}</h3>
              <span class="rating">
                <img src="@/assets/icons/star.svg" alt="" />
                <span v-if="myPageData.details.seeker_avg_rating === 0">
                  5
                </span>
                <span v-else>
                  {{ myPageData.details.seeker_avg_rating }}
                </span>
              </span>
            </div>
            <button
              class="btn btn-gray-outline"
              v-if="myPageData.details.position_offer === 'off'"
            >
              포지션 제안 비공개중
            </button>
            <button class="btn btn-red-outline" v-else>
              포지션 제안 공개중
            </button>
            <!-- <a href="#" class="setting-btn"><img src="@/assets/icons/setting-icon.svg" alt="" /></a> -->
            <router-link :to="{ name: 'ProfileSetting' }" class="setting-btn"
              ><img src="@/assets/icons/setting-icon.svg" alt=""
            /></router-link>
          </div>
        </div>
        <div class="counter-otr">
          <ul>
            <li
              class="cursor-pointer"
              @click="$router.push('/job-seekers/scrap')"
            >
              {{ myPageData.details.scrap_count }} <Span>스크랩</Span>
            </li>
            <li
              class="cursor-pointer"
              @click="$router.push('/job-seekers/company-interest')"
            >
              {{ myPageData.details.company_of_interest_count }}
              <Span>관심 기업</Span>
            </li>
            <li
              class="cursor-pointer"
              @click="$router.push('/job-seekers/recently-viewed-announcement')"
            >
              {{ myPageData.details.recently_viewed_count }}
              <Span>최근 본 알바</Span>
            </li>
            <li
              class="cursor-pointer"
              @click="$router.push('/job-seekers/application-status')"
            >
              {{ myPageData.details.application_pending_count }}
              <Span>지원현황</Span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32 mypage-cont">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">스마트 서비스</h3>
        </div>
        <ul class="post-list">
          <li>
            <router-link :to="{ name: 'PositionOffer' }">
              포지션 제안
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <a href="#" @click="commonStore.methods.openSilverBellModal(true)"
              >실버벨
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></a>
          </li>
          <li>
            <router-link
              :to="{ name: 'ConsultationOnLabor' }"
              @click="commonStore.state.fromPage = 'mypage'"
            >
              노무 상담하기
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'StarManagement' }">
              별점 관리
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
        <ul class="post-list">
          <li>
            <router-link :to="{ name: 'CustomerNotice' }">
              공지사항
              <span
                ><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span
            ></router-link>
          </li>
          <li>
            <a
              @click="
                (commonStore.state.isTermsOfServiceModal = true),
                  (myPageData.selectedpage = 'seekerTerms')
              "
            >
              회원 이용약관
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
            >
              개인정보처리방침
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
  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
  <MaxFileSizeModal
    :isModal="myPageData.isMaxFileSizeModal"
    @confirmModal="myPageData.isMaxFileSizeModal = false"
  />
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import { myPage } from "@/service/API/myPage.js";
import { onMounted, reactive, inject, watch } from "vue";
import TermsOfService from "./TermsOfService.vue";
import { CompanyInfo } from "@/service/API/CompanyInfo.js";
import { profile } from "@/service/API/profile.js";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import ConfirmRemoveProfile from "@/components/Modals/ConfirmRemoveProfile.vue";
import MaxFileSizeModal from "@/components/Modals/MaxFileSizeModal.vue";

export default {
  name: "MyPage",
  components: {
    InnerHeader,
    NoData,
    TermsOfService,
    LoadingBar,
    ConfirmRemoveProfile,
    MaxFileSizeModal,
  },

  setup() {
    const store = inject("authenticateStore");
    const commonStore = inject("commonStore");
    onMounted(() => {
      window.scrollTo(0, 0);
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
    watch(
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
      },
    );
    const myPageData = reactive({
      isMaxFileSizeModal: false,
      details: [],
      selectedpage: "",
      isConfirmRemoveProfile: false,
    });

    // const openSheet = (e, val) => {
    //   e.preventDefault();
    //   if (val) {
    //     commonStore.state.isPrivacySheetOpen = val;
    //     console.log("Bottom Sheet Active !!", val);
    //   } else {
    //     router.push({ name: "MyPage" });
    //   }
    // };

    async function myPageDetails() {
      let res = await myPage.userDeatils();
      if (res.status === 200) {
        myPageData.details = res.data;
        store.state.email_id = res.data.email;
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
      // myPageData.details.profile_image = URL.createObjectURL(file);
    };

    const updateProfilePhoto = async (data, file) => {
      // disableSubmit.value = true;
      loading.state = true;
      try {
        let res = await CompanyInfo.updateProfilePic(data);
        if (res.status == 200) {
          // disableSubmit.value = false;
          myPageData.details.profile_image = URL.createObjectURL(file);
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

    async function removeProfileImage() {
      const inputReset = document.getElementById("file-input");
      inputReset.value = "";

      let res = await profile.deleteProfilePic();
      // console.log(res);
      if (res.status == 200) {
        myPageDetails();
        myPageData.isConfirmRemoveProfile = false;
      }
    }

    return {
      myPageData,
      myPageDetails,
      commonStore,
      store,
      onFileChange,
      loading,
      removeProfileImage,
    };
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
