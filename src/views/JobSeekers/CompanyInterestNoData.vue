<template>
    <div class="back-wh common-sec">  
         <div class="top-hdr top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>관심 기업
                </h4>
            </div>
        </div>             
        <div class="container">   
            <div class="pb-32">
                <div class="scrap-warpper p-0">   
                    <div class="sub-otr mb-16 b-color">
                        <h3 class="sub-heading mb-0">기업 리스트</h3>
                    </div> 
                    <!-- Code For No Data -->
                    <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>관심 기업이 없습니다.</span></p>
                            <p>관심 기업을 등록해서 원하는 채용정보를 얻어보세요!    </p>
                        </template>
                    </NoData>        
                </div> 
            </div>            
        </div>
    </div>
</template>
  
  <script>
import NoData  from '@/components/NoData.vue'; 
  export default {
    name: "CompanyInterestNoData",
    components: { NoData}
  };
  </script>
  