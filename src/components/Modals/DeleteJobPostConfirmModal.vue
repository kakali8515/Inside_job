<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">공고 삭제</h3>
        <p class="close-job-modal-text">
            해당 공고를 삭제하시겠습니까?
            <br>
<span class="red">게재 준비중</span>인 공고에 적용하신 유료상품은
사용하지 않은 상품으로 간주되어 <span class="red">반환</span>됩니다.
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
    props: { isModal: Boolean},
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  