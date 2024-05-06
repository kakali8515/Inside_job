<template>
  <div class="common-sec back-wh">
    <div class="container">
      <div class="scrap-warpper">
        <div class="heading">
          <span v-if="displayText.text === '편집'">스크랩 공고 리스트</span>
          <div v-else class="all-check-cont">
            <label class="square-check-input"
              >스크랩 공고 리스트
              <input
                type="checkbox"
                @click="selectAll"
                v-model="scrapList.allSelected"
              />
              <span class="checkmark"></span>
            </label>
          </div>

          <span v-if="scrapList.posts.length">
            <button
              class="btn btn-primary-outline"
              v-if="displayText.text === '편집'"
              @click="edit()"
            >
              {{ displayText.text }}
            </button>
            <button
              class="btn btn-primary-outline"
              v-else
              @click="deleteScrap()"
            >
              {{ displayText.text }}
            </button>
          </span>
        </div>

        <!-- Code For No Data -->
        <NoData v-if="scrapList.posts.length === 0">
          <template v-slot:no-data-image>
            <img
              class="no-job-icon"
              src="@/assets/icons/no-job-icon.svg"
              alt=""
            />
          </template>
          <template v-slot:no-data-content>
            <p><span>스크랩한 채용정보가 없습니다.</span></p>
            <p>다양한 채용정보가 여러분을 기다리고 있습니다!</p>
          </template>
        </NoData>

        <!-- Code For Announcement List -->
        <div v-else class="scrap-list-cont">
          <div
            class="scrap-announcement-card"
            :class="displayText.text === '선택삭제' ? 'scrap-edit-card' : ''"
            v-for="(item, i) in scrapList.posts"
            :key="i"
          >
            <div class="left-part" v-if="displayText.text === '선택삭제'">
              <div class="sub-check-cont">
                <label class="square-check-input">
                  <input
                    @click="singleSelect($event, item.id)"
                    type="checkbox"
                    v-model="selectedListId.id"
                    :value="item.id"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="right-part" @click="$router.push({name: 'RecruiterJobPostingDetails', params: {id: item.job_id}})">
              <CardWrapper>
                <template v-slot:content>
                  <h5>{{ item.company_name }}</h5>
                  <h3>{{ item.announcement_title }}</h3>
                </template>
                <template v-slot:btn>
                  <h6>
                    <b>
                    {{ item.region_1st_depth_name }}
                    {{ item.region_2nd_depth_name }}
                    {{ item.region_3rd_depth_name }}
                    </b>
                    <!-- <span style="color: #e0e0e0; margin-left: 4px"
                      >&#x2022;</span
                    > -->
                    <span
                      style=""
                      v-if="item.pay_type === 'hourly_wage'"
                      >시급</span
                    >
                    <span
                      style=""
                      v-if="item.pay_type === 'daily_wage'"
                      >일급</span
                    >
                    <span
                      style=""
                      v-if="item.pay_type === 'salary'"
                      >월급</span
                    >
                    <em>{{ commonStore.methods.formatSalary(item.salary) }}</em
                    >원
                  </h6>
                  <button
                    class="btn btn-primary-gradient apply-btn"
                    @click="(e) => { e.stopPropagation(), commonStore.state.isApplyChooseResume = true,scrapList.jobId=item.job_id}" 
                  >
                    지원하기
                  </button>
                  <!-- <button class="btn btn-primary-gradient" @click="$router.push(`/job-seekers/apply-choose-resume/${item.job_id}`)">지원하기</button> -->
                  <!-- <router-link
                    :to="{ name: 'ApplyChooseResume' }"
                    class="btn btn-primary-gradient"
                    >지원하기</router-link
                  > -->
                </template>
              </CardWrapper>
            </div>
          </div>
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
    
    <ApplyChooseResume
      :id="scrapList.jobId"
      v-if="commonStore.state.isApplyChooseResume"
    />
    <ScrapAlertModel
      :isModal="scrapList.isScrapAlertModel"
      @conifrmModel="scrapList.isScrapAlertModel = false"
    />
  </div>
