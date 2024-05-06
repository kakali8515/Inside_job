<template>
    <div class="common-sec back-wh">
      <div class="top-hdr top-hdr-br mb-16">
        <div class="container">
          <InnerHeader headerTitle="지원자 확인" />
        </div>
      </div>
      <div class="container">
        <div class="employment-tab applicant-tab">
          <div class="tab-outr">
            <TabWrapper @getResponseTitle="getTitle($event)">
              <Tabs title="미열람" >   
                <div class="outerside">
                    <div class="heading">
                        모든 지원자 리스트
                     </div>
                     <div class="tab-inner-cont">

                        <!-- Code For No Data -->
                        <div class="no-data-otr bg-border" v-if="recruiterApplicantUnreadData.lists.length === 0">
                        <NoData>
                            <template v-slot:no-data-image>
                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                            </template>
                            <template v-slot:no-data-content>
                                <p><span>지원자가 없습니다.</span></p>
                            </template>
                        </NoData>              
                        </div> 
                        <div v-if="recruiterApplicantUnreadData.lists.length > 0">
                        <div v-for="(i, e) in recruiterApplicantUnreadData.lists" :key="e" class="recruiter-applicant-card history-list app-confirm-list app-confirm-list-bin-gap">
                        <div v-if="i.application_status !== 'canceled'">
                            <div class="top-part">
                                <span class="date">{{store.methods.dateFormat(i.create_date, "YYYY년 M월 D일")}}</span>
                                <span class="btn btn-default red">미열람</span>
                            </div>
                            <ApplicantCard>
                                <template v-slot:applicant-lft-content>
                                    <span>
                                        <img v-if="i.profile_image != null" :src="i.profile_image" alt="" />
                                        <img v-else src="@/assets/images/mypage-profile-img.png" alt="" />
                                    </span>
                                    <h5>{{i.name}}</h5>
                                    <h5 v-if="i.gender == 'm'">(남 {{i.age}}세)</h5>
                                    <h5 v-if="i.gender == 'f'">(Female {{i.age}}세)</h5>
                                    
                                </template>
                                <template v-slot:applicant-rht-content>
                                    <h4>{{i.resume_title}}</h4>
                                        <ul>
                                            <li class="scope-cont">
                                                <span class="sc-title">별점</span>
                                                <div class="desc rating">
                                                        <StarRating
                                                        v-model:rating="i.seeker_avg_rating"
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
                                                        star-size="16"
                                                        :show-rating="false"
                                                        read-only="true"
                                                        ></StarRating>
                                                    
                                                    <span>{{i.seeker_avg_rating * 2}}</span>
                                                </div>
                                            </li>
                                            <li class="support-cont">
                                                <span class="sc-title">지원부분</span>
                                                <div class="desc">
                                                    {{i.announcement_title}}
                                                </div>                                                
                                            </li>
                                        </ul>
                                </template>
                               <template v-slot:applicant-btn>
                                    <div class="doc-btn-group">
                                    <a href="javascript:void(0);" v-if="i.is_bookmark == 0" @click="saveToWatchList(i, 'unread')" class="doc-btn-innr">관심 목록 추가 <span><img src="@/assets/icons/watchlist-icon.svg" alt="" /></span></a>
                                    <a href="javascript:void(0);" v-if="i.is_bookmark == 1" @click="unsaveToWatchList(i, 'unread')" class="doc-btn-innr">관심 목록 해제 <span><img src="@/assets/icons/watchlist-icon.svg" alt="" /></span></a>
                                    <a href="javascript:void(0);" @click="readApplicationForJob(i)" class="doc-btn-innr">이력서 확인하기   <span><img src="@/assets/icons/resume-grey-icon.svg" alt="" /></span></a>
                                    </div>
                                </template>
                            </ApplicantCard>    
                        </div>

                        <div v-if="i.application_status == 'canceled'" @click="isShowModal = true">
                            <div class="top-part">
                                <span class="date">{{store.methods.dateFormat(i.create_date, "YYYY년 M월 D일")}}</span>
                                <span class="btn btn-default red">미열람</span>
                            </div>
                            <ApplicantCard>
                                <template v-slot:applicant-lft-content>
                                    <span>
                                        <img v-if="i.profile_image != null" :src="i.profile_image" alt="" />
                                        <img v-else src="@/assets/images/mypage-profile-img.png" alt="" />
                                    </span>
                                    <h5>{{i.name.split(' ')[0]}} **</h5>
                                    <h5 v-if="i.gender == 'm'">(남 {{i.age}}세)</h5>
                                    <h5 v-if="i.gender == 'f'">(Female {{i.age}}세)</h5>
                                    
                                </template>
                                <template v-slot:applicant-rht-content>
                                    <h4 class="mb-8">{{i.resume_title}}</h4>
                                    <p class="cancel-text">입사취소 된 지원서류 입니다.</p>
                                        <ul>
                                            <li class="support-cont">
                                                <span class="sc-title">취소 사유</span>
                                                <div class="desc">
                                                    {{i.cancelation_reason}}
                                                </div>                                                
                                            </li>
                                        </ul>
                                </template>
                            </ApplicantCard>    
                        </div>
                        </div>
                        </div>
                        
                <VuePaginate
                    :limit="recruiterApplicantUnreadData.limit"
                    :page="recruiterApplicantUnreadData.page"
                    :totalItems="recruiterApplicantUnreadData.totalItem"
                    v-on:setNumber="setPage($event, 'unread')"
                  />
                    </div>  
                </div>
                         
              </Tabs>
              <Tabs title="열람" > 
                <div class="outerside" >
                    <div class="heading">
                        모든 지원자 리스트
                     </div>
                     <div class="tab-inner-cont">

                        <div class="no-data-otr bg-border" v-if="recruiterApplicantReadData.lists.length === 0">
                        <NoData>
                            <template v-slot:no-data-image>
                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                            </template>
                            <template v-slot:no-data-content>
                                <p><span>지원자가 없습니다.</span></p>
                            </template>
                        </NoData>              
                        </div> 
                        <div v-if="recruiterApplicantReadData.lists.length > 0" class="recruiter-applicant-card-otr">
                        <div v-for="(i, e) in recruiterApplicantReadData.lists" :key="e" class="recruiter-applicant-card history-list">
                            <div class="top-part">
                                <span class="date">{{store.methods.dateFormat(i.create_date, "YYYY년 M월 D일")}}</span>
                                <span class="btn btn-default ">열람</span>
                            </div>
                            <ApplicantCard>
                                <template v-slot:applicant-lft-content>
                                    <span>
                                        <img v-if="i.profile_image != null" :src="i.profile_image" alt="" />
                                        <img v-else src="@/assets/images/mypage-profile-img.png" alt="" />
                                    </span>
                                    <h5>{{i.name}}</h5>
                                    <h5 v-if="i.gender == 'm'">(남 {{i.age}}세)</h5>
                                    <h5 v-if="i.gender == 'f'">(Female {{i.age}}세)</h5>
                                </template>
                                <template v-slot:applicant-rht-content>
                                    <h4>{{i.resume_title}}</h4>
                                        <ul>
                                            <li class="scope-cont">
                                                <span class="sc-title">별점</span>
                                                <div class="desc rating">
                                                    <StarRating
                                                        v-model:rating="i.seeker_avg_rating"
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
                                                        <span>{{i.seeker_avg_rating * 2}}</span>
                                                </div>
                                            </li>
                                            <li class="support-cont">
                                                <span class="sc-title">지원부분</span>
                                                <div class="desc">
                                                    {{i.announcement_title}}
                                                </div>                                                
                                            </li>
                                        </ul>
                                </template>
                               <template v-slot:applicant-btn>
                                    <div class="doc-btn-group">
                                    <a href="javascript:void(0);" v-if="i.is_bookmark == 0" @click="saveToWatchList(i, 'read')" class="doc-btn-innr">관심 목록 추가 <span><img src="@/assets/icons/watchlist-icon.svg" alt="" /></span></a>
                                    <a href="javascript:void(0);" v-if="i.is_bookmark == 1" @click="unsaveToWatchList(i, 'read')" class="doc-btn-innr">관심 목록 해제 <span><img src="@/assets/icons/watchlist-icon.svg" alt="" /></span></a>
                                    <a href="javascript:void(0);"  @click="readApplicationForJob(i)" class="doc-btn-innr">이력서 확인하기   <span><img src="@/assets/icons/resume-grey-icon.svg" alt="" /></span></a>
                                    </div>
                                </template>
                            </ApplicantCard>                            
                        </div>  
                    </div>

                <VuePaginate
                    :limit="recruiterApplicantReadData.limit"
                    :page="recruiterApplicantReadData.page"
                    :totalItems="recruiterApplicantReadData.totalItem"
                    v-on:setNumber="setPage($event, 'read')"
                  />

                    </div>  
                </div>              
              </Tabs>
              <Tabs title="관심"> 
                <div class="outerside">
                    <div class="heading">
                        모든 지원자 리스트
                     </div>
                     <div class="tab-inner-cont">
                        <div class="no-data-otr bg-border" v-if="recruiterApplicantBookmarkedData.lists.length === 0">
                        <NoData>
                            <template v-slot:no-data-image>
                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                            </template>
                            <template v-slot:no-data-content>
                                <p><span>지원자가 없습니다.</span></p>
                            </template>
                        </NoData>              
                        </div> 
                        <div v-if="recruiterApplicantBookmarkedData.lists.length > 0">
                         <div v-for="(i, e) in recruiterApplicantBookmarkedData.lists" :key="e" class="recruiter-applicant-card history-list">
                            <div class="top-part">
                                <span class="date">{{store.methods.dateFormat(i.create_date, "YYYY년 M월 D일")}}</span>
                                <span class="btn btn-default red" v-if="i.status == 'unread'">미열람</span>
                                <span class="btn btn-default" v-if="i.status == 'read'">열람</span>
                            </div>
                            <ApplicantCard>
                                <template v-slot:applicant-lft-content>
                                    <span>
                                        <img :src="i.profile_image" alt="" />
                                    </span>
                                    <h5>{{i.name}}</h5>
                                    <h5 v-if="i.gender == 'm'">(남 {{i.age}}세)</h5>
                                    <h5 v-if="i.gender == 'f'">(Female {{i.age}}세)</h5>
                                </template>
                                <template v-slot:applicant-rht-content>
                                    <h4>{{i.resume_title}}</h4>
                                        <ul>
                                            <li class="scope-cont">
                                                <span class="sc-title">별점</span>
                                                <div class="desc rating">
                                                    <StarRating
                                                        v-model:rating="i.seeker_avg_rating"
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
                                                        <span>{{i.seeker_avg_rating * 2}}</span>
                                                </div>
                                            </li>
                                            <li class="support-cont">
                                                <span class="sc-title">지원부분</span>
                                                <div class="desc">
                                                    {{i.announcement_title}}
                                                </div>                                                  
                                            </li>
                                        </ul>
                                </template>
                               <template v-slot:applicant-btn>
                                    <div class="doc-btn-group">
                                    <a href="javascript:void(0);" @click="unsaveToWatchList(i, 'watch')" class="doc-btn-innr">관심 목록 해제 <span><img src="@/assets/icons/watchlist-icon.svg" alt="" /></span></a>
                                    <a href="javascript:void(0);"  @click="readApplicationForJob(i)" class="doc-btn-innr">이력서 확인하기   <span><img src="@/assets/icons/resume-grey-icon.svg" alt="" /></span></a>
                                    </div>
                                </template>
                            </ApplicantCard>                            
                        </div>  
                        </div>  
                      
                <VuePaginate
                    :limit="recruiterApplicantBookmarkedData.limit"
                    :page="recruiterApplicantBookmarkedData.page"
                    :totalItems="recruiterApplicantBookmarkedData.totalItem"
                    v-on:setNumber="setPage($event, 'bookmarked')"
                  />
                    </div>  
                </div>              
              </Tabs>
            </TabWrapper>
          </div>
        </div>
      
      </div>
      <CancelApplicantModal
      :isModal="isShowModal"
      @conifrmModel="isShowModal = false"
    />
    <div
      class="scrapped-icon wish-icon scrapped-icon-transform act"
      v-if="popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
        추가 되었습니다.
      </p>
    </div>
    </div>
