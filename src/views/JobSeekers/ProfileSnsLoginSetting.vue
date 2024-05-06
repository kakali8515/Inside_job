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
          <ul class="post-list mb-16">
            <li>
              <a href="#">회원정보 수정 <span><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span></a>
            </li>
            <li>
              <a href="#" class="disable">비밀번호 변경 <span><img src="@/assets/icons/right-arrow-large.svg"
                    alt="" /></span></a>
              <div class="kakao-chng-pwd">
                <span><img src="@/assets/images/kakao-chat.png" alt="" /></span>
                <p>카카오 로그인을 사용중입니다.<br>
                  비밀번호는 카카오에서 변경하실 수 있습니다.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="pb-32 mypage-cont">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">기타 설정</h3>
          </div>
          <ul class="post-list">
            <li>
              <a href="#">PUSH 알림 <span><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span></a>
            </li>
            <li>
              <a href="#">회원 탈퇴 <span><img src="@/assets/icons/right-arrow-large.svg" alt="" /></span></a>
            </li>
          </ul>
        </div>
        <div class="logout-btn-otr">
          <button class="btn logout-btn">로그아웃</button>
        </div>
        <div class="version-info pb-32">
          버전정보 <span>{{ appVersion? appVersion: '0.0.1' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "ProfileSnsLoginSetting",
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
