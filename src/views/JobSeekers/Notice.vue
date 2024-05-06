<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br mb-12">
      <div class="container">
        <InnerHeader headerTitle="알림" />
      </div>
    </div>
    <div class="container">
      <div class="notice-warpper pt-0">
        <div class="heading">알림 내역</div>
        <!-- Code For No Data -->
        <div class="no-data-otr" v-if="noticeData.list.length === 0">
          <NoData>
            <template v-slot:no-data-content>
              <p>알림 내역이 없습니다</p>
            </template>
          </NoData>
        </div>

        <!-- Code For Notice List -->
        <div class="list-cont" v-else>
          <ul class="list-item">
            <!-- <a class="more" > -->
              <li v-for="(item, i) in noticeData.list" :key="i" @click="redirection(item.type, item.id,item.job_id, item.parent_id )">
                <div class="noti-icon noti-icon-40">
                  <img
                    src="@/assets/icons/notification-white-icon.svg"
                    alt=""
                  />
                </div>
                <div class="noti-cont">
                  <p class="title">{{ item.title }}</p>
                  <p>{{ item.text }}</p>
                  <span class="small-txt">
                    <!-- {{ calculateDiffrence(item.created_at) }}  -->
                    {{item.formatted_date}}</span
                  >
                </div>
                <!-- <a class="more" @click="redirection(item.type,item.id)" 
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a> -->
              </li>
            <!-- </a> -->
          </ul>
          <!-- <Pagination
            :totalRecords="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          /> -->
          <VuePaginate
            :limit="pagination.perPage"
            :page="pagination.pageNo"
            :totalItems="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          />
        </div>
      </div>
    </div>
  </div>
  <StepBackWarningModal :isModal="backButtonclicked" @confirm="backButtonclicked = false" fromPage="notification" />
</template>
  
