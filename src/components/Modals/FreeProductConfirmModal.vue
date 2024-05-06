<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">무료 공고 등록 완료</h3>
      <p>
        이미 등록된 무료 공고가 3개 이하일 경우<br />
        관리자의 승인 이후 공고가 게시됩니다.
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          style="width: 48%"
          class="btn btn-primary"
          @click="$emit('confirm')"
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
