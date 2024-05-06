<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">푸시 알람</h3>
        <p>푸시 알림을 업데이트하시겠습니까?</p>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button
            style="margin-right: 8px; width: 48%"
            class="btn btn-primary-outline"
            @click="
              () => {
                $emit('closeModal');
              }
            "
          >
            취소
          </button>
          <button
            style="width: 48%"
            class="btn btn-primary lg"
            @click="
              () => {
                $emit('confirmPush');
              }
            "
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
  
  <style></style>