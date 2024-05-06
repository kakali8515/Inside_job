<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">임시저장 완료</h3>
      <p>
        남은 필수 항목을 작성하면<br />
        나만의 이력서를 완성할 수 있습니다.<br />
        계속 작성하시겠습니까?
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          style="margin-right: 8px; width: 48%"
          class="btn btn-primary-outline"
          @click="$emit('closeModal')"
        >
          그만 쓰기
        </button>
        <button
          style="width: 48%"
          class="btn btn-primary"
          @click="$emit('setClose')"
        >
          이력서 계속쓰기
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
