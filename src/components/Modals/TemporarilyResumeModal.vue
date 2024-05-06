<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">임시 저장된 이력서</h3>
      <p>
        임시 저장된 이력서가 있습니다.<br /> 
        이어서 작성하시겠습니까?<br />
        (신규 작성 시 임시저장 이력서는 삭제됩니다.)
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
          @click="$emit('writeResumeTemp')"
        >
          작성
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
