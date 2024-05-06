<template>
  <div class="back-wh common-sec pb-32">
    <div class="top-hdr no-border pb-0">
      <div class="container">
        <InnerHeader headerTitle="공지사항" />
      </div>
    </div>

    <div class="container">
      <div class="notice-warpper customer-notice pb-16">
        <div class="heading">공지사항 리스트</div>
        <!-- Code For No Data -->
        <NoData v-if="noticeData.list.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>등록된 공지사항이 없습니다.</span></p>
          </template>
        </NoData>

        <!-- Code For Notice List -->
        <div class="list-cont" v-else>
          <ul class="list-item">
            <li v-for="(item, i) in noticeData.list" :key="i"  @click="
                  $router.push(`/recruiter/customer-notice-details/${item.id}`)
                ">
              <div class="noti-cont">
                <p>{{ item.title }}</p>
                <span class="small-txt">{{
                  store.methods.dateFormat(item.create_date, "YYYY년 M월 D일")
                }}</span>
              </div>
              <a
                class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
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
</template>
  
  <script>
import InnerHeader from "@/components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import { onMounted, reactive, inject } from "vue";
import { notice } from "@/service/API/notice.js";
import Pagination from "@/components/Pagination.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "RecruiterCustomerNotice",
  components: {
    InnerHeader,
    NoData,
    VuePaginate,
  },

  setup() {
    const store = inject("commonStore");
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
      let res = await notice.list({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        noticeData.list = res.data.posts;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = res.data.total_records
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      list();
    }

    return {
      noticeData,
      list,
      store,
      pagination,
      setPage,
    };
  },
};
</script>
  