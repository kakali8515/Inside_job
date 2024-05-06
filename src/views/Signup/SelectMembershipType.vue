<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">
          <a href="javascript:void(0);" class="left-arrow"
            ><img
              @click="$router.go(-1)"
              src="@/assets/icons/left-arrow.svg"
              alt="" /></a
          >회원가입
        </h4>
      </div>
    </div>
    <div class="container">
      <div class="sub-otr">
        <h3 class="sub-heading lg">회원가입 타입</h3>
        <p>회원가입 시 진행할 타입을 선택해 주세요</p>
      </div>
      <div class="member-card-otr">
        <!-- job seeker -->
        <div class="member-card-innr">
          <span><img src="@/assets/icons/user-icon.svg" alt="" /></span>
          <h3 class="sub-heading">개인회원(구직자) 회원가입</h3>
          <p>구직자로 가입하여 다양한 일자리를 찾고 싶어요!</p>
          <router-link
            :to="{ name: 'SelectMembershipRegistration' }"
            @click="setType('job_seeker')"
            class="btn btn-primary lg"
            >회원가입하기</router-link
          >
        </div>
        <!-- reqirter -->
        <div class="member-card-innr">
          <span><img src="@/assets/icons/user-icon2.svg" alt="" /></span>
          <h3 class="sub-heading">기업회원(구인자) 회원가입</h3>
          <p>구인자로 가입하여 다양한 인재를 찾고 싶어요!</p>
          <router-link
            :to="{ name: 'SelectMembershipRegistration' }"
            @click="setType('job_recruiter')"
            class="btn btn-primary lg"
            >회원가입하기</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectMembershipType",
  methods: {
    setType(type) {
      localStorage.setItem("UserType", type);
      localStorage.removeItem("snsuserName");
      localStorage.removeItem("snsemailid");
      localStorage.removeItem("snsloginVia");
      localStorage.removeItem("snssocialId");
    },
  },
};
</script>