<template>
  <div class="common-sec back-wh pb-60">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="근로계약서" @backButtonPressed="redirectPageTo" />
      </div>
    </div>
    <div class="container">
      <div class="frame_holder">
        <div class="scroll_frame" v-if="pdfContent">
          <vue-pdf-app
            style="height: 100vh"
            :pdf="pdfContent"
            :config="config"
          ></vue-pdf-app>
        </div>
      </div>
      <div class="rejection-cont mt-32" v-if="pageType === 'rejected'">
        <p>반려사유</p>
        <textarea
          class="form-control"
          v-model="rejectReason"
          readonly
        ></textarea>
      </div>
    </div>
    <div class="btm-button-group fixed-btn-otr" v-if="pageType === 'pending'">
      <template v-if="authStore.state.loginType === 'job_seeker'">
        <a
          href="#"
          class="btn btn-primary-outline left-btn"
          @click="
            () => {
              rejectModal = true;
            }
          "
          >반려하기</a
        >
        <a
          href="#"
          class="btn btn-primary rg-btn"
          @click="setOpenSignModal($event)"
          >승인하기</a
        >
      </template>
      <template v-else>
        <a
          href="#"
          class="btn btn-primary rg-btn lg btn-full"
          @click="setEdit($event)"
          style="max-width: 100%; flex-basis: 100%"
          >수정하기</a
        >
      </template>
      <!-- <a href="#" class="btn btn-primary-gray lg">마감된 공고 입니다</a> -->
    </div>

    <!-- Button For Labor Contract Detail Completed -->
    <div
      class="btm-button-group pt-32 btm-half-button fixed-btn-otr"
      v-else-if="pageType === 'accepted'"
    >
      <button
        type="button"
        class="btn btn-primary-outline"
        @click="contractDownload"
        v-if="isPlatMobile"
      >
        pdf 다운로드하기
      </button>
      <a
        :href="pdfdUrl"
        class="btn btn-primary-outline"
        :download="pdfdUrl"
        v-else
      >
        pdf 다운로드하기
      </a>
      <a href="#" class="btn btn-primary rg-btn" @click="openEmailModal"
        >이메일 전송하기</a
      >
    </div>
    <EmploymentSignature
      :isOpen="openSignModal"
      @save="approveContract($event)"
    />
    <EmploymentSendEmail
      :Email="defaultEmail"
      @sendMailto="setEmail($event)"
      v-if="commonStore.state.isContractEmailModal"
    />
  </div>
  <EmploymentContarctReasonAccompaniment
    :isModal="rejectModal"
    v-if="rejectModal"
    @closeModal="
      () => {
        rejectModal = false;
      }
    "
    @rejectContract="setReject($event)"
  />
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import EmploymentContarctReasonAccompaniment from "@/components/Modals/EmploymentContarctReasonAccompaniment.vue";
import EmploymentSignature from "@/views/JobSeekers/EmploymentSignature.vue";
import EmploymentSendEmail from "@/views/JobSeekers/EmploymentSendEmail.vue";
import { employmentService } from "@/service/API/EmplymentContract.js";
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
// import axios from "axios";
// import {saveAs} from 'file-saver';

