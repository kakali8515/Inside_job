<template>
    <div class="back-wh common-sec">
        <div class="top-hdr top-hdr-br mb-16">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                    <img src="@/assets/icons/left-arrow.svg" alt="" /></a>지원 현황
                </h4>
            </div>
        </div>     
        <div class="container">
            <div class="tab-outr pr-tab  tab-wd">
                <TabWrapper>
                    <Tabs title="지원 완료 (0)">   
                        <div class="cm-top-space pb-32">
                            <div class="sub-otr mb-16 b-color">
                                <h3 class="sub-heading mb-0">지원 리스트</h3>
                            </div> 
                            <!-- Code For No Data -->   
                            <NoData>
                                <template v-slot:no-data-image>
                                    <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                </template>
                                <template v-slot:no-data-content>
                                    <p><span>지원현황이 없습니다.</span></p>
                                    <p>최근 지원내역이 없습니다. </p>
                                </template>
                            </NoData>      

                            <!-- end  -->
                        </div>
                    </Tabs>
                    <Tabs title="지원 취소 (0)"> 
                        <div class="cm-top-space pb-32">
                            <div class="sub-otr mb-21 b-color">
                                <h3 class="sub-heading mb-0">문서 리스트</h3>
                            </div> 
                            <!-- Code For No Data -->
                             <NoData>
                                <template v-slot:no-data-image>
                                    <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                </template>
                                <template v-slot:no-data-content>
                                    <p><span>지원현황이 없습니다.</span></p>
                                    <p>최근 지원내역이 없습니다. </p>
                                </template>
                            </NoData>      

                        </div>            
                    </Tabs>
                </TabWrapper>
            </div>
        </div>
    </div>
    <div class="btm-button-group">
        <a href="#" class="btn btn-primary lg">지원하기</a>
    </div>
</template>


<script>
  import TabWrapper from "@/components/TabWrapper.vue";
  import Tabs from "@/components/Tabs.vue";
  import NoData  from '@/components/NoData.vue'; 
    export default {
    name: "ApplicationStatusNoData",
    components: {
      Tabs,
      TabWrapper,
      NoData
    },
}
</script>
