<template>
    <div class="common-sec back-wh">
      <div class="top-hdr">
        <div class="container">
          <InnerHeader headerTitle="근로계약서" />
        </div>
      </div>
      <div class="container">
         <div class="emply-contrct-space">            
         </div>
         <div class="rejection-cont mt-32">
            <p>반려사유</p>
            <textarea class="form-control">이러한 이유 때문에 근로계약서를 반려 합니다.</textarea>
         </div>
      </div>
      
    </div>
</template>
  
  <script>
  import InnerHeader from "../../components/innerHeader.vue";
  
  export default {
    name: "LaborContractDetailsAccompany",
    components: {
      InnerHeader,      
    },
  };
  </script>
  