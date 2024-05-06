<template>
    <div class="back-wh common-sec">
        <div class="top-hdr top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt=""  @click="stepBack"/></a>유료상품 구매
                </h4>
            </div>
        </div>
        <div class="container">    
            <div class="pb-32">
                <div class="sub-otr no-border">
                    <h3 class="sub-heading lg">유료상품</h3>
                    <p>다양한 유료상품을 구매해서 효과적인 홍보를 경험해보세요!</p>
                </div>
            </div>
        </div>
        <div class="border-top" v-if="(purchasePaidList.talentSearchList.length !== 0)">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color mb-32">
                        <h3 class="sub-heading mb-0">인재 검색</h3>
                    </div>
                    <div class="type-otr" >
                        <div class="type-innr" >
                            <div class="sub-otr d-flex b-color-bd mb-16">
                                <h3 class="sub-heading mb-0">인재 검색</h3>
                                <span @click="(showTalentModal = true)" ><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                            </div>
                            <ul class="bb-1">
                                <li>{{talentSearchData.description}}</li>
                            </ul>
                            <div class="form-wrapper">
                                <div class="form-group gap-small">
                                    <select class="form-control" v-model="purchaseSubTypeTalent[0]" @change="onChangeSubType($event, 0, 'talent')">
                                        <option v-for="subType in purchasePaidList.talentSearchList" :key="subType.id" :value="subType.id">{{subType.validity_date}}일 - {{subType.no_of_cases}}건</option>
                                    </select>
                                </div>
                            </div>
                            <div class="type-btm type-btm-line-19">
                                <p>{{purchaseSubTypeData[5].discounted_price.toLocaleString('en-US')}}초코</p>
                            </div>
                            <button type="button" class="btn btn-primary-outline lg" @click="addToCart('talent')">추가하기</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color mb-32 sub-otr-pb-12">
                        <h3 class="sub-heading mb-0">패키지</h3>
                    </div>
                    <div class="type-otr mb-32" v-for="(i, e) in purchasePaidList.packageType" :key="e" >
                        <div class="type-innr">
                            <!--  -->
                            <div class="sub-otr b-color-bd d-flex mb-16">
                                <h3 class="sub-heading mb-0" >{{i.name}}</h3>
                                <span @click="clickToOpenPackageModal(e)"><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                              
                            </div>
                            <ul class="bb-1">
                                <li>{{i.description}}</li>
                            </ul>
                            <div class="form-wrapper">
                                <div class="form-group paid-purchase-list gap-small-16 product-single-list">
                                    <p v-for="(subType, k) in i.items" :key="k"><span>{{subType.sub_type}} ({{subType.validity_date}}일) </span><span v-if="k < i.items.length - 1">,</span></p>
                                    
                                </div>
                            </div>
                            <div class="type-btm">
                                <span class="red">{{i.package_discount}}% 할인</span>
                                <span class="won-amnt"><p><del class="gray">{{i.package_original_price.toLocaleString('en-US')}}초코</del> {{i.package_discounted_price.toLocaleString('en-US')}}초코</p></span>
                            </div>
                            
                            <button type="button" class="btn btn-primary-outline lg" @click="addToCart('package', i)">추가하기</button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- v-if="(addToCartData.length !== 0 && choosenType !== 'talent' && choosenType !== 'package')" -->
        <div class="border-top" >
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color mb-32">
                        <h3 class="sub-heading mb-0">업글</h3>
                    </div>
                    <div class="type-otr" v-for="(i, e) in purchasePaidList.adType.slice(-1)" :key="e">
                        <div class="type-innr" >
                            <div class="sub-otr d-flex mb-16">
                                <h3 class="sub-heading mb-0" v-if="i.ad_type == 'upgle' ">업글</h3>
                                <span @click="showUpgleModal = true" ><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                            </div>
                            <ul>
                                <li>{{i.description}}</li>
                            </ul>
                            <div class="form-wrapper">
                                <div class="form-group gap-small-16">
                                    <select class="form-control" v-model="purchaseSubType[4]" @change="onChangeSubType($event, 4, i.ad_type)">
                                        <option v-for="subType in i.sub_types" :key="subType.id" :value="subType.id">{{subType.validity_date}} 일</option>
                                    </select>
                                </div>
                            </div>
                            <div class="type-btm">
                                <span class="red">{{purchaseSubTypeData[4].discount}}% 할인</span>
                                <span class="won-amnt"><p><del class="gray">{{purchaseSubTypeData[4].original_price.toLocaleString('en-US')}}초코</del>{{purchaseSubTypeData[4].discounted_price.toLocaleString('en-US')}}  초코</p></span>
                            </div>
                            <button type="button" class="btn btn-primary-outline lg"  @click="addToCart(i.ad_type)">추가하기</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <div class="border-top">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="sub-otr b-color mb-32">
                        <h3 class="sub-heading mb-0">공고 유형</h3>
                    </div>
                    <div class="type-otr mb-16" v-for="(i, e) in purchasePaidList.adType.slice(0, 4)" :key="e" >
                        <div class="type-innr">
                            <!--  -->
                            <div class="sub-otr d-flex mb-16">
                                <h3 class="sub-heading mb-0" v-if="i.ad_type == 'emergency' ">긴급</h3>
                                <h3 class="sub-heading mb-0" v-if="i.ad_type == 'premium' ">프리미엄</h3>
                                <h3 class="sub-heading mb-0" v-if="i.ad_type == 'special' ">스페셜</h3>
                                <h3 class="sub-heading mb-0" v-if="i.ad_type == 'line' ">라인</h3>
                               
                                <span @click="(showEmergencyModal = true)" v-if="i.ad_type == 'emergency' "><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                                <span @click="(showPremiumModal = true)" v-if="i.ad_type == 'premium' "><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                                <span @click="(showSpecialModal = true)" v-if="i.ad_type == 'special' "><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                                <span @click="(showLineModal = true)" v-if="i.ad_type == 'line' "><img src="@/assets/icons/question-icon.svg" alt="" /></span>
                                
                                
                            </div>
                            <ul>
                                <li>{{i.description}}</li>
                            </ul>
                            <div class="form-wrapper">
                                <div class="form-group gap-small-16">
                                    <select class="form-control" v-model="purchaseSubType[e]" @change="onChangeSubType($event, e, i.ad_type)">
                                        <option v-for="subType in i.sub_types" :key="subType.id" :value="subType.id">{{subType.validity_date}} 일</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <pre>{{purchaseSubTypeData}}</pre> -->
                            <div class="type-btm">
                                <span class="red">{{purchaseSubTypeData[e].discount}}% 할인</span>
                                <span class="won-amnt"><p><del class="gray">{{purchaseSubTypeData[e].original_price.toLocaleString('en-US')}}초코</del> {{purchaseSubTypeData[e].discounted_price.toLocaleString('en-US')}}초코</p></span>
                            </div>
                            
                            <button type="button" class="btn btn-primary-outline lg" @click="addToCart(i.ad_type)">추가하기</button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="border-top">
            <div class="cm-top-space pb-80">
                <div class="container">
                    <div class="select-product">
                        <span class="select-toggle"  @click="active = !active"   :class="{ 'show-toggle': active }">
                            선택한 상품 
                            <!-- <img src="@/assets/icons/acc-arrow.svg" class="down-toggle" alt="" />
                            <img src="@/assets/icons/acc-up-arrow.svg" class="up-toggle" alt="" /> -->
                        </span>
                        <div class="select-product-dropdown dropdown-select-show" >
                            <table>
                                <tr>
                                    <th>상품명</th>
                                    <th>가격</th>
                                    <th></th>
                                </tr>
                             
                                <!-- paid click -->
                                <tr v-for="(i, e) in addToCartData" :key="e">
                                    <td><span>{{i.sub_type}} - {{i.validity_date}}일</span></td>
                                    <td><span>{{i.discounted_price.toLocaleString('en-US')}} 초코</span></td>
                                    <td><span @click="removeFromCart(e, 'subType')" class="text-right"><img src="@/assets/icons/cross-icon2.svg" alt="" /></span></td>
                                </tr>
                                <tr v-for="(i, e) in addToCartPackageData" :key="e">
                                    <td><span>{{i.name}}</span></td>
                                    <td><span>{{i.package_discounted_price.toLocaleString('en-US')}} 초코</span></td>
                                    <td><span @click="removeFromCart(e, 'package')" class="text-right"><img src="@/assets/icons/cross-icon2.svg" alt="" /></span></td>
                                </tr>
                            </table>
                        </div>
                    
                        <div  class="total-amount mt-16">
                            <!-- v-if="totalAmount !== 0" -->
                            <span>총 금액</span>
                            <p>{{totalAmount.toLocaleString('en-US')}} 초코</p>
                        </div>
                        <div class="fixed-btn-otr">
                            <button type="button" @click="totalAmount <= balance ? clickToPurchase() : showProductPurchaseFailureModal = true" :disabled="addToCartData.length === 0 && addToCartPackageData.length === 0" class="btn btn-primary lg">구매하기</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <PaidProductPayment v-if="commonStore.state.paidProductPayment" :productDetails="addToCartData" :packageDetails="addToCartPackageData" :balance="balance" @confirm="confirmPayment"/>
        <EmergencyModal :isModal="showEmergencyModal" :emergencyData="purchasePaidList.adType[0]" @closeModal="(showEmergencyModal = false)"/>
        <PremiumModal :isModal="showPremiumModal" :emergencyData="purchasePaidList.adType[1]" @closeModal="(showPremiumModal = false)" />
        <SpecialModal :isModal="showSpecialModal" :emergencyData="purchasePaidList.adType[2]" @closeModal="(showSpecialModal = false)"/>
        <LineModal :isModal="showLineModal" :emergencyData="purchasePaidList.adType[3]" @closeModal="(showLineModal = false)"/>
        <PackageModal :isModal="showPackageModal" :emergencyData="purchasePaidList.packageType[packageIndex]" @closeModal="(showPackageModal = false)"/>
        <TalentModal :isModal="showTalentModal" :emergencyData="talentSearchData" @closeModal="(showTalentModal = false)"/>
        <UpgleModal :isModal="showUpgleModal" :emergencyData="purchasePaidList.adType[4]" @closeModal="(showUpgleModal = false)"/>
        <PurchaseCompleteModal fromPage="paidProduct" :isModal="showPurchaseCompleteModal" @confirm="(showPurchaseCompleteModal = false, commonStore.state.paidProductPayment = false, $router.push({name: 'PaidProductLocker'}))"/>
        <PurchaseFailureModal :isModal="showPurchaseFailureModal" @confirm="(showPurchaseFailureModal = false, $router.push({name: 'PaidProductPurchase'}))"/>
        <ProductPurchaseFaliurModal :isModal="showProductPurchaseFailureModal" @closeConfirm="showProductPurchaseFailureModal = false" @purchaseConfirm="confirmPurchase"/>
        <StepBackWarningModal :isModal="backButtonclicked" @confirm="$router.push({name: 'home'})" @closeConfirm="backButtonclicked = false" fromPage="paidProductPurchase" />
        <div class="scrapped-icon scrapped-icon-transform act" v-if="popupMessageShow">
        <p>
          <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
          추가 완료.
        </p>
      </div>
    </div>
