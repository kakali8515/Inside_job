<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:header>
      <span
        class="cross-btn"
        @click="
          () => {
            $emit('closeModal');
          }
        "
      >
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
      </span>
    </template>
    <template v-slot:body>
      <h3 class="sub-heading lg">반려사유 작성</h3>

      <div class="rejection-cont">
        <textarea
          class="form-control"
          v-model="reason"
          placeholder="반려하는 사유를 작성해 주세요"
        ></textarea>
        <p class="error-msg">{{ errorMsg }}</p>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="
            () => {
              setSubmit();
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
  props: { isModal: Boolean },
  components: { CustomModal },
  data() {
    return {
      reason: "",
      errorMsg: "",
    };
  },
  methods: {
    setSubmit() {
      if (this.reason.trim() != "") {
        this.errorMsg = "";
        this.$emit("rejectContract", this.reason);
      } else {
        this.errorMsg = "이유를 적어주세요";
      }
    },
  },
};
</script>

<style></style>
