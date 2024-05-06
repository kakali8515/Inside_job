<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">회원탈퇴 확인</h3>
      <p class="lg-br-dis">
        사용하고 계신 아이디는 회원탈퇴를 진행할 경우
        <br />
        복구가 불가능합니다.
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
          @click="setDeletecareer"
        >
          확인
        </button>
      </div>
    </template>
  </CustomModal>
</template>

<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
import { LoginServices } from "@/service/API/loginServices.js";
import { inject } from "@vue/runtime-core";
export default {
  props: { isModal: Boolean, withdrawReason: String },
  components: { CustomModal },
  methods: {
    async setDeletecareer() {
      let res = await LoginServices.withdrawal({
        reason: this.withdrawReason,
      });
      console.log(res);
      if (res.status === 200) {
        this.$emit("withdrawSuccess");
        localStorage.removeItem("token");
        this.store.state.token = undefined;
      }
    },
  },
  setup() {
    const store = inject("authenticateStore");

    return {
      store,
    };
  },
};
</script>

<style></style>
