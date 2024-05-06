<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isPaidProductCancelModal"
  >
    <div class="common-sec back-wh">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >유료상품 해제
          </h4>
        </div>
      </div>

      <div class="product-app-warpper">
        <div class="container">
          <div class="heading mb-16">공고 상품</div>
          <div v-for="(item, i) in withdrawList.list" :key="i">
            <div
              class="pro-app-otr pro-cancel-otr mb-16"
              v-if="item.ad_type !== 'upgle'"
            >
              <h5>{{item.ad_type}}</h5>
              <ul>
                <li class="header-row">
                  <div class="rht-part">상품명</div>
                  <div class="lft-part">선택</div>
                </li>
                <li class="radio-area">
                  <div class="rht-part">
                    <div class="radio-wrapper">
                      <label class="radio-input">
                        <input
                          type="radio"
                          name="radio"
                          :value="item.id"
                          v-model="withdrawList.radioValue"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div class="lft-part">
                    {{ item.sub_type }} - {{ validity_date }}일
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(item, i) in withdrawList.list" :key="i">
        <div
          class="product-app-warpper back-wh border-top cm-top-space"
          v-if="item.ad_type === 'upgle'"
        >
          <div class="container">
            <div class="heading mb-16">업글</div>
            <div class="pro-app-otr pro-cancel-otr">
              <ul>
                <li class="header-row">
                  <div class="rht-part">상품명</div>
                  <div class="lft-part">선택</div>
                </li>
                <li class="radio-area">
                  <div class="rht-part">
                    <div class="radio-wrapper">
                      <label class="radio-input">
                        <input
                          type="radio"
                          name="radio"
                          :value="item.id"
                          v-model="withdrawList.radioValue"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div class="lft-part">
                    {{ item.sub_type }} - {{ validity_date }}일
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="product-app-warpper back-wh border-top cm-top-space">
        <div class="container">
          <button class="btn btn-primary lg" @click="withdraw()">
            해제하기
          </button>
        </div>
      </div>
    </div>
  </Sheet>
</template>
  
<script>
import { inject, onMounted, reactive } from "@vue/runtime-core";
import { jobListing } from "@/service/API/jobListing.js";
export default {
  name: "PaidProductCancellation",
  props: {
    id: Number,
  },
  emits: ["jobList"],
  setup(props, {emit}) {
    const commonStore = inject("commonStore");
    const withdrawList = reactive({
      list: [],
      radioValue: [],
    });

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    onMounted(() => {
      withdrawStorageList();
    });

    async function withdrawStorageList() {
      let res = await jobListing.withdrawList(props.id);
      if (res.status === 200) {
        withdrawList.list = res.data;
      }
    }

    async function withdraw() {
      let userData = {
        purchase_id: [],
      };
      // withdrawList.radioValue.forEach((item) => {
      //     userData.purchase_id.push(item.practice_id);
      // });
      userData.purchase_id.push(withdrawList.radioValue);
      console.log(userData);
      let res = await jobListing.withdraw(props.id, userData);
      if (res.status === 200) {
        withdrawList.list = res.data;
        commonStore.state.isPaidProductCancelModal = false
        emit('jobList')
      }
    }

    return {
      commonStore,
      popClose,
      withdrawList,
      withdrawStorageList,
      withdraw,
    };
  },
};
</script>
  
  