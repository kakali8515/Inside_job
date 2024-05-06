<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br mb-16">
      <div class="container">
        <h4 class="heading">
          <div class="innr-search">
            <a
              class="left-arrow"
              @click="$route.query.fromPage==='notification' ? $router.go(-1) : $router.push({ name: 'home' })"
              ><img src="@/assets/icons/left-arrow.svg" alt="" /></a
            ><span>사직서</span>
          </div>
        </h4>
        <!-- <InnerHeader headerTitle="사직서" /> -->
      </div>
    </div>
    <div class="container">
      <div class="employment-tab">
        <div class="tab-outr">
          <TabWrapper @getResponseTitle="getTitle($event)"
            :defaultSelect="this.$route.params.tab === completeTab ? 1 : 0"
          >
            <Tabs :title="progressTab + '(' + count + ')'">
              <div class="outerside">
                <div class="heading">문서 리스트</div>
                <div class="tab-inner-cont">
                  <!-- Code For No Data -->
                  
                  <NoData v-if="inprogressListEmpty">
                    <template v-slot:no-data-image>
                      <img
                        class="no-job-icon"
                        src="@/assets/icons/no-job-icon.svg"
                        alt=""
                      />
                    </template>
                    <template v-slot:no-data-content>
                      <!-- <p><span>작성한 사직서가 없습니다.</span></p>
                      <p>계약된 기록이 없습니다.</p> -->
                      <p v-if="loginType === 'job_seeker'">근로계약서 체결 후 사직서 작성이 가능합니다.</p>
                      <p v-if="loginType === 'job_recruiter'">구직자가 제출한 사직서가 없습니다.</p>
                    </template>
                  </NoData>
              
                  <!-- processing data -->
                  <div class="labor-contaract-card">
                    <EmploymentContractCard
                      v-for="item in processlist"
                      :key="item.id"
                      @click="opendetails(item, 0)"
                    >
                      <template v-slot:employ-contract-heading>
                        <h5 v-if="loginType === 'job_recruiter'">[{{ item.name }}] 사직서</h5>
                        <h5 v-else>[{{ item.company_name }}] 사직서</h5>
                      </template>
                      <template v-slot:employ-contract-contant>
                        <p>
                          {{
                            commonstore.methods.dateFormat(
                              item.term_start_date,
                              "YYYY년 M월 D일"
                            )
                          }}</p>
                        <!-- <router-link v-if="item.status=='writtable'" :to="{ name: 'WriteResignationLetter', query: { nav: JSON.stringify(item)}}"
                          ><a href="#" class="btn btn-default-red">{{
                            item.status
                          }}</a></router-link>
                        <router-link v-else :to="{}"
                          ><a href="#" class="btn btn-red">{{
                            item.status
                          }}</a></router-link> -->
                        <a
                          v-if="item.status == 'writtable'"
                          @click="setdata($event, item)"
                          class="btn btn-primary"
                          >{{
                            item.status == "writtable" ? "작성 가능" : ""
                          }}</a
                        >
                        <a v-else @click="setSeekerData($event, item)"  class="btn btn-default-red">{{
                          item.status === "pending" ? "진행중" : ""
                        }}</a>
                      </template>
                    </EmploymentContractCard>
                  </div>
                  <VuePaginate
                    :limit="processlistLimit"
                    :page="processlistPage"
                    :totalItems="processlistTotalItem"
                    v-on:setNumber="setPageProcess($event)"
                  />
                </div>
              </div>
            </Tabs>
            <Tabs :title="completeTab + '(' + count2 + ')'" id="my-scope">
              <div class="outerside">
                <div class="heading">문서 리스트</div>
                <div class="tab-inner-cont">
                  <!-- Code For No Data -->
                  
                  <NoData v-if="completedListEmpty">
                    <template v-slot:no-data-image>
                      <img
                        class="no-job-icon"
                        src="@/assets/icons/no-job-icon.svg"
                        alt=""
                      />
                    </template>
                    <template v-slot:no-data-content>
                      <!-- <p><span>받은 사직서가 없습니다.</span></p>
                      <p>계약된 기록이 없습니다.</p> -->
                      <p>완료된 사직서가 없습니다.</p>
                    </template>
                  </NoData>
                
                  <div class="labor-contaract-card">
                    <EmploymentContractCard
                      v-for="item in completedList"
                      :key="item.id"
                      @click="opendetails(item, 1)"
                    >
                      <template v-slot:employ-contract-heading>
                        <h5 v-if="loginType === 'job_recruiter'">[{{ item.name }}] 사직서</h5>
                        <h5 v-else>[{{ item.company_name }}] 사직서</h5>
                      </template>
                      <template v-slot:employ-contract-contant>
                        <!-- {{ FormatDate(item.term_start_date) }} -->
                        <p>
                          {{
                            commonstore.methods.dateFormat(
                              item.term_start_date,
                              "YYYY년 M월 D일"
                            )
                          }}
                        </p>
                        <a href="#" class="btn btn-red">{{
                          item.status === "accepted" ? "처리 완료" : ""
                        }}</a>
                        <!-- <p>최초작성일 {{ FormatDate(item.term_start_date) }}</p>
                        <a href="#" class="btn btn-default-red">{{
                          item.status === "accepted" ? "처리 완료" : ""

                        }}</a> -->
                      </template>
                    </EmploymentContractCard>
                    <!-- <EmploymentContractCard>
                                <template v-slot:employ-contract-heading>
                                    <h5>[기업명] 사직서</h5>
                                </template>
                                <template v-slot:employ-contract-contant>
                                    <p>2022.06.10</p>
                                    <a href="#" class="btn btn-default">처리 완료</a>
                                </template>
                            </EmploymentContractCard> -->
                  </div>
                  <VuePaginate
                    :limit="completedListLimit"
                    :page="completedListPage"
                    :totalItems="completedListTotalItem"
                    v-on:setNumber="setPageComplete($event)"
                  />
                  <!-- <div class="labor-contaract-card">
                            <EmploymentContractCard>
                                <template v-slot:employ-contract-heading>
                                    <h5>[기업명] 사직서</h5>
                                </template>
                                <template v-slot:employ-contract-contant>
                                    <p>2022.06.10</p>
                                    <a href="#" class="btn btn-default">처리 완료</a>
                                </template>
                            </EmploymentContractCard>
                        </div> -->
                </div>
              </div>
            </Tabs>
          </TabWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import EmploymentContractCard from "@/components/EmploymentContractCard.vue";
