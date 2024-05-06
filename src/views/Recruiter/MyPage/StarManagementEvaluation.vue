<template>
    <div>
    <div class="back-wh">
      <div class="top-hdr m-0">
        <div class="container">
          <InnerHeader headerTitle="별점 평가" @backButtonPressed="cancelShowModal = true"/>
        </div>
      </div>   
      <div class="container">
          <div class="comp-profile-area">
              <div class="profile-image">
                <!-- <img :src="profile_img" alt=""> -->
                <img v-if="profile_img != null" :src="profile_img" alt="profile_img" />
                <img v-if="profile_img == null" src="@/assets/images/mypage-profile-img.png" alt="profile_img" />
              </div>
              <h4>{{ name }}</h4>
              <!-- <p class="star-rt"><span><img src="@/assets/icons/star.svg" alt="" /></span>8.5</p> -->
              <p class="star-rt" v-if="seeker_avg_rating != 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>{{seeker_avg_rating}}</p>
              <p class="star-rt" v-if="seeker_avg_rating == 0"><span><img src="@/assets/icons/star.svg" alt="" /></span>5</p>
          </div>
      </div>   
    </div>    

    <div class="form-wrapper resig-letter-wrapper">
        <div class="pb-100">
            <div class="back-wh border-top">
             <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                     <h3 class="sub-heading mb-0">별점 평가</h3>
                    </div>
                        <!-- <div class="rating-wrap">
                        <img src="@/assets/images/rating.jpg" alt="" />
                        </div> -->
                    <div class="rating-wrap rating-wrap-small">
                    <div class="item-row">
                        <p>업무 역량</p>
                        <div class="star-cont">
                        <div class="rate-img">
                            <StarRating
                            @click="setRating(work_competency)"
                            v-model:rating="work_competency"
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
                            ></StarRating>
                        </div>
                        <span
                            ><em>{{ Number(work_competency) * 2 }}</em
                            >점</span
                        >
                        </div>
                    </div>
                    <div class="item-row">
                        <p>책임감</p>
                        <div class="star-cont">
                        <div class="rate-img">
                            <StarRating
                            @click="setRating(responsibility)"
                            v-model:rating="responsibility"
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
                            ></StarRating>
                        </div>
                        <span
                            ><em>{{ Number(responsibility) * 2 }}</em
                            >점</span
                        >
                        </div>
                    </div>
                    <div class="item-row">
                        <p>팀워크</p>
                        <div class="star-cont">
                        <div class="rate-img">
                            <StarRating
                            @click="setRating(teamwork)"
                            v-model:rating="teamwork"
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
                            ></StarRating>
                        </div>
                        <span
                            ><em> {{ Number(teamwork) * 2 }}</em
                            >점</span
                        >
                        </div>
                    </div>
                    <div class="item-row">
                        <p>친절/배려</p>
                        <div class="star-cont">
                        <div class="rate-img">
                            <StarRating
                            @click="setRating(kindness_caring)"
                            v-model:rating="kindness_caring"
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
                            ></StarRating>
                        </div>
                        <span
                            ><em>{{ Number(kindness_caring) * 2 }}</em
                            >점</span
                        >
                        </div>
                    </div>
                    <div class="item-row">
                        <p>성실/도덕성</p>
                        <div class="star-cont">
                        <div class="rate-img">
                            <StarRating
                            @click="setRating(sincerity_morality)"
                            v-model:rating="sincerity_morality"
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
                            ></StarRating>
                        </div>
                        <span
                            ><em>{{ Number(sincerity_morality) * 2 }}</em
                            >점</span
                        >
                        </div>
                    </div>
                    <div class="item-row total-rating">
                        <div class="star-cont">
                        <span
                            >총<em>{{ averageRating }}</em
                            >점</span
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
                <textarea class="form-control" v-model.trim="comment" placeholder="기업의 장점이나 좋은 특징을 말씀해 주세요">
    </textarea
                >
                </div>
                <div class="form-group mb-0 fixed-btn-otr">
                <button class="btn btn-primary lg"  @click="saveRating">
                    작성 완료하기
                </button>
                </div>
            </div>
            </div>
            </div>       
        </div>
    </div>
   

    <!-- <saveStarRatingModal
    :isModal="isShowModal"
    @closeModal="isShowModal = false"
    @deleteConfirm="saveRating()"
  /> -->
  <cancelStarRatingModal
    :isModal="cancelShowModal"
    @closeModal="cancelShowModal = false"
    @backConfirm="confirmRedirection"
  />
</div>
  </template>
  
  <script>
  import InnerHeader from "@/components/innerHeader.vue";
  import StarRating from "vue-star-rating";
  import {StarManagementService} from "../../../service/API/StarManagement";
  //import saveStarRatingModal from "@/components/Modals/saveStarRatingModal.vue";
  import cancelStarRatingModal from "@/components/Modals/cancelStarRatingModal.vue";
  export default {
    name: "RecruiterStarManagementEvaluation",
    components: {
      InnerHeader, 
      StarRating,
      //saveStarRatingModal,
      cancelStarRatingModal,
    },
    data() {
    return {
      work_competency: 2.5,
      responsibility: 2.5,
      teamwork: 2.5,
      kindness_caring: 2.5,
      sincerity_morality: 2.5,
      comment: "",
      avgRating:'5',
      isShowModal:false,
      cancelShowModal: false,
      name: '',
      profile_img: '',
      seeker_avg_rating: null,
    };
  },
  computed: {
    averageRating() {
      return this.avgRating = ((this.work_competency*2) + (this.responsibility*2) + (this.teamwork*2) + (this.kindness_caring*2) + (this.sincerity_morality*2)) / 5
    }
  },
  methods: {
    setRating(r) {
      console.log(r);
    },
    onsubmitModal(){
      this.isShowModal= true;
    },
    confirmRedirection () {
      if (Object.keys(this.$route.query).length !== 0) {
            this.$router.push({name: "RecruiterStarManagement"})
          } 
    },
    saveRating() {
      this.isShowModal= false;
      let data = {
        id: this.$route.query.id,
        work_competency: this.work_competency.toString(),
        responsibility: this.responsibility.toString(),
        teamwork: this.teamwork.toString(),
        kindness_caring: this.kindness_caring.toString(),
        sincerity_morality: this.sincerity_morality.toString(),
        average_rating: this.averageRating.toString(),
        one_line_evaluation: this.comment,
      };
      StarManagementService
        .setSeekerRating(data)
        .then(() => {
          if (Object.keys(this.$route.query).length !== 0) {
            this.$router.push({name: "RecruiterStarManagement"})
          } 
        })
        .catch((err) => console.log(err));
    }
    
  },
  mounted() {
    if (Object.keys(this.$route.query).length !== 0) {
    StarManagementService
      .employeeRatingDetails(this.$route.query.id)
      .then((res) => {
        //console.log(res);
        this.name = res.data.name
        this.profile_img = res.data.profile_image
        this.seeker_avg_rating = res.data.seeker_avg_rating
      })
      .catch((err) => console.log(err));
    }
  },
  };
  </script>
  