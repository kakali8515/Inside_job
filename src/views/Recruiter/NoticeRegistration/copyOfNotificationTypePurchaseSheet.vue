<template>
    <Sheet
      maxWidth="768px"
      height="100%"
      v-slot="{ closeSelf }"
      v-model:visible="isModalVisible"
    >
    <div :class="`back-wh common-sec ${commonstore.state.currentThemeStore}`">
      <!-- <div class="top-hdr top-hdr-br">
        <div class="container">
          <h4 class="heading">
            <a href="javascript:void(0);" class="left-arrow">
              <img
                src="@/assets/icons/left-arrow.svg"
                alt=""
                @click="$router.go(-1)" /></a
            >공고유형 구매
            <a
              href="javascript:void(0);"
              @click="showPaidProductApplicationModal = true"
              class="refresh"
              ><img src="@/assets/icons/locker-icon.svg" alt=""
            /></a>
          </h4>
        </div>
      </div> -->
      <div class="top-hdr top-hdr-new">
          <div class="container">
            <h4 class="heading">
              <a v-if="Object.keys($route.query).length === 0" @click="popClose(true, closeSelf(), $emit('closeModal'))" class="cross-arrow"
                ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
              >공고유형 구매
              <a
              href="javascript:void(0);"
              @click="showPaidProductApplicationModal = true"
              class="refresh"
              ><img src="@/assets/icons/locker-icon.svg" alt=""
            /></a>
            </h4>
          </div>
        </div>
      <div class="container">
        <div class="pb-32">
          <div class="sub-otr no-border">
            <h3 class="sub-heading lg">공고유형</h3>
            <p>
              공고 등록 시 적용할 다양한 공고유형을 확인해 보세요! 공고유형을
              적용하여 다양한 혜택을 경험해보세요!
            </p>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space">
          <div class="container">
            <div class="sub-otr b-color mb-32">
              <h3 class="sub-heading mb-0">공고 유형</h3>
            </div>
            <div
              class="type-otr type-otr-gap"
              v-for="(i, e) in purchaseAdListData.lists.slice(0, 5)"
              :key="e"
            >
              <div class="type-innr" v-if="i.is_disable == 0">
                <!--  -->
                <div class="sub-otr sub-otr-cbg d-flex mb-16">
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'emergency'">
                    긴급
                  </h3>
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'premium'">
                    프리미엄
                  </h3>
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'special'">
                    스페셜
                  </h3>
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'line'">
                    라인
                  </h3>
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'free'">
                    무료
                  </h3>
                  <span
                    @click="showEmergencyModal = true"
                    v-if="i.ad_type == 'emergency'"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                  <span
                    @click="showPremiumModal = true"
                    v-if="i.ad_type == 'premium'"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                  <span
                    @click="showSpecialModal = true"
                    v-if="i.ad_type == 'special'"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                  <span @click="showLineModal = true" v-if="i.ad_type == 'line'"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                  <span @click="showFreeModal = true" v-if="i.ad_type == 'free'"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                </div>
                <ul class="border-und-txt-2">
                  <li>{{ i.description }}</li>
                </ul>
                <div class="form-wrapper">
                  <div class="form-group mb-16">
                    <select
                      class="form-control"
                      v-model="purchaseSubType[e]"
                      @change="onChangeSubType($event, e, i.ad_type)"
                    >
                      <option
                        v-for="subType in i.sub_types"
                        :key="subType.id"
                        :value="subType.id"
                      >
                        {{ subType.validity_date }} 일
                      </option>
                    </select>
                  </div>
                </div>
                <div class="type-btm">
                  <span class="red"
                    >{{ purchaseSubTypeData[e].discount }}% 할인</span
                  >
                  <span class="won-amnt"
                    ><p>
                      <del class="gray"
                        >{{
                          purchaseSubTypeData[e].original_price.toLocaleString(
                            "en-US"
                          )
                        }}초코</del
                      >
                      {{
                        purchaseSubTypeData[e].discounted_price.toLocaleString(
                          "en-US"
                        )
                      }}초코
                    </p></span
                  >
                </div>
  
                <button
                  type="button"
                  class="btn btn-primary-outline lg viersheet-lg"
                  @click="addToCart(i.ad_type)"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-top"
        v-if="addToCartData.length !== 0 && choosenType !== 'free'"
      >
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color mb-32">
              <h3 class="sub-heading mb-0">업글</h3>
            </div>
            <div
              class="type-otr"
              v-for="(i, e) in purchaseAdListData.lists.slice(-1)"
              :key="e"
            >
              <div class="type-innr">
                <div class="sub-otr sub-otr-cbg d-flex mb-16">
                  <h3 class="sub-heading mb-0" v-if="i.ad_type == 'upgle'">
                    업글
                  </h3>
                  <span @click="showUpgleModal = true"
                    ><img src="@/assets/icons/question-icon.svg" alt=""
                  /></span>
                </div>
                <ul>
                  <li>{{ i.description }}</li>
                </ul>
                <div class="form-wrapper">
                  <div class="form-group">
                    <select
                      class="form-control"
                      v-model="purchaseSubType[5]"
                      @change="onChangeSubType($event, 5, i.ad_type)"
                    >
                      <option
                        v-for="subType in i.sub_types"
                        :key="subType.id"
                        :value="subType.id"
                      >
                        {{ subType.validity_date }} 일
                      </option>
                    </select>
                  </div>
                </div>
                <div class="type-btm">
                  <span class="red"
                    >{{ purchaseSubTypeData[5].discount }}% 할인</span
                  >
                  <span class="won-amnt"
                    ><p>
                      <del class="gray"
                        >{{
                          purchaseSubTypeData[5].original_price.toLocaleString(
                            "en-US"
                          )
                        }}초코</del
                      >
                      {{
                        purchaseSubTypeData[5].discounted_price.toLocaleString(
                          "en-US"
                        )
                      }}초코
                    </p></span
                  >
                </div>
                <button
                  type="button"
                  class="btn btn-primary-outline lg viersheet-lg"
                  @click="addToCart(i.ad_type)"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-100">
          <div class="container">
            <div class="select-product">
              <span
                class="select-toggle"
                @click="active = !active"
                :class="{ 'show-toggle': active }"
              >
                선택한 상품
                <!-- <img
                  src="@/assets/icons/acc-arrow.svg"
                  class="down-toggle"
                  alt=""
                />
                <img
                  src="@/assets/icons/acc-up-arrow.svg"
                  class="up-toggle"
                  alt=""
                /> -->
              </span>
              <div
                class="select-product-dropdown dropdown-select-show"
              >
                <table>
                  <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th></th>
                  </tr>
                  <!-- free click -->
                  <!-- <tr>
                                      <td><span>무료</span></td>
                                      <td><span>0원</span></td>
                                      <td><span class="text-right"><img src="@/assets/icons/cross-icon2.svg" alt="" /></span></td>
                                  </tr> -->
                  <!-- paid click -->
                  <tr v-for="(i, e) in addToCartData" :key="e">
                    <td>
                      <span>{{ i.sub_type }} - {{ i.validity_date }}일</span>
                    </td>
                    <td>
                      <span
                        >{{ i.discounted_price.toLocaleString("en-US") }} 초코</span
                      >
                    </td>
                    <td>
                      <span @click="removeFromCart(e)" class="text-right"
                        ><img src="@/assets/icons/cross-icon2.svg" alt=""
                      /></span>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="total-amount mt-16">
                <span>총 금액</span>
                <p>{{ totalAmount.toLocaleString("en-US") }} 초코</p>
              </div>
              <div class="fixed-btn-otr">
                <button
                  type="button"
                  @click="totalAmount<= balance ? clickToPurchase() : showProductPurchaseFailureModal = true"
                  :disabled="addToCartData.length == 0"
                  class="btn btn-primary lg viersheet-lg"
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationRegistrationComplete
        :isModal="showNotificationRegistrationComplete"
        @confirm="$router.push({ name: 'JobListing' })"
      />
      <PaidProductPayment
        :isModal="showPaidProductPaymentModal"
        :productDetails="addToCartData"
        :balance="balance"
        @confirm="confirmPayment"
        @closeModal="showPaidProductPaymentModal = false"
      />
      <PaidProductApplication
        :isModal="showPaidProductApplicationModal"
        @confirm="confirmApply"
        @closeModal="showPaidProductApplicationModal = false"
      />
      <EmergencyModal
        :isModal="showEmergencyModal"
        :emergencyData="purchaseAdListData.lists[0]"
        @closeModal="showEmergencyModal = false"
      />
      <PremiumModal
        :isModal="showPremiumModal"
        :emergencyData="purchaseAdListData.lists[1]"
        @closeModal="showPremiumModal = false"
      />
      <SpecialModal
        :isModal="showSpecialModal"
        :emergencyData="purchaseAdListData.lists[2]"
        @closeModal="showSpecialModal = false"
      />
      <LineModal
        :isModal="showLineModal"
        :emergencyData="purchaseAdListData.lists[3]"
        @closeModal="showLineModal = false"
      />
      <FreeModal
        :isModal="showFreeModal"
        :emergencyData="purchaseAdListData.lists[4]"
        @closeModal="showFreeModal = false"
      />
      <UpgleModal
        :isModal="showUpgleModal"
        :emergencyData="purchaseAdListData.lists[5]"
        @closeModal="showUpgleModal = false"
      />
      <!-- <PaidProductApplicationModal :isModal="showPaidProductApplicationModal" @closeModal="(showPaidProductApplicationModal = false)" @confirm="confirmApply" /> -->
      <!-- <PaidProductPaymentModal :isModal="showPaidProductPaymentModal" :productDetails="addToCartData" :balance="balance" @confirm="confirmPayment"  @closeModal="(showPaidProductPaymentModal = false)"/> -->
      <FreeProductApplyModal
        :isModal="showFreeProductApplyModal"
        @confirm="confirmFree"
        @closeModal="showFreeProductApplyModal = false"
      />
      <FreeProductConfirmModal
        :isModal="showFreeProductConfirmModal"
        @confirm="$router.push({ name: 'JobListing' })"
      />
      <PurchaseCompleteModal
        fromPage="afterJobPost"
        :isModal="showPurchaseCompleteModal"
        @confirm="$router.push({ name: 'JobListing' })"
      />
      <PurchaseFailureModal
        :isModal="showPurchaseFailureModal"
        @confirm="showPurchaseFailureModal = false"
      />
      <ProductPurchaseFaliurModal :isModal="showProductPurchaseFailureModal" @closeConfirm="showProductPurchaseFailureModal = false" @purchaseConfirm="confirmPurchase"/>
  
      <div class="scrapped-icon scrapped-icon-transform act" v-if="popupMessageShow">
          <p>
            <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
            추가 완료.
          </p>
        </div>
    </div>
  </Sheet>
  </template>
  
  
  <script>
  import PaidProductApplication from "./PaidProductApplication.vue";
  import PaidProductPayment from "./PaidProductPayment.vue";
  import Pagination from "@/components/Pagination.vue";
  import ProductPurchaseFaliurModal from "@/components/Modals/ProductPurchaseFaliurModal.vue";
  import FreeProductApplyModal from "@/components/Modals/FreeProductApplyModal.vue";
  import UpgleModal from "@/components/Modals/UpgleModal.vue";
  import FreeProductConfirmModal from "@/components/Modals/FreeProductConfirmModal.vue";
  import PurchaseFailureModal from "@/components/Modals/PurchaseFailureModal.vue";
  import PurchaseCompleteModal from "@/components/Modals/PurchaseCompleteModal.vue";
  import NotificationRegistrationComplete from "@/components/Modals/NotificationRegistrationComplete.vue";
  import EmergencyModal from "@/components/Modals/EmergencyModal.vue";
  import LineModal from "@/components/Modals/LineModal.vue";
  import FreeModal from "@/components/Modals/FreeModal.vue";
  import PremiumModal from "@/components/Modals/PremiumModal.vue";
  import SpecialModal from "@/components/Modals/SpecialModal.vue";
  import { reactive, ref } from "@vue/reactivity";
  import { onBeforeMount, inject } from "@vue/runtime-core";
  import { PurchaseAdTypeService } from "../../../service/API/PurchaseAdType";
  import { useRouter, useRoute } from "vue-router";
  import InnerHeader from "../../../components/innerHeader.vue";
  import TabWrapper from "@/components/TabWrapper.vue";
  import Tabs from "@/components/Tabs.vue";
  import ApplicantCard from "@/components/ApplicantCard.vue";
  import NoData from "@/components/NoData.vue";
  
  export default {
    name: "NotificationTypePurchase",
    props: { isModalVisible: Boolean},
    components: {
      Pagination,
      InnerHeader,
      Tabs,
      TabWrapper,
      ApplicantCard,
      NoData,
      EmergencyModal,
      PremiumModal,
      SpecialModal,
      LineModal,
      FreeModal,
      ProductPurchaseFaliurModal,
      FreeProductApplyModal,
      FreeProductConfirmModal,
      PurchaseCompleteModal,
      PurchaseFailureModal,
      PaidProductApplication,
      PaidProductPayment,
      NotificationRegistrationComplete,
      UpgleModal,
    },
    setup() {
      const popupMessageShow = ref(false);
      const commonstore = inject("commonStore");
      const active = ref(false);
      const purchaseSubType = ref(["1", "12", "21", "31", "61", "41"]);
      const purchaseSubTypeData = ref([]);
      const addToCartData = ref([]);
      const totalAmount = ref(0);
      const balance = ref(0);
      const router = useRouter();
      const route = useRoute();
      const choosenType = ref("");
      const showFreeProductApplyModal = ref(false);
      const showFreeProductConfirmModal = ref(false);
      const showPurchaseCompleteModal = ref(false);
      const showPurchaseFailureModal = ref(false);
      const showProductPurchaseFailureModal = ref(false);
      const showNotificationRegistrationComplete = ref(false);
      const showEmergencyModal = ref(false);
      const showPremiumModal = ref(false);
      const showSpecialModal = ref(false);
      const showLineModal = ref(false);
      const showFreeModal = ref(false);
      const showUpgleModal = ref(false);
      const showPaidProductApplicationModal = ref(false);
      const showPaidProductPaymentModal = ref(false);
      const purchaseAdListData = reactive({
        lists: [],
      });
  
      const clickToPurchase = () => {
        if (choosenType.value !== "free") {
          showPaidProductPaymentModal.value = true;
        } else {
          console.log("another modal");
          showFreeProductApplyModal.value = true;
        }
      };
  
      const onChangeSubType = (event, i, adType) => {
        const objIndex = purchaseAdListData.lists[i].sub_types.findIndex(
          (obj) => obj.id == event.target.value
        );
        if (adType == "emergency") {
          purchaseSubTypeData.value[0] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        } else if (adType == "premium") {
          purchaseSubTypeData.value[1] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        } else if (adType == "special") {
          purchaseSubTypeData.value[2] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        } else if (adType == "line") {
          purchaseSubTypeData.value[3] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        } else if (adType == "upgle") {
          purchaseSubTypeData.value[5] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        } else {
          purchaseSubTypeData.value[4] =
            purchaseAdListData.lists[i].sub_types[objIndex];
        }
      };
  
      onBeforeMount(async () => {
        await fetchPurchaseAdList();
        if(Object.keys(route.query).length !== 0) {
          console.log(commonstore.state.paidProductPurchaseStoreData)
          addToCartData.value = commonstore.state.paidProductPurchaseStoreData.addToCartData
          totalAmount.value = commonstore.state.paidProductPurchaseStoreData.totalAmount
          if(route.query.totalBalance > 0) {
              balance.value = route.query.totalBalance
          }
      }
      });
  
      const fetchPurchaseAdList = async () => {
        let res = await PurchaseAdTypeService.purchaseAdList();
        //console.log(res)
        purchaseAdListData.lists = res.data.ad_type;
        balance.value = res.data.coin_balnace;
        purchaseSubTypeData.value[0] = purchaseAdListData.lists[0].sub_types[0];
        purchaseSubTypeData.value[1] = purchaseAdListData.lists[1].sub_types[0];
        purchaseSubTypeData.value[2] = purchaseAdListData.lists[2].sub_types[0];
        purchaseSubTypeData.value[3] = purchaseAdListData.lists[3].sub_types[0];
        purchaseSubTypeData.value[4] = purchaseAdListData.lists[4].sub_types[0];
        purchaseSubTypeData.value[5] = purchaseAdListData.lists[5].sub_types[0];
      };
  
      const addToCart = (adType) => {
        if (choosenType.value == "free") {
          addToCartData.value = [];
        }
        if (adType == "emergency") {
          choosenType.value = "emergency";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 1
          );
          if (filteredData.length == 0) {
            addToCartData.value.push(purchaseSubTypeData.value[0]);
            addedToCartMessage()
          }
        } else if (adType == "premium") {
          choosenType.value = "premium";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 2
          );
          if (filteredData.length == 0) {
            addToCartData.value.push(purchaseSubTypeData.value[1]);
            addedToCartMessage()
          }
        } else if (adType == "special") {
          choosenType.value = "special";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 3
          );
          if (filteredData.length == 0) {
            addToCartData.value.push(purchaseSubTypeData.value[2]);
            addedToCartMessage()
          }
        } else if (adType == "line") {
          choosenType.value = "line";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 4
          );
          if (filteredData.length == 0) {
            addToCartData.value.push(purchaseSubTypeData.value[3]);
            addedToCartMessage()
          }
        } else if (adType == "upgle") {
          choosenType.value = "upgle";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 6
          );
          if (filteredData.length == 0) {
            addToCartData.value.push(purchaseSubTypeData.value[5]);
            addedToCartMessage()
          }
        } else {
          choosenType.value = "free";
          const filteredData = addToCartData.value.filter(
            (x) => x.ad_type_id == 5
          );
          if (filteredData.length == 0) {
            addToCartData.value = [purchaseSubTypeData.value[4]];
            addedToCartMessage()
          }
        }
        totalAmount.value = addToCartData.value.reduce(
          (n, { discounted_price }) => n + discounted_price,
          0
        );
        
        //console.log(totalAmount)
      };
  
      const addedToCartMessage = () => {
        popupMessageShow.value = true;
        setTimeout(() => {
          popupMessageShow.value = false;
        }, 3000);
      };
  
      const removeFromCart = (i) => {
        addToCartData.value.splice(i, 1);
        totalAmount.value = addToCartData.value.reduce(
          (n, { discounted_price }) => n + discounted_price,
          0
        );
      };
  
      const confirmFree = async () => {
        try {
          let array_purchase_for_ad = [];
          for (let index = 0; index < addToCartData.value.length; index++) {
            array_purchase_for_ad.push(addToCartData.value[index].id);
          }
          showFreeProductApplyModal.value = false;
          let inputdata = commonstore.state.fourstepdata;
          inputdata.array_purchase_for_ad = array_purchase_for_ad;
          inputdata.array_storage_box_list = [];
          console.log(inputdata);
          let res = await PurchaseAdTypeService.saveJob(inputdata);
          showFreeProductConfirmModal.value = true;
        } catch (e) {
          showPurchaseFailureModal.value = true;
        }
      };
  
      const confirmPayment = async () => {
        try {
          let array_purchase_for_ad = [];
          for (let index = 0; index < addToCartData.value.length; index++) {
            array_purchase_for_ad.push(addToCartData.value[index].id);
          }
          showPaidProductPaymentModal.value = false;
          let inputdata = commonstore.state.fourstepdata;
          // for(var key in inputdata) {
          //     if(inputdata[key] === "") {
          //     inputdata[key] = null
          //     }
          // }
          inputdata.array_purchase_for_ad = array_purchase_for_ad;
          inputdata.array_storage_box_list = [];
          console.log(inputdata);
          let res = await PurchaseAdTypeService.saveJob(inputdata);
          showPurchaseCompleteModal.value = true;
        } catch (e) {
          showPurchaseFailureModal.value = true;
        }
      };
  
      const confirmApply = async (addToUseData) => {
        try {
          let array_storage_box_list = [];
          for (let index = 0; index < addToUseData.length; index++) {
            array_storage_box_list.push(addToUseData[index].id);
          }
          showPaidProductApplicationModal.value = false;
          let inputdata = commonstore.state.fourstepdata;
          inputdata.array_purchase_for_ad = [];
          inputdata.array_storage_box_list = array_storage_box_list;
          console.log(inputdata);
          let res = await PurchaseAdTypeService.saveJob(inputdata);
          showNotificationRegistrationComplete.value = true;
        } catch (e) {}
      };
  
      const popClose = (event) => {
        console.log("closeSelf", event);
        if (event) {
          console.log("Bottom Sheet Closed!!");
        }
      };
      const confirmPurchase = () => {
      showProductPurchaseFailureModal.value = false
      commonstore.methods.storePaidProducts({addToCartData: addToCartData, totalAmount: totalAmount})
      router.push({name: 'SuperShortCoinShop', query: {fromPurchase: 'fromAdTypePurchase'}})
    }
  
      return {
        purchaseAdListData,
        popupMessageShow,
        active,
        totalAmount,
        purchaseSubType,
        choosenType,
        purchaseSubTypeData,
        addToCartData,
        showEmergencyModal,
        showUpgleModal,
        showPremiumModal,
        showSpecialModal,
        showLineModal,
        showFreeModal,
        showFreeProductApplyModal,
        showFreeProductConfirmModal,
        showProductPurchaseFailureModal,
        showPaidProductApplicationModal,
        showPaidProductPaymentModal,
        showPurchaseCompleteModal,
        showPurchaseFailureModal,
        balance,
        commonstore,
        showNotificationRegistrationComplete,
        clickToPurchase,
        confirmPurchase,
        removeFromCart,
        addToCart,
        onChangeSubType,
        confirmPayment,
        confirmApply,
        confirmFree,
        popClose,
      };
    },
  };
  </script>
  
  <style scoped>
  .scrapped-icon-transform {
    transform: none;
  }
  
  /* .hand-pointer {
    cursor: pointer !important;
  } */
  </style>
  