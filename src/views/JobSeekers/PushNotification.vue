<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="PUSH 알림" />
      </div>
    </div>

    <div class="container">
      <div class="push-noti-wrapper pb-32">
        <div class="heading">
          <h4>채용정보알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input
                type="checkbox"
                v-model="job_information_notification"
                @change="setforjobinformation"
              />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>위치 기반 안내</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="location_based_guidance"
                  @change="setforlocationbased"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>포지션 제안 푸시알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="position_proposal_notification"
                  @change="setforpositionproposal"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>맞춤알바 (AI추천) 정보알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="customized_parttime_notification"
                  @change="setforcustomizedparttime"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>스크랩공고 마감 전 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="before_closing_scrap_notification"
                  @change="setforbeforeclosing"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>관심기업 공고 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="announcement_interested_notification"
                  @change="setforannouncement"
                />
                <small></small>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <PushNotification
      :isModal="isPushNotificationModal"
      @closeModal="close"
      @confirmPush="setPushNotification"
    />
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="push-noti-wrapper pt-32 pb-32">
        <div class="heading">
          <h4>구직활동알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input
                type="checkbox"
                v-model="job_search_notification"
                @change="setforjobsearch"
              />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>근로계약서 수신 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="receive_employment_contract_notification"
                  @change="setforreceiveemploymet"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>지원이력서 열람 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="application_reading_notification"
                  @change="setforapplication"
                />
                <small></small>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="back-wh border-top">
    <div class="container">
      <div class="push-noti-wrapper pt-32 pb-32">
        <div class="heading">
          <h4>기타알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input
                type="checkbox"
                v-model="other_notification"
                @change="setforothernotification"
              />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>노무 답변 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="labor_answers_notification"
                  @change="setforlaboranswers"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>사직서 수리 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="resignation_letter_confirm_notification"
                  @change="setforresignationletter"
                />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>공지 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="new_notice_notifiaction"
                  @change="setfornewnotice"
                />
                <small></small>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { JobSeekerPushnotification } from "@/service/API/JobSeekerPushnotification.js";
import PushNotification from "../../components/Modals/PushNotification.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import validateCompany from "@/Validations/editCompany.js";
import InnerHeader from "@/components/innerHeader.vue";
const router = useRouter();
const isPushNotificationModal = ref(false);
const job_information_notification = ref(null);
const location_based_guidance = ref(null);
const position_proposal_notification = ref(null);
const customized_parttime_notification = ref(null);
const before_closing_scrap_notification = ref(null);
const announcement_interested_notification = ref(null);
const job_search_notification = ref(null);
const receive_employment_contract_notification = ref(null);
const application_reading_notification = ref(null);
const other_notification = ref(null);
const labor_answers_notification = ref(null);
const resignation_letter_confirm_notification = ref(null);
const new_notice_notifiaction = ref(null);

const iniTialUpdate = async function () {
  let forAll = {
    location_based_guidance: "1",
    position_proposal_notification: "1",
    customized_parttime_notification: "1",
    before_closing_scrap_notification: "1",
    announcement_interested_notification: "1",
  };
  let individual = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
  };
  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.job_information_notification == 1) {
      job_information_notification.value =
        res.data.job_information_notification == 1 ? true : false;

      location_based_guidance.value =
        res.data.location_based_guidance == 1 ? true : false;

      position_proposal_notification.value =
        res.data.position_proposal_notification == 1 ? true : false;

      customized_parttime_notification.value =
        res.data.customized_parttime_notification == 1 ? true : false;

      before_closing_scrap_notification.value =
        res.data.before_closing_scrap_notification == 1 ? true : false;

      announcement_interested_notification.value =
        res.data.announcement_interested_notification == 1 ? true : false;
    } else if (res.data.job_information_notification == 0) {
      job_information_notification.value =
        res.data.job_information_notification == 1 ? true : false;

      location_based_guidance.value =
        res.data.location_based_guidance == 1 ? true : false;

      position_proposal_notification.value =
        res.data.position_proposal_notification == 1 ? true : false;

      customized_parttime_notification.value =
        res.data.customized_parttime_notification == 1 ? true : false;

      before_closing_scrap_notification.value =
        res.data.before_closing_scrap_notification == 1 ? true : false;

      announcement_interested_notification.value =
        res.data.announcement_interested_notification == 1 ? true : false;
    }
  });
};

const iniTialothernotificationUpdate = async function () {
  let forAll = {
    labor_answers_notification: "1",
    resignation_letter_confirm_notification: "1",
    new_notice_notifiaction: "1",
  };
  let individual = {
    labor_answers_notification: `${labor_answers_notification.value ? 1 : 0}`,
    resignation_letter_confirm_notification: `${
      resignation_letter_confirm_notification.value ? 1 : 0
    }`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.other_notification == 1) {
      other_notification.value =
        res.data.other_notification == 1 ? true : false;

      labor_answers_notification.value =
        res.data.labor_answers_notification == 1 ? true : false;

      resignation_letter_confirm_notification.value =
        res.data.resignation_letter_confirm_notification == 1 ? true : false;

      new_notice_notifiaction.value =
        res.data.new_notice_notifiaction == 1 ? true : false;
    } else if (res.data.other_notification == 0) {
      other_notification.value =
        res.data.other_notification == 1 ? true : false;

      labor_answers_notification.value =
        res.data.labor_answers_notification == 1 ? true : false;

      resignation_letter_confirm_notification.value =
        res.data.resignation_letter_confirm_notification == 1 ? true : false;

      new_notice_notifiaction.value =
        res.data.new_notice_notifiaction == 1 ? true : false;
    }
  });
};

