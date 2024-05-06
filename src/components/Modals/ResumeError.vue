<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">{{errMsg.headMsg}}</h3>
      <p>
        <!-- 기본 이력서는 임시 저장이 불가능 합니다. -->
        {{errMsg.bodyMsg}}
      </p>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="$emit('closeModal')"
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
  props: { isModal: Boolean, errMsg: Object },
  components: { CustomModal },
};
</script>

<style></style>
