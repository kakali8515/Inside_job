<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <!-- <h3 class="sub-heading lg">별점 평가 취소</h3> -->
      <p>
        정말로 삭제 하시겠습니까?
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
          @click="$emit('conifrmModel')"
        >
          완료
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
  