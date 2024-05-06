<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <!-- <h3 class="sub-heading lg">업글 구매</h3> -->
        <p>
          필수 항목에 모두 동의해 주세요.
        </p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button
            class="btn btn-primary lg"
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
  