export default {
  name: "LaborContractDetails",
  components: {
    InnerHeader,
    EmploymentContarctReasonAccompaniment,
    EmploymentSignature,
    EmploymentSendEmail,
    VuePdfApp,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pdfContent = ref("");
    const rejectModal = ref(false);
    const defaultEmail = ref("");
    const rejectReason = ref("");
    const commonStore = inject("commonStore");
    const employmentStore = inject("employmentStore");
    const authStore = inject("authenticateStore");
    const pageId = route.params.id;
    const pageType = computed(() => route.params.type);
    const formData = new FormData();
    const openSignModal = reactive({
      isOpen: false,
    });
    const editType = ref("standard");
    const pdfdUrl = ref("");
    const loginType = ref(localStorage.getItem("login_type"));
    const { cookies } = useCookies();
    const isPlatMobile = computed(() => cookies.get("isMobile") === "true");

    const config = {
      secondaryToolbar: false,
      toolbar: {
        toolbarViewerLeft: {
          findbar: false,
        },
      },
    };

    provide("openSignModal", openSignModal);

    onMounted(async () => {
      getPDfDetails();
      getDetails();
      // const loadingTask = createLoadingTask(pdfSrc.value)
      // loadingTask.promise.then((pdf) => {
      //   numOfPages.value = pdf.numPages
      // })
    });

    watch(
      () => commonStore.state.isContractEmailModal,
      () => {
        if (commonStore.state.isContractEmailModal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );
    const getPDfDetails = async () => {
      let res = await employmentService.pdfContractDetails(pageId);
      console.log("res=====", res);
      var bytes = new Uint8Array(res.data.ArrayBuffer.data);
      let blob = new Blob([bytes], {
        type: "application/pdf",
      });
      let objectUrl = URL.createObjectURL(blob);
      // console.log(res.data.pdf_url);
      // console.log("blob", blob);
      // console.log("objectUrl", objectUrl);

      pdfdUrl.value = res.data.pdf_url;
      pdfContent.value = objectUrl;
    };
    const getDetails = async () => {
      let res2 = await employmentService.contractDetails(pageId);
      defaultEmail.value =
        loginType.value == "job_seeker"
          ? res2.data.email_seeker
          : res2.data.email;
      rejectReason.value = res2.data.reject_reason;
      editType.value = res2.data.type;
      employmentStore.state.contractListTabState =
        pageType.value == "accepted" ? 1 : 0;
    };

    const setReject = async (event) => {
      let inputData = {
        contract_id: route.params.id,
        reject_reason: event,
      };
      rejectModal.value = false;
      let res = await employmentService.contractRejected(inputData);
      // console.log(res);
      if (res.status === 200) {
        router.push({
          name: "LaborContractDetails",
          params: {
            id: route.params.id,
            type: "rejected",
          },
        });
        getDetails();
        // router.push({ name: "LaborContract" });
        // employmentStore.state.contractListTabState = 0;
      }
    };

    const setOpenSignModal = (e) => {
      console.log("called");
      e.preventDefault();
      openSignModal.isOpen = true;
    };

    const approveContract = async (event) => {
      console.log("image", event);
      openSignModal.isOpen = false;
      formData.append("contract_id", pageId);
      formData.append("image", event);
      let res = await employmentService.contractApproved(formData);
      // console.log(res);
      if (res.status === 200) {
        router.push({
          name: "LaborContractDetails",
          params: {
            id: route.params.id,
            type: "accepted",
          },
        });
        getPDfDetails();
      }
    };

    const openEmailModal = () => {
      commonStore.state.isContractEmailModal = true;
    };

    const setEmail = async (event) => {
      commonStore.state.isContractEmailModal = false;
      let inputData = {
        email: event,
      };
      let res = await employmentService.contractSendEmail(pageId, inputData);
      // console.log(res);
      if (res.status === 200) {
        router.push({ name: "LaborContract" });
        employmentStore.state.contractListTabState = 1;
      }
    };

    const setEdit = (e) => {
      e.preventDefault();
      employmentStore.state.editId = String(route.params.id);
      localStorage.setItem("contractId", String(route.params.id));
      employmentStore.state.employmentFormtype = editType.value;
      if (editType.value === "standard") {
        localStorage.setItem("contractFormType", "edit");
        employmentStore.state.formPageType = "edit";
        router.push({
          name: "StandardLaborContractStepTwo",
        });
      } else if (editType.value === "young_worker") {
        localStorage.setItem("contractFormType", "edit");
        employmentStore.state.formPageType = "edit";
        router.push({
          name: "YoungWorkerContractStepTwo",
        });
      } else if (editType.value === "construction_day_worker") {
        localStorage.setItem("contractFormType", "edit");
        employmentStore.state.formPageType = "edit";
        router.push({
          name: "ConstractionDayWorkerContractStepTwo",
        });
      } else if (editType.value === "parttime") {
        localStorage.setItem("contractFormType", "edit");
        employmentStore.state.formPageType = "edit";
        router.push({
          name: "PartTimeWorkerContractStepTwo",
        });
      } else {
        localStorage.setItem("contractFormType", "edit");
        employmentStore.state.formPageType = "edit";
        router.push({
          name: "ParentalAuthorityConsentFormStepTwo",
        });
      }
    };

    // function downloadPdf() {
    //   // var link = document.createElement("a");
    //   //     link.download = "Contract";
    //   //     // Construct the URI
    //   //     link.href = pdfdUrl.value;
    //   //     document.body.appendChild(link);
    //   //     setTimeout(function() {
    //   //          link.click();
    //   //          // Cleanup the DOM
    //   //          document.body.removeChild(link);
    //   //      }, 100);
    //   // axios
    //   //   .get(`contract/pdf-generate/${pageId}`)
    //   //   .then((response) => {
    //   //     console.log(response);
    //   //     saveAs(pdfContent.value, "contract.pdf");
    //   //   })
    //   //   .catch(console.error);
    // }

    function contractDownload() {
      let data = {
        type: "pdfDownload",
        url: pdfdUrl,
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // alert("pdfDownload");
    }

    const redirectPageTo = () => {
      router.push({
          name: "LaborContract",
        });
    }

    return {
      pdfContent,
      pdfdUrl,
      rejectModal,
      pageId,
      defaultEmail,
      pageType,
      rejectReason,
      setReject,
      approveContract,
      openEmailModal,
      setEmail,
      setOpenSignModal,
      setEdit,
      // downloadPdf,
      contractDownload,
      config,
      commonStore,
      employmentStore,
      authStore,
      openSignModal,
      isPlatMobile,
      redirectPageTo,
    };
  },
};
</script>
<style lang="scss" scoped>
.frame_holder {
  min-height: 700px;
}
</style>
