<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">본인확인 완료</h3>
      <p>가입하신 아이디는 [{{ emailId }}] 입니다.</p>
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
  props: { isModal: Boolean, emailId: String },
  components: { CustomModal },
};
</script>

<style></style>
