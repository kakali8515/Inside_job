<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="관심 기업" />
      </div>
    </div>
    <div class="container">
      <div class="pb-32">
        <div class="scrap-warpper p-0 comp-interest-wrap">
          <div class="sub-otr b-color d-flex sub-otr-adjust">
            <div class="check-wrp">
              <div class="check-list squre" v-if="editMode">
                <label class="check-input">
                  <input
                    type="checkbox"
                    v-model="companyState.allSelect"
                    @click="selectAll"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <h3 class="sub-heading mb-0">기업 리스트</h3>
            </div>
            <a
              href="javascript:void(0);"
              class="btn btn-primary-outline pd"
              v-if="companyList.length != 0 && !editMode"
              @click="
                () => {
                  editMode = true;
                }
              "
              >편집
            </a>
            <template v-else-if="companyList.length != 0 && editMode">
              <div class="bt-group sub-otr-adjust">
                <button
                  type="button"
                  :class="`btn pd ${
                    deleteDisabled
                      ? 'btn-primary-gray-outline'
                      : 'btn-primary-outline'
                  }`"
                  :disabled="deleteDisabled"
                  @click="setDelete"
                >
                  선택삭제
                </button>
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary-outline pd"
                  @click="
                    () => {
                      editMode = false;
                      companyState.selectedIds = [];
                    }
                  "
                  >편집취소</a
                >
              </div>
            </template>
          </div>
          <NoData v-if="companyList.length == 0">
            <template v-slot:no-data-image>
              <img
                class="no-job-icon"
                src="@/assets/icons/no-job-icon.svg"
                alt=""
              />
            </template>
            <template v-slot:no-data-content>
              <p><span>관심 기업이 없습니다.</span></p>
              <p>관심 기업을 등록해서 원하는 채용정보를 얻어보세요!</p>
            </template>
          </NoData>
          <ul class="company-list" v-else>
            <li v-for="(i, e) in companyList" :key="e">
              <div class="check-wrp" v-if="editMode">
                <div class="check-list squre">
                  <label class="check-input">
                    <input
                      type="checkbox"
                      :value="i.employer_id"
                      v-model="companyState.selectedIds"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="company-left" @click="openDetails(i.employer_id)">
                <figure>
                  <img :src="i.company_profile_img" alt="" />
                </figure>
              </div>
              <div
                :class="`company-right ${editMode ? 'rg2' : ''}`"
                @click="openDetails(i.employer_id)"
              >
                <h3 class="sub-heading">{{ i.company_name }}</h3>
                <p>
                  진행중인 공고 {{ i.jobstatus }}
                  <span>{{ i.totalpost }}건</span>
                </p>
              </div>
            </li>
          </ul>
          <!-- <Pagination v-if="companyList.length !== 0"
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
import NoData from "@/components/NoData.vue";
import InnerHeader from "@/components/innerHeader.vue";
import Pagination from "@/components/Pagination.vue";
import { CompanyOfInterestService } from "../../service/API/CompanyOfInterest.js";
import { onBeforeMount, reactive, ref, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "CompanyInterest",
  components: { NoData, InnerHeader, Pagination, VuePaginate },

  setup() {
    const companyList = ref([]);
    const pagination = reactive({
      totalRecords: 0,
      perPage: 5,
      pageNo: 1,
    });
    const editMode = ref(false);
    const companyState = reactive({
      allSelect: false,
      selectedIds: [],
    });
    const deleteDisabled = ref(true);
    const router = useRouter();

    onBeforeMount(async () => {
      await getList();
    });

    // Getting full list
    const getList = async () => {
      let pagi = {
        page: pagination.pageNo,
        limit: pagination.perPage,
      };
      let res = await CompanyOfInterestService.getInterestedList(pagi);
      companyList.value = res.data.posts;
      pagination.totalRecords = res.data.total_records;
      //  Math.ceil(
      //   res.data.total_records / pagination.perPage
      // );
      // console.log(res);
    };

    // for pagination getting page no.
    const setPage = (event) => {
      pagination.pageNo = event;
      getList();
    };

    // setting select all feature
    const selectAll = () => {
      // console.log(companyState.allSelect);
      companyState.selectedIds = [];
      if (!companyState.allSelect) {
        companyList.value.forEach((ele) => {
          companyState.selectedIds.push(ele.employer_id);
        });
      }
    };

    // deleting interested companies
    const setDelete = async () => {
      let ids = {
        employer_id: companyState.selectedIds.toString(),
      };
      let res = await CompanyOfInterestService.deletedCompany(ids);
      // console.log(res);
      if (res.status === 200) {
        await getList();
        companyState.selectedIds = [];
      }
    };

    // Open details page
    const openDetails = (e) => {
      router.push({
        name: "CompanyInformation",
        params: {
          id: e,
        },
      });
    };

    const onClickHandler = (page) => {
      // console.log(page);
    };

    // checking if all are selected
    watch(
      () => companyState.selectedIds,
      (val) => {
        // console.log(val);
        deleteDisabled.value = val.length > 0 ? false : true;
        if (val.length == companyList.value.length) {
          companyState.allSelect = true;
        } else {
          companyState.allSelect = false;
        }
      }
    );

    return {
      companyList,
      pagination,
      editMode,
      companyState,
      deleteDisabled,
      onClickHandler,
      setPage,
      selectAll,
      setDelete,
      openDetails,
    };
  },
};
</script>
