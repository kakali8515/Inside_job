<template>
  <HeaderSearch v-if="store.state.isOccupationOpen === false" />
  <div class="back-wh" v-if="aroundData.isList === true">
    <div class="container">
      <div
        class="place-fliter-cont rgn around-filter"
        @click="
          (store.state.isOccupationOpen = true), (aroundData.isList = false)
        "
      >
        <input
          type="text"
          :placeholder="
            store.state.filtersVisibleState.length === 0
              ? '업직종을 선택하세요'
              : ''
          "
          class="form-control"
          readonly
        />

        <a href="#" class="filter-ic"
          ><img src="@/assets/icons/filter-icon.svg" alt=""
        /></a>
        <div class="search-input">
          <span
            v-for="(i, e) in store.state.filtersVisibleState"
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
              @click.stop="removeData(i, e, $event)"
              src="@/assets/icons/cross.svg"
              alt=""
            />
          </span>
        </div>
      </div>
      <div class="range-otr">
        <div class="range-input">
          <RangeSlider @rangeValue="getRangeValue" @list="aroundList()" />
          <!-- <input
            type="range"
            @mouseup="aroundList()"
            class="e-range"
            v-model="aroundData.rangeValue"
          /> -->
        </div>
        <span class="range-step range-step-new"
          ><img src="@/assets/images/Steps3.svg" alt=""
        />
        <span class="onekm">1km</span>
        <span class="threekm">3km</span>
        <span class="fivekm">5km</span></span>
      </div>
    </div>
  </div>
  <div class="back-wh border-top" v-if="aroundData.isList === true">
    <div class="container">
      <div class="cm-top-space pb-32">
        <div class="sub-otr b-color mb-32">
          <h3 class="sub-heading mb-0">근처 공고 리스트</h3>
        </div>

        <NoData v-if="aroundData.list.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p>선택하신 지역에는 조건에 맞는 공고가 없습니다.</p>
          </template>
        </NoData>

        <div class="card-list" v-else>
          <div
            class="card-list-innr"
            v-for="(item, i) in aroundData.list"
            :key="i"
          >
            <div
              class="slider-wrap mb-0"
              @click="
                (e) => {
                  e.stopPropagation(),
                    $router.push(`/job-posting-details/${item.id}`);
                }
              "
            >
              <PostListSlider
                :pictures="item"
                @aiList="aroundList"
                @scrappedSuccessful="commonStore.methods.scrappedSuccessful"
              />
            </div>
            <CardWrapper
              @click="$router.push(`/job-posting-details/${item.id}`)"
            >
              <template v-slot:content>
                <h5>{{ item.company_name }}</h5>
                <h3>{{ item.announcement_title }}</h3>
              </template>
              <template v-slot:btn>
                <h6>
                  <b>
                    {{ item.rf_text }} {{ item.rs_text }} {{ item.rt_text }}</b
                  >
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
                  v-if="loginType != 'job_recruiter'"
                  class="btn btn-primary-gradient apply-btn"
                  @click="apply($event, item.id)"
                  >지원하기</span
                >
              </template>
            </CardWrapper>
          </div>
          <!-- <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div>
          <div class="card-list-innr">
            <div class="slider-wrap">
              <PostListSlider />
            </div>
            <CardWrapper>
              <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
              </template>
              <template v-slot:btn>
                <h6>인천 연수구 <span>시급</span> 10,000원</h6>
                <span class="btn btn-primary-gradient">지원하기</span>
              </template>
            </CardWrapper>
          </div> -->
          <!-- <Pagination
            :totalRecords="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          /> -->
          <VuePaginate
            :limit="pagination.perPage"
            :page="pagination.pageNo"
            :totalItems="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          />
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
  <ApplyChooseResume
    :id="job_id"
    v-if="commonStore.state.isApplyChooseResume"
  />
  <OccupationSetting
    @setfalse="hideoccupation($event)"
    v-show="store.state.isOccupationOpen"
  />
</template>

