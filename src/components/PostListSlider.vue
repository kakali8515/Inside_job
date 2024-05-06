<template>
  <swiper
    :modules="modules"
    :slidesPerView="1"
    :spaceBetween="0"
    :autoplay="true"
    :pagination="true"
    :speed="1500"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="post-swiper"
  >
    <swiper-slide v-for="(item, i) in pictures.pictures" :key="i">
      <div class="slider-pic">
        <figure><img :src="item.image_url" alt="" /></figure>
        <span v-if="(pictures.is_scraps === 0 && loginType != 'job_recruiter')" @click="saveToBookmark(pictures.id,$event)" class="bookmark"
          ><img src="@/assets/icons/bookmark-icon.svg" alt=""
        /></span>
        <span v-if="(pictures.is_scraps === 1 && loginType != 'job_recruiter')" @click="removeFromBookmark(pictures.scrap_id,$event)" class="bookmark"
          ><img src="@/assets/icons/bookmark-red-icon.svg" alt=""
        /></span>
      </div>
    </swiper-slide>
    <!-- <swiper-slide>
        <div class="slider-pic">
            <figure><img src="@/assets/images/slider-pic.jpg" alt="" /></figure>
            <span class="bookmark"><img src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-pic">
            <figure><img src="@/assets/images/slider-pic.jpg" alt="" /></figure>
            <span class="bookmark"><img src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-pic">
            <figure><img src="@/assets/images/slider-pic.jpg" alt="" /></figure>
            <span class="bookmark"><img src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-pic">
            <figure><img src="@/assets/images/slider-pic.jpg" alt="" /></figure>
            <span class="bookmark"><img src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
          </div>
      </swiper-slide> -->
  </swiper>
</template>
  <script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper";

import { scrap } from "@/service/API/scrap.js";
import { ref } from "@vue/reactivity";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default {
  name: "PostListSlider",
  components: {
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination,
  },
  props: {
    pictures: Array,
  },
  emits: ["aiList","scrappedSuccessful"],
  setup(props, { emit }) {
    const loginType = ref(localStorage.getItem('login_type'))
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    const saveToBookmark = async (id,e) => {
      e.stopPropagation();
      let data = {
        id: id,
      };
      let res = await scrap.add(data);
      if (res.status === 200) {
        emit("aiList");
        emit("scrappedSuccessful")
      }
    };

    const removeFromBookmark = async (scrapId,e) => {
      e.stopPropagation();
      let data = {
        id: [scrapId],
      };
      let res = await scrap.deleteScrap(data);
      if (res.status === 200) {
        emit("aiList");
      }
    };
    return {
      onSwiper,
      onSlideChange,
      saveToBookmark,
      removeFromBookmark,
      modules: [Pagination, Autoplay],
      loginType,
    };
  },
};
</script>
