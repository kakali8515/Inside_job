<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">AI 추천 조건 초기화</h3>
      <p>설정하신 조건을 초기화하시겠습니까?</p>
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
          @click="$emit('confirm')"
        >
          초기화
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