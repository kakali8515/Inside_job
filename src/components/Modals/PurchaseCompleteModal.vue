<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">구매 완료</h3>
        <p v-if="fromPage === 'afterJobPost'">
          구매가 완료되었습니다.<br>
          구매하신 유료상품을 적용해 공고 등록을 완료했습니다.
        </p>
        <p v-else>
          구매가 완료되었습니다.
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
    props: { isModal: Boolean, fromPage: String },
    components: { CustomModal },
  };
  </script>