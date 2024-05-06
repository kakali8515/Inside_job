<template>
    <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.showPositionSuggestionSetup"
  >
    <div class="back-wh common-sec common-sec-modal">  
         <!-- <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" @click="$router.go(-1)" /></a>포지션 제안 설정
                </h4>
            </div>
        </div>    -->

        <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >포지션 제안 설정
          </h4>
        </div>
      </div>
        <div class="border-btm">
            <div class="container">   
                <div class="sub-otr mb-21 b-color">
                    <h3 class="sub-heading mb-0">포지션 제안 선택</h3>
                </div>
                <div class="form-wrapper">
                    <div class="form-group mb-0">
                        <ul class="radio-wrapper block">
                            <li>
                                <label class="radio-input"
                                >모든 회사에게
                                <input type="radio" value="all" checked="checked" v-model="checkedPositionOffer" name="radio" />
                                <span class="checkmark"></span>
                                </label>
                            </li>
                            <li>
                                <label class="radio-input"
                                >희망직종만 제안 받기
                                <input type="radio" value="desired" v-model="checkedPositionOffer" name="radio" />
                                <span class="checkmark"></span>
                                </label>
                            </li>
                            <li>
                                <label class="radio-input"
                                >제안 받지 않기
                                <input type="radio" value="off" v-model="checkedPositionOffer" name="radio" />
                                <span class="checkmark"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>            
            </div>
        </div>     
            
    </div>

      <div class="btn-space mt-0 modal-btn">           
        <button @click="$emit('confirm', checkedPositionOffer)"  class="btn btn-primary lg" >저장하기</button>           
        </div> 
    </Sheet>
</template>
  
  <script>
  import { ref } from "@vue/reactivity";
  import { onBeforeMount, inject } from "@vue/runtime-core";
  import { PositionOfferService } from '../../service/API/PositionOffer';
  import { useRouter } from 'vue-router';
  export default {
    name: "PositionSuggestionSetup",
    setup({emit}) {
    const router = useRouter();
    const checkedPositionOffer = ref('all');
    const commonStore = inject("commonStore");

    onBeforeMount(async () => {
      await offerDetails();
    });

    const popClose = (event) => {
        console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    const offerDetails = async () => {
      let res = await PositionOfferService.positionOfferDetails();
      console.log(res.data)
      checkedPositionOffer.value = res.data.position_offer
    };

    return {
        commonStore,
        checkedPositionOffer,
        popClose
    };
  },
  };
  </script>
  