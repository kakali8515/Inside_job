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
          <span v-html="title"></span>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
import { ref, provide, onMounted, watch } from "vue";

export default {
  props: {
    defaultSelect: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    console.log("slots", slots.default());
    const children = ref(
      slots.default().map((item) => {
        // console.log(item);
        if (Array.isArray(item.children)) {
          return item.children?.map((tab) => tab.props?.title);
        }
      })
    );
    console.log(children);
    const tabTitles = ref(children.value[0].map((tab) => tab));
    // console.log(tabTitles.value[0])
    const selectedTitle = ref(tabTitles.value[props.defaultSelect]);

    watch(
      () => props.defaultSelect,
      (newVal, oldVal) => {
        selectedTitle.value = tabTitles.value[newVal];
      }
    );

    provide("selectedTitle", selectedTitle);
    return {
      tabTitles,
      selectedTitle,
    };
  },
  methods: {
    selectTitle(title) {
      this.selectedTitle = title;
      this.$emit("getResponseTitle", title);
    },
  },
};
</script>
