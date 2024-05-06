<template>
    <div class="back-wh common-sec">
        <div class="top-hdr">
            <div class="container">
                <InnerHeader headerTitle="유료 상품 보관함" />
            </div>
        </div>
        <div class="pb-32">
            <div class="container">    
                <div class="sub-otr no-border">
                    <h3 class="sub-heading mb-8 lg">유료 상품</h3>
                    <p>공고에 유료 상품을 적용하면 다양한 인재들을 손쉽게 만날 수 있습니다!</p>
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">공고 상품</h3>
                    </div>
                    <div class="storage-box-otr">
                        <div class="storage-box-innr">
                            <h4>긴급</h4>
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border">
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="storage-box-innr">
                            <h4>스페셜</h4>
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border">
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="storage-box-innr">
                            <h4>프리미엄</h4>
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border"> 
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="storage-box-innr">
                            <h4>라인</h4>
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border">
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">업글</h3>
                    </div>
                    <div class="storage-box-otr">
                        <div class="storage-box-innr">
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border">
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">인재 검색</h3>
                    </div>
                    <div class="storage-box-otr">
                        <div class="storage-box-innr">
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border">
                                    <td colspan="2" class="no-space">
                                        <!-- Code For No Data -->
                                        <NoData>
                                            <template v-slot:no-data-image>
                                                <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                                            </template>
                                            <template v-slot:no-data-content>
                                                <p>구매한 상품이 없습니다.</p>
                                            </template>
                                        </NoData>    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import InnerHeader from '@/components/innerHeader.vue'
import NoData  from '@/components/NoData.vue';
    export default {
  components: { InnerHeader }, 
        name: "PaidProductLockerNoData",
        components: { InnerHeader, NoData}
    }
</script>
