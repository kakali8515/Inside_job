<template>
  <div class="back-wh mb-16">
    <div class="top-hdr mb-0 top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="근로계약서" />
      </div>
    </div>
    <div class="container">
      <div class="step-otr">
        <ul class="step-list">
          <li class="active">STEP.1 <br />유형선택</li>
          <li>STEP.2 <br />계약서 작성</li>
          <li>STEP.3 <br />작성완료</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="back-wh">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr no-border">
          <h3 class="sub-heading lg mb-16">
            근로계약서 작성 전 꼭 확인해 주세요!
          </h3>
          <ul class="contract-list">
            <li>
              실제 채용이 결정된 후 해당 근로자 및 사업주를 상대로 근로계약서를 작성하여야 합니다.
            </li>
            <li>
              근로자와 사업주 양측 모두 전자서명까지 반드시 완료되어야 효력이 발생합니다.
            </li>
            <li>
              사업주와 근로자 간 근로계약이 체결되면 근로계약서를 인쇄하여 1부씩 보관해야 합니다.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-top">
      <div class="cm-top-space pb-80">
        <div class="container">
          <div class="employ-contract-list">
            <ul>
              <li
                :class="`${selectedType === 'standard' ? 'active' : ''}`"
                @click="setType('standard')"
              >
                <a href="javascript:void(0)">
                  <p>
                    표준 근로 계약서
                    <span>기본 근로 계약서</span>
                  </p>
                  <img src="@/assets/icons/standard-labor-icon.svg" alt="" />
                </a>
              </li>
              <li
                :class="`${selectedType === 'parttime' ? 'active' : ''}`"
                @click="setType('parttime')"
              >
                <a href="javascript:void(0)">
                  <p>
                    단시간 근로자 계약서
                    <span>단시간 근로자를 위한 계약서</span>
                  </p>
                  <img src="@/assets/icons/parttime-labor-icon.svg" alt="" />
                </a>
              </li>
              <li
                :class="`${selectedType === 'young_worker' ? 'active' : ''}`"
                @click="setType('young_worker')"
              >
                <a href="javascript:void(0)">
                  <p>
                    연소 근로자 계약서
                    <span>18세 미만 근로자를 위한 계약서</span>
                  </p>
                  <img src="@/assets/icons/young-labor-icon.svg" alt="" />
                </a>
              </li>
              <li
                :class="`${
                  selectedType === 'construction_day_worker' ? 'active' : ''
                }`"
                @click="setType('construction_day_worker')"
              >
                <a href="javascript:void(0)">
                  <p>
                    건설일용 근로자 계약서
                    <span>일용 근로자를 위한 계약서</span>
                  </p>
                  <img
                    src="@/assets/icons/construction-labor-icon.svg"
                    alt=""
                  />
                </a>
              </li>
              <li
                :class="`${
                  selectedType === 'parential_authority' ? 'active' : ''
                }`"
                @click="setType('parential_authority')"
              >
                <a href="javascript:void(0)">
                  <p>
                    친권자(후견인) 동의서
                    <span>친권자의 동의서 양식</span>
                  </p>
                  <img
                    src="@/assets/icons/parental-authority-icon.svg"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="btm-button-group fixed-btn-otr">
    <button class="btn btn-primary lg" @click="completeStepOne">
      다음으로
    </button>
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { inject, onBeforeMount, onMounted } from "@vue/runtime-core";
export default {
  name: "EmploymentContractWritingStepOne",
  components: { InnerHeader },

  setup() {
    const selectedType = ref("standard");
    const router = useRouter();
    const employmentStore = inject("employmentStore");

    onMounted(() => {
      employmentStore.state.employmentFormtype = selectedType.value;
    });

    const setType = (val) => {
      selectedType.value = val;
      employmentStore.state.employmentFormtype = val;
    };

    const completeStepOne = () => {
      localStorage.setItem("contractFormType", "add");
      if (selectedType.value == "standard") {
        router.push({
          name: "StandardLaborContractStepTwo",
        });
      } else if (selectedType.value == "parttime") {
        router.push({
          name: "PartTimeWorkerContractStepTwo",
        });
      } else if (selectedType.value == "young_worker") {
        router.push({
          name: "YoungWorkerContractStepTwo",
        });
      } else if (selectedType.value == "construction_day_worker") {
        router.push({
          name: "ConstractionDayWorkerContractStepTwo",
        });
      } else {
        router.push({
          name: "ParentalAuthorityConsentFormStepTwo",
        });
      }
    };

    return {
      selectedType,
      setType,
      completeStepOne,
    };
  },
};
</script>
