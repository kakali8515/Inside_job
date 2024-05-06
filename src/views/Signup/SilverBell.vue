<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    maxHeight="80%"
    v-slot="{ closeSelf }"
    v-model:visible="commonstore.state.isSilverBellOpen" class="sliverbell-sheet"
  >
    <div :class="`common-sec-gap-silver back-wh mypage-silver-bell-cont ${commonstore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            실버벨
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </h4>
        </div>
      </div>
      <div class="container">
        <div class="sub-otr">
          <h3 class="sub-heading lg">실버벨 서비스</h3>
          <p>
            실버벨 서비스를 사용하시면 글자 크기가 확대 되며, 중장년 일자리를
            우선 추천해 드립니다.
          </p>
        </div>
        <div class="form-wrapper">
          <form>
            <div class="form-group mb-0">
              <div class="radio-wrapper full">
                <label class="radio-input">
                  <input
                    type="radio"
                    checked="checked"
                    name="radio"
                    value="theme-small"
                    v-model="radioValue"
                  />
                  <span class="checkmark"></span>
                  <p>청소년/청년층 <br />이 글자 크기 선택</p>
                </label>
                <label class="radio-input radio-input-lg">
                  <input
                    type="radio"
                    name="radio"
                    value="theme-large"
                    v-model="radioValue"
                  />
                  <span class="checkmark"></span>
                  <p>
                    중장년 <br />
                    이 글자 크기 선택
                  </p>
                </label>
              </div>
            </div>
            <!-- <div class="btn-space">
              <input
                type="submit"
                value="적용하기"
                class="btn btn-primary lg"
              />
            </div> -->
            
          </form>
        </div>
      </div>
    </div>

    <div class="bell-aply-btn fixed-btn-otr">
              <button @click="getTheme($event, closeSelf())" class="btn btn-primary lg">적용하기</button>
            </div>

  </Sheet>
</template>

<script>
import { inject, ref } from "@vue/runtime-core";
export default {
  name: "SilverBell",
  setup() {
    const commonstore = inject("commonStore");
    const radioValue = ref("theme-small");

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    const getTheme = (e) => {
      e.preventDefault();
      commonstore.methods.changeTheme(radioValue.value);
      localStorage.removeItem("silverBtn-modal");
    };

    return {
      commonstore,
      radioValue,
      popClose,
      getTheme,
    };
  },
};
</script>
