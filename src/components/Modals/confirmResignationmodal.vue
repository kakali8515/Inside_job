<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">사직서 작성 완료</h3>
        <p>
          사직서는 수정이 불가능합니다.<br />
          작성을 완료하시겠습니까?
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
          완료
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
  