<template>
  <CustomModal v-if="true" modalSize="modal-lg" class="location-modal">    
    <template v-slot:body>
     <span class="cross-btn">
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
      </span>
      <div class="locattion-otr">
        <div class="left-part">
            <ul>
                <li class="active">
                    서울
                </li>
                <li>
                   경기
                </li>
                <li>
                   인천
                </li>
                <li>
                   강원
                </li>
                <li>
                   대전
                </li>
                <li>
                   세종
                </li>
                <li>
                   충남
                </li>
                <li>
                   충북
                </li>
                <li>
                   충북
                </li>
                <li>
                   충북
                </li>
            </ul>
        </div>
        <div class="right-part">
            <ul>
                <li class="active">
                    전체
                </li>
                <li>
                    강남•서초•양재
                </li>
                <li>
                    잠실•송파•강동
                </li>
                <li>
                    동작•관악•사당
                </li>
                <li>
                   마포•서대문•은평
                </li>
                <li>
                    종로•중구•용산
                </li>
                <li>
                    노원•도봉•강북•성북
                </li>
                <li>
                    광진•성동•중랑•동대문
                </li>
                <li>
                    광진•성동•중랑•동대문
                </li>
                <li>
                    광진•성동•중랑•동대문
                </li>
            </ul>
        </div>
        
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

<style scoped>


</style>
