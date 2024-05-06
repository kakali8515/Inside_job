<template>
  <div class="common-sec back-wh">
    <div class="top-hdr top-hdr-br mb-16">
      <div class="container">
        <InnerHeader headerTitle="취업활동 증명서" @backButtonPressed="$router.push({ name: 'home'})" />
      </div>
    </div>

    <div class="container">
      <div class="scrap-warpper">
        <div class="heading">
          <span v-if="jobHuntingCertificateData.buttonTitle === '선택'"
            >문서 리스트
          </span>
          <div class="all-check-cont" v-else>
            <label class="square-check-input"
              >문서 리스트
              <input
                type="checkbox"
                @click="selectAll"
                v-model="jobHuntingCertificateData.allSelected"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <button
            class="btn btn-primary-outline"
            v-if="jobHuntingCertificateData.list.length !== 0 && jobHuntingCertificateData.buttonTitle === '선택'"
            @click="jobHuntingCertificateData.buttonTitle = '선택 취소'"
          >
            선택
          </button>
          <button v-if="jobHuntingCertificateData.list.length !== 0 && jobHuntingCertificateData.buttonTitle === '선택 취소'" class="btn btn-primary-outline" @click="deSelect()">
            선택 취소
          </button>
        </div>
        <!-- Code For No Data -->
        <NoData v-if="jobHuntingCertificateData.list.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>지원한 내역이 없습니다.</span></p>
            <p>구직활동을 통해 증명서 리스트를 확인해 보세요!</p>
          </template>
        </NoData>

        <!-- Code For Job Hunting Certificate List -->
        <div class="scrap-list-cont" v-else>
          <div
            class="job-hunting-card"
            v-for="(item, i) in jobHuntingCertificateData.list"
            :key="i"
          >
            <div class="date">
              <div
                class="sub-check-cont"
                v-if="jobHuntingCertificateData.buttonTitle === '선택 취소'"
              >
                <label class="square-check-input">
                  <input
                    type="checkbox"
                    @click="singleSelect($event, item.id)"
                    v-model="jobHuntingCertificateData.selctedListIds"
                    :value="item.id"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p>
                {{ store.methods.dateFormat(item.created_at, "YYYY년 M월 D일") }}
              </p>
            </div>
            <div class="info">
              <ul>
                <li><span>회사명</span>{{ item.company_name }}</li>
                <li><span>지원 이력서</span>{{ item.resume_title }}</li>
                <li>
                  <span>주소</span>{{ item.company_address }} {{ item.company_postal_code }}
                </li>
              </ul>
            </div>
          </div>

          <!-- <Pagination
            :totalRecords="pagination.totalRecords"
            v-on:setNumber="setPage($event)"
          /> -->
          <div class="mb-60">
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
    <div
      class="btm-button-group fixed-btn-otr"
      v-if="jobHuntingCertificateData.list.length !== 0"
      @click="jobHuntingCertificateData.selctedListIds != 0 ? jobHuntingCertificateData.isIssuedCertificateModel = true : jobHuntingCertificateData.isChooseDocumentAlertModel = true"
    >
      <a href="#" class="btn btn-primary lg">증명서 발급</a>
    </div>
    <IssuedCertificateConfirmation
      :isModal="jobHuntingCertificateData.isIssuedCertificateModel"
      :selctedListIdsLength="jobHuntingCertificateData.selctedListIds.length"
      @conifrmModel="confirm()"
    />
    <ChooseDocumentAlertModel
      :isModal="jobHuntingCertificateData.isChooseDocumentAlertModel"
      @conifrmModel="jobHuntingCertificateData.isChooseDocumentAlertModel = false"
    />
  </div>
</template>
  
  <script>
