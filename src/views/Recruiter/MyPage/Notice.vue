<template>
  <div class="common-sec back-wh pb-32">
    <div class="top-hdr">
        <div class="container">
            <InnerHeader headerTitle="공지사항" />
        </div>
    </div>
    <div class="container">
      <div class="notice-warpper customer-notice pb-16">
        <div class="heading">공지사항 리스트</div>
        <!-- Code For No Data -->
          <!-- <NoData>
            <template v-slot:no-data-image>
                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
            </template>
            <template v-slot:no-data-content>
              <p>등록된 공지사항이 없습니다.</p>
            </template>
          </NoData> -->

        <!-- Code For Notice List -->
        <div class="list-cont">
          <ul class="list-item">
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
            <li>
              <div class="noti-cont">
                <p>공지사항 타이틀 입니다.</p>
                <span class="small-txt">2022.03.29</span>
              </div>
              <a href="#" class="more"
                ><img src="@/assets/icons/notification-rht-arrow.svg" alt=""
              /></a>
            </li>
          </ul>
          <div class="pagination-area mt-36">
                <a href="#" class="first-page disable">
                    <img src="@/assets/icons/pagi-dobble-arrow.svg">                           
                </a>
                <a href="#" class="next disable"><img src="@/assets/icons/pagi-arrow.svg"></a>
                <ul>
                    <li class="active">1</li>            
                </ul>
                <a href="#" class="prev disable"><img src="@/assets/icons/pagi-arrow.svg"></a>
                <a href="#" class="last-page disable">                           
                    <img src="@/assets/icons/pagi-dobble-arrow.svg">
                </a>    
            </div>         
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import InnerHeader from '@/components/innerHeader.vue'
import NoData from "@/components/NoData.vue";

export default {
  name: "RecruiterNotice",
  components: { InnerHeader, NoData },
};
</script>
  
  