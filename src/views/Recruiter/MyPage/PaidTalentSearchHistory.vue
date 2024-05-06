<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">

          <a href="javascript:void(0);" class="left-arrow" @click="$router.go(-1);">

            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >유료 인재 검색 내역
        </h4>
      </div>
    </div>
    <div class="pb-32">
      <div class="container">
        <div class="sub-otr mb-21 b-color">
          <h3 class="sub-heading mb-8 lg">내역 리스트</h3>
          <p>유료 인재검색은 열람 후 60일간 재열람이 가능합니다.</p>
        </div>
        <div v-if="PaidTalentHistoryData.list.length === 0">
          <NoData>
            <template v-slot:no-data-image>
              <img
                class="no-job-icon"
                src="@/assets/icons/no-job-icon.svg"
                alt=""
              />
            </template>
            <template v-slot:no-data-content>
              <p><span>인재 검색 내역이 없습니다.</span></p>
              <p>인재 검색권을 사용해 뛰어난 인재를 만나보세요!</p>
            </template>
          </NoData>
          <button
            type="button"
            class="btn btn-primary lg mt-32"
            @click="$router.push(`/recruiter/talent-search-list`)"
          >
            인재 검색하기
          </button>
        </div>
        <div class="talent-srch-wrapper" v-else>
          <div
            class="recruiter-applicant-card history-list "
            v-for="(item, i) in PaidTalentHistoryData.list"
            :key="i"
          >
            <span class="sc-date">{{
              store.methods.dateFormat(item.created_at, "YYYY년 M월 D일")
            }}</span>
            <ApplicantCard>
              <template v-slot:applicant-lft-content>
                <span>
                  <img
                    v-if="item.profile_image == null"
                    src="@/assets/images/image.png"
                  />
                  <img v-else :src="item.profile_image" alt="" />
                </span>
                <h5>{{ item.name }}</h5>
                <h5>({{ item.gender }},{{ item.age }}세)</h5>
              </template>
              <template v-slot:applicant-rht-content>
                <h4>{{ item.resume_title }}</h4>
                <ul>
                  <li class="scope-cont">
                    <span class="sc-title">별점</span>
                    <div class="desc rating">
                      <img src="@/assets/icons/star.svg" alt="" />
                      <img src="@/assets/icons/star.svg" alt="" />
                      <img src="@/assets/icons/star.svg" alt="" />
                      <img src="@/assets/icons/star.svg" alt="" />
                      <img src="@/assets/icons/star.svg" alt="" />
                      <span>{{ item.rating }}</span>
                    </div>
                  </li>
                  <li class="support-cont">
                    <span class="sc-title">지원부분</span>
                    <div class="desc">
                      {{ item.occupation_details }}
                    </div>
                  </li>
                </ul>
              </template>
              <template v-slot:applicant-btn>
                <div class="doc-btn-group full">
                  <button
                    type="button"
                    class="doc-btn-innr"
                    @click="CheckResume(item.seeker_id, item.resume_id)"
                  >
                    이력서 확인하기
                    <span
                      ><img src="@/assets/icons/resume-grey-icon.svg" alt=""
                    /></span>
                  </button>
                </div>
              </template>
            </ApplicantCard>
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
    </div>
  </div>
</template>

  <script>
import ApplicantCard from "@/components/ApplicantCard.vue";
import { reactive } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
import { TalentSearch } from "@/service/API/TalentSearch.js";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import NoData from "@/components/NoData.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "PaidTalentSearchHistory",
  components: { ApplicantCard, Pagination, NoData, VuePaginate },

  setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const PaidTalentHistoryData = reactive({
      list: [],
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 5,
      pageNo: 1,
    });

    onMounted(() => {
      talentSearchHistoryList();
    });

    async function talentSearchHistoryList() {
      let res = await TalentSearch.talentSearchHistory({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        PaidTalentHistoryData.list = res.data.data;
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords =
          res.data.total_records;
      }
    }

    async function CheckResume(user_id, resume_id) {
      let res = await TalentSearch.viewTalentSearch({
        seeker_id: user_id,
      });

      router.push(`/recruiter/applicant-information/${resume_id}/${user_id}`);
    }

    function setPage(event) {
      pagination.pageNo = event;
      talentSearchHistoryList();
    }

    

    return {
      PaidTalentHistoryData,
      CheckResume,
      pagination,
      setPage,
      store,
    };
  },
};
</script>
  