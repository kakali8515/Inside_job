<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">유료상품 해제 불가능</h3>
      <p>
        유료상품 해제는<br />
        <span class="red weight">2개 이상의 유료상품을 적용한 게재 준비중인 공고</span><br />
        만 사용 가능합니다.
      </p>
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
  