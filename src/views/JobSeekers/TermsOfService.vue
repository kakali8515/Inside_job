<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isTermsOfServiceModal"
  >
    <div class="back-wh">
      <div class="top-hdr top-hdr-new m-0">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            ><span v-if="modalName === 'termsOfServices'"
              >위치기반 서비스 이용약관</span
            >
            <span v-if="modalName === 'privacyPolicy'">개인정보처리방침</span>
            <span v-if="modalName === 'memberBasedLocation'"
              >기업회원 이용약관</span
            >
            <span v-if="modalName === 'seekerTerms'">개인회원 이용약관</span>
          </h4>
        </div>
      </div>
      <div class="terms-service-wrapper pb-32">
        <div class="container">
          <div class="paragraph-area pa-h5-16">
            <div
              v-if="modalName === 'termsOfServices'"
              v-html="termsOfService.detail.termsAndConditions"
            ></div>
            <div
              v-if="modalName === 'memberBasedLocation'"
              v-html="termsOfService.detail.employerTerms"
            ></div>
            <div
              v-if="modalName === 'privacyPolicy'"
              v-html="termsOfService.detail.privacyPolicy"
            ></div>
            <div
              v-if="modalName === 'seekerTerms'"
              v-html="termsOfService.detail.seekerTerms"
            ></div>
            <!-- <h5>고객에 대한 존중</h5>
            <ul>
              <li>
                고객에게 이익이 되는 것은 회사에도 이익이 된다는 신념으로 고객을
                대합니다.
              </li>
              <li>
                항상 고객의 입장에서 생각하고, 고객의 의견을 존중하며, 고객과의
                약속은 반드시 지킵니다.
              </li>
              <li>
                제품과 서비스에 대해서는 정확한 정보만을 제공하고, 최상의 제품과
                서비스를 제공함으로써 고객만족의 실현을 위해 노력합니다.
              </li>
            </ul> -->
          </div>
          <!-- <div class="paragraph-area">
            <h5>법규 준수 및 공정한 경쟁</h5>
            <ul>
              <li>
                사업 및 영업 활동 시 모든 국가와 지역사회의 제반 법규를
                준수하며, 해당 국가나 지역의 관습, 문화 등과 같은 사회적
                가치관을 존중합니다.
              </li>
              <li>
                경쟁사를 존중하고, 경쟁사와의 공정하고 자유로운 경쟁을 통하여
                건전한 시장 질서를 확립하는데 앞장섭니다.
              </li>
            </ul>
          </div>
          <div class="paragraph-area">
            <h5>공정한 거래</h5>
            <ul>
              <li>
                모든 거래는 공정하고 평등한 참여의 기회가 보장되는 자유경쟁
                원칙에 따라 행합니다.
              </li>
              <li>
                우월적 지위를 이용하여 여하한 형태의 비윤리적이고 부적절한
                강요행위 및 영향력을 행사하지 않습니다.
              </li>
              <li>
                모든 거래 당사자들과는 상호 신뢰를 기반으로 하여 공동 발전을
                도모합니다.
              </li>
            </ul>
          </div>
          <div class="paragraph-area">
            <h5>주주에 대한 존중</h5>
            <ul>
              <li>
                건실한 경영활동을 통한 이익으ㄹ 실현함으로써 주주의 투자 수익을
                보호하도록 노력합니다.
              </li>
              <li>
                임직원은 회사에서의 지위를 이용하여 취득한 내부 정보를 활용하여
                개인적인 이익을 도모해서는 안 됩니다.
              </li>
              <li>
                주주와의 상호 신뢰관계 유지를 위해서 기업 정보를 정해진 법규에
                따라 투명하게 공개하며, 회계자료 등의 처리 및 보고는 해당 국가의
                기준과 법규에 철저히 따릅니다.
              </li>
            </ul>
          </div>
          <div class="paragraph-area">
            <h5>국가 및 사회에 대한 책임과 의무</h5>
            <ul>
              <li>
                국가와 사회의 구성원으로서 요구되는 역할과 의무를 성실히
                수행합니다.
              </li>
              <li>
                고용의 창출과 조세의 성실한 납부로 국가 발전에 기여하고,
                사회봉사 활동과 문화의 발전에 적극적으로 기여합니다.
              </li>
              <li>
                사업 및 영업 활동 시, 환경보호를 우선적으로 생각하며, 해당
                국가와 지역의 환경 기준을 철저히 준수합니다.
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </Sheet>
</template>

<script>
import { inject, onMounted, reactive, watch } from "@vue/runtime-core";
import InnerHeader from "../../components/innerHeader.vue";
import { TermsAndPrivacy } from "@/service/API/TermsAndPrivacy.js";

export default {
  name: "TermsOfService",
  components: {
    InnerHeader,
  },
  props: {
    modalName: String,
  },

  setup() {
    const commonStore = inject("commonStore");
    const termsOfService = reactive({
      detail: [],
    });

    onMounted(() => {
      termsDetail();
    });
    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    async function termsDetail() {
      let res = await TermsAndPrivacy.detail();
      console.log(res);
      if (res.status === 200) {
        termsOfService.detail = res.data;
      }
    }

    return {
      popClose,
      commonStore,
      termsOfService,
      termsDetail,
    };
  },
};
</script>
