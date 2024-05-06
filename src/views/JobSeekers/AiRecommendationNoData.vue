<template>
    <div class="back-wh pb-16">
        <div class="container">
            <div class="place-fliter-cont rgn m-0 airecom">
                <input type="text" placeholder="업직종을 선택하세요" class="form-control" />
                <a href="#" class="filter-ic"><img src="@/assets/icons/filter-icon.svg" alt=""></a>
            </div>
        </div>
    </div>
    <div class="back-wh border-top">              
        <div class="container">   
            <div class="cm-top-space pb-32">
                <div class="scrap-warpper p-0">   
                    <div class="sub-otr mb-21 b-color">
                        <h3 class="sub-heading mb-0">AI 추천 공고 리스트</h3>
                    </div> 
                    <!-- Code For No Data -->
                    <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>AI 추천 조건이 없습니다.</span></p>
                            <p>나에게 맞는 채용정보를 조건을 설정해 확인해보세요! </p>
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
    name: "AiRecommendationNoData",
    components: { NoData}
}
  </script>
  
  