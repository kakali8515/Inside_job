<template>
  <swiper
    :modules="modules"
    :slidesPerView="1"
    :spaceBetween="0"
    :loop="true"
    :autoplay="true"
    :pagination="true"
    :speed="1500"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="post-swiper"
  >
    <swiper-slide v-for="(i, e ) in companyImage" :key="e">
      <div class="post-pic">
        <img :src="i.image_url" alt="" />
      </div>
    </swiper-slide>
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
  name: "PostSlider",
  props: {companyImage: Array},
  components: {
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination,
  },
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");
    };
    return {
       onSwiper,
       onSlideChange,
      modules: [Pagination, Autoplay],
    };
  },
};
</script>
