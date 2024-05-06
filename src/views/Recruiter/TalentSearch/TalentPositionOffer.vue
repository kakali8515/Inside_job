<template>
<AlreadyOfferedJob
    v-if="talentPositionOfferData.isAlredyOfferedJob"
    :isModal="talentPositionOfferData.isAlredyOfferedJob"
    @conifrmModel="
      (talentPositionOfferData.isAlredyOfferedJob = false)
    "
  />
  <ConfirmJobOffer
    v-if="talentPositionOfferData.isJobConfirmModal"
    :isModal="talentPositionOfferData.isJobConfirmModal"
    @conifrmModel="
      (talentPositionOfferData.isJobConfirmModal = false),
        $router.push(`/recruiter/talent-search-list`)
    "
  />
  <Sheet
    v-else
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isTalentPositionOffer"
  >
    <div :class="`back-wh ${commonStore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >포지션 제안
          </h4>
        </div>
      </div>
      <div class="container">
        <div class="talent-heading-otr">
          <div class="apply-resume-heading">
            <h4>포지션 제안하기</h4>
            <p>올리신 공고 중 해당 지원자에게 제안할 공고를 선택해 주세요!</p>
          </div>
        </div>
      </div>
    </div>

    <div :class="`back-wh border-top ${commonStore.state.currentThemeStore}`">
      <div class="container">
        <div class="scrap-warpper talent-position-wrapper">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">공고 리스트</h3>
          </div>

          <!-- Code For No Data -->
          <NoData v-if="talentPositionOfferData.list.length === 0">
            <template v-slot:no-data-image>
              <img
                class="no-job-icon"
                src="@/assets/icons/no-job-icon.svg"
                alt=""
              />
            </template>
            <template v-slot:no-data-content>
              <p><span>등록된 공고가 없습니다.</span></p>
            </template>
          </NoData>
          <div class="scrap-list-cont" v-else>
            <div
              class="talent-offer-card scrap-edit-card"
              v-for="(item, i) in talentPositionOfferData.list"
              :key="i"
            >
              <div class="left-part">
                <div class="radio-wrapper">
                  <label class="radio-input">
                    <input
                      type="radio"
                      name="radio"
                      :value="item.id"
                      v-model="talentPositionOfferData.radioValue"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="right-part check-small-txt">
                <CardWrapper>
                  <template v-slot:content>
                    <h5>{{ item.company_name}}</h5>
                    <h3>{{ item.announcement_title }}</h3>
                  </template>
                  <template v-slot:btn>
                    <h6 style="font-size: 10px">
                     <b> {{ item.rf_text }} &nbsp;{{ item.rs_text }}&nbsp; {{ item.rt_text }}&nbsp;&nbsp;</b>
                      <span v-if="item.pay_type === 'hourly_wage'">시급</span>
                      <span v-if="item.pay_type === 'daily_wage'">일급</span>
                      <span v-if="item.pay_type === 'salary'">월급</span>&nbsp;&nbsp;
                      {{ item.salary }}원
                    </h6>
                  </template>
                </CardWrapper>
              </div>
            </div>
          </div>
        </div>
        <!-- <Pagination
          v-if="talentPositionOfferData.list.length !== 0"
          style="margin-bottom: 16px"
          :totalRecords="pagination.totalRecords"
          v-on:setNumber="setPage($event)"
        /> -->
        <div class="mb-60">
        <VuePaginate
          v-if="talentPositionOfferData.list.length !== 0"
          style="margin-bottom: 16px"
          :limit="pagination.perPage"
          :page="pagination.pageNo"
          :totalItems="pagination.totalRecords"
          v-on:setNumber="setPage($event)"
        />
        </div>
      </div>

      <div class="talent-btn-otr fixed-btn-otr">
        <div class="container">
          <button class="btn btn-primary lg" @click="positionOffer()">
            선택완료
          </button>
        </div>
      </div>
    </div>
  </Sheet>
</template>
  
<script>
import CardWrapper from "@/components/CardWrapper.vue";
import { inject, onMounted, reactive, watch } from "@vue/runtime-core";
import { TalentSearch } from "@/service/API/TalentSearch.js";
import ConfirmJobOffer from "@/components/Modals/ConfirmJobOffer.vue";
import NoData from "@/components/NoData.vue";
// import Pagination from "@/components/Pagination.vue";
import AlreadyOfferedJob from "@/components/Modals/AlreadyOfferedJob.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "TalentPositionOffer",
  components: { NoData, CardWrapper, ConfirmJobOffer, VuePaginate, AlreadyOfferedJob },
  props: {
    seekr_id: Number,
  },
  setup(props) {
    const commonStore = inject("commonStore");
    const talentPositionOfferData = reactive({
      list: [],
      radioValue: "",
      isJobConfirmModal: false,
      isAlredyOfferedJob: false
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    onMounted(() => {
      announcementList();
    });

    watch(
      () => talentPositionOfferData.isJobConfirmModal,
      () => {
        if (talentPositionOfferData.isJobConfirmModal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    async function announcementList() {
      let res = await TalentSearch.annoucementList({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        talentPositionOfferData.list = res.data.posts;
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords = res.data.total_records
      }
    }

    async function positionOffer() {
      let userData = {
        seeker_id: props.seekr_id,
        job_id: talentPositionOfferData.radioValue,
      };
      let res = await TalentSearch.offerPosition(userData);
      if (res.status === 200) {
        talentPositionOfferData.isJobConfirmModal = true;
      } else if(res.response.data.error === "alreadyOfferedJob") {
        talentPositionOfferData.isAlredyOfferedJob = true;
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      announcementList();
    }

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    return {
      commonStore,
      talentPositionOfferData,
      positionOffer,
      pagination,
      setPage,
      popClose
    };
  },
};
</script>
  
  