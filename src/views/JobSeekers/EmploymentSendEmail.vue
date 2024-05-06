<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="45%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isContractEmailModal"
  >
    <div :class="`back-wh ${commonStore.state.currentThemeStore}`">
      <div class="signature-wrapper">
        <div class="">
          <div class="signature-header">
            <h3>이메일 전송</h3>
            <a
              href="javascript:void(0);"
              class="cross-arrow"
              @click="popClose(true, closeSelf())"
            >
              <img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </div>
          <div class="sub-otr b-color send-mail-ht">
            <!-- <h3 class="sub-heading mb-0">서명</h3> -->
            <input
              class="form-control"
              type="email"
              style="width: 100%"
              v-model="sendEmail"
              :disabled="!setManual"
              placeholder="이메일 입력"
            />
          </div>
          <small class="error-msgsign">{{ errorMsg }}</small>

          <span class="note-text"
            >이메일 전송 클릭 시 해당 이메일로 전송됩니다.
          </span>
          <div
            :class="`mt-32 ${
              setManual ? 'btn-grp' : 'btm-button-group btm-half-button'
            }`"
          >
            <button
              class="btn btn-primary-outline"
              @click="setManualEmail"
              v-if="!setManual"
            >
              이메일 직접작성
            </button>
            <button class="btn btn-primary lg" @click="save()">
              이메일 전송하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  props: {
    Email: String,
  },
  setup() {
    const commonStore = inject("commonStore");

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    return {
      commonStore,
      popClose,
    };
  },
  beforeMount() {
    console.log(this.Email);
    if (this.Email?.length > 0) {
      this.sendEmail = this.Email;
    }
  },
  data() {
    return {
      sendEmail: "",
      setManual: false,
      errorMsg: "",
    };
  },
  methods: {
    setManualEmail() {
      this.setManual = true;
      this.sendEmail = "";
    },
    save() {
      var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.sendEmail.trim().length <= 0) {
        this.errorMsg = "올바른 이메일을 입력해주세요.";
      } else if (!emailCheck.test(this.sendEmail.trim())) {
        this.errorMsg = "올바른 이메일을 입력해주세요.";
      } else {
        this.errorMsg = "";
        this.$emit("sendMailto", this.sendEmail.trim());
        this.commonStore.state.isContractEmailModal = false;
      }
    },
  },
};
</script>

<style></style>