<script>
import CardWrapper from "@/components/CardWrapper.vue";
import PostListSlider from "@/components/PostListSlider.vue";
import { ref, reactive } from "@vue/reactivity";
import { around } from "@/service/API/around.js";
import { inject, onMounted, watch } from "@vue/runtime-core";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import Pagination from "@/components/Pagination.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import RangeSlider from "@/components/RangeSlidervue.vue";
import { useRouter } from "vue-router";
import ApplyChooseResume from "./ApplyChooseResume.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import NoData from "@/components/NoData.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "Around",
  components: {
    CardWrapper,
    PostListSlider,
    OccupationSetting,
    Pagination,
    HeaderSearch,
    RangeSlider,
    ApplyChooseResume,
    VuePaginate,
    NoData,
  },

  setup() {
    const { cookies } = useCookies();
    const router = useRouter();
    const store = inject("occupationStore");
    const commonStore = inject("commonStore");
    const aroundData = reactive({
      rangeValue: "",
      isOccupationOpen: false,
      isList: true,
      list: [],
      latitude: "",
      longitude: "",
    });
    const loginType = ref(localStorage.getItem("login_type"));
    const job_id = ref(0);

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    onMounted(() => {
      store.methods.refreshAllData();
      // getLocation();
      aroundList();
      getlocation();
    });

    watch(
      () => store.state.filtersVisibleState,
      () => {
        aroundList();
      }
    );

    watch(
      () => commonStore.state.isApplyChooseResume,
      (newVal, oldVal) => {
        if (newVal) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    // watch(
    //   () => aroundData.rangeValue,
    //   () => {
    //     aroundList();
    //   }
    // );
    async function aroundList() {
      let userData = {
        page: pagination.pageNo,
        limit: pagination.perPage,
        latitude: cookies.get("deviceLat"),
        longitude: cookies.get("deviceLong"),
        radius: aroundData.rangeValue.toString(),
        silver_bell_status: commonStore.state.themeSetting,
        occupations: store.state.totalFilterState,
      };
      // latitude: "36.8367335",
      // longitude: "127.8749879",
      let res = await around.aroundList(userData);
      if (res.status === 200) {
        console.log(res.data.data);
        aroundData.list = res.data.data;
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords = res.data.total_records;
      }
    }
    function getlocation() {
      let data = {
        type: "currentlatlong",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // alert("currentlatlong");

      // setTimeout(() => {
      window["getcurrentlatlong"] = async (res) => {
        // alert(
        //   "TEST POPUP getcurrentlatlong -- got from app : " +
        //     JSON.stringify(res)
        // );
        if (res) {
          await currentLatLongHandler(res).then((ress) => {
            // alert("lat-long---" + JSON.stringify(ress));
            this.$cookies.set("deviceLat", ress?.lat);
            this.$cookies.set("deviceLong", ress?.long);
            // this.lat1 = ress?.lat.toString();
            // this.long1 = ress?.long.toString();
            // alert(`latitude : ${ress?.lat} longitude : ${ress?.long}`);
          });
        } else {
          alert("no data from app");
        }
      };
    }
    function currentLatLongHandler(data) {
      return new Promise((resolve, reject) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    }
    function hideoccupation(data) {
      store.state.isOccupationOpen = data;
      aroundData.isList = true;
    }

    function setPage(event) {
      pagination.pageNo = event;
      aroundList();
      window.scrollTo(0, 0);
    }

    function getLocation() {
      const success = (position) => {
        aroundData.latitude = position.coords.latitude;
        aroundData.longitude = position.coords.longitude;
        console.log(aroundData.latitude, aroundData.longitude);
        // Do something with the position
      };
      const error = (err) => {
        console.log(err);
      };

      // This will open permission popup
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function getRangeValue(value) {
      // alert(value)
      aroundData.rangeValue = value;
      // this.run_time_from = value[0];
      // this.run_time_to = value[1];
    }

    function apply(e, id) {
      e.stopPropagation();
      commonStore.state.isApplyChooseResume = true;
      job_id.value = id;
      // router.push(`/job-seekers/apply-choose-resume/${id}`)
    }

    function removeData(i, e, event) {
      store.methods.removeFilter(i, e, event);
      aroundList();
      setTimeout(() => {
        store.methods.submitFilter();
      }, 100);
    }

    return {
      aroundData,
      aroundList,
      hideoccupation,
      store,
      pagination,
      loginType,
      setPage,
      getRangeValue,
      commonStore,
      apply,
      job_id,
      removeData,
    };
  },
};
</script>
<style scoped>
.scrapped-icon-transform {
  transform: none;
}
</style>