</template>

<script>

import Pagination from "@/components/Pagination.vue";
import CancelApplicantModal from "@/components/Modals/CancelApplicantModal.vue";
import { reactive, ref } from "@vue/reactivity";
import { inject } from "vue";
import { onBeforeMount } from "@vue/runtime-core";
import StarRating from "vue-star-rating";
import { CandidateConfirmationService } from '../../../service/API/CandidateConfirmation';
import { useRouter } from 'vue-router';
import InnerHeader from "../../../components/innerHeader.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import ApplicantCard from "@/components/ApplicantCard.vue";
import NoData  from '@/components/NoData.vue';
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "ApplicantConfirmationList",
  components: {
  Pagination,
  InnerHeader,
  StarRating,
  Tabs,
  TabWrapper,
  ApplicantCard,
  NoData,
  CancelApplicantModal,
  VuePaginate,
  },
  setup() {
    const store = inject("commonStore");
    const router = useRouter();
    const isShowModal = ref(false);
    const popupMessageShow = ref(false);
  const recruiterApplicantUnreadData = reactive({
    limit: 10,
    page: 1,
    totalItem: null,
    lists: [],
  });
  const recruiterApplicantReadData = reactive({
    limit: 10,
    page: 1,
    totalItem: null,
    lists: [],
  });
  const recruiterApplicantBookmarkedData = reactive({
    limit: 10,
    page: 1,
    totalItem: null,
    lists: [],
  });
  
  const setPage = (event, fromList) => {
    if(fromList == 'read') {
        recruiterApplicantReadData.page = event;
        fetchRecruiterApplicantReadList();
    } else if (fromList == 'unread') {
        recruiterApplicantUnreadData.page = event;
        fetchRecruiterApplicantUnreadList();
    } else {
        recruiterApplicantBookmarkedData.page = event;
        fetchRecruiterApplicantBookmarkedList();
    }
    window.scrollTo(0, 0);
  };

  onBeforeMount(async () => {
    await fetchRecruiterApplicantUnreadList();
    await fetchRecruiterApplicantReadList();
    await fetchRecruiterApplicantBookmarkedList();
  });

  const fetchRecruiterApplicantUnreadList = async () => {
    let res = await CandidateConfirmationService.recruiterApplicantUnreadList(
        recruiterApplicantUnreadData.page,
        recruiterApplicantUnreadData.limit
    );
    console.log(res.data)
    recruiterApplicantUnreadData.totalItem = res.data.total_records;
    recruiterApplicantUnreadData.lists = res.data.posts;
    recruiterApplicantUnreadData.lists.map(function(value, key){
        if(recruiterApplicantUnreadData.lists[key].seeker_avg_rating !== 0) {
            recruiterApplicantUnreadData.lists[key].seeker_avg_rating /= 2;
        } else {
            recruiterApplicantUnreadData.lists[key].seeker_avg_rating = 2.5;
        }
        
    }); 
  
  };

  const fetchRecruiterApplicantReadList = async () => {
    let res = await CandidateConfirmationService.recruiterApplicantReadList(
        recruiterApplicantReadData.page,
        recruiterApplicantReadData.limit
    );
    console.log(res.data)
    recruiterApplicantReadData.totalItem = res.data.total_records;
    recruiterApplicantReadData.lists = res.data.posts;
    recruiterApplicantReadData.lists.map(function(value, key){
        //recruiterApplicantReadData.lists[key].seeker_avg_rating /= 2;
        if(recruiterApplicantReadData.lists[key].seeker_avg_rating !== 0) {
            recruiterApplicantReadData.lists[key].seeker_avg_rating /= 2;
        } else {
            recruiterApplicantReadData.lists[key].seeker_avg_rating = 2.5;
        }
    }); 
  
  };

  const fetchRecruiterApplicantBookmarkedList = async () => {
    let res = await CandidateConfirmationService.recruiterApplicantBookmarkedList(
        recruiterApplicantBookmarkedData.page,
        recruiterApplicantBookmarkedData.limit
    );
    console.log(res.data)
    recruiterApplicantBookmarkedData.totalItem = res.data.total_records;
    recruiterApplicantBookmarkedData.lists = res.data.posts;
    recruiterApplicantBookmarkedData.lists.map(function(value, key){
        //recruiterApplicantBookmarkedData.lists[key].seeker_avg_rating /= 2;
        if(recruiterApplicantBookmarkedData.lists[key].seeker_avg_rating !== 0) {
            recruiterApplicantBookmarkedData.lists[key].seeker_avg_rating /= 2;
        } else {
            recruiterApplicantBookmarkedData.lists[key].seeker_avg_rating = 2.5;
        }
    }); 
  
  };

  const getTitle = async (data) => {
      if(data.includes('미열람')) {
        setPage(1, 'unread')
      } else if(data.includes('열람')) {
        setPage(1, 'read')
      } else {
        setPage(1, 'bookmarked')
      }
    };

  const saveToWatchList = async (data, type) => {
      try{ 
          let res = await CandidateConfirmationService.addTowatchList(data.id);
          if(type == 'unread') {
            const objIndex = recruiterApplicantUnreadData.lists.findIndex((obj => obj.id === data.id))
            recruiterApplicantUnreadData.lists[objIndex].is_bookmark = 1
            recruiterApplicantBookmarkedData.lists.unshift(data)
          } else {
            const objIndex = recruiterApplicantReadData.lists.findIndex((obj => obj.id === data.id))
            recruiterApplicantReadData.lists[objIndex].is_bookmark = 1
            recruiterApplicantBookmarkedData.lists.unshift(data)
          } 
          popupMessageShow.value = true;
          setTimeout(() => {
          popupMessageShow.value = false;
        }, 4000);
      } catch (e) {
          console.log(e)
      }
  };

  const unsaveToWatchList = async (data, type) => {
      try{ 
          let res = await CandidateConfirmationService.removeFromwatchList(data.id);
          if(type == 'unread') {
            const objIndex = recruiterApplicantUnreadData.lists.findIndex((obj => obj.id === data.id))
            recruiterApplicantUnreadData.lists[objIndex].is_bookmark = 0
            recruiterApplicantBookmarkedData.lists = recruiterApplicantBookmarkedData.lists.filter((item) => item.id !== data.id);
          } else if (type == 'read') {
            const objIndex = recruiterApplicantReadData.lists.findIndex((obj => obj.id === data.id))
            recruiterApplicantReadData.lists[objIndex].is_bookmark = 0
            recruiterApplicantBookmarkedData.lists = recruiterApplicantBookmarkedData.lists.filter((item) => item.id !== data.id);
          } else {
            if(data.status === 'read') {
                const objIndex = recruiterApplicantReadData.lists.findIndex((obj => obj.id === data.id))
                recruiterApplicantReadData.lists[objIndex].is_bookmark = 0
            } else {
                const objIndex = recruiterApplicantUnreadData.lists.findIndex((obj => obj.id === data.id))
                recruiterApplicantUnreadData.lists[objIndex].is_bookmark = 0
            }
            recruiterApplicantBookmarkedData.lists = recruiterApplicantBookmarkedData.lists.filter((item) => item.id !== data.id);
          }
      } catch (e) {
          console.log(e)
      }
  };

  

  const readApplicationForJob = async (data) => {
      try{ 
          let res = await CandidateConfirmationService.readApplication(data.id);
          router.push({name: 'ApplicantInformation', params: {id: data.resume_id, seeker_id: data.seeker_id}, query: {fromPage: 'candidateConfirmation'}})
          //recruiterApplicantUnreadData.lists = recruiterApplicantUnreadData.lists.filter((item) => item.id !== data.id);
      } catch (e) {
          console.log(e)
      }
  };


  return {
    store,
    recruiterApplicantUnreadData,
    recruiterApplicantReadData,
    recruiterApplicantBookmarkedData,
    isShowModal,
    popupMessageShow,
    unsaveToWatchList,
    saveToWatchList,
    readApplicationForJob,
    setPage,
    fetchRecruiterApplicantUnreadList,
    fetchRecruiterApplicantReadList,
    fetchRecruiterApplicantBookmarkedList,
    getTitle


    }
}
}

</script>

<style scoped>
.scrapped-icon-transform {
  transform: none;
}

.hand-pointer {
  cursor: pointer !important;
}
</style>
  