<template>
  <div :class="`scrapped-icon ${isScraped && 'active'}`" >
    <p>
      <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
      스크랩했습니다.
    </p>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
export default {
  name: "ScrapedToast",
  props: {
    isScraped: Boolean,
  },
  emits: ["setFalse"],
  setup(props, { emit }) {
    watch(
      () => props.isScraped,
      (val) => {
        if (val) {
          console.log("scrape true");
          setTimeout(() => {
            emit("setFalse");
            console.log("scrape set false");
          }, 4000);
        }
      }
    );

    // onUnmounted(() => {
    //     clearTimeout()
    // })

    return {};
  },
};
</script>

<style></style>
