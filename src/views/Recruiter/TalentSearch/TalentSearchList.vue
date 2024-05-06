<template>
  <div v-show="talentSearchData.isList">
    <div class="back-wh">
      <div class="container">
        <div class="filter-otr">
          <div
            class="place-fliter-cont talent-srch"
            @click="
              (store.state.isOccupationOpen = true),
                (talentSearchData.isList = false)
            "
          >
            <!-- <input type="text" :value="store.state.filtersVisibleState" placeholder="직무를 선택하세요" class="form-control" @click="$router.push(`/recruiter/job-selections`)" />talentSearchData.isOccupationOpen -->
            <input
              type="text"
              :value="store.state.filtersVisibleState"
              placeholder="직무를 선택하세요"
              class="form-control"
            />
            <a href="#" class="filter-ic"
              ><img src="@/assets/icons/filter-icon.svg" alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>
    <div class="back-wh border-top">
      <div class="cm-top-space pb-32">
        <div class="container">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">인재목록</h3>
          </div>
          <!-- Code For No Data -->
          <NoData v-if="talentSearchData.list.length === 0">
            <template v-slot:no-data-image>
              <img
                class="no-job-icon"
                src="@/assets/icons/no-job-icon.svg"
                alt=""
              />
            </template>
            <template v-slot:no-data-content>
              <p><span>직무에 해당하는 인재가 없습니다.</span></p>
            </template>
          </NoData>
          <div class="talent-srch-wrapper">
            <div
              class="recruiter-applicant-card"
              v-for="(item, i) in talentSearchData.list"
              :key="i"
            >
              <ApplicantCard>
                <template v-slot:applicant-lft-content>
                  <span>
                    <img
                      v-if="item.profile_image !== null"
                      :src="item.profile_image"
                      alt=""
                    />
                    <img v-else src="@/assets/images/image.png" alt="" />
                  </span>
                  <h5>{{ item.name }}</h5>
                  <!-- <h5>(남,{{item.age}}세)</h5> -->
                  <h5>
                    (<span v-if="item.gender === 'm'">남</span>
                    <span v-if="item.gender === 'f'">여자</span>,{{
                      item.age
                    }}세)
                  </h5>
                </template>
                <template v-slot:applicant-rht-content>
                  <h4>{{ item.resume_title }}</h4>
                  <ul>
                    <li class="scope-cont">
                      <span class="sc-title" style="color: #a4a4a4">별점</span>
                      <div class="desc rating" v-if="item.is_show_rating === 1">
                        <StarRating
                          v-model:rating="item.rating"
                          v-bind:increment="0.5"
                          inactive-color="#fff"
                          border-color="#DF1B3F"
                          active-color="#DF1B3F"
                          border-width="3"
                          :max-rating="5"
                          padding="1"
                          rounded-corners="true"
                          inline="true"
                          glow="3"
                          glow-color="#fff"
                          star-size="18"
                          :show-rating="false"
                          read-only="true"
                        ></StarRating>
                        <span>{{ item.rating * 2 }}</span>
                      </div>
                      <div class="desc rating" v-else>
                        인재 열람권 사용 후 확인 가능합니다!
                      </div>
                    </li>
                    <li class="support-cont">
                      <span class="sc-title" style="color: #a4a4a4"
                        >지원부분</span
                      >
                      <div class="desc">
                        {{ item.occupation_details }}
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-slot:applicant-btn>
                  <div class="doc-btn-group full">
                    <a
                      @click="
                        CheckResume(
                          item.seeker_id,
                          item.resume_id,
                          item.talent_search_history_exist
                        )
                      "
                      class="doc-btn-innr"
                      >이력서 확인하기
                      <span
                        ><img
                          src="@/assets/icons/resume-grey-icon.svg"
                          alt="" /></span
                    ></a>
                  </div>
                </template>
              </ApplicantCard>
            </div>
            <!-- <Pagination
              v-if="talentSearchData.list.length !== 0"
              :totalRecords="pagination.totalRecords"
              v-on:setNumber="setPage($event)"
            /> -->
            <VuePaginate
              v-if="talentSearchData.list.length !== 0"
              :limit="pagination.perPage"
              :page="pagination.pageNo"
              :totalItems="pagination.totalRecords"
              v-on:setNumber="setPage($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <OccupationSetting
    @setfalse="hideoccupation($event)"
    v-show="store.state.isOccupationOpen"
    title="직무선택"
  />
  <TalentSearchVoucherNotAvailable
    :isModal="talentSearchData.isTalentSearchNotAvilable"
    @conifrmModel="$router.push(`/recruiter/paid-product-purchase`)"
  />
  <!-- @conifrmModel="$router.push(`/`)" -->
  <TalentSearchVoucherAvailable
    :isModal="talentSearchData.isTalentSearchAvilable"
    @confirmViewResume="viewResume()"
    @closeModal="talentSearchData.isTalentSearchAvilable = false"
  />
