<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="회원정보" @backButtonPressed="$router.push('/recruiter/my-page')" />
      </div>
    </div>
    <div class="container">
      <div class="mypage-wrapper">
        <div class="pb-32 mypage-cont">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">정보 수정</h3>
          </div>
          <ul class="post-list mb-16 req">
            <li>
              <router-link :to="{ name: 'RecruiterEditMemberInformation' }"
                >회원정보 수정
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></router-link>
            </li>
            <li>
              <router-link :to="{ name: 'RecruiterEditcompanyInformation' }"
                >기업정보 수정
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></router-link>
            </li>
            <li v-if="memberData.details.sns_type !== null">
              <a href="#" class="disable"
                >비밀번호 변경
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></a>
              <div class="kakao-chng-pwd" v-if="memberData.details.sns_type === 'kakao'">
                <span><img src="@/assets/images/kakao-chat.png" alt="" /></span>
                <p>
                  카카오 로그인을 사용중입니다.<br />
                  비밀번호는 카카오에서 변경하실 수 있습니다.
                </p>
              </div>
              <div class="kakao-chng-pwd" v-else-if="memberData.details.sns_type === 'naver'">
                <span><img src="@/assets/images/naver-chat.png" alt="" /></span>
                <p>
                  You are using Naver Login.<br />
                  You can change your password in Naver.
                </p>
              </div>
              <div class="kakao-chng-pwd" v-else-if="memberData.details.sns_type === 'apple' || isIPhone === 'true'">
                <span><img src="@/assets/images/apple-chat.png" alt="" /></span>
                <p>
                  애플 로그인을 사용 중 입니다.<br />
                  애플에서 비밀번호를 바꿀 수 있습니다.
                </p>
              </div>
            </li>
            <li v-else>
              <router-link :to="{ name: 'ChangePassword' }"
                >비밀번호 변경
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></router-link>
            </li>
          </ul>
        </div>
        <div class="pb-32 mypage-cont">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">기타 설정</h3>
          </div>
          <ul class="post-list">
            <li>
              <router-link :to="{ name: 'RecruiterPushNotification' }"
                >PUSH 알림
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ProfileWithdrawal' }"
                >회원 탈퇴
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></router-link>
            </li>
          </ul>
        </div>
        <div class="logout-btn-otr">
          <button
            type="button"
            class="btn logout-btn"
            @click="
              () => {
                isLogoutModal = true;
              }
            "
          >로그아웃</button>
        </div>
        <div class="version-info pb-32">버전정보 <span>{{ appVersion? appVersion: '0.0.1' }}</span></div>
      </div>
    </div>
    <LogoutModal
      :isModal="isLogoutModal"
      @closeModal="
        () => {
          isLogoutModal = false;
        }
      "
      @confirmLogout="setLogout"
    />
  </div>
</template>
  
  <script>
import { inject, onMounted, reactive, ref } from "@vue/runtime-core";
import InnerHeader from "../../../components/innerHeader.vue";
import LogoutModal from "../../../components/Modals/LogoutModal.vue";
import { useRouter } from "vue-router";
import { profile } from "@/service/API/profile.js";
import { DeviceInfo } from "@/service/API/DeviceService.js";
import { useCookies } from "vue3-cookies";
export default {
  name: "RecruiterSnsLoginSetting",
  components: {
    InnerHeader,
    LogoutModal,
  },
  setup() {
    const store = inject("authenticateStore");
    const commonstore = inject("commonStore");
    const isLogoutModal = ref(false);
    const router = useRouter();
    const { cookies } = useCookies();
    const appVersion = cookies.get('appVersion');
    const isIPhone = cookies.get('isiPhone');

    const memberData = reactive({
      details: {
        sns_type: null,
      },
    });
    onMounted(() => {
      getMemberInfo();
    });

    async function getMemberInfo() {
      let res = await profile.userDeatils();
      if (res.status === 200) {
        memberData.details.sns_type = res.data.sns_type;
      }
    }

    async function removeDeviceinfo() {
      let device_uuid = cookies.get('deviceUdid');
      let res = await DeviceInfo.removeDevice(device_uuid);
    }

    const setLogout = async () => {
      let data = {
        type: "logoutClicked",
        loginVia: localStorage.getItem("login_via")
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      isLogoutModal.value = false;
      await removeDeviceinfo();
      localStorage.removeItem("token");
      localStorage.removeItem("login_type");
      localStorage.clear();
      deleteAllCookies();
      store.state.token = undefined;
      // cookies.set("isiPhone") = commonstore.state.isiPhone,
      cookies.set("isiPhone", commonstore.state.isiPhone);
      // window.location.reload();
      router.push({ name: "home" });
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

    return {
      isLogoutModal,
      setLogout,
      memberData,
      deleteAllCookies,
      removeDeviceinfo,
      cookies,
      appVersion,
      isIPhone
    };
  },
};
</script>
  