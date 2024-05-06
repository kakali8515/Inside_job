<template>
  <div class="pagination-area" v-if="totalRecords >= 1">
    <button
      :class="`first-page ${pagiNo <= 1 ? 'disable' : ''}`"
      @click="FindPageNo($event, 0)"
      :disabled="pagiNo <= 1"
    >
      <img src="@/assets/icons/pagi-dobble-arrow.svg" />
    </button>
    <button
      :class="`next ${pagiNo <= 0 ? 'disable' : ''}`"
      @click="FindPageNo($event, pagiNo - 1)"
      :disabled="pagiNo <= 0"
      ><img src="@/assets/icons/pagi-arrow.svg"
    /></button>
    <ul>
      <li
        :class="`${pagiNo === index ? 'active' : ''}`"
        v-for="(item, index) in totalPaginator"
        :key="index"
        @click="FindPageNo($event, index)"
      >
        {{ item.pagiNo }}
      </li>
    </ul>
    <button
      :class="`prev ${pagiNo >= totalPaginator.length - 1 ? 'disable' : ''}`"
      @click="pagiNo >= totalPaginator.length - 1 ? '' : FindPageNo($event, pagiNo + 1)"
      :disabled="pagiNo >= totalPaginator.length - 1"
      ><img src="@/assets/icons/pagi-arrow.svg"
    /></button>
    <button
      :class="`last-page ${pagiNo >= totalPaginator.length - 2 ? 'disable' : ''}`"
      @click="FindPageNo($event, totalPaginator.length - 1)"
      :disabled="pagiNo >= totalPaginator.length - 2"
    >
      <img src="@/assets/icons/pagi-dobble-arrow.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalRecords: Number,
    tabState: String,
  },
  data() {
    return {
      totalPaginator: [],
      pagiNo: 0,
    };
  },

  mounted() {
    this.calcPage();
    console.log("pagi state", this.resetPageNo);
  },

  methods: {
    calcPage() {
      for (let i = 0; i < this.totalRecords; i++) {
        this.totalPaginator.push({ pagiNo: i + 1 });
      }
      console.log("ele", this.totalRecords);
    },
    FindPageNo(e, id) {
      e.preventDefault();
      this.pagiNo = id;
      this.$emit("setNumber", this.pagiNo);
      console.log("page no", this.pagiNo);
    },
  },
  watch: {
    totalRecords: function () {
      this.totalPaginator = [];
      this.calcPage();
    },
    tabState: function () {
      this.pagiNo = 0;
      console.log("page no reset to", this.pagiNo);
      // this.calcPage();
    },
  },
};
</script>