</template>
  
<script>
import CardWrapper from "@/components/CardWrapper.vue";
import ScrapAnnouncement from "@/components/ScrapAnnouncement.vue";
import ScrapAnnouncementEdit from "@/components/ScrapAnnouncementEdit.vue";
import Pagination from "@/components/Pagination.vue";
import { scrap } from "@/service/API/scrap.js";
import { inject, onMounted, reactive, watch } from "vue";
import NoData from "@/components/NoData.vue";
import ScrapAlertModel from "@/components/Modals/ScrapAlertModel.vue";
import ApplyChooseResume from "./ApplyChooseResume.vue";
import VuePaginate from "@/components/Utils/VuePaginate.vue";

export default {
  name: "Scrap",
  components: {
    ScrapAnnouncement,
    Pagination,
    ScrapAnnouncementEdit,
    CardWrapper,
    NoData,
    ScrapAlertModel,
    ApplyChooseResume,
    VuePaginate,
  },

  setup() {
    const commonStore = inject("commonStore");
    const displayText = reactive({
      text: "편집",
    });

    const selectedListId = reactive({
      id: [],
    });

    const pagination = reactive({
      totalRecords: 0,
      perPage: 10,
      pageNo: 1,
    });

    const scrapList = reactive({
      posts: [],
      allSelected: false,
      isScrapAlertModel: false,
      jobId: ''
    });

    watch(
      () => scrapList.posts,
      () => {
        scrapList.allSelected = false;
        for (let i = 0; i < scrapList.posts.length; i++) {
          if (
            selectedListId.id.includes(
              scrapList.posts[i].id
            )
          ) {
            scrapList.allSelected = true;
          } else {
            scrapList.allSelected = false;
            return;
          }
          // if (selectedListId.id[i] === scrapList.posts[i].id) {
          //   scrapList.allSelected = false;
          // } else {
          //   scrapList.allSelected = true;
          // }
        }
      }
    );

     watch(
      () => commonStore.state.isApplyChooseResume,
      () => {
        if (commonStore.state.isApplyChooseResume === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    onMounted(() => {
      list();
    });

    function edit() {
      displayText.text = "선택삭제";
    }

    async function list() {
      let res = await scrap.list({
        page: pagination.pageNo,
        limit: pagination.perPage,
      });
      if (res.status === 200) {
        scrapList.posts = res.data.posts;
        pagination.perPage = res.data.pagination_limit;
        // pagination.pageNo = res.data.current_page;
        pagination.totalRecords = 
          res.data.total_records;
      }
    }

    async function deleteScrap() {
      if (selectedListId.id.length !== 0) {
        let res = await scrap.deleteScrap(selectedListId);
        if (res.status === 200) {
          list();
          displayText.text = "편집";
        }
      } else {
        scrapList.isScrapAlertModel = true;
        // alert('Please select announcement that u want to delete form scrap list')
      }
    }

    function singleSelect(e, id) {
      // scrapList.allSelected = false;
      const click = e.target.checked;
      if (click) {
        selectedListId.id.push(id);
        for (let i = 0; i < scrapList.posts.length; i++) {
          if (
            selectedListId.id.includes(
              scrapList.posts[i].id
            )
          ) {
            scrapList.allSelected = true;
          } else {
            scrapList.allSelected = false;
            return;
          }
        }
      } else {
        selectedListId.id.splice(selectedListId.id.indexOf(id), 1);
        scrapList.allSelected = false;
      }
    }
    function selectAll() {
      selectedListId.id = [];
      if (!scrapList.allSelected) {
        for (let i in scrapList.posts) {
          selectedListId.id.push(scrapList.posts[i].id);
        }
      }
    }

    function setPage(event) {
      pagination.pageNo = event;
      list();
      window.scrollTo(0, 0);
    }

    return {
      list,
      edit,
      displayText,
      scrapList,
      pagination,
      setPage,
      selectedListId,
      deleteScrap,
      singleSelect,
      selectAll,
      commonStore,
    };
  },
};
</script>
  
  