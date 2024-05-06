<template>
  <CustomModal v-if="isModal.state" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg" v-if="isModal.success">본인확인 완료</h3>
      <h3 class="sub-heading lg" v-else>{{isModal.headerMsg}}</h3>
      <p>{{isModal.msg}}</p>
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
  props: { isModal: Object, emailId: String },
  components: { CustomModal },
};
</script>

<style></style>
