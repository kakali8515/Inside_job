<template>
  <div class="common-sec back-wh">
    <div class="top-hdr no-border pb-0">
      <div class="container">
        <InnerHeader
          headerTitle="Search Field"
          :searchType="true"
          @searchData="getSearch"
          @changeSearchVal="getSearchList"
          :searchValProps="searchData.searchValue"
        />
      </div>
    </div>

    <div
      class="container"
      v-show="searchData.isSuggestionListOpen"
      v-if="searchData.suggestionList && searchData.suggestionList.length !== 0"
    >
      <!-- Code For Search Typing -->
      <div class="search-warpper">
        <div class="list-cont search-type-list">
          <ul class="list-item">
            <li
              v-for="(item, i) in searchData.suggestionList"
              :key="i"
              @click="getSearchList(item.announcement_title, true)"
            >
              <div>
                <span v-for="(data, i) in item.announcement_title" :key="i">
                  <span v-if="data === searchData.searchValue[i]">{{
                    data
                  }}</span>
                  <span style="color: #4c4c4c" v-else>{{ data }}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container" v-show="searchData.isResultListOpen">
      <!-- <div class="cm-top-space pb-32"> -->
      <!-- <div class="sub-otr b-color mb-32">
          <h3 class="sub-heading mb-0">공고 리스트</h3>
        </div> -->
      <div class="scrap-warpper">
        <div class="heading">공고 리스트</div>
        <!-- </div> -->
        <NoData v-if="searchData.resultList.length === 0">
          <template v-slot:no-data-content>
            <p>검색 결과가 없습니다.</p>
          </template>
        </NoData>
        <div class="card-list scrap-list-cont recent-view-announcement">
          <div
            class="card-list-inn scrap-announcement-card"
            v-for="(item, i) in searchData.resultList"
            :key="i"
          >
            <!-- <div class="slider-wrap mb-0">
              <PostListSlider :pictures="item.pictures" />
            </div> -->
            <CardWrapper
              @click="
                $router.push({
                  name: 'RecruiterJobPostingDetails',
                  params: { id: item.id },
                }),
                  (commonStore.state.searchValue = searchData.searchValue)
              "
            >
              <template v-slot:content>
                <div class="top-part">
                  <h5>{{ item.company_name }}</h5>
                  <span class="scrap-icon" v-if="loginType == 'job_seeker'">
                    <img
                      v-if="item.is_scraps == 1"
                      src="@/assets/icons/scraped-red-icon.svg"
                      alt=""
                      @click="removeFromBookmark($event, item.scrap_id)"
                    />
                    <img
                      v-else
                      @click="saveToBookmark($event, item.id)"
                      src="@/assets/icons/scraped-gray-icon.svg"
                      alt=""
                    />
                  </span>
                </div>
                <h3>{{ item.announcement_title }}</h3>
              </template>
              <template v-slot:btn>
                <h6>
                  <b>
                    {{ item.region_1st_depth_name }}
                    {{ item.region_2nd_depth_name }}
                    {{ item.region_3rd_depth_name }}</b
                  >
                  <!-- <span>{{ item.pay_type }}</span> {{ item.salary }}원 -->
                  <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                  <span v-if="item.pay_type === 'hourly_wage'">시급</span>
                  <span v-if="item.pay_type === 'daily_wage'">일급</span>
                  <span v-if="item.pay_type === 'salary'">월급</span>
                  <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span>
                  <em>{{ commonStore.methods.formatSalary(item.salary) }}원</em>
                </h6>
                <span
                  v-if="loginType == 'job_seeker'"
                  class="btn btn-primary-gradient apply-btn"
                  @click="
                    (e) => {
                      e.stopPropagation(),
                        (commonStore.state.isApplyChooseResume = true),
                        (searchData.jobId = item.id);
                    }
                  "
                  >지원하기</span
                >
              </template>
            </CardWrapper>
          </div>
        </div>

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
    <div class="container" v-show="searchData.isRecentListOpen">
      <div class="search-warpper">
        <div class="heading">최근 검색어</div>
        <!-- Code For No Data -->
        <div class="no-data-otr">
          <NoData v-if="searchData.list.length === 0">
            <template v-slot:no-data-content>
              <p>최근 검색어가 없습니다</p>
            </template>
          </NoData>
          <!-- Code For Search Result -->
          <div class="list-cont" v-else>
            <ul class="list-item">
              <li
                v-for="(item, i) in searchData.list"
                :key="i"
                @click="getSearchList(searchData.list[i], true)"
              >
                {{ searchData.list[i] }}
                <span
                  ><img
                    src="@/assets/icons/cross-icon.svg"
                    alt=""
                    @click="
                      (e) => {
                        e.stopPropagation(), removeSearch(i);
                      }
                    "
                /></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ApplyChooseResume
      :id="searchData.jobId"
      v-if="commonStore.state.isApplyChooseResume"
    />
    <ScrapToast :isScraped="scrapped" @setFalse="setScrap" />
  </div>
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import { reactive, ref } from "@vue/reactivity";
import { inject, onMounted, watch } from "@vue/runtime-core";
import { search } from "@/service/API/search.js";
import { scrap } from "@/service/API/scrap.js";

