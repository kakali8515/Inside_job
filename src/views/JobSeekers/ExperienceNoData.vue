<template>
  <div class="back-wh common-sec">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">
          <div class="innr-search">
            <a
              href="javascript:void(0);"
              class="left-arrow"
              @click="$emit('setClose')"
            >
              <img src="@/assets/icons/left-arrow.svg" alt="" />
            </a>
            <span>경력사항</span>
          </div>
        </h4>
        <!-- <InnerHeader headerTitle="경력사항" /> -->
      </div>
    </div>
    <div class="container career-wrap pb-60">
      <p class="date-box career-date">
        나의 경력은 <span>총</span> <em>{{ experience.year }}</em>
        <span>년</span> <em>{{ experience.month }}</em>
        <span>개월</span> 입니다.
      </p>

      <CareerCard v-for="(i, e) in careers" :key="e">
        <template v-slot:cr-date>
          <span>{{ findDate(i?.emp_period_from, i?.emp_period_until) }}</span>
        </template>
        <template v-slot:cr-title>
          <h3 class="sb-heading">{{ i.company_name }}</h3>
        </template>
        <template v-slot:cr-link>
          <a href="javascript:void(0);" class="detail-link">
            {{ i.responsiblities }}
          </a>
        </template>
        <template v-slot:edit>
          <div class="edit-innr">
            <a href="javascript:void(0);" @click="openEdit($event, i.id)"
              ><img src="@/assets/icons/edit-large.svg" alt=""
            /></a>
            <a href="javascript:void(0);" @click="removeCareer($event, i.id)"
              ><img src="@/assets/icons/cross-large.svg" alt=""
            /></a>
          </div>
        </template>
      </CareerCard>
      <a
        href="#"
        class="btn btn-border-outline lg mb-16"
        @click="addCareerModal($event)"
        >경력 추가하기</a
      >
    </div>
  </div>
  <div class="btm-button-group fixed-btn-otr">
    <a href="#" class="btn btn-primary lg" @click.prevent="$emit('setClose')"
      >저장하기</a
    >
  </div>
  <AddCareer
    :Pagetype="sheetType"
    @AddSuccess="reloadPage"
    :pageID="page_id"
    v-if="commonStore.state.isAddCareer"
  />
  <DeleteCareerModal
    :isModal="isDeleteModal"
    :careerId="deleteId"
    @closeModal="
      () => {
        isDeleteModal = false;
      }
    "
    @deleteSuccess="reloadPage"
  />
</template>

<script>
import {
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import AddCareer from "./AddCareer.vue";
import { careerServices } from "@/service/API/career.js";
import DeleteCareerModal from "@/components/Modals/DeleteCareerModal.vue";
import CareerCard from "@/components/CareerCard.vue";
import InnerHeader from "@/components/innerHeader.vue";
import moment from "moment";
export default {
  name: "ExperienceNoData",
  components: { AddCareer, CareerCard, InnerHeader, DeleteCareerModal },
  setup() {
    const commonStore = inject("commonStore");
    const careers = ref([]);
    const experience = reactive({
      year: "",
      month: "",
      day: "",
    });
    const sheetType = ref("경력 추가");
    const isDeleteModal = ref(false);
    const deleteId = ref("");
    const page_id = ref("");

    onBeforeMount(async () => {
      await getList();
    });

    const getList = async () => {
      let res = await careerServices.careerList();
      careers.value = res.data.result;
      experience.year = res.data.years;
      experience.day = res.data.days;
      console.log(res);
      experience.month =
        res.data.days == 29 || res.data.days == 28
          ? res.data.months + 1
          : res.data.months;
    };

    const findDate = (from, till) => {
      return (
        moment(String(from)).format("YYYY.MM") +
        " ~ " +
        moment(String(till)).format("YYYY.MM")
      );
    };

    const openEdit = (e, id) => {
      e.preventDefault();
      sheetType.value = "edit";
      page_id.value = String(id);
      commonStore.state.isAddCareer = true;
    };

    const addCareerModal = (e) => {
      e.preventDefault();
      sheetType.value = "add";
      commonStore.state.isAddCareer = true;
    };

    const removeCareer = async (e, id) => {
      e.preventDefault();
      isDeleteModal.value = true;
      deleteId.value = id;
    };

    async function reloadPage() {
      isDeleteModal.value = false;
      let res = await careerServices.careerList();
      careers.value = res.data.result;
      experience.year = res.data.years;
      experience.month =
        res.data.days == 29 || res.data.days == 28
          ? res.data.months + 1
          : res.data.months;
    }

    return {
      commonStore,
      careers,
      experience,
      sheetType,
      isDeleteModal,
      deleteId,
      page_id,
      findDate,
      openEdit,
      addCareerModal,
      removeCareer,
      reloadPage,
    };
  },
};
</script>
