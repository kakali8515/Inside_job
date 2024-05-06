<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">공고 마감</h3>
        <p class="close-job-modal-text">
            해당 공고를 마감하시겠습니까? <br>
<span class="red">게재중인 공고</span>에 적용하신 유료상품은
사용한 상품으로 간주되어 반환이 <span class="red">불가능 합니다.</span>
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
    props: { isModal: Boolean},
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  