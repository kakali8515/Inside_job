<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:body>
        <!-- <h3 class="sub-heading lg">업글 구매</h3>
        <p>
          ‘업글’을 사용하시면 더 빠르고 자주 공고를 노출 할 수 있습니다.
        </p> -->

        <h3 class="sub-heading lg">공고 등록 안내</h3>
        <p>
          유료 혹은 무료상품 적용 후 공고 등록이 완료되며, <br />
          이후 공고를 수정할 수 있습니다. <br/>
          업글 상품을 통해 내 공고를 상위노출 시킬 수 있습니다.
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
            @click="$emit('deleteConfirm')"
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
    props: { isModal: Boolean, emailId: String },
    components: { CustomModal },
  };
  </script>
  
  <style></style>
  