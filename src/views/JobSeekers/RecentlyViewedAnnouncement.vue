<template>
  <div class="common-sec back-wh">
    <div class="container">
      <div class="scrap-warpper">
        <div class="heading">공고 리스트</div>
        <!-- Code For No Data -->
        <NoData v-if="AnnouncementData.list.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>최근 본 공고가 없습니다.</span></p>
            <p>다양한 채용정보가 여러분을 기다리고 있습니다!</p>
          </template>
        </NoData>

        <!-- Code For Announcement List -->
        <div class="scrap-list-cont recent-view-announcement" v-else>
          <div
            class="scrap-announcement-card"
            v-for="(item, i) in AnnouncementData.list"
            :key="i"
          >
            <CardWrapper @click="$router.push({name: 'RecruiterJobPostingDetails', params: {id: item.id}})">
              <template v-slot:content>
                <div class="top-part">
                  <h5>{{ item.company_name }}</h5>
                  <span class="scrap-icon">
                    <img
                      v-if="item.is_scraps == 1"
                      src="@/assets/icons/scraped-red-icon.svg"
                      alt=""
                      @click="removeFromBookmark($event,item.scrap_id)"
                    />
                    <img
                      v-else
                      @click="saveToBookmark($event,item.id)"
                      src="@/assets/icons/scraped-gray-icon.svg"
                      alt=""
                    />
                  </span>
                </div>
                <h3>{{ item.announcement_title }}</h3>
              </template>
              <template v-slot:btn>
                <h6>
                  <b>{{ item.rf_text }} {{ item.rs_text }} {{ item.rt_text }}</b>
                  <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                  <span v-if="item.pay_type === 'hourly_wage'">시급</span>
                  <span v-if="item.pay_type === 'daily_wage'">일급</span>
                  <span v-if="item.pay_type === 'salary'">월급</span>
                  <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
                  <em>{{ commonStore.methods.formatSalary(item.salary) }}원</em>
                </h6>
                <span
                  class="btn btn-primary-gradient apply-btn"
                  @click="(e) => { e.stopPropagation(), commonStore.state.isApplyChooseResume = true,applyId=item.id }"
                  >지원하기</span
                >
              </template>
            </CardWrapper>
          </div>
        </div>

        <!-- <Pagination
          v-if="AnnouncementData.list.length !== 0"
          :totalRecords="pagination.totalRecords"
          v-on:setNumber="setPage($event)"
        /> -->
        <VuePaginate
          :limit="pagination.perPage"
          :page="pagination.pageNo"
          :totalItems="pagination.totalRecords"
          v-on:setNumber="setPage($event)"
        />
        <ApplyChooseResume
          :id="applyId"
          v-if="commonStore.state.isApplyChooseResume"
        />
        <!-- <div class="pagination-area" v-if="AnnouncementData.list.length !== 0">
          <a href="#" class="first-page disable">
            <img src="@/assets/icons/pagi-dobble-arrow.svg" />
          </a>
          <a href="#" class="next disable"
            ><img src="@/assets/icons/pagi-arrow.svg"
          /></a>
          <ul>
            <li class="active">1</li>
          </ul>
          <a href="#" class="prev disable"
            ><img src="@/assets/icons/pagi-arrow.svg"
          /></a>
          <a href="#" class="last-page disable">
            <img src="@/assets/icons/pagi-dobble-arrow.svg" />
          </a>
        </div> -->
      </div>
    </div>
    <div class="scrapped-icon scrapped-icon-transform act" v-if="commonStore.state.popupMessageShow">
      <p><span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span> 스크랩했습니다.</p>
    </div>
  </div>
</template>
  
  <script>
import NoData from "@/components/NoData.vue";
import CardWrapper from "@/components/CardWrapper.vue";
import { onMounted, reactive, inject, watch, ref } from "vue";
import { recentlyViewedAnnouncement } from "@/service/API/recentlyViewedAnnouncement.js";
import Pagination from "@/components/Pagination.vue";
import { scrap } from "@/service/API/scrap.js";
import ApplyChooseResume from "./ApplyChooseResume.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "RecentlyViewedAnnouncement",
  components: {
    NoData,
    CardWrapper,
    Pagination,
    ApplyChooseResume,
    VuePaginate,
  },

  setup() {
    const commonStore = inject("commonStore");
    const AnnouncementData = reactive({
      list: [],
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    const applyId = ref(0)

    onMounted(() => {
      list();
    });
    watch(
      () => commonStore.state.themeSetting,
      () => {
        list();
      }
    );
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
    async function list() {
      let res = await recentlyViewedAnnouncement.list({
        page: pagination.pageNo,
        limit: pagination.perPage,
        silver_bell_status: 0
      });
      // silver_bell_status: commonStore.state.themeSetting, //this value come from localstorage when store
      if (res.status === 200) {
        AnnouncementData.list = res.data.posts;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = res.data.total_records;
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      list();
      window.scrollTo(0, 0);
    }

    const saveToBookmark = async (e,id) => {
      e.stopPropagation()
      let data = {
        id: id,
      };
      let res = await scrap.add(data);
      if (res.status === 200) {
        list();
        commonStore.methods.scrappedSuccessful()
      }
    };

    const removeFromBookmark = async (e,scrapId) => {
      e.stopPropagation()
      let data = {
        id: [scrapId],
      };
      let res = await scrap.deleteScrap(data);
      if (res.status === 200) {
        list();
      }
    };

    return {
      AnnouncementData,
      pagination,
      setPage,
      commonStore,
      saveToBookmark,
      removeFromBookmark,
      applyId
    };
  },
};
</script>
  
<style scoped>
.scrapped-icon-transform {
  transform: none
}
</style>