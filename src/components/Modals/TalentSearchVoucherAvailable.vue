<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">인재 검색권 사용 가능</h3>
      <p>
        인재 검색권을 사용해 인재의 정보 확인 할 수 있습니다. 해당 인재의
        이력서를 확인하시겠습니까?
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
          @click="$emit('confirmViewResume')"
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