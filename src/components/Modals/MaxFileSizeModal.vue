<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">프로필 이미지</h3>
      <p>
        최대 5MB의 이미지를 업로드 할 수 있습니다.
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="$emit('confirmModal')">
          확인
        </button>
      </div>
    </template>
  </CustomModal>
</template>

<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
import { ref } from '@vue/runtime-core';
export default {
  props: { isModal: Boolean, emailId: String },
  components: { CustomModal },
//   setup() {
//     const loginType = ref(localStorage.getItem('login_type'))

//     return {
//       loginType
//     }
//   }
};
</script>

<style></style>
