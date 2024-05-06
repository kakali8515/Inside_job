<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">인재 검색권 사용 불가능</h3>
      <p>사용 가능한 인재 검색권이 없습니다.
        구매 후 재시도 부탁드립니다.</p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button class="btn btn-primary lg" @click="$emit('conifrmModel')">
          구매하러 가기
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
