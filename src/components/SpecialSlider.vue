<template>
  <div>
    <swiper :modules="modules" :slidesPerView="1" :spaceBetween="0" :loop="true" :initialSlide="1"
      :pagination="{ type: 'fraction', }" autoplay: false :speed="1500" :allowSlidePrev= "listOfSpecialData.lists.length === 1 ? false : true"
    :allowSlideNext = "listOfSpecialData.lists.length === 1 ? false : true" @swiper="onSwiper" @slideChange="onSlideChange"
      class="image-swiper home-special-slider">
      <swiper-slide v-for="(i, e) in listOfSpecialData.lists" :key="e">
        <div class="wrap-sitem" v-for="(a, k) in i" :key="k">
          <CardWrapper @click="$router.push({name: 'RecruiterJobPostingDetails', params: {id: a.id}})">
            <template v-slot:image>
              <div class="slider-pic">
                <figure v-if="a.pictures.length === 0"><img :src="a.company_profile_img" alt="" /></figure>
              <figure v-else><img :src="a.pictures[0].image_url" alt="" /></figure>
                <div v-if="isLogin && store.state.loginType == 'job_seeker'">
                  <span v-if="a.is_scraps !== 1"  class="bookmark"><img @click.stop="saveToBookmark(a.id, e)"
                      src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
                  <span v-if="a.is_scraps === 1"  class="bookmark"><img @click.stop="removeFromBookmark(a.scrap_id, a.id, e)"
                      src="@/assets/icons/bookmark-red-icon.svg" alt="" /></span>
                </div>
              </div>
            </template>
            <template v-slot:content>
              <span >
                <h5>{{ a.company_name }}</h5>
                <h3>{{ a.announcement_title }}</h3>
              </span>
            </template>
            <template v-slot:btn>
              <h6><span v-if="a.pay_type == 'hourly_wage'">시급</span> <span v-if="a.pay_type == 'daily_wage'">일급</span>
                <span v-if="a.pay_type == 'salary'">월급</span> <em>{{(a.salary *
                1).toLocaleString('en-US')}}</em>원
              </h6>
            </template>
          </CardWrapper>
        </div>
      </swiper-slide>
    </swiper>
    <div class="no-data-otr" v-if="listOfSpecialData.lists.length === 0">
      <NoData>
        <template v-slot:no-data-image>
          <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
        </template>
        <template v-slot:no-data-content>
          <!-- <p><span>작성된 내역이 없습니다.</span></p> -->
          <p>등록된 공고가 없습니다.</p>
        </template>
      </NoData>
    </div>
  </div>
</template>


<script>
import NoData from './NoData.vue';
// import Swiper core and required modules
import { Grid, Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/grid";
import "swiper/css/pagination";
import CardWrapper from '@/components/CardWrapper.vue';
import { computed, inject, onMounted, watch } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { HomeService } from '../service/API/Home';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  name: "SpecialSlider",
  props: { firstRegion: Object, secondRegion: Object, refreshData: Boolean},
  components: {
    SwiperSlide,
    Autoplay,
    Pagination,
    Grid,
    CardWrapper,
    Swiper,
    NoData,
  },
  setup(props, { emit }) {
    const store = inject("authenticateStore");
    const commonStore = inject("commonStore");
    const isLogin = computed(() => (store.state.token ? true : false));
    const listOfSpecialData = reactive({
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
      await listOfSpecial();
    });

    const saveToBookmark = async (id, indexNo) => {
      try {
        let data = {
          id: id
        }
        let res = await HomeService.addScrap(
          data
        );
          const objIndex = listOfSpecialData.lists[indexNo].findIndex((obj => obj.id === id))
          listOfSpecialData.lists[indexNo][objIndex].is_scraps = 1
          listOfSpecialData.lists[indexNo][objIndex].scrap_id = res.data.scrap_id
          emit('scrappedSuccessful')
      } catch (e) {
        console.log(e)
      }
    };

    const removeFromBookmark = async (scrapId, id, indexNo) => {
      try {
        let data = {
          id: [scrapId]
        }
        let res = await HomeService.deleteScrap(
          data
        );
          const objIndex = listOfSpecialData.lists[indexNo].findIndex((obj => obj.id === id))
          listOfSpecialData.lists[indexNo][objIndex].is_scraps = 0
          listOfSpecialData.lists[indexNo][objIndex].scrap_id = 0
      } catch (e) {
        console.log(e)
      }
    };
    const sortOfferList = () => {
      listOfSpecialData.lists = listOfSpecialData.lists.sort((a, b) => Number(b.is_scraps) - Number(a.is_scraps));
    };

    const onSwiper = (swiper) => {
      //console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");

    };
    // watch(() => props.secondRegion.level_id, async (first, second) => {
    //   if(props.secondRegion.id === 0){
    //     await listOfSpecial();
    //   }
    // });

    watch(() => props.secondRegion.id, async (first, second) => {
      if(props.secondRegion.id !== ''){
        await listOfSpecial();
      }
    });

    watch(() => props.refreshData, async (first, second) => {
      if(props.refreshData === true){
        await listOfSpecial();
      }
    });
    watch(() => commonStore.state.themeSetting, async () => {
      await listOfSpecial();
      }
    );

    
    const listOfSpecial = async () => {
      try {
        let data = {
          page: null,
          limit: null,
          silver_bell_status: commonStore.state.themeSetting,
          region_first: props.firstRegion.id.toString(),
          region_second: props.secondRegion.id.toString()
        }

        if (props.secondRegion.id == 0) {
          data.region_second = ''
        }

        // if (props.firstRegion.id == 9 && props.secondRegion.id == 0) {
        //   data.region_first = "";
        // }
        let res = await HomeService.jobListSpecial(data);
        //console.log(res)
        // listOfSpecialData.lists = res.data.data;
        listOfSpecialData.lists = groupBy(res?.data.data, 6);
        console.log('listOfSpecialData.lists---', listOfSpecialData.lists);
      } catch (e) {

      }

    };

    const groupBy = (arr, n) => {
      var group = [];
      for (var i = 0, end = arr.length / n; i < end; ++i)
        group.push(arr.slice(i * n, (i + 1) * n));
      return group;
    };

    return {
      listOfSpecialData,
      groupBy,
      store,
      isLogin,
      openSheet,
      saveToBookmark,
      onSwiper,
      onSlideChange,
      removeFromBookmark,
      commonStore,
      modules: [Grid, Pagination, Autoplay]
    };

  },
};
</script>
