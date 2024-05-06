<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="92%"
    :no-close-on-backdrop="false"
    v-slot="{ closeSelf }"
    v-model:visible="commonstore.state.isSheetOpen"
  >
    <div :class="`back-wh ${commonstore.state.currentThemeStore}`">
      <!-- <button @click="popClose(true, closeSelf())">Close</button> -->
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            로그인
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </h4>
          <!-- Inner Header Section -->
          <!-- <InnerHeader headerTitle="로그인" /> -->
          <!--  -->
        </div>
      </div>
      <div class="container">
        <div class="form-wrapper-login">
          <div class="login-tab">
            <div class="tab-outr bg-block">
              <TabWrapper
                :defaultSelect="commonstore.state.loginDefault"
                @getResponseTitle="setUserType($event)"
              >
                <Tabs title="개인회원 (구직자)">
                  <LoginFields
                    @setLogin="SetLogin($event, true)"
                    :isReset="resetData"
                  />
                </Tabs>
                <Tabs title="기업회원 (구인자)">
                  <LoginFields
                    @setLogin="SetLogin($event, true)"
                    :isReset="resetData"
                  />
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
  <!-- <LoadingBar v-if="loading.state" :loadingMsg="loading.message" /> -->
  <!-- <InfoModal
    :isModal="isShowModal"
    :message="infoMessage"
    @closeModal="isShowModal = false"
  /> -->
</template>
<script>
import { useCookies } from "vue3-cookies";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import InnerHeader from "@/components/innerHeader.vue";
import LoginFields from "@/components/LoginFields.vue";
import { inject } from "vue";
import { LoginServices } from "@/service/API/loginServices.js";
import resignService from "../../service/API/resignation";
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, onUpdated, watch } from "@vue/runtime-core";
// import sns from "../../config/snssupport.json";
// import InfoModal from "@/components/Modals/InfoModal.vue";
import { DeviceInfo } from "@/service/API/DeviceService.js";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import BottomSheetCustom from "../../components/Utils/BottomSheetCustom.vue"
// const authStore = inject("authenticateStore");

