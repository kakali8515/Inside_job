<template>
    <CustomModal v-if="isModal == true" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">이력서 열람 불가</h3>
        <p>지원자가 지원을 취소하여 
이력서를 열람하실 수 없습니다.</p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button class="btn btn-primary lg" @click="$emit('conifrmModel')">
            확인
          </button>
        </div>
      </template>
    </CustomModal>
  </template>
  
  <script>
  import CustomModal from "@/components/Utils/CustomModal.vue";
  export default {
    props: { isModal: Boolean },
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  