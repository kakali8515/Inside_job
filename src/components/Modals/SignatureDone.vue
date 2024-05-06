<template>
  <CustomModal v-if="true" modalSize="modal-lg">
    <template v-slot:header>
        <span class="cross-btn">
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
      </span>
    </template>
    <template v-slot:body>
      <h3 class="sub-heading lg mb-32">서명하기</h3>
        <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">서명</h3>
        </div>        
        <div class="worker-sign-cont">
            <img src="@/assets/images/signature.png" alt=""/>
        </div>
        <span class="note-text">서명 시 싸인은 안되며 이름을 정자로 쓰시기 바랍니다. </span>
    </template>
    <template v-slot:footer>
      <div class="btm-button-group mt-32 btm-half-button">        
            <button
            class="btn btn-primary-outline"
            @click="
                () => {
                $emit('closeModal');
                }
            "
            >
            다시 서명하기
            </button>           
            <button class="btn btn-primary">
            서명하기
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
