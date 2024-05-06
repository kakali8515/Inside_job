<template>
    <div>
    <div class="back-wh">
      <div class="top-hdr m-0 top-hdr-br">
        <div class="container">
          <InnerHeader headerTitle="별점 관리" />
        </div>
      </div>   
      <div class="container">
          <div class="comp-profile-area comp-profile-area-sm-g">
              <div class="profile-image">
                <img :src="employeeRatingData.profile_image" alt="">
              </div>
              <h4>{{employeeRatingData.name}}</h4>
              <p class="star-rt" v-if="employeeRatingData.seeker_avg_rating != 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>{{employeeRatingData.seeker_avg_rating}}</p>
              <p class="star-rt" v-if="employeeRatingData.seeker_avg_rating == 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>5</p>
          </div>
      </div>   
    </div>    

    <div class="form-wrapper resig-letter-wrapper">
        <form>
            <div class="back-wh border-top border-f2">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">별점 평가</h3>
                        </div>
                        <div class="rating-wrap rating-wrap-small">
                        <div class="item-row">
                            <p>업무 역량</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="employeeRatingData.work_competency"
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
                                ><em>{{ Number(employeeRatingData.work_competency) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>책임감</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="employeeRatingData.responsibility"
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
                                ><em>{{ Number(employeeRatingData.responsibility) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>팀워크</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="employeeRatingData.teamwork"
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
                                ><em> {{ Number(employeeRatingData.teamwork) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>친절/배려</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="employeeRatingData.kindness_caring"
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
                                ><em>{{ Number(employeeRatingData.kindness_caring) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row">
                            <p>성실/도덕성</p>
                            <div class="star-cont">
                            <div class="rate-img">
                                <StarRating
                                v-model:rating="employeeRatingData.sincerity_morality"
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
                                ><em>{{ Number(employeeRatingData.sincerity_morality) * 2 }}</em
                                >점</span
                            >
                            </div>
                        </div>
                        <div class="item-row total-rating">
                            <div class="star-cont">
                            <span
                                ><b>총</b><em v-if="employeeRatingData.seeker_avg_rating != 0">{{employeeRatingData.seeker_avg_rating}}</em
                                ><em v-if="employeeRatingData.seeker_avg_rating == 0">5</em
                                ><b>점</b></span
                            >
                            </div>
                        </div>
                        </div>        
                    </div>
                </div>
            </div>  
            <div class="back-wh border-top border-f2">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">한 줄 평가</h3>
                        </div>
                        <div class="form-group mb-0">                           
                            <textarea class="form-control form-control-33" readonly v-model="employeeRatingData.one_line_evaluation" placeholder="000한 점이 좋았습니다."></textarea>                        
                        </div>
                    </div>
                </div>
            </div>          
        </form>
    </div>
</div>
  </template>
  
  <script>
  import InnerHeader from "@/components/innerHeader.vue";
  import { reactive, ref } from "@vue/reactivity";
  import {StarManagementService} from "../../../service/API/StarManagement";
  import { onBeforeMount } from "@vue/runtime-core";
  import { useRoute } from "vue-router";
  import StarRating from "vue-star-rating";
  export default {
    name: "RecruiterStarManagementLookup",
    components: {
      InnerHeader,  
      StarRating   
    },
    setup() {
      const route = useRoute();
      const employeeRatingData = ref({});
      
      onBeforeMount(async () => {
          //route.params.id
          await ratingDetails(route.params.id);
      });

  const ratingDetails = async (id) => {
    let res = await StarManagementService.employeeRatingDetails(id);
    console.log(res)
    employeeRatingData.value = res.data
  };

  return {
    employeeRatingData
  };

  },
  };
  </script>