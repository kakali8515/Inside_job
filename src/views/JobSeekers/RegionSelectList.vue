<template>
  <div class="back-wh common-sec pb-32">
    <div class="top-hdr">
      <div class="container">
        <h4 class="heading">
          <img
            class="left-arrow"
            src="@/assets/icons/left-arrow.svg"
            alt=""
            @click="$router.go(-1)"
          />지역선택
        </h4>
      </div>
    </div>
    <div class="container">
      <div class="place-fliter-cont rgn" @click="isOpen = true">
        <a href="#" class="filter-ic"
          ><img src="@/assets/icons/filter-icon.svg" alt=""
        /></a>
        <!-- add input -->
        <div class="search-input rgn-list-srch">
          <!-- <span
            >인천 전체
            <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a
          ></span>
          <span
            >잠실•송파•강동
            <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a
          ></span> -->
          <sapn
            class="region-list-placeholder"
            v-if="regionStore.state.filtersVisible.length === 0"
            >지역을 선택하세요</sapn
          >
          <span
            v-for="(i, e) in regionStore.state.filtersVisible"
            :key="e"
            style="
              color: #666666;
              background-color: #f1f1f1;
              padding: 4px 10px;
              border-radius: 5px;
              margin: 0 5px;
            "
          >
            {{ i }}
            <img
              @click.stop="
                regionStore.methods.removeFilter(i, e, $event), regionjobList()
              "
              src="@/assets/icons/cross.svg"
              alt=""
            />
          </span>
        </div>
      </div>
      <div class="card-list">
        <NoData v-show="nodata">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>데이터가 없습니다.</span></p>
            <!-- <p>다양한 채용정보가 여러분을 기다리고 있습니다!</p> -->
          </template>
        </NoData>

        <div class="card-list ai-recommed-list">
          <div
            class="card-list-innr"
            v-for="item in joblist"
            :key="item.id"
            @click="
              $router.push({
                name: 'RecruiterJobPostingDetails',
                params: { id: item.id },
              })
            "
          >
            <div class="slider-wrap mb-0">
              <!-- <PostSlider :companyImage="item.pictures" 
            />-->
              <PostListSlider
                :pictures="item"
                @aiList="regionjobList()"
                @scrappedSuccessful="commonStore.methods.scrappedSuccessful"
              />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <!-- <span class="bookmark"
                  ><img
                    v-if="item.is_scraps == 0"
                    src="@/assets/icons/bookmark-icon.svg"
                    alt="" /><img
                    v-else-if="joblistitemdata.is_scraps == 1"
                    src="@/assets/icons/bookmark-red-icon.svg"
                    alt=""
                /></span> -->
                <h5>{{ item.company_name }}</h5>
                <h3>[{{ item.company_name }}]{{ item.announcement_title }}</h3>
              </template>
              <template v-slot:btn>
                <h6>
                  <b>
                    {{ item.region_1st_depth_name }},
                    {{ item.region_2nd_depth_name }},
                    {{ item.region_3rd_depth_name }}
                  </b>
                  <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                  <span style="" v-if="item.pay_type === 'hourly_wage'"
                    >시급</span
                  >
                  <span style="" v-if="item.pay_type === 'daily_wage'"
                    >일급</span
                  >
                  <span style="" v-if="item.pay_type === 'salary'">월급</span>
                  {{ commonStore.methods.formatSalary(item.salary) }}원
                </h6>
                <span
                  v-if="
                    (isLogin && store.state.loginType == 'job_seeker') ||
                    !isLogin
                  "
                  class="btn btn-primary-gradient apply-btn"
                  @click="setresume($event, item.id)"
                  >지원하기</span
                >
              </template>
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
    <div
      class="scrapped-icon scrapped-icon-transform act"
      v-if="commonStore.state.popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
        스크랩했습니다.
      </p>
    </div>
    <Sheet v-model:visible="isOpen">
      <RegionSelect @setfalse="hideregion($event)" />
    </Sheet>
    <ApplyChooseResume
      :id="job_id"
      v-if="commonStore.state.isApplyChooseResume"
    />
  </div>
</template>

<script>
import mapService from "../../service/API/region";
import CardWrapper from "@/components/CardWrapper.vue";
import NoData from "@/components/NoData.vue";
import { inject, watch, onUnmounted } from "@vue/runtime-core";
import RegionSelect from "@/views/JobSeekers/RegionSelect.vue";
import ApplyChooseResume from "./ApplyChooseResume.vue";
import PostListSlider from "@/components/PostListSlider.vue";
import PostSlider from "@/components/PostSlider.vue";
export default {
  name: "RegionSelectList",
  components: {
    CardWrapper,
    PostSlider,
    RegionSelect,
    NoData,
    ApplyChooseResume,
    PostListSlider,
  },
  data() {
    return {
      // regionStore:inject("regionStore"),
      commonStore: inject("commonStore"),
      store: inject("authenticateStore"),
      regionStore: inject("regionStore"),
      job_id: "",
      joblist: [],
      arrydata: [],
      isOpen: false,
      nodata: false,
    };
  },
  created() {
    this.mapservice = new mapService();
  },
  computed: {
    isLogin() {
      return this.store.state.token ? true : false;
    },
  },
  methods: {
    setresume(e, id) {
      e.stopPropagation();
      this.job_id = id;
      this.commonStore.state.isApplyChooseResume = true;
    },
    regionjobList() {
      let input = {
        region_places:
          JSON.stringify(this.regionStore.state.totalFilters) == "[]"
            ? []
            : this.regionStore.state.totalFilters,
        page: "1",
        limit: "10000000",
        silver_bell_status: 1,
      };
      if (this.regionStore.state.workPlaceVisibleState.length == 0) {
        this.$router.push({ name: "Region" });
      } else {
        this.mapservice
          .joblistRegion(input)
          .then((res) => {
            console.log("this.jobList-", res.data.data);
            this.joblist = res.data.data;
            console.log("this.joblist-", this.joblist);
            this.joblist.length == 0
              ? (this.nodata = true)
              : (this.nodata = false);
          })
          .catch((err) => {
            console.log("eeror", err);
            this.joblist = [];
            this.joblist.length == 0
              ? (this.nodata = true)
              : (this.nodata = false);
          });
      }
    },
    hideregion(data) {
      this.isOpen = false;
      console.log(data);
      this.regionjobList();
    },
    removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr.splice(index, 1);
    },
  },
  mounted() {
    this.regionjobList();
    console.log("Region data=", this.regionStore.state.jobList);
    // this.joblist = this.store.state.jobList;
    //this.regionStore.state.totalFilters
    this.arrydata = this.regionStore.state.filtersVisible;
    console.log(this.regionStore.state.totalFilters);
    // console.log('Region data=',this.store.state.workPlaceFilterState)
    console.log("Region Array data=", this.regionStore.state.totalFilters);
  },
  setup() {
    const regionStore = inject("regionStore");
    const commonStore = inject("commonStore");

    watch(
      () => commonStore.state.isApplyChooseResume,
      (newVal, oldVal) => {
        if (newVal) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      },
      () => regionStore.state.totalFilters,
      (val) => {
        regionStore.state.filtersVisible = [];
        console.log(val, "changed");
        val.forEach((ele, e) => {
          regionStore.state.filtersVisible.push(...ele.name);
        });
        // console.log(filtersVisible.value, "check value after add");
      },
      { deep: true }
    );
    // onUnmounted(() => {
    //   regionStore.methods.refreshUnMount();
    // });

    return {
      regionStore,
      commonStore,
    };
  },
};
</script>
<style scoped>
.scrapped-icon-transform {
  transform: none;
}
</style>
