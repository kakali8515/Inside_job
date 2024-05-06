<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="87%"
    v-slot="{ closeSelf }"
    v-model:visible="openModal.isOpen"
  >
    <div :class="`back-wh ${commonStore.state.currentThemeStore}`">
      <div class="signature-wrapper">
        <div class="">
          <div class="signature-header">
            <h3>서명하기</h3>
            <a
              href="javascript:void(0);"
              class="cross-arrow"
              @click="popClose(true, closeSelf())"
            >
              <img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </div>
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">서명</h3>
          </div>
          <div class="worker-sign-cont">
            <VueSignaturePad
              id="signature"
              width="100%"
              height="184px"
              ref="signaturePad"
            />
          </div>
          <span class="note-text"
            >서명 시 싸인은 안되며 이름을 정자로 쓰시기 바랍니다.
          </span>
          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
          <div class="btm-button-group mt-32 btm-half-button">
            <button class="btn btn-primary-outline" @click="undo">
              다시 서명하기
            </button>
            <button class="btn btn-primary" @click="save()">서명하기</button>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
</template>
<script>
import { inject, onMounted, ref } from "@vue/runtime-core";
export default {
  name: "EmploymentSignature",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    prevSign: {
      type: String,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const commonStore = inject("commonStore");
    const openModal = inject("openSignModal");
    // const signaturePad = ref("");

    // onMounted(() => {
    //   signaturePad.value = props.prevSign;
    // });

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
        emit("closeModal");
      }
    };

    return {
      commonStore,
      openModal,
      // signaturePad,
      popClose,
    };
  },
  data() {
    return {
      errorMsg: "",
    };
  },
  watch: {
    openModal: {
      handler(newValue, oldValue) {
        if (newValue.isOpen) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
          this.errorMsg = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    undo() {
      this.$refs.signaturePad.clearSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      if (!isEmpty) {
        var file = this.dataURLtoFile(data, "signature.png");
        console.log(file);
        this.errorMsg = "";
        this.$emit("save", file);
      } else {
        this.errorMsg = "첨부하려면 서명하십시오.";
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>

<style scoped>
.error-msg {
  color: rgb(212, 52, 52);
  margin-top: 4px;
}
</style>
