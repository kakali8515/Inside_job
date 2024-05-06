<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:body>
      <h3 class="sub-heading lg">경력 삭제</h3>
      <p>
        작성하신 경력 내역이 삭제됩니다.<br />
        삭제하시겠습니까?
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
          작성
        </button>
      </div>
    </template>
  </CustomModal>
</template>

<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
import { careerServices } from "@/service/API/career.js";
export default {
  props: { isModal: Boolean, careerId: String },
  components: { CustomModal },
  methods: {
    async setDeletecareer() {
      let res = await careerServices.deleteCareer(this.careerId);
      if (res.status === 200) {
        this.$emit("deleteSuccess");
      }
    },
  },
};
</script>

<style></style>
