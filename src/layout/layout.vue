<template>
  <div :class="[commonstore.state.currentThemeStore]">
    <div class="body">
      <!-- header -->
      <Header
        @on-current-theme-change="setTheme($event)"
        v-if="
          occupationStore.state.isOccupationOpen === false &&
          regionStore.state.isRegionOpen === false
        "
      />
      <!-- body -->
      <div
        :class="`wrapper-innr ${
          currentRouteName && isFooterShow ? '' : 'pb-0'
        }`"
      >
        <slot />
        <!-- <Chat v-if="currentRouteName && isChatShow" /> -->
      </div>
      <!-- body -->
      <!-- Footer -->
      <Footer v-if="currentRouteName && isFooterShow" />
      <!-- login -->
      <LogIn v-if="commonstore.state.isSheetOpen" @scrollToTop="setToTop" />
      <!-- Scraped Toast -->
      <!-- <ScrapedToast /> -->
      <!-- SilverBell Modal -->
      <SilverBell />
      <!-- Info modal for login messages -->
      <InfoModal
        :isModal="commonstore.state.loginInfoModal.isShow"
        :message="commonstore.state.loginInfoModal.message"
        @closeModal="clseModal"
      />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Chat from "@/components/Chat.vue";
import SilverBell from "@/views/Signup/SilverBell.vue";
import ScrapedToast from "@/components/Utils/ScrapedToast.vue";
// import LogIn from "@/views/Signup/LogIn.vue";
import { inject } from "@vue/runtime-core";
import InfoModal from "@/components/Modals/InfoModal.vue";
export default {
  name: "App",
  components: { Header, Footer, Chat, ScrapedToast, SilverBell, InfoModal },
  data() {
    return {
      currentTheme: "theme-small",
      occupationStore: inject("occupationStore"),
      regionStore: inject("regionStore"),
      commonstore: inject("commonStore"),
      // isShow: commonstore.state.loginInfoModal.isShow = false
    };
  },

  mounted() {
    localStorage.setItem("silverBtn-modal", true);
  },

  computed: {
    currentRouteName() {
      return (
        this.occupationStore.state.isOccupationOpen === false &&
        this.regionStore.state.isRegionOpen === false
      );
    },
    isChatShow() {
      return this.$route.meta.isChat !== "hide" ? true : false;
    },
    isFooterShow() {
      return this.$route.meta.isFooter !== "hide";
    },
  },
  methods: {
    setTheme(newTheme) {
      this.currentTheme = newTheme;
    },
    setToTop() {
      window.scrollTo(0, 0);
    },
    clseModal() {
      // alert('clsmodal');
      if(this.commonstore.state.loginInfoModal.logintype == 'sns') {
        this.$router.push({ name: "SelectMembershipType" });
      }
      this.commonstore.state.loginInfoModal.logintype = '';
      this.commonstore.state.loginInfoModal.isShow = false;
    }
  },
};
</script>

<style lang="scss">
@import "../styles/style.scss";
</style>
