<template>
  <div class="password-input">
    <input
      :type="disclosure ? 'text' : 'password'"
      class="form-control"
      :placeholder="inputPlaceholder"
      maxlength="16"
      @change="(e) => $emit('inputData', e.target.value)"
    />
    <span class="eye" @click="disclosure = !disclosure">
      <img
        src="@/assets/icons/eye.svg"
        v-if="disclosure"
        alt=""
      />
      <img
        src="@/assets/icons/eye-open.svg"
        v-else
        alt=""
      />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disclosure: false,
      eyeClosed: "eye-open.svg",
      eyeOpen: "eye.svg",
    };
  },
  props: {
    inputPlaceholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
