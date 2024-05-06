<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="store.state.applyPaidProductSheet"
  >
  <!-- class="common-sec back-wh pb-32" -->
  <div  :class="`common-sec back-wh pb-32 ${store.state.currentThemeStore}`">
    <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >유료상품 적용하기
          </h4>
        </div>
      </div>
    <div class="container">
      <div class="sub-otr mb-16 b-color">
          <h3 class="sub-heading mb-0">게재중인 공고 리스트</h3>
      </div> 
      <div class="tab-inner-cont apply-paid">
        <div class="job-listing-card" v-for="(i, e) in jobListData.lists" :key="e">
          <div class="form-wrapper">
            <div class="form-group mb-16">
                <label class="radio-input"
                    >
                    <input :disabled="findFeature(i)"
                      type="radio"
                      name="radio"
                      :value="i.id" v-model="selectedJob"
                    />
                    <span class="checkmark"></span>
                  </label>
              </div>
            </div>
            <h4>{{i.announcement_title}} </h4>
            <ul>
              <li>
                <div class="lft-part">노출 기간</div>
                <div class="rht-part" v-if="(i.start_date !== null && i.end_date !== null)">{{store.methods.dateFormat(i.start_date, "YYYY년 M월 D일")}} ~ {{store.methods.dateFormat(i.end_date, "YYYY년 M월 D일")}}</div>
              </li>
              <li>
                <div class="lft-part">지원자관리</div>
                <div class="rht-part">
                  <!-- ad type -->
                  <span class="applicant">
                    <img  src="@/assets/icons/user-small-icon.svg" alt="" /> 지원자
                    <label>{{i.applicant_cnt}}</label>
                  </span>
                  <!-- upgle -->
                  <!-- <span class="applicant">
                    <img  src="@/assets/icons/user-small-icon.svg" alt="" /> 지원자
                    <label>0</label>
                  </span> -->
                  <!-- ad type -->
                  <span class="unread">
                    <img  src="@/assets/icons/user-small-icon.svg" alt="" /> 미열람
                    <label>{{i.unread_cnt}}</label>
                  </span>
                   <!-- upgle -->
                  <!-- <span class="unread">
                    <img  src="@/assets/icons/user-small-icon.svg" alt="" /> 미열람
                    <label>0</label>
                  </span> -->
                </div>                             
              </li>
              <li>
                <div class="lft-part">유료상품</div>
                <div class="rht-part" v-if="i.paid_feature == ''">사용안함</div> 
                <div class="rht-part" v-if="i.paid_feature !== ''">
                  <p v-for="(j, k) in translateFeature(i.paid_feature)" :key="k">
                    <span v-if="j == 'emergency'">긴급 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                    <span v-if="j == 'premium'">프리미엄 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                    <span v-if="j == 'special'">스페셜 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                    <span v-if="j == 'line'">라인 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                    <span v-if="j == 'free'">무료 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                    <span v-if="j == 'upgle'">업글 <span v-if="k < translateFeature(i.paid_feature).length - 1">,</span></span>
                  </p>
                </div> 
                
              </li>
            </ul>
        </div>

        </div> 
                <VuePaginate
                    :limit="jobListData.limit"
                    :page="jobListData.page"
                    :totalItems="jobListData.totalItem"
                    v-on:setNumber="setPage($event)"
                  /> 
    </div>
    
    <div class="apply-paid-btn pb-60 mt-32">
        <div class="fixed-btn-otr">
          <button class="btn btn-primary lg" @click="apply">적용하기</button>
        </div>
    </div>
  </div>
</Sheet>
</template>

<script>
import { inject } from "vue";
import InnerHeader from "@/components/innerHeader.vue"; 
import Pagination from "@/components/Pagination.vue";
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { PaidProductLockerService } from '../../../service/API/PaidProductLocker';
import VuePaginate from "@/components/Utils/VuePaginate.vue";
export default {
  name: "ApplyPaidFeature", 
  props: {feature: Object},
  components: {
      InnerHeader,
      Pagination,
      VuePaginate,
  },
  setup(props, { emit }) {
    const store = inject("commonStore");
    const router = useRouter();
    const jobListData = reactive({
      limit: 10,
      page: 1,
      totalItem: null,
      lists: [],
    });
    const selectedJob = ref(null);
    const setPage = (event) => {
      jobListData.page = event;
      fetchJobList();
    };
    onBeforeMount(async () => {
      await fetchJobList();
    });

    const fetchJobList = async () => {
      window.scrollTo(0, 0);
      let res = await PaidProductLockerService.jobList(
        jobListData.page,
        jobListData.limit
      );
      console.log(res.data)
      jobListData.totalItem = res.data.total_records;
      jobListData.lists = res.data.posts;
      
    };

    const apply = async () => {
      try {
        console.log(selectedJob.value)
        let data = {
          array_sub_type_id: [props.feature.id]
        }
        let res = await PaidProductLockerService.applyFeature(selectedJob.value,data);
        router.push({name: 'JobListing'})
        emit('closeModal')

      } catch (e) {
        //emit('closeModal')
      }
    };

    const findFeature = (i) => {
      if (Object.keys(props.feature).length !== 0) {
      if (props.feature.ad_type_id == 1) {
          return i.paid_feature.search('emergency') >= 0
      } else if (props.feature.ad_type_id == 2) {
          return i.paid_feature.search('premium') >= 0
      } else if (props.feature.ad_type_id == 3) {
          return i.paid_feature.search('special') >= 0
      } else if (props.feature.ad_type_id == 4) {
          return i.paid_feature.search('line') >= 0
      } else if (props.feature.ad_type_id == 6) {
         return i.paid_feature.search('upgle') >= 0 || i.paid_feature.search('free') >= 0
      } else {
        return false
      }
    }
    
    };

    const translateFeature = (data) => {
        const splitedData = data.split(',')
        return splitedData
    };
    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };
    return {
      jobListData,
      selectedJob,
      store,
      setPage,
      popClose,
      apply,
      findFeature,
      translateFeature
    };
  }
};
</script>
