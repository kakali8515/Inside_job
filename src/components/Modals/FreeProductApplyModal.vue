<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">무료 공고 등록</h3>
      <p>
        무료 공고는 최대 3개까지 등록이 가능하며, <br />
        추후 관리자의 승인을 거쳐 올라갑니다.
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
