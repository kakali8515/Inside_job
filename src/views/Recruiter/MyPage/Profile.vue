<template>
  <div class="back-wh">
    <div class="top-hdr">
      <div class="container">
        <InnerHeader headerTitle="회원정보" />
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
              <a href="#"
                >회원정보 수정
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></a>
            </li>
            <li>
              <a href="#"
                >기업정보 수정
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></a>
            </li>
            <li>
              <a href="#"
                >비밀번호 변경
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></a>
            </li>
          </ul>
        </div>
        <div class="pb-32 mypage-cont">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">기타 설정</h3>
          </div>
          <ul class="post-list req">
            <li>
              <a href="#"
                >PUSH 알림
                <span
                  ><img
                    src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span
              ></a>
            </li>
            <li>
              <router-link :to="{ name: 'ProfileWithdrawal'}"
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
            class="btn logout-btn">
            로그아웃
          </button>
        </div>
        <div class="version-info pb-32">버전정보 <span>{{ appVersion? appVersion: '0.0.1' }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "RecruiterProfile",
  components: {
    InnerHeader,
  },
  setup() {
    const { cookies } = useCookies();
    const appVersion = cookies.get('appVersion');

    return {
      cookies,
      appVersion
    }
  }
};
</script>
