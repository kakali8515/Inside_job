<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">이력서 저장</h3>
      <p>
        작성된 이력서를 저장하시겠습니까?
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          style="margin-right: 8px; width: 48%"
          class="btn btn-primary-outline"
          @click="$emit('checkResume')"
        >
        이력서 확인하기
        </button>
        <button
          style="width: 48%"
          class="btn btn-primary"
          @click="$emit('closeModal')"
        >
        작성 완료
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
