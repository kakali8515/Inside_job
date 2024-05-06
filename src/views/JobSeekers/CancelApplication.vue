<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonStore.state.isCancleApplication"
  >
    <div :class="`back-wh ${commonStore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a @click="popClose(true, closeSelf())" class="cross-arrow">
              <img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >지원 취소
          </h4>
        </div>
      </div>
      <div class="border-btm cancle-app-border">
        <div class="container">
          <div class="sub-otr mb-21 b-color">
            <h3 class="sub-heading mb-0">취소 사유</h3>
          </div>
          <div class="form-wrapper">
            <div class="form-group mb-0">
              <ul class="radio-wrapper block cancle-app-modal">
                <li v-for="(item, i) in cancelApplication.reason" :key="i">
                  <label class="radio-input"
                    >{{ item }}
                    <input
                      type="radio"
                      name="radio"
                      :value="cancelApplication.reason[i]"
                      v-model="cancelApplication.selectedReason"
                    />
                    <span class="checkmark"></span>
                  </label>
                </li>
                <!-- click others  -->
                <div
                  class="form-wraper mt-16"
                  v-if="cancelApplication.selectedReason === '기타'"
                >
                  <div class="form-group mb-0">
                    <div
                      :class="`group ${
                        cancelApplication.errors?.reason ? 'valid-error' : ''
                      }`"
                    >
                      <textarea
                        v-model.trim="cancelApplication.otherInfo"
                        class="form-control"
                        placeholder="기타 내용을 입력해주세요."
                      ></textarea>
                    </div>
                    <small
                      style="color: red"
                      v-if="
                        cancelApplication.errors &&
                        cancelApplication.errors?.reason
                      "
                      class="error-msg"
                      >{{ cancelApplication.errors?.reason }}</small
                    >

                    <!-- class="form-control  border" -->
                  </div>
                </div>
                <!-- <li>{{cancelApplication.selectedReason}}
                  <label class="radio-input"
                    >모집내용이 저와 맞지 않아 지원 취소합니다.
                    <input type="radio" name="radio" value="모집내용이 저와 맞지 않아 지원 취소합니다." v-model="cancelApplication.selectedReason"/>
                    <span class="checkmark"></span>
                  </label>
                </li>
                <li>
                  <label class="radio-input"
                    >다른 알바를 구했습니다.
                    <input type="radio" name="radio" v-model="cancelApplication.selectedReason" />
                    <span class="checkmark"></span>
                  </label>
                </li>
                <li>
                  <label class="radio-input"
                    >기타
                    <input type="radio" name="radio" v-model="cancelApplication.selectedReason" />
                    <span class="checkmark"></span>
                  </label>
                   click others 
                  <div class="form-wraper mt-16">
                    <div class="form-group mb-0">
                      <input
                        type="text"
                        placeholder="기타 내용을 입력해주세요."
                        class="form-control border"
                      />
                    </div>
                  </div>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pb-32 pt-187">
        <div class="container">
          <div class="btnn-group fixed-btn-otr p-16">
            <div class="btn-group-innr">
              <button
                type="button"
                class="btn btn-primary-outline lg"
                @click="$emit('cancelModel')"
              >
                취소
              </button>
            </div>
            <div class="btn-group-innr">
              <input
                type="submit"
                class="btn btn-primary lg"
                value="확인"
                @click="confirmCancelApplication()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
</template>
  
  <script>
import { inject, reactive, watch } from "vue";
export default {
  name: "CancelApplication",
  emits: ["conifrmModel"],

  setup(props, { emit }) {
    const commonStore = inject("commonStore");
    const cancelApplication = reactive({
      reason: [
        "이력서 변경 후 다시 지원하겠습니다.",
        "모집내용이 저와 맞지 않아 지원 취소합니다.",
        "다른 알바를 구했습니다.",
        "기타",
      ],
      selectedReason: "이력서 변경 후 다시 지원하겠습니다.",
      otherInfo: "",
      errors: [],
    });

    watch(
      () => cancelApplication.selectedReason,
      () => {
        cancelApplication.otherInfo = "";
        cancelApplication.errors.reason = "";
      }
    );

    watch(
      () => commonStore.state.isCancleApplication,
      () => {
        cancelApplication.otherInfo = "";
        cancelApplication.selectedReason =
          "이력서 변경 후 다시 지원하겠습니다.";
        cancelApplication.errors.reason = "";
      }
    );

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    const confirmCancelApplication = () => {
      let reason =
        cancelApplication.selectedReason === "기타"
          ? cancelApplication.otherInfo
          : cancelApplication.selectedReason;
      if (
        cancelApplication.selectedReason === "기타" &&
        cancelApplication.otherInfo === ""
      ) {
        cancelApplication.errors.reason = "필수 입력항목입니다.";
        return;
      }
      emit("conifrmModel", reason);
    };

    return {
      cancelApplication,
      popClose,
      commonStore,
      confirmCancelApplication,
    };
  },
};
</script>
