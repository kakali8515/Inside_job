<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <h3 class="sub-heading lg">법적 문제에 대한 동의</h3>
        <p>
            채용 시 남녀를 차별하거나, 여성근로자를 채용할 때 직무수행에 불필요한 용모,키,체중 등의 신체조건 및 미혼조건을 제시 또는 요구하는 경우 남녀고용평등법 위반에 해당되어 500만원 이하의 벌금이 부과될 수 있습니다.
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
          동의
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
  