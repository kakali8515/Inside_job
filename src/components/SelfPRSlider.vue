<template>
  <swiper
    :modules="modules"
    :slidesPerView="1"
    :spaceBetween="0"
    :pagination="{
      type: 'fraction',
    }"
    :autoplay="true"
    :speed="1500"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="post-swiper pr"
  >
    <swiper-slide v-for="(item,i) in selfPrPhotoVideo" :key="i">
      <div class="post-pic" v-if="item.type==='image'">
        <img :src="item.image_url" alt="" />
      </div>
    </swiper-slide>
    <!-- <swiper-slide>
      <div class="post-pic">
        <img src="@/assets/images/pr-pic.jpg" alt="" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="post-pic">
        <img src="@/assets/images/pr-pic.jpg" alt="" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="post-pic">
        <img src="@/assets/images/pr-pic.jpg" alt="" />
      </div>
    </swiper-slide> -->
  </swiper>
</template>
  <script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default {
  name: "SelfPRSlider",
  components: {
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination,
  },
  props: {
    selfPrPhotoVideo: Array
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Autoplay],
    };
  },
};
</script>