</template>


<script>
import Pagination from "@/components/Pagination.vue";
import PaidProductPayment from "./PaidProductPayment.vue";
import PurchaseFailureModal from "@/components/Modals/PurchaseFailureModal.vue";
import StepBackWarningModal from "@/components/Modals/StepBackWarningModal.vue";
import PurchaseCompleteModal from "@/components/Modals/PurchaseCompleteModal.vue";
import ProductPurchaseFaliurModal from "@/components/Modals/ProductPurchaseFaliurModal.vue";
import EmergencyModal from "@/components/Modals/EmergencyModal.vue";
import UpgleModal from "@/components/Modals/UpgleModal.vue";
import PackageModal from "@/components/Modals/PackageModal.vue";
import TalentModal from "@/components/Modals/TalentModal.vue";
import LineModal from "@/components/Modals/LineModal.vue";
import PremiumModal from "@/components/Modals/PremiumModal.vue";
import SpecialModal from "@/components/Modals/SpecialModal.vue";
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, inject, watch } from "@vue/runtime-core";
import StarRating from "vue-star-rating";
import { useRouter, useRoute } from "vue-router";
import { PaidProductPurchaseService } from '../../../service/API/PaidProductPurchase';
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import ApplicantCard from "@/components/ApplicantCard.vue";
import NoData  from '@/components/NoData.vue';