import InnerHeader from "../../components/innerHeader.vue";
import NoData from "@/components/NoData.vue";
import { onMounted, reactive, inject, watch } from "vue";
import { JobHuntingCertificate } from "@/service/API/JobHuntingCertificate.js";
import Pagination from "@/components/Pagination.vue";
import IssuedCertificateConfirmation from "@/components/Modals/IssuedCertificateConfirmation.vue";
import ChooseDocumentAlertModel from "@/components/Modals/ChooseDocumentAlertModel.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "JobHuntingCertificate",
  components: {
    InnerHeader,
    NoData,
    Pagination,
    IssuedCertificateConfirmation,
    ChooseDocumentAlertModel,
    VuePaginate,
  },

  setup() {
    const store = inject("commonStore");
    const jobHuntingCertificateData = reactive({
      list: [],
      buttonTitle: "선택",
      selctedListIds: [],
      allSelected: false,
      isIssuedCertificateModel: false,
      isChooseDocumentAlertModel: false
    });
    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    onMounted(() => {
      list();
    });
    watch(
      () => jobHuntingCertificateData.list,
      () => {
        jobHuntingCertificateData.allSelected = false;
        for (let i = 0; i < jobHuntingCertificateData.list.length; i++) {
          if (
            jobHuntingCertificateData.selctedListIds.includes(
              jobHuntingCertificateData.list[i].id
            )
          ) {
            jobHuntingCertificateData.allSelected = true;
          } else {
            jobHuntingCertificateData.allSelected = false;
            return;
          }
        }
      }
    );

    async function list() {
      let res = await JobHuntingCertificate.list({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        jobHuntingCertificateData.list = res.data.applications;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = res.data.total_records;
      }
    }

    function setPage(event) {
      window.scrollTo(0, 0);
      pagination.pageNo = event;
      list();
    }

    function singleSelect(e, id) {
      const click = e.target.checked;
      if (click) {
        jobHuntingCertificateData.selctedListIds.push(id);
        for (let i = 0; i < jobHuntingCertificateData.list.length; i++) {
          if (
            jobHuntingCertificateData.selctedListIds.includes(
              jobHuntingCertificateData.list[i].id
            )
          ) {
            jobHuntingCertificateData.allSelected = true;
          } else {
            jobHuntingCertificateData.allSelected = false;
            return;
          }
        }
      } else {
        jobHuntingCertificateData.selctedListIds.splice(
          jobHuntingCertificateData.selctedListIds.indexOf(id),
          1
        );
        jobHuntingCertificateData.allSelected = false;
      }
    }

    function selectAll() {
      jobHuntingCertificateData.selctedListIds = [];
      if (!jobHuntingCertificateData.allSelected) {
        for (let i in jobHuntingCertificateData.list) {
          jobHuntingCertificateData.selctedListIds.push(
            jobHuntingCertificateData.list[i].id
          );
        }
      }
    }

    function deSelect() {
      jobHuntingCertificateData.buttonTitle = "선택";
      jobHuntingCertificateData.selctedListIds = [];
      jobHuntingCertificateData.allSelected = false;
    }

    async function confirm() {
      if (jobHuntingCertificateData.selctedListIds.length !== 0) {
        //get registerd email
        let userDetailRes = await JobHuntingCertificate.userDetails();
        if (userDetailRes.status === 200) {
          console.log(userDetailRes.data.email);
        }
        let userData = {
          application_ids: jobHuntingCertificateData.selctedListIds,
          email: userDetailRes.data.email,
        };

        //sending Email
        let res = await JobHuntingCertificate.sendEmail(userData);
        if (res.status === 200) {
          jobHuntingCertificateData.isIssuedCertificateModel = false;
          deSelect()
        }

        //download pdf file
        // let resPdfDownload = await JobHuntingCertificate.downloadPdf({
        //   application_ids: jobHuntingCertificateData.selctedListIds,
        // });
        // if (resPdfDownload.status === 200) {
        //   let link = document.createElement("a");
        //   link.href = resPdfDownload.data.pdf_url;
        //   link.setAttribute("download",'application-data.pdf');
        //   link.dispatchEvent(new MouseEvent("click"));
         
        //   deSelect()
        // }
        // store.state.isViewmoreMenuOpen = true
      } else {
        jobHuntingCertificateData.isIssuedCertificateModel = false;
      }
    }

    return {
      jobHuntingCertificateData,
      pagination,
      setPage,
      store,
      singleSelect,
      selectAll,
      deSelect,
      confirm,
    };
  },
};
</script>
  