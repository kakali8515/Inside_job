<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        
        <h3 v-if="fromPage === 'notification'" class="sub-heading lg">오류</h3>
        <h3 v-if="fromPage === 'paidProductPurchase'" class="sub-heading lg">뒤로가기</h3>
        <h3 v-if="fromPage === 'addJobPost'" class="sub-heading lg">작성 취소</h3>


        <p v-if="fromPage == 'notification'" class="close-job-modal-text">
          삭제된 이력서 입니다.
        </p>

        <p v-if="fromPage == 'paidProductPurchase'" class="close-job-modal-text">
            선택한 상품은 저장되지 않습니다.
        </p>
        
        <p v-if="fromPage === 'addJobPost'" class="close-job-modal-text">
          공고 작성을 취소하시겠습니까? <br>
          작성 중인 내용은 저장되지 않습니다.
        </p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button v-if="fromPage !== 'notification'"
            style="margin-right: 8px; width: 48%"
            class="btn btn-primary-outline"
            @click="$emit('closeConfirm')"
          >
          취소
          </button>
          <button
            style="width: 48%"
            class="btn btn-primary"
            @click="$emit('confirm')"
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
    props: { isModal: Boolean, fromPage: String},
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  