<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <!-- <h3 class="sub-heading lg">please select resume for apply</h3> -->
      <p>이력서가 존재하지 않습니다.</p>
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
  props: { isModal: Boolean },
  components: { CustomModal },
};
</script>
  
  <style></style>
  