<template>
  <div class="pagination-area" v-show="totalItems > 0">
    <!-- <button
      :class="`first-page ${page <= 1 ? 'disable' : ''}`"
      @click="onClickHandler(1)"
      :disabled="page <= 1"
    >
      <img src="@/assets/icons/pagi-dobble-arrow.svg" />
    </button> -->
    <!-- :show-breakpoint-buttons="false" -->
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="limit"
      :max-pages-shown="3"
      v-model="page"
      :on-click="onClickHandler"
      :show-ending-buttons="true"
      :show-breakpoint-buttons="false"
    >
      <template #first-page-button>
        <button class="first-page">
          <img src="@/assets/icons/pagi-dobble-arrow.svg" />
        </button>
      </template>
      <template #last-page-button>
        <button class="last-page">
          <img src="@/assets/icons/pagi-dobble-arrow.svg" />
        </button>
      </template>
    </vue-awesome-paginate>
    <!-- <button
      :class="`last-page ${page >= totalPaginator - 2 ? 'disable' : ''}`"
      @click="onClickHandler(totalPaginator)"
      :disabled="page >= totalPaginator - 2"
    >
      <img src="@/assets/icons/pagi-dobble-arrow.svg" />
    </button> -->
  </div>
</template>

<script>
export default {
  name: "VuePaginate",
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      totalPaginator: 0,
    };
  },
  watch: {
    totalItems(newVal, oldVal) {
      if (newVal != oldVal) {
        // console.log("change");
        this.totalPaginator = Math.ceil(this.totalItems / this.limit);
        console.log("change", this.totalPaginator);
      }
    },
  },
  //   computed: {
  //     totalPaginator() {
  //       return Math.ceil(this.totalItems / this.limit);
  //     },
  //   },

  methods: {
    onClickHandler(e) {
      console.log(e);
      this.$emit("setNumber", e);
    },
  },
};
</script>

<style></style>
