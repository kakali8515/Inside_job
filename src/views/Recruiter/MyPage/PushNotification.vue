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
          <h4>공고 알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input type="checkbox" v-model="announcement" @change="setForAnnouncement" />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>공고 상태 알림 (게재, 마감)</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="job_status_notification" @change="setForStatus" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>지원자 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="candidate_notification" @change="setForCandidate" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>근로계약서 체결 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="notice_of_conclusion_of_labor_contract" @change="setForlaborContract" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>사직서 수신 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="receive_resignation_letter" @change="setForResignation" />
                <small></small>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <PushNotification :isModal="isPushNotificationModal" @closeModal="close" @confirmPush="setPushNotification" />
  </div>

  <div class="back-wh border-top border-f2">
    <div class="container">
      <div class="push-noti-wrapper pt-32 pb-32">
        <div class="heading">
          <h4>상품알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input type="checkbox" v-model="product_notification" @change="setforproductnotification" />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>공고 유형</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="announcement_type_end_notification" @change="setforannoucementtype" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>업글</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="upgle_end_notification" @change="setforupgle" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>인재 검색</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="talent_search_end_notification" @change="setfortalentsearch" />
                <small></small>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="back-wh border-top border-f2">
    <div class="container">
      <div class="push-noti-wrapper pt-32 pb-32">
        <div class="heading">
          <h4>기타알림</h4>
          <div class="push-btn-wrap">
            <label class="switch">
              <input type="checkbox" v-model="other_notifications" @change="setforothernotifications" />
              <small></small>
            </label>
          </div>
        </div>
        <ul class="noti-list">
          <li>
            <label>노무 답변 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="labor_answers" @change="setforlaboranswers" />
                <small></small>
              </label>
            </div>
          </li>
          <li>
            <label>공지 알림</label>
            <div class="push-btn-wrap">
              <label class="switch">
                <input type="checkbox" v-model="new_notice_notifiaction" @change="setfornewnoticenotification" />
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
import { RecruiterPushnotification } from "@/service/API/RecruiterPushnotification.js";
import PushNotification from "../../../components/Modals/PushNotification.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import validateCompany from "@/Validations/editCompany.js";
import InnerHeader from "@/components/innerHeader.vue";
const router = useRouter();
const isPushNotificationModal = ref(false);
const receive_resignation_letter = ref(null);
const notice_of_conclusion_of_labor_contract = ref(null);
const job_status_notification = ref(null);
const candidate_notification = ref(null);
const announcement = ref(null);
const product_notification = ref(null);
const announcement_type_end_notification = ref(null);
const upgle_end_notification = ref(null);
const talent_search_end_notification = ref(null);
const other_notifications = ref(null);
const labor_answers = ref(null);
const new_notice_notifiaction = ref(null);
const iniTialUpdate = async function () {
  let forAll = {
    job_status_notification: "1",
    receive_resignation_letter: "1",
    notice_of_conclusion_of_labor_contract: "1",
    candidate_notification: "1",
  };
  let individual = {
    job_status_notification: `${job_status_notification.value ? 1 : 0}`,
    receive_resignation_letter: `${receive_resignation_letter.value ? 1 : 0}`,
    notice_of_conclusion_of_labor_contract: `${notice_of_conclusion_of_labor_contract.value ? 1 : 0
      }`,
    candidate_notification: `${candidate_notification.value ? 1 : 0}`,
  };
  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.announcement == 1) {
      announcement.value = res.data.announcement == 1 ? true : false;

      job_status_notification.value =
        res.data.job_status_notification == 1 ? true : false;

      candidate_notification.value =
        res.data.candidate_notification == 1 ? true : false;

      notice_of_conclusion_of_labor_contract.value =
        res.data.notice_of_conclusion_of_labor_contract == 1 ? true : false;

      receive_resignation_letter.value =
        res.data.receive_resignation_letter == 1 ? true : false;
    } else if (res.data.announcement == 0) {
      announcement.value = res.data.announcement == 1 ? true : false;

      job_status_notification.value =
        res.data.job_status_notification == 1 ? true : false;

      candidate_notification.value =
        res.data.candidate_notification == 1 ? true : false;

      notice_of_conclusion_of_labor_contract.value =
        res.data.notice_of_conclusion_of_labor_contract == 1 ? true : false;

      receive_resignation_letter.value =
        res.data.receive_resignation_letter == 1 ? true : false;
    }
  });
};

