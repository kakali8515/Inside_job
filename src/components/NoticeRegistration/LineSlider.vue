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
  // import { computed, inject, onMounted, watch } from "vue";
  // import { reactive } from "@vue/reactivity";
  // import { onBeforeMount } from "@vue/runtime-core";
  // import { HomeService } from '../service/API/Home';
  // Import Swiper Vue.js components
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
  //   setup(props) {
  //   const store = inject("authenticateStore");
  //   const commonStore = inject("commonStore");
  //   const isLogin = computed(() => (store.state.token ? true : false));
  //   const listOflineData = reactive({
  //     lists: [],
  //   });
    

  //   onMounted(() => {
  //     if (!isLogin.value) {
  //       let token = localStorage.getItem("token");
  //       store.methods.setToken(token);
  //     }
  //   });

  //   const openSheet = (e, val) => {
  //     e.preventDefault();
  //     if (val && isLogin) {
  //       commonStore.state.isSheetOpen = val;
  //       console.log("Bottom Sheet Active !!", val);
  //     }
  //   };

  //   onBeforeMount(async () => {
  //     // console.log('from emer', props.firstRegion)
  //     await listOfline();
  //   });
  
  //   const saveToBookmark = async (id) => {
  //       try {
  //       let data = {
  //         id: id
  //     }
  //       let res = await HomeService.addScrap(
  //         data
  //       );
  //       const objIndex = listOflineData.lists.findIndex((obj => obj.job_id === id))
  //       listOflineData.lists[objIndex].is_scraps = 1
  //       sortOfferList();
  //     } catch(e) {
  //       console.log(e)
  //     }
  //   };
  //   const sortOfferList = () => {
  //       listOflineData.lists = listOflineData.lists.sort((a, b) => Number(b.is_scraps) - Number(a.is_scraps));
  //   };

  //   const onSwiper = (swiper) => {
  //       //console.log(swiper);
  //     };
  //   const onSlideChange = () => {
  //     //console.log("slide change");
  //   };
    
  //   watch(() => props.secondRegion.id, async (first, second) => {
  //     //console.log('from emer', props.secondRegion)
  //     await listOfline();
  //   });
  
  //   const listOfline = async () => {
  //     try{
  //     let data = {
  //       page: 1,
  //       limit: 10,
  //       silver_bell_status: 1, 
  //       region_first: props.firstRegion.id.toString(),
  //       region_second: props.secondRegion.id.toString()
  //     }

  //     if(props.secondRegion.id == 0) {
  //       data.region_second = ''
  //     }
        
  //     let res = await HomeService.jobListline(data);
  //     //console.log(res)
  //     listOflineData.lists = res.data.data;
  //     } catch(e) {
  
  //     }
    
  //   };
    // return {
    //   listOflineData,
    //   store,
    //   isLogin,
    //   openSheet,
    //   saveToBookmark,
    //   onSwiper,
    //   onSlideChange,
    //   commonStore,
    //   modules: [Pagination, Autoplay],
    // };
   
  // },

  </script>
  