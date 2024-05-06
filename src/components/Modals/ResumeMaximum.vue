<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">이력서 작성 불가능</h3>
      <p>
        이력서는 최대 5개까지만 작성 가능합니다.<br />
        이력서를 새로 등록하려면 기존의 이력서<br />
        삭제 후 다시 시도해주세요.
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="$emit('closeModal')"
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
  props: { isModal: Boolean, emailId: String },
  components: { CustomModal },
};
</script>

<style></style>
