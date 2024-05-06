<template>
   <div class="back-wh common-sec">  
         <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>유료 인재 검색 내역
                </h4>
            </div>
        </div> 
        <div class="pb-32">
            <div class="container">   
                <div class="sub-otr mb-21 b-color">
                    <h3 class="sub-heading mb-8 lg">내역 리스트</h3>
                    <p>유료 인재검색은 열람 후 60일간 재열람이 가능합니다. </p>
                </div> 
                <NoData>
                    <template v-slot:no-data-image>
                        <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                    </template>
                    <template v-slot:no-data-content>
                        <p><span>인재 검색 내역이 없습니다.</span></p>
                        <p>인재 검색권을 사용해 뛰어난 인재를 만나보세요!</p>
                    </template>
                </NoData>   
                <button type="button" class="btn btn-primary lg mt-32">인재 검색하기 </button>      
            </div>  
        </div>
    </div>

</template>

  <script>
import NoData  from '@/components/NoData.vue';
  export default {
    name: "PaidTalentSearchHistory",
    components: { NoData, },    
  };
  </script>
  