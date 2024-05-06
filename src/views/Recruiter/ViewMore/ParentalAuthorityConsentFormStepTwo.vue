<template>
  <div class="back-wh mb-16">
    <div class="top-hdr mb-0">
      <div class="container">
        <InnerHeader headerTitle="근로계약서" />
      </div>
    </div>
    <div class="container">
      <div class="step-otr">
        <ul class="step-list">
          <li class="active">STEP.1 <br />유형선택</li>
          <li class="active">STEP.2 <br />계약서 작성</li>
          <li>STEP.3 <br />작성완료</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="form-wrapper employment-form-wrap">
    <form>
      <!-- Business Owners name -->
      <div class="back-wh">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.businessOwner && 'valid-error'
              }`"
            >
              <label>사업주 명<span>[필수]</span></label>
              <input
                type="text"
                placeholder="대표자 명을 입력해 주세요"
                class="form-control"
                v-model="businessOwnerName"
              />
              <p v-if="errors && errors?.businessOwner" class="error-msg">
                {{ errors?.businessOwner }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0 business-info">
              <label>사업주 정보</label>
              <ul class="post-list">
                <li>
                  <p class="p-left">사업체명</p>
                  <p class="p-right">{{ companyName }}</p>
                </li>
                <li>
                  <p class="p-left">전화번호</p>
                  <p class="p-right">{{ companyPhoneNo }}</p>
                </li>
                <li>
                  <p class="p-left">주소</p>
                  <p class="p-right">{{ companyAddress }}</p>
                </li>
                <li>
                  <p class="p-left">대표자 명</p>
                  <p class="p-right">{{ businessOwnerName }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.parentName && 'valid-error'
              }`"
            >
              <label>친권자(후견인)성명<span>[필수]</span></label>
              <input
                type="text"
                placeholder="친권자(후견인)성명을 작성해 주세요"
                class="form-control"
                v-model="name_of_parent"
              />
              <p v-if="errors && errors?.parentName" class="error-msg">
                {{ errors?.parentName }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.parentAddress && 'valid-error'
              }`"
            >
              <label>친권자(후견인)주소<span>[필수]</span></label>
              <input
                type="text"
                placeholder="친권자(후견인)주소를 작성해 주세요"
                class="form-control"
                v-model="address_of_parental_authority"
              />
              <p v-if="errors && errors?.parentAddress" class="error-msg">
                {{ errors?.parentAddress }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.contactInfoParent && 'valid-error'
              }`">
              <label>친권자(후견인)연락처<span>[필수]</span></label>
              <input
                type="number"
                placeholder="친권자(후견인)연락처를 작성해 주세요"
                class="form-control"
                :value="contact_information_of_parental"
                @change="
                  (e) => (contact_information_of_parental = e.target.value)
                "
              />
              <p v-if="errors && errors?.contactInfoParent" class="error-msg">
                {{ errors?.contactInfoParent }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.relationship_with_youngworkers && 'valid-error'
              }`">
              <label>연소근로자와의 관계<span>[필수]</span></label>
              <input
                type="text"
                placeholder="연소근로자와의 관계를 작성해 주세요"
                class="form-control"
                v-model="relationship_with_youngworkers"
              />
              <p
                v-if="errors && errors?.relationship_with_youngworkers"
                class="error-msg"
              >
                {{ errors?.relationship_with_youngworkers }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.name_of_worker && 'valid-error'
              }`">
              <label>연소근로자 성명<span>[필수]</span></label>
              <input
                type="text"
                placeholder="김알바생"
                class="form-control"
                v-model="name_of_worker"
              />
              <p v-if="errors && errors?.name_of_worker" class="error-msg">
                {{ errors?.name_of_worker }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.email && 'valid-error'
              }`">
              <label>근로자 이메일<span>[필수]</span></label>
              <input
                type="text"
                placeholder="근로자 이메일을 작성해 주세요."
                class="form-control"
                v-model="email"
              />
              <p v-if="errors && errors?.email" class="error-msg">
                {{ errors?.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.ageOfWorker && 'valid-error'
              }`">
              <label>연소근로자 만 나이<span>[필수]</span></label>
              <div class="wage-input-wrap age-input">
                <input
                  type="number"
                  class="form-control"
                  placeholder="0"
                  v-model="age_of_worker"
                />
                <span class="won">세</span>
              </div>
              <p v-if="errors && errors?.ageOfWorker" class="error-msg">
                {{ errors?.ageOfWorker }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.youngWorkerAddress && 'valid-error'
              }`">
              <label>연소근로자 주소<span>[필수]</span></label>
              <input
                type="text"
                placeholder="연소근로자 주소를 작성해 주세요"
                class="form-control"
                v-model="address_of_young_worker"
              />
              <p v-if="errors && errors?.youngWorkerAddress" class="error-msg">
                {{ errors?.youngWorkerAddress }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div :class="`form-group mb-0 ${
                errors && errors?.youngWorkerContact && 'valid-error'
              }`">
              <label>연소근로자 연락처<span>[필수]</span></label>
              <input
                type="number"
                placeholder="연소근로자 연락처를 작성해 주세요"
                class="form-control"
                :value="contact_information_of_youngworker"
                @change="
                  (e) => (contact_information_of_youngworker = e.target.value)
                "
              />
              <p v-if="errors && errors?.youngWorkerContact" class="error-msg">
                {{ errors?.youngWorkerContact }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <label class="mb-16">친권자 서명<span>[필수]</span></label>
              <div
                class="worker-sign-cont mb-16"
                v-if="signatureBase64.length > 0"
              >
                <img :src="signatureBase64" alt="" />
              </div>
              <button
                class="btn btn-outline-primary lg"
                type="button"
                @click="
                  () => {
                    openSignModal.isOpen = true;
                  }
                "
              >
                서명하기
              </button>
              <p v-if="errors && errors?.signature" class="error-msg">
                {{ errors?.signature }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-100">
          <div class="container condition-cont">
            <!-- Accept the terms and conditions -->
            <div class="form-group mb-0">
              <label>이용약관 동의<span>[필수]</span></label>
              <div class="condition-checkbox-otr">
                <label class="check-input"
                  >개인정보수집 및 이용동의
                  <input type="checkbox" value="" v-model="privacy.check" />
                  <span class="checkmark"></span>
                </label>
                <button type="button" class="exe" @click="openPrivacyPolicy">
                  보기
                </button>
              </div>
              <p v-if="errors && errors?.terms" class="error-msg">
                {{ errors?.terms }}
              </p>
            </div>
            <!-- date of creation -->
            <p class="date-box" v-if="functionType == 'edit'">
              작성일은
              <em>{{ commonStore.methods.dateFormat(createdDate, "YYYY") }}</em>
              <span>년</span>
              <em>{{ commonStore.methods.dateFormat(createdDate, "M") }}</em>
              <span>월</span
              ><em>{{ commonStore.methods.dateFormat(createdDate, "D") }}</em
              ><span>일</span> 입니다.
            </p>
            <div class="fixed-btn-otr">
              <button
                class="btn btn-primary lg"
                type="button"
                @click="isSubmit"
                :disabled="disabledSubmit"
              >
                계약서 작성 완료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="required-fields-icon" v-if="commonStore.state.requiredToastMsgShow">
      <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
    </div>
    <EmploymentSignature
      :isOpen="openSignModal.isOpen"
      @save="approveContract($event)"
      @closeModal="
        () => {
          openSignModal.isOpen = false;
        }
      "
    />
    <CompletionOfLaborContract
      :isModal="showSuccessModal"
      @closeModal="closeSuccessModal"
    />
    <TermsOfService
      v-if="commonStore.state.isTermsOfServiceModal"
      :modalName="privacy.type"
    />
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { employmentService } from "@/service/API/EmplymentContract.js";
import { profile } from "@/service/API/profile.js";
import { useRouter } from "vue-router";
import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
} from "@vue/runtime-core";
import EmploymentSignature from "@/views/JobSeekers/EmploymentSignature.vue";
import CompletionOfLaborContract from "@/components/Modals/CompletionOfLaborContract.vue";
import ParentalAuthorityValidation from "@/Validations/parentalContract.js";
import TermsOfService from "@/views/JobSeekers/TermsOfService.vue";
export default {
  name: "ParentalAuthorityConsentFormStepTwo",
  components: {
    InnerHeader,
    Tabs,
    TabWrapper,
    EmploymentSignature,
    CompletionOfLaborContract,
    TermsOfService,
  },

  setup() {
    const employmentStore = inject("employmentStore");
    const commonStore = inject("commonStore");
    const businessOwnerName = ref("");
    const companyAddress = ref("");
    const companyPhoneNo = ref("");
    const companyrepresentative = ref("");
    const companyName = ref("");
    const name_of_parent = ref("");
    const address_of_parental_authority = ref("");
    const contact_information_of_parental = ref("");
    const relationship_with_youngworkers = ref("");
    const name_of_worker = ref("");
    const email = ref("");
    const age_of_worker = ref("");
    const address_of_young_worker = ref("");
    const contact_information_of_youngworker = ref("");
    const openSignModal = reactive({
      isOpen: false,
    });
    const signatureBase64 = ref("");
    const signature = ref(null);
    const privacy = reactive({
      check: false,
      type: "",
    });
    const errors = ref({});
    const showSuccessModal = ref(false);
    const date = new Date();
    const createdDate = ref("");

    const router = useRouter();
    const editId = ref(localStorage.getItem("contractId"));
    const functionType = ref(localStorage.getItem("contractFormType"));
    const disabledSubmit = ref(false);
    // const emailError = ref("");

    provide("openSignModal", openSignModal);

    const checkTypeForm = () => {
      if (functionType.value == "add") {
        if (!employmentStore.state.employmentFormtype) {
          router.push({ name: "EmploymentContractWritingStepOne" });
        }
      } else {
        if (!editId.value) {
          router.go(-1);
        }
      }
    };

    onMounted(() => {
      checkTypeForm();
      employerDetails();
      if (functionType.value == "edit") {
        formDetails();
      }
    });

    onUnmounted(() => {
      localStorage.removeItem("contractFormType");
      localStorage.removeItem("contractId");
      functionType.value = "";
      editId.value = "";
    });

    // get details for prefield data for edit screen
    const formDetails = async () => {
      let res = await employmentService.formDetails(editId.value);
      console.log(res);
      employmentStore.state.employmentFormtype = res.data.type;
      businessOwnerName.value = res.data.business_owner_name;
      signatureBase64.value = res.data.signature;
      name_of_worker.value = res.data.name_of_worker;
      email.value = res.data.seeker_email;
      privacy.check = true;
      name_of_parent.value = res.data.name_of_parent;
      address_of_parental_authority.value =
        res.data.address_of_parental_authority;
      contact_information_of_parental.value =
        res.data.contact_information_of_parental;
      relationship_with_youngworkers.value =
        res.data.relationship_with_youngworkers;
      age_of_worker.value = res.data.age_of_worker;
      address_of_young_worker.value = res.data.address_of_young_worker;
      contact_information_of_youngworker.value =
        res.data.contact_information_of_youngworker;
      createdDate.value = res.data.created_at;
    };

    const employerDetails = async () => {
      let res = await profile.userDeatils();
      console.log(res);
      companyAddress.value = res.data.address;
      companyPhoneNo.value = res.data.phone_number;
      companyrepresentative.value = res.data.name;
      companyName.value = res.data.company_info.company_name;
    };

    const approveContract = (event) => {
      console.log("image", event);
      openSignModal.isOpen = false;
      signature.value = event;
      const reader = new FileReader();
      reader.onload = (e) => {
        signatureBase64.value = e.target.result;
      };
      reader.readAsDataURL(event);
      console.log(signatureBase64.value);
    };

    const checkError = (data) => {
      const { isInvalid, error } = ParentalAuthorityValidation(data);
      console.log(error)
      if(error.require) {
        commonStore.methods.displayRequiredToast()
      }
      if (isInvalid) {
        errors.value = error;
        console.log(errors.value, "check error");
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const isSubmit = async () => {
      disabledSubmit.value = true;
      let inputData = {
        type: employmentStore.state.employmentFormtype,
        email: email.value,
        business_owner_name: businessOwnerName.value,
        name_of_parent: name_of_parent.value,
        address_of_parental_authority: address_of_parental_authority.value,
        contact_information_of_parental: String(
          contact_information_of_parental.value
        ),
        age_of_worker: String(age_of_worker.value),
        address_of_young_worker: address_of_young_worker.value,
        contact_information_of_youngworker: String(
          contact_information_of_youngworker.value
        ),
        name_of_worker: name_of_worker.value,
        image: signature.value,
        termsOfservice: privacy.check,
        relationship_with_youngworkers: relationship_with_youngworkers.value,
        pageState: functionType.value,
      };
      console.log(inputData);
      if (!checkError(inputData)) {
        // commonStore.methods.displayRequiredToast()
        disabledSubmit.value = false;
        return;
      } else {
        console.log("ready");
        const formData = new FormData();
        formData.append("type", employmentStore.state.employmentFormtype);
        formData.append("email", email.value);
        formData.append("business_owner_name", businessOwnerName.value);
        formData.append("name_of_parent", inputData.name_of_parent);
        formData.append(
          "address_of_parental_authority",
          inputData.address_of_parental_authority
        );
        formData.append(
          "contact_information_of_parental",
          inputData.contact_information_of_parental
        );
        formData.append(
          "relationship_with_youngworkers",
          inputData.relationship_with_youngworkers
        );
        formData.append("age_of_worker", inputData.age_of_worker);
        formData.append(
          "address_of_young_worker",
          inputData.address_of_young_worker
        );
        formData.append(
          "contact_information_of_youngworker",
          inputData.contact_information_of_youngworker
        );
        formData.append("name_of_worker", inputData.name_of_worker);
        if (signature.value != null) {
          formData.append("image", inputData.image);
        }

        if (functionType.value == "add") {
          let res = await employmentService.contractAdd(formData);
          console.log(res);
          if (res.status === 200) {
            // emailError.value = "";
            showSuccessModal.value = true;
            disabledSubmit.value = false;
          } else if (res.response.data.error == "invalidEmail") {
            errors.value["email"] = "존재하지 않는 이메일입니다.";
            disabledSubmit.value = false;
          } else {
            disabledSubmit.value = false;
          }
        } else {
          formData.delete("email");
          let res = await employmentService.contractEdit(
            editId.value,
            formData
          );
          console.log(res);
          if (res.status === 200) {
            showSuccessModal.value = true;
            disabledSubmit.value = false;
          } else {
            disabledSubmit.value = false;
          }
        }
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      router.push({ name: "LaborContract" });
    };

    function openPrivacyPolicy() {
      commonStore.state.isTermsOfServiceModal = true;
      privacy.type = "privacyPolicy";
    }

    return {
      employmentStore,
      companyAddress,
      companyPhoneNo,
      companyrepresentative,
      companyName,
      name_of_parent,
      address_of_parental_authority,
      contact_information_of_parental,
      relationship_with_youngworkers,
      name_of_worker,
      email,
      // emailError,
      age_of_worker,
      address_of_young_worker,
      contact_information_of_youngworker,
      openSignModal,
      signatureBase64,
      approveContract,
      commonStore,
      errors,
      date,
      privacy,
      isSubmit,
      showSuccessModal,
      closeSuccessModal,
      functionType,
      disabledSubmit,
      createdDate,
      openPrivacyPolicy,
      businessOwnerName,
    };
  },
};
</script>

<style scoped>
.error-msg {
  color: rgb(212, 52, 52);
  margin-top: 4px;
}
</style>
