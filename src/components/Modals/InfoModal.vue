<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <!-- <h3 class="sub-heading lg">상담 삭제</h3> -->
      <p v-html="message">
      </p>
    </template>
    <template v-slot:footer>
        <div class="btn-grp">
          <button
            style="margin-right: 8px; width: 48%"
            class="btn btn-primary-outline"
            @click="$emit('closeModal')"
          >
          확인
          </button>
          <!-- <button
            style="width: 48%"
            class="btn btn-primary"
            @click="$emit('deleteConfirm', consultationId)"
          >
          확인
          </button> -->
        </div>
      </template>
  </CustomModal>
</template>
  
<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
export default {
  props: { 
    isModal: Boolean, 
    message: String,
  },
  components: { 
    CustomModal 
  },
};
</script>
  
<style>

</style>
  