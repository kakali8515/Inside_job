<template>
  <div>
    <HeaderSearch />
    <div class="common-sec back-wh">
      <div class="container p-0">
        <div class="home-slider-wrap">
          <BannerSlider />
        </div>
      </div>
      <div class="container">
        <div class="place-fliter-cont">
          <ul>
            <li>
              <a href="#"><img src="@/assets/icons/place-icon.svg" alt="" />{{ firstRegion.text }}</a>
            </li>
            <li>{{ secondRegion.text }}</li>
          </ul>
          <span @click="isShowModal = true"><a href="#"><img src="@/assets/icons/filter-icon.svg" alt="" /></a></span>
        </div>
      </div>
      <div class="slider-sec">
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">긴급</h3>
              </div>
              <EmergencySlider :firstRegion="firstRegion" :secondRegion="secondRegion"
                @scrappedSuccessful="scrappedSuccessful" />
            </div>
          </div>
        </div>
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">프리미엄</h3>
              </div>
              <PremiumSlider :firstRegion="firstRegion" :secondRegion="secondRegion"
                @scrappedSuccessful="scrappedSuccessful" />
            </div>
          </div>
        </div>
      </div>
      <div class="slider-sec">
        <div class="border-top border-f2">
          <div class="slider-otr ptb-32">
            <div class="slider-container">
              <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">스페셜</h3>
              </div>
              <SpecialSlider :firstRegion="firstRegion" :secondRegion="secondRegion"
                @scrappedSuccessful="scrappedSuccessful" />
              <!-- <Pagination
              :totalRecords="pagination.totalRecords"
              v-on:setNumber="setPage($event)"
            /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="slider-sec home-line-slider">
        <div class="border-top border-f2 border-btm">

          <div class="slider-otr ptb-32">
            <div class="slider-container myclass">
              <div class="sub-otr b-color mb-0">
                <h3 class="sub-heading mb-0">라인</h3>
              </div>
              <LineSlider :firstRegion="firstRegion" :secondRegion="secondRegion" />
            </div>
          </div>
        </div>
      </div>
      <!-- <ScrapedToast /> -->
      <div class="scrapped-icon scrapped-icon-transform act" v-if="popupMessageShow">
        <p><span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span> 스크랩했습니다.</p>
      </div>
    </div>
    <LocationSettings :isModal="isShowModal" :firstLocation="firstRegion" :secondLocation="secondRegion"
      :close="forcedClose" @closeModal="isShowModal = false, forcedClose = true" @selectedRegion="selectedRegion" />
    <Chat />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import BannerSlider from "@/components/BannerSlider.vue";
import PremiumSlider from "@/components/PremiumSlider.vue";
import EmergencySlider from "@/components/EmergencySlider.vue";
import SpecialSlider from "@/components/SpecialSlider.vue";
import LineSlider from "@/components/LineSlider.vue";
import Pagination from "@/components/Pagination.vue";
// import ScrapedToast from "@/components/Utils/ScrapedToast.vue"
import { inject, onUnmounted, onMounted, onUpdated, reactive, ref } from "@vue/runtime-core";
import { useCookies } from "vue3-cookies";
import LocationSettings from "../../components/Modals/LocationSettings.vue";
// import {DeviceInfo} from "@/service/API/DeviceService.js";
export default {
  name: "Home",
  components: {
    HeaderSearch,
    BannerSlider,
    PremiumSlider,
    EmergencySlider,
    SpecialSlider,
    LineSlider,
    Pagination,
    LocationSettings,
    Chat
  },

  data() {
    return {
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
    }
  },

  setup() {
    const popupMessageShow = ref(false)
    const commonstore = inject("commonStore");
    const authStore = inject("authenticateStore");
    const { cookies } = useCookies();
    const firstRegion = reactive({ id: '', text: "서울" });
    const secondRegion = reactive({ level_id: '', id: '', text: "전체" })
    const isShowModal = ref(false)
    const forcedClose = ref(false)
    const pagination = reactive({
      totalRecords: 3,
      perPage: 10,
      pageNo: 1,
    });

    const search = () => {
      console.log('search')
    }

    onMounted(() => {
      commonstore.methods.isFromApp();
      // if (authStore.methods.isAuthenticate()) {
      //   console.log('logedin')
      //   getDeviceinfo();
      // }
    });
    onUpdated(() => {
      commonstore.methods.isFromApp();
      // if (authStore.methods.isAuthenticate()) {
      //   console.log('logedin')
      //   getDeviceinfo();
      // }
    });

    onUnmounted(() => {
      commonstore.state.isSheetOpen = false;
    });

    function setPage(event) {
      pagination.pageNo = event;
    }

    // async function getDeviceinfo() {
    //   let dinfo = {
    //     device_uuid: "1234",
    //     device_type: "android",
    //     device_token: "3423tr2tc5yv46vy5h5h5h6yhj78i5u57u5u",
    //   }
    //   let res = await DeviceInfo.addDevice(dinfo);
    //   console.log('--getDeviceinfo--');
    //   console.log('getDeviceinfo--',res);
    // }

    const selectedRegion = (data, selected1stRegion) => {
      firstRegion.id = selected1stRegion.id
      firstRegion.text = selected1stRegion.text
      secondRegion.id = data.id
      secondRegion.text = data.text
      secondRegion.level_id = selected1stRegion.id
      isShowModal.value = false
    }

    const scrappedSuccessful = () => {
      popupMessageShow.value = true
      setTimeout(() => { popupMessageShow.value = false }, 4000)
    }

    return {
      commonstore,
      authStore,
      popupMessageShow,
      pagination,
      isShowModal,
      forcedClose,
      firstRegion,
      secondRegion,
      setPage,
      cookies,
      search,
      selectedRegion,
      scrappedSuccessful,
    };
  },
};
</script>
<style scoped>
.scrapped-icon-transform {
  transform: none
}

.hand-pointer {
  cursor: pointer !important
}
</style>
