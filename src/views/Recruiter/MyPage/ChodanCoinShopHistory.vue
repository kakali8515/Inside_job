<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br mb-16">
      <div class="container">
        <InnerHeader headerTitle="이용내역" />
      </div>
    </div>
    <div class="pb-32">
      <div class="container">
        <div class="tab-outr tab-wd">
          <TabWrapper>
            <Tabs title="결제내역">
              <div class="cm-top-space">
                <div class="sub-otr b-color mb-0">
                  <h3 class="sub-heading mb-0">리스트</h3>
                </div>
                <!-- Code For No Data -->
                <NoData v-if="payHistData?.length == 0">
                  <template v-slot:no-data-image>
                    <img
                      class="no-job-icon"
                      src="@/assets/icons/no-job-icon.svg"
                      alt=""
                    />
                  </template>
                  <template v-slot:no-data-content>
                    <p><span>결제내역이 없습니다.</span></p>
                  </template>
                </NoData>
                <!-- Code For No Data -->
                <ul class="pay-hist-list ">
                  <li v-for="(item, i) in payHistData" :key="i">
                    <div class="pay-hist-left">
                      <h4>{{ item.sub_type }}</h4>
                      <span>
                        {{ store.methods.dateFormat(item.create_date, "YYYY.M.D") }}
                      </span>
                    </div>
                    <p>
                      <span>{{ item.coin.toLocaleString("en-US") }}</span> 코인
                    </p>
                  </li>
                </ul>
                <!-- pagination-start -->
                <!-- <div class="pagination-area mt-36">
                  <a href="#" class="first-page disable">
                    <img src="@/assets/icons/pagi-dobble-arrow.svg" />
                  </a>
                  <a href="#" class="next disable"
                    ><img src="@/assets/icons/pagi-arrow.svg"
                  /></a>
                  <ul>
                    <li class="active">1</li>
                  </ul>
                  <a href="#" class="prev disable"
                    ><img src="@/assets/icons/pagi-arrow.svg"
                  /></a>
                  <a href="#" class="last-page disable">
                    <img src="@/assets/icons/pagi-dobble-arrow.svg" />
                  </a>
                </div> -->
                <VuePaginate
                  v-if="pagination2.totalRecords !== 0"
                  :limit="pagination2.perPage"
                  :page="pagination2.pageNo"
                  :totalItems="pagination2.totalRecords"
                  v-on:setNumber="setPage($event)"
                />
                <!-- pagination-end -->
              </div>
            </Tabs>
            <Tabs title="구매내역">
              <div class="cm-top-space">
                <div class="sub-otr b-color mb-0">
                  <h3 class="sub-heading mb-0">리스트</h3>
                </div>
                <!-- Code For No Data -->
                <NoData v-if="purHistData?.length == 0">
                  <template v-slot:no-data-image>
                    <img
                      class="no-job-icon"
                      src="@/assets/icons/no-job-icon.svg"
                      alt=""
                    />
                  </template>
                  <template v-slot:no-data-content>
                    <p><span>결제내역이 없습니다.</span></p>
                  </template>
                </NoData>
                <ul class="pay-hist-list">
                  <li v-for="(item, i) in purHistData" :key="i">
                    <div class="pay-hist-left">
                      <h4>{{ item.type }} - {{ item.sub_type }}</h4>
                      <span>{{ store.methods.dateFormat(item.create_date, "YYYY.M.D") }}</span>
                    </div>
                    <p>
                      <span class="rd">{{
                        item.coin.toLocaleString("en-US")
                      }}</span>
                      코인
                    </p>
                  </li>
                </ul>
                <VuePaginate
                  v-if="pagination.totalRecords !== 0"
                  :limit="pagination.perPage"
                  :page="pagination.pageNo"
                  :totalItems="pagination.totalRecords"
                  v-on:setNumber="setPage($event)"
                />
              </div>
            </Tabs>
          </TabWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import coinService from "../../../service/API/coinManage";
import Pagination from "@/components/Pagination.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import InnerHeader from "@/components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";
import { inject } from 'vue';
export default {
  name: "ChodanCoinShopHistory",
  components: {
    Tabs,
    TabWrapper,
    InnerHeader,
    NoData,
    Pagination,
    VuePaginate,
  },
  data() {
    return {
      d: new Date(),
      store: inject("commonStore"),
      payHistData: [],
      purHistData: [],
      pagination: {
        totalRecords: 0,
        perPage: 5,
        pageNo: 1,
      },
      pagination2: {
        totalRecords: 0,
        perPage: 5,
        pageNo: 1,
      },
    };
  },
  created() {
    this.coinservice = new coinService();
  },
  methods: {
    setPage(event) {
      this.pagination.pageNo = event;
      this.getpurchaseHistorylist();
      window.scrollTo(0, 0);
    },
    getpayHistorylist() {
      this.coinservice
        .paymentHistorylist(this.pagination2.pageNo, this.pagination2.perPage)
        .then((res) => {
          this.payHistData = res.data.data;
          this.pagination2.perPage = res.data.pagination_limit;
          this.pagination2.totalRecords = res.data.total_records;
          console.log("payment History List:", res.data.data);
        })
        .catch((err) => console.log(err));
    },
    getpurchaseHistorylist() {
      this.coinservice
        .purchaseHistorylist(this.pagination.pageNo, this.pagination.perPage)
        .then((res) => {
          this.purHistData = res.data.data;
          this.pagination.perPage = res.data.pagination_limit;
          this.pagination.totalRecords = res.data.total_records;
          console.log("purchase History List:", res.data.data);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getpayHistorylist();
    this.getpurchaseHistorylist();
  },
};
</script>
