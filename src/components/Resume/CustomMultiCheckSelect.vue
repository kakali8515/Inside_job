<template>
  <div class="form-group mb-0">
    <div class="d-flex mb-8">
      <label>{{ title }} <span>[필수]</span></label>
      <p class="number lg">
        <span>{{ selectValue.length }}</span
        >/{{ limit }}
      </p>
    </div>
    <ul class="check-list box-check">
      <li v-for="(i, e) in optionArray" :key="e">
        <label class="check-input">
          <input
            type="checkbox"
            :value="i.value"
            v-model="selectValue"
            @change="checkLimit()"
          />
          <span class="text">{{ i.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomMultiCheckSelect",
  props: {
    title: String,
    limit: Number,
    optionArray: {
      type: Array,
      default: () => [],
    },
    preselected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectValue: [],
    };
  },
  mounted() {
    this.selectValue = this.preselected;
  },
  watch: {
    preselected: function (val) {
      console.log();
      this.selectValue = val;
    },
  },
  methods: {
    checkLimit() {
      if (this.selectValue.length > this.limit) {
        this.selectValue.pop();
        this.$emit("selectedValues", this.selectValue);
      } else {
        this.$emit("selectedValues", this.selectValue);
      }
    },
  },
};
</script>

<style></style>