import CardWrapper from "@/components/CardWrapper.vue";
import PostListSlider from "@/components/PostListSlider.vue";
import Pagination from "@/components/Pagination.vue";
import ApplyChooseResume from "./ApplyChooseResume.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import ScrapToast from "@/components/Utils/ScrapedToast.vue";

export default {
  name: "Search",
  components: {
    InnerHeader,
    NoData,
    CardWrapper,
    PostListSlider,
    Pagination,
    ApplyChooseResume,
    VuePaginate,
    ScrapToast,
  },
  setup() {
    const commonStore = inject("commonStore");
    const loginType= localStorage.getItem("login_type");
    const searchData = reactive({
      suggestionList: [],
      list: [],
      searchValue: "",
      resultList: [],
      isSuggestionListOpen: false,
      isRecentListOpen: true,
      isResultListOpen: false,
      jobId: "",
    });
    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });
    const scrapped = ref(false);

    onMounted(() => {
      window.scrollTo(0, 0);
      localStorage.getItem("PreRouteName") === "RecruiterJobPostingDetails"
        ? getSearchList(commonStore.state.searchValue, true)
        : "";
      searchData.list = localStorage.getItem("searchHistory")
        ? JSON.parse(localStorage.getItem("searchHistory")).reverse()
        : [];
    });

    watch(
      () => commonStore.state.isApplyChooseResume,
      () => {
        if (commonStore.state.isApplyChooseResume === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    async function getSearch(searchValue, onclick) {
      searchData.searchValue = searchValue;
      var existing = localStorage.getItem("searchHistory")
        ? JSON.parse(localStorage.getItem("searchHistory"))
        : [];

      // checking search value is in existing recent list search
      // let existingInList = false
      // existing.forEach(element => {
      //   if(element === searchValue) {
      //     existingInList = true
      //   }
      // });
      for (let i = 0; i < existing.length; i++) {
        if (existing[i] === searchValue) {
          existing.splice(i, 1);
          // existingInList = true
        }
      }
      // ===

      if (existing.length >= 10) {
        existing.splice(0, 1);
      }
      !existing ? (existing = []) : "";
      console.log(existing);

      searchValue.length !== 0 ? existing.push(searchValue) : "";
      localStorage.setItem("searchHistory", JSON.stringify(existing));
      searchData.list = JSON.parse(localStorage.getItem("searchHistory"));
      searchData.list.reverse();
      await getSearchList(searchValue, onclick);
    }

    async function getSearchList(searchValue, onclick, pageNo = 1) {
      pagination.pageNo = pageNo;
      searchData.searchValue = searchValue;
      let res;
      if (searchValue !== "") {
        res = await search.searchList(
          pagination.pageNo,
          pagination.perPage,
          searchValue
        );
      } else {
        res = await search.searchList(
          pagination.pageNo,
          pagination.perPage,
          ""
        );
      }
      if (res.status === 200) {
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords = res.data.total_records;
        if (onclick) {
          searchData.suggestionList = [];
          searchData.resultList = res.data.posts;
          searchData.isResultListOpen = true;
          searchData.isRecentListOpen = false;
          searchData.isSuggestionListOpen = false;
        } else {
          searchData.suggestionList = res.data.posts;
          searchData.resultList = [];
          searchData.isSuggestionListOpen = true;
          searchData.isRecentListOpen = false;
          searchData.isResultListOpen = false;
        }
      }
      if (searchValue === "" || searchValue === undefined) {
        searchData.isRecentListOpen = true;
        searchData.isResultListOpen = false;
        searchData.isSuggestionListOpen = false;
      }
    }

    function removeSearch(i) {
      searchData.list.splice(i, 1);
      localStorage.setItem("searchHistory", JSON.stringify(searchData.list));
    }
    function setPage(event) {
      pagination.pageNo = event;
      getSearchList(searchData.searchValue, true, pagination.pageNo);
    }

    const saveToBookmark = async (e, id) => {
      e.stopPropagation();
      let data = {
        id: id,
      };
      let res = await scrap.add(data);
      if (res.status === 200) {
        scrapped.value = true;
        getSearchList(searchData.searchValue, true, pagination.pageNo);
      }
    };

    const removeFromBookmark = async (e, scrapId) => {
      e.stopPropagation();
      let data = {
        id: [scrapId],
      };
      let res = await scrap.deleteScrap(data);
      if (res.status === 200) {
        getSearchList(searchData.searchValue, true, pagination.pageNo);
      }
    };

    const setScrap = () => {
      scrapped.value = false;
    }

    return {
      getSearch,
      searchData,
      scrapped,
      removeSearch,
      getSearchList,
      pagination,
      setPage,
      commonStore,
      saveToBookmark,
      removeFromBookmark,
      setScrap,
      loginType,
    };
  },
};
</script>
