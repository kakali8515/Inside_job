<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">공고 등록 완료</h3>
        <p>
            선택한 상품을 적용하여 공고가 등록되었습니다.
        </p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
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
    props: { isModal: Boolean },
    components: { CustomModal },
  };
  </script>