</template>

<script>
import ApplicantCard from "@/components/ApplicantCard.vue";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import { reactive, inject, watch, onMounted } from "vue";
import { TalentSearch } from "@/service/API/TalentSearch.js";
import Pagination from "@/components/Pagination.vue";
import { useRouter, useRoute } from "vue-router";
import TalentSearchVoucherNotAvailable from "@/components/Modals/TalentSearchVoucherNotAvailable.vue";
import TalentSearchVoucherAvailable from "@/components/Modals/TalentSearchVoucherAvailable.vue";
import NoData from "@/components/NoData.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import StarRating from "vue-star-rating";
export default {
  name: "TalentSearchList",
  components: {
    ApplicantCard,
    OccupationSetting,
    Pagination,
    TalentSearchVoucherNotAvailable,
    TalentSearchVoucherAvailable,
    NoData,
    VuePaginate,
    StarRating,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = inject("occupationStore");
    const talentSearchData = reactive({
      list: [],
      talent_search_exist: 0,
      // isOccupationOpen: false,
      isList: true,
      searchData: store.state.filtersVisibleState,
      isTalentSearchNotAvilable: false,
      isTalentSearchAvilable: false,
      user_id: 0,
      resume_id: 0,
      is_show_rating: 0,
    });
    const pagination = reactive({
      totalRecords: 0,
      perPage: 5,
      pageNo: 1,
    });

    onMounted(() => {
      store.methods.refreshAllData();
      talentSearchList();
    });

    watch(
      () => store.state.filtersVisibleState,
      () => {
        pagination.pageNo = 1;
        talentSearchList();
      }
    );

    function hideoccupation(data) {
      store.state.isOccupationOpen = data;
      talentSearchData.isList = true;
    }

    async function talentSearchList() {
      let userData = {
        page: pagination.pageNo,
        limit: pagination.perPage,
        occupations: store.state.totalFilterState,
      };
      let res = await TalentSearch.talentSearchlist(userData);
      if (res.status === 200) {
        talentSearchData.talent_search_exist = res.data.talent_search_exist;
        talentSearchData.list = res.data.data;
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords = res.data.total_records;

        talentSearchData.list.map(function (value, key) {
          if (talentSearchData.list[key].rating !== 0) {
            talentSearchData.list[key].rating /= 2;
          } else {
            talentSearchData.list[key].rating = 2.5;
          }
        });
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      talentSearchList();
      window.scrollTo(0, 0);
    }

    function CheckResume(user_id, resume_id, talent_search_history_exist) {
      talentSearchData.user_id = user_id;
      talentSearchData.resume_id = resume_id;
      // talentSearchData.is_show_rating = is_show_rating;
      if (talent_search_history_exist === 0) {
        if (talentSearchData.talent_search_exist === "1") {
          talentSearchData.isTalentSearchAvilable = true;
        } else {
          talentSearchData.isTalentSearchNotAvilable = true;
        }
      } else {
        viewResume();
      }
    }
    async function viewResume() {
      // if (talentSearchData.is_show_rating === 0) {
      let data = {
        seeker_id: talentSearchData.user_id,
      };
      if (Object.keys(route.query).length !== 0) {
        data.purchased_ads_id = route.query.id;
      }
      let res = await TalentSearch.viewTalentSearch(data);
      if (res.status === 200) {
        router.push(
          `/recruiter/applicant-information/${talentSearchData.resume_id}/${talentSearchData.user_id}`
        );
      } else if (
        res.response &&
        res.response.data.error == "noPurchasedTalentFeatureFoundinStorage"
      ) {
        talentSearchData.isTalentSearchAvilable = false;
        talentSearchData.isTalentSearchNotAvilable = true;
      }
    }

    return {
      talentSearchData,
      hideoccupation,
      store,
      pagination,
      setPage,
      viewResume,
      CheckResume,
    };
  },
};
</script>
