<template>
  <div class="header-search">
    <div class="container" v-if="searchType=== true">
      <div class="search-field">
        <form>
          <div class="search-innr">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              class="search-input"
              @click="$router.push('/job-seekers/search')"
            />
            <input type="button" value="" class="submit" @click="$router.push('/job-seekers/search')" />
          </div>
        </form>
      </div>
    </div>
    <div class="hdr-menu">
      <div class="container">
        <ul>
          <li :class="[$route.name == 'home' ? 'active' : '']"><router-link to="" @click="openPage('home')">홈</router-link></li>
          <li :class="[$route.name == 'Region' ? 'active' : '']"><router-link to="" @click="openPage('Region')">지역</router-link></li>
          <li :class="[$route.name == 'Around' ? 'active' : '']"><router-link to="" @click="openPage('Around')">근처</router-link></li>
          <li v-if="(isLogin && store.state.loginType == 'job_seeker') || !isLogin" :class="[$route.name == 'AiRecommendationList' ? 'active' : '']"><router-link to="" @click="openPage('AiRecommendationList')">AI 추천</router-link></li>
          <li v-if="!isLogin" :class="[$route.name == 'Enterprise' ? 'active' : '']">
            <router-link to="" @click="openSheet($event, true)">기업</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <LogIn/> -->
</template>

<script>
import { computed, inject, onMounted, ref } from "vue";
import LogIn from "../views/Signup/LogIn.vue";
import { useRouter } from 'vue-router';
export default {
  name: "HeaderSearch",
  components: { LogIn },
  props: {
    searchType: {
      type: Boolean,
    default: true
    }
  },
  setup() {
    const router = useRouter();
    const store = inject("authenticateStore");
    const commonstore = inject("commonStore");
    const isLogin = computed(() => (store.state.token ? true : false));

    onMounted(() => {
      console.log(isLogin.value);
      if (!isLogin.value) {
        let token = localStorage.getItem("token");
        store.methods.setToken(token);
      }
    });

    const openSheet = (e, val) => {
      e.preventDefault();
      if (val && isLogin) {
        commonstore.state.isSheetOpen = val;
        commonstore.state.loginDefault = 1;
        console.log("Bottom Sheet Active !!", val);
      }
    };
    const openPage = (direction) => {
      if(direction=='Region'){
        localStorage.setItem("mapstatus", "load");
      }
      router.push({name: direction})
    };
    

    return {
      store,
      isLogin,
      openSheet,
      openPage
    };
  },
};
</script>

