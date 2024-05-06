<template>
  <VDatePicker v-model="date" locale="ko">
    <template #default="{ togglePopover }">
      <!-- <button
          class="px-3 py-2 bg-blue-500 text-sm text-white font-semibold rounded-md"
          @click="togglePopover"
        >
          Select date
        </button> -->
      
        <input
          type="text"
          placeholder="2022.01.07"
          class="form-control"
          v-model='date'
          @click="togglePopover"
        />
      
    </template>
  </VDatePicker>
</template>
<script setup>
import { ref } from "vue";
const date = ref(new Date());
function formatDate(value){
      const date = new Date(value);
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return (value = yyyy + "-" + mm + "-" + dd);
    };
</script>
