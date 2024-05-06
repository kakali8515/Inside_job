<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">자동 채용공고 등록 신청 완료</h3>
        <p class="close-job-modal-text">
            등록 신청이 완료되었습니다.
            <br>
        <span>등록 완료까지 최소 3일 정도가 소요됩니다.</span>
        </p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button v-if="fromPage !== 'history'"
            style="margin-right: 8px; width: 48%"
            class="btn btn-primary-outline"
            @click="$emit('confirm')"
          >
          신청 목록
          </button>
          <div class="btn-grp" v-if="fromPage === 'history'">
          <button
            class="btn btn-primary lg"
            @click="$emit('confirm')">
            확인
          </button>
          </div>
          <button v-if="fromPage !== 'history'"
            style="width: 48%"
            class="btn btn-primary"
            @click="$emit('closeConfirm')"
          >
          확인
          </button>
        </div>
      </template>
    </CustomModal>
  </template>
  
  <script>
  import CustomModal from "@/components/Utils/CustomModal.vue";
  export default {
    props: { isModal: Boolean, 
      fromPage: {
            type: String,
            default: "default"
        }},
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  