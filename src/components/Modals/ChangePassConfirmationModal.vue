<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">비밀번호 재설정 완료</h3>
      <p v-if="!isLoggedIn">
        로그인 화면으로 이동합니다.<br />
        변경한 비밀번호로 로그인해주세요.
      </p>
      <p v-else>홈 화면으로 이동합니다.</p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="
            () => {
              $emit('closeModal');
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
  props: { isModal: Boolean, isLoggedIn: Boolean },
  components: { CustomModal },
};
</script>

<style></style>
