<template>
    <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.showPaidProductApplicationModal"
  >
    <div class="back-wh">
        <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >유료상품 적용 (보관함)
          </h4>
        </div>
      </div>
      <div class="container">    
            <div class="sub-otr b-color">
                <h3 class="sub-heading mb-0">공고 상품</h3>
            </div>
            <div class="storage-box-otr">
                <div class="storage-box-innr" >
                    <h4>긴급</h4>
                    <table class="table-otr">
                        <tr>
                            <th>상품명</th>
                            <th>사용</th>
                        </tr>
                        <tr v-if="(storageEmergencyList.lists.length == 0)">
                            <td colspan="2" class="no-space" >
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
                    
                        <tr  v-for="(i, e) in storageEmergencyList.lists" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}} 일</td>
                            <td><button :disabled="addedEmergency" type="button" @click="toUse(i, 'emergency')" class="btn btn-primary-outline">사용하기</button></td>
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
                        <tr v-if="(storageSpecialList.lists.length == 0)">
                            <td colspan="2" class="no-space" >
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
                    
                        <tr  v-for="(i, e) in storageSpecialList.lists" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}} 일</td>
                            <td><button :disabled="addedSpecial" type="button" @click="toUse(i, 'special')" class="btn btn-primary-outline">사용하기</button></td>
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
                        <tr v-if="(storagePremiumList.lists.length == 0)">
                            <td colspan="2" class="no-space" >
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
                    
                        <tr  v-for="(i, e) in storagePremiumList.lists" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}} 일</td>
                            <td><button type="button" :disabled="addedPremium" @click="toUse(i, 'premium')" class="btn btn-primary-outline">사용하기</button></td>
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
                        <tr v-if="(storageLineList.lists.length == 0)">
                            <td colspan="2" class="no-space" >
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
                    
                        <tr  v-for="(i, e) in storageLineList.lists" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}} 일</td>
                            <td><button type="button" :disabled="addedLine" @click="toUse(i, 'line')" class="btn btn-primary-outline">사용하기</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="border-top" v-if="(addToUseData.length !== 0)">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">업글</h3>
                    </div>
                    <div class="storage-box-innr">
                        <table class="table-otr">
                            <tr>
                                <th>상품명</th>
                                <th>사용</th>
                            </tr>
                            <tr v-if="(storageUpgleList.lists.length == 0)">
                            <td colspan="2" class="no-space" >
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
                    
                        <tr  v-for="(i, e) in storageUpgleList.lists" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}} 일</td>
                            <td><button type="button" :disabled="addedUpgle" @click="toUse(i, 'upgle')" class="btn btn-primary-outline">사용하기</button></td>
                        </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">선택한 상품</h3>
                    </div>
                    <div class="storage-box-innr">
                        <table class="table-otr clicked">
                            <tr>
                                <th>상품명</th>
                                <th></th>
                            </tr>
                            <!-- when product is clicked -->
                            <tr v-for="(i, e) in addToUseData" :key="e">
                                <td><span>{{i.sub_type}} - {{i.validity_date}}일</span></td>
                                <td><span @click="removeFromCart(e, i.ad_type_id)" class="text-right"><img src="@/assets/icons/cross-icon.svg" alt="" /></span></td>
                            </tr>
                        </table>
                    </div>
                    <button :disabled="addToUseData.length == 0" type="button" @click="$emit('confirm', addToUseData)" class="btn btn-primary lg">적용하기</button>
                </div>
            </div>
        </div>
    </div>
    <div class="scrapped-icon scrapped-icon-transform act" v-if="popupMessageShow">
        <p>
          <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
          추가 완료.
        </p>
      </div>
    </Sheet>
</template>

<script>
import NoData  from '@/components/NoData.vue'; 
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, inject } from "@vue/runtime-core";
import { PurchaseAdTypeService } from '../../../service/API/PurchaseAdType';


export default {
  name: "NotificationPaidProductApplication",
  props: { isModal: Boolean},
  components: { NoData},
  setup() {
    const popupMessageShow = ref(false);
    const addedEmergency = ref(false);
    const commonStore = inject("commonStore");
    const addedSpecial = ref(false);
    const addedPremium = ref(false);
    const addedLine = ref(false);
    const addedUpgle = ref(false);
    const addToUseData = ref([]);
    const storageEmergencyList = reactive({
        lists: [],
    });
    const storageSpecialList = reactive({
        lists: [],
    });
    const storagePremiumList = reactive({
        lists: [],
    });
    const storageLineList = reactive({
        lists: [],
    });
    const storageUpgleList = reactive({
        lists: [],
    });
  
    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

  onBeforeMount(async () => {
    await fetchAdStorageList();
  });

  const fetchAdStorageList = async () => {
    let res = await PurchaseAdTypeService.adStorageList();
    //console.log(res)
    storageEmergencyList.lists = res.data.ad_type[0].sub_types;
    storageSpecialList.lists = res.data.ad_type[2].sub_types;
    storagePremiumList.lists = res.data.ad_type[1].sub_types;
    storageLineList.lists = res.data.ad_type[3].sub_types;
    storageUpgleList.lists = res.data.ad_type[4].sub_types;
  };


  const toUse = (data, type) => {
    console.log(data)
    addToUseData.value.push(data)
    if(type == 'emergency') {
        addedEmergency.value = true
    } else if (type == 'special') {
        addedSpecial.value = true
    } else if (type == 'premium') {
        addedPremium.value = true
    } else if (type == 'line') {
        addedLine.value = true
    } else {
        addedUpgle.value = true
    }
    addedToCartMessage()
    
  };
  const removeFromCart = (i, type) => {
    addToUseData.value.splice(i, 1)
    console.log(addToUseData.value)
    if(addToUseData.value.length === 1 && addToUseData.value[0].ad_type_id === 6) {
        addToUseData.value = []
        addedUpgle.value = false
      }
    if(type == 1) {
        addedEmergency.value = false
    } else if (type == 3) {
        addedSpecial.value = false
    } else if (type == 2) {
        addedPremium.value = false
    } else if (type == 4) {
        addedLine.value = false
    } else {
        addedUpgle.value = false
    }

  };
  
  const addedToCartMessage = () => {
      popupMessageShow.value = true;
      setTimeout(() => {
        popupMessageShow.value = false;
      }, 3000);
    };





  return {
    commonStore,
    storageEmergencyList,
    storageSpecialList,
    storagePremiumList,
    storageLineList,
    storageUpgleList,
    addToUseData,
    addedEmergency,
    addedSpecial,
    addedPremium,
    addedLine,
    addedUpgle,
    popupMessageShow,
    toUse,
    removeFromCart,
    popClose,
    addedToCartMessage,
    }
}
}

</script>

<style scoped>
.scrapped-icon-transform {
  transform: none;
}

</style>