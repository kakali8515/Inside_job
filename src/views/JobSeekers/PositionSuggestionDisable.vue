<template>
   <div class="back-wh">  
         <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>포지션 제안
                </h4>
            </div>
        </div> 
        <div class="pb-16">
            <div class="container">
                <div class="cm-back sm">
                    <div class="position-otr">
                        <h3 class="sub-heading">포지션 제안 <span class="btn btn-default">OFF</span></h3>
                        <p>포지션 제안을 설정하여 맞춤 커리어 제안을 받아보세요!</p>
                        <a href="#" class="pos-right-arrow"><img src="@/assets/icons/right-arrow-gray.svg" alt="" /></a>
                    </div>
                </div>   
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">   
                    <div class="sub-otr mb-21 b-color">
                        <h3 class="sub-heading mb-0">받은 제안</h3>
                    </div> 
                    <!-- Code For No Data -->
                    <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>제안받은 포지션이 없습니다.</span></p>
                            <p>제안을 받기 위해 꾸준이 이력서를 업데이트 해주세요!</p>
                        </template>
                    </NoData>                   
                </div>  
            </div>
        </div>
    </div>
    <div class="btm-button-group mt-224">
        <a href="#" class="btn btn-primary lg">이력서 업데이트하기</a>
    </div>
</template>
  
  <script>
  import NoData  from '@/components/NoData.vue';
  export default {
    name: "PositionSuggestionDisable",
    components: {   
      NoData,
    },
  };
  </script>
  