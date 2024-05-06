<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="이력서" />
      </div>
    </div>
    <div class="container">
      <div class="pb-100">
        <div class="scrap-warpper p-0">
          <div class="sub-otr mb-21 b-color">
            <h3 class="sub-heading mb-0">문서 리스트</h3>
          </div>

          <!-- Code For No Data -->
          <NoData v-if="resumeListData.list.length === 0">
            <template v-slot:no-data-image>
              <img
                class="no-job-icon"
                src="@/assets/icons/no-job-icon.svg"
                alt=""
              />
            </template>
            <template v-slot:no-data-content>
              <p><span>작성한 이력서가 없습니다.</span></p>
              <p>이력서를 작성하고 구직활동을 시작해 보세요!</p>
            </template>
          </NoData>

          <div v-else class="document-list-otr">
            <div
              class="document-list document-list-resume"
              v-for="(item, i) in resumeListData.list"
              :key="i"
            >
              <p>
                <span class="btn btn-default red" v-if="item.is_default === 1"
                  >기본</span
                >
                <span class="btn btn-default" v-if="item.is_temporary === 1"
                  >임시</span
                >
                <b>{{ store.methods.dateFormat(item.created_at, "YYYY년 M월 D일") }}</b>
              </p>
              <template v-if="item.is_temporary === 1">
                <h6 class="is_temp">임시저장된 이력서입니다.</h6>
              </template>
              <template v-else>
              <h4 class="mb-12" @click="redirectToDetails(item.id)">{{ item.resume_title }}</h4>
              <ul @click="redirectToDetails(item.id)" class="d-text-match">
                <li>
                  <em>희망근무지</em> <span>{{ item.work_places }}</span>
                </li>
                <li>
                  <em>희망업직종</em> <span>{{ item.occupations }}</span>
                </li>
              </ul>
              </template>
              <div class="doc-btn-group">
                <a
                  href="javascript:void(0);"
                  @click="
                    (resumeListData.isShowModal = true),
                      (resumeListData.deleteId = `${item.id}`)
                  "
                  class="doc-btn-innr"
                  >삭제
                  <span><img src="@/assets/icons/trash.svg" alt="" /></span
                ></a>
                <a
                  @click="
                    $router.push({
                      name: 'ResumeWritingBasics',
                      params: { id: item.id },
                    })
                  "
                  href="javascript:void(0);"
                  class="doc-btn-innr"
                >
                  <span v-if="item.is_temporary === 0">수정</span>
                  <span v-else>이어서 작성</span>
                  <span><img src="@/assets/icons/edit.svg" alt="" /></span>
                </a>
              </div>
            </div>
            <!-- <div class="document-list">
                            <p><span class="btn btn-default">임시</span>2022.06.10</p>
                            <h4>임시저장된 이력서입니다.</h4>
                            <div class="doc-btn-group">
                                <a href="javascript:void(0);" class="doc-btn-innr">삭제 <span><img src="@/assets/icons/delete.png" alt="" /></span></a>
                                <a href="javascript:void(0);" class="doc-btn-innr">이어서 작성 <span><img src="@/assets/icons/edit.svg" alt="" /></span></a>
                            </div>
                        </div>     -->
          </div>
        </div>
        <div class="fixed-btn-otr">
          <a class="btn btn-primary lg" @click="writeResume()"
            >이력서 작성하기</a
          >
          <!-- <a class="btn btn-primary lg" @click="resumeListData.list.length < 5 ? $router.push('/job-seekers/resume-writing') : resumeListData.isShowModal = true">이력서 작성하기</a> -->
        </div>
      </div>
    </div>
    <ResumeDeleteConfirmationModal
      :isModal="resumeListData.isShowModal"
      @closeModal="
        resumeListData.isShowModal = false;
        resumeListData.deleteId = '';
      "
      @deleteConfirm="deleteResume(resumeListData.deleteId)"
    />
    <ResumeMaximum
      :isModal="resumeListData.isResumeLimitModel"
      @closeModal="resumeListData.isResumeLimitModel = false"
    />
    <TemporarilyResumeModal
      :isModal="resumeListData.isTempResumeModal"
      @closeModal="resumeListData.isTempResumeModal = false"
      @writeResumeTemp="writeResumeRedirection()"
    />
  </div>
</template>

<script>
import { onMounted, reactive, inject } from "vue";
import NoData from "@/components/NoData.vue";
import { resume } from "@/service/API/resume.js";
import ResumeDeleteConfirmationModal from "@/components/Modals/ResumeDeleteConfirmationModal.vue";
import ResumeMaximum from "@/components/Modals/ResumeMaximum.vue";
import TemporarilyResumeModal from "@/components/Modals/TemporarilyResumeModal.vue";
import { useRouter } from "vue-router";
import InnerHeader from "../../components/innerHeader.vue";

export default {
  name: "Resume",
  components: {
    InnerHeader,
    NoData,
    ResumeDeleteConfirmationModal,
    ResumeMaximum,
    TemporarilyResumeModal,
  },

  setup() {
    const router = useRouter();
    const store = inject("commonStore");
    const resumeListData = reactive({
      list: [],
      isShowModal: false,
      deleteId: "",
      isResumeLimitModel: false,
      isTempResumeModal: false,
      is_temporary: 0,
      is_temporary_id: 0,
    });

    onMounted(() => {
      list();
    });

    async function list() {
      let res = await resume.resumeList();
      if (res.status === 200) {
        resumeListData.list = res.data;
      }
    }

    async function deleteResume(id) {
      let userData = {
        id: id,
      };
      let res = await resume.deleteResume(userData);
      if (res.status === 200) {
        resumeListData.isShowModal = false;
        list();
      }
    }

    function writeResume() {
      for (let i = 0; i < resumeListData.list.length; i++) {
        if (resumeListData.list[i].is_temporary === 1) {
          resumeListData.is_temporary = 1;
          resumeListData.is_temporary_id = resumeListData.list[i].id;
        }
      }

      if (resumeListData.list.length >= 5) {
        resumeListData.isResumeLimitModel = true;
      } else if (resumeListData.is_temporary === 1) {
        resumeListData.isTempResumeModal = true;
      } else {
        router.push("/job-seekers/resume-writing-basics/add");
      }
    }

    function writeResumeRedirection() {
      deleteResume(resumeListData.is_temporary_id);
      router.push("/job-seekers/resume-writing-basics/add");
    }

    function redirectToDetails(id) {
      router.push({
        name: 'ApplicantInformation',
        params: {
          id: id
        }
      })
    }

    return {
      resumeListData,
      list,
      deleteResume,
      writeResume,
      writeResumeRedirection,
      redirectToDetails,
      store,
    };
  },
};
</script>
<style scoped>
.is_temp {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: #333333;
  margin: 12px 0 16px 0;
}
</style>
