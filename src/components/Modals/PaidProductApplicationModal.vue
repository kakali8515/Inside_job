
<template>
    <CustomModal v-if="isModal" modalSize="modal-lg modal-hg modal-hd">
        <template v-slot:header>
            <div class="top-hdr">
                <h4 class="heading">
                    <span>유료상품 적용 (보관함)</span>
                </h4>
                <span class="cross-btn">
                    <img src="@/assets/icons/modal-cross-icon.svg" alt="" @click="$emit('closeModal')"/>
                </span>
            </div>
        </template>
       <template v-slot:body>
    <div class="back-wh">
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
        <div class="border-top">
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
</template>
   
</CustomModal>
</template>


<script>
// import { watch } from "vue";
import InnerHeader from '@/components/innerHeader.vue'
import CustomModal from "@/components/Utils/CustomModal.vue";
import NoData  from '@/components/NoData.vue'; 
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { PurchaseAdTypeService } from '../../service/API/PurchaseAdType';
import { useRouter } from 'vue-router';


export default {
  props: { isModal: Boolean},
  components: { InnerHeader, NoData, CustomModal},
  setup() {
    const addedEmergency = ref(false);
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
  

  onBeforeMount(async () => {
    await fetchAdStorageList();
  });

  const fetchAdStorageList = async () => {
    let res = await PurchaseAdTypeService.adStorageList();
    console.log(res)
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
    
  };
  const removeFromCart = (i, type) => {
    addToUseData.value.splice(i, 1)
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





  return {
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
    toUse,
    removeFromCart
    }
}
}

</script>