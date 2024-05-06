<template>
  <div
    :class="`common-sec common-sec-gap-bt back-wh  ${commonStore.state.currentThemeStore}`"
  >
    <div class="top-hdr no-border mb-16">
      <div class="container">
        <h4 class="heading">
          <a
            href="javascript:void(0);"
            class="left-arrow"
            @click="$emit('setfalse', false)"
          >
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >{{ title }}
          <a
            href="javascript:void(0);"
            class="refresh"
            @click="store.methods.refreshAll($event)"
            ><img src="@/assets/icons/refresh.svg" alt=""
          /></a>
        </h4>
      </div>
    </div>
    <div class="container">
      <p class="number">
        선택가능갯수 <span>{{ store.state.filtersVisible.length }}</span
        ><span class="total-count">/10</span>
      </p>
      <div class="table bb-0">
        <div class="table-col">
          <div class="table-head">
            <span>1차</span>
          </div>
          <div class="table-body">
            <ul>
              <li
                v-for="(i, e) in store.state.primaryList"
                :key="e"
                :class="`${
                  `${store.state.primarySelected.id}` === `${i.id}`
                    ? 'active'
                    : ''
                }`"
                @click="store.methods.setSelectedPrimary(i)"
              >
                {{ i.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="table-col">
          <div class="table-head">
            <span>2차</span>
          </div>
          <div class="table-body">
            <ul>
              <li
                v-for="(j, e) in store.state.secondaryList"
                :key="e"
                :class="`${
                  `${store.state.secondarySelected.id}` === `${j.id}`
                    ? 'active'
                    : ''
                }`"
                @click="store.methods.setSelectedSecondary(j)"
              >
                {{ j.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="table-col">
          <div class="table-head">
            <span>3차</span>
          </div>
          <div class="table-body">
            <ul>
              <li
                v-for="(k, e) in store.state.tertiaryList"
                :key="e"
                :class="`${
                  store.methods.findSelectedThird(k.id) ? 'active' : ''
                }`"
                @click="store.methods.setSelectedTertiary(k)"
              >
                {{ k.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="setting-btm bt-1">
      <div class="container">
        <div class="sub-otr mb-32">
          <h3 class="sub-heading mb-0">선택한 직종</h3>
        </div>
        <ul class="selected-list">
          <li
            v-for="(i, e) in store.state.filtersVisible"
            :key="e"
            style="
              color: #666666;
              background-color: #f1f1f1;
              padding: 3px 10px;
              border-radius: 5px;
              margin: 0 5px 10px 5px;
            "
          >
            {{ i }}
            <a href="#" @click="removeOccupationFilter(i, e, $event)"
              ><img src="@/assets/icons/cross.svg" class="cross" alt=""
            /></a>
          </li>
        </ul>
        <div class="fixed-btn-otr">
          <a href="#" class="btn btn-primary lg" @click.prevent="setData()"
            >설정하기</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isProxy, ref, toRaw } from "@vue/reactivity";
import { inject, onBeforeMount, watch } from "@vue/runtime-core";
import { occupationService } from "@/service/API/occupation.js";
import { useRouter } from "vue-router";
export default {
  name: "OccupationSetting",
  emits: ["setfalse", "submittedValue"],
  props: {
    title: {
      type: String,
      default: "직무선택",
    },
  },
  setup(props, { emit }) {
    // const primaryList = ref([]);
    // const secondaryList = ref([]);
    // const tertiaryList = ref([]);
    // const primarySelected = ref({});
    // const secondarySelected = ref({});
    // const tertiarySelected = ref([]);
    // const totalFilters = ref([]);
    // const filtersVisible = ref([]);
    // const Backup = ref([]);

    const store = inject("occupationStore");
    const commonStore = inject("commonStore");
    const router = useRouter();

    onBeforeMount(() => {
      store.methods.getPrimaryList();
    });

    function removeOccupationFilter(i, e, event) {
      store.methods.removeFilter(i, e, event);
      setTimeout(() => {
        store.methods.submitFilter();
      }, 100);
    }

    // // Getting 1st list
    // const getPrimaryList = async () => {
    //   let res = await occupationService.occupationPrimary();
    //   primaryList.value = res.data;
    // };
    // // Getting 2nd list when selecting from 1st list
    // const setSelectedPrimary = async (item) => {
    //   primarySelected.value = item;
    //   let res = await occupationService.occupationSecondary(
    //     primarySelected.value.id
    //   );
    //   tertiaryList.value = [];
    //   tertiarySelected.value = [];
    //   secondarySelected.value = {};
    //   secondaryList.value = res.data;
    //   secondaryList.value.unshift({
    //     id: "second",
    //     "1st_level_id": primarySelected.value.id,
    //     text: `all of ${primarySelected.value.text}`,
    //   });
    // };

    // // methods calls when selecting any item from 2nd row
    // const setSelectedSecondary = async (item) => {
    //   secondarySelected.value = item;
    //   tertiaryList.value = [];
    //   tertiarySelected.value = [];
    //   if (Object.values(secondarySelected.value).length > 0) {
    //     // if user selects any option except "all of second(1st item on the list)" in the list
    //     if (secondarySelected.value.id != "second") {
    //       // fetch third row data
    //       let res = await occupationService.occupationTertiary(
    //         secondarySelected.value.id
    //       );
    //       // setting third row list data and adding all of third at the top
    //       tertiaryList.value = res.data;
    //       tertiaryList.value.unshift({
    //         id: "third",
    //         "2nd_level_id": secondarySelected.value.id,
    //         text: `all of ${secondarySelected.value.text}`,
    //       });
    //       //
    //       // console.log(primarySelected.value.id);
    //       var presentId = totalFilters.value.find(
    //         (ele) => ele.occupation_first === primarySelected.value.id
    //       );
    //       // console.log(presentId);
    //       if (
    //         presentId !== undefined &&
    //         presentId.occupation_second.length <= 0
    //       ) {
    //         let removedItem = totalFilters.value.splice(
    //           totalFilters.value.findIndex(
    //             (item) => item.occupation_first === presentId.occupation_first
    //           ),
    //           1
    //         );

    //         console.log("removed item", removedItem);
    //       }
    //     } else {
    //       // if user selects "all of second(1st item on the list)" in the list
    //       if (filtersVisible.value.length >= 10) {
    //         return;
    //       } else {
    //         tertiaryList.value = [];
    //         tertiarySelected.value = [];
    //         console.log(
    //           "searched Id",
    //           totalFilters.value.findIndex(
    //             (ele) => ele.occupation_first === primarySelected.value.id
    //           )
    //         );
    //         // if there is no other item from 2nd list primarily selected
    //         if (
    //           totalFilters.value.findIndex(
    //             (ele) => ele.occupation_first === primarySelected.value.id
    //           ) == -1
    //         ) {
    //           totalFilters.value.push({
    //             occupation_first: primarySelected.value.id,
    //             occupation_second: [],
    //             name: [secondarySelected.value.text],
    //           });
    //           console.log("no previous add ... adding", totalFilters.value);
    //         }
    //         // if other item from 2nd list primarily selected
    //         else {
    //           console.log("checking with", primarySelected.value.id);
    //           let filteredArr = [
    //             ...totalFilters.value.filter((res, e) => {
    //               return res.occupation_first != primarySelected.value.id;
    //             }),
    //           ];
    //           totalFilters.value = [];
    //           // filter out previously selected
    //           totalFilters.value.push(...filteredArr, {
    //             occupation_first: primarySelected.value.id,
    //             occupation_second: [],
    //             name: [secondarySelected.value.text],
    //           });
    //           console.log(totalFilters.value);
    //         }
    //       }
    //     }
    //   }
    // };

    // // Method calls when selecting any item from 3rd row list
    // const setSelectedTertiary = (item) => {
    //   let findId = tertiarySelected.value.findIndex((x) => x.id === item.id);
    //   if (findId != -1 || filtersVisible.value.length >= 10) {
    //     // tertiarySelected.value.splice(findId, 1);
    //     return;
    //   } else {
    //     tertiarySelected.value.push(item);
    //     if (item.id != "third") {
    //       var isPresentVal = totalFilters.value.find(
    //         (ele) => ele.occupation_second === secondarySelected.value.id
    //       );
    //       // console.log("if present", isPresentVal);
    //       if (isPresentVal == undefined) {
    //         totalFilters.value.push({
    //           occupation_first: primarySelected.value.id,
    //           occupation_second: secondarySelected.value.id,
    //           occupation_third: [item.id],
    //           name: [item.text],
    //         });
    //       } else {
    //         let allthirdId = tertiarySelected.value.findIndex(
    //           (res) => res.id === "third"
    //         );
    //         if (allthirdId > -1) {
    //           tertiarySelected.value.splice(allthirdId, 1);
    //         }
    //         if (
    //           isPresentVal.name.includes(
    //             `all of ${secondarySelected.value.text}`
    //           )
    //         ) {
    //           // console.log("here here");
    //           isPresentVal.name.splice(
    //             isPresentVal.name.findIndex((res) =>
    //               res.includes(`all of ${secondarySelected.value.text}`)
    //             ),
    //             1
    //           );
    //         }
    //         totalFilters.value.forEach((x) => {
    //           if (x.occupation_second === secondarySelected.value.id) {
    //             x.occupation_third.push(item.id);
    //             x.name.push(item.text);
    //           }
    //         });
    //       }
    //     } else {
    //       if (
    //         totalFilters.value.findIndex(
    //           (ele) => ele.occupation_second === secondarySelected.value.id
    //         ) == -1
    //       ) {
    //         totalFilters.value.push({
    //           occupation_first: primarySelected.value.id,
    //           occupation_second: secondarySelected.value.id,
    //           occupation_third: [],
    //           name: [item.text],
    //         });
    //         // console.log("no previous add ... adding", totalFilters.value);
    //       } else {
    //         tertiarySelected.value = [];
    //         tertiarySelected.value.push({
    //           id: "third",
    //           "2nd_level_id": secondarySelected.value.id,
    //           text: `all of ${secondarySelected.value.text}`,
    //         });
    //         totalFilters.value.forEach((x) => {
    //           if (x.occupation_second === secondarySelected.value.id) {
    //             x.occupation_third = [];
    //             x.name.splice(0, x.name.length, item.text);
    //           }
    //         });
    //       }
    //     }
    //   }
    //   // console.log(totalFilters.value);
    // };

    // const findSelectedThird = (id) => {
    //   if (
    //     tertiarySelected.value.findIndex(
    //       (ele) => String(ele.id) === `${id}`
    //     ) !== -1
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // adding filters which are visible to the user
    watch(
      () => store.state.totalFilters,
      (val) => {
        store.state.filtersVisible = [];
        // console.log(val, "changed");
        val.forEach((ele, e) => {
          store.state.filtersVisible.push(...ele.name);
        });
        // console.log(store.state.filtersVisible, "check value after add");
        // setFiltervalue
        store.state.filtervalue = store.state.filtersVisible;
        console.log(store.state.filtervalue);
      },
      { deep: true }
    );

    // // removing added filters which are visible to the user( will update the totalFilters array)
    // const removeFilter = (itemToRemove, index, e) => {
    //   e.preventDefault();
    //   totalFilters.value.forEach((wholeItem, wholeId) => {
    //     // console.log(wholeItem);
    //     if (wholeItem.name.includes(itemToRemove)) {
    //       // console.log(wholeItem.occupation_second);
    //       primarySelected.value = {};
    //       secondarySelected.value = {};
    //       tertiarySelected.value = [];
    //       if (
    //         (Array.isArray(wholeItem.occupation_second) &&
    //           wholeItem.occupation_second.length == 0) ||
    //         wholeItem.occupation_third.length == 0
    //       ) {
    //         let filterArr = totalFilters.value.filter(
    //           (res) => !res.name.includes(itemToRemove)
    //         );
    //         // console.log(filterArr);
    //         totalFilters.value = [...filterArr];
    //       } else {
    //         let itemId = wholeItem.name.findIndex(
    //           (ocu) => ocu === itemToRemove
    //         );
    //         // console.log(itemId);
    //         wholeItem.name.splice(itemId, 1);
    //         wholeItem.occupation_third.splice(itemId, 1);
    //       }
    //     }
    //   });
    // };

    // const submitFilter = () => {
    //   Backup.value = [];
    //   let finalData = totalFilters.value.map(({ name, ...rest }) => {
    //     // console.log(isProxy(rest));
    //     return rest;
    //   });
    //   Backup.value.push(...finalData);
    //   store.state.totalFilterState = toRaw(Backup.value);
    //   store.state.filtersVisibleState = filtersVisible.value;
    //   console.log(store.state.totalFilterState);
    // };

    // const refreshAll = (e) => {
    //   e.preventDefault();
    //   secondaryList.value = [];
    //   tertiaryList.value = [];
    //   totalFilters.value = [];
    //   filtersVisible.value = [];
    //   primarySelected.value = {};
    //   secondarySelected.value = {};
    //   tertiarySelected.value = [];
    // };

    function setData() {
      store.methods.submitFilter();
      emit("submittedValue", store.state.totalFilterState);
      emit("setfalse", false);
    }

    return {
      store,
      setData,
      removeOccupationFilter,
      commonStore,
      //   primaryList,
      //   primarySelected,
      //   secondaryList,
      //   secondarySelected,
      //   tertiaryList,
      //   filtersVisible,
      //   totalFilters,
      //   // getFilterName,
      //   setSelectedPrimary,
      //   setSelectedSecondary,
      //   setSelectedTertiary,
      //   findSelectedThird,
      //   removeFilter,
      //   refreshAll,
      //   submitFilter,
    };
  },
};
</script>