export default {
  name: "PaidProductPurchase",
  components: {
  Pagination,
  StarRating,
  Tabs,
  TabWrapper,
  ApplicantCard,
  NoData,
  StepBackWarningModal,
  EmergencyModal,
  PremiumModal,
  SpecialModal,
  LineModal,
  PackageModal,
  TalentModal,
  PurchaseCompleteModal,
  PurchaseFailureModal,
  UpgleModal,
  PaidProductPayment,
  ProductPurchaseFaliurModal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const commonStore = inject("commonStore");
    const popupMessageShow = ref(false);
    const active = ref(false);
    const purchaseSubType = ref(['1', '12', '21', '31','41']);
    const purchaseSubTypeData = ref([]);
    const addToCartData = ref([]);
    const addToCartPackageData = ref([])
    const totalAmount = ref(0)
    const packageTotal = ref(0)
    const adTypeTotal = ref(0)
    const balance = ref(0)
    const choosenType = ref('')
    const showPurchaseCompleteModal = ref(false)
    const showPurchaseFailureModal = ref(false)
    const showProductPurchaseFailureModal = ref(false)
    const showEmergencyModal = ref(false)
    const showPremiumModal = ref(false)
    const showSpecialModal = ref(false)
    const showUpgleModal = ref(false)
    const showPackageModal = ref(false)
    const showTalentModal = ref(false)
    const showLineModal = ref(false)
    const backButtonclicked = ref(false)
    const purchasePaidList = reactive({
        talentSearchList: [],
        packageType: [],
        adType: [],
    });
    const purchaseSubTypeTalent = ref(['51']);
    const talentSearchData = ref({})
    const packagePurchaseSubType = ref([])
    const packageIndex = ref(0)
    
    const clickToPurchase = () => {
        commonStore.state.paidProductPayment = true
    };

    const clickToOpenPackageModal = (e) => {
        showPackageModal.value = true, 
        packageIndex.value = e
    };

  const onChangeSubType = (event, i, adType) => {
    if (adType == 'talent') {
        const objIndex = purchasePaidList.talentSearchList.findIndex((obj => obj.id == event.target.value))
        purchaseSubTypeData.value[5] = purchasePaidList.talentSearchList[objIndex]
    } else {
        const objIndex = purchasePaidList.adType[i].sub_types.findIndex((obj => obj.id == event.target.value))
        if (adType == 'emergency') {
            purchaseSubTypeData.value[0] = purchasePaidList.adType[i].sub_types[objIndex]
        } else if (adType == 'premium') {
            purchaseSubTypeData.value[1] = purchasePaidList.adType[i].sub_types[objIndex]
        } else if (adType == 'special') {
            purchaseSubTypeData.value[2] = purchasePaidList.adType[i].sub_types[objIndex]
        } else if (adType == 'line') {
            purchaseSubTypeData.value[3] = purchasePaidList.adType[i].sub_types[objIndex]
        } else {
            purchaseSubTypeData.value[4] = purchasePaidList.adType[i].sub_types[objIndex]
        }
    }
    };
    
  onBeforeMount(async () => { 
    await fetchPurchaseAdList();
    if(Object.keys(route.query).length !== 0) {
        //console.log(commonStore.state.paidProductPurchaseStoreData)
        addToCartData.value = commonStore.state.paidProductPurchaseStoreData.addToCartData
        adTypeTotal.value = addToCartData.value.reduce((n, {discounted_price}) => n + discounted_price, 0)
        addToCartPackageData.value = commonStore.state.paidProductPurchaseStoreData.addToCartPackageData
        packageTotal.value = addToCartPackageData.value.reduce((n, {package_discounted_price}) => n + package_discounted_price, 0)
        totalAmount.value = commonStore.state.paidProductPurchaseStoreData.totalAmount
        if(route.query.totalBalance > 0) {
            balance.value = route.query.totalBalance
        }
    }
    
  });
  watch(
      () => commonStore.state.paidProductPayment,
      (newVal, oldVal) => {
        if (newVal) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      }
    );

  const stepBack = () => {
    if(Object.keys(route.query).length !== 0) {
        if(route.query.totalBalance == 'nothing') {
            backButtonclicked.value = true
        }   
    } else {
        router.go(-1)
    }
  };

  const fetchPurchaseAdList = async () => {
    let res = await PaidProductPurchaseService.purchaseAdList();
    console.log(res)
    purchasePaidList.talentSearchList = res.data.talent_search_type.sub_types
    Object.assign(talentSearchData.value, res.data.talent_search_type)
    purchasePaidList.packageType = res.data.package_type
    purchasePaidList.adType = res.data.ad_type
    balance.value = res.data.coin_balnace;
    purchaseSubTypeData.value[5] = purchasePaidList.talentSearchList[0]
    purchaseSubTypeData.value[0] = purchasePaidList.adType[0].sub_types[0]
    purchaseSubTypeData.value[1] = purchasePaidList.adType[1].sub_types[0]
    purchaseSubTypeData.value[2] = purchasePaidList.adType[2].sub_types[0]
    purchaseSubTypeData.value[3] = purchasePaidList.adType[3].sub_types[0]
    purchaseSubTypeData.value[4] = purchasePaidList.adType[4].sub_types[0]
    
  };

  const addToCart = (adType, data = {}) => {
    if (adType == 'emergency') {
        choosenType.value = 'emergency'
        addToCartData.value.push(purchaseSubTypeData.value[0])
    } else if (adType == 'premium') {
        choosenType.value = 'premium'
        addToCartData.value.push(purchaseSubTypeData.value[1])
    } else if (adType == 'special') {
        choosenType.value = 'special'
        addToCartData.value.push(purchaseSubTypeData.value[2])
    } else if (adType == 'line') {
        choosenType.value = 'line'
        addToCartData.value.push(purchaseSubTypeData.value[3])
    } else if (adType == 'upgle') {
        choosenType.value = 'upgle'
        addToCartData.value.push(purchaseSubTypeData.value[4])
    }  else if (adType == 'package') {
        choosenType.value = 'package'
        addToCartPackageData.value.push(data)
    } else {
        choosenType.value = 'talent'
        addToCartData.value.push(purchaseSubTypeData.value[5])
    }
    if (adType == 'package') {
        packageTotal.value = addToCartPackageData.value.reduce((n, {package_discounted_price}) => n + package_discounted_price, 0)
    } else {
        adTypeTotal.value = addToCartData.value.reduce((n, {discounted_price}) => n + discounted_price, 0)
    }
    totalAmount.value = packageTotal.value + adTypeTotal.value
    addedToCartMessage()
    
    //console.log(addToCartData)
  };

  const addedToCartMessage = () => {
      popupMessageShow.value = true;
      setTimeout(() => {
        popupMessageShow.value = false;
      }, 3000);
    };

  const removeFromCart = (i, type) => {
    console.log(type)
    if (type == 'package') {
        addToCartPackageData.value.splice(i, 1)
        packageTotal.value = addToCartPackageData.value.reduce((n, {package_discounted_price}) => n + package_discounted_price, 0)
    } else {
        addToCartData.value.splice(i, 1)
        adTypeTotal.value = addToCartData.value.reduce((n, {discounted_price}) => n + discounted_price, 0)
    }
    totalAmount.value = packageTotal.value + adTypeTotal.value
  };

  const confirmPayment = async () => {
    try {
        let array_sub_type_id = []
        for (let index = 0; index < addToCartData.value.length; index++) {
            array_sub_type_id.push(addToCartData.value[index].id) 
        }
        let array_package_id = []
        for (let index = 0; index < addToCartPackageData.value.length; index++) {
            array_package_id.push(addToCartPackageData.value[index].package_id) 
        }
        let data = {
            array_sub_type_id: array_sub_type_id,
            array_package_id: array_package_id
        }
        let res = await PaidProductPurchaseService.savePaidProductPurchase(data)
        showPurchaseCompleteModal.value = true
    }
    catch(e) {
        showPurchaseFailureModal.value = true
    };
    
  };

  const confirmPurchase = () => {
    showProductPurchaseFailureModal.value = false
    commonStore.methods.storePaidProducts({addToCartData: addToCartData, addToCartPackageData: addToCartPackageData, totalAmount: totalAmount})
    router.push({name: 'SuperShortCoinShop', query: {fromPurchase: 'fromPaidProductPurchase'}})
  }

  return {
    commonStore,
    active,
    totalAmount,
    packageTotal,
    adTypeTotal,
    purchaseSubType,
    choosenType,
    purchaseSubTypeData,
    addToCartData,
    showEmergencyModal,
    showPremiumModal,
    showSpecialModal,
    showLineModal,
    popupMessageShow,
    showPurchaseCompleteModal,
    showPurchaseFailureModal,
    showProductPurchaseFailureModal,
    balance,
    stepBack,
    confirmPurchase,
    clickToPurchase,
    removeFromCart,
    addToCart,
    onChangeSubType,
    confirmPayment,
    clickToOpenPackageModal,
    backButtonclicked,
    purchasePaidList,
    purchaseSubTypeTalent,
    talentSearchData,
    packagePurchaseSubType,
    showTalentModal,
    showPackageModal,
    showUpgleModal,
    packageIndex,
    addToCartPackageData,
    }
}
}

</script>

<style scoped>
.scrapped-icon-transform {
  transform: none;
}

/* .hand-pointer {
  cursor: pointer !important;
} */
</style>