const iniTialProductUpdate = async function () {
  let forAll = {
    announcement_type_end_notification: "1",
    upgle_end_notification: "1",
    talent_search_end_notification: "1",
  };
  let individual = {
    announcement_type_end_notification: `${announcement_type_end_notification.value ? 1 : 0
      }`,
    upgle_end_notification: `${upgle_end_notification.value ? 1 : 0}`,
    talent_search_end_notification: `${talent_search_end_notification.value ? 1 : 0
      }`,
  };

  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.product_notification == 1) {
      product_notification.value =
        res.data.product_notification == 1 ? true : false;

      announcement_type_end_notification.value =
        res.data.announcement_type_end_notification == 1 ? true : false;

      upgle_end_notification.value =
        res.data.upgle_end_notification == 1 ? true : false;

      talent_search_end_notification.value =
        res.data.talent_search_end_notification == 1 ? true : false;
    } else if (res.data.product_notification == 0) {
      product_notification.value =
        res.data.product_notification == 1 ? true : false;

      announcement_type_end_notification.value =
        res.data.announcement_type_end_notification == 1 ? true : false;

      upgle_end_notification.value =
        res.data.upgle_end_notification == 1 ? true : false;

      talent_search_end_notification.value =
        res.data.talent_search_end_notification == 1 ? true : false;
    }
  });
};

const iniTialOtherUpdate = async function () {
  let forAll = {
    labor_answers: "1",
    new_notice_notifiaction: "1",
  };
  let individual = {
    labor_answers: `${labor_answers.value ? 1 : 0}`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };

  await axios.get(`/user/view-pushnotification`).then((res) => {
    if (res.data.other_notifications == 1) {
      other_notifications.value =
        res.data.other_notifications == 1 ? true : false;

      labor_answers.value = res.data.labor_answers == 1 ? true : false;

      new_notice_notifiaction.value =
        res.data.new_notice_notifiaction == 1 ? true : false;
    } else if (res.data.other_notifications == 0) {
      other_notifications.value =
        res.data.other_notifications == 1 ? true : false;

      labor_answers.value = res.data.labor_answers == 1 ? true : false;

      new_notice_notifiaction.value =
        res.data.new_notice_notifiaction == 1 ? true : false;
    }
  });
};

const getPushNotification = async function () {
  await axios
    .get(`/user/view-pushnotification`)
    .then((res) => { })
    .catch((err) => err);
};
onMounted(() => {
  iniTialUpdate();
  iniTialProductUpdate();
  iniTialOtherUpdate();
});

