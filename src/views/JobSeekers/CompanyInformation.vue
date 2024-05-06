<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="기업 정보" />
        <!-- <h4 class="heading">
          <a href="javascript:void(0);" class="left-arrow">
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >기업 정보
        </h4> -->
      </div>
    </div>
    <div class="container company-information-area">
      <div class="pb-32">
        <div class="sub-otr mb-21">
          <div class="rating-otr wishlist">
            <h5 class="sub-heading mb-0 lg"> 
              <span
                ><img
                  :src="companyDetails.company_profile_img"
                  alt=""
                  width="50"
                  height="50"
              /></span>
              {{ companyDetails.company_name }}
            </h5>
            <p @click="setFavChange(companyDetails.is_interested)">
              관심
              <span>
                <img
                  src="@/assets/icons/wishlist-fill.svg"
                  alt=""
                  v-if="likedCompany"
                />
                <img src="@/assets/icons/wishlist.svg" alt="" v-else />
              </span>
            </p>
          </div>
        </div>
        <div class="para">
          <p v-html="companyDetails.introduction"></p>
        </div>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="container">
      <div class="cm-top-space pb-32">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">기본정보</h3>
        </div>
        <ul class="post-list">
          <li>
            <p class="p-left">기업명</p>
            <p class="p-right">[주] {{ companyDetails?.company_name }}</p>
          </li>
          <li>
            <p class="p-left">직원수</p>
            <p class="p-right">
              {{
                companyDetails?.no_of_emp == null
                  ? "0"
                  : companyDetails?.no_of_emp
              }}명
            </p>
          </li>
          <li>
            <p class="p-left">회사 주소</p>
            <p class="p-right">{{ companyDetails?.company_address }}</p>
          </li>
          <li>
            <p class="p-left">산업군</p>
            <p class="p-right">{{ companyDetails?.industry }}</p>
          </li>
          <li>
            <p class="p-left">별점</p>
            <p class="">
              <em class="rating-img">
                <star-rating
                  v-model:rating="showRating"
                  :star-size="16"
                  :increment="0.5"
                  :show-rating="false"
                  :fixed-points="2"
                  :read-only="true"
                  inactive-color="#fff"
                  active-color="#DF1B3F"
                  :border-width="2"
                  border-color="#DF1B3F"
                  :inline="true"
                  :padding="7"
                  :rounded-corners="true"
                  text-class="custom-rating"
                ></star-rating>
                {{ companyDetails.employer_rating }}점</em
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color d-flex mb-0">
          <h3 class="sub-heading mb-0">진행중인 채용공고</h3>
          <p>
            <span class="red">{{ companyDetails.totalpost }}</span> 건
          </p>
        </div>
        <div class="posting-list comp-info-list">
          <CardWrapper v-for="(i, e) in jobListing.lists" :key="e">
            <template v-slot:content>
              <h5
                @click="
                  $router.push({
                    name: 'RecruiterJobPostingDetails',
                    params: {
                      id: i.job_id,
                    },
                  })
                "
              >
                {{ i.company_name }}
              </h5>
              <h3
                @click="
                  $router.push({
                    name: 'RecruiterJobPostingDetails',
                    params: {
                      id: i.job_id,
                    },
                  })
                "
              >
                {{ i.announcement_title }}
              </h3>
            </template>
            <template v-slot:btn>
              <h6>
                <b>{{ i.region_3rd_depth_name }} {{ i.region_2nd_depth_name }}</b>
                <span>시급</span> {{ (i.salary * 1).toLocaleString("en-US")  }}원
              </h6>
              <span
                class="btn btn-primary-gradient-small apply-btn"
                @click="setApplyId(i.job_id)"
                >지원하기</span
              >
            </template>
          </CardWrapper>
        </div>
        <!-- <Pagination
          :totalRecords="jobListing.totalItem"
          v-on:setNumber="setPage($event)"
        /> -->
        <VuePaginate
                    :limit="jobListing.limit"
                    :page="jobListing.page"
                    :totalItems="jobListing.totalItem"
                    v-on:setNumber="setPage($event)"
                  />
        <!-- <div class="pagination-area mt-16">
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
  </div>
  <ApplyChooseResume :id="applyId" v-if="store.state.isApplyChooseResume" />
  <div class="scrapped-icon wish-icon act" v-if="!popupMessageShow">
      <p>
        <span><img src="@/assets/icons/wishlist-fill.svg" alt="" /></span> 관심
        기업 등록이 완료되었습니다.
      </p>
    </div>
    <div
      class="scrapped-icon wish-icon scrapped-icon-transform act"
      v-if="popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/wishlist-fill.svg" alt="" /></span> 관심
        기업 등록이 완료되었습니다.
      </p>
    </div>
</template>

<script>
import NoData from "@/components/NoData.vue";
import CardWrapper from "@/components/CardWrapper.vue";
import InnerHeader from "@/components/innerHeader.vue";
import StarRating from "vue-star-rating";
import Pagination from "@/components/Pagination.vue";
import { reactive, ref } from "@vue/reactivity";
import { inject, onBeforeMount, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { CompanyOfInterestService } from "../../service/API/CompanyOfInterest.js";
import ApplyChooseResume from "@/views/JobSeekers/ApplyChooseResume.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
export default {
  name: "CompanyInformation",
  components: {
    NoData,
    CardWrapper,
    InnerHeader,
    StarRating,
    Pagination,
    ApplyChooseResume,
    VuePaginate,
  },
  setup() {
    const companyDetails = ref({});
    const showRating = ref(0);
    const popupMessageShow = ref(false);
    const jobListing = reactive({
      limit: 10,
      page: 1,
      totalItem: null,
      lists: [],
    });
    const likedCompany = ref(false);
    const applyId = ref("");
    const route = useRoute();
    const store = inject("commonStore");

    onBeforeMount(async () => {
      await getDetails();
    });

    watch(
      () => store.state.isApplyChooseResume,
      () => {
        if (store.state.isApplyChooseResume === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    const getDetails = async () => {
      window.scrollTo(0, 0);
      let res = await CompanyOfInterestService.getDetailList(
        route.params.id,
        jobListing.page,
        jobListing.limit
      );
      // console.log(res);
      companyDetails.value = res.data.company_detail;
      showRating.value = res.data.company_detail.employer_rating / 2;
      jobListing.totalItem = res.data.joblisting.total_records;
      jobListing.lists = res.data.joblisting.posts;
      likedCompany.value =
        res.data.company_detail.is_interested == 1 ? true : false;
    };

    // for pagination getting page no.
    const setPage = (event) => {
      jobListing.page = event;
      getDetails(); 
    };

    // change Fav
    const setFavChange = async (status) => {
      var companyId = {
        employer_id: route.params.id,
      };
      if (status == 1) {
        let res = await CompanyOfInterestService.deletedCompany(companyId);
        if (res.status === 200) {
          await getDetails();
          likedCompany.value = false;
        }
      } else {
        let res2 = await CompanyOfInterestService.addFavourites(companyId);
        if (res2.status === 200) {
          await getDetails();
          likedCompany.value = true;
          popupMessageShow.value = true;
          setTimeout(() => {
            popupMessageShow.value = false;
          }, 4000);
        }
      }
    };

    function setApplyId(id) {
      applyId.value = id;
      store.state.isApplyChooseResume = true;
    }

    return {
      companyDetails,
      jobListing,
      showRating,
      likedCompany,
      applyId,
      store,
      popupMessageShow,
      setApplyId,
      setPage,
      setFavChange,
    };
  },
};
</script>
<style scoped>
.scrapped-icon-transform {
  transform: none;
}
</style>