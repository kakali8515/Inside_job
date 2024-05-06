<template>
  <div class="tabs">
    <div class="tabs-otr">
      <ul class="tabs-header">
        <li
          v-for="title in tabTitles"
          :key="title"
          :class="{ active: title == selectedTitle }"
          @click="selectTitle(title)"
        >
          <span>{{ title }}</span>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
import { ref, provide, watch, watchEffect } from "vue";

export default {
  props: {
    defaultSelect: {
      type: Number,
      default: 0,
    },
  },
  emits: ["getResponseTitle"],
  setup(props, { slots, emit }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[props.defaultSelect]);

    watch(
      () => props.defaultSelect,
      (newVal, oldVal) => {
        console.log(newVal, props.defaultSelect);
        selectedTitle.value = tabTitles.value[newVal];
        console.log(selectedTitle.value);
        emit("getResponseTitle", selectedTitle.value);
      }
    );

    function selectTitle(title) {
      selectedTitle.value = title;
      emit("getResponseTitle", title);
    }

    provide("selectedTitle", selectedTitle);
    return {
      tabTitles,
      selectedTitle,
      selectTitle,
    };
  },
  // methods: {
  //   selectTitle(title) {
  //     this.selectedTitle = title;
  //     this.$emit("getResponseTitle", title);
  //   },
  // },
};
</script>
