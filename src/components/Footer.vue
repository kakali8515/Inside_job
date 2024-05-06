<template>
  <div>
    <footer class="footer">
      <div class="container">
        <ul>
          <li
            :class="[
              ($route.name == 'home' &&
                commonStore.state.isViewmoreMenuOpen === false) ||
              ($route.name == 'Around' &&
                commonStore.state.isViewmoreMenuOpen === false) ||
              ($route.name == 'HomeLanding' &&
                commonStore.state.isViewmoreMenuOpen === false) ||
              ($route.name == 'Region' &&
                commonStore.state.isViewmoreMenuOpen === false) ||
              ($route.name == 'AiRecommendationList' &&
                commonStore.state.isViewmoreMenuOpen === false)
                ? 'active'
                : '',
            ]"
          >
            <router-link
              to=""
              class="view-more-btn"
              @click="
                $router.push({ name: 'home' }),
                  (commonStore.state.isViewmoreMenuOpen = false)
              "
            >
              <span
                ><img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon4.svg"
                  alt="" /><img
                  class="red-icon"
                  src="@/assets/icons/ft-red-icon4.svg"
                  alt=""
              /></span>
              홈
            </router-link>
          </li>
          <li
            :class="[
              $route.name == 'Scrap' &&
              commonStore.state.isViewmoreMenuOpen === false
                ? 'active'
                : '',
            ]"
            v-if="
              !isLoggedIn ||
              (isLoggedIn && store.state.loginType == 'job_seeker')
            "
          >
            <router-link
              @click="isLogin($event, 'Scrap')"
              to=""
              class="view-more-btn"
              ><span
                ><img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon1.svg"
                  alt="" /><img
                  class="red-icon"
                  src="@/assets/icons/ft-red-icon1.svg"
                  alt=""
              /></span>
              스크랩</router-link
            >
          </li>
          <li
            :class="[
              $route.name == 'JobListing' &&
              commonStore.state.isViewmoreMenuOpen === false
                ? 'active'
                : '',
            ]"
            v-if="isLoggedIn && store.state.loginType == 'job_recruiter'"
          >
            <router-link
              @click="isLogin($event, 'JobListing')"
              to=""
              class="view-more-btn"
              ><span
                ><img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon2.svg"
                  alt="" /><img
                  class="red-icon"
                  src="@/assets/icons/ft-red-icon2.svg"
                  alt=""
              /></span>
              채용공고 관리</router-link
            >
          </li>
          <li
            :class="[
              $route.name == 'RecentlyViewedAnnouncement' &&
              commonStore.state.isViewmoreMenuOpen === false
                ? 'active'
                : '',
            ]"
            v-if="
              (isLoggedIn && store.state.loginType == 'job_seeker') ||
              !isLoggedIn
            "
          >
            <router-link
              @click="isLogin($event, 'RecentlyViewedAnnouncement')"
              class="view-more-btn"
              to=""
            >
              <span
                ><img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon2.svg"
                  alt="" /><img
                  class="red-icon"
                  src="@/assets/icons/ft-red-icon2.svg"
                  alt=""
              /></span>
              최근 본 공고</router-link
            >
          </li>
          <li
            :class="[
              $route.name == 'TalentSearchList' &&
              commonStore.state.isViewmoreMenuOpen === false
                ? 'active'
                : '',
            ]"
            v-if="isLoggedIn && store.state.loginType == 'job_recruiter'"
          >
            <router-link
              @click="isLogin($event, 'TalentSearchList')"
              to=""
              class="view-more-btn"
            >
              <span
                ><img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon5.svg"
                  alt="" /><img
                  class="red-icon"
                  src="@/assets/icons/ft-red-icon5.svg"
                  alt=""
              /></span>
              인재 검색</router-link
            >
          </li>
          <li>
            <a
              @click.prevent="openViewMore"
              href="#"
              ref="isViewMoreBtn"
              class="view-more-btn"
            >
              <span>
                <img
                  class="gray-icon"
                  src="@/assets/icons/ft-icon3.svg"
                  alt=""
                />
              </span>
              더보기
            </a>
          </li>
        </ul>
      </div>
    </footer>

    <div
      class="more-menu-overlay"
      :class="{ 'more-menu-show': commonStore.state.isViewmoreMenuOpen }"
    >
      <div class="more-menu-cont">
        <ul v-if="authStore.state.loginType === 'job_seeker'">
          <li :class="[$route.name == 'LaborContract' ? 'active' : '']">
            <a href="#" @click="isLogin($event, 'LaborContract')">
              <span
                ><img src="@/assets/icons/employment-icon.svg" alt=""
              /></span>
              근로계약서</a
            >
          </li>
          <li :class="[$route.name == 'ResignationLetter' ? 'active' : '']">
            <router-link
              :to="{ name: 'ResignationLetter' }"
              @click="commonStore.state.isViewmoreMenuOpen = false"
            >
              <span
                ><img src="@/assets/icons/resignation-icon.svg" alt=""
              /></span>
              사직서
            </router-link>
          </li>
          <li :class="[$route.name == 'Resume' ? 'active' : '']">
            <a
              @click="
                $router.push('/job-seekers/resume'),
                  (commonStore.state.isViewmoreMenuOpen = false)
              "
            >
              <span><img src="@/assets/icons/resume-icon.svg" alt="" /></span>
              이력서</a
            >
          </li>
          <li :class="[$route.name == 'JobHuntingCertificate' ? 'active' : '']">
            <router-link
              :to="{ name: 'JobHuntingCertificate' }"
              @click="commonStore.state.isViewmoreMenuOpen = false"
            >
              <span
                ><img
                  src="@/assets/icons/employment-certificate-icon.svg"
                  alt=""
              /></span>
              취업활동증명서
            </router-link>
          </li>
          <li :class="[$route.name == 'PositionOffer' ? 'active' : '']">
            <router-link
              :to="{ name: 'PositionOffer' }"
              @click="commonStore.state.isViewmoreMenuOpen = false"
            >
              <span><img src="@/assets/icons/position-icon.svg" alt="" /></span>
              포지션 제안
            </router-link>
          </li>
          <li :class="[$route.name == 'ConsultationOnLabor' ? 'active' : '']">
            <router-link
              :to="{ name: 'ConsultationOnLabor' }"
              @click="commonStore.state.isViewmoreMenuOpen = false"
            >
              <span
                ><img src="@/assets/icons/consultaion-icon.svg" alt=""
              /></span>
              노무 상담하기
            </router-link>
          </li>
        </ul>

        <ul id="recruiter-more-menu" v-else>
          <li :class="[$route.name == 'LaborContract' ? 'active' : '']">
            <a href="#" @click="isLogin($event, 'LaborContract')">
              <span
                ><img src="@/assets/icons/employment-icon.svg" alt=""
              /></span>
              근로계약서</a
            >
          </li>
          <li :class="[$route.name == 'ResignationLetter' ? 'active' : '']">
            <router-link @click="isLogin($event, 'ResignationLetter')" to="">
              <span
                ><img src="@/assets/icons/resignation-icon.svg" alt=""
              /></span>
              사직서
            </router-link>
          </li>
          <li :class="[$route.name == 'PaidProductPurchase' ? 'active' : '']">
            <router-link @click="isLogin($event, 'PaidProductPurchase')" to="">
              <span
                ><img src="@/assets/icons/paid-product-icon.svg" alt=""
              /></span>
              유료상품 구매</router-link
            >
          </li>
          <li :class="[$route.name == 'ConsultationOnLabor' ? 'active' : '']">
            <router-link @click="isLogin($event, 'ConsultationOnLabor')" to="">
              <span
                ><img src="@/assets/icons/consultaion-icon.svg" alt=""
              /></span>
              노무 상담하기
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed, ref, watch, onMounted } from "@vue/runtime-core";
import resignService from "../service/API/resignation";
import { useRouter } from "vue-router";
export default {
  name: "Footer",

  setup() {
    const authStore = inject("authenticateStore");
    const commonStore = inject("commonStore");
    const store = inject("authenticateStore");
    const isLoggedIn = computed(() => (store.state.token ? true : false));
    const isViewMoreBtn = ref(null);
    const router = useRouter();

    onMounted(() => {
      if (commonStore.state.isViewmoreMenuOpen) {
        isViewMoreBtn.value.focus();
      }
    });

    watch(
      () => commonStore.state.isViewmoreMenuOpen,
      (newVal, oldVal) => {
        if (newVal) {
          isViewMoreBtn.value.focus();
        }
      }
    );
    function showdata() {
      new resignService().processlist(1,10).then((res) => {
        sessionStorage.setItem("count1", res.data.total_records);
        // this.commonstore.methods.setprogressVal(res.data.total_records);
      });
      new resignService().completelist(1,10).then((res) => {
        sessionStorage.setItem("count2", res.data.total_records);
        // this.commonstore.methods.setcompletedVal(res.data.total_records);
      });
    }
    function isLogin(e, direction) {
      e.preventDefault();
      // console.log(authStore.methods.isAuthenticate());
      if (authStore.methods.isAuthenticate()) {
        router.push({ name: direction });
        commonStore.state.isViewmoreMenuOpen = false;
      } else {
        commonStore.state.isSheetOpen = true;
        commonStore.state.isViewmoreMenuOpen = false;
      }
    }

    function openViewMore(e) {
      showdata();
      e.preventDefault();
      if (authStore.methods.isAuthenticate()) {
        commonStore.state.isViewmoreMenuOpen =
          !commonStore.state.isViewmoreMenuOpen;
      } else {
        commonStore.state.isSheetOpen = true;
        commonStore.state.isViewmoreMenuOpen = false;
      }
    }

    function close() {
      setTimeout(() => {
        commonStore.state.isViewmoreMenuOpen = false;
      }, 100);
    }

    return {
      authStore,
      store,
      isLoggedIn,
      commonStore,
      isViewMoreBtn,
      isLogin,
      openViewMore,
      close,
      showdata,
    };
  },
};
</script>
