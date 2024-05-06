<template>
    <div>
   <div class="back-wh mb-36">  
         <div class="top-hdr top-hdr-br">
            <div class="container">
                <InnerHeader headerTitle="포지션 제안" />
                <!-- <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" @click="$router.go(-1)" /></a>포지션 제안
                </h4> -->
            </div>
        </div> 
        <div class="pb-16">
            <div class="container">
                <div class="cm-back sl" @click="openPositionSetup">
                    <div class="position-otr" >
                        <h3 v-if="positionOffer == 'desired' || positionOffer == 'all'" class="sub-heading">포지션 제안 <span class="btn btn-default red">ON</span>
                            <span class="pos-right-arrow"><img src="@/assets/icons/right-arrow-blk.svg" alt="" /></span>
                        </h3>
                        <h3 v-else class="sub-heading">포지션 제안 <span class="btn btn-default">OFF</span>
                            <span class="pos-right-arrow"><img src="@/assets/icons/right-arrow-blk.svg" alt="" /></span>
                        </h3>
                        <p>포지션 제안을 설정하여 맞춤 커리어 제안을 받아보세요!</p>
                        
                    </div>
                </div>   
            </div>
        </div>
        <div class="border-top mb-80">
            <div class="cm-top-space pb-32">
                <div class="container">   
                    <div class="sub-otr mb-0 b-color">
                        <h3 class="sub-heading mb-0">받은 제안</h3>
                    </div> 

                    <!-- Code For No Data -->
                    <div class="no-data-otr bg-border" v-if="positionOfferList.lists.length === 0 || positionOffer == 'off'">
                    <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>제안받은 포지션이 없습니다.</span></p>
                            <p>제안을 받기 위해 꾸준이 이력서를 업데이트 해주세요!</p>
                        </template>
                    </NoData>  
                    </div>
                    <div v-if="positionOfferList.lists.length > 0 && positionOffer !== 'off'">
                    <div class="posting-list pos-new" v-for="(i, e) in positionOfferList.lists" :key="e" >
                        <CardWrapper  @click="$router.push(`/job-posting-details/${i.job_id}`)">
                            <template v-slot:content>
                                <h5>{{i.company_name}}</h5>
                                <h3>{{i.announcement_title}}</h3>
                            </template>
                            <template v-slot:btn>
                                <h6><b>{{i.contact_name}}</b> <span v-if="i.pay_type == 'hourly_wage'">시급</span> <span v-if="i.pay_type == 'daily_wage'">일급</span> <span v-if="i.pay_type == 'salary'">월급</span> <p class="hr-wage-no"><em>{{(i.salary * 1).toLocaleString('en-US')}}</em>원</p></h6>
                                <span @click.stop="openResume('apply', i.job_id)" class="btn btn-primary-gradient btn-job-posting apply-btn">즉시지원</span>
                            </template>
                            <template v-slot:bookmark>
                                <span v-if="i.is_scraps !== 1" @click.stop="saveToBookmark(i.job_id)" class="bookmark"><img src="@/assets/icons/bookmark-icon.svg" alt="" /></span>
                                <span v-if="i.is_scraps == 1" class="bookmark" @click.stop="removeFromBookmark(i.scrap_id, i.job_id)"><img src="@/assets/icons/bookmark-red-icon.svg" alt="" /></span>
                            </template>
                        </CardWrapper>
                    </div>
                <VuePaginate
                    :limit="positionOfferList.limit"
                    :page="positionOfferList.page"
                    :totalItems="positionOfferList.totalItem"
                    v-on:setNumber="setPage($event)"
                  /> 
                </div>       
                </div>  
            </div>
        </div>
    </div>
    <div class="btm-button-group fixed-btn-otr">
        <a @click="openResume('updateResume')" class="btn btn-primary lg" >이력서 업데이트하기</a>
    </div>
    <PositionSuggestionSetup v-if="commonStore.state.showPositionSuggestionSetup" @confirm="savePositionOfferSettings" />
    <ApplyChooseResume
      :id="jobId"
      v-if="commonStore.state.isApplyChooseResume"
    />
    <div class="scrapped-icon scrapped-icon-transform act" v-if="commonStore.state.popupMessageShow">
        <p><span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span> 스크랩했습니다.</p>
      </div>