export default {
  name: "LogIn",
  components: {
    Tabs,
    TabWrapper,
    InnerHeader,
    LoginFields,
    LoadingBar,
    BottomSheetCustom
    // InfoModal,
  },
  emits: ["scrollToTop"],
  setup(props, { emit }) {
    const userType = ref("job_seeker");
    const router = useRouter();
    const store = inject("authenticateStore");
    const commonstore = inject("commonStore");
    // const snsD = sns;
    const isShowModal = ref(false);
    const infoMessage = ref("");
    const resetData = ref(0);
    const { cookies } = useCookies();
    const loading = reactive({
      state: false,
      message: "",
    });

    const setUserType = (type) => {
      if (type === "개인회원 (구직자)") {
        resetData.value = resetData.value + 1;
        userType.value = "job_seeker";
      } else {
        resetData.value = resetData.value + 1;
        userType.value = "job_recruiter";
      }
    };

    const SetLogin = async (e) => {
      loading.state = true;
      let APIData = {
        email: e.emailId || e.emailid,
        password: e.pass || "",
        social_id: "" || `${e.socialId}`,
        login_type: e.optionLogin || e.loginVia,
        user_type: userType.value,
      };
      // alert(JSON.stringify(e.loginVia));
      let res = await LoginServices.postLogin(APIData);
      if (res.status === 200) {
        commonstore.state.loginInfoModal.isShow = true;
        commonstore.state.loginInfoModal.message = "로그인 되었습니다. ";
        localStorage.setItem("emailId", e.emailId);
        store.state.email_id = e.emailId;
        localStorage.setItem("token", res.data.tokens.accessToken);
        localStorage.setItem("login_type", res.data.user_type);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("login_via", e.optionLogin || e.loginVia);
        localStorage.removeItem("snsuserName");
        store.methods.setToken(res.data.tokens.accessToken);
        store.state.loginType = res.data.user_type;
        getDeviceinfo();
        emit("scrollToTop");
        loading.state = false;
        if (localStorage.getItem("login_type") == "job_recruiter") {
          router.push({ name: "HomeLanding" });
        } else {
          router.push({ name: "home" });
        }
        commonstore.state.isSheetOpen = false;
      } else if (res.response.status === 400) {
        commonstore.state.loginInfoModal.isShow = true;
        loading.state = false;
        if (["kakao", "apple", "naver", "web"].includes(e.loginVia)) {
          commonstore.state.loginInfoModal.message =
            "가입된 회원 정보가 없습니다.<br/>회원가입을 해 주시기 바랍니다.";
          commonstore.state.loginInfoModal.logintype = "sns";
        } else {
          commonstore.state.loginInfoModal.message = `${
            res.response.data.error == "invalidCredentials"
              ? "아이디와 비밀번호를 다시 확인해 주세요."
              : res.response.data.error
          }`;
        }
        emit("scrollToTop");
        commonstore.state.isSheetOpen = false;
      }
      console.log("login--res---", res);
    };

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    watch(
      () => commonstore.state.isSheetOpen,
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
      commonstore.methods.isFromApp();

      // web view get message
      // console.log('snsdata', sns.kakao)
      window["sendKakaoLoginData"] = (ress) => {
        sendKakoAccessToken(ress);
      };
      window["sendNaverLoginData"] = (ress) => {
        sendNaverAccessToken(ress);
      };
      window["sendAppleLoginData"] = (ress) => {
        sendAppleAccessToken(ress);
      };
      var body = document.querySelector("html");
      body.style.overflow = "hidden";
      userType.value =
        commonstore.state.loginDefault == 0 ? "job_seeker" : "job_recruiter";
    });

    onUpdated(() => {
      commonstore.methods.isFromApp();
    });

    onUnmounted(() => {
      console.log("login closed");
      var body = document.querySelector("html");
      body.style.overflow = "auto";
      commonstore.state.loginDefault = 0;
      // window.scrollTo(0, 0);
      emit("scrollToTop");
    });

    console.log("commonstore.state.isSheetOpen", commonstore.state.isSheetOpen);

    const sendKakoAccessToken = (res) => {
      let snsdata = JSON.parse(res);
      SetLogin(snsdata);
    };
    const sendNaverAccessToken = (res) => {
      let snsdata = JSON.parse(res);
      SetLogin(snsdata);
    };
    const sendAppleAccessToken = (res) => {
      let snsdata = JSON.parse(res);
      // alert(snsdata);
      // if(snsdata.userName.trim() != "" || snsdata.userName != null || snsdata.userName != undefined) {
      //   localStorage.setItem('snsuserName',snsdata.userName);
      //   alert(localStorage.getItem('snsuserName') + " in storage");
      // }
      SetLogin(snsdata);
    };
    async function getDeviceinfo() {
      let dinfo = {
        device_uuid: cookies.get("deviceUdid"),
        device_type: cookies.get("devicePlatform"),
        device_token: cookies.get("deviceToken"),
      };
      let res = await DeviceInfo.addDevice(dinfo);
      console.log("--getDeviceinfo--");
      console.log("getDeviceinfo--", res);
      setTimeout(() => {
        showdata();
      }, 100);
      
    }
    function showdata() {
      new resignService().processlist(1,10).then((res) => {
        sessionStorage.setItem("count1", res.data.total_records);
        // this.commonstore.methods.setprogressVal(res.data.total_records);
        console.log(localStorage.getItem('login_type'));
      });
      new resignService().completelist(1,10).then((res) => {
        sessionStorage.setItem("count2", res.data.total_records);
        // this.commonstore.methods.setcompletedVal(res.data.total_records);
        console.log(localStorage.getItem('login_type'));
      });
    }
    return {
      cookies,
      userType,
      store,
      commonstore,
      SetLogin,
      setUserType,
      popClose,
      // snsD,
      sendKakoAccessToken,
      sendNaverAccessToken,
      sendAppleAccessToken,
      isShowModal,
      infoMessage,
      resetData,
      getDeviceinfo,
      loading,
      showdata,
    };
  },
};
</script>
<style lang="scss" scoped>
.bottom-sheet {
  min-height: calc(100vh - 30px);
  position: absolute;
  z-index: 99999999;
  left: 0;
  top: 30px;
  width: 100%;
  border-radius: 20px 20px 0 0;
}
</style>

asd