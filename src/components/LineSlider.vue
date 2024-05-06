<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="0"
      :allowSlidePrev= "mergedArray.lists.length === 1 ? false : true"
      :allowSlideNext = "mergedArray.lists.length === 1 ? false : true"
      :loop="true"
      :initialSlide="1"
      :pagination="{
        type: 'fraction',
      }"
      class="image-swiper image-swiper-bor"
    >
      <swiper-slide v-for="(i, e) in mergedArray.lists" :key="e">
        <div class="wrap-sitem" v-for="(a, k) in i" :key="k">
        <CardWrapper @click="$router.push({name: 'RecruiterJobPostingDetails', params: { id: a.id }})">
          <template v-slot:content>
            <span>
              <h5>{{ a?.company_name }}</h5>
              <h3 :class="[a?.is_free == 'paid' ? '' : 'gray']">
                {{ a?.announcement_title }}
              </h3>
            </span>
          </template>
          <template v-slot:btn>
            <h6>
              <span v-if="a?.pay_type == 'hourly_wage'">시급</span>
              <span v-if="a?.pay_type == 'daily_wage'">일급</span>
              <span v-if="a?.pay_type == 'salary'">월급</span
              ><em>{{ (a?.salary * 1).toLocaleString("en-US") }}</em
              >원
            </h6>
          </template>
        </CardWrapper>
        </div>
      </swiper-slide>
    </swiper>
    <div class="no-data-otr" v-if="mergedArray.lists.length === 0">
      <NoData>
        <template v-slot:no-data-image>
          <img
            class="no-job-icon"
            src="@/assets/icons/no-job-icon.svg"
            alt=""
          />
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
import NoData from "./NoData.vue";
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { HomeService } from "../service/API/Home";
import { watch, inject, computed } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// import Swiper core and required modules
import { Grid, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import CardWrapper from "@/components/CardWrapper.vue";

export default {
  name: "LineSlider",
  props: { firstRegion: Object, secondRegion: Object, refreshData: Boolean},
  components: {
    Swiper,
    SwiperSlide,
    CardWrapper,
    NoData,
  },
  setup(props) {
    const mergedArray = reactive({
      lists: [],
    });
    const list = reactive({
      listOfFree: [],
      listOfLine: [],
    });
    const store = inject("authenticateStore");
    const commonStore = inject("commonStore");
    const isLogin = computed(() => (store.state.token ? true : false));

    onBeforeMount(async () => {
      await jobListLineFree();
      mergeFunction();
    });

    // watch(() => props.secondRegion.level_id, async (first, second) => {
    //   if(props.secondRegion.id === 0){
    //     await jobListLineFree();
    //     mergeFunction();
    //   }
    // });
    watch(
      () => props.secondRegion.id,
      async (first, second) => {
      if(props.secondRegion.id !== ''){
        await jobListLineFree();
        mergeFunction();
      }
      }
    );

    watch(() => props.refreshData, async (first, second) => {
      if(props.refreshData === true){
        await jobListLineFree();
        mergeFunction();
      }
    });
    watch(() => commonStore.state.themeSetting, async () => {
      await jobListLineFree();
      mergeFunction();
      }
    );

    const jobListLineFree = async () => {
      try {
        let data = {
          page: null,
          silver_bell_status: commonStore.state.themeSetting,
          region_first: props.firstRegion.id.toString(),
          region_second: props.secondRegion.id.toString(),
        };
        if (props.secondRegion.id == 0) {
          data.region_second = "";
        }
        // if (props.firstRegion.id == 9 && props.secondRegion.id == 0) {
        //   data.region_first = "";
        // }
        let res = await HomeService.jobListLineFree(data);
        list.listOfFree = res.data.dataFree;
        list.listOfLine = res.data.dataLine;
      } catch (e) {}
    };

    const mergeFunction = () => {
      if(list.listOfFree.length !== 0 || list.listOfLine.length !== 0) {
        mergedArray.lists = []
      let totalPage = (list.listOfLine.length + list.listOfFree.length) / 5;
      let page = 0;
      if (totalPage % 1 === 0) {
        page = totalPage;
      } else {
        let beforeDecimal = totalPage.toString().split(".")[0];
        page = beforeDecimal + 1;
      }
      for (let j = 0; j < page; j++) {
        if (list.listOfLine.length >= 2) {
          for (let index = 0; index < 2; index++) {
            mergedArray.lists.push(list.listOfLine[index]);
          }
          list.listOfLine.splice(0, 2);
          // console.log(list.listOfLine);
        } else if (list.listOfLine.length === 1) {
          for (let index = 0; index < 1; index++) {
            mergedArray.lists.push(list.listOfLine[index]);
          }
          list.listOfLine.splice(0, 1);
        }
        if (list.listOfFree.length >= 3) {
          for (let index = 0; index < 3; index++) {
            mergedArray.lists.push(list.listOfFree[index]);
          }
          list.listOfFree.splice(0, 3);
        } else if (list.listOfFree.length === 2) {
          for (let index = 0; index < 2; index++) {
            mergedArray.lists.push(list.listOfFree[index]);
          }
          list.listOfFree.splice(0, 2);
        } else if (list.listOfFree.length === 1) {
          for (let index = 0; index < 3; index++) {
            mergedArray.lists.push(list.listOfFree[index]);
          }
          list.listOfFree.splice(0, 1);
        }
      }
      //console.log("mergedArray---", mergedArray.lists);
      const filteredData = mergedArray.lists.filter(function( element ) {
        return element != undefined;
      });

      //console.log("filteredData---", filteredData);
      mergedArray.lists = groupBy(filteredData, 5);
      
    } else {
      mergedArray.lists = []
    }
    };

    const groupBy = (arr, n) => {
      var group = [];
      for (var i = 0, end = arr.length / n; i < end; ++i)
        group.push(arr.slice(i * n, (i + 1) * n));
      return group;
    };

    return {
      list,
      groupBy,
      mergedArray,
      commonStore,
      store,
      isLogin,
			mergeFunction,
      modules: [Grid, Pagination],
    };
  },
};
</script>
