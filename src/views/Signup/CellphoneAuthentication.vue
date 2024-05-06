<template>
  <div class="back-wh mb-16">
    <div class="top-hdr top-hdr-br mb-0">
      <div class="container">
        <h4 class="heading">
          <a href="javascript:void(0);" class="left-arrow"
            ><img
              @click="stepback()"
              src="@/assets/icons/left-arrow.svg"
              alt="" /></a
          >{{ headingType }}
        </h4>
      </div>
    </div>
    <div class="container">
      <div class="step-otr">
        <ul class="step-list">
          <li class="active">STEP.1</li>
          <li :class="setactive">STEP.2</li>
          <li>STEP.3</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="back-wh pb-0">
    <form>
      <div class="form-wrapper-step">
        <!-- <FormStepOne @passData="GetData($event)" v-show="stepOne" /> -->
        <FormStepTwo
          ref="childComponent"
          v-show="stepTwo"
          @receivedata="GetData($event)"
          @activeStepTwo="activeStepTwo()"
        />
      </div>
    </form>
  </div>
</template>

<script>
// import FormStepOne from "@/components/FormStepOne.vue";
import FormStepTwo from "@/components/FormStepTwo.vue";
// import { onBeforeRouteLeave  } from "vue-router";
export default {
  name: "CellphoneAuthentication",
  components: { FormStepTwo },
  data() {
    return {
      setactive: "",
      stepOne: true,
      stepTwo: false,
      personInfo: "",
      headingType: "",
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   // Save the current scroll position
  //   window.scrollTo(0, 0);
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   const rememberstep = sessionStorage.getItem("signup-step");
  //   // const previousRoute = window.history.state.route;
  //   console.log(window.history);
  //   console.log('to:form',to,from);
  //   if (rememberstep == "step1-done") {
  //     next(false);
  //     sessionStorage.setItem("signup-step", "step0-done");
  //     sessionStorage.setItem("signup-step-one", "completed");
  //     this.setactive = false;
  //     this.$refs.childComponent.timerDisplay = "00.00";
  //     this.$refs.childComponent.stepOne = true;
  //     this.$refs.childComponent.steptwo = false;
  //     this.$refs.childComponent.clearTimeout();
  //     console.log('if');
  //     // window.history.pushState(null, null, window.location.href);
  //   } else {
  //     // this.$router.replace(previousRoute);
  //     console.log('else');
  //     next();
  //     // this.$router.go(-1);
  //   }
  //   // if (rememberstep == "step0-done") {
  //   //   this.$router.replace(previousRoute);
  //   //   next();
  //   // }
  // },
  mounted() {
    //개인회원(구직자) 회원가입
    if (localStorage.getItem("UserType") == "job_recruiter") {
      this.headingType = "기업회원(구인자) 회원가입";
    } else {
      this.headingType = "개인회원(구직자) 회원가입";
    }
    sessionStorage.setItem("signup-step", "step0-done");
    sessionStorage.setItem("signup-step-one", "incomplete");
  },
  methods: {
    stepback() {
      const rememberstep = sessionStorage.getItem("signup-step");
      if (rememberstep == "step1-done") {
        sessionStorage.setItem("signup-step", "step0-done");
        sessionStorage.setItem("signup-step-one", "completed");
        this.setactive = false;
        this.$refs.childComponent.timerDisplay = "00.00";
        this.$refs.childComponent.stepOne = true;
        this.$refs.childComponent.steptwo = false;
        this.$refs.childComponent.clearTimeout();
      }
      if (rememberstep == "step0-done") {
        this.$router.go(-1);
      }
    },
    GetData(data) {
      this.personInfo = data;
      if (data != {}) {
        this.stepOne = false;
        this.stepTwo = true;
        this.setactive = "active";
      }
      console.log(data);
    },
    activeStepTwo() {
      this.setactive = "active";
    },
  },
};
</script>