import NoData from "@/components/NoData.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import resignService from "../../service/API/resignation";
import { inject } from "@vue/runtime-core";
import moment from "moment";
export default {
  data() {
    return {
      inprogressListEmpty: false,
      completedListEmpty: false,
      processlist: [],
      processlistLimit: 10,
      processlistPage: 1,
      processlistTotalItem: 0,
      completedList: [],
      completedListLimit: 10,
      completedListPage: 1,
      completedListTotalItem: 0,
      commonstore: inject("commonStore"),
      count: sessionStorage.getItem("count1"),
      count2: sessionStorage.getItem("count2"),
      loginType: localStorage.getItem('login_type'),
      progressTab: "진행중",
      completeTab: "진행완료",
    };
  },
  name: "ResignationLetter",
  components: {
    InnerHeader,
    Tabs,
    TabWrapper,
    EmploymentContractCard,
    NoData,
    VuePaginate,
  },
  async created() {
    this.resignservice = new resignService();
    await this.showdata();
  },
  methods: {
    async setPageProcess(event) {
      this.processlistPage = event;
      await this.showdata('process');
    },
    async setPageComplete(event) {
      this.completedListPage = event;
      await this.showdata('complete');
    },
    async showdata(fetchFrom = '') {
      if(fetchFrom === 'process') {
        window.scrollTo(0, 0);
        await this.resignservice
        .processlist(this.processlistPage,this.processlistLimit)
        .then((res) => {
          this.inprogressListEmpty = res.data.posts.length > 0 ? false : true;
          this.processlist = res.data.posts;
          this.processlistTotalItem = res.data.total_records;
          sessionStorage.setItem("count1", res.data.total_records);
        })
        .catch((err) => console.log(err));
      } else if(fetchFrom === 'complete') {
        window.scrollTo(0, 0);
        await this.resignservice
        .completelist(this.completedListPage, this.completedListLimit)
        .then((res) => {
          this.completedListEmpty = res.data.posts.length > 0 ? false : true;
          this.completedList = res.data.posts;
          this.completedListTotalItem = res.data.total_records;
          sessionStorage.setItem("count2", res.data.total_records);
        })
        .catch((err) => console.log(err));
      } else {
        window.scrollTo(0, 0);
        await this.resignservice
        .processlist(this.processlistPage,this.processlistLimit)
        .then((res) => {
          this.inprogressListEmpty = res.data.posts.length > 0 ? false : true;
          this.processlist = res.data.posts;
          this.processlistTotalItem = res.data.total_records;
          sessionStorage.setItem("count1", res.data.total_records);
        })
        .catch((err) => console.log(err));
        await this.resignservice
        .completelist(this.completedListPage, this.completedListLimit)
        .then((res) => {
          this.completedListEmpty = res.data.posts.length > 0 ? false : true;
          this.completedList = res.data.posts;
          this.completedListTotalItem = res.data.total_records;
          sessionStorage.setItem("count2", res.data.total_records);
        })
      }
    },
    setdata(event, val) {
      this.commonstore.methods.fetchRegObj(val);
      event.stopPropagation();
      console.log(this.commonstore.state.regObj);
      this.$router.push({ name: "WriteResignationLetter" });
      
    },
    setSeekerData(event, val) {
      this.commonstore.methods.fetchRegObj(val);
      console.log(this.commonstore.state.regObj);
    },
    async getTitle(data) {
      if(data.includes('진행중')) {
        this.processlistPage = 1;
        await this.showdata('process');
      } else {
        this.completedListPage = 1;
        await this.showdata('complete');
      }
    },
    opendetails(val, statTab) {
      if (val.status == "writtable") {
      } else {
        this.$router.push({
          name: "ResignationLetterDetails",
          query: { ids: val.id, tab: statTab },
        });
      }
    },
    FormatDate(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    },
  },
  mounted() {},
};
</script>
