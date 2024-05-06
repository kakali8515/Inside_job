<template>
  <HeaderSearch />
  <div class="common-sec back-wh home-common-sec">
    <div class="container p-0">
      <div class="home-slider-wrap">
        <BannerSlider />
      </div>
      <div class="container">
        <div
          class="place-fliter-cont location-filter"
          @click="
            (isShowModal = true), (refreshData = false), (secondRegion.id = '')
          "
        >
          <ul v-if="placeHolder === ''">
            <li>
              <a href="#"
                ><img src="@/assets/icons/place-icon.svg" alt="" />{{
                  firstRegion.text
                }}</a
              >
            </li>
            <li>{{ secondRegion.text }}</li>
          </ul>
          <span v-else class="location-placeholder">
            <img src="@/assets/icons/place-icon.svg" alt="" />
            <label>{{ placeHolder }}</label>
          </span>
          <span
            ><a href="#"><img src="@/assets/icons/filter-icon.svg" alt="" /></a
          ></span>
        </div>
      </div>
      <div class="slider-sec">
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">긴급</h3>
              </div>
              <EmergencySlider
                :firstRegion="firstRegion"
                :secondRegion="secondRegion"
                :refreshData="refreshData"
                @scrappedSuccessful="scrappedSuccessful"
                @openResume="openResume"
              />
            </div>
          </div>
        </div>
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">프리미엄</h3>
              </div>
              <PremiumSlider
                :firstRegion="firstRegion"
                :secondRegion="secondRegion"
                :refreshData="refreshData"
                @scrappedSuccessful="scrappedSuccessful"
                @openResume="openResume"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="slider-sec">
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">스페셜</h3>
              </div>
              <SpecialSlider
                :firstRegion="firstRegion"
                :secondRegion="secondRegion"
                :refreshData="refreshData"
                @scrappedSuccessful="scrappedSuccessful"
              />
              <!-- <Pagination
              :totalRecords="pagination.totalRecords"
              v-on:setNumber="setPage($event)"
            /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="slider-sec home-line-slider">
        <div class="border-top border-f2 border-btm">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color mb-0">
                <h3 class="sub-heading mb-0">라인</h3>
              </div>
              <LineSlider
                :firstRegion="firstRegion"
                :secondRegion="secondRegion"
                :refreshData="refreshData"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <ScrapedToast /> -->
      <div
        class="scrapped-icon scrapped-icon-transform act"
        v-if="popupMessageShow"
      >
        <p>
          <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
          스크랩했습니다.
        </p>
      </div>
    </div>
    <!-- {{ 'ggg-'+devicedata }}
    {{ 'ggg2-'+devicedata2 }} -->
    <LocationSettings
      :isModal="isShowModal"
      :firstLocation="firstRegion"
      :secondLocation="secondRegion"
      @refresh="refresh"
      :close="forcedClose"
      @closeModal="(isShowModal = false), (forcedClose = true)"
      @selectedRegion="selectedRegion"
    />
    <ApplyChooseResume
      :id="jobId"
      v-if="commonstore.state.isApplyChooseResume"
    />
    <suspendModal :isModal="showSuccessModal" @closeModal="closeSuccessModal" />
    <Chat />
    <!-- <LoadingBar /> -->
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import ApplyChooseResume from "@/views/JobSeekers/ApplyChooseResume.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import BannerSlider from "@/components/BannerSlider.vue";
import PremiumSlider from "@/components/PremiumSlider.vue";
import EmergencySlider from "@/components/EmergencySlider.vue";
import SpecialSlider from "@/components/SpecialSlider.vue";
import LineSlider from "@/components/LineSlider.vue";
import Pagination from "@/components/Pagination.vue";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import { useRouter } from "vue-router";
import suspendModal from "@/components/Modals/suspendModal.vue";
import { HomeService } from "../../service/API/Home";
// import ScrapedToast from "@/components/Utils/ScrapedToast.vue"
import {
  inject,
  onUnmounted,
  onMounted,
  onUpdated,
  reactive,
  ref,
  computed,
  watch,
} from "@vue/runtime-core";
import { useCookies } from "vue3-cookies";
import LocationSettings from "../../components/Modals/LocationSettings.vue";
import { DeviceInfo } from "@/service/API/DeviceService.js";
export default {
  name: "Home",
  components: {
    HeaderSearch,
    BannerSlider,
    PremiumSlider,
    EmergencySlider,
    SpecialSlider,
    LineSlider,
    Pagination,
    LocationSettings,
    Chat,
    ApplyChooseResume,
    LoadingBar,
    suspendModal,
  },

  data() {
    return {
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
      devicedata: this.$cookies.get("deviceUdid"),
      devicedata2: this.$cookies.get("isiPhone"),
    };
  },

  setup() {
    const router = useRouter();
    const jobId = ref(null);
    const popupMessageShow = ref(false);
    const commonstore = inject("commonStore");
    const authStore = inject("authenticateStore");
    const isLogin = computed(() => (authStore.state.token ? true : false));
    const { cookies } = useCookies();
    const firstRegion = reactive({ id: "", text: "" });
    const secondRegion = reactive({ level_id: "", id: "", text: "" });
    const isShowModal = ref(false);
    const refreshData = ref(false);
    const placeHolder = ref("");
    const forcedClose = ref(false);
    const showSuccessModal = ref(false);
    const pagination = reactive({
      totalRecords: 3,
      perPage: 10,
      pageNo: 1,
    });

    const search = () => {
      console.log("search");
    };

    // onBeforeMount(() => {
    //   isloadapp();
    // });
    const accountStatus = async () => {
      console.log(localStorage.getItem("token"));
      if (localStorage.getItem("token") == null) {
        console.log("storage cleared");
      } else {
        try {
          let res = await HomeService.checkUserStatus();
          if (res.data.user_status === "deleted") {
            showSuccessModal.value = true;
            console.log("deleted");
          }
        } catch (e) {
          if (e.response.status == 403) {
            setLogout();
          } else {
            console.log(e.response.status);
          }
          // alert(e.response.status);
        }
      }
    };
    onMounted(() => {
      accountStatus();
      commonstore.methods.isFromApp();
      setTimeout(() => {
        isloadapp();
      }, 2000);
      // if (authStore.methods.isAuthenticate()) {
      //   console.log('logedin')
      //   getDeviceinfo();
      // }
      placeHolder.value = "지역선택";
    });
    onUpdated(() => {
      commonstore.methods.isFromApp();
      // if (authStore.methods.isAuthenticate()) {
      //   console.log('logedin')
      //   getDeviceinfo();
      // }
    });

    onUnmounted(() => {
      commonstore.state.isSheetOpen = false;
      window.addEventListener("popstate", function (event) {
        // Push a new state to the history, effectively cancelling the default behavior
        // history.pushState(null, null, window.location.href);
        // Perform any other actions or handle the event as needed
        // For example, you can display a confirmation dialog or show a custom message
      });
    });

    watch(
      () => commonstore.state.isApplyChooseResume,
      async (first, second) => {
        if (commonstore.state.isApplyChooseResume === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      }
    );

    function setPage(event) {
      pagination.pageNo = event;
    }

    const openResume = (id) => {
      jobId.value = id;
      commonstore.state.isApplyChooseResume = true;
    };
    const closeSuccessModal = () => {
      localStorage.clear();
      showSuccessModal.value = false;
      router.push({ name: "home" });
    };
    const isloadapp = async () => {
      let data = {
        type: "loadapp",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // alert("loadapp");

      window["getDeviceinfo"] = async (res) => {
        // alert("TEST POPUP IGNOR on QA -- got from app : " + JSON.stringify(res));
        if (res) {
          await getDeviceinfoHandler(res).then((ress) => {
            // alert('---home page TEST POPUP --- ' + JSON.stringify(ress));

            if (ress?.platform == "android") {
              cookies.set("isiPhone", false);
              cookies.set("isMobile", true);
            } else if (ress?.platform == "ios") {
              cookies.set("isiPhone", true);
              cookies.set("isMobile", true);
            }
            cookies.set("deviceUdid", ress?.udid);
            cookies.set("devicePlatform", ress?.platform);
            cookies.set("deviceToken", ress?.deviceToken);
            cookies.set("appVersion", ress?.version);
            cookies.set("deviceLat", ress?.lat);
            cookies.set("deviceLong", ress?.long);
          });
        } else {
          alert("no data from app");
        }
      };
    };
    window["sendPushNotificationData"] = async (res) => {
      // alert(`type=${res.type},title=${res.title},body=${res.body}`);

      if (res) {
        await getDevicenotificationHandler(res).then((res) => {
          // alert('---home not page TEST POPUP --- ' + JSON.stringify(res));
          if (res.type === "USER_DELETED") {
            showSuccessModal.value = true;
            // localStorage.clear();
            // router.push(`/`); //seeker
          } else if (res.type === "LOCATION_BASED_GUIDANCE") {
            router.push(`/around`); //seeker
          } else if (res.type === "INTERESTED_COMPANY") {
            router.push(`/job-seekers/company-interest`);
          } else if (res.type === "AI_RECOMMENDATION") {
            router.push(`/job-seekers/ai-recommendation-list`);
          } else if (res.type === "APPLICATION_RESUME") {
            router.push(`/job-seekers/application-status`);
          } else if (res.type === "POSITION_OFFERED") {
            router.push(`/job-seekers/position-offer`);
          } else if (res.type === "RESIGNATION_CONFIRMATION") {
            // router.push(`/job-seekers/resignation-letter/진행완료`);     //complated tab
            router.push({
              name: "ResignationLetter",
              params: { tab: "진행완료" },
              query: { fromPage: "notification" },
            });
          } else if (res.type === "RESIGNATION_SUBMIT") {
            // router.push(`/job-seekers/resignation-letter/`);     //inprogress tab
            router.push({
              name: "ResignationLetter",
              query: { fromPage: "notification" },
            });
          } else if (res.type === "EMPLOYMENT_CONTRACT_ACCEPTED") {
            //complated tab
            employmentStore.state.contractListTabState = 1;
            router.push({
              name: "LaborContract",
              query: { fromPage: "notification" },
            }); //recu
          } else if (res.type === "APPLICATION_SUBMITTED") {
            router.push(
              `/recruiter/particular-job-post-applicant-confirmation/${res.job_id}`
            ); //recu (//particulare //unread tab)
          } else if (res.type === "EMPLOYMENT_CONTRACT_SUBMIT") {
            // router.push(`/job-seekers/labor-contract`); //job  // inprogracess tab
            router.push({
              name: "LaborContract",
              query: { fromPage: "notification" },
            });
          } else if (res.type === "JOB_READY_TO_PUBLISH") {
            router.push(`/recruiter/job-listing`); //rec //joblisting
          } else if (res.type === "JOB_PUBLISH_TO_CLOSED") {
            router.push(`/recruiter/job-listing/마감`); //rec //joblisting closed tab
          } else if (res.type === "SCRAP_NOTIFICATION") {
            router.push(`/job-seekers/scrap`);
          } else if (res.type === "UPGLE_NOTIFICATION") {
            router.push(`/recruiter/job-listing`); //rec
          } else if (res.type === "TALENT_SEARCH_END_NOTIFICATION") {
            router.push(`/recruiter/paid-product-locker`); //rec //paid product locker
          } else if (res.type === "ANNOUNCEMENT_END_NOTIFICATION") {
            router.push(`/recruiter/job-listing`); // rec joblisting publish tab
          } else if (res.type === "REPLY_TO_LABOUR_CONSULTATION") {
            router.push(`/job-seekers/consultation-on-labor`); //both
          } else if (res.type === "NEW_BOARD_NOTICE") {
            if (localStorage.getItem("login_type") === "job_seeker") {
              router.push(`/job-seekers/customer-notice`); // rec
            } else {
              router.push(`/recruiter/customer-notice`); // rec
            }
          } else if (res.type === "AUTOMATIC_JOB_POSTING") {
            router.push(`/job-posting-details/${res.job_id}`); //both
          } else if (res.type === "POST_JOB_DECLINE") {
            router.push(`/recruiter/automaticjobpostingrequesthistory`); //both
          } else if (res.type === "POSITION_SUGGESTION") {
            router.push(`/job-seekers/position-offer`);
          }
        });
      } else {
        alert("no data from app");
      }
      // redirection(res);
    };
    window["checkUser"] = async (res) => {
      // alert("---background open check..001 --- " + JSON.stringify(res));
      if (res) {
        await bgCheckHandler(res).then((ress) => {
          // alert("---background open check..002 --- " + ress.checkUser);
          if ((ress.checkUser = "yes")) {
            // alert("API call");
            accountStatus();
            console.log(result);
          } else {
            console.log("No API call");
          }
        });
      } else {
        alert("no data from app");
      }
    };
    // window["backButtonHandeler"] = async (res) => {
    //   // alert("---backbutton clicked..1 --- " + JSON.stringify(res));
    //   if (res) {
    //     await backBtnHandler(res).then((ress) => {

    //         // alert("---backbutton clicked..002 --- " + ress);
    //     });
    //   } else {
    //     alert("no data from app");
    //   }
    // };
    const getDeviceinfoHandler = (data) => {
      return new Promise((resolve, reject) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    };
    const getDevicenotificationHandler = (data) => {
      return new Promise((resolve, reject) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    };
    const bgCheckHandler = (data) => {
      return new Promise((resolve, reject) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    };
    // const backBtnHandler = (data) => {
    //   return new Promise((resolve, reject) => {
    //     if (data) {
    //       resolve(data);
    //     } else {
    //       reject(err);
    //     }
    //   });
    // };
    const refresh = () => {
      refreshData.value = true;
      firstRegion.id = "";
      firstRegion.text = "";
      secondRegion.id = "";
      secondRegion.text = "";
      secondRegion.level_id = "";
      placeHolder.value = "지역선택";
      isShowModal.value = false;
    };

    const selectedRegion = (data, selected1stRegion) => {
      firstRegion.id = selected1stRegion.id;
      firstRegion.text = selected1stRegion.text;
      secondRegion.id = data.id;
      secondRegion.text = data.text;
      secondRegion.level_id = selected1stRegion.id;
      placeHolder.value = "";
      isShowModal.value = false;
    };

    const scrappedSuccessful = () => {
      popupMessageShow.value = true;
      setTimeout(() => {
        popupMessageShow.value = false;
      }, 4000);
    };

    watch(
      () => isLogin.value,
      async (first, second) => {
        if (isLogin.value === true) {
          placeHolder.value = "지역선택";
        }
      }
    );
    const setLogout = async () => {
      let data = {
        type: "logoutClicked",
        loginVia: localStorage.getItem("login_via"),
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      await removeDeviceinfo();
      localStorage.removeItem("token");
      localStorage.removeItem("login_type");
      localStorage.clear();
      deleteAllCookies();
      authStore.state.token = undefined;
      // cookies.set("isiPhone") = commonstore.state.isiPhone,
      cookies.set("isiPhone", commonstore.state.isiPhone);
      // router.push({ name: "home" });
      commonstore.state.isSheetOpen = true;
      commonstore.state.isViewmoreMenuOpen = false;
    };
    const deleteAllCookies = () => {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    };
    async function removeDeviceinfo() {
      let device_uuid = cookies.get("deviceUdid");
      let res = await DeviceInfo.removeDevice(device_uuid);
    }
    return {
      commonstore,
      authStore,
      isLogin,
      popupMessageShow,
      pagination,
      isShowModal,
      forcedClose,
      firstRegion,
      secondRegion,
      jobId,
      showSuccessModal,
      placeHolder,
      setPage,
      cookies,
      search,
      selectedRegion,
      refresh,
      refreshData,
      scrappedSuccessful,
      isloadapp,
      getDeviceinfoHandler,
      getDevicenotificationHandler,
      openResume,
      closeSuccessModal,
      bgCheckHandler,
      accountStatus,
      setLogout,
      deleteAllCookies,
      removeDeviceinfo,
      // backBtnHandler,
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
