<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      :pagination="{
        type: 'fraction',
      }"
      class="image-swiper image-swiper-bor"
    >
      <swiper-slide v-for="(i, e) in mergedArray.lists" :key="e">
        <div class="wrap-sitem" v-for="(a, e) in i" :key="e">
        <CardWrapper>
          <template v-slot:content>
            <span
              @click="
                isLogin
                  ? $router.push({
                      name: 'RecruiterJobPostingDetails',
                      params: { id: a.id },
                    })
                  : ''
              "
            >
              <h5>{{ a?.company_name }}</h5>
              <h3 :class="[a?.is_free == 'paid' ? '' : 'gray']">
                {{ a?.announcement_title }} --{{ a?.is_free }}
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
          <p>선택하신 지역에는 조건에 맞는 공고가 없습니다.</p>
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
  props: { firstRegion: Object, secondRegion: Object },
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

    watch(
      () => props.secondRegion.id,
      async (first, second) => {
        //console.log('from emer', props.secondRegion)
        await jobListLineFree();
        mergeFunction();
      }
    );

    const jobListLineFree = async () => {
      try {
        let data = {
          page: null,
          silver_bell_status: 1,
          region_first: props.firstRegion.id.toString(),
          region_second: props.secondRegion.id.toString(),
        };
        if (props.secondRegion.id == 0) {
          data.region_second = "";
        }
        let res = await HomeService.jobListLineFree(data);
        list.listOfFree = res.data.dataFree;
        list.listOfLine = res.data.dataLine;
      } catch (e) {}
    };

    const mergeFunction = () => {
      let totalPage = (list.listOfLine.length + list.listOfFree.length) / 5;
      let page = 0;
      if (totalPage % 1 === 0) {
        page = totalPage;
      } else {
        let beforeDecimal = totalPage.toString().split(".")[0];
        page = beforeDecimal + 1;
      }
      for (let j = 0; j < page; j++) {
        if (list.listOfLine.length != 0) {
          for (let index = 0; index < 2; index++) {
            mergedArray.lists.push(list.listOfLine[index]);
          }
          list.listOfLine.splice(0, 2);
          // console.log(list.listOfLine);
        }
        if (list.listOfFree.length != 0) {
          for (let index = 0; index < 3; index++) {
            mergedArray.lists.push(list.listOfFree[index]);
          }
          list.listOfFree.splice(0, 3);
          // console.log(list.listOfFree);
        }
      }
      console.log("mergedArray---", mergedArray.lists);

      mergedArray.lists = groupBy(mergedArray.lists, 5);
      console.log("mergedArray---", mergedArray.lists);
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