const setForStatus = function () {
  let validationData = {
    announcement: `${announcement.value ? 1 : 0}`,
    candidate_notification: `${candidate_notification.value ? 1 : 0}`,
    job_status_notification: `${job_status_notification.value ? 1 : 0}`,
    receive_resignation_letter: `${receive_resignation_letter.value ? 1 : 0}`,
    notice_of_conclusion_of_labor_contract: `${notice_of_conclusion_of_labor_contract.value ? 1 : 0
      }`,
  };
  
  if(job_status_notification.value == true){
    announcement.value = true
    validationData.announcement = '1';
  } else {
    if(!candidate_notification.value && !job_status_notification.value && !receive_resignation_letter.value && !notice_of_conclusion_of_labor_contract.value) {
      announcement.value = false;
      validationData.announcement = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllChange()
};

const setForCandidate = function () {
  let validationData = {
    announcement: `${announcement.value ? 1 : 0}`,
    job_status_notification: `${job_status_notification.value ? 1 : 0}`,
    candidate_notification: `${candidate_notification.value ? 1 : 0}`,
    receive_resignation_letter: `${receive_resignation_letter.value ? 1 : 0}`,
    notice_of_conclusion_of_labor_contract: `${notice_of_conclusion_of_labor_contract.value ? 1 : 0
      }`,
  };
  if(candidate_notification.value){
    announcement.value = true
    validationData.announcement = '1';
  } else {
    if(!candidate_notification.value && !job_status_notification.value && !receive_resignation_letter.value && !notice_of_conclusion_of_labor_contract.value) {
      announcement.value = false;
      validationData.announcement = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllChange()
};
const setForlaborContract = function () {
  let validationData = {
    announcement: `${announcement.value ? 1 : 0}`,
    job_status_notification: `${job_status_notification.value ? 1 : 0}`,
    receive_resignation_letter: `${receive_resignation_letter.value ? 1 : 0}`,
    notice_of_conclusion_of_labor_contract: `${notice_of_conclusion_of_labor_contract.value ? 1 : 0
      }`,
    candidate_notification: `${candidate_notification.value ? 1 : 0}`,
  };
  if(notice_of_conclusion_of_labor_contract.value){
    announcement.value = true
    validationData.announcement = '1';
  } else {
    if(!candidate_notification.value && !job_status_notification.value && !receive_resignation_letter.value && !notice_of_conclusion_of_labor_contract.value) {
      announcement.value = false;
      validationData.announcement = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllChange()
};

const setForResignation = function () {
  let validationData = {
    announcement: `${announcement.value ? 1 : 0}`,
    job_status_notification: `${job_status_notification.value ? 1 : 0}`,
    receive_resignation_letter: `${receive_resignation_letter.value ? 1 : 0}`,
    candidate_notification: `${candidate_notification.value ? 1 : 0}`,
    notice_of_conclusion_of_labor_contract: `${notice_of_conclusion_of_labor_contract.value ? 1 : 0
      }`,
  };
  if(receive_resignation_letter.value){
    announcement.value = true
    validationData.announcement = '1';
  } else {
    if(!candidate_notification.value && !job_status_notification.value && !receive_resignation_letter.value && !notice_of_conclusion_of_labor_contract.value) {
      announcement.value = false;
      validationData.announcement = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllChange()
};

const setforannoucementtype = function () {
  let validationData = {
    product_notification: `${product_notification.value ? 1 : 0}`,
    announcement_type_end_notification: `${announcement_type_end_notification.value ? 1 : 0
      }`,
    upgle_end_notification: `${upgle_end_notification.value ? 1 : 0}`,
    talent_search_end_notification: `${talent_search_end_notification.value ? 1 : 0
      }`,
  };
  if(announcement_type_end_notification.value){
    product_notification.value = true
    validationData.product_notification = '1';
  } else {
    if(!announcement_type_end_notification.value && !talent_search_end_notification.value && !upgle_end_notification.value) {
      product_notification.value = false;
      validationData.product_notification = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllProduct()
};

const setforupgle = function () {
  let validationData = {
    product_notification: `${product_notification.value ? 1 : 0}`,
    announcement_type_end_notification: `${announcement_type_end_notification.value ? 1 : 0
      }`,
    upgle_end_notification: `${upgle_end_notification.value ? 1 : 0}`,
    talent_search_end_notification: `${talent_search_end_notification.value ? 1 : 0
      }`,
  };
  if(upgle_end_notification.value){
    product_notification.value = true
    validationData.product_notification = '1';
  } else {
    if(!announcement_type_end_notification.value && !talent_search_end_notification.value && !upgle_end_notification.value) {
      product_notification.value = false;
      validationData.product_notification = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllProduct()
};

const setfortalentsearch = function () {
  let validationData = {
    product_notification: `${product_notification.value ? 1 : 0}`,
    announcement_type_end_notification: `${announcement_type_end_notification.value ? 1 : 0
      }`,
    upgle_end_notification: `${upgle_end_notification.value ? 1 : 0}`,
    talent_search_end_notification: `${talent_search_end_notification.value ? 1 : 0
      }`,
  };
  if(talent_search_end_notification.value){
    product_notification.value = true
    validationData.product_notification = '1';
  } else {
    if(!announcement_type_end_notification.value && !talent_search_end_notification.value && !upgle_end_notification.value) {
      product_notification.value = false;
      validationData.product_notification = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllProduct()
};

const setforlaboranswers = function () {
  let validationData = {
    other_notifications: `${other_notifications.value ? 1 : 0}`,
    labor_answers: `${labor_answers.value ? 1 : 0}`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  if(labor_answers.value){
    other_notifications.value = true
    validationData.other_notifications = '1';
  } else {
    if(!labor_answers.value && !new_notice_notifiaction.value) {
      other_notifications.value = false;
      validationData.other_notifications = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllOther()
};

const setfornewnoticenotification = function () {
  let validationData = {
    other_notifications: `${other_notifications.value ? 1 : 0}`,
    labor_answers: `${labor_answers.value ? 1 : 0}`,
    new_notice_notifiaction: `${new_notice_notifiaction.value ? 1 : 0}`,
  };
  if(new_notice_notifiaction.value){
    other_notifications.value = true
    validationData.other_notifications = '1';
  } else {
    if(!new_notice_notifiaction.value && !labor_answers.value) {
      other_notifications.value = false;
      validationData.other_notifications = '0';
    }
  }
  RecruiterPushnotification.updatePushnotificationDeatils(validationData);
  //selectAllOther()
};

const setForAnnouncement = function () {
  job_status_notification.value = announcement.value;
  receive_resignation_letter.value = announcement.value;
  notice_of_conclusion_of_labor_contract.value = announcement.value;
  candidate_notification.value = announcement.value;
  if (announcement.value == true) {
    let selectAll = {
      job_status_notification: "1",
      receive_resignation_letter: "1",
      notice_of_conclusion_of_labor_contract: "1",
      candidate_notification: "1",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      job_status_notification: "0",
      receive_resignation_letter: "0",
      notice_of_conclusion_of_labor_contract: "0",
      candidate_notification: "0",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};

// const selectAllChange = function () {
//   if (job_status_notification.value && notice_of_conclusion_of_labor_contract.value && candidate_notification.value && receive_resignation_letter.value) {
//     announcement.value = true
//   } else {
//     announcement.value = false
//   }
// }

const selectAllProduct = function () {
  if ( announcement_type_end_notification.value && upgle_end_notification.value && talent_search_end_notification.value) {
    product_notification.value = true
  } else {
    product_notification.value = false
  }
}

const selectAllOther = function () {
  if ( labor_answers.value && new_notice_notifiaction.value) {
    other_notifications.value = true
  } else {
    other_notifications.value = false
  }
}
const setforproductnotification = function () {
  announcement_type_end_notification.value = product_notification.value;
  upgle_end_notification.value = product_notification.value;
  talent_search_end_notification.value = product_notification.value;
  if (product_notification.value == true) {
    let selectAll = {
      announcement_type_end_notification: "1",
      upgle_end_notification: "1",
      talent_search_end_notification: "1",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      announcement_type_end_notification: "0",
      upgle_end_notification: "0",
      talent_search_end_notification: "0",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};

const setforothernotifications = function () {
  labor_answers.value = other_notifications.value;
  new_notice_notifiaction.value = other_notifications.value;
  if (other_notifications.value == true) {
    let selectAll = {
      labor_answers: "1",
      new_notice_notifiaction: "1",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(selectAll);
  } else {
    let deselectAll = {
      labor_answers: "0",
      new_notice_notifiaction: "0",
    };
    RecruiterPushnotification.updatePushnotificationDeatils(deselectAll);
  }
};

const setPushNotification = () => {
  isPushNotificationModal.value = false;
  router.push({ name: "RecruiterPushNotification" });
  window.location.reload();
};

const close = () => {
  isPushNotificationModal.value = false;
};
</script>