const iniTialjobsearchUpdate = async function () {
  let forAll = {
    receive_employment_contract_notification: "1",
    application_reading_notification: "1",
  };
  let individual = {
    receive_employment_contract_notification: `${
      receive_employment_contract_notification.value ? 1 : 0
    }`,
    application_reading_notification: `${
      application_reading_notification.value ? 1 : 0
    }`,
  };
  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.job_search_notification == 1) {
      job_search_notification.value =
        res.data.job_search_notification == 1 ? true : false;

      receive_employment_contract_notification.value =
        res.data.receive_employment_contract_notification == 1 ? true : false;

      application_reading_notification.value =
        res.data.application_reading_notification == 1 ? true : false;
    } else if (res.data.job_search_notification == 0) {
      job_search_notification.value =
        res.data.job_search_notification == 1 ? true : false;

      receive_employment_contract_notification.value =
        res.data.receive_employment_contract_notification == 1 ? true : false;

      application_reading_notification.value =
        res.data.application_reading_notification == 1 ? true : false;
    }
  });
};

const getPushNotification = async function () {
  await axios
    .get(`/user/view-pushnotification`)
    .then((res) => {})
    .catch((err) => err);
};

onMounted(() => {
  iniTialUpdate();
  iniTialjobsearchUpdate();
  iniTialothernotificationUpdate();
});

