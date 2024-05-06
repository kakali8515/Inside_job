<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">사직서 수리</h3>
        <p>
            퇴사자가 작성한 사직서를 확인하였으며<br />
            채용자의 업무 최종 종료하시겠습니까?
        </p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button
            style="margin-right: 8px; width: 48%"
            class="btn btn-primary-outline"
            @click="$emit('closeModal')"
          >
          취소
          </button>
          <button
            style="width: 48%"
            class="btn btn-primary"
            @click="$emit('deleteConfirm')"
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
    props: { isModal: Boolean, emailId: String },
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  