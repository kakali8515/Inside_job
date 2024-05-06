<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">취업활동 증명서 발급 완료</h3>
      <p class="insurance-text"><span>{{selctedListIdsLength}}개의</span> 취업활동 증명서가 등록하신 메일로 발송되었습니다.</p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button class="btn btn-primary lg" @click="$emit('conifrmModel')">
          확인
        </button>
      </div>
    </template>
  </CustomModal>
</template>

<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
export default {
  props: { isModal: Boolean, emailId: String,selctedListIdsLength: Number },
  components: { CustomModal },
};
</script>

<style></style>
