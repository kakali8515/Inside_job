<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="8"
      :pagination="{
        type: 'fraction',
      }"
      :loop="true"
      :initialSlide="1"
      :allowSlidePrev= "listOfEmergencyData.lists.length === 1 ? false : true"
      :allowSlideNext = "listOfEmergencyData.lists.length === 1 ? false : true"
      autoplay: false
      :speed="1500"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="image-swiper"
    >
      <swiper-slide v-for="(i, e) in listOfEmergencyData.lists" :key="e">
        <CardWrapper @click="$router.push({name: 'RecruiterJobPostingDetails', params: {id: i.id}})">
          <template v-slot:image>
            <div class="slider-pic">
              <figure v-if="i.pictures.length === 0"><img :src="i.company_profile_img" alt="" /></figure>
              <figure v-else><img :src="i.pictures[0].image_url" alt="" /></figure>
              <div v-if="isLogin && store.state.loginType == 'job_seeker'">
              <span v-if="i.is_scraps !== 1" @click.stop="saveToBookmark(i.id)" class="bookmark" ><img src="@/assets/icons/bookmark-icon.svg" alt=""/></span>
              <span v-if="i.is_scraps === 1" @click.stop="removeFromBookmark(i.scrap_id, i.id)" class="bookmark"><img src="@/assets/icons/bookmark-red-icon.svg" alt="" /></span>
              </div>
            </div>
          </template>
          <template v-slot:content >
            <span>
            <h5>{{i.company_name}}</h5>
            <h3>{{i.announcement_title}}</h3>
          </span>
          </template>
          <template v-slot:btn>
            <h6><b>{{i.rf_text}} &nbsp; {{i.rs_text}}</b> <span v-if="i.pay_type == 'hourly_wage'">시급</span> <span v-if="i.pay_type == 'daily_wage'">일급</span> <span v-if="i.pay_type == 'salary'">월급</span> <em>{{(i.salary * 1).toLocaleString('en-US')}}</em>원</h6>
            <!-- <span v-if="(isLogin && store.state.loginType == 'job_seeker') || !isLogin" class="btn btn-primary-gradient" @click="isLogin ? openResume(i.id) : openSheet($event, true)">지원하기</span> -->
            <span v-if="(isLogin && store.state.loginType == 'job_seeker') || !isLogin" class="btn btn-primary-gradient apply-btn" @click.stop="isLogin ? $emit('openResume', i.id) : openSheet($event, true)">지원하기</span>
          </template>
        </CardWrapper>
        
      </swiper-slide>
    </swiper>

    <div class="no-data-otr" v-if="listOfEmergencyData.lists.length === 0">
                        <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content >
                            <!-- <p><span>작성된 내역이 없습니다.</span></p> -->
                            <!-- <p v-if="secondRegion.id !== ''">선택하신 지역에는 조건에 맞는 공고가  없습니다.</p> -->
                            <p>등록된 공고가 없습니다.</p>
                        </template>
                    </NoData> 
                </div>
                
  </div>
  </template>
  
  
  <script>
  import NoData  from './NoData.vue';
  import { ref } from "@vue/reactivity";
  import { useRouter } from 'vue-router';
  import { computed, inject, onMounted, watch } from "vue";
  import { reactive } from "@vue/reactivity";
  import { onBeforeMount } from "@vue/runtime-core";
  import { HomeService } from '../service/API/Home';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  // import Swiper core and required modules
  import { Pagination, Autoplay } from "swiper";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import CardWrapper from "@/components/CardWrapper.vue";

  
  export default {
    name: "EmergencySlider",
    props: {firstRegion: Object, secondRegion: Object, refreshData: Boolean},
    components: {
      Swiper,
      SwiperSlide,
      Autoplay,
      Pagination,
      CardWrapper,
      NoData,
    },
    setup(props, {emit}) {
    const router = useRouter();
    const store = inject("authenticateStore");
    const commonStore = inject("commonStore");
    const isLogin = computed(() => (store.state.token ? true : false));
    const listOfEmergencyData = reactive({
      lists: [],
    });
    

    onMounted(() => {
      if (!isLogin.value) {
        let token = localStorage.getItem("token");
        store.methods.setToken(token);
      }
    });

    const openSheet = (e, val) => {
      e.preventDefault();
      if (val && isLogin) {
        commonStore.state.isSheetOpen = val;
        console.log("Bottom Sheet Active !!", val);
      }
    };

    onBeforeMount(async () => {
      // console.log('from emer', props.firstRegion)
      await listOfEmergency();
    });
  
    const saveToBookmark = async (id) => {
        try {
        let data = {
          id: id
      }
        let res = await HomeService.addScrap(
          data
        );
        const objIndex = listOfEmergencyData.lists.findIndex((obj => obj.id === id))
        listOfEmergencyData.lists[objIndex].is_scraps = 1
        listOfEmergencyData.lists[objIndex].scrap_id = res.data.scrap_id
        emit('scrappedSuccessful')
        //sortOfferList();
      } catch(e) {
        console.log(e)
      }
      
    };

    const removeFromBookmark = async (scrapId, id) => {
    try {
     let data = {
        id: [scrapId]
     }
      let res = await HomeService.deleteScrap(
        data
      );
      const objIndex = listOfEmergencyData.lists.findIndex((obj => obj.id === id))
      listOfEmergencyData.lists[objIndex].is_scraps = 0
      listOfEmergencyData.lists[objIndex].scrap_id = 0
      //sortOfferList();
    } catch(e) {
        console.log(e)
    }
    
    };
   

    const onSwiper = (swiper) => {
        //console.log(swiper);
      };
    const onSlideChange = () => {
      //console.log("slide change");
    };
    
    // watch(() => props.secondRegion.level_id, async (first, second) => {
    //   if(props.secondRegion.id === 0){
    //     await listOfEmergency(); 
    //   }
    // });
    watch(() => props.secondRegion.id, async (first, second) => {
      if(props.secondRegion.id !== ''){
        await listOfEmergency();
      }
    });

    watch(() => props.refreshData, async (first, second) => {
      if(props.refreshData === true){
        await listOfEmergency();
      }
    });

    watch(() => commonStore.state.themeSetting, async () => {
        await listOfEmergency();
      }
    );
  
    const listOfEmergency = async () => {
      try{
      let data = {
        page: null,
        limit: null,
        silver_bell_status: commonStore.state.themeSetting, 
        region_first: props.firstRegion.id.toString(),
        region_second: props.secondRegion.id.toString()
      }

      if(props.secondRegion.id == 0) {
        data.region_second = ''
      }

      // if (props.firstRegion.id == 9 && props.secondRegion.id == 0) {
      //     data.region_first = "";
      // }
        
      let res = await HomeService.jobListEmergency(data);
      //console.log(res)
      listOfEmergencyData.lists = res.data.data;
      } catch(e) {
  
      }
    
    };
    return {
      listOfEmergencyData,
      store,
      isLogin,
      openSheet,
      saveToBookmark,
      onSwiper,
      onSlideChange,
      removeFromBookmark,
      commonStore,
      modules: [Pagination, Autoplay],
    };
   
  },
  };
  </script>
  