<template>
    <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.paidProductPayment"
  >
    <div :class="`back-wh common-sec ${commonStore.state.currentThemeStore}`">
        <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >유료상품 구매
          </h4>
        </div>
      </div>
      <div class="container">    
            <div class="mb-197">
                <div class="storage-box-innr no-border">
                    <h4 class="mb-12">선택한 상품</h4>
                    
                    <table class="table-otr">
                        <tr>
                            <th>상품명</th>
                            <th>가격</th>
                        </tr>
                        <tr v-for="(i, e) in productDetails" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}}일</td>
                            <td>{{i.discounted_price.toLocaleString('en-US')}} 초코</td>
                        </tr>
                        <tr v-for="(i, e) in packageDetails" :key="e">
                            <td>{{i.name}}</td>
                            <td>{{i.package_discounted_price.toLocaleString('en-US')}} 초코</td>
                        </tr>
                        
                    </table>
                    <div class="total-amount">
                        <span class="gray">합계</span>
                        <p class="red">{{(productDetails.reduce((n, {discounted_price}) => n + discounted_price, 0) + packageDetails.reduce((n, {package_discounted_price}) => n + package_discounted_price, 0)).toLocaleString('en-US')}}  초코</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top-1">
            <div class="cm-top-space pb-100">
                <div class="container">
                    <div class="storage-box-innr no-border">
                        <h4>구매</h4>
                    </div>
                    <div class="choco-balance">
                        <span>보유 초코</span>
                        <p>{{balance.toLocaleString('en-US')}} 초코</p>
                    </div>
                    <!-- <p class="fnt-12">구매 후 해당 공고에 유료상품이 자동으로 적용됩니다.</p> -->
                    <div class="fixed-btn-otr">
                        <button type="button" @click="$emit('confirm')" class="btn btn-primary lg mt-12">결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Sheet>
</template>

<script>
    import { inject } from "@vue/runtime-core";
    export default {
    name: "ProductPayment",
    props: {productDetails: Array, packageDetails: Array, balance: Number},
    setup() {
    const commonStore = inject("commonStore");
    const popClose = (event) => {
        console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };
    return {
    popClose,
    commonStore
    }
    }
    }
</script>
