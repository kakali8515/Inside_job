<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading"><a href="javascript:void(0);" class="left-arrow"><img @click="$router.go(-1)"
              src="@/assets/icons/left-arrow.svg" alt="" /></a>회원가입</h4>
      </div>
    </div>
    <div class="container">
      <div class="sub-otr">
        <h3 class="sub-heading lg">회원가입 방법</h3>
        <p>회원가입 시 진행할 방법을 선택해 주세요</p>
      </div>
      <div class="member-card-otr">
        <div class="member-card-innr pb-16 mb-32">
          <h3 class="sub-heading">SNS 회원가입</h3>
          <p>SNS 아이디를 통해 회원으로 가입합니다.</p>
          <div class="reg-btn">
            <button class="btn btn-secondary lg" @click="mbKakaoLogin">
              <em><img src="@/assets/icons/chat-icon.svg" alt="" /></em>
              카카오로 시작하기
            </button>
            <button :class="`btn btn-success lg ${isAppaleId ? '' : 'mb-btn-0'}`" @click="mbNaverLogin">
              <em><img src="@/assets/icons/n-icon.svg" alt="" /></em>
              네이버로 시작하기
            </button>
            <!-- social login for appale -->
            <button class="btn btn-black lg" v-show="isAppaleId" @click="mbAppleLogin">
              <em><img src="@/assets/icons/apple.svg" alt="" /></em>
              Apple로 계속하기
            </button>
          </div>
        </div>
        <div class="member-card-innr">
          <h3 class="sub-heading">일반 회원가입</h3>
          <p>일반적인 방법을 통해 회원으로 가입합니다.</p>
          <router-link to="/cellphone-authentication" class="btn btn-primary lg">회원가입하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sns from "../../config/snssupport.json";
export default {
  name: "SelectMembershipRegistration",
  data() {
    return {
      isPlatMobile: this.$cookies.get("isMobile") === "true",
      isAppaleId: this.$cookies.get("isiPhone") === "true",
      snsD: sns,
    }
  },
  mounted() {
    // web view get message
    // console.log('snsdata', this.snsD.kakao)
    window["sendKakaoLoginData"] = (res) => {
      this.sendKakoAccessToken(res);
      // alert(res);
    };
    window["sendNaverLoginData"] = (res) => {
      this.sendNaverAccessToken(res);
      // alert(res);
    };
    window["sendAppleLoginData"] = (res) => {
      this.sendAppleAccessToken(res);
      // alert(res);
    };
  },
  methods: {
    // Webview get support
    sendKakoAccessToken(res) {
      let snsdata = JSON.parse(res);
      // let snsdata2 = JSON.stringify(res);
      // alert(snsdata);
      // alert(snsdata2);
      // alert(snsdata.userName);
      // console.log("snsdata:--", snsdata);
      localStorage.setItem('snsaccesstoken',snsdata.accessToken);
      localStorage.setItem('snsemailid',snsdata.emailId);
      localStorage.setItem('snsloginVia',snsdata.loginVia);
      localStorage.setItem('snssocialId',snsdata.socialId);
      localStorage.setItem('snsuserName',snsdata.userName);
      setTimeout(() => {
        this.$router.push({name: 'CellphoneAuthentication'});
      }, 500);
    },
    sendNaverAccessToken(res) {
      let snsdata = JSON.parse(res);
      // let snsdata2 = JSON.stringify(res);
      // alert(snsdata);
      // alert(snsdata2);
      // alert(snsdata.userName);
      // console.log("snsdata:--", snsdata);
      localStorage.setItem('snsaccesstoken',snsdata.accessToken);
      localStorage.setItem('snsemailid',snsdata.emailId);
      localStorage.setItem('snsloginVia',snsdata.loginVia);
      localStorage.setItem('snssocialId',snsdata.socialId);
      localStorage.setItem('snsuserName',snsdata.userName);
      setTimeout(() => {
        this.$router.push({name: 'CellphoneAuthentication'});
      }, 500);
    },
    sendAppleAccessToken(res) {
      let snsdata = JSON.parse(res);
      // let snsdata2 = JSON.stringify(res);
      // alert(snsdata);
      // alert(snsdata2);
      // alert(snsdata.userName);
      // console.log("snsdata:--", snsdata);
      // let isNamePresent = localStorage.getItem("snsuserName")
      localStorage.setItem('snsaccesstoken',snsdata.accessToken);
      // localStorage.setItem('snsemailid',snsdata.emailId);
      localStorage.setItem('snsloginVia',snsdata.loginVia);
      localStorage.setItem('snssocialId',snsdata.socialId);
      // alert(isNamePresent + "checking stored name")
      // let nameWithoutSpace = snsdata.userName.trim();
      // if( nameWithoutSpace != "") {
      //   localStorage.setItem('snsuserName',snsdata.userName);
      //   alert(localStorage.getItem('snsuserName') + " in storage sign-up");
      // }
      setTimeout(() => {
        this.$router.push({name: 'CellphoneAuthentication'});
      }, 500);
    },

    //post login
    mbKakaoLogin() {
      // localStorage.setItem('snsloginVia', 'kakao');
      let data = {
        type: "kakaoLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("kakaoLoginClicked", "*");
      // alert('kakaoLoginClicked');
      // this.sendKakoAccessToken(this.snsD.kakao);
    },
    mbNaverLogin() {
      let data = {
        type: "naverLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("naverLoginClicked", "*");
      // alert('naverLoginClicked');
    },
    mbAppleLogin() {
      let data = {
        type: "appleLoginClicked",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // window.parent.postMessage("appleLoginClicked", "*");
      // alert('appleLoginClicked');
    },
  }
}
</script>