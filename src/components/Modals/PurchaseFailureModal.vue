<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">구매 불가능</h3>
        <p>
          보유중인 초코가 부족하여 구매가 불가능합니다.<br>
초코 충전 후 다시 시도해주시기 바랍니다.
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