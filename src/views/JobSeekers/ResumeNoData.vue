<template>
    <div class="back-wh common-sec">  
         <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>이력서
                </h4>
            </div>
        </div>             
        <div class="container">   
            <div class="pb-32">
                <div class="scrap-warpper p-0">   
                    <div class="sub-otr mb-21 b-color">
                        <h3 class="sub-heading mb-0">문서 리스트</h3>
                    </div> 
                    <!-- Code For No Data -->
                    <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>작성한 이력서가 없습니다.</span></p>
                            <p>이력서를 작성하고 구직활동을 시작해 보세요! </p>
                        </template>
                    </NoData>        
                </div> 
                <div class="pt-28">
                    <a href="#" class="btn btn-primary lg">이력서 작성하기</a>   
                </div>
            </div>            
        </div>
    </div>
</template>
  
  <script>
import NoData  from '@/components/NoData.vue'; 
  export default {
    name: "ResumeNoData",
    components: { NoData}
  };
  </script>
  