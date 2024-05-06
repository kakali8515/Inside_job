<template>
   <div class="back-wh common-sec">  
         <div class="top-hdr top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" @click="$router.push({ name: 'MyPage' })" /></a>별점 관리
                </h4>
            </div>
        </div> 
        <div class="pb-32">
            <div class="container">   
                <div class="sub-otr mb-21 b-color">
                    <h3 class="sub-heading mb-0">별점 조회</h3>
                </div> 
                <!-- Code For No Data -->
                <div v-if="ratedCompanyList.lists.length === 0">
                <NoData>
                    <template v-slot:no-data-image>
                        <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                    </template>
                    <template v-slot:no-data-content>
                        <p><span>작성한 별점 리스트가 없습니다.</span></p>
                    </template>
                </NoData>  
                </div>
                <div v-if="ratedCompanyList.lists.length > 0">
                <ul class="star-rating-list">
                    <li v-for="(i, e) in ratedCompanyList.lists" :key="e">
                        <div class="star-rating-top">
                            <h3>{{i.company_name}}</h3>
                            <p v-if="i.employer_rating != 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>{{i.employer_rating}}</p>
                            <p v-if="i.employer_rating == 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>5</p>
                        </div>
                        <div class="star-rating-bottom">
                             <span>{{store.methods.dateFormat(i.created_at, "YYYY년 M월 D일")}}</span>
                             <!-- <a href="#" class="btn btn-primary-outline">작성 가능</a>  -->
                             <button class="btn btn-primary-outline" v-if="i.rating_status !== 'completed'" @click="openRatingPage(i.id)">작성 가능</button>
                             <button class="btn btn-primary-outline gray" v-if="i.rating_status == 'completed'" @click="openRatingDetailsPage(i.id)">작성 완료</button>
                        </div>
                    </li>
                </ul>
              

                <!-- <Pagination
                    :totalRecords="ratedCompanyList.totalItem"
                    v-on:setNumber="setPage($event)"
                /> -->

                <VuePaginate
                    :limit="ratedCompanyList.limit"
                    :page="ratedCompanyList.page"
                    :totalItems="ratedCompanyList.totalItem"
                    v-on:setNumber="setPage($event)"
                  />
            </div>
            </div>  
        </div>
    </div>

</template>
  
  <script>
  import NoData  from '@/components/NoData.vue';
  import { inject } from "vue";
  import {StarManagementService} from "../../service/API/StarManagement";
  import Pagination from "@/components/Pagination.vue";
  import { reactive, ref } from "@vue/reactivity";
  import { onBeforeMount } from "@vue/runtime-core";
  import { useRouter } from "vue-router";
  import VuePaginate from "@/components/Utils/VuePaginate.vue";
  export default {
    name: "RecruiterStarManagement",
    components: {   
      NoData,
      Pagination,
      VuePaginate,
    },

    setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const ratedCompanyList = reactive({
      limit: 10,
      page: 1,
      totalItem: null,
      lists: [],
    });

    onBeforeMount(async () => {
      await companyList();
    });

    const companyList = async () => {
      let res = await StarManagementService.companyListForRating(
        ratedCompanyList.page,
        ratedCompanyList.limit
      );
      console.log(res.data.posts)
      ratedCompanyList.totalItem = res.data.total_records;
      ratedCompanyList.lists = res.data.posts;
    
    };

    // for pagination getting page no.
    const setPage = (event) => {
      ratedCompanyList.page = event;
      companyList();
    };
    const openRatingPage = (id) => {
      router.push({ name: "CompanyStarRating", query: { id: id } });
    };
    const openRatingDetailsPage = (id) => {
        //console.log(id)
      router.push({ name: "StarManagementLookup", params: { id: id } });
    };
    return {
        ratedCompanyList,
        store,
        setPage,
        openRatingPage,
        openRatingDetailsPage
    };
  },
  };
  </script>
  