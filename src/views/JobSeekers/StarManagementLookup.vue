<template>
    <div>
    <div class="back-wh">
      <div class="top-hdr m-0 no-border">
        <div class="container">
          <InnerHeader headerTitle="별점 관리" />
        </div>
      </div>   
      <div class="container">
          <div class="comp-profile-area">
              <div class="profile-image">
                <!-- <img :src="companyRatingDetails.company_profile_img" alt=""> -->
                <img v-if="companyRatingDetails.company_profile_img !== null" :src="companyRatingDetails.company_profile_img" alt="" />
          <img v-if="companyRatingDetails.company_profile_img === null" src="@/assets/images/mypage-profile-img.png" alt="" />
              </div>
              <h4>{{companyRatingDetails.company_name}}</h4>
              <p class="star-rt" v-if="companyRatingDetails.employer_rating != 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>{{companyRatingDetails.employer_rating}}</p>
              <p class="star-rt" v-if="companyRatingDetails.employer_rating == 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>5</p>
              
          </div>
      </div>   
    </div>    

    <div class="form-wrapper resig-letter-wrapper">
        <form>
            <div class="back-wh border-top">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">별점 평가</h3>
                        </div>
                        <div class="rating-wrap">
                        <div class="item-row">
                            <p>복지 및 급여</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="companyRatingDetails.welfare_and_salary"
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
                            </div>
                            <span
                                ><em>{{ Number(companyRatingDetails.welfare_and_salary) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>근무환경</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="companyRatingDetails.working_environment"
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
                            </div>
                            <span
                                ><em>{{ Number(companyRatingDetails.working_environment) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>업무와 삶의 균형</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="companyRatingDetails.work_life_balance"
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
                            </div>
                            <span
                                ><em> {{ Number(companyRatingDetails.work_life_balance) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>사내문화</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="companyRatingDetails.company_culture"
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
                            </div>
                            <span
                                ><em>{{ Number(companyRatingDetails.company_culture) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>승진기회 및 가능성</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="companyRatingDetails.promotion_opportunity_and_posibilities"
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
                            </div>
                            <span
                                ><em>{{ Number(companyRatingDetails.promotion_opportunity_and_posibilities) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row total-rating">
                            <div class="star-cont">
                            <span
                                ><b>총</b><em v-if="companyRatingDetails.employer_rating != 0">{{ companyRatingDetails.average_rating }}</em
                                ><em v-if="companyRatingDetails.employer_rating == 0">5</em
                                ><b>점</b></span
                            >
                            </div>
                        </div>
                        </div>        
                    </div>
                </div>
            </div>   
            <div class="back-wh border-top">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">한 줄 평가</h3>
                        </div>
                        <div class="form-group mb-0">                           
                            <textarea class="form-control" readonly v-model="companyRatingDetails.one_line_evaluation" placeholder="000한 점이 좋았습니다."></textarea>                        
                        </div>
                    </div>
                </div>
            </div>          
           
            
            
          
        </form>
    </div>
   

   
    </div>
  </template>
  
  <script>
  import { reactive, ref } from "@vue/reactivity";
  import InnerHeader from "../../components/innerHeader.vue";
  import {StarManagementService} from "../../service/API/StarManagement";
  import { onBeforeMount } from "@vue/runtime-core";
  import { useRoute } from "vue-router";
  import StarRating from "vue-star-rating";
  export default {
    name: "StarManagementLookup",
    components: {
      InnerHeader,
      StarRating    
    },
    setup() {
        const route = useRoute();
        const companyRatingDetails = ref({});
        
        onBeforeMount(async () => {
            //route.params.id
            await ratingDetails(route.params.id);
        });

    const ratingDetails = async (id) => {
      let res = await StarManagementService.employerRatingDetails(id);
      console.log(res)
      companyRatingDetails.value = res.data
    };

    return {
        companyRatingDetails
    };

    },
   
  };
  </script>
  