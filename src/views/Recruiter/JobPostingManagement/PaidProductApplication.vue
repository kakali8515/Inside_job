<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isPaidProductAppModal"
  >


      <div :class="`common-sec back-wh ${commonStore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >유료상품 적용 (보관함)
          </h4>
        </div>
      </div>

      <div class="product-app-warpper">
        <div class="container">
          <div class="heading mb-16">공고 상품</div>
          <div
            class="pro-app-otr paid-pro-app-otr mb-16"
            v-for="(item, i) in paidProductList.list"
            :key="i"
          >
            <div v-if="item.ad_type !== 'upgle'">
              <!-- <h5>{{ item.ad_type }}</h5> -->
              <h5 class="sub-heading mb-0" v-if="item.ad_type === 'emergency'">
                  긴급
                </h5>
                <h5 class="sub-heading mb-0" v-if="item.ad_type === 'premium'">
                  프리미엄
                </h5>
                <h5 class="sub-heading mb-0" v-if="item.ad_type === 'special'">
                  스페셜
                </h5>
                <h5 class="sub-heading mb-0" v-if="item.ad_type === 'line'">
                  라인
                </h5>
              <ul>
                <li class="header-row">
                        <div class="lft-part">
                           상품명 
                        </div>
                        <div class="rht-part">
                            사용
                        </div>
                    </li>
                <div v-if="item.sub_types.length !== 0">
                  <li
                    v-for="(data, j) in item.sub_types"
                    :key="j"
                    :class="item.is_disable === '0' ? '' : 'header-row'"
                  >
                    <div class="lft-part">
                      {{ data.sub_type }} - {{ data.validity_date }}일
                    </div>
                    <div class="rht-part" v-if="item.is_disable === '0'">
                      <button
                        class="btn btn-outline-primary"
                        @click="
                          toUse(item.ad_type, data, i, j),
                            (item.is_disable = '1')
                        "
                      >
                        사용하기
                      </button>
                    </div>
                    <div class="rht-part" v-else>사용</div>
                  </li>
                </div>
                  
                <div v-else>
                  <li class="no-pro-area">
                    <NoData>
                      <template v-slot:no-data-image>
                        <img
                          class="no-job-icon"
                          src="@/assets/icons/no-job-icon.svg"
                          alt=""
                        />
                      </template>
                      <template v-slot:no-data-content>
                        <p>구매한 상품이 없습니다.</p>
                      </template>
                    </NoData>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="product-app-warpper back-wh border-top cm-top-space" v-if="paidProductList.isFree.length !== 0 || (paidProductList.isFree.length === 0 && paidProductList.selectedList.length !== 0)">
        <div class="container">
          <div class="heading mb-16">업글</div>
          <div class="pro-app-otr mb-16">
            <ul>
              <li class="header-row pdd">
                <div class="lft-part">상품명</div>
                <div class="rht-part">사용</div>
              </li>
              <span v-for="(item, i) in paidProductList.list" :key="i">
                <span v-if="item.ad_type === 'upgle'">
                  <li
                    v-for="(data, j) in item.sub_types"
                    :key="j"
                    :class="item.is_disable === '0' ? '' : 'header-row'"
                  >
                    <div class="lft-part">
                      {{ data.sub_type }} - {{ data.validity_date }}일
                    </div>
                    <div class="rht-part" v-if="item.is_disable === '0'">
                      <button
                        class="btn btn-outline-primary"
                        @click="
                          toUse(item.ad_type, data, i, j),
                            (item.is_disable = '1')
                        "
                      >
                        사용하기
                      </button>
                    </div>
                    <div class="rht-part" v-else>사용</div>
                  </li>
                </span>
              </span>
            </ul>
          </div>
        </div>
      </div>

      <div class="product-app-warpper back-wh border-top cm-top-space pb-80">
        <div class="container">
          <div class="heading border-gray mb-16">선택한 상품</div>
          <div class="pro-app-otr mb-16">
            <ul>
              <li  class="header-row" v-if="paidProductList.selectedList.length === 0"><div class="lft-part">상품명</div></li>
              <li
                class="header-row"
                v-for="(item, i) in paidProductList.selectedList"
                :key="i"
              >
                <div class="lft-part">
                  {{ item.sub_type }} - {{ item.validity_date }}일
                </div>
                <div class="rht-part">
                  <img
                    src="@/assets/icons/cross-icon.svg"
                    alt=""
                    @click="removeProduct(i, item)"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="fixed-btn-otr">
          <button @click="apply()" class="btn btn-primary lg">적용하기</button>
          </div>
        </div>
      </div>

      <confirmPaidProductAppModal
        :isModal="paidProductList.isPaidProductConfirmModal"
        @conifrmModel="
          (paidProductList.isPaidProductConfirmModal = false),
            (commonStore.state.isPaidProductAppModal = false)
        "
      />
    </div>
  </Sheet>
</template>
  
<script>
import NoData from "@/components/NoData.vue";
import { inject, onMounted, reactive } from "@vue/runtime-core";
import { jobListing } from "@/service/API/jobListing.js";
import confirmPaidProductAppModal from "@/components/Modals/confirmPaidProductAppModal.vue";

export default {
  name: "PaidProductApplication",
  components: { NoData, confirmPaidProductAppModal },
  props: {
    id: Number,
  },
  setup(props) {
    const commonStore = inject("commonStore");
    const paidProductList = reactive({
      list: [],
      selectedList: [],
      selectedListId: [],
      isPaidProductConfirmModal: false,
      isFree: [],
    });

    onMounted(() => {
      PaidProductStorageList();
    });

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    async function PaidProductStorageList() {
      let res = await jobListing.paidProductStorageList(props.id);
      if (res.status === 200) {
        paidProductList.list = res.data.ad_type;
        paidProductList.isFree = paidProductList.list.filter((e) => {
        return e.is_disable === '1'
      })
      }
    }

    function toUse(type, sub_types, i, j) {
      paidProductList.list[i].sub_types.splice(j, 1);
      sub_types.ad_type = type;
      paidProductList.selectedList.push(sub_types);
      paidProductList.selectedListId.push(sub_types.id);
      console.log(paidProductList.selectedList);
      console.log(paidProductList.selectedListId);
    }

    function removeProduct(i, item) {
      console.log(item);
      let type = paidProductList.selectedList[i].ad_type;

      for (let j = 0; j < paidProductList.list.length; j++) {
        if (paidProductList.list[j].ad_type === type) {
          paidProductList.list[j].is_disable = "0";
          paidProductList.list[j].sub_types.push(
            paidProductList.selectedList[i]
          );
        }
      }
      paidProductList.selectedList.splice(i, 1);
      paidProductList.selectedListId.splice(i, 1);
      if(paidProductList.selectedList.length === 1 && paidProductList.selectedList[0].ad_type === 'upgle') {
        paidProductList.selectedList = []
        let objIndex = paidProductList.list.findIndex((obj => obj.ad_type === 'upgle'));
        paidProductList.list[objIndex].is_disable = "0"
      }
      
    }

    async function apply() {
      let userData = {
        array_sub_type_id: paidProductList.selectedListId,
      };
      let res = await jobListing.applyPaidFeature(props.id, userData);
      if (res.status === 200) {
        paidProductList.list = res.data.ad_type;
        paidProductList.isPaidProductConfirmModal = true;
      }
    }

    return {
      popClose,
      commonStore,
      paidProductList,
      PaidProductStorageList,
      toUse,
      removeProduct,
      apply,
    };
  },
};
</script>
  
  