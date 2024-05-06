<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">계정 정지 안내</h3>
      <p>
        해당 계정은 어드민 관리자에 의해 삭제 되었습니다.
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
