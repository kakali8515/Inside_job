<template>
  <header class="header" v-if="$route.meta.mainHeader">
    <div class="header-box">
      <div class="container">
        <div class="hdr-innr">
          <div class="left">
            <!-- <a href="#" class="noti-icon"
              ><img src="@/assets/icons/notification-icon.svg" alt="" />
              <span></span
            ></a> -->
            <a href="#" @click="isLogin($event, 'Notice')" :class="is_read === '1' ? 'noti-icon' : ''"><img
                src="@/assets/icons/notification-icon.svg" alt="" />
              <span></span></a>
          </div>
          <div class="middle">
            <a href="#" class="logo"><img src="@/assets/images/logo.svg" alt="" /></a>
          </div>
          <div class="right">
            <ul>
              <li>
                <a href="#" @click="toggleClass">
                  <!-- <img src="@/assets/icons/eye-blk.svg" alt="" /> -->
                  <Vue3Lottie :animationData="EyesJSON" :height="24" :width="24" />
                </a>
              </li>
              <li>
                <a href="#" @click="openSheet($event, true)"><img src="@/assets/icons/user-blk.svg" alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <LogIn/> -->
  </header>
</template>

<script>
// import themes from "@/mixins/switch";
import { inject, onMounted, onUpdated, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import LogIn from "../views/Signup/LogIn.vue";
import { notification } from "@/service/API/notification.js";
import EyesJSON from '@/assets/icons/Eyes.json';

export default {
  name: "Header",
  // mixins: [themes],
  props: {
    theme: {
      type: String,
      default: "theme-dark",
    },
  },
  // watch: {
  //   currentTheme(val) {
  //     this.$emit("on-current-theme-change", this.currentTheme);
  //   },
  // },
  setup() {
    const router = useRouter();
    const commonstore = inject("commonStore");
    const store = inject("authenticateStore");

    const currentTheme = ref("");
    const is_read = ref(0);

    watch(
      () => commonstore.state.currentUsertype,
    );

    watch(
      () => commonstore.state.isSilverBellOpen,
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

    onUpdated(() => {
      newNotification()
    })
    onMounted(() => {

      let storedTheme = commonstore.state.currentThemeStore;
      if (!storedTheme) {
        currentTheme.value = "theme-large";
        commonstore.state.currentThemeStore = currentTheme.value;
      } else {
        currentTheme.value = commonstore.state.currentThemeStore;
      }
      console.log("check setting", commonstore.state.themeSetting);
    });

    async function newNotification() {
      let res = await notification.notificationStatus()
      if (res.status === 200) {
        is_read.value = res.data.is_read
      }
    }

    const openSheet = (e, val) => {
      e.preventDefault();
      if (val && !store.methods.isAuthenticate()) {
        commonstore.state.isSheetOpen = val;
        console.log("Bottom Sheet Active !!", val);
      } else {
        console.log('usertype--', store.state.loginType)
        if (store.state.loginType == 'job_seeker') {
          router.push({ name: "MyPage" });
        } else if (store.state.loginType == 'job_recruiter') {
          router.push({ name: "RecruiterMyPage" });
        }
      }
    };

    function toggleClass() {
      let silverBtnModal = localStorage.getItem("silverBtn-modal");
      var storedTheme = commonstore.state.currentThemeStore;
      console.log(storedTheme);
      if (silverBtnModal) {
        commonstore.methods.openSilverBellModal(true);
      } else {
        if (!storedTheme) {
          currentTheme.value = "theme-small";
          commonstore.methods.changeTheme(currentTheme.value);
        }
        if (storedTheme === "theme-large") {
          currentTheme.value = "theme-small";
          commonstore.methods.changeTheme(currentTheme.value);
        } else {
          currentTheme.value = "theme-large";
          commonstore.methods.changeTheme(currentTheme.value);
        }
      }
    }

    function isLogin(e, direction) {
      e.preventDefault();
      console.log(store.methods.isAuthenticate());
      if (store.methods.isAuthenticate()) {
        router.push({ name: direction });
      } else {
        commonstore.state.isSheetOpen = true;
      }
    }

    return {
      commonstore,
      store,
      openSheet,
      toggleClass,
      isLogin,
      is_read,
      EyesJSON
    };
  },
  components: { LogIn },
};
</script>
