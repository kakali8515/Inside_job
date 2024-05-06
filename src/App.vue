<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="scale-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </Layout>
</template>

<script>
import Layout from "./layout/layout.vue";
import { defineComponent, provide } from "vue";
import authenticateStore from "./store/authenticateStore.js";
import commonStore from "./store/common.js";
import employmentStore from "./store/employmentStore.js";
import occupationStore from "./store/occupationStore.js";
import resumeStore from "./store/resumeStore.js";
import regionStore from "./store/regionStore.js";
import testData from "./config/snssupport.json";

export default defineComponent({
  name: "App",
  components: { Layout },

  // Stores here
  setup() {
    provide("authenticateStore", authenticateStore);
    provide("commonStore", commonStore);
    provide("employmentStore", employmentStore);
    provide("occupationStore", occupationStore);
    provide("resumeStore", resumeStore);
    provide("regionStore", regionStore);
  },
  watch: {
    $route(to, from) {
      if (to.name != from.name) {
      commonStore.state.isSheetOpen = false;
      }
    },
  },
  mounted() {
    window.Kakao.init("baba53ab5d2d7c1f634c44f9de972bcc");
    console.log(Kakao.isInitialized());
    // window["sendPushNotificationData"] = (res) => {
    //   this.sendPushNotificationData(res);
    // };
    console.log("testdaat-- ", testData.deviceinfo);
    window["backButtonHandeler"] = (res) => {
      this.isBackbuttonAction(res);
    };
    // this.isloadapp();

    // window["getDeviceinfo"] = (res) => {
    //   alert('got data from getDeviceinfo call');
    //   this.getDeviceinfoHandler(res);
    // };
  },
  methods: {
    isBackbuttonAction(res) {
      let data = {
        type: "lastHistory",
      };
      let dataOne = {
        type: "hasHistory",
      };
      if (res) {
        const histroyCount = window.history.state.position;
        commonStore.state.isSheetOpen = false;
        if (histroyCount > 0) {
          window.parent.postMessage(JSON.stringify(dataOne), "*");
        } else {
          window.parent.postMessage(JSON.stringify(data), "*");
        }
      }
    },
    // getDeviceinfoHandler(data) {
    //   let res = data;
    //   let res2 = JSON.stringify(data);
    //   alert('app-- '+ res2);
    //   localStorage.setItem("deviceUdid", res.udid);
    // },
    // isloadapp() {
    //   let data = {
    //     type: "loadapp",
    //   };
    //   window.parent.postMessage(JSON.stringify(data), "*");
    //   alert('loadapp');
    // },
  },
});
</script>

<style lang="scss">
@import "./styles/style.scss";

.scale-slide-enter-from {
  opacity: 0;
  transform: translatey(50px);
}

.scale-slide-enter-active {
  transition: all 0.3s ease-out;
}

.scale-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.scale-slide-leave-active {
  transition: all 0.3s ease-in;
}
</style>
