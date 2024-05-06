<template>
  <swiper :modules="modules" :slidesPerView="1" :spaceBetween="8" :loop="true" :pagination="{ clickable: true }" :autoplay="true"
    :centeredSlides="true" :speed="1500" @swiper="onSwiper" :allowSlidePrev= "listOfBannerData.lists.length === 1 ? false : true"
    :allowSlideNext = "listOfBannerData.lists.length === 1 ? false : true" :initialSlide="1" @slideChange="onSlideChange" class="image-swiper">
    <swiper-slide v-for="(i, e) in listOfBannerData.lists" :key="e">
      <figure @click="sendUrl(i.redirection_url)"><img :src="i.image_url" alt="" /></figure>
    </swiper-slide>
  </swiper>
</template>
 

<script>
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { HomeService } from '../service/API/Home';
import { useRouter } from 'vue-router';
import { useCookies } from "vue3-cookies";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import { Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
export default {
  name: "BannerSlider",
  components: {
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination
  },
  setup() {
    const router = useRouter();
    const listOfBannerData = reactive({
      lists: [],
    });
    const { cookies } = useCookies();

    onBeforeMount(async () => {
      await listOfBanner();
    });


    const onSwiper = (swiper) => {
      //console.log(swiper);
    };
    const onSlideChange = () => {
      //console.log('slide change');
    };

    const listOfBanner = async () => {
      try {
        let res = await HomeService.bannerList();
        listOfBannerData.lists = res.data.result;
        if(res.data.is_visible == 1) {
          localStorage.setItem('isfieldHide', true);
          cookies.set('isfieldHide', true);
        } else {
          localStorage.setItem('isfieldHide', false);
          cookies.set('isfieldHide', false);
        }
        console.log('istOfBannerData.lists--',res.data.is_visible)
      } catch (e) {

      }

    };

    const sendUrl = (redirectUrl) => {
      let data = {
        type: "bannerClick",
        url: redirectUrl
      };
      window.parent.postMessage(JSON.stringify(data), "*");
    }

    return {
      cookies,
      listOfBannerData,
      onSwiper,
      onSlideChange,
      sendUrl,
      modules: [Pagination, Autoplay]
    };
  },
};
</script>