</div>
</template>
  
  <script>
  import { inject} from "vue";
  import PositionSuggestionSetup from "./PositionSuggestionSetup.vue";
  import NoData  from '@/components/NoData.vue';
  import CardWrapper from '@/components/CardWrapper.vue';
  import Pagination from "@/components/Pagination.vue";
  import InnerHeader from "@/components/innerHeader.vue";
  import { reactive, ref } from "@vue/reactivity";
  import { onBeforeMount, watch} from "@vue/runtime-core";
  import { HomeService } from '../../service/API/Home';
  import { PositionOfferService } from '../../service/API/PositionOffer';
  import { useRouter } from 'vue-router';
  import VuePaginate from "@/components/Utils/VuePaginate.vue";
  import ApplyChooseResume from "@/views/JobSeekers/ApplyChooseResume.vue";
  
  export default {
    name: "PositionOffer",
    components: {
    NoData,
    CardWrapper,
    Pagination,
    PositionSuggestionSetup,
    InnerHeader,
    VuePaginate,
    ApplyChooseResume,
    },
    setup() {
    const commonStore = inject("commonStore");
    const popupMessageShow = ref(false)
    const router = useRouter();
    const positionOffer = ref('off')
    const savedBookmarkedJobId = ref([])
    const jobId = ref(null)
    const positionOfferList = reactive({
      limit: 10,
      page: 1,
      totalItem: null,
      lists: [],
    });

    onBeforeMount(async () => {
      await offerList();
      await offerDetails();
    });

    watch(() => commonStore.state.showPositionSuggestionSetup, async (first, second) => {
      if (commonStore.state.showPositionSuggestionSetup === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
    });

    watch(() => commonStore.state.isApplyChooseResume, async (first, second) => {
      if (commonStore.state.isApplyChooseResume === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
    });

    const offerList = async () => {
        window.scrollTo(0, 0);
      let res = await PositionOfferService.positionOfferList(
        positionOfferList.page,
        positionOfferList.limit
      );
      console.log(res.data)
      positionOfferList.totalItem = res.data.total_records;
      positionOfferList.lists = res.data.data;
    };

    // const scrappedSuccessful = () => {
    //   popupMessageShow.value = true
    //   setTimeout(() => { popupMessageShow.value = false }, 4000)
    // }

    const offerDetails = async () => {
      let res = await PositionOfferService.positionOfferDetails();
      positionOffer.value = res.data.position_offer
    };

    const setPage = (event) => {
        positionOfferList.page = event;
        offerList();
    };

    const openPositionSetup = () => {
      commonStore.state.showPositionSuggestionSetup = true
    };

    

    const openResume = (buttonType, id=null) => {
      console.log(id)
      if(buttonType === 'apply' && id !== null) {
        jobId.value = id
        commonStore.state.isApplyChooseResume = true
      } else {
        router.push({ name: "Resume" });
      }
    };

    const saveToBookmark = async (id) => {
    try {
     let data = {
        id: id
     }
      let res = await HomeService.addScrap(
        data
      );
      const objIndex = positionOfferList.lists.findIndex((obj => obj.job_id === id))
      positionOfferList.lists[objIndex].is_scraps = 1
      positionOfferList.lists[objIndex].scrap_id = res.data.scrap_id
      commonStore.methods.scrappedSuccessful();
    } catch(e) {
        console.log(e)
    }
    };

    const removeFromBookmark = async (scrapId, id) => {
    try {
     let data = {
        id: [scrapId]
     }
      let res = await HomeService.deleteScrap(
        data
      );
      const objIndex = positionOfferList.lists.findIndex((obj => obj.job_id === id))
      positionOfferList.lists[objIndex].is_scraps = 0
      positionOfferList.lists[objIndex].scrap_id = 0
      //sortOfferList();
    } catch(e) {
        console.log(e)
    }
    };
    // const sortOfferList = () => {
    //     positionOfferList.lists = positionOfferList.lists.sort((a, b) => Number(b.is_scraps) - Number(a.is_scraps));
    // };

    const savePositionOfferSettings = async (checkedPositionOffer) => {
    try {
     let data = {
        position_offer: checkedPositionOffer
     }
      let res = await PositionOfferService.positionOfferSettings(
        data
      );
      
      positionOffer.value = checkedPositionOffer
      commonStore.state.showPositionSuggestionSetup = false;
      offerList();
    } catch (e) {
        console.log(e)
    }
    };
   
    return {
        positionOfferList,
        positionOffer,
        savedBookmarkedJobId,
        popupMessageShow,
        commonStore,
        jobId,
        setPage,
        openPositionSetup,
        openResume,
        saveToBookmark,
        removeFromBookmark,
        savePositionOfferSettings
    };
  },
  };
  </script>
  <style scoped>
  .scrapped-icon-transform {
    transform: none
  }
 
  </style>
  