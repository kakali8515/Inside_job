<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
       <template v-slot:body>
           <div class="back-wh">
       <div class="top-hdr mb-16">
           <div class="container">
               <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
               </a>업글</h4>
           </div>
       </div>
       <div class="container p-0">    
           <div class="slider-bck modal-img-height">
               <div class="slider-otr">
                   <div class="slider-container">
                       <!-- <div class="sub-otr b-color">
                           <h3 class="sub-heading mb-0">업글</h3>
                       </div> -->
                       <!-- <EmergencySlider /> -->
                       <img :src="emergencyData.modal_image" alt="" />
                   </div>
               </div>
           </div>
           <div class="type-innr mt-16 sld-bt scroll-for-txt">
               <ul>
                   <li>{{emergencyData.description}}</li>
               </ul>
           </div>
           <button type="button" @click="$emit('closeModal')" class="btn btn-primary lg mt-16">확인</button>
       </div>
   </div>
     </template>
   
</CustomModal>
</template>


<script>
 import CustomModal from "@/components/Utils/CustomModal.vue";
 import EmergencySlider from "@/components/NoticeRegistration/EmergencySlider.vue";
 export default {
   props: { isModal: Boolean, emergencyData: Object },
   components: { CustomModal, EmergencySlider },
 };
 </script>

