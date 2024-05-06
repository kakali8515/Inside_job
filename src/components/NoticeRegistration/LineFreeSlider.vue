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
      class="image-swiper"
    >
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slider-wrap">
          <img class="img-wd-100"
              src="@/assets/images/line-img.jpg"
              alt="" />
          </div>
      </swiper-slide>
    </swiper>
  </template>
  
  
  <script>
 
  import { Swiper, SwiperSlide } from "swiper/vue";
  // import Swiper core and required modules
  import { Pagination, Autoplay } from "swiper";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
//   import { inject } from "@vue/runtime-core";
  
  export default {
    name: "NoticeLineSlider",
    // props: {firstRegion: Object, secondRegion: Object},
    components: {
      Swiper,
      SwiperSlide,
      Autoplay,
      Pagination,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };

    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Autoplay],
    };
  },
};
  

  </script>
  