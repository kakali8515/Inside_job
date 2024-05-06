<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">미작성 항목</h3>
      <p>
        작성하지 않은 항목이 있습니다.<br />
        필수항목을 기재해주세요.
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="
            () => {
              $emit('closeModal', false);
            }
          "
        >
        확인
        <!-- 기재하기 -->
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