const setforannouncement = function () {
  let validationData = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
    job_information_notification: `${
      job_information_notification.value ? 1 : 0
    }`,
  };
  if(announcement_interested_notification.value){
    job_information_notification.value = true
    validationData.job_information_notification = '1';
  } else {
    if(!location_based_guidance.value && !position_proposal_notification.value && !customized_parttime_notification.value && !before_closing_scrap_notification.value && !announcement_interested_notification.value) {
      job_information_notification.value = false;
      validationData.job_information_notification = '0';
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobInfo()
};

const setforbeforeclosing = function () {
  let validationData = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
    job_information_notification: `${
      job_information_notification.value ? 1 : 0
    }`,
  };
  if(before_closing_scrap_notification.value){ 
    job_information_notification.value = true
    validationData.job_information_notification = '1';
  } else {
    if(!location_based_guidance.value && !position_proposal_notification.value && !customized_parttime_notification.value && !before_closing_scrap_notification.value && !announcement_interested_notification.value) {
      job_information_notification.value = false;
      validationData.job_information_notification = '0';
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobInfo()
};

const setforcustomizedparttime = function () {
  let validationData = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
    job_information_notification: `${
      job_information_notification.value ? 1 : 0
    }`,
  };
  if(customized_parttime_notification.value){
    job_information_notification.value = true
    validationData.job_information_notification = '1';
  } else {
    if(!location_based_guidance.value && !position_proposal_notification.value && !customized_parttime_notification.value && !before_closing_scrap_notification.value && !announcement_interested_notification.value) {
      job_information_notification.value = false;
      validationData.job_information_notification = '0';
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobInfo()
};

const setforpositionproposal = function () {
  let validationData = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
    job_information_notification: `${
      job_information_notification.value ? 1 : 0
    }`,
  };
  if(position_proposal_notification.value){
    job_information_notification.value = true
    validationData.job_information_notification = '1';
  } else {
    if(!location_based_guidance.value && !position_proposal_notification.value && !customized_parttime_notification.value && !before_closing_scrap_notification.value && !announcement_interested_notification.value) {
      job_information_notification.value = false;
      validationData.job_information_notification = '0';
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobInfo()
};

const setforlocationbased = function () {
  let validationData = {
    location_based_guidance: `${location_based_guidance.value ? 1 : 0}`,
    position_proposal_notification: `${
      position_proposal_notification.value ? 1 : 0
    }`,
    customized_parttime_notification: `${
      customized_parttime_notification.value ? 1 : 0
    }`,
    before_closing_scrap_notification: `${
      before_closing_scrap_notification.value ? 1 : 0
    }`,
    announcement_interested_notification: `${
      announcement_interested_notification.value ? 1 : 0
    }`,
    job_information_notification: `${
      job_information_notification.value ? 1 : 0
    }`,
  };
  if(location_based_guidance.value){
    job_information_notification.value = true
    validationData.job_information_notification = '1';
  } else {
    if(!location_based_guidance.value && !position_proposal_notification.value && !customized_parttime_notification.value && !before_closing_scrap_notification.value && !announcement_interested_notification.value) {
      job_information_notification.value = false;
      validationData.job_information_notification = '0';
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobInfo()
};

const setforapplication = function () {
  let validationData = {
    receive_employment_contract_notification: `${
      receive_employment_contract_notification.value ? 1 : 0
    }`,
    application_reading_notification: `${
      application_reading_notification.value ? 1 : 0
    }`,
  };
  if(application_reading_notification.value){
    job_search_notification.value = true
  } else {
    if(!application_reading_notification.value && !receive_employment_contract_notification.value) {
      job_search_notification.value = false
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobNotification()
};

const setforresignationletter = function () {
  let validationData = {
    labor_answers_notification: `${labor_answers_notification.value ? 1 : 0}`,
    resignation_letter_confirm_notification: `${
      resignation_letter_confirm_notification.value ? 1 : 0
    }`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  if(resignation_letter_confirm_notification.value){
    other_notification.value = true
  } else {
    if(!labor_answers_notification.value && !resignation_letter_confirm_notification.value && !new_notice_notifiaction.value) {
      other_notification.value = false
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllOtherNotification()
};

const setfornewnotice = function () {
  let validationData = {
    labor_answers_notification: `${labor_answers_notification.value ? 1 : 0}`,
    resignation_letter_confirm_notification: `${
      resignation_letter_confirm_notification.value ? 1 : 0
    }`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  if(new_notice_notifiaction.value){
    other_notification.value = true
  } else {
    if(!labor_answers_notification.value && !resignation_letter_confirm_notification.value && !new_notice_notifiaction.value) {
      other_notification.value = false
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllOtherNotification()
};

const setforlaboranswers = function () {
  let validationData = {
    labor_answers_notification: `${labor_answers_notification.value ? 1 : 0}`,
    resignation_letter_confirm_notification: `${
      resignation_letter_confirm_notification.value ? 1 : 0
    }`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  if(labor_answers_notification.value){
    other_notification.value = true
  } else {
    if(!labor_answers_notification.value && !resignation_letter_confirm_notification.value && !new_notice_notifiaction.value) {
      other_notification.value = false
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllOtherNotification()
};

const setforreceiveemploymet = function () {
  let validationData = {
    receive_employment_contract_notification: `${
      receive_employment_contract_notification.value ? 1 : 0
    }`,
    application_reading_notification: `${
      application_reading_notification.value ? 1 : 0
    }`,
  };
  if(receive_employment_contract_notification.value){
    job_search_notification.value = true
  } else {
    if(!application_reading_notification.value && !receive_employment_contract_notification.value) {
      job_search_notification.value = false
    }
  }
  JobSeekerPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllJobNotification()
};

const setforothernotification = function () {
  labor_answers_notification.value = other_notification.value;
  resignation_letter_confirm_notification.value = other_notification.value;
  new_notice_notifiaction.value = other_notification.value;
  if (other_notification.value == true) {
    let selectAll = {
      labor_answers_notification: "1",
      resignation_letter_confirm_notification: "1",
      new_notice_notifiaction: "1",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      labor_answers_notification: "0",
      resignation_letter_confirm_notification: "0",
      new_notice_notifiaction: "0",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};

const setforjobsearch = function () {
  receive_employment_contract_notification.value =
    job_search_notification.value;
  application_reading_notification.value = job_search_notification.value;

  if (job_search_notification.value == true) {
    let selectAll = {
      receive_employment_contract_notification: "1",
      application_reading_notification: "1",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      receive_employment_contract_notification: "0",
      application_reading_notification: "0",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};

const setforjobinformation = function () {
  location_based_guidance.value = job_information_notification.value;
  position_proposal_notification.value = job_information_notification.value;
  customized_parttime_notification.value = job_information_notification.value;
  before_closing_scrap_notification.value = job_information_notification.value;
  announcement_interested_notification.value =
    job_information_notification.value;
  if (job_information_notification.value == true) {
    let selectAll = {
      location_based_guidance: "1",
      position_proposal_notification: "1",
      customized_parttime_notification: "1",
      before_closing_scrap_notification: "1",
      announcement_interested_notification: "1",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      location_based_guidance: "0",
      position_proposal_notification: "0",
      customized_parttime_notification: "0",
      before_closing_scrap_notification: "0",
      announcement_interested_notification: "0",
    };
    JobSeekerPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};
// const selectAllJobInfo = function () {
//   if ( location_based_guidance.value && position_proposal_notification.value && customized_parttime_notification.value && before_closing_scrap_notification.value && announcement_interested_notification.value) {
//     job_information_notification.value = true
//   } else {
//     job_information_notification.value = false
//   }
// }
const selectAllJobNotification = function () {
  if ( receive_employment_contract_notification.value && application_reading_notification.value ) {
    job_search_notification.value = true
  } else {
    job_search_notification.value = false
  }
}
const selectAllOtherNotification = function () {
  if ( labor_answers_notification.value && resignation_letter_confirm_notification.value && new_notice_notifiaction.value) {
    other_notification.value = true
  } else {
    other_notification.value = false
  }
}

const setPushNotification = () => {
  isPushNotificationModal.value = false;
  router.push({ name: "PushNotification" });
  window.location.reload();
};

const close = () => {
  isPushNotificationModal.value = false;
};
</script>
  