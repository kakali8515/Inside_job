<template>
    <CustomModal v-if="isModal" modalSize="modal-lg">
      <template v-slot:header>
        <span class="cross-btn">
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" @click="$emit('closeModal')"/>
      </span>
    </template>
      <template v-slot:body>
        <h3 class="sub-heading lg">비밀번호 입력</h3>
        <div class="form-wrapper">
            <div class="form-group mb-24">
              <div class="password-input">
                  <input :type="passwordFieldType" v-model="password" :class="[errors && errors.password ? 'error-field': '', 'form-control']" maxlength="16" placeholder="비밀번호를 입력해 주세요" />
                  <span @click="switchVisibility" v-if="passwordFieldType !== 'password'" class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span>
                  <span @click="switchVisibility" v-else class="eye"><img src="@/assets/icons/eye-open.svg" alt=""/></span>
              </div>
              <div><small v-if="errors && errors.password" class="error-msgsign text-left">{{errors.password}}</small></div>
            </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="btn-grp">
          <button 
            class="btn btn-primary lg"
            @click="$emit('confirm', consultationId, password)"
          >
          확인
          </button>
        </div>
      </template>
    </CustomModal>
  </template>
  
  <script>
  import CustomModal from "@/components/Utils/CustomModal.vue";
  import { watch } from "vue";
  import { ref } from "@vue/reactivity";
  export default {
    props: { isModal: Boolean, consultationId: Number, errors: Object },
    components: { CustomModal },
    setup(props) {
    const password = ref('');
    const passwordFieldType = ref('password')

    const switchVisibility = () => {
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'test' : 'password'
    }

    watch(() => props.isModal, async (first, second) => {
      passwordEmpty();
    });

    const passwordEmpty = () => {
      password.value = ''
    }


    return {
        password,
        passwordFieldType,
        switchVisibility

    };
  },

  };
  </script>
  