<template>
    <div class="back-wh common-sec">
        <div class="top-hdr top-hdr-br">
            <div class="container">
                <InnerHeader headerTitle="유료 상품 보관함" @backButtonPressed="$router.push('/recruiter/my-page')"/>
            </div>
        </div>
        <div class="pb-32">
            <div class="container">    
                <div class="sub-otr no-border paid-produc-locker-top">
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
                    <div class="storage-box-otr paid-pro-lock-area">
                        <div class="storage-box-innr" v-for="(i, e) in adTypeData.lists.slice(0, 4)" :key="e" >
                            <h4 v-if="i.ad_type == 'emergency'">긴급</h4>
                            <h4 v-if="i.ad_type == 'special'">스페셜</h4>
                            <h4 v-if="i.ad_type == 'premium'">프리미엄</h4>
                            <h4 v-if="i.ad_type == 'line'">라인</h4>
                            <table class="table-otr">
                                <tr>
                                    <th>상품명</th>
                                    <th>사용</th>
                                </tr>
                                <tr class="n-border no-data-area" v-if="i.sub_types.length == 0">
                                    <td colspan="2" class="no-space">
                                        
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
                                <tr v-for="(j, k) in i.sub_types" :key="k">
                                    <td>{{j.sub_type}} - {{j.validity_date}}일</td>
                                    <td><button type="button" class="btn btn-primary-outline table-btn-padding" @click="toUse(j, i.ad_type)">사용하기</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top" v-if="adTypeData.lists.length !== 0">
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
                                <tr class="n-border" v-if="adTypeData.lists[4].sub_types.length == 0">
                                    <td colspan="2" class="no-space">
                                        
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
                                <tr v-for="(j, k) in adTypeData.lists[4].sub_types" :key="k">
                                <td>{{j.sub_type}} - {{j.validity_date}}일</td>
                                    <td><button type="button" class="btn btn-primary-outline table-btn-padding" @click="toUse(j, 'upgle')">사용하기</button></td>
                                </tr>
                              
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top" v-if="adTypeData.lists.length !== 0">
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
                                <tr v-for="(j, k) in adTypeData.lists[5].sub_types" :key="k">
                                    <td>{{j.sub_type}} - {{j.no_of_cases}} 개 / {{j.validity_date}}일<span class="av-font">~{{store.methods.dateFormat(j.expired_date, "YYYY년 M월 D일")}} &nbsp; 까지 사용가능</span></td>
                                    <!-- <td>인재 검색 - 1개/일주일 <span class="av-font">~2022.01.16까지 사용가능</span></td> -->
                                    <td><button type="button" class="btn btn-primary-outline table-btn-padding" @click="toUse(j, 'talent')">사용하기</button></td>
                                </tr>
                                <!-- <tr>
                                    <td>인재 검색 - 10개/1개월 <span class="av-font">9개 <em>/</em> ~2022.01.16까지 사용가능</span></td>
                                    <td><button type="button" class="btn btn-primary-outline">사용하기</button></td>
                                </tr> -->
                                <tr class="n-border" v-if="adTypeData.lists[5].sub_types.length == 0">
                                    <td colspan="2" class="no-space">
                                        
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
        <ApplyPaidFeature v-if="store.state.applyPaidProductSheet" :feature="feature"/>
    </div>
</template>




<script>
import { inject } from "vue";
import ApplyPaidFeature from "./ApplyPaidFeature.vue";
import InnerHeader from '@/components/innerHeader.vue'
import NoData  from '@/components/NoData.vue';
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import { PaidProductLockerService } from '../../../service/API/PaidProductLocker';
import { useRouter } from "vue-router";


export default {
  name: "PaidProductLocker",
  components: {
        InnerHeader,
        NoData,
        ApplyPaidFeature
  },
  setup() {
    const store = inject("commonStore");
    const router = useRouter();
    const feature = ref({})
    const adTypeData = reactive({
      limit: 10,
      page: 1,
      totalItem: null,
      lists: [],
    });
 
    watch(() => store.state.applyPaidProductSheet, async (first, second) => {
      if (store.state.applyPaidProductSheet === true) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
    });

  onBeforeMount(async () => {
    await fetchPaidProductLockerList();
  });

  const fetchPaidProductLockerList = async () => {
    let res = await PaidProductLockerService.paidProductLockerList();
    adTypeData.lists = res.data.ad_type
    var temp=adTypeData.lists[1];
    adTypeData.lists[1]=adTypeData.lists[2];
    adTypeData.lists[2]=temp;

  };


  const toUse = (data, type) => {
    console.log(data, type)
    if(type !== 'talent') {
        Object.assign(feature.value, data)
        store.state.applyPaidProductSheet = true
    } else {
        console.log(data.id)
        router.push({name: 'TalentSearchList', query: { id: data.id } })
    }
    
  };
 





  return {
    adTypeData,
    feature,
    toUse,
    store,
    }
}
}

</script>