<script> 
import NoData from "@/components/NoData.vue";
import StepBackWarningModal from "@/components/Modals/StepBackWarningModal.vue";
import { reactive, ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
import { notification } from "@/service/API/notification.js";
import Pagination from "@/components/Pagination.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import InnerHeader from "../../components/innerHeader.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "Notice",
  components: { NoData, Pagination, InnerHeader, VuePaginate, StepBackWarningModal, },

  setup() {
    const router = useRouter();
    const backButtonclicked = ref(false)
    const employmentStore = inject("employmentStore");
    const noticeData = reactive({
      list: [],
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    onMounted(() => {
      list();
    });

    async function list() {
      let res = await notification.list({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        noticeData.list = res.data.posts;
        pagination.perPage = res.data.pagination_limit;
        pagination.totalRecords = res.data.total_records
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      list();
      window.scrollTo(0, 0);
    }

    function calculateDiffrence(createdDate) {
      let currentDate = new Date();
      let pastDate = new Date(createdDate);
      let diffInMilliSeconds = Math.abs(currentDate - pastDate) / 1000;

      // calculate days
      const days = Math.floor(diffInMilliSeconds / 86400);
      diffInMilliSeconds -= days * 86400;

      // calculate hours
      const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
      diffInMilliSeconds -= hours * 3600;

      // calculate minutes
      const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
      diffInMilliSeconds -= minutes * 60;

      let difference = "";
      if (days > 0) {
        console.log("dwd");
        console.log(createdDate);
        return moment(String(createdDate)).format("YYYY년 M월 D일 LT");
        // difference += days === 1 ? `${days} day, ` : `${days} days, `;
      }

      console.log("hii");
      difference += hours > 0 ? `${hours} 시간, ` : "";
      // hours === 0 || hours === 1 ? `${hours} 시간, ` : `${hours} 시간, `;
      difference += `${minutes} 분`;
      // minutes === 0 || hours === 1 ? `${minutes} 몇 분` : `${minutes} 몇 분`;
      difference += "전";
      return difference;
    }

    async function redirection(type, id, job_id, parent_id) {
      if (type === "LOCATION_BASED_GUIDANCE") {
        router.push(`/around`); //seeker
      } else if (type === "INTERESTED_COMPANY") {
        router.push(`/job-seekers/company-interest`);
      } else if (type === "AI_RECOMMENDATION") {
        router.push(`/job-seekers/ai-recommendation-list`);
      } else if (type === "APPLICATION_RESUME") {
        router.push(`/job-seekers/application-status`);
      } else if (type === "POSITION_OFFERED") {
        router.push(`/job-seekers/position-offer`);
      } else if (type === "RESIGNATION_CONFIRMATION") {
        // router.push(`/job-seekers/resignation-letter/진행완료`);     //complated tab
        router.push({name: 'ResignationLetter', params: {tab: '진행완료'}, query: {fromPage: 'notification'}})
      } else if (type === "RESIGNATION_SUBMIT") {           
        // router.push(`/job-seekers/resignation-letter/`);     //inprogress tab
        router.push({name: 'ResignationLetter', query: {fromPage: 'notification'}})
      }
       else if (type === "EMPLOYMENT_CONTRACT_ACCEPTED") {  //complated tab 
        employmentStore.state.contractListTabState = 1
        router.push({name: 'LaborContract', query: {fromPage: 'notification'} }); //recu
      }
      else if (type === "APPLICATION_SUBMITTED") {
        await checkApplicationRusume(type, id, parent_id, job_id)
      } 
      else if (type === "EMPLOYMENT_CONTRACT_SUBMIT") {
        // router.push(`/job-seekers/labor-contract`); //job  // inprogracess tab
        router.push({name: 'LaborContract', query: {fromPage: 'notification'} })
      } 
      else if (type === "JOB_READY_TO_PUBLISH") {
        router.push(`/recruiter/job-listing`); //rec //joblisting
      }
      else if (type === "JOB_PUBLISH_TO_CLOSED") {
        router.push(`/recruiter/job-listing/마감`); //rec //joblisting closed tab
      } 
      else if (type === "SCRAP_NOTIFICATION") {
        router.push(`/job-seekers/scrap`);
      } 
      else if (type === "UPGLE_NOTIFICATION") {
        router.push(`/recruiter/job-listing`); //rec
      } 
      else if (type === "TALENT_SEARCH_END_NOTIFICATION") {
        router.push(`/recruiter/paid-product-locker`); //rec //paid product locker
      }
      else if (type === "ANNOUNCEMENT_END_NOTIFICATION") {
        router.push(`/recruiter/job-listing`); // rec joblisting publish tab
      }
      else if (type === "REPLY_TO_LABOUR_CONSULTATION") {
        router.push(`/job-seekers/consultation-on-labor`); //both
      }
      else if (type === "NEW_BOARD_NOTICE") {
        if(localStorage.getItem('login_type') === "job_seeker") {
          router.push(`/job-seekers/customer-notice`); // rec
        } else {
          router.push(`/recruiter/customer-notice`); // rec
        }
      }
      else if (type === "AUTOMATIC_JOB_POSTING") {
        router.push(`/job-posting-details/${job_id}`); //both
      }
      else if (type === "POST_JOB_DECLINE") {
        router.push(`/recruiter/automaticjobpostingrequesthistory`); //both
      }
      else if (type === "POSITION_SUGGESTION") {
        router.push(`/job-seekers/position-offer`);
      }

      let res = await notification.readNotification(id);
    }

    const checkApplicationRusume = async (type,id,parent_id,job_id) => {
        try {
        let data = {
          id: id,
          notification_type: type,
          parent_id: parent_id
      }
        let res = await notification.checkApplication(data);
        router.push(`/recruiter/particular-job-post-applicant-confirmation/${job_id}`); //recu (//particulare //unread tab)
      } catch(e) {
        console.log(e.response.data)
        backButtonclicked.value = true
      }
      
    };

    return {
      noticeData,
      list,
      pagination,
      backButtonclicked,
      setPage,
      calculateDiffrence,
      redirection,
      checkApplicationRusume,
    };
  },
};
</script>
  
  