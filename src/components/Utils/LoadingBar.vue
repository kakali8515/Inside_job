<template>
  <div class="loading-page">
    <div class="loader-container">
      <img src="@/assets/icons/spinner-loader.svg" />
    </div>
    <p v-html="loadingMsg"></p>
  </div>
</template>

<script>
export default {
  props: {
    loadingMsg: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 220px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999;
  p {
    font-size: 22px;
    font-weight: 600;
    // margin-top: 15px;
  }
}
.loader-container {
  img {
    margin: auto;
  }
}
.loader {
  margin: auto;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #206b9c; /* Blue */
  border-right: 5px solid #206b9